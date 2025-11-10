const idxInput = document.getElementById('index');
const carSel = document.getElementById('car');
if (idxInput && carSel) {
  idxInput.addEventListener('input', function () {
    const v = parseInt(this.value);
    if (v >= 1 && v <= 9) carSel.selectedIndex = v;
  });
}

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

document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'r') {
    const rentForm = document.getElementById('rentForm');
    if (rentForm) {
      rentForm.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

const clickSound = new Audio("sound/bell.mp3");
const successSound = new Audio("sound/booked_sound.mp3");

    function validateRentForm() {
      if (typeof window.auth === 'undefined') {
        return {
          validatePhone: function(phone) {
            return /^\+?\d{10,15}$/.test(phone.replace(/\s/g, ''));
          }
        };
      }
      return window.auth;
    }

    const auth = validateRentForm();
    const rentForm = document.getElementById('rentForm');
    if (rentForm) {
      const nameInput = document.getElementById('name');
      const phoneInput = document.getElementById('phone');
      const carInput = document.getElementById('car');
      const startInput = document.getElementById('start');
      const endInput = document.getElementById('end');

      function validateField(input, validator, errorMsg) {
        const value = input.value.trim();
        if (!value && input.type !== 'date') {
          input.classList.add('is-invalid');
          return false;
        }
        if (validator && !validator(value)) {
          input.classList.add('is-invalid');
          const feedback = input.nextElementSibling;
          if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = errorMsg;
          }
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

      carInput.addEventListener('change', function() {
        validateField(this, function(val) { return val !== ''; }, 'Please select a car');
      });

      startInput.addEventListener('change', function() {
        validateField(this, null, 'Start date is required');
        if (endInput.value && new Date(this.value) > new Date(endInput.value)) {
          endInput.classList.add('is-invalid');
        }
      });

      endInput.addEventListener('change', function() {
        validateField(this, null, 'End date is required');
        if (startInput.value && new Date(startInput.value) > new Date(this.value)) {
          this.classList.add('is-invalid');
        }
      });

      rentForm.addEventListener('submit', e => {
        e.preventDefault();

        const name  = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const car   = carInput.value;
        const start = startInput.value;
        const end   = endInput.value;

        let isValid = true;
        isValid = validateField(nameInput, null, 'Name is required') && isValid;
        isValid = validateField(phoneInput, auth.validatePhone, 'Invalid phone number format (10-15 digits)') && isValid;
        isValid = validateField(carInput, function(val) { return val !== ''; }, 'Please select a car') && isValid;
        isValid = validateField(startInput, null, 'Start date is required') && isValid;
        isValid = validateField(endInput, null, 'End date is required') && isValid;

        if (start && end && new Date(start) > new Date(end)) {
          endInput.classList.add('is-invalid');
          alert('End date must be after start date');
          return;
        }

        if (!isValid) {
          alert('Please fix the errors in the form');
          return;
        }

        alert('✅ Booking submitted successfully! Our team will contact you soon.');
        rentForm.reset();
        [nameInput, phoneInput, carInput, startInput, endInput].forEach(input => {
          input.classList.remove('is-valid', 'is-invalid');
        });

        successSound.currentTime = 0;
        successSound.play();
        
        try {
          const current = window.auth && window.auth.getCurrentUser && window.auth.getCurrentUser();
          if (current) {
            const carName = car.replace(/^\d+\.\s*/, '').trim();

            const PRICES = {
              'Porsche 911': 250,
              'BMW M5': 220,
              'Mercedes G63': 300,
              'Toyota Camry': 90,
              'Kia Sportage': 80,
              'Hyundai Tucson': 75,
              'Lexus ES': 140,
              'Nissan X-Trail': 70,
              'Audi Q5': 120
            };

            // Calculate number of days between start and end
            const startDate = new Date(start);
            const endDate = new Date(end);
            let ms = endDate.getTime() - startDate.getTime();
            let days = Math.ceil(ms / (1000 * 60 * 60 * 24));
            if (!isFinite(days) || days < 1) days = 1;

            // Price calculation
            const basePrice = PRICES[carName] || 100; 
            const totalPrice = basePrice * days;

            const usersRaw = localStorage.getItem('nomad_users') || '{}';
            let users;
            try { users = JSON.parse(usersRaw); } catch(e) { users = {}; }

            if (!users[current.email]) {
              users[current.email] = {
                name: current.name || '',
                email: current.email || '',
                phone: current.phone || '',
                bookings: []
              };
            }
            if (!Array.isArray(users[current.email].bookings)) {
              users[current.email].bookings = [];
            }

            users[current.email].bookings.push({
              car: carName,
              start: start,
              end: end,
              days: days,
              price: totalPrice,
              timestamp: new Date().toISOString()
            });

            localStorage.setItem('nomad_users', JSON.stringify(users));

            const updatedUser = Object.assign({}, users[current.email]);
            if (updatedUser.password) delete updatedUser.password;
            localStorage.setItem('nomad_current_user', JSON.stringify(updatedUser));
          }
        } catch (err) {
          console.error('Failed to save booking to profile', err);
        }

      });
    }

const savedColor = localStorage.getItem("bgColor");
if (savedColor) document.body.style.background = savedColor;
