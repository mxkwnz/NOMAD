(function() {
  function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const errorDiv = document.getElementById('loginError');

        if (!errorDiv) return;

        errorDiv.textContent = '';

        if (!email || !password) {
          errorDiv.textContent = 'Please fill in all fields';
          return;
        }

        if (typeof window.auth === 'undefined') {
          errorDiv.textContent = 'Authentication system not loaded';
          return;
        }

        const result = window.auth.signIn(email, password);
        if (result.success) {
          const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
          if (modal) modal.hide();
          window.location.href = 'profile.html';
        } else {
          errorDiv.textContent = result.message;
        }
      });
    }

    if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const phone = document.getElementById('signupPhone').value.trim();
        const password = document.getElementById('signupPassword').value;
        const errorDiv = document.getElementById('signupError');

        if (!errorDiv) return;

        errorDiv.textContent = '';

        if (typeof window.auth === 'undefined') {
          errorDiv.textContent = 'Authentication system not loaded';
          return;
        }

        const result = window.auth.signUp(name, email, phone, password);
        if (result.success) {
          alert(result.message);
          const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
          if (modal) modal.hide();
          const loginModalEl = document.getElementById('loginModal');
          if (loginModalEl) {
            const loginEmailInput = loginModalEl.querySelector('#loginEmail');
            if (loginEmailInput) loginEmailInput.value = email;
            const loginModal = new bootstrap.Modal(loginModalEl);
            loginModal.show();
          }
        } else {
          errorDiv.textContent = result.message;
        }
      });

      const signupPassword = document.getElementById('signupPassword');
      if (signupPassword) {
        signupPassword.addEventListener('input', function() {
          const password = this.value;
          if (typeof window.auth !== 'undefined') {
            const validation = window.auth.validatePassword(password);
            const errorDiv = this.nextElementSibling.nextElementSibling;
            if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
              if (!validation.valid && password.length > 0) {
                errorDiv.textContent = validation.message;
                errorDiv.classList.add('d-block');
              } else {
                errorDiv.textContent = '';
                errorDiv.classList.remove('d-block');
              }
            }
          }
        });
      }
    }
  }

  function checkHashAndOpenModal() {
    if (window.location.hash === '#login') {
      const loginModal = document.getElementById('loginModal');
      if (loginModal) {
        const modal = new bootstrap.Modal(loginModal);
        modal.show();
        window.history.replaceState(null, null, window.location.pathname);
      }
    } else if (window.location.hash === '#signup') {
      const signupModal = document.getElementById('signupModal');
      if (signupModal) {
        const modal = new bootstrap.Modal(signupModal);
        modal.show();
        window.history.replaceState(null, null, window.location.pathname);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initAuthForms();
      setTimeout(checkHashAndOpenModal, 100);
    });
  } else {
    initAuthForms();
    setTimeout(checkHashAndOpenModal, 100);
  }
})();

