 const orderModal = document.getElementById('orderModal');
  orderModal?.addEventListener('show.bs.modal', function(e){
    const btn = e.relatedTarget;
    const car = btn?.getAttribute('data-car') || '';
    document.getElementById('orderCar').value = car;
  });

  document.getElementById('orderForm')?.addEventListener('submit', function(ev){
    ev.preventDefault();

    const name = document.getElementById('orderName').value.trim();
    const email = document.getElementById('orderEmail').value.trim();
    const phone = document.getElementById('orderPhone').value.trim();
    const errorBox = document.createElement('p');
    errorBox.style.color = 'red';

    this.querySelector('.error-box')?.remove();

    if (!name || !email || !phone) {
      errorBox.textContent = 'Please fill in all fields.';
      errorBox.classList.add('error-box');
      this.appendChild(errorBox);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errorBox.textContent = 'Invalid email format.';
      errorBox.classList.add('error-box');
      this.appendChild(errorBox);
      return;
    }

    const phonePattern = /^[0-9]{8,15}$/;
    if (!phonePattern.test(phone)) {
      errorBox.textContent = 'Phone must contain 8–15 digits.';
      errorBox.classList.add('error-box');
      this.appendChild(errorBox);
      return;
    }

    const modal = bootstrap.Modal.getInstance(orderModal);
    modal?.hide();
    alert('✅ Order submitted successfully! We will contact you soon.');
    this.reset();
  });

  const greetingMsg = document.getElementById("greetingMsg");
const hour = new Date().getHours();
let greeting = "";

switch (true) {
  case (hour < 12):
    greeting = "Good Morning! 🌅";
    break;
  case (hour < 18):
    greeting = "Good Afternoon! ☀️";
    break;
  default:
    greeting = "Good Evening! 🌙";
}

greetingMsg.textContent = greeting;

const soundButtons = document.querySelectorAll('.sound-btn');

soundButtons.forEach(button => {
  button.addEventListener('click', () => {
    const soundFile = button.getAttribute('data-sound');
    const sound = new Audio(soundFile);
    sound.play();
  });
});

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
let currentIndex = 0;

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % navLinks.length;
    navLinks[currentIndex].focus();
  } else if (event.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
    navLinks[currentIndex].focus();
  }
});

window.addEventListener('scroll', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";
      card.style.transform = "scale(1.03)";
      card.style.boxShadow = "0 4px 20px rgba(255,255,255,0.1)";
    } else {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "none";
    }
  });
});
