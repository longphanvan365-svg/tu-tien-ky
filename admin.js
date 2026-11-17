const $ = id => document.getElementById(id);
let allUsers = [];
function notify(text, type='success') { const box=$('message'); box.textContent=text; box.className=`message ${type}`; }
function dateText(value) { if(!value) return 'Chưa đăng nhập'; const d=new Date(value.replace(' ','T')+'Z'); return Number.isNaN(d.getTime())?value:d.toLocaleString('vi-VN'); }
async function api(url, options={}) {
  const response=await fetch(url,{credentials:'same-origin',headers:{'Content-Type':'application/json',...(options.headers||{})},...options});
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.error||`Lỗi máy chủ (${response.status})`);
  return data;
}
async function init(){
  try { const me=await api('/api/admin/me'); $('adminName').textContent=`ADMIN: ${me.username}`; $('dashboard').classList.remove('hidden'); await loadUsers(); }
  catch(e){ $('adminName').textContent='Chưa xác thực'; $('denied').classList.remove('hidden'); }
}
async function loadUsers(){
  try { const data=await api('/api/admin/users'); allUsers=data.users||[]; $('totalCount').textContent=allUsers.length; $('lockedCount').textContent=allUsers.filter(u=>u.isLocked).length; $('activeCount').textContent=allUsers.filter(u=>!u.isLocked).length; $('updatedAt').textContent=`Cập nhật lúc ${new Date().toLocaleTimeString('vi-VN')}`; render(); }
  catch(e){notify(e.message,'error');}
}
function render(){
  const q=$('searchInput').value.trim().toLocaleLowerCase('vi');
  const rows=allUsers.filter(u=>String(u.id).includes(q)||u.username.toLocaleLowerCase('vi').includes(q)||String(u.characterName||'').toLocaleLowerCase('vi').includes(q));
  $('usersBody').innerHTML=rows.length?rows.map(u=>`<tr><td>${u.id}</td><td><strong>${escapeHtml(u.username)}</strong><br><small>${u.role==='admin'?'Quản trị viên':'Người chơi'}</small></td><td>${escapeHtml(u.characterName||u.username)}</td><td>${u.cultivation==null?'—':Number(u.cultivation).toLocaleString('vi-VN')}</td><td><span class="status ${u.isLocked?'locked':'active'}">${u.isLocked?'Đã khóa':'Hoạt động'}</span></td><td>${dateText(u.createdAt)}</td><td>${dateText(u.lastLoginAt)}</td><td><div class="actions">${u.role==='admin'?'<span>Được bảo vệ</span>':`<button class="${u.isLocked?'good':'danger'}" data-action="lock" data-id="${u.id}">${u.isLocked?'Mở khóa':'Khóa'}</button><button data-action="password" data-id="${u.id}">Đặt mật khẩu</button><button class="danger" data-action="delete" data-id="${u.id}">Xóa</button>`}</div></td></tr>`).join(''):'<tr><td colspan="8">Không tìm thấy tài khoản.</td></tr>';
}
function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
$('usersBody').addEventListener('click',async e=>{
 const btn=e.target.closest('button[data-action]'); if(!btn)return; const id=btn.dataset.id, action=btn.dataset.action, user=allUsers.find(x=>String(x.id)===id); if(!user)return;
 try {
  if(action==='lock'){await api(`/api/admin/users/${id}/lock`,{method:'PATCH',body:JSON.stringify({locked:!user.isLocked})});notify(user.isLocked?'Đã mở khóa tài khoản.':'Đã khóa tài khoản.');}
  if(action==='password'){const password=prompt(`Nhập mật khẩu mới cho ${user.username} (ít nhất 8 ký tự):`);if(password===null)return;if(password.length<8)throw new Error('Mật khẩu phải có ít nhất 8 ký tự.');await api(`/api/admin/users/${id}/password`,{method:'PATCH',body:JSON.stringify({password})});notify('Đã đặt lại mật khẩu. Hãy gửi mật khẩu mới cho người chơi qua kênh riêng.');}
  if(action==='delete'){if(!confirm(`Xóa vĩnh viễn tài khoản ${user.username} và dữ liệu nhân vật?`))return;await api(`/api/admin/users/${id}`,{method:'DELETE'});notify('Đã xóa tài khoản và dữ liệu nhân vật.');}
  await loadUsers();
 }catch(err){notify(err.message,'error');}
});
$('searchInput').addEventListener('input',render);$('refreshBtn').addEventListener('click',loadUsers);
$('logoutBtn').addEventListener('click',async()=>{try{await api('/api/auth/logout',{method:'POST'});}finally{location.href='/';}});
init();
