(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfile);
  } else {
    initProfile();
  }

  function initProfile() {
    const user = window.auth.getCurrentUser();
    
    if (!user) {
      window.location.href = 'index.html';
      return;
    }

    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profilePhone').textContent = user.phone;
    
    if (user.createdAt) {
      const date = new Date(user.createdAt);
      document.getElementById('profileDate').textContent = date.toLocaleDateString();
    }

    displayRatings(user.ratings || {});
    displaySearchHistory();

    document.getElementById('logoutBtn').addEventListener('click', function(e) {
      e.preventDefault();
      window.auth.signOut();
      window.location.href = 'index.html';
    });
  }

  function displayRatings(ratings) {
    const container = document.getElementById('profileRatings');
    const carNames = Object.keys(ratings);
    
    if (carNames.length === 0) {
      container.innerHTML = '<p class="text-secondary">No ratings yet. Start rating cars in the catalog!</p>';
      return;
    }

    let html = '<div class="list-group">';
    carNames.forEach(carName => {
      const rating = ratings[carName];
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '⭐' : '☆';
      }
      html += `<div class="list-group-item bg-secondary text-light mb-2">
        <strong>${carName}</strong>: ${stars} (${rating}/5)
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function displaySearchHistory() {
    const history = window.auth.getSearchHistory();
    const container = document.getElementById('searchHistory');
    
    if (history.length === 0) {
      container.innerHTML = '<p class="text-secondary">No search history yet.</p>';
      return;
    }

    let html = '<div class="list-group">';
    history.forEach(item => {
      const date = new Date(item.timestamp);
      html += `<div class="list-group-item bg-secondary text-light mb-2">
        <strong>${item.term}</strong> - ${item.results} results
        <br><small>${date.toLocaleString()}</small>
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  }
})();

