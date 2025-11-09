const orderModal = document.getElementById('orderModal');
orderModal?.addEventListener('show.bs.modal', function(e){
  const btn = e.relatedTarget;
  const car = btn?.getAttribute('data-car') || '';
  document.getElementById('orderCar').value = car;
});

document.getElementById('orderForm')?.addEventListener('submit', function(ev) {
  ev.preventDefault();

  function validateOrderForm() {
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

  const auth = validateOrderForm();
  const name = document.getElementById('orderName').value.trim();
  const email = document.getElementById('orderEmail').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const nameInput = document.getElementById('orderName');
  const emailInput = document.getElementById('orderEmail');
  const phoneInput = document.getElementById('orderPhone');

  let isValid = true;

  if (!name) {
    nameInput.classList.add('is-invalid');
    isValid = false;
  } else {
    nameInput.classList.remove('is-invalid');
    nameInput.classList.add('is-valid');
  }

  if (!email || !auth.validateEmail(email)) {
    emailInput.classList.add('is-invalid');
    emailInput.nextElementSibling.textContent = !email ? 'Email is required' : 'Invalid email format';
    isValid = false;
  } else {
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
  }

  if (!phone || !auth.validatePhone(phone)) {
    phoneInput.classList.add('is-invalid');
    phoneInput.nextElementSibling.textContent = !phone ? 'Phone is required' : 'Invalid phone number format (10-15 digits)';
    isValid = false;
  } else {
    phoneInput.classList.remove('is-invalid');
    phoneInput.classList.add('is-valid');
  }

  if (!isValid) {
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
  const carNames = [
    "Porsche 911", "Lamborghini Aventador", "Bugatti Chiron", 
    "Ferrari SF90 Stradale", "Bentley Continental GT",
    "BMW M5 F90", "Mercedes G63 AMG", "Rolls-Royce Phantom", "Audi Q5"
  ];

  window.showSuggestions = function(value) {
    $("#suggestions").empty();
    if (!value) return;
    let matches = carNames.filter(name => name.toLowerCase().includes(value));
    matches.forEach(name => {
      $("#suggestions").append(`<li class="list-group-item list-group-item-dark">${name}</li>`);
    });
  };

  window.highlightText = function(keyword) {
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
  };

  $("#searchInput").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    let visibleCount = 0;
    
    $(".card").filter(function() {
      const isVisible = $(this).text().toLowerCase().includes(value);
      $(this).toggle(isVisible);
      if (isVisible) visibleCount++;
      return isVisible;
    });
    
    showSuggestions(value);
    highlightText(value);

    if (typeof window.auth !== 'undefined') {
      const user = window.auth.getCurrentUser();
      if (user && value.length > 0) {
        window.auth.saveSearchHistory(value, visibleCount);
      }
    }
  });

  $("#suggestions").on("click", "li", function() {
    $("#searchInput").val($(this).text());
    $("#suggestions").empty();
    $("#searchInput").trigger("keyup");
  });
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
