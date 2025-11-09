(function() {
  function updateOffcanvasProfile() {
    const user = window.auth.getCurrentUser();
    const offcanvasProfile = document.getElementById('offcanvasProfile');
    if (offcanvasProfile) {
      offcanvasProfile.style.display = user ? 'block' : 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(updateOffcanvasProfile, 100);
    });
  } else {
    setTimeout(updateOffcanvasProfile, 100);
  }
})();

document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => q.parentElement.classList.toggle('active'));
});

const popup = document.getElementById('popupForm');
document.getElementById('openPopup').onclick = () => popup.style.display = 'flex';
document.getElementById('closePopup').onclick = () => popup.style.display = 'none';
window.onclick = e => { if (e.target === popup) popup.style.display = 'none'; };

const readMoreBtn = document.getElementById("readMoreBtn");
const extraText = document.getElementById("extraText");
readMoreBtn.addEventListener("click", () => {
  const isHidden = extraText.style.display === "none";
  extraText.style.display = isHidden ? "block" : "none";
  readMoreBtn.textContent = isHidden ? "Read Less" : "Read More";
});

document.getElementById('changeTitle').onclick = () => {
  document.querySelector('h1').textContent = "Welcome to Nomad – Explore Cars with Style!";
};

const showTimeBtn = document.getElementById("showTimeBtn");
const timeDisplay = document.getElementById("timeDisplay");

showTimeBtn.addEventListener("click", () => {
  if (timeDisplay.style.display === "none" || timeDisplay.style.display === "") {
    timeDisplay.textContent = "Current Time: " + new Date().toLocaleTimeString();
    timeDisplay.style.display = "block";
    showTimeBtn.textContent = "Hide Time";
  } else {
    timeDisplay.style.display = "none";
    showTimeBtn.textContent = "Show Current Time";
  }
});

const hour = new Date().getHours();
const greetingMsg = document.getElementById("greetingMsg");
greetingMsg.textContent = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
let currentIndex = 0;
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % navLinks.length;
    navLinks[currentIndex].focus();
  } else if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
    navLinks[currentIndex].focus();
  }
});

$(window).on("scroll", function() {
  let scrollTop = $(window).scrollTop();
  let docHeight = $(document).height();
  let winHeight = $(window).height();
  let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
  $("#scrollProgress").css("width", scrollPercent + "%");
});

$(document).ready(function() {
  $(".counter").each(function() {
    let $this = $(this);
    let target = +$this.data("target");
    $({ countNum: 0 }).animate({ countNum: target }, {
      duration: 3000,
      easing: "swing",
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum + "+");
      }
    });
  });
});

$("#contactForm").on("submit", function(e) {
  e.preventDefault(); 

  let btn = $("#submitBtn");
  btn.prop("disabled", true);
  btn.html('<span class="spinner-border spinner-border-sm"></span> Please wait…');

  setTimeout(() => {
    btn.prop("disabled", false);
    btn.html("Send Message");
    alert("✅ Your message was sent successfully!");
    $("#popupForm").hide();
  }, 1000);
});
