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