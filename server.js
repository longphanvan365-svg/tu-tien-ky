const express = require('express');
const session = require('express-session');
const SQLiteStoreFactory = require('connect-sqlite3');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.join(__dirname, 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'tutien.sqlite'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));
// Migration an toàn cho database đã tạo từ phiên bản trước.
const userColumns = db.prepare('PRAGMA table_info(users)').all().map(c => c.name);
if (!userColumns.includes('role')) db.exec("ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'player'");
if (!userColumns.includes('is_locked')) db.exec('ALTER TABLE users ADD COLUMN is_locked INTEGER NOT NULL DEFAULT 0');

// Tạo/nâng quyền tài khoản quản trị đầu tiên bằng biến môi trường trong file .env.

async function bootstrapAdmin() {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername && !adminPassword) return;

  if (!adminUsername || !adminPassword || adminPassword.length < 12) {
    throw new Error(
      'Cấu hình ADMIN_USERNAME và ADMIN_PASSWORD (ít nhất 12 ký tự) trong .env chưa hợp lệ.'
    );
  }

  const username = adminUsername.trim();
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const existing = db.prepare(
    'SELECT id FROM users WHERE username = ?'
  ).get(username);

  if (existing) {
    db.prepare(`
      UPDATE users
      SET role = 'admin',
          is_locked = 0,
          password_hash = ?
      WHERE id = ?
    `).run(passwordHash, existing.id);
  } else {
    const securityHash = await bcrypt.hash(
      require('crypto').randomBytes(24).toString('hex'),
      12
    );

    db.prepare(`
      INSERT INTO users
      (username, password_hash, security_hash, role)
      VALUES (?, ?, ?, 'admin')
    `).run(username, passwordHash, securityHash);
  }
}



