// ================= DATABASES =================
const REALMS = [
  { name: "Phàm Nhân", req: 100, hp: 100, atk: 15, def: 8, spd: 10, trib: 1.0 },
  { name: "Luyện Khí Tầng 1", req: 300, hp: 250, atk: 35, def: 18, spd: 15, trib: 1.0 },
  { name: "Luyện Khí Tầng 5", req: 800, hp: 600, atk: 80, def: 40, spd: 22, trib: 1.0 },
  { name: "Luyện Khí Đỉnh Phong", req: 2000, hp: 1400, atk: 180, def: 90, spd: 32, trib: 1.0 },
  { name: "Trúc Cơ Sơ Kỳ", req: 5000, hp: 3500, atk: 420, def: 210, spd: 48, trib: 0.85 },
  { name: "Trúc Cơ Viên Mãn", req: 12000, hp: 8000, atk: 950, def: 480, spd: 70, trib: 0.80 },
  { name: "Kim Đan Sơ Kỳ", req: 30000, hp: 20000, atk: 2400, def: 1200, spd: 110, trib: 0.75 },
  { name: "Kim Đan Viên Mãn", req: 75000, hp: 50000, atk: 6000, def: 3000, spd: 160, trib: 0.70 },
  { name: "Nguyên Anh Sơ Kỳ", req: 200000, hp: 130000, atk: 15000, def: 7500, spd: 240, trib: 0.65 },
  { name: "Nguyên Anh Viên Mãn", req: 500000, hp: 320000, atk: 38000, def: 19000, spd: 350, trib: 0.60 },
  { name: "Hóa Thần Kỳ", req: 1500000, hp: 850000, atk: 95000, def: 48000, spd: 520, trib: 0.55 },
  { name: "Luyện Hư Kỳ", req: 4500000, hp: 2200000, atk: 240000, def: 120000, spd: 780, trib: 0.50 },
  { name: "Hợp Thể Kỳ", req: 15000000, hp: 6000000, atk: 620000, def: 310000, spd: 1150, trib: 0.45 },
  { name: "Đại Thừa Kỳ", req: 50000000, hp: 18000000, atk: 1800000, def: 900000, spd: 1800, trib: 0.40 },
  { name: "Độ Kiếp Kỳ", req: 150000000, hp: 55000000, atk: 5200000, def: 2600000, spd: 2800, trib: 0.35 },
  { name: "Chân Tiên", req: 500000000, hp: 180000000, atk: 16000000, def: 8000000, spd: 4500, trib: 0.30 },
  { name: "Kim Tiên", req: 2000000000, hp: 600000000, atk: 55000000, def: 27000000, spd: 7500, trib: 0.25 },
  { name: "Đại La Kim Tiên", req: 10000000000, hp: 2200000000, atk: 200000000, def: 100000000, spd: 13000, trib: 0.20 },
  { name: "Hỗn Nguyên Tiên Đế", req: 50000000000, hp: 10000000000, atk: 900000000, def: 450000000, spd: 25000, trib: 0.15 }
];

const TIER_NAMES = ["Phàm Phẩm", "Hoàng Cấp", "Huyền Cấp", "Địa Cấp", "Thiên Cấp", "Tiên Phẩm", "Thần Phẩm", "Hỗn Độn"];

// Spirit Roots Pool for Gacha Roll
const SPIRIT_ROOTS = [
  { name: "Ngũ Hành Tạp Linh Căn", mult: 1.0, tier: 0, rate: 35 },
  { name: "Tứ Hành Phàm Linh Căn", mult: 1.3, tier: 1, rate: 25 },
  { name: "Tam Hành Chân Linh Căn", mult: 1.7, tier: 2, rate: 18 },
  { name: "Song Linh Căn Biến Dị (Băng/Lôi)", mult: 2.3, tier: 3, rate: 11 },
  { name: "Thiên Linh Căn Thuần Khiết", mult: 3.2, tier: 4, rate: 6 },
  { name: "Tiên Thiên Đạo Thể", mult: 4.5, tier: 5, rate: 3 },
  { name: "Cửu Khiếu Chí Tôn Cốt", mult: 6.5, tier: 6, rate: 1.5 },
  { name: "Hỗn Độn Hồng Mông Thánh Thể", mult: 10.0, tier: 7, rate: 0.5 }
];

// 500 Pills
const DB_PILLS = [];
const pillPrefixes = ["Tụ Khí", "Trúc Cơ", "Kim Đan", "Nguyên Anh", "Hóa Thần", "Tẩy Tủy", "Bổ Huyết", "Hộ Kiếp", "Ngộ Đạo", "Cửu Chuyển"];
const pillTypes = ["exp", "hp", "atk", "trib", "int"];
for (let i = 0; i < 500; i++) {
  const tier = Math.min(7, Math.floor(i / 63));
  const pType = pillTypes[i % pillTypes.length];
  const mult = Math.pow(3.2, tier) * (1 + (i % 10) * 0.15);
  let val = Math.floor(100 * mult);
  let desc = "";
  if (pType === "exp") desc = `Tăng ${val.toLocaleString()} Tu Vi`;
  if (pType === "hp") desc = `Hồi ${val.toLocaleString()} Sinh Lực`;
  if (pType === "atk") { val = Math.max(5, Math.floor(15 * mult)); desc = `Tăng vĩnh viễn +${val.toLocaleString()} Công`; }
  if (pType === "trib") { val = Math.min(25, 3 + tier * 2); desc = `Tăng +${val}% tỷ lệ Độ Kiếp`; }
  if (pType === "int") { val = 1 + tier; desc = `Tăng vĩnh viễn +${val} Ngộ Tính`; }
  DB_PILLS.push({
    id: "pill_" + i, kind: "pill", name: `${pillPrefixes[i % 10]} Đan #${i + 1}`,
    tier, pType, val, desc, price: Math.floor(50 * Math.pow(3.5, tier) * (1 + (i % 5) * 0.2))
  });
}

// 2000 Equipment (500 per slot)
const DB_EQUIPS = [];
const SLOTS = ["weapon", "armor", "artifact", "boots"];
const SLOT_VN = { weapon: "Vũ Khí", armor: "Đạo Bào", artifact: "Pháp Bảo", boots: "Pháp Hài" };
const EQ_PREFIX = ["Thanh Phong", "Huyền Thiết", "Tử Kim", "Thái Cổ", "Tru Tiên", "Hỗn Độn", "Cửu Thiên", "Vô Cực"];
for (let s = 0; s < 4; s++) {
  for (let i = 0; i < 500; i++) {
    const tier = Math.min(7, Math.floor(i / 63));
    const mult = Math.pow(3.4, tier) * (1 + (i % 12) * 0.12);
    const slot = SLOTS[s];
    DB_EQUIPS.push({
      id: `eq_${slot}_${i}`, kind: "equip", slot,
      name: `${EQ_PREFIX[tier]} ${SLOT_VN[slot]} #${i + 1}`, tier,
      atk: slot === "weapon" || slot === "artifact" ? Math.floor(25 * mult) : Math.floor(5 * mult),
      def: slot === "armor" ? Math.floor(20 * mult) : Math.floor(4 * mult),
      hp: slot === "armor" || slot === "artifact" ? Math.floor(120 * mult) : Math.floor(30 * mult),
      spd: slot === "boots" ? Math.floor(12 * mult) : Math.floor(2 * mult),
      price: Math.floor(120 * Math.pow(3.6, tier) * (1 + (i % 7) * 0.15))
    });
  }
}

// 800 Manuals (8 tiers x 100)
const DB_MANUALS = [];
const MAN_NAMES = ["Trường Sinh Quyết", "Thái Thượng Cảm Ứng", "Cửu Chuyển Huyền Công", "Vạn Kiếm Quy Tông", "Bắc Minh Thần Công", "Hỗn Nguyên Đạo Kinh", "Bất Diệt Kim Thân", "Thôn Thiên Ma Công"];
for (let tier = 0; tier < 8; tier++) {
  for (let j = 0; j < 100; j++) {
    const idx = tier * 100 + j;
    const mult = Math.pow(3.3, tier) * (1 + j * 0.03);
    DB_MANUALS.push({
      id: idx, tier,
      name: `${MAN_NAMES[j % 8]} - Quyển ${j + 1}`,
      baseTime: Math.floor(15 * Math.pow(1.55, tier) + (j % 10) * 3),
      expRate: Math.floor(15 * mult),
      atkBonus: Math.floor(25 * mult),
      hpBonus: Math.floor(120 * mult),
      cost: Math.floor(100 * Math.pow(3.5, tier))
    });
  }
}

// 500 Titles
const DB_TITLES = [];
const TITLE_ADJ = ["Sơ Nhập", "Trảm Yêu", "Độc Cô", "Tiêu Dao", "Vô Song", "Cửu Thiên", "Bất Bại", "Hỗn Độn Đế Tôn"];
for (let i = 0; i < 500; i++) {
  const tier = Math.min(7, Math.floor(i / 63));
  const mult = Math.pow(2.5, tier) * (1 + (i % 10) * 0.1);
  DB_TITLES.push({
    id: i, tier, name: `${TITLE_ADJ[tier]} Đạo Quân #${i + 1}`,
    atk: Math.floor(15 * mult), hp: Math.floor(80 * mult),
    price: Math.floor(200 * Math.pow(3, tier))
  });
}

// 50 Sects
const DB_SECTS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  name: ["Thanh Vân Môn", "Thiên Kiếm Tông", "Hợp Hoan Phái", "Vạn Phật Tự", "U Minh Điện", "Thái Cổ Thần Sơn", "Côn Luân Tiên Phái", "Huyết Sát Ma Tông", "Tinh Thần Các", "Hỗn Độn Đạo Cung"][i % 10] + ` (Phân Đà ${Math.floor(i/10)+1})`,
  type: ["Chính Đạo", "Ma Đạo", "Ẩn Thế", "Thượng Cổ"][i % 4],
  bonusMult: +(1.1 + (i * 0.04)).toFixed(2)
}));

// 130 Secret Realms
const DB_SECRET_REALMS = Array.from({ length: 130 }, (_, i) => {
  const stage = Math.floor(i / 10);
  const reqRealm = Math.min(REALMS.length - 1, Math.floor(stage * 1.4));
  return {
    id: i, reqRealm,
    name: `Bí Cảnh ${REALMS[reqRealm].name} - Tầng ${(i % 10) + 1}`,
    powerReq: Math.floor(REALMS[reqRealm].atk * 2.2 * (1 + (i % 10) * 0.18)),
    stoneReward: Math.floor(180 * Math.pow(2.4, stage) * (1 + (i % 10) * 0.15)),
    expReward: Math.floor(300 * Math.pow(2.5, stage))
  };
});

// ================= PLAYER STATE =================
let state = {
  loggedIn: false,
  role: 'player',
  name: "Hàn Lập",
  realmIdx: 0,
  exp: 0,
  hp: 100,
  stones: 2000,
  rebirths: 0,
  rootIdx: 0,
  customRootMult: 0,
  intel: 10,
  comprehendLv: 1,
  daoHeartLv: 1,
  spiritArrayLv: 1,
  tribBonus: 0,
  playSeconds: 0,
  speedMult: 1,
  autoCultivate: true,
  autoBreakthrough: false,
  autoMinChance: 70,
  autoTower: false,
  autoRealm: false,
  selectedAutoRealm: 0,
  autoEquipBest: false, // Auto mặc trang bị tốt nhất
  autoUsePill: false,   // Auto xài đan dược khi HP thấp hoặc cần
  towerFloor: 1,
  sectId: -1,
  sectContrib: 0,
  sectTreasuryStones: 50000, // Tông môn kho báu
  sectTreasuryExp: 100000,
  sectTaskDone: false,       // Nhiệm vụ tông môn hàng ngày
  sectBuildingLv: { hall: 1, alch: 1, forge: 1, library: 1 }, // Các công trình tông môn
  customStats: { atk: 0, def: 0, spd: 0, hp: 0, crit: 5, mult: 1.0 },
  equipped: { weapon: null, armor: null, artifact: null, boots: null },
  bag: [
    { ...DB_PILLS[0], count: 10 },
    { ...DB_PILLS[1], count: 10 },
    { ...DB_EQUIPS[0], uid: 1 },
    { ...DB_EQUIPS[500], uid: 2 }
  ],
  learnedManuals: [],
  equippedManuals: [], // Tối đa 10 bộ công pháp vận chuyển
  comprehending: null,
  unlockedTitles: [0],
  activeTitles: [0], // Đeo đến 10 danh hiệu cùng lúc
  disciples: [],
  auction: null
};

