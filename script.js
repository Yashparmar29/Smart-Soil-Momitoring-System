// Shared script for SmartSoil pages
(function(){
  // Auth: store multiple users in localStorage for demo
  window.registerUser = function(){
    const u = document.getElementById('reg-username') && document.getElementById('reg-username').value.trim();
    const e = document.getElementById('reg-email') && document.getElementById('reg-email').value.trim();
    const p = document.getElementById('reg-password') && document.getElementById('reg-password').value;
    if(!u || !e || !p){ alert('Please fill all fields'); return; }
    const users = JSON.parse(localStorage.getItem('smartsoil_users') || '[]');
    if(users.find(user => user.username === u)){ alert('Username already exists'); return; }
    const role = u === 'admin' ? 'admin' : 'user'; // Demo: 'admin' username gets admin role
    users.push({username:u, email:e, password:p, role:role});
    localStorage.setItem('smartsoil_users', JSON.stringify(users));
    alert('Account created — please sign in');
    window.location.href = 'index.html';
  };

  window.loginUser = function(){
    const u = document.getElementById('login-username') && document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password') && document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('smartsoil_users') || '[]');
    const user = users.find(user => user.username === u && user.password === p);
    if(user){
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials — for demo register a user first.');
    }
  };

  window.logoutUser = function(){
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
  };

  window.navTo = function(page){
    // simple client-side navigation: redirect to corresponding file
    const pages = {dashboard:'dashboard.html', fields:'fields.html', alerts:'alerts.html', reports:'reports.html', settings:'settings.html', admin:'admin.html'};
    if(pages[page]) window.location.href = pages[page];
  };

  // Helper: get current logged in user
  window.getCurrentUser = function(){
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  };

  // Helper: check if user is admin
  window.isAdmin = function(){
    const user = getCurrentUser();
    return user && user.role === 'admin';
  };

  // Demo data injection for dashboard and others
  document.addEventListener('DOMContentLoaded', ()=>{
    // fill profile
    const user = getCurrentUser();
    if(user){
      const nameEl = document.getElementById('profile-name');
      const emailEl = document.getElementById('profile-email');
      if(nameEl) nameEl.textContent = user.username;
      if(emailEl) emailEl.textContent = user.email;
    }

    if(user){
      const userEls = document.querySelectorAll('#user-name');
      userEls.forEach(el=> el.textContent = user.username);
    }

    // Show admin link if admin
    if(isAdmin()){
      const navs = document.querySelectorAll('.nav ul');
      navs.forEach(nav => {
        const adminLi = document.createElement('li');
        adminLi.onclick = () => navTo('admin');
        adminLi.textContent = 'Admin';
        nav.appendChild(adminLi);
      });
    }

    // If on dashboard, populate demo stats
    if(window.location.pathname.endsWith('dashboard.html')){
      const demo = {moisture:58,temp:24,ph:6.2,npk:'Balanced',updated:new Date().toLocaleString(),activity:['Auto sample 09:12','No anomalies']};
      document.getElementById('last-updated').textContent = demo.updated;
      document.getElementById('moisture-value').textContent = demo.moisture+'%';
      const path = document.getElementById('moisture-path'); if(path) path.setAttribute('stroke-dasharray', demo.moisture+',100');
      const statMoist = document.getElementById('moisture-stat'); if(statMoist) statMoist.textContent = demo.moisture+'%';
      const temp = document.getElementById('temp-val'); if(temp) temp.textContent = demo.temp+'°';
      const ph = document.getElementById('ph-val'); if(ph) ph.textContent = demo.ph.toFixed(1);
      const npk = document.getElementById('npk-val'); if(npk) npk.textContent = demo.npk;
      const act = document.getElementById('activity-list'); if(act) act.innerHTML = demo.activity.map(i=>'<li>'+i+'</li>').join('');
      const reco = document.getElementById('reco-list'); if(reco){ if(demo.moisture<30) reco.innerHTML='<li style="color:#ffd8d8">Irrigate: moisture low</li>'; else reco.innerHTML='<li style="color:#bfffe0">All readings normal</li>';}
    }
  });
})();