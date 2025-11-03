 const orderModal = document.getElementById('orderModal');
  orderModal?.addEventListener('show.bs.modal', function(e){
    const btn = e.relatedTarget;
    const car = btn?.getAttribute('data-car') || '';
    document.getElementById('orderCar').value = car;
  });

  document.getElementById('orderForm')?.addEventListener('submit', function(ev) {
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

  const submitBtn = this.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Sending...`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    const modal = bootstrap.Modal.getInstance(orderModal);
    modal?.hide();
    alert('✅ Order submitted successfully! We will contact you soon.');
    this.reset();
  }, 2000);
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

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "Day Mode";
} else {
  document.body.classList.remove("dark-mode");
  themeToggle.textContent = "Night Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "Day Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "Night Mode";
    localStorage.setItem("theme", "light");
  }
});


const soundButtons = document.querySelectorAll('.sound-btn');

soundButtons.forEach(button => {
  button.addEventListener('click', () => {
    const soundFile = button.getAttribute('data-sound');
    const sound = new Audio('../' + soundFile);
    sound.currentTime = 0;
    sound.play().catch(err => console.error('Audio play error:', err));
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

$(document).ready(function() {
  console.log("jQuery is ready!");

  $("#searchInput").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    $(".card").filter(function() {
      $(this).toggle($(this).text().toLowerCase().includes(value));
    });
    showSuggestions(value);
    highlightText(value);
  });

  const carNames = [
    "Porsche 911", "Lamborghini Aventador", "Bugatti Chiron", 
    "Ferrari SF90 Stradale", "Bentley Continental GT",
    "BMW M5 F90", "Mercedes G63 AMG", "Rolls-Royce Phantom", "Audi Q5"
  ];

  function showSuggestions(value) {
    $("#suggestions").empty();
    if (!value) return;
    let matches = carNames.filter(name => name.toLowerCase().includes(value));
    matches.forEach(name => {
      $("#suggestions").append(`<li class="list-group-item list-group-item-dark">${name}</li>`);
    });
  }

  $("#suggestions").on("click", "li", function() {
    $("#searchInput").val($(this).text());
    $("#suggestions").empty();
    $("#searchInput").trigger("keyup");
  });

  function highlightText(keyword) {
    $(".card-title, .card-text").each(function() {
      let text = $(this).text();
      if (!keyword) {
        $(this).html(text); 
      } else {
        let regex = new RegExp("(" + keyword + ")", "gi");
        let newText = text.replace(regex, "<span class='highlight'>$1</span>");
        $(this).html(newText);
      }
    });
  }
});

$(window).on("scroll", function() {
  let scrollTop = $(window).scrollTop();
  let docHeight = $(document).height();
  let winHeight = $(window).height();
  let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
  $("#scrollProgress").css("width", scrollPercent + "%");
});

$("body").append(`<div id="notification" class="alert alert-success position-fixed top-0 end-0 m-3" style="display:none; z-index:9999;"></div>`);
  window.showNotification = function(message) {
    $("#notification").text(message).fadeIn(300);
    setTimeout(() => $("#notification").fadeOut(500), 3000);
  };

$("#orderForm").on("submit", function () {
  // The form validation above already handles the logic;
  // We only need to show a success notification after submission.
  setTimeout(() => {
    showNotification("✅ Order submitted successfully!");
  }, 2100);
});


$(".card").each(function () {
  const title = $(this).find(".card-title");
  const copyBtn = $(`<button class="btn btn-sm btn-outline-dark ms-2 copy-btn" title="Copy car name">Copy</button>
  `);
  title.after(copyBtn);
});

$("body").on("click", ".copy-btn", function () {
  const btn = $(this);
  const carName = btn.prev(".card-title").text().trim();

  navigator.clipboard.writeText(carName).then(() => {
    btn.text("✅ Copied!");
    btn.attr("title", "Copied to clipboard!");
    showNotification(`Copied "${carName}" to clipboard!`);

    setTimeout(() => {
      btn.text("Copy");
      btn.attr("title", "Copy car name");
    }, 2000);
  });
});


$("img.card-img-top").each(function () {
  const img = $(this);
  const realSrc = img.attr("src");
  img.attr("data-src", realSrc); 
  img.removeAttr("src"); 
  img.attr("src", "https://via.placeholder.com/600x400?text=Loading..."); 
});

function lazyLoadImages() {
  $("img[data-src]").each(function () {
    const img = $(this);
    const top = img.offset().top;
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    if (top < scrollTop + windowHeight + 100) {
      img.attr("src", img.attr("data-src"));
      img.removeAttr("data-src");
    }
  });
}

$(window).on("scroll load", lazyLoadImages);