// ================= AUTH SYSTEM =================
let authMode = 'login';
function switchAuthTab(mode, btn) {
  authMode = mode;
  document.querySelectorAll('.login-tabs button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('secGroup').style.display = (mode === 'register' || mode === 'forgot') ? 'block' : 'none';
  document.getElementById('passGroup').style.display = mode === 'forgot' ? 'none' : 'block';
  document.getElementById('authMsg').innerText = "";
}

async function handleAuth() {
  const user = document.getElementById('authUser').value.trim();
  const password = document.getElementById('authPass').value;
  const securityCode = document.getElementById('authSec').value.trim();
  const msg = document.getElementById('authMsg');
  const submit = document.querySelector('#authForm button');

  if (!user || user.length < 3) {
    msg.innerText = "Đạo hiệu phải có ít nhất 3 ký tự.";
    return;
  }

  if (authMode === 'forgot') {
    msg.innerText = "Chức năng khôi phục cần được cấu hình riêng ở máy chủ. Vui lòng liên hệ quản trị viên.";
    return;
  }
  if (password.length < 8) {
    msg.innerText = "Mật khẩu phải có ít nhất 8 ký tự.";
    return;
  }
  if (authMode === 'register' && securityCode.length < 4) {
    msg.innerText = "Mã bảo mật phải có ít nhất 4 ký tự.";
    return;
  }

  submit.disabled = true;
  msg.innerText = "Đang kết nối tiên môn...";
  try {
    const endpoint = authMode === 'register' ? '/api/auth/register' : '/api/auth/login';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ username: user, password, securityCode })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Không thể xác thực tài khoản.');

    state.name = result.username;
    state.role = result.role || 'player';
    state.loggedIn = true;

    // Mỗi tài khoản tải dữ liệu nhân vật riêng từ máy chủ.
    const saveResponse = await fetch('/api/game', { credentials: 'same-origin' });
    if (saveResponse.ok) {
      const saved = await saveResponse.json();
      if (saved.state && typeof saved.state === 'object') {
        Object.assign(state, saved.state);
        state.name = result.username;
        state.role = result.role || 'player';
        state.loggedIn = true;
      }
    }

    // Chỉ hiển thị nút ADMIN TỐI CAO nếu tài khoản có quyền admin
    const adminBtn = document.getElementById('btnAdminPanel');
    if (adminBtn) {
      adminBtn.style.display = state.role === 'admin' ? 'inline-block' : 'none';
    }

    document.getElementById('loginModal').style.display = 'none';
    addChat("Hệ Thống", `Chào mừng đạo hữu <b>${state.name}</b> giáng lâm Tu Tiên Giới!`, "var(--gold)");
    startAuction();
    updateUI();
    switchTab('cultivate', document.querySelector('#mainNav button'));
    msg.innerText = "";
  } catch (error) {
    msg.innerText = error.message || "Lỗi kết nối máy chủ.";
  } finally {
    submit.disabled = false;
  }
}

let lastSaveAt = 0;
async function saveGameToServer(force = false) {
  if (!state.loggedIn) return;
  const now = Date.now();
  if (!force && now - lastSaveAt < 15000) return;
  lastSaveAt = now;
  try {
    const response = await fetch('/api/game', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ state })
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      console.warn('Không thể lưu nhân vật:', result.error || response.status);
    }
  } catch (error) {
    console.warn('Mất kết nối máy chủ, dữ liệu chưa được đồng bộ.', error);
  }
}

window.addEventListener('beforeunload', () => {
  // Lưu nền định kỳ là cơ chế chính; beforeunload chỉ là nỗ lực bổ sung.
  if (state.loggedIn) {
    fetch('/api/game', {
      method: 'PUT',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ state })
    }).catch(() => {});
  }
});

// ================= MUSIC PLAYER =================
let playlist = [
  { name: "Phonk: Murder In My Mind", freq: 110 },
  { name: "Phonk: Metamorphosis", freq: 130 },
  { name: "Phonk: Neon Blade", freq: 98 },
  { name: "Phonk: Rave Drift", freq: 146 }
];
let currentTrack = 0, isPlaying = false, synthInterval = null, audioCtx = null;

function initMusicSelect() {
  document.getElementById('musicSelect').innerHTML = playlist.map((t, i) => `<option value="${i}">${t.name}</option>`).join('');
}
initMusicSelect();

function loadLocalMusic(e) {
  const files = Array.from(e.target.files).filter(f => f.type.startsWith('audio/'));
  if (!files.length) return;
  files.forEach(f => playlist.push({ name: "📁 " + f.name, url: URL.createObjectURL(f) }));
  initMusicSelect();
  currentTrack = playlist.length - files.length;
  document.getElementById('musicSelect').value = currentTrack;
  playCurrentTrack();
  addChat("Âm Luật", `Đã nạp <b>${files.length}</b> bản nhạc từ thư mục máy!`, "var(--cyan)");
}

function togglePlay() { isPlaying ? stopMusic() : playCurrentTrack(); }
function playCurrentTrack() {
  stopMusic(); isPlaying = true; document.getElementById('btnPlay').innerText = "⏸️";
  const track = playlist[currentTrack];
  const audioEl = document.getElementById('bgAudio');
  if (track.url) { audioEl.src = track.url; audioEl.play(); }
  else {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let step = 0;
    const notes = [track.freq, track.freq, track.freq * 1.2, track.freq * 1.5, track.freq, track.freq * 1.33];
    synthInterval = setInterval(() => {
      if (!isPlaying) return;
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(notes[step % notes.length], audioCtx.currentTime);
      gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.23);
      step++;
    }, 250);
  }
}
function stopMusic() { isPlaying = false; document.getElementById('btnPlay').innerText = "▶️"; document.getElementById('bgAudio').pause(); if (synthInterval) clearInterval(synthInterval); }
function changeTrack(idx) { currentTrack = parseInt(idx); if (isPlaying) playCurrentTrack(); }
function nextTrack() { currentTrack = (currentTrack + 1) % playlist.length; document.getElementById('musicSelect').value = currentTrack; if (isPlaying) playCurrentTrack(); }

// ================= CORE STATS CALCULATION =================
function getStats() {
  const r = REALMS[state.realmIdx];
  const rootObj = SPIRIT_ROOTS[state.rootIdx];
  const rootMult = state.customRootMult > 0 ? state.customRootMult : rootObj.mult;
  const rebirthMult = (1 + state.rebirths * 1.0) * state.customStats.mult;
  const sectMult = state.sectId >= 0 ? DB_SECTS[state.sectId].bonusMult * (1 + Math.floor(state.sectContrib / 1000) * 0.1) * (1 + (state.sectBuildingLv.hall - 1) * 0.05) : 1;
  const arrayMult = 1 + (state.spiritArrayLv - 1) * 0.25;
  const daoHeartMult = 1 + (state.daoHeartLv - 1) * 0.15;

  // Tổng hợp bonus từ max 10 danh hiệu đang đeo
  let titleAtk = 0, titleHp = 0;
  state.activeTitles.forEach(tid => {
    const tObj = DB_TITLES[tid];
    if (tObj) { titleAtk += tObj.atk; titleHp += tObj.hp; }
  });

  let eqAtk = 0, eqDef = 0, eqHp = 0, eqSpd = 0;
  Object.values(state.equipped).forEach(eq => {
    if (eq) { eqAtk += eq.atk; eqDef += eq.def; eqHp += eq.hp; eqSpd += eq.spd; }
  });

  // Active Equipped Manuals (max 10 slots) give 100% power; Learned passive manuals give 20%
  let manAtk = 0, manHp = 0, manExp = 0;
  state.learnedManuals.forEach(id => {
    const m = DB_MANUALS[id];
    if (!m) return;
    const isEquipped = state.equippedManuals.includes(id);
    const factor = isEquipped ? 1.0 : 0.2;
    manAtk += m.atkBonus * factor;
    manHp += m.hpBonus * factor;
    manExp += m.expRate * factor;
  });

  const atk = Math.floor((r.atk + eqAtk + manAtk + titleAtk + state.customStats.atk) * rebirthMult * sectMult * daoHeartMult);
  const def = Math.floor((r.def + eqDef + state.customStats.def) * rebirthMult * sectMult * daoHeartMult);
  const maxHp = Math.floor((r.hp + eqHp + manHp + titleHp + state.customStats.hp) * rebirthMult * sectMult * daoHeartMult);
  const spd = Math.floor((r.spd + eqSpd + state.customStats.spd) * (1 + state.rebirths * 0.2));
  const expGain = Math.floor((12 + state.realmIdx * 18 + manExp) * rootMult * arrayMult * rebirthMult * sectMult);
  const tribChance = Math.min(100, Math.floor((r.trib * 100) + state.rebirths * 10 + (state.daoHeartLv - 1) * 3 + state.tribBonus));
  const timeReduction = Math.min(0.96, (rootMult - 1) * 0.08 + state.intel * 0.004 + (state.comprehendLv - 1) * 0.04);

  return { atk, def, maxHp, spd, expGain, tribChance, rebirthMult, rootMult, rootObj, timeReduction };
}

// ================= AUTO EQUIP BEST =================
function checkAutoEquipBest() {
  if (!state.autoEquipBest) return;
  SLOTS.forEach(slot => {
    const current = state.equipped[slot];
    const currentScore = current ? (current.atk * 2 + current.def * 2 + current.hp / 5) : 0;
    
    // Tìm trong túi đồ món cùng slot có điểm cao nhất
    let bestIdx = -1, bestScore = currentScore;
    state.bag.forEach((item, idx) => {
      if (item.kind === 'equip' && item.slot === slot) {
        const score = item.atk * 2 + item.def * 2 + item.hp / 5;
        if (score > bestScore) {
          bestScore = score;
          bestIdx = idx;
        }
      }
    });

    if (bestIdx !== -1) {
      const bestItem = state.bag[bestIdx];
      state.bag.splice(bestIdx, 1);
      if (current) state.bag.push(current);
      state.equipped[slot] = bestItem;
    }
  });
}

// ================= AUTO USE PILL =================
function checkAutoUsePill() {
  if (!state.autoUsePill) return;
  const stats = getStats();
  // Nếu HP < 50%, tìm đan hồi HP dùng ngay
  if (state.hp < stats.maxHp * 0.5) {
    const pillIdx = state.bag.findIndex(it => it.kind === 'pill' && it.pType === 'hp' && it.count > 0);
    if (pillIdx !== -1) usePill(pillIdx, 1);
  }
}

// ================= BREAKTHROUGH & REINCARNATION =================
function attemptBreakthrough() {
  if (state.realmIdx >= REALMS.length - 1) return;
  const r = REALMS[state.realmIdx];
  if (state.exp < r.req) return;

  const stats = getStats();
  state.exp -= r.req;

  if (state.realmIdx >= 3) {
    const roll = Math.random() * 100;
    state.tribBonus = 0;
    if (roll <= stats.tribChance) {
      state.realmIdx++;
      state.hp = getStats().maxHp;
      addChat("Thiên Kiếp", `⚡ Chúc mừng <b>${state.name}</b> độ kiếp thành công, đột phá <b>${REALMS[state.realmIdx].name}</b>!`, "var(--gold)");
    } else {
      state.realmIdx = Math.max(0, state.realmIdx - 1);
      state.hp = Math.floor(getStats().maxHp * 0.25);
      addChat("Thiên Kiếp", `💥 Đáng tiếc! <b>${state.name}</b> độ kiếp thất bại, bị Thiên Lôi đánh rớt xuống <b>${REALMS[state.realmIdx].name}</b>!`, "var(--red)");
    }
  } else {
    state.realmIdx++;
    state.hp = getStats().maxHp;
    addChat("Đột Phá", `✨ <b>${state.name}</b> thuận lợi tiến giai <b>${REALMS[state.realmIdx].name}</b>!`, "var(--green)");
  }
  updateUI();
}

