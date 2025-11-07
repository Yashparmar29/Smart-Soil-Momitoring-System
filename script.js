// Shared script for SmartSoil pages
(function(){
  // Simple auth: store single user in localStorage for demo
  window.registerUser = function(){
    const u = document.getElementById('reg-username') && document.getElementById('reg-username').value.trim();
    const e = document.getElementById('reg-email') && document.getElementById('reg-email').value.trim();
    const p = document.getElementById('reg-password') && document.getElementById('reg-password').value;
    if(!u || !e || !p){ alert('Please fill all fields'); return; }
    localStorage.setItem('smartsoil_user', JSON.stringify({username:u,email:e,password:p}));
    alert('Account created — please sign in');
    window.location.href = 'index.html';
  };

  window.loginUser = function(){
    const u = document.getElementById('login-username') && document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password') && document.getElementById('login-password').value;
    const stored = JSON.parse(localStorage.getItem('smartsoil_user')||'null');
    if(stored && stored.username === u && stored.password === p){
      localStorage.setItem('loggedInUser', stored.username);
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
    const pages = {dashboard:'dashboard.html', fields:'fields.html', alerts:'alerts.html', reports:'reports.html', settings:'settings.html'};
    if(pages[page]) window.location.href = pages[page];
  };

  // Demo data injection for dashboard and others
  document.addEventListener('DOMContentLoaded', ()=>{
    // fill profile
    const stored = JSON.parse(localStorage.getItem('smartsoil_user')||'null');
    if(stored){
      const nameEl = document.getElementById('profile-name');
      const emailEl = document.getElementById('profile-email');
      if(nameEl) nameEl.textContent = stored.username;
      if(emailEl) emailEl.textContent = stored.email;
    }

    const logged = localStorage.getItem('loggedInUser') || (stored && stored.username);
    if(logged){
      const userEls = document.querySelectorAll('#user-name');
      userEls.forEach(el=> el.textContent = logged);
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