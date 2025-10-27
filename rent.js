const idxInput = document.getElementById('index');
  const carSel = document.getElementById('car');
  if (idxInput && carSel) {
    idxInput.addEventListener('input', function () {
      const v = parseInt(this.value);
      if (v >= 1 && v <= 9) carSel.selectedIndex = v;
    });
  }

  const bgBtn = document.getElementById('bgBtn');
  const colors = ['#000000', '#101010', '#1a1a1a', '#222', '#0b0b0b', '#0f0f1a'];
  let cIndex = 0;
  if (bgBtn) {
    bgBtn.addEventListener('click', () => {
      cIndex = (cIndex + 1) % colors.length;
      document.body.style.transition = 'background 0.5s ease';
      document.body.style.background = colors[cIndex];
    });
  }

  function updateClock() {
    const now = new Date();
    const opts = { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' };
    document.getElementById('clock').textContent = now.toLocaleString('en-US', opts);
  }
  updateClock();
  setInterval(updateClock, 1000);


document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'r') {
    document.getElementById('rentForm').scrollIntoView({ behavior: 'smooth' });
  }
});

  const clickSound = new Audio("bell.mp3");
  const successSound = new Audio("booked_sound.mp3");

    if (bgBtn) {
      bgBtn.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
      });
    }

    const rentForm = document.getElementById('rentForm');
    if (rentForm) {
      rentForm.addEventListener('submit', e => {
        e.preventDefault();

        const name  = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const car   = document.getElementById('car').value;
        const start = document.getElementById('start').value;
        const end   = document.getElementById('end').value;

        let msg = '';
        if (!name) msg += '- Please enter your full name.\n';
        if (!phone.match(/^\+?\d{10,}$/)) msg += '- Enter a valid phone number (at least 10 digits).\n';
        if (!car) msg += '- Select a car.\n';
        if (!start || !end) msg += '- Choose start and end dates.\n';
        if (start && end && new Date(start) > new Date(end))
          msg += '- End date must be after start date.\n';

        if (msg) {
          alert('Please fix the following:\n' + msg);
          return;
        }

        alert('✅ Booking submitted successfully! Our team will contact you soon.');
        rentForm.reset();

        successSound.currentTime = 0;
        successSound.play();
      });
    }

    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) document.body.style.background = savedColor;

    bgBtn.addEventListener("click", () => {
      const bg = document.body.style.background;
      localStorage.setItem("bgColor", bg);
  });