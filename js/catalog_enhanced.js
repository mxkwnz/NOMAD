(function() {
  function updateAuthUI() {
    const user = window.auth.getCurrentUser();
    const authNavItem = document.getElementById('authNavItem');
    const profileNavItem = document.getElementById('profileNavItem');
    
    if (user) {
      if (authNavItem) {
        authNavItem.innerHTML = '<a class="nav-link" href="#" onclick="window.auth.signOut(); window.location.reload();">Logout</a>';
      }
      if (profileNavItem) profileNavItem.style.display = 'block';
    } else {
      if (authNavItem) {
        authNavItem.innerHTML = '<a class="nav-link" href="index.html#login">Login</a>';
      }
      if (profileNavItem) profileNavItem.style.display = 'none';
    }
  }

  function addRatingButtons() {
    const carMapping = {
      'Porsche 911': 'Porsche 911',
      'Lamborghini Aventador': 'Lamborghini Aventador',
      'Bugatti Chiron': 'Bugatti Chiron',
      'Ferrari SF90': 'Ferrari SF90 Stradale',
      'Bentley Continental GT': 'Bentley Continental GT',
      'BMW M5': 'BMW M5 F90',
      'Mercedes G63': 'Mercedes G63 AMG',
      'Rolls-Royce Phantom': 'Rolls-Royce Phantom',
      'Audi Q5': 'Audi Q5'
    };

    Object.keys(carMapping).forEach(dataCar => {
      const buyBtn = document.querySelector(`button[data-car="${dataCar}"]`);
      if (!buyBtn) return;
      
      const carName = carMapping[dataCar];
      
      const cardBody = buyBtn.closest('.card-body');
      if (!cardBody) return;

      const existingRating = cardBody.querySelector('[data-car-rating]');
      if (existingRating) return;

      const priceElement = buyBtn.previousElementSibling;
      if (!priceElement || !priceElement.classList.contains('fw-bold')) return;

      const ratingDiv = document.createElement('div');
      ratingDiv.className = 'mb-2';
      ratingDiv.setAttribute('data-car', carName);
      ratingDiv.setAttribute('data-car-rating', 'true');
      ratingDiv.setAttribute('data-car-key', dataCar);
      ratingDiv.innerHTML = `
        <span class="rating-display"></span>
        <div class="rating-buttons btn-group btn-group-sm" role="group">
          <button type="button" class="btn btn-outline-warning rating-btn" data-rating="1">1⭐</button>
          <button type="button" class="btn btn-outline-warning rating-btn" data-rating="2">2⭐</button>
          <button type="button" class="btn btn-outline-warning rating-btn" data-rating="3">3⭐</button>
          <button type="button" class="btn btn-outline-warning rating-btn" data-rating="4">4⭐</button>
          <button type="button" class="btn btn-outline-warning rating-btn" data-rating="5">5⭐</button>
        </div>
      `;
      priceElement.after(ratingDiv);
    });
  }

  function initRatings() {
    const ratingContainers = document.querySelectorAll('[data-car-rating]');
    
    ratingContainers.forEach(ratingContainer => {
      const carName = ratingContainer.getAttribute('data-car');
      if (!carName) return;

      const ratingDisplay = ratingContainer.querySelector('.rating-display');
      const ratingBtns = ratingContainer.querySelectorAll('.rating-btn');
      const user = window.auth.getCurrentUser();

      function updateRatingDisplay() {
        const rating = window.auth.getRating(carName);
        if (rating) {
          ratingDisplay.innerHTML = `<strong>Your Rating: ${rating}/5 ⭐</strong> `;
          ratingBtns.forEach(btn => {
            const btnRating = parseInt(btn.getAttribute('data-rating'));
            if (btnRating <= rating) {
              btn.classList.add('btn-warning');
              btn.classList.remove('btn-outline-warning');
            } else {
              btn.classList.remove('btn-warning');
              btn.classList.add('btn-outline-warning');
            }
          });
        } else {
          ratingDisplay.innerHTML = user ? 'Rate this car: ' : '<small class="text-muted">Login to rate</small>';
          ratingBtns.forEach(btn => {
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-outline-warning');
          });
        }
      }

      updateRatingDisplay();

      ratingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          if (!user) {
            alert('Please login to rate cars');
            return;
          }
          const rating = parseInt(this.getAttribute('data-rating'));
          const result = window.auth.saveRating(carName, rating);
          if (result.success) {
            updateRatingDisplay();
          } else {
            alert(result.message);
          }
        });
      });
    });
  }


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      updateAuthUI();
      addRatingButtons();
      setTimeout(initRatings, 100);
    });
  } else {
    updateAuthUI();
    addRatingButtons();
    setTimeout(initRatings, 100);
  }
})();

