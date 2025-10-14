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