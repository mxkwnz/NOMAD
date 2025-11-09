(function() {
  function updateAuthUI() {
    if (typeof window.auth === 'undefined') return;
    
    const user = window.auth.getCurrentUser();
    const authNavItem = document.getElementById('authNavItem');
    const profileNavItem = document.getElementById('profileNavItem');
    const loginNavLink = document.getElementById('loginNavLink');
    const offcanvasProfile = document.getElementById('offcanvasProfile');
    
    if (user) {
      if (loginNavLink) {
        loginNavLink.textContent = 'Logout';
        loginNavLink.removeAttribute('data-bs-toggle');
        loginNavLink.removeAttribute('data-bs-target');
        loginNavLink.onclick = function(e) {
          e.preventDefault();
          window.auth.signOut();
          window.location.reload();
        };
      } else if (authNavItem) {
        authNavItem.innerHTML = '<a class="nav-link" href="#" onclick="window.auth.signOut(); window.location.reload();">Logout</a>';
      }
      if (profileNavItem) profileNavItem.style.display = 'block';
      if (offcanvasProfile) offcanvasProfile.style.display = 'block';
    } else {
      if (loginNavLink) {
        loginNavLink.textContent = 'Login';
        loginNavLink.setAttribute('data-bs-toggle', 'modal');
        loginNavLink.setAttribute('data-bs-target', '#loginModal');
        loginNavLink.onclick = null;
      } else if (authNavItem) {
        authNavItem.innerHTML = '<a class="nav-link" href="#" id="loginNavLink" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>';
      }
      if (profileNavItem) profileNavItem.style.display = 'none';
      if (offcanvasProfile) offcanvasProfile.style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAuthUI);
  } else {
    updateAuthUI();
  }
})();

