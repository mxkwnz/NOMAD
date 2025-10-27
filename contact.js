const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const msg = document.getElementById('message').value.trim();
      let err = '';

      if (!name) err += '- Name is required.\n';
      if (!phone.match(/^\+?\d{10,}$/)) err += '- Enter a valid phone number (at least 10 digits).\n';
      if (!msg) err += '- Please enter a message.\n';

      if (err) {
        alert('Please correct:\n' + err);
        return;
      }

      alert('✅ Message sent successfully! We will contact you soon.');
      contactForm.reset();
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

  const greetBox = document.createElement("div");
  let msgTime;
  switch (true) {
    case new Date().getHours() < 12: msgTime = "Good morning!"; break;
    case new Date().getHours() < 18: msgTime = "Good afternoon!"; break;
    default: msgTime = "Good evening!";
  }
  greetBox.className = "text-center text-info mb-2";
  greetBox.textContent = msgTime;
  document.querySelector("main").prepend(greetBox);

  const sndClick = new Audio("bell.mp3");
  bgBtn.addEventListener("click", () => {
    sndClick.currentTime = 0;
    sndClick.play();
  });

  const savedColor = localStorage.getItem("bgColor");
    if (savedColor) document.body.style.background = savedColor;

    bgBtn.addEventListener("click", () => {
      const bg = document.body.style.background;
      localStorage.setItem("bgColor", bg);
  } );