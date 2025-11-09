(function() {
  function validateContactForm() {
    if (typeof window.auth === 'undefined') {
      return {
        validateEmail: function(email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        validatePhone: function(phone) {
          return /^\+?\d{10,15}$/.test(phone.replace(/\s/g, ''));
        }
      };
    }
    return window.auth;
  }

  const auth = validateContactForm();
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    function validateField(input, validator, errorMsg) {
      const value = input.value.trim();
      if (!value) {
        input.classList.add('is-invalid');
        return false;
      }
      if (validator && !validator(value)) {
        input.classList.add('is-invalid');
        input.nextElementSibling.textContent = errorMsg;
        return false;
      }
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      return true;
    }

    nameInput.addEventListener('blur', function() {
      validateField(this, null, 'Name is required');
    });

    phoneInput.addEventListener('blur', function() {
      validateField(this, auth.validatePhone, 'Invalid phone number format (10-15 digits)');
    });

    messageInput.addEventListener('blur', function() {
      validateField(this, null, 'Message is required');
    });

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const msg = messageInput.value.trim();
      
      let isValid = true;
      isValid = validateField(nameInput, null, 'Name is required') && isValid;
      isValid = validateField(phoneInput, auth.validatePhone, 'Invalid phone number format (10-15 digits)') && isValid;
      isValid = validateField(messageInput, null, 'Message is required') && isValid;

      if (!isValid) {
        return;
      }

      alert('✅ Message sent successfully! We will contact you soon.');
      contactForm.reset();
      nameInput.classList.remove('is-valid');
      phoneInput.classList.remove('is-valid');
      messageInput.classList.remove('is-valid');
    });
  }
})();

function updateClock() {
  const now = new Date();
  const opts = { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' };
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    clockEl.textContent = now.toLocaleString('en-US', opts);
  }
}
updateClock();
setInterval(updateClock, 1000);

const greetBox = document.createElement("div");
let msgTime;
switch (true) {
  case new Date().getHours() < 12: msgTime = "Good morning!"; break;
  case new Date().getHours() < 18: msgTime = "Good afternoon!"; break;
  default: msgTime = "Good evening!";
}
greetBox.className = "text-center text-info mb-2";
greetBox.textContent = msgTime;
const mainEl = document.querySelector("main");
if (mainEl) {
  mainEl.prepend(greetBox);
}

const savedColor = localStorage.getItem("bgColor");
if (savedColor) document.body.style.background = savedColor;