const SQLiteStore = SQLiteStoreFactory(session);
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(session({
  store: new SQLiteStore({ db: 'sessions.sqlite', dir: DATA_DIR }),
  secret: process.env.SESSION_SECRET || 'CHANGE_THIS_SECRET_BEFORE_DEPLOYMENT',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

const findUser = db.prepare('SELECT * FROM users WHERE username = ?');
const insertUser = db.prepare(
  'INSERT INTO users (username, password_hash, security_hash) VALUES (?, ?, ?)'
);
const saveState = db.prepare(`
  INSERT INTO player_saves (user_id, state_json, updated_at)
  VALUES (?, ?, datetime('now'))
  ON CONFLICT(user_id) DO UPDATE SET
    state_json = excluded.state_json,
    version = player_saves.version + 1,
    updated_at = datetime('now')
`);
const getSave = db.prepare('SELECT state_json, version, updated_at FROM player_saves WHERE user_id = ?');

function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Vui lòng đăng nhập.' });
  const user = db.prepare('SELECT id, username, role, is_locked FROM users WHERE id = ?').get(req.session.userId);
  if (!user || user.is_locked) {
    req.session.destroy(() => {});
    return res.status(401).json({ error: 'Tài khoản không tồn tại hoặc đã bị khóa.' });
  }
  req.currentUser = user;
  next();
}
function requireAdmin(req, res, next) {
  if (req.currentUser?.role !== 'admin') return res.status(403).json({ error: 'Bạn không có quyền quản trị.' });
  next();
}
function validUsername(name) {
  return typeof name === 'string' && /^[\p{L}\p{N}_ -]{3,24}$/u.test(name);
}
function validPassword(password) {
  return typeof password === 'string' && password.length >= 8 && password.length <= 128;
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, securityCode } = req.body || {};
    if (!validUsername(username)) return res.status(400).json({ error: 'Đạo hiệu 3–24 ký tự, chỉ gồm chữ, số, khoảng trắng, _ hoặc -.' });
    if (!validPassword(password)) return res.status(400).json({ error: 'Mật khẩu phải dài từ 8 đến 128 ký tự.' });
    if (typeof securityCode !== 'string' || securityCode.trim().length < 4 || securityCode.length > 128) {
      return res.status(400).json({ error: 'Mã bảo mật phải có ít nhất 4 ký tự.' });
    }
    if (findUser.get(username)) return res.status(409).json({ error: 'Đạo hiệu đã được sử dụng.' });

    const passwordHash = await bcrypt.hash(password, 12);
    const securityHash = await bcrypt.hash(securityCode, 12);
    const result = insertUser.run(username.trim(), passwordHash, securityHash);
    req.session.userId = Number(result.lastInsertRowid);
    req.session.username = username.trim();
    return res.status(201).json({ username: username.trim(), role: 'player' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Không thể tạo tài khoản lúc này.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Vui lòng nhập đạo hiệu và mật khẩu.' });
    }
    const user = findUser.get(username.trim());
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Đạo hiệu hoặc mật khẩu không chính xác.' });
    }
    if (user.is_locked) return res.status(403).json({ error: 'Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.' });
    db.prepare("UPDATE users SET last_login_at = datetime('now') WHERE id = ?").run(user.id);
    req.session.userId = user.id;
    req.session.username = user.username;
    return res.json({ username: user.username, role: user.role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Không thể đăng nhập lúc này.' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/game', requireAuth, (req, res) => {
  const row = getSave.get(req.session.userId);
  if (!row) return res.json({ state: null, version: 0 });
  try {
    return res.json({ state: JSON.parse(row.state_json), version: row.version, updatedAt: row.updated_at });
  } catch {
    return res.status(500).json({ error: 'Dữ liệu nhân vật bị lỗi.' });
  }
});

app.put('/api/game', requireAuth, (req, res) => {
  const state = req.body && req.body.state;
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    return res.status(400).json({ error: 'Dữ liệu nhân vật không hợp lệ.' });
  }
  // Không cho client lưu trạng thái đăng nhập hoặc ghi đè tên tài khoản.
  const safeState = { ...state, loggedIn: false, name: req.session.username };
  const serialized = JSON.stringify(safeState);
  if (serialized.length > 900000) return res.status(413).json({ error: 'Dữ liệu lưu quá lớn.' });
  saveState.run(req.session.userId, serialized);
  return res.json({ ok: true });
});

// API quản trị: mọi thao tác đều xác thực quyền ở server.
app.get('/api/admin/me', requireAuth, requireAdmin, (req, res) => {
  res.json({ username: req.currentUser.username, role: req.currentUser.role });
});
app.get('/api/admin/users', requireAuth, requireAdmin, (req, res) => {
  const rows = db.prepare(`
    SELECT u.id, u.username, u.role, u.is_locked, u.created_at, u.last_login_at,
           s.state_json, s.updated_at AS save_updated_at
    FROM users u LEFT JOIN player_saves s ON s.user_id = u.id
    ORDER BY u.id DESC
  `).all();
  const users = rows.map(row => {
    let state = {};
    try { state = row.state_json ? JSON.parse(row.state_json) : {}; } catch {}
    return {
      id: row.id, username: row.username, role: row.role, isLocked: !!row.is_locked,
      createdAt: row.created_at, lastLoginAt: row.last_login_at,
      saveUpdatedAt: row.save_updated_at,
      characterName: typeof state.name === 'string' ? state.name : row.username,
      realm: Number.isInteger(state.realmIdx) ? state.realmIdx : null,
      cultivation: Number.isFinite(state.exp) ? state.exp : null
    };
  });
  res.json({ users });
});
app.patch('/api/admin/users/:id/lock', requireAuth, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const locked = req.body?.locked;
  if (!Number.isInteger(id) || typeof locked !== 'boolean') return res.status(400).json({ error: 'Dữ liệu không hợp lệ.' });
  if (id === req.currentUser.id) return res.status(400).json({ error: 'Không thể tự khóa tài khoản ADMIN đang đăng nhập.' });
  const result = db.prepare("UPDATE users SET is_locked = ? WHERE id = ? AND role != 'admin'").run(locked ? 1 : 0, id);
  if (!result.changes) return res.status(404).json({ error: 'Không tìm thấy tài khoản người chơi.' });
  res.json({ ok: true });
});
app.patch('/api/admin/users/:id/password', requireAuth, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const password = req.body?.password;
  if (!Number.isInteger(id) || !validPassword(password)) return res.status(400).json({ error: 'Mật khẩu mới phải dài từ 8 đến 128 ký tự.' });
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(id);
  if (!user) return res.status(404).json({ error: 'Không tìm thấy tài khoản.' });
  const hash = await bcrypt.hash(password, 12);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, id);
  res.json({ ok: true });
});
app.delete('/api/admin/users/:id', requireAuth, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'ID không hợp lệ.' });
  if (id === req.currentUser.id) return res.status(400).json({ error: 'Không thể tự xóa tài khoản ADMIN đang đăng nhập.' });
  const result = db.prepare("DELETE FROM users WHERE id = ? AND role != 'admin'").run(id);
  if (!result.changes) return res.status(404).json({ error: 'Không tìm thấy tài khoản người chơi.' });
  res.json({ ok: true });
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));
// Middleware chặn truy cập trái phép vào trang quản trị /admin và /admin.html
function guardAdminPage(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect('/');
  }
  const user = db.prepare('SELECT role, is_locked FROM users WHERE id = ?').get(req.session.userId);
  if (!user || user.is_locked || user.role !== 'admin') {
    return res.redirect('/');
  }
  next();
}

app.get(['/admin', '/admin.html'], guardAdminPage, (_req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.use(express.static(__dirname, { extensions: ['html'] }));
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

bootstrapAdmin().then(() => {
  app.listen(PORT, () => {
    console.log(`Tu Tiên Kỳ đang chạy tại http://localhost:${PORT}`);
    if (!process.env.ADMIN_USERNAME) console.log('Chưa cấu hình ADMIN_USERNAME/ADMIN_PASSWORD trong .env; trang ADMIN chưa có tài khoản quản trị.');
  });
}).catch(err => { console.error('Không thể khởi tạo ADMIN:', err.message); process.exit(1); });
