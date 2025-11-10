(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfile);
  } else {
    initProfile();
  }

  function initProfile() {
    const user = (window.auth && typeof window.auth.getCurrentUser === 'function')
      ? window.auth.getCurrentUser()
      : null;
    
    if (!user) {
      window.location.href = 'index.html';
      return;
    }

    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');
    const phoneEl = document.getElementById('profilePhone');
    const dateEl = document.getElementById('profileDate');

    if (nameEl) nameEl.textContent = user.name || '';
    if (emailEl) emailEl.textContent = user.email || '';
    if (phoneEl) phoneEl.textContent = user.phone || '';

    if (user.createdAt && dateEl) {
      try {
        const date = new Date(user.createdAt);
        dateEl.textContent = isNaN(date.getTime()) ? '' : date.toLocaleDateString();
      } catch (e) {
        dateEl.textContent = '';
      }
    }

    displayRatings(user.ratings || {});
    displaySearchHistory();
    displayBookings();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.auth && typeof window.auth.signOut === 'function') {
          window.auth.signOut();
        }
        window.location.href = 'index.html';
      });
    }
  }

  function displayRatings(ratings) {
    const container = document.getElementById('profileRatings');
    if (!container) return;

    const carNames = Object.keys(ratings || {});
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
        <strong>${escapeHtml(carName)}</strong>: ${stars} (${escapeHtml(String(rating))}/5)
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function displaySearchHistory() {
    const container = document.getElementById('searchHistory');
    if (!container) return;

    let history = [];
    try {
      if (window.auth && typeof window.auth.getSearchHistory === 'function') {
        history = window.auth.getSearchHistory() || [];
      }
    } catch (e) {
      history = [];
    }

    if (!history || history.length === 0) {
      container.innerHTML = '<p class="text-secondary">No search history yet.</p>';
      return;
    }

    let html = '<div class="list-group">';
    history.forEach(item => {
      const date = new Date(item.timestamp || Date.now());
      html += `<div class="list-group-item bg-secondary text-light mb-2">
        <strong>${escapeHtml(item.term || '')}</strong> - ${escapeHtml(String(item.results || 0))} results
        <br><small>${escapeHtml(date.toLocaleString())}</small>
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function displayBookings() {
    try {
      const raw = localStorage.getItem('nomad_current_user');
      let user = null;
      try { user = raw ? JSON.parse(raw) : null; } catch (e) { user = null; }

      const container = document.getElementById('bookingsList');
      if (!container) return;

      const bookings = (user && Array.isArray(user.bookings)) ? user.bookings : [];

      if (!bookings || bookings.length === 0) {
        container.innerHTML = '<p class="text-secondary">You have no bookings yet.</p>';
        return;
      }

      let html = '<div class="list-group">';
      bookings.slice().reverse().forEach(b => {
        let startText = '—', endText = '—';
        try {
          startText = b.start ? new Date(b.start).toLocaleDateString() : '—';
          endText = b.end ? new Date(b.end).toLocaleDateString() : '—';
        } catch (e) {
          startText = b.start || '—';
          endText = b.end || '—';
        }
        const daysText = b.days || '—';
        const priceText = (typeof b.price !== 'undefined') ? (escapeHtml(String(b.price)) + ' $') : '—';
        const timeText = b.timestamp ? new Date(b.timestamp).toLocaleString() : '';

        html += '<div class="list-group-item bg-secondary text-light mb-2">';
        html += '<div class="d-flex justify-content-between">';
        html += `<div><strong>${escapeHtml(b.car || '—')}</strong><br><small>${escapeHtml(startText)} — ${escapeHtml(endText)} (${escapeHtml(String(daysText))} days)</small></div>`;
        html += `<div class="text-end"><strong>${priceText}</strong><br><small class="text-muted">${escapeHtml(timeText)}</small></div>`;
        html += '</div></div>';
      });
      html += '</div>';
      container.innerHTML = html;
    } catch (err) {
      console.error('displayBookings failed', err);
      const container = document.getElementById('bookingsList');
      if (container) container.innerHTML = '<p class="text-secondary">Unable to load bookings.</p>';
    }
  }

  function escapeHtml(str) {
    if (str === null || typeof str === 'undefined') return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