function doRebirth() {
  if (state.realmIdx < 13) {
    alert("Cần đạt tối thiểu Đại Thừa Kỳ để ngưng tụ Đại Đạo Ấn Ký mới có thể giữ ký ức Trùng Sinh!");
    return;
  }
  state.rebirths++;
  state.realmIdx = 1;
  state.exp = 0;
  state.hp = getStats().maxHp;
  addChat("Luân Hồi", `🔄 <b>${state.name}</b> mang theo Đại Đạo Ấn Ký Trùng Sinh lần thứ <b>${state.rebirths}</b>! Toàn bộ chỉ số tăng vĩnh viễn +100%!`, "var(--purple)");
  updateUI();
}

// ================= PAGINATION & FILTER STATES =================
let currentTab = 'cultivate';
let bagSearch = "", bagFilter = "all", bagPage = 0;
let manualPage = 0, manualTierFilter = -1, manualSearch = "";
let realmPage = 0, realmSearch = "";
let sectPage = 0, sectSearch = "", sectTypeFilter = "all";
let shopSubTab = 'pills', shopPage = 0, shopSearch = "";
let titlePage = 0, titleSearch = "";

function switchTab(tab, btn) {
  currentTab = tab;
  if (btn) {
    document.querySelectorAll('#mainNav button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderTab();
}

function renderPagination(currentPage, totalItems, perPage, onPageChangeFn) {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  if (currentPage >= totalPages) currentPage = totalPages - 1;
  return `
    <div class="page-bar">
      <button ${currentPage===0?'disabled':''} onclick="${onPageChangeFn}(0)">⏮ Đầu</button>
      <button ${currentPage===0?'disabled':''} onclick="${onPageChangeFn}(${currentPage-1})">◀ Trước</button>
      <span style="font-size:12px;">Trang <b>${currentPage+1}</b> / ${totalPages}</span>
      <input type="number" min="1" max="${totalPages}" placeholder="Trang..." style="width:65px; padding:4px;" onkeydown="if(event.key==='Enter'){ let p=Math.min(${totalPages},Math.max(1,Number(this.value)))-1; ${onPageChangeFn}(p); }">
      <button ${currentPage>=totalPages-1?'disabled':''} onclick="${onPageChangeFn}(${currentPage+1})">Sau ▶</button>
      <button ${currentPage>=totalPages-1?'disabled':''} onclick="${onPageChangeFn}(${totalPages-1})">Cuối ⏭</button>
    </div>
  `;
}

// ================= RENDER TABS =================
function renderTab() {
  const box = document.getElementById('tabContent');
  const stats = getStats();
  const r = REALMS[state.realmIdx];

  if (currentTab === 'cultivate') {
    const canBreak = state.exp >= r.req && state.realmIdx < REALMS.length - 1;
    const compCost = state.comprehendLv * 1500;
    const daoCost = state.daoHeartLv * 2000;
    const arrCost = state.spiritArrayLv * 1800;

    box.innerHTML = `
      <div class="card">
        <h3 style="color:var(--gold)">🧘 Động Phủ Tu Luyện & Đột Phá</h3>
        <p style="font-size:12px; color:var(--muted); margin:5px 0;">Tốc độ hấp thu: <b style="color:var(--green)">+${(stats.expGain * state.speedMult).toLocaleString()} Tu Vi / giây</b></p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
          <button class="btn-cyan" onclick="manualCultivate()">⚡ Vận Công (+${(stats.expGain*5).toLocaleString()})</button>
          <button class="btn-gold" ${canBreak ? '' : 'disabled'} onclick="attemptBreakthrough()">
            🔥 ${state.realmIdx >= 3 ? `Độ Kiếp Đột Phá (${stats.tribChance}%)` : 'Đột Phá Cảnh Giới'}
          </button>
          <button class="btn-purple" ${state.realmIdx >= 13 ? '' : 'disabled'} onclick="doRebirth()">
            🔄 Trùng Sinh Đại Đạo (Từ Đại Thừa)
          </button>
        </div>
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-top:10px; font-size:12px;">
          <span>Tốc Độ:</span>
          ${[1, 2, 5, 10].map(m => `<button class="${state.speedMult===m?'btn-gold':''}" onclick="state.speedMult=${m};renderTab()">x${m}</button>`).join('')}
          <label style="margin-left:8px;"><input type="checkbox" ${state.autoCultivate?'checked':''} onchange="state.autoCultivate=this.checked"> Auto Tu Luyện</label>
          <label><input type="checkbox" ${state.autoBreakthrough?'checked':''} onchange="state.autoBreakthrough=this.checked"> Auto Độ Kiếp >= <input type="number" value="${state.autoMinChance}" style="width:50px; padding:2px;" onchange="state.autoMinChance=Number(this.value)">%</label>
          <label><input type="checkbox" ${state.autoEquipBest?'checked':''} onchange="state.autoEquipBest=this.checked"> Auto Mặc Đồ Tốt Nhất</label>
          <label><input type="checkbox" ${state.autoUsePill?'checked':''} onchange="state.autoUsePill=this.checked"> Auto Xài Đan Hồi HP</label>
        </div>
      </div>

      <div class="grid-3">
        <div class="card">
          <h4 style="color:var(--cyan)">🧠 Nâng Cấp Lĩnh Ngộ (Lv.${state.comprehendLv})</h4>
          <p style="font-size:11px; color:var(--muted); margin:4px 0;">Giảm thời gian học công pháp & tăng Ngộ Tính (+2/cấp). Hiện giảm: <b>-${Math.round(stats.timeReduction*100)}%</b></p>
          <div style="display:flex; gap:4px; flex-wrap:wrap; margin-top:6px;">
            <button class="btn-cyan" onclick="upgradeFacilityMulti('comp', ${compCost}, 1)">x1 (${compCost.toLocaleString()})</button>
            <button class="btn-cyan" onclick="upgradeFacilityMulti('comp', ${compCost}, 10)">x10</button>
            <button class="btn-cyan" onclick="upgradeFacilityMulti('comp', ${compCost}, 100)">x100</button>
            <button class="btn-cyan" onclick="upgradeFacilityMulti('comp', ${compCost}, 1000)">x1000</button>
          </div>
        </div>
        <div class="card">
          <h4 style="color:var(--purple)">🧘 Nâng Cấp Đạo Tâm (Lv.${state.daoHeartLv})</h4>
          <p style="font-size:11px; color:var(--muted); margin:4px 0;">Tăng +15% toàn bộ chỉ số & +3% tỷ lệ Độ Kiếp mỗi cấp.</p>
          <div style="display:flex; gap:4px; flex-wrap:wrap; margin-top:6px;">
            <button class="btn-purple" onclick="upgradeFacilityMulti('dao', ${daoCost}, 1)">x1 (${daoCost.toLocaleString()})</button>
            <button class="btn-purple" onclick="upgradeFacilityMulti('dao', ${daoCost}, 10)">x10</button>
            <button class="btn-purple" onclick="upgradeFacilityMulti('dao', ${daoCost}, 100)">x100</button>
            <button class="btn-purple" onclick="upgradeFacilityMulti('dao', ${daoCost}, 1000)">x1000</button>
          </div>
        </div>
        <div class="card">
          <h4 style="color:var(--gold)">🌀 Tụ Linh Trận (Lv.${state.spiritArrayLv})</h4>
          <p style="font-size:11px; color:var(--muted); margin:4px 0;">Tăng +25% tốc độ hấp thu Tu Vi mỗi cấp.</p>
          <div style="display:flex; gap:4px; flex-wrap:wrap; margin-top:6px;">
            <button class="btn-gold" onclick="upgradeFacilityMulti('arr', ${arrCost}, 1)">x1 (${arrCost.toLocaleString()})</button>
            <button class="btn-gold" onclick="upgradeFacilityMulti('arr', ${arrCost}, 10)">x10</button>
            <button class="btn-gold" onclick="upgradeFacilityMulti('arr', ${arrCost}, 100)">x100</button>
            <button class="btn-gold" onclick="upgradeFacilityMulti('arr', ${arrCost}, 1000)">x1000</button>
          </div>
        </div>
      </div>

      <div class="card" style="border-color:var(--green)">
        <h3 style="color:var(--green)">🌿 Tẩy Tủy Trì - Roll Đổi Linh Căn</h3>
        <p style="font-size:12px; margin:5px 0;">Linh căn hiện tại: <b class="t-${stats.rootObj.tier}">${stats.rootObj.name} (x${stats.rootMult})</b></p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
          <button class="btn-green" onclick="rollSpiritRoot(1)">🎲 Roll x1 (1k 💎)</button>
          <button class="btn-gold" onclick="rollSpiritRoot(10)">🔥 Roll x10 (9k 💎)</button>
          <button class="btn-purple" onclick="rollSpiritRoot(100)">⚡ Roll x100 (85k 💎)</button>
        </div>
      </div>
    `;
  }

  else if (currentTab === 'bag') {
    const filtered = state.bag.filter(it => (bagFilter === 'all' || it.kind === bagFilter || it.slot === bagFilter) && it.name.toLowerCase().includes(bagSearch.toLowerCase()));
    const pageItems = filtered.slice(bagPage * 20, (bagPage + 1) * 20);
    box.innerHTML = `
      <div class="filter-bar">
        <input type="text" placeholder="🔍 Tìm đồ trong túi..." value="${bagSearch}" oninput="bagSearch=this.value; bagPage=0; renderTab()">
        <select onchange="bagFilter=this.value; bagPage=0; renderTab()">
          <option value="all">Tất cả (${state.bag.length})</option>
          <option value="pill" ${bagFilter==='pill'?'selected':''}>💊 Đan Dược</option>
          <option value="weapon" ${bagFilter==='weapon'?'selected':''}>⚔️ Vũ Khí</option>
          <option value="armor" ${bagFilter==='armor'?'selected':''}>🛡️ Đạo Bào</option>
          <option value="artifact" ${bagFilter==='artifact'?'selected':''}>🔮 Pháp Bảo</option>
          <option value="boots" ${bagFilter==='boots'?'selected':''}>👢 Pháp Hài</option>
        </select>
        <button class="btn-red" onclick="sellAllLowTier()">Bán Nhanh Đồ Phàm/Hoàng</button>
      </div>
      <div class="grid-2">
        ${pageItems.map(item => {
          const realIdx = state.bag.indexOf(item);
          return `
            <div class="card">
              <div class="t-${item.tier}" style="font-weight:bold; font-size:12.5px;">${item.name} ${item.count ? `(x${item.count})` : ''}</div>
              <div style="font-size:11px; color:var(--muted); margin:4px 0;">
                ${item.kind === 'pill' ? item.desc : `Công +${item.atk.toLocaleString()} | Thủ +${item.def.toLocaleString()} | HP +${item.hp.toLocaleString()}`}
              </div>
              <div style="display:flex; gap:5px; flex-wrap:wrap; margin-top:6px;">
                ${item.kind === 'pill'
                  ? `<button class="btn-green" onclick="usePill(${realIdx}, 1)">Dùng x1</button>
                     ${item.count >= 10 ? `<button class="btn-cyan" onclick="usePill(${realIdx}, 10)">x10</button>` : ''}
                     ${item.count >= 100 ? `<button class="btn-purple" onclick="usePill(${realIdx}, 100)">x100</button>` : ''}`
                  : `<button class="btn-cyan" onclick="equipItem(${realIdx})">Trang Bị</button>`}
                <button class="btn-red" onclick="sellItem(${realIdx})">Bán</button>
              </div>
            </div>`;
        }).join('') || '<div class="card">Không tìm thấy vật phẩm phù hợp.</div>'}
      </div>
      ${renderPagination(bagPage, filtered.length, 20, 'setBagPage')}
    `;
  }

  else if (currentTab === 'manuals') {
    const filtered = DB_MANUALS.filter(m => (manualTierFilter === -1 || m.tier === manualTierFilter) && m.name.toLowerCase().includes(manualSearch.toLowerCase()));
    const pageItems = filtered.slice(manualPage * 20, (manualPage + 1) * 20);

    let compHtml = '';
    if (state.comprehending) {
      const m = DB_MANUALS[state.comprehending.id];
      const pct = Math.min(100, Math.floor(((state.comprehending.total - state.comprehending.remain) / state.comprehending.total) * 100));
      compHtml = `
        <div class="card" style="border-color:var(--gold)">
          <b>📖 Đang Lĩnh Ngộ: <span class="t-${m.tier}">${m.name}</span></b>
          <div style="font-size:12px; margin:4px 0;">Còn lại: <b style="color:var(--cyan)">${state.comprehending.remain}s</b> (${pct}%)</div>
          <button class="btn-gold" onclick="instantComprehend()">⚡ Đốn Ngộ Ngay (${(m.cost*2).toLocaleString()} 💎)</button>
        </div>`;
    }

    // Equipped Manuals Bar (10 slots)
    const eqManHtml = `
      <div class="card" style="border-color:var(--cyan)">
        <div style="font-size:12px; font-weight:bold; color:var(--cyan); margin-bottom:6px;">🔥 Công Pháp Đang Vận Chuyển (${state.equippedManuals.length}/10 ô - Tối đa 10 bộ phát huy 100% uy lực, công pháp đã học khác phát huy 20%):</div>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${state.equippedManuals.map(id => {
            const m = DB_MANUALS[id];
            return `<span class="badge" style="background:#263147; padding:4px 8px; cursor:pointer;" onclick="toggleEquipManual(${id})" title="Bấm để tháo">${m.name} ✖</span>`;
          }).join('') || '<span style="font-size:11px; color:var(--muted)">Chưa vận chuyển công pháp nào. Hãy lĩnh ngộ và bấm "Sử Dụng / Vận Chuyển"!</span>'}
        </div>
      </div>
    `;

    box.innerHTML = `
      ${eqManHtml}
      ${compHtml}
      <div class="filter-bar">
        <input type="text" placeholder="🔍 Tìm tên công pháp..." value="${manualSearch}" oninput="manualSearch=this.value; manualPage=0; renderTab()">
        <select onchange="manualTierFilter=Number(this.value); manualPage=0; renderTab()">
          <option value="-1">Tất cả 8 Phẩm Cấp (800 cuốn)</option>
          ${TIER_NAMES.map((n, i) => `<option value="${i}" ${manualTierFilter===i?'selected':''}>${n} (100 cuốn)</option>`).join('')}
        </select>
        <span style="font-size:11px; color:var(--green)">Giảm thời gian học: -${Math.round(stats.timeReduction*100)}%</span>
      </div>
      <div class="grid-2">
        ${pageItems.map(m => {
          const learned = state.learnedManuals.includes(m.id);
          const equipped = state.equippedManuals.includes(m.id);
          const reqSec = Math.max(2, Math.floor(m.baseTime * (1 - stats.timeReduction)));
          return `
            <div class="card" style="${equipped ? 'border-color:var(--gold)' : ''}">
              <div class="t-${m.tier}" style="font-weight:bold; font-size:12px;">${m.name}</div>
              <div style="font-size:11px; color:var(--muted); margin:4px 0;">+${m.expRate.toLocaleString()} Tu Vi/s | +${m.atkBonus.toLocaleString()} Công | Học: ${reqSec}s</div>
              ${learned
                ? `<button class="${equipped?'btn-red':'btn-green'}" onclick="toggleEquipManual(${m.id})">${equipped ? 'Ngừng Vận Chuyển' : '⚡ Sử Dụng (Vận Chuyển)'}</button>`
                : `<button class="btn-cyan" onclick="startComprehend(${m.id}, ${reqSec})">Lĩnh Ngộ (${m.cost.toLocaleString()} 💎)</button>`}
            </div>`;
        }).join('')}
      </div>
      ${renderPagination(manualPage, filtered.length, 20, 'setManualPage')}
    `;
  }

  else if (currentTab === 'realms') {
    const filtered = DB_SECRET_REALMS.filter(sr => sr.name.toLowerCase().includes(realmSearch.toLowerCase()));
    const pageItems = filtered.slice(realmPage * 20, (realmPage + 1) * 20);
    box.innerHTML = `
      <div class="card" style="border-color:var(--gold)">
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <label style="font-size:12px;"><input type="checkbox" ${state.autoRealm?'checked':''} onchange="state.autoRealm=this.checked"> <b>Auto Treo Bí Cảnh</b></label>
          <select onchange="state.selectedAutoRealm=Number(this.value)" style="max-width:260px;">
            ${DB_SECRET_REALMS.map(sr => `<option value="${sr.id}" ${state.selectedAutoRealm===sr.id?'selected':''}>${sr.name} (Lực: ${sr.powerReq.toLocaleString()})</option>`).join('')}
          </select>
          <button class="btn-cyan" onclick="selectBestRealm()">Chọn Bí Cảnh Tốt Nhất</button>
        </div>
      </div>
      <div class="filter-bar">
        <input type="text" placeholder="🔍 Tìm tên bí cảnh..." value="${realmSearch}" oninput="realmSearch=this.value; realmPage=0; renderTab()">
        <span style="font-size:11px; color:var(--muted)">Tổng: 130 Bí Cảnh (10 tầng mỗi đại cảnh giới)</span>
      </div>
      <div class="grid-2">
        ${pageItems.map(sr => `
          <div class="card">
            <b style="color:var(--cyan); font-size:12.5px;">${sr.name}</b>
            <div style="font-size:11px; color:var(--muted); margin:4px 0;">Chiến lực yêu cầu: ${sr.powerReq.toLocaleString()}<br>Thưởng: +${sr.stoneReward.toLocaleString()} 💎 | +${sr.expReward.toLocaleString()} Tu Vi</div>
            <div style="display:flex; gap:6px;">
              <button class="btn-gold" onclick="exploreRealm(${sr.id})">⚔️ Thám Hiểm</button>
              <button class="btn-purple" onclick="state.selectedAutoRealm=${sr.id}; state.autoRealm=true; renderTab();">Treo Tự Động</button>
            </div>
          </div>
        `).join('')}
      </div>
      ${renderPagination(realmPage, filtered.length, 20, 'setRealmPage')}
    `;
  }

  else if (currentTab === 'tower') {
    const floorPower = Math.floor(50 * Math.pow(1.38, state.towerFloor));
    box.innerHTML = `
      <div class="card">
        <h3 style="color:var(--gold)">🗼 Thông Thiên Tháp - Tầng ${state.towerFloor}</h3>
        <p style="font-size:12px; margin:6px 0;">Chiến Lực Thủ Vệ: <b style="color:var(--red)">${floorPower.toLocaleString()}</b> | Chiến Lực Bạn: <b style="color:var(--green)">${(stats.atk + stats.def).toLocaleString()}</b></p>
        <div style="display:flex; gap:10px; align-items:center;">
          <button class="btn-gold" onclick="climbTower()">⚔️ Khiêu Chiến Tầng ${state.towerFloor}</button>
          <label style="font-size:12px;"><input type="checkbox" ${state.autoTower?'checked':''} onchange="state.autoTower=this.checked"> Auto Leo Tháp</label>
        </div>
      </div>
      <div class="card">
        <h3 style="color:var(--red)">⚔️ Đấu Trường Luận Kiếm (PvP)</h3>
        <div class="grid-2" style="margin-top:8px;">
          ${["Lệ Phi Vũ", "Nam Cung Uyển", "Vương Lâm", "Tiêu Viêm"].map((rival, idx) => {
            const pwr = Math.floor((stats.atk + stats.def) * (0.7 + idx * 0.25));
            return `<div class="card"><b>${rival}</b><div style="font-size:11px; color:var(--muted)">Chiến lực: ${pwr.toLocaleString()}</div><button class="btn-red" style="margin-top:6px;" onclick="fightPvP('${rival}', ${pwr})">Tỷ Thí</button></div>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  else if (currentTab === 'sects') {
    const filtered = DB_SECTS.filter(s => (sectTypeFilter === 'all' || s.type === sectTypeFilter) && s.name.toLowerCase().includes(sectSearch.toLowerCase()));
    const pageItems = filtered.slice(sectPage * 16, (sectPage + 1) * 16);
    box.innerHTML = `
      <div class="filter-bar">
        <input type="text" placeholder="🔍 Tìm tên tông môn..." value="${sectSearch}" oninput="sectSearch=this.value; sectPage=0; renderTab()">
        <select onchange="sectTypeFilter=this.value; sectPage=0; renderTab()">
          <option value="all">Tất cả hệ phái (50 Tông Môn)</option>
          <option value="Chính Đạo" ${sectTypeFilter==='Chính Đạo'?'selected':''}>Chính Đạo</option>
          <option value="Ma Đạo" ${sectTypeFilter==='Ma Đạo'?'selected':''}>Ma Đạo</option>
          <option value="Ẩn Thế" ${sectTypeFilter==='Ẩn Thế'?'selected':''}>Ẩn Thế</option>
          <option value="Thượng Cổ" ${sectTypeFilter==='Thượng Cổ'?'selected':''}>Thượng Cổ</option>
        </select>
      </div>
      <div class="grid-2">
        ${pageItems.map(s => {
          const joined = state.sectId === s.id;
          return `
            <div class="card" style="${joined ? 'border-color:var(--gold)' : ''}">
              <b style="color:var(--gold)">${s.name}</b> <span class="badge" style="background:#263147">${s.type}</span>
              <div style="font-size:11px; color:var(--muted); margin:4px 0;">Hệ số môn phái: <b>x${s.bonusMult}</b></div>
              ${joined
                ? `<button class="btn-green" onclick="contributeSect()">Cống Hiến 500 💎 (Điểm: ${state.sectContrib})</button>`
                : `<button class="btn-cyan" onclick="state.sectId=${s.id}; state.sectContrib=0; updateUI(); renderTab();">Gia Nhập</button>`}
            </div>`;
        }).join('')}
      </div>
      ${renderPagination(sectPage, filtered.length, 16, 'setSectPage')}
    `;
  }

  else if (currentTab === 'shop') {
    const baseList = shopSubTab === 'pills' ? DB_PILLS : DB_EQUIPS.filter(e => e.slot === shopSubTab);
    const filtered = baseList.filter(it => it.name.toLowerCase().includes(shopSearch.toLowerCase()));
    const pageItems = filtered.slice(shopPage * 18, (shopPage + 1) * 18);
    box.innerHTML = `
      <div class="filter-bar">
        <button class="${shopSubTab==='pills'?'btn-gold':''}" onclick="shopSubTab='pills';shopPage=0;renderTab()">💊 Đan Dược (500)</button>
        <button class="${shopSubTab==='weapon'?'btn-gold':''}" onclick="shopSubTab='weapon';shopPage=0;renderTab()">⚔️ Vũ Khí (500)</button>
        <button class="${shopSubTab==='armor'?'btn-gold':''}" onclick="shopSubTab='armor';shopPage=0;renderTab()">🛡️ Đạo Bào (500)</button>
        <button class="${shopSubTab==='artifact'?'btn-gold':''}" onclick="shopSubTab='artifact';shopPage=0;renderTab()">🔮 Pháp Bảo (500)</button>
        <button class="${shopSubTab==='boots'?'btn-gold':''}" onclick="shopSubTab='boots';shopPage=0;renderTab()">👢 Pháp Hài (500)</button>
        <input type="text" placeholder="🔍 Tìm vật phẩm..." value="${shopSearch}" oninput="shopSearch=this.value; shopPage=0; renderTab()">
      </div>
      <div class="grid-2">
        ${pageItems.map(it => `
          <div class="card">
            <div class="t-${it.tier}" style="font-weight:bold; font-size:12px;">${it.name}</div>
            <div style="font-size:11px; color:var(--muted); margin:4px 0;">${it.kind==='pill' ? it.desc : `Công +${it.atk.toLocaleString()} | Thủ +${it.def.toLocaleString()} | HP +${it.hp.toLocaleString()}`}</div>
            <div style="display:flex; gap:4px; flex-wrap:wrap; margin-top:6px;">
              <button class="btn-gold" onclick="buyShopItem('${it.id}', 1)">Mua x1 (${it.price.toLocaleString()} 💎)</button>
              <button class="btn-cyan" onclick="buyShopItem('${it.id}', 10)">x10</button>
              <button class="btn-purple" onclick="buyShopItem('${it.id}', 100)">x100</button>
              <button class="btn-green" onclick="buyShopItem('${it.id}', 1000)">x1000</button>
            </div>
          </div>
        `).join('')}
      </div>
      ${renderPagination(shopPage, filtered.length, 18, 'setShopPage')}
    `;
  }

  else if (currentTab === 'auction') {
    if (!state.auction) startAuction();
    const a = state.auction;
    box.innerHTML = `
      <div class="card" style="border-color:var(--gold)">
        <h3 style="color:var(--gold)">🔨 ĐẤU GIÁ HỘI VẠN GIỚI</h3>
        <p style="font-size:12px; color:var(--muted);">Thời gian còn lại: <b style="color:var(--red)">${a.timeLeft}s</b></p>
        <div class="card" style="margin-top:10px;">
          <div class="t-${a.item.tier}" style="font-size:16px; font-weight:bold;">${a.item.name}</div>
          <div style="font-size:12px; margin:6px 0;">Giá hiện tại: <b style="color:var(--cyan)">${a.currentBid.toLocaleString()} 💎</b> (Giữ giá: <b style="color:var(--gold)">${a.highestBidder}</b>)</div>
          <div style="display:flex; gap:8px; margin-top:8px;">
            <button class="btn-gold" onclick="placeBid(1.1)">Ra Giá +10% (${Math.floor(a.currentBid*1.1).toLocaleString()} 💎)</button>
            <button class="btn-purple" onclick="placeBid(1.3)">Ép Giá +30% (${Math.floor(a.currentBid*1.3).toLocaleString()} 💎)</button>
          </div>
        </div>
      </div>
    `;
  }

  else if (currentTab === 'disciples') {
    const hallLv = state.sectBuildingLv.hall;
    const alchLv = state.sectBuildingLv.alch;
    const forgeLv = state.sectBuildingLv.forge;
    const libLv = state.sectBuildingLv.library;

    box.innerHTML = `
      <div class="card" style="border-color:var(--gold)">
        <h3 style="color:var(--gold)">🏯 Tông Môn Độc Lập & Kho Báu</h3>
        <p style="font-size:11.5px; color:var(--muted); margin:4px 0;">Kho báu tông môn tích lũy: <b style="color:var(--cyan)">${Math.floor(state.sectTreasuryStones).toLocaleString()} 💎</b> & <b style="color:var(--green)">${Math.floor(state.sectTreasuryExp).toLocaleString()} Tu Vi</b></p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
          <button class="btn-cyan" onclick="collectTreasury()">📥 Thu Hoạch Kho Báu</button>
          <button class="btn-gold" onclick="doSectDailyTask()">${state.sectTaskDone ? '✅ Đã Làm Nhiệm Vụ Hôm Nay' : '📜 Nhận Nhiệm Vụ Tông Môn (+5k 💎)'}</button>
        </div>
        <div class="grid-2" style="margin-top:10px;">
          <div class="card"><b>1. Tông Môn Đại Điện (Lv.${hallLv})</b><div style="font-size:11px; color:var(--muted)">Tăng % tài nguyên kho báu.</div><button class="btn-cyan" style="margin-top:4px;" onclick="upgradeSectBuilding('hall', ${hallLv*5000})">Nâng Cấp (${(hallLv*5000).toLocaleString()} 💎)</button></div>
          <div class="card"><b>2. Luyện Đan Phòng (Lv.${alchLv})</b><div style="font-size:11px; color:var(--muted)">Tự động chế tạo đan dược mỗi phút.</div><button class="btn-green" style="margin-top:4px;" onclick="upgradeSectBuilding('alch', ${alchLv*5000})">Nâng Cấp (${(alchLv*5000).toLocaleString()} 💎)</button></div>
          <div class="card"><b>3. Luyện Khí Các (Lv.${forgeLv})</b><div style="font-size:11px; color:var(--muted)">Tự động đúc trang bị mỗi phút.</div><button class="btn-gold" style="margin-top:4px;" onclick="upgradeSectBuilding('forge', ${forgeLv*5000})">Nâng Cấp (${(forgeLv*5000).toLocaleString()} 💎)</button></div>
          <div class="card"><b>4. Tàng Thư Các (Lv.${libLv})</b><div style="font-size:11px; color:var(--muted)">Tăng điểm ngộ tính & kinh nghiệm.</div><button class="btn-purple" style="margin-top:4px;" onclick="upgradeSectBuilding('library', ${libLv*5000})">Nâng Cấp (${(libLv*5000).toLocaleString()} 💎)</button></div>
        </div>
      </div>

      <div class="card" style="margin-top:10px;">
        <h3 style="color:var(--cyan)">👥 Quản Lý Đồ Đệ & Truyền Công (Tài nguyên tăng theo Tu Vi sư phụ)</h3>
        <p style="font-size:11.5px; color:var(--muted); margin:4px 0;">Đệ tử tự tu luyện, chi phí và hiệu quả truyền công scale theo cảnh giới & tu vi của đạo hữu!</p>
        <button class="btn-gold" style="margin-top:6px;" onclick="recruitDisciple()">✨ Chiêu Mộ Đệ Tử Mới (1,000 💎)</button>
      </div>
      <div class="grid-2">
        ${state.disciples.map((d, i) => {
          const dRealm = REALMS[d.realmIdx];
          const teachCost = Math.floor(500 * Math.pow(1.5, state.realmIdx));
          return `
            <div class="card" style="${d.inTeam ? 'border-color:var(--gold)' : ''}">
              <div style="display:flex; justify-content:space-between;">
                <b>${d.name}</b>
                <span class="badge" style="background:var(--purple)">${d.grade}</span>
              </div>
              <div style="font-size:11.5px; color:var(--cyan); margin:3px 0;">Cảnh giới: <b>${dRealm.name}</b></div>
              <div style="font-size:11px; color:var(--muted);">Tu vi đệ tử: ${Math.floor(d.exp).toLocaleString()} / ${dRealm.req.toLocaleString()}</div>
              <div style="font-size:11px; color:var(--green); margin-bottom:6px;">Cống hiến: +${d.stonesPerSec * (state.realmIdx+1)} 💎/s & +${d.expShare * (state.realmIdx+1)} Tu Vi/s</div>
              <div style="display:flex; gap:5px; flex-wrap:wrap;">
                <button class="${d.inTeam?'btn-red':'btn-cyan'}" onclick="toggleTeam(${i})">${d.inTeam ? 'Rời Team' : 'Vào Team (Max 3)'}</button>
                <button class="btn-gold" onclick="teachDisciple(${i})">Truyền Công (${teachCost.toLocaleString()} 💎)</button>
              </div>
            </div>`;
        }).join('') || '<div class="card">Chưa thu nhận đồ đệ nào.</div>'}
      </div>
    `;
  }

  else if (currentTab === 'titles') {
    const filtered = DB_TITLES.filter(t => t.name.toLowerCase().includes(titleSearch.toLowerCase()));
    const pageItems = filtered.slice(titlePage * 20, (titlePage + 1) * 20);
    box.innerHTML = `
      <div class="card" style="border-color:var(--gold)">
        <h3 style="color:var(--gold)">👑 Danh Hiệu Đang Đeo (${state.activeTitles.length}/10 ô)</h3>
        <p style="font-size:11.5px; color:var(--muted); margin:4px 0;">Bạn có thể đeo đồng thời tối đa 10 danh hiệu để cộng dồn toàn bộ chỉ số!</p>
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
          ${state.activeTitles.map(tid => {
            const t = DB_TITLES[tid];
            return `<span class="badge" style="background:#263147; padding:4px 8px; cursor:pointer;" onclick="toggleActiveTitle(${tid})" title="Bấm để tháo">[${t.name}] ✖</span>`;
          }).join('')}
        </div>
      </div>
      <div class="filter-bar">
        <input type="text" placeholder="🔍 Tìm danh hiệu (500 cái)..." value="${titleSearch}" oninput="titleSearch=this.value; titlePage=0; renderTab()">
      </div>
      <div class="grid-2">
        ${pageItems.map(t => {
          const unlocked = state.unlockedTitles.includes(t.id);
          const active = state.activeTitles.includes(t.id);
          return `
            <div class="card" style="${active ? 'border-color:var(--gold)' : ''}">
              <div class="t-${t.tier}" style="font-weight:bold;">[${t.name}]</div>
              <div style="font-size:11px; color:var(--muted); margin:4px 0;">+${t.atk.toLocaleString()} Công | +${t.hp.toLocaleString()} Sinh Lực</div>
              ${active ? `<button class="btn-red" onclick="toggleActiveTitle(${t.id})">Tháo Danh Hiệu</button>`
                : unlocked ? `<button class="btn-cyan" onclick="toggleActiveTitle(${t.id})">Đeo (Thêm vào 10 ô)</button>`
                : `<button class="btn-gold" onclick="buyTitle(${t.id})">Mở Khóa (${t.price.toLocaleString()} 💎)</button>`}
            </div>`;
        }).join('')}
      </div>
      ${renderPagination(titlePage, filtered.length, 20, 'setTitlePage')}
    `;
  }

  else if (currentTab === 'rank') {
    const myPower = stats.atk + stats.def;
    const ranks = [
      { name: "Hồng Quân Đạo Tổ", realm: "Hỗn Nguyên Tiên Đế", pwr: 9999999999 },
      { name: "Thái Thượng Lão Quân", realm: "Đại La Kim Tiên", pwr: 250000000 },
      { name: state.name + " (Bạn)", realm: r.name, pwr: myPower, isMe: true },
      { name: "Hàn Lập", realm: "Đại Thừa Kỳ", pwr: 2500000 },
      { name: "Vương Lâm", realm: "Hợp Thể Kỳ", pwr: 850000 }
    ].sort((a, b) => b.pwr - a.pwr);

    box.innerHTML = ranks.map((rk, i) => `
      <div class="card" style="display:flex; justify-content:space-between; align-items:center; ${rk.isMe ? 'border-color:var(--gold)' : ''}">
        <div><b>#${i+1} ${rk.name}</b> <span style="font-size:11px; color:var(--cyan)">(${rk.realm})</span></div>
        <div style="color:var(--gold); font-weight:bold;">Chiến Lực: ${rk.pwr.toLocaleString()}</div>
      </div>
    `).join('');
  }
}

// Pagination setters
function setBagPage(p) { bagPage = p; renderTab(); }
function setManualPage(p) { manualPage = p; renderTab(); }
function setRealmPage(p) { realmPage = p; renderTab(); }
function setSectPage(p) { sectPage = p; renderTab(); }
function setShopPage(p) { shopPage = p; renderTab(); }
function setTitlePage(p) { titlePage = p; renderTab(); }

// ================= GAMEPLAY ACTIONS =================
function manualCultivate() { state.exp += getStats().expGain * 5; updateUI(); }

function upgradeFacilityMulti(type, baseCost, times) {
  let totalCost = 0;
  for (let i = 0; i < times; i++) {
    const currentLv = type === 'comp' ? state.comprehendLv : type === 'dao' ? state.daoHeartLv : state.spiritArrayLv;
    totalCost += baseCost * Math.pow(1.2, i);
  }
  totalCost = Math.floor(totalCost);
  if (state.stones < totalCost) { alert(`Cần ${totalCost.toLocaleString()} Linh Thạch để nâng x${times}!`); return; }
  state.stones -= totalCost;
  for (let i = 0; i < times; i++) {
    if (type === 'comp') { state.comprehendLv++; state.intel += 2; }
    if (type === 'dao') state.daoHeartLv++;
    if (type === 'arr') state.spiritArrayLv++;
  }
  updateUI(); renderTab();
}

function rollSpiritRoot(times) {
  const cost = times === 100 ? 85000 : times === 10 ? 9000 : 1000;
  if (state.stones < cost) { alert("Không đủ Linh Thạch!"); return; }
  state.stones -= cost;
  let bestIdx = state.rootIdx;
  for (let t = 0; t < times; t++) {
    const roll = Math.random() * 100;
    let acc = 0, picked = 0;
    for (let i = 0; i < SPIRIT_ROOTS.length; i++) {
      acc += SPIRIT_ROOTS[i].rate;
      if (roll <= acc) { picked = i; break; }
    }
    if (times === 1) bestIdx = picked;
    else if (picked > bestIdx) bestIdx = picked;
  }
  state.rootIdx = bestIdx;
  state.customRootMult = 0;
  const rObj = SPIRIT_ROOTS[bestIdx];
  addChat("Tẩy Tủy Trì", `🌿 <b>${state.name}</b> tẩy tủy thành công, thức tỉnh <b>${rObj.name} (x${rObj.mult})</b>!`, "var(--green)");
  updateUI(); renderTab();
}

function usePill(idx, qty = 1) {
  const item = state.bag[idx];
  if (!item || item.kind !== 'pill') return;
  const useCount = Math.min(qty, item.count);
  if (item.pType === 'exp') state.exp += item.val * useCount;
  if (item.pType === 'hp') state.hp = Math.min(getStats().maxHp, state.hp + item.val * useCount);
  if (item.pType === 'atk') state.customStats.atk += item.val * useCount;
  if (item.pType === 'trib') state.tribBonus += item.val * useCount;
  if (item.pType === 'int') state.intel += item.val * useCount;

  item.count -= useCount;
  if (item.count <= 0) state.bag.splice(idx, 1);
  updateUI(); renderTab();
}

function equipItem(idx) {
  const item = state.bag[idx];
  if (!item || item.kind !== 'equip') return;
  const old = state.equipped[item.slot];
  state.equipped[item.slot] = item;
  state.bag.splice(idx, 1);
  if (old) state.bag.push(old);
  updateUI(); renderTab();
}

function unequipSlot(slot) {
  if (!state.equipped[slot]) return;
  state.bag.push(state.equipped[slot]);
  state.equipped[slot] = null;
  updateUI(); if (currentTab === 'bag') renderTab();
}

function sellItem(idx) {
  const item = state.bag[idx];
  state.stones += Math.floor(item.price * 0.5);
  if (item.count && item.count > 1) item.count--;
  else state.bag.splice(idx, 1);
  updateUI(); renderTab();
}

function sellAllLowTier() {
  let gain = 0;
  state.bag = state.bag.filter(it => {
    if (it.tier <= 1) {
      gain += Math.floor(it.price * 0.5) * (it.count || 1);
      return false;
    }
    return true;
  });
  state.stones += gain;
  alert(`Đã bán sạch đồ Phàm/Hoàng phẩm, thu về +${gain.toLocaleString()} Linh Thạch!`);
  updateUI(); renderTab();
}

function buyShopItem(id, qty = 1) {
  const item = DB_PILLS.find(x => x.id === id) || DB_EQUIPS.find(x => x.id === id);
  const totalCost = item.price * qty;
  if (!item || state.stones < totalCost) { alert("Không đủ Linh Thạch!"); return; }
  state.stones -= totalCost;
  if (item.kind === 'pill') {
    const ex = state.bag.find(b => b.id === item.id);
    if (ex) ex.count += qty; else state.bag.push({ ...item, count: qty });
  } else {
    for (let q = 0; q < qty; q++) {
      state.bag.push({ ...item, uid: Date.now() + Math.random() });
    }
  }
  updateUI();
}

function startComprehend(id, reqSec) {
  const m = DB_MANUALS[id];
  if (state.stones < m.cost) { alert("Không đủ Linh Thạch!"); return; }
  state.stones -= m.cost;
  state.comprehending = { id, remain: reqSec, total: reqSec };
  updateUI(); renderTab();
}

function instantComprehend() {
  if (!state.comprehending) return;
  const m = DB_MANUALS[state.comprehending.id];
  if (state.stones < m.cost * 2) { alert("Không đủ Linh Thạch!"); return; }
  state.stones -= m.cost * 2;
  state.learnedManuals.push(m.id);
  if (state.equippedManuals.length < 10) state.equippedManuals.push(m.id);
  state.comprehending = null;
  addChat("Ngộ Đạo", `📜 <b>${state.name}</b> đốn ngộ thành công <b>${m.name}</b>!`, "var(--gold)");
  updateUI(); renderTab();
}

function toggleEquipManual(id) {
  const pos = state.equippedManuals.indexOf(id);
  if (pos >= 0) state.equippedManuals.splice(pos, 1);
  else {
    if (state.equippedManuals.length >= 10) { alert("Chỉ có thể vận chuyển tối đa 10 bộ công pháp cùng lúc!"); return; }
    state.equippedManuals.push(id);
  }
  updateUI(); renderTab();
}

function selectBestRealm() {
  const pwr = getStats().atk + getStats().def;
  let best = 0;
  DB_SECRET_REALMS.forEach((sr, i) => { if (pwr >= sr.powerReq * 0.7) best = i; });
  state.selectedAutoRealm = best;
  renderTab();
}

function exploreRealm(id, silent = false) {
  const sr = DB_SECRET_REALMS[id];
  const stats = getStats();
  if ((stats.atk + stats.def) >= sr.powerReq * 0.7) {
    state.stones += sr.stoneReward;
    state.exp += sr.expReward;
    if (!silent) addChat("Bí Cảnh", `💎 <b>${state.name}</b> thu hoạch +${sr.stoneReward.toLocaleString()} 💎 & +${sr.expReward.toLocaleString()} Tu Vi từ ${sr.name}!`, "var(--green)");
  } else {
    state.autoRealm = false;
    if (!silent) addChat("Bí Cảnh", `⚠️ Chiến lực không đủ thám hiểm ${sr.name}!`, "var(--red)");
  }
  updateUI();
}

function climbTower() {
  const stats = getStats();
  const floorPower = Math.floor(50 * Math.pow(1.38, state.towerFloor));
  if ((stats.atk + stats.def) >= floorPower) {
    const reward = state.towerFloor * 120;
    state.stones += reward;
    state.towerFloor++;
    addChat("Thông Thiên Tháp", `🗼 <b>${state.name}</b> chinh phục Tầng ${state.towerFloor - 1}, nhận +${reward.toLocaleString()} 💎!`, "var(--gold)");
  } else {
    state.autoTower = false;
  }
  updateUI(); if (currentTab === 'tower') renderTab();
}

function fightPvP(rival, pwr) {
  const myPwr = getStats().atk + getStats().def;
  if (myPwr >= pwr) {
    state.stones += 500;
    addChat("Đấu Trường", `⚔️ <b>${state.name}</b> đánh bại <b>${rival}</b>, đoạt 500 💎!`, "var(--green)");
  } else {
    addChat("Đấu Trường", `💀 <b>${state.name}</b> bại dưới tay <b>${rival}</b>!`, "var(--red)");
  }
  updateUI();
}

function contributeSect() {
  if (state.stones < 500) { alert("Cần 500 Linh Thạch!"); return; }
  state.stones -= 500; state.sectContrib += 500;
  updateUI(); renderTab();
}

function collectTreasury() {
  state.stones += state.sectTreasuryStones;
  state.exp += state.sectTreasuryExp;
  addChat("Tông Môn", `📥 Đã thu hoạch kho báu tông môn: +${Math.floor(state.sectTreasuryStones).toLocaleString()} 💎 & +${Math.floor(state.sectTreasuryExp).toLocaleString()} Tu Vi!`, "var(--green)");
  state.sectTreasuryStones = 0;
  state.sectTreasuryExp = 0;
  renderTab();
}

function doSectDailyTask() {
  if (state.sectTaskDone) { alert("Hôm nay đã hoàn thành nhiệm vụ tông môn rồi!"); return; }
  state.sectTaskDone = true;
  state.stones += 5000;
  addChat("Tông Môn", `📜 Hoàn thành nhiệm vụ tông môn hàng ngày, thưởng +5,000 💎!`, "var(--gold)");
  renderTab();
}

function upgradeSectBuilding(type, cost) {
  if (state.stones < cost) { alert(`Cần ${cost.toLocaleString()} Linh Thạch để nâng cấp!`); return; }
  state.stones -= cost;
  state.sectBuildingLv[type]++;
  addChat("Tông Môn", `🏗️ Nâng cấp thành công công trình lên cấp ${state.sectBuildingLv[type]}!`, "var(--cyan)");
  renderTab();
}

function recruitDisciple() {
  if (state.stones < 1000) { alert("Cần 1,000 Linh Thạch!"); return; }
  state.stones -= 1000;
  const names = ["Mặc Phủ", "Khúc Hồn", "Tử Linh", "Ngân Nguyệt", "Nguyên Dao", "Lệ Phi Vũ"];
  const grades = ["Phàm Cốt", "Linh Cốt", "Thánh Cốt", "Tiên Cốt"];
  const gIdx = Math.floor(Math.random() * 4);
  state.disciples.push({
    name: names[Math.floor(Math.random()*names.length)] + " #" + (state.disciples.length+1),
    grade: grades[gIdx], realmIdx: 1, exp: 0,
    stonesPerSec: (gIdx + 1) * 20, expShare: (gIdx + 1) * 15,
    inTeam: state.disciples.filter(d => d.inTeam).length < 3
  });
  updateUI(); renderTab();
}

function toggleTeam(idx) {
  const d = state.disciples[idx];
  if (d.inTeam) d.inTeam = false;
  else if (state.disciples.filter(x => x.inTeam).length < 3) d.inTeam = true;
  else alert("Đội hình tối đa 3 đệ tử!");
  renderTab();
}

function teachDisciple(idx) {
  const cost = Math.floor(500 * Math.pow(1.5, state.realmIdx));
  if (state.stones < cost) { alert(`Cần ${cost.toLocaleString()} Linh Thạch để truyền công!`); return; }
  state.stones -= cost;
  const d = state.disciples[idx];
  d.exp += REALMS[d.realmIdx].req * (state.realmIdx + 1);
  if (d.realmIdx < REALMS.length - 1 && d.exp >= REALMS[d.realmIdx].req) {
    d.exp = 0;
    d.realmIdx++;
  }
  renderTab();
}

function buyTitle(id) {
  const t = DB_TITLES[id];
  if (state.stones < t.price) { alert("Không đủ Linh Thạch!"); return; }
  state.stones -= t.price;
  state.unlockedTitles.push(id);
  if (state.activeTitles.length < 10) state.activeTitles.push(id);
  updateUI(); renderTab();
}

function toggleActiveTitle(id) {
  const pos = state.activeTitles.indexOf(id);
  if (pos >= 0) {
    state.activeTitles.splice(pos, 1);
  } else {
    if (state.activeTitles.length >= 10) { alert("Chỉ có thể đeo tối đa 10 danh hiệu cùng lúc!"); return; }
    state.activeTitles.push(id);
  }
  updateUI(); renderTab();
}

// ================= AUCTION & CHAT =================
function startAuction() {
  const tier = Math.min(7, Math.floor(state.realmIdx / 2.5) + 1);
  const pool = DB_EQUIPS.filter(e => e.tier === tier);
  const item = pool[Math.floor(Math.random() * pool.length)];
  state.auction = { item, currentBid: item.price, highestBidder: "Thương Hội Vạn Bảo", timeLeft: 45 };
}

function placeBid(mult) {
  if (!state.auction) return;
  const bid = Math.floor(state.auction.currentBid * mult);
  if (state.stones < bid) { alert("Không đủ Linh Thạch!"); return; }
  state.stones -= bid;
  state.auction.currentBid = bid;
  state.auction.highestBidder = state.name;
  addChat("Đấu Giá Hội", `🔨 <b>${state.name}</b> ra giá <b>${bid.toLocaleString()} 💎</b> cho [${state.auction.item.name}]!`, "var(--gold)");
  updateUI(); renderTab();
}

const NPCS = [
  { name: "Lão Tổ Thanh Vân", realm: "Đại Thừa Kỳ", affinity: 20, quote: "Đạo hữu gần đây tu vi tinh tiến không ít!" },
  { name: "Tiên Tử Băng Tâm", realm: "Hợp Thể Kỳ", affinity: 35, quote: "Bí cảnh cực bắc vừa mở, có đạo hữu nào đồng hành không?" },
  { name: "Ma Tôn Huyết Ảnh", realm: "Độ Kiếp Kỳ", affinity: 10, quote: "Kẻ mạnh làm vua, thiên kiếp chẳng qua chỉ là đá mài đao!" },
  { name: "Dược Vương Cốc Chủ", realm: "Luyện Hư Kỳ", affinity: 50, quote: "Vừa luyện thành một lò Cửu Chuyển Kim Đan, ai muốn trao đổi?" }
];

function addChat(sender, text, color = "#fff", isNpc = false, npcIdx = -1) {
  const box = document.getElementById('chatBox');
  const primaryTitle = DB_TITLES[state.activeTitles[0]] || { name: "Tán Tu Vô Danh", tier: 0 };
  const senderHtml = isNpc
    ? `<span class="npc-link" onclick="openNpcModal(${npcIdx})">[${NPCS[npcIdx].realm}] ${sender}</span>`
    : (sender === state.name ? `<span class="t-${primaryTitle.tier}">[${primaryTitle.name}]</span> <b style="color:var(--cyan)">${sender}</b>` : `<b style="color:${color}">${sender}</b>`);
  const div = document.createElement('div');
  div.className = 'chat-msg';
  div.innerHTML = `${senderHtml}: ${text}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  if (box.children.length > 60) box.removeChild(box.firstChild);
}

function sendChat() {
  const inp = document.getElementById('chatInput');
  const txt = inp.value.trim();
  if (!txt) return;
  addChat(state.name, txt);
  inp.value = '';
}

function openNpcModal(idx) {
  const npc = NPCS[idx];
  document.getElementById('npcModalName').innerText = `${npc.name} (${npc.realm})`;
  document.getElementById('npcModalBody').innerHTML = `
    <p style="font-size:13px; margin-bottom:10px;">Độ Hảo Cảm: <b style="color:var(--green)">${npc.affinity}/100</b></p>
    <p style="font-style:italic; color:var(--muted); margin-bottom:14px;">"${npc.quote}"</p>
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <button class="btn-cyan" onclick="interactNpc(${idx}, 'talk')">🗣️ Luận Đạo (+Tu Vi)</button>
      <button class="btn-gold" onclick="interactNpc(${idx}, 'gift')">🎁 Tặng 500 💎 (+15 Hảo Cảm)</button>
      <button class="btn-purple" onclick="interactNpc(${idx}, 'recruit')">🤝 Mời Vào Đệ Tử/Đồng Hành</button>
    </div>
  `;
  document.getElementById('npcModal').style.display = 'flex';
}

function interactNpc(idx, act) {
  const npc = NPCS[idx];
  if (act === 'talk') {
    state.exp += 800 * (state.realmIdx + 1);
    addChat(npc.name, `Đa tạ ${state.name} đạo hữu chỉ điểm, thật là mở mang tầm mắt!`, "var(--cyan)", true, idx);
  } else if (act === 'gift') {
    if (state.stones < 500) { alert("Không đủ Linh Thạch!"); return; }
    state.stones -= 500; npc.affinity = Math.min(100, npc.affinity + 15);
    addChat(npc.name, `Ha ha, ${state.name} thật hào sảng!`, "var(--gold)", true, idx);
  } else if (act === 'recruit') {
    if (npc.affinity < 50) { alert("Cần độ hảo cảm từ 50 trở lên!"); return; }
    state.disciples.push({ name: npc.name, grade: "Tiên Hữu", realmIdx: 8, exp: 0, stonesPerSec: 150, expShare: 120, inTeam: true });
    addChat("Hệ Thống", `🤝 <b>${npc.name}</b> đã gia nhập đội hình đồng hành của bạn!`, "var(--purple)");
  }
  closeModal('npcModal'); updateUI();
}

// ================= SUPER ADMIN PANEL (5 FULL TABS) =================
async function openAdmin() {
  if (state.role !== 'admin') {
    addChat("Hệ Thống", "Bạn không có quyền truy cập trang Quản Trị!", "var(--red)");
    return;
  }
  try {
    const res = await fetch('/api/admin/me', { credentials: 'same-origin' });
    if (!res.ok) {
      addChat("Hệ Thống", "Xác thực quyền ADMIN thất bại!", "var(--red)");
      return;
    }
    await saveGameToServer(true);
    window.location.href = '/admin';
  } catch (err) {
    addChat("Hệ Thống", "Lỗi kết nối máy chủ khi mở trang Quản Trị.", "var(--red)");
  }
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function renderAdminTab(sub, btn) {
  if (btn) {
    document.querySelectorAll('#adminNav button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  const body = document.getElementById('adminBody');

  if (sub === 'res') {
    body.innerHTML = `
      <div class="card">
        <h4>💎 Chỉnh Linh Thạch, Tu Vi & Cảnh Giới</h4>
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin:8px 0;">
          <button class="btn-cyan" onclick="state.stones+=1000000;updateUI()">+1M 💎</button>
          <button class="btn-cyan" onclick="state.stones+=1000000000;updateUI()">+1B 💎</button>
          <button class="btn-cyan" onclick="state.stones+=1000000000000;updateUI()">+1,000B 💎</button>
          <button class="btn-gold" onclick="state.exp+=REALMS[state.realmIdx].req;updateUI()">Đầy 100% Tu Vi</button>
        </div>
        <div class="grid-2" style="margin-top:8px;">
          <div><label style="font-size:11px;">Đặt Số Linh Thạch Chính Xác:</label><input type="number" value="${state.stones}" onchange="state.stones=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Đặt Số Tu Vi Chính Xác:</label><input type="number" value="${state.exp}" onchange="state.exp=Number(this.value);updateUI()"></div>
          <div>
            <label style="font-size:11px;">Chọn Cảnh Giới Trực Tiếp:</label>
            <select style="width:100%;" onchange="state.realmIdx=Number(this.value); state.hp=getStats().maxHp; updateUI(); renderTab();">
              ${REALMS.map((r, i) => `<option value="${i}" ${state.realmIdx===i?'selected':''}>${r.name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:11px;">Chọn Linh Căn Trực Tiếp:</label>
            <select style="width:100%;" onchange="state.rootIdx=Number(this.value); state.customRootMult=0; updateUI(); renderTab();">
              ${SPIRIT_ROOTS.map((sr, i) => `<option value="${i}" ${state.rootIdx===i?'selected':''}>${sr.name} (x${sr.mult})</option>`).join('')}
            </select>
          </div>
          <div><label style="font-size:11px;">Số Lần Trùng Sinh:</label><input type="number" value="${state.rebirths}" onchange="state.rebirths=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Tầng Thông Thiên Tháp:</label><input type="number" value="${state.towerFloor}" onchange="state.towerFloor=Number(this.value);updateUI()"></div>
        </div>
      </div>
    `;
  }

  else if (sub === 'stats') {
    body.innerHTML = `
      <div class="card">
        <h4>📊 Tùy Chỉnh Toàn Bộ Chỉ Số Nhân Vật & Công Trình</h4>
        <div class="grid-3" style="margin-top:8px;">
          <div><label style="font-size:11px;">Công Kích (+ATK):</label><input type="number" value="${state.customStats.atk}" onchange="state.customStats.atk=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Phòng Thủ (+DEF):</label><input type="number" value="${state.customStats.def}" onchange="state.customStats.def=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Sinh Lực (+HP):</label><input type="number" value="${state.customStats.hp}" onchange="state.customStats.hp=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Tốc Độ (+SPD):</label><input type="number" value="${state.customStats.spd}" onchange="state.customStats.spd=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Tỷ Lệ Bạo Kích (%):</label><input type="number" value="${state.customStats.crit}" onchange="state.customStats.crit=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Hệ Số Linh Căn Tùy Chỉnh:</label><input type="number" step="0.5" value="${state.customRootMult || SPIRIT_ROOTS[state.rootIdx].mult}" onchange="state.customRootMult=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Ngộ Tính:</label><input type="number" value="${state.intel}" onchange="state.intel=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Cấp Lĩnh Ngộ:</label><input type="number" value="${state.comprehendLv}" onchange="state.comprehendLv=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Cấp Đạo Tâm:</label><input type="number" value="${state.daoHeartLv}" onchange="state.daoHeartLv=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Cấp Tụ Linh Trận:</label><input type="number" value="${state.spiritArrayLv}" onchange="state.spiritArrayLv=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Hệ Số Nhân Sức Mạnh:</label><input type="number" step="0.5" value="${state.customStats.mult}" onchange="state.customStats.mult=Number(this.value);updateUI()"></div>
          <div><label style="font-size:11px;">Cộng % Tỷ Lệ Độ Kiếp:</label><input type="number" value="${state.tribBonus}" onchange="state.tribBonus=Number(this.value);updateUI()"></div>
        </div>
      </div>
    `;
  }

  else if (sub === 'forge') {
    body.innerHTML = `
      <div class="grid-2">
        <div class="card">
          <h4>⚒️ Đúc Trang Bị Thần Cấp Tùy Ý</h4>
          <div class="form-group"><label>Tên Trang Bị:</label><input type="text" id="admEqName" value="Hỗn Độn Tru Tiên Kiếm"></div>
          <div class="form-group"><label>Loại:</label><select id="admEqSlot"><option value="weapon">Vũ Khí</option><option value="armor">Đạo Bào</option><option value="artifact">Pháp Bảo</option><option value="boots">Pháp Hài</option></select></div>
          <div class="form-group"><label>Phẩm Cấp:</label><select id="admEqTier">${TIER_NAMES.map((n,i)=>`<option value="${i}" ${i===7?'selected':''}>${n}</option>`).join('')}</select></div>
          <div class="grid-2">
            <div><label style="font-size:11px;">Công:</label><input type="number" id="admEqAtk" value="9999999"></div>
            <div><label style="font-size:11px;">Thủ:</label><input type="number" id="admEqDef" value="5000000"></div>
            <div><label style="font-size:11px;">HP:</label><input type="number" id="admEqHp" value="50000000"></div>
            <div><label style="font-size:11px;">Tốc:</label><input type="number" id="admEqSpd" value="99999"></div>
          </div>
          <button class="btn-gold" style="margin-top:8px; width:100%;" onclick="adminCreateEquip()">✨ Đúc Vào Túi Đồ</button>
        </div>

        <div class="card">
          <h4>💊 Luyện Đan Dược Tùy Ý</h4>
          <div class="form-group"><label>Tên Đan Dược:</label><input type="text" id="admPillName" value="Cửu Chuyển Hỗn Độn Đan"></div>
          <div class="form-group"><label>Công Dụng:</label>
            <select id="admPillType">
              <option value="exp">Tăng Tu Vi</option>
              <option value="atk">Tăng Vĩnh Viễn Công Kích</option>
              <option value="int">Tăng Vĩnh Viễn Ngộ Tính</option>
              <option value="trib">Tăng % Tỷ Lệ Độ Kiếp</option>
            </select>
          </div>
          <div class="grid-2">
            <div><label style="font-size:11px;">Giá Trị Hiệu Ứng:</label><input type="number" id="admPillVal" value="100000000"></div>
            <div><label style="font-size:11px;">Số Lượng:</label><input type="number" id="admPillCount" value="99"></div>
          </div>
          <button class="btn-green" style="margin-top:8px; width:100%;" onclick="adminCreatePill()">💊 Luyện Vào Túi Đồ</button>
        </div>
      </div>
    `;
  }

  else if (sub === 'db') {
    body.innerHTML = `
      <div class="card">
        <h4>📦 Lấy Nhanh Bất Kỳ Vật Phẩm Nào Trong Kho Dữ Liệu</h4>
        <div class="grid-2" style="margin-top:8px;">
          <div>
            <label style="font-size:11px;">Chọn Đan Dược (1 - 500):</label>
            <select id="admPickPill" style="width:100%; margin:4px 0;">
              ${DB_PILLS.map((p, i) => `<option value="${i}">#${i+1} ${p.name} (${p.desc})</option>`).join('')}
            </select>
            <button class="btn-green" onclick="let p=DB_PILLS[document.getElementById('admPickPill').value]; state.bag.push({...p, count:50}); alert('Đã thêm x50 '+p.name); updateUI();">Lấy x50 Viên</button>
          </div>
          <div>
            <label style="font-size:11px;">Chọn Trang Bị (1 - 2000):</label>
            <select id="admPickEq" style="width:100%; margin:4px 0;">
              ${DB_EQUIPS.filter((_, i) => i % 5 === 0).map(e => `<option value="${e.id}">${e.name} (Công +${e.atk.toLocaleString()})</option>`).join('')}
            </select>
            <button class="btn-cyan" onclick="let e=DB_EQUIPS.find(x=>x.id===document.getElementById('admPickEq').value); state.bag.push({...e, uid:Date.now()}); alert('Đã thêm '+e.name); updateUI();">Lấy Trang Bị</button>
          </div>
        </div>
      </div>
    `;
  }

  else if (sub === 'unlock') {
    body.innerHTML = `
      <div class="card" style="display:flex; gap:8px; flex-wrap:wrap;">
        <button class="btn-gold" onclick="state.unlockedTitles=DB_TITLES.map(t=>t.id); alert('Đã mở khóa toàn bộ 500 danh hiệu!'); updateUI();">👑 Mở Khóa 500 Danh Hiệu</button>
        <button class="btn-cyan" onclick="state.learnedManuals=DB_MANUALS.map(m=>m.id); alert('Đã lĩnh ngộ toàn bộ 800 cuốn công pháp!'); updateUI();">📜 Lĩnh Ngộ Full 800 Công Pháp</button>
        <button class="btn-purple" onclick="state.comprehendLv=20; state.daoHeartLv=20; state.spiritArrayLv=20; state.intel=200; updateUI(); alert('Đã nâng cấp Max Lĩnh Ngộ, Đạo Tâm, Tụ Linh Trận!');">⚡ Max Cấp Động Phủ (Lv.20)</button>
        <button class="btn-green" onclick="state.hp=getStats().maxHp; updateUI();">❤️ Hồi Đầy 100% Sinh Lực</button>
      </div>
    `;
  }
}

function adminCreateEquip() {
  state.bag.push({
    uid: Date.now(), kind: "equip",
    name: document.getElementById('admEqName').value,
    slot: document.getElementById('admEqSlot').value,
    tier: Number(document.getElementById('admEqTier').value),
    atk: Number(document.getElementById('admEqAtk').value),
    def: Number(document.getElementById('admEqDef').value),
    hp: Number(document.getElementById('admEqHp').value),
    spd: Number(document.getElementById('admEqSpd').value),
    price: 1000000
  });
  alert("Đã thêm trang bị vào Túi Đồ!");
  updateUI(); if (currentTab === 'bag') renderTab();
}

function adminCreatePill() {
  const val = Number(document.getElementById('admPillVal').value);
  state.bag.push({
    id: "custom_pill_" + Date.now(), kind: "pill",
    name: document.getElementById('admPillName').value,
    tier: 7,
    pType: document.getElementById('admPillType').value,
    val, desc: `Hiệu ứng thần cấp: +${val.toLocaleString()}`,
    count: Number(document.getElementById('admPillCount').value),
    price: 500000
  });
  alert("Đã luyện đan dược vào Túi Đồ!");
  updateUI(); if (currentTab === 'bag') renderTab();
}

// ================= UI UPDATE & MAIN LOOP =================
function updateUI() {
  const stats = getStats();
  const r = REALMS[state.realmIdx];
  if (state.hp > stats.maxHp) state.hp = stats.maxHp;

  document.getElementById('uiName').innerText = state.name;
  document.getElementById('uiRealm').innerText = r.name;
  document.getElementById('uiStones').innerText = Math.floor(state.stones).toLocaleString();
  document.getElementById('uiRebirth').innerText = state.rebirths;
  document.getElementById('uiSect').innerText = state.sectId >= 0 ? DB_SECTS[state.sectId].name : "Tán Tu";
  document.getElementById('uiRootName').innerHTML = `<span class="t-${stats.rootObj.tier}">${stats.rootObj.name}</span>`;

  document.getElementById('uiTitleBadges').innerHTML = state.activeTitles.map(tid => {
    const t = DB_TITLES[tid];
    return `<span class="t-${t.tier}">[${t.name}]</span>`;
  }).join(' ');

  document.getElementById('uiHpText').innerText = `${Math.floor(state.hp).toLocaleString()} / ${stats.maxHp.toLocaleString()}`;
  document.getElementById('uiHpBar').style.width = Math.min(100, (state.hp / stats.maxHp) * 100) + "%";

  document.getElementById('uiExpText').innerText = `${Math.floor(state.exp).toLocaleString()} / ${r.req.toLocaleString()}`;
  document.getElementById('uiExpBar').style.width = Math.min(100, (state.exp / r.req) * 100) + "%";

  document.getElementById('stAtk').innerText = stats.atk.toLocaleString();
  document.getElementById('stDef').innerText = stats.def.toLocaleString();
  document.getElementById('stSpd').innerText = stats.spd.toLocaleString();
  document.getElementById('stCrit').innerText = state.customStats.crit + "%";
  document.getElementById('stRoot').innerText = "x" + stats.rootMult;
  document.getElementById('stInt').innerText = state.intel;
  document.getElementById('stDaoHeart').innerText = "Lv." + state.daoHeartLv;
  document.getElementById('stArray').innerText = "Lv." + state.spiritArrayLv;
  document.getElementById('stMult').innerText = "x" + stats.rebirthMult.toFixed(1);
  document.getElementById('stTrib').innerText = stats.tribChance + "%";

  document.getElementById('uiEquipSlots').innerHTML = SLOTS.map(s => {
    const eq = state.equipped[s];
    return `
      <div class="equip-slot">
        <span style="color:var(--muted)">${SLOT_VN[s]}</span>
        ${eq ? `<b class="t-${eq.tier}" style="cursor:pointer" title="Bấm để tháo" onclick="unequipSlot('${s}')">${eq.name}</b>` : `<span style="color:#475569">Trống</span>`}
      </div>`;
  }).join('');
}

setInterval(() => {
  if (!state.loggedIn) return;
  state.playSeconds++;
  const hrs = String(Math.floor(state.playSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((state.playSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(state.playSeconds % 60).padStart(2, '0');
  document.getElementById('uiPlayTime').innerText = `${hrs}:${mins}:${secs}`;

  const stats = getStats();
  if (state.autoCultivate) {
    state.exp += stats.expGain * state.speedMult;
    state.stones += (5 + state.realmIdx * 8) * state.speedMult;
  }

  checkAutoEquipBest();
  checkAutoUsePill();

  // Tông môn tự tích lũy kho báu mỗi giây
  const hallMult = state.sectBuildingLv.hall;
  state.sectTreasuryStones += (10 + state.realmIdx * 15) * hallMult;
  state.sectTreasuryExp += (20 + state.realmIdx * 25) * hallMult;

  // Luyện đan phòng tự đúc đan
  if (state.playSeconds % 10 === 0 && state.sectBuildingLv.alch > 1) {
    const pill = DB_PILLS[Math.floor(Math.random() * (state.sectBuildingLv.alch * 10))];
    const ex = state.bag.find(b => b.id === pill.id);
    if (ex) ex.count += state.sectBuildingLv.alch;
    else state.bag.push({ ...pill, count: state.sectBuildingLv.alch });
  }

  // Disciples autonomous cultivation & contribution
  state.disciples.forEach(d => {
    d.exp += 25 * (d.realmIdx + 1) * state.speedMult;
    if (d.exp >= REALMS[d.realmIdx].req && d.realmIdx < REALMS.length - 1) {
      d.exp = 0;
      d.realmIdx++;
      addChat("Đồ Đệ", `🌟 Đệ tử <b>${d.name}</b> tự tu luyện đột phá <b>${REALMS[d.realmIdx].name}</b>!`, "var(--cyan)");
    }
    if (d.inTeam) {
      state.stones += d.stonesPerSec * (d.realmIdx + 1);
      state.exp += d.expShare * (d.realmIdx + 1);
    }
  });

  if (state.autoBreakthrough && state.exp >= REALMS[state.realmIdx].req && stats.tribChance >= state.autoMinChance) {
    attemptBreakthrough();
  }
  if (state.autoTower) climbTower();
  if (state.autoRealm) exploreRealm(state.selectedAutoRealm, true);

  if (state.comprehending) {
    state.comprehending.remain -= state.speedMult;
    if (state.comprehending.remain <= 0) {
      const m = DB_MANUALS[state.comprehending.id];
      state.learnedManuals.push(m.id);
      if (state.equippedManuals.length < 10) state.equippedManuals.push(m.id);
      state.comprehending = null;
      addChat("Ngộ Đạo", `📜 <b>${state.name}</b> đã hoàn thành lĩnh ngộ <b>${m.name}</b>!`, "var(--gold)");
    }
    if (currentTab === 'manuals') renderTab();
  }

  // Auction tick
  if (state.auction) {
    state.auction.timeLeft--;
    if ((state.auction.timeLeft === 25 || state.auction.timeLeft === 10) && Math.random() < 0.65) {
      const npc = NPCS[Math.floor(Math.random() * NPCS.length)];
      state.auction.currentBid = Math.floor(state.auction.currentBid * 1.12);
      state.auction.highestBidder = npc.name;
      addChat("Đấu Giá Hội", `💰 <b>${npc.name}</b> vừa nâng giá lên <b>${state.auction.currentBid.toLocaleString()} 💎</b>!`, "var(--cyan)");
    }
    if (state.auction.timeLeft <= 0) {
      if (state.auction.highestBidder === state.name) {
        state.bag.push({ ...state.auction.item, uid: Date.now() });
        addChat("Đấu Giá Hội", `🎉 Chúc mừng <b>${state.name}</b> đấu giá thành công <b>${state.auction.item.name}</b>!`, "var(--gold)");
      }
      startAuction();
    }
    if (currentTab === 'auction') renderTab();
  }

  if (state.playSeconds % 14 === 0) {
    const idx = Math.floor(Math.random() * NPCS.length);
    addChat(NPCS[idx].name, NPCS[idx].quote, "var(--cyan)", true, idx);
  }

  updateUI();
  saveGameToServer();
  if (currentTab === 'cultivate' || currentTab === 'disciples') renderTab();
}, 1000);
