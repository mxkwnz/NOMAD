document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      q.parentElement.classList.toggle('active');
    });
  });

 const popup = document.getElementById('popupForm');
  const openBtn = document.getElementById('openPopup');
  const closeBtn = document.getElementById('closePopup');

  openBtn.addEventListener('click', () => popup.style.display = 'flex');
  closeBtn.addEventListener('click', () => popup.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === popup) popup.style.display = 'none'; });

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent =
    document.body.classList.contains("dark-mode") ? "Night Mode" : "Day Mode";
});

const readMoreBtn = document.getElementById("readMoreBtn");
const extraText = document.getElementById("extraText");

readMoreBtn.addEventListener("click", () => {
  if (extraText.style.display === "none") {
    extraText.style.display = "block";
    readMoreBtn.textContent = "Read Less";
  } else {
    extraText.style.display = "none";
    readMoreBtn.textContent = "Read More";
  }
});

const changeTitleBtn = document.getElementById('changeTitle');
const mainTitle = document.querySelector('h1');

changeTitleBtn.addEventListener('click', () => {
  mainTitle.textContent = "Welcome to Nomad – Explore Cars with Style!";
});


const showTimeBtn = document.getElementById("showTimeBtn");
const timeDisplay = document.getElementById("timeDisplay");

showTimeBtn.addEventListener("click", () => {
  const now = new Date().toLocaleTimeString();
  timeDisplay.textContent = "Current Time: " + now;
});

const greetingMsg = document.getElementById("greetingMsg");
const hour = new Date().getHours();
let greeting = "";

switch (true) {
  case (hour < 12):
    greeting = "Good Morning!";
    break;
  case (hour < 18):
    greeting = "Good Afternoon!";
    break;
  default:
    greeting = "Good Evening!";
}

greetingMsg.textContent = greeting;

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
