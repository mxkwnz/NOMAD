(function(){
  const carsList = [
    "Audi Q5",
    "BMW M5",
    "Hyundai Tucson",
    "Kia Sportage",
    "Lexus ES",
    "Mercedes G63",
    "Nissan X-Trail",
    "Porsche 911",
    "Toyota Camry"
  ];

  function normalize(s){
    return s.toLowerCase().replace(/\s+/g,' ').trim();
  }

  function ensureModal(){
    if (document.getElementById('nomadSpecsModal')) return;
    const modalHtml = `
<div class="modal fade" id="nomadSpecsModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-light text-dark">
      <div class="modal-header">
        <h5 class="modal-title" id="nomadSpecsTitle">Specifications</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="nomadSpecsBody">
        <p class="text-secondary small">Loading...</p>
      </div>
      <div class="modal-footer">
        <small class="text-secondary">Data from NHTSA (US Vehicle API)</small>
      </div>
    </div>
  </div>
</div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  function showSpecsModal(title, htmlContent){
    ensureModal();
    const titleEl = document.getElementById('nomadSpecsTitle');
    const bodyEl = document.getElementById('nomadSpecsBody');
    titleEl.textContent = title;
    bodyEl.innerHTML = htmlContent;
    const modalEl = document.getElementById('nomadSpecsModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  async function fetchModelsForMake(make){
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(make)}?format=json`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Network error: ' + resp.status);
    const data = await resp.json();
    if (!data.Results) return [];
    return data.Results.map(r => r.Model_Name).filter(Boolean);
  }

  function attachButtons(){
    const cards = Array.from(document.querySelectorAll('.card'));
    if (!cards.length){
      const imgs = Array.from(document.querySelectorAll('img')).filter(i => {
        const src = i.getAttribute('src') || '';
        return /Audi Q5|BMW M5|Hyundai Tucson|Kia Sportage|Lexus ES|Mercedes G63|Nissan X-Trail|Porsche 911|Toyota Camry/i.test(src);
      });
      imgs.forEach(img => {
        if (img.dataset.specsBtnAdded) return;
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-outline-dark mt-2 spec-btn';
        btn.textContent = 'other models';
        img.insertAdjacentElement('afterend', btn);
        img.dataset.specsBtnAdded = '1';
        btn.addEventListener('click', () => {
          const text = img.alt || img.closest('.card')?.querySelector('.card-title')?.textContent || img.getAttribute('src');
          handleSpecsClick(text);
        });
      });
      return;
    }

    cards.forEach(card => {
      if (card.querySelector('.spec-btn')) return;

      const title = (card.querySelector('.card-title')?.textContent || card.querySelector('h5')?.textContent || '').trim();
      let displayName = title;
      if (!displayName){
        const img = card.querySelector('img');
        displayName = img?.alt || img?.getAttribute('src') || '';
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-sm btn-outline-dark spec-btn';
      btn.style.marginLeft = '8px';
      btn.textContent = 'other models';
      const target = card.querySelector('.card-body') || card;
      target.appendChild(btn);

      btn.addEventListener('click', function(){
        handleSpecsClick(displayName);
      });
    });
  }

  async function handleSpecsClick(displayName){
    const n = normalize(String(displayName));
    let make = '', model = '';
    const parts = n.split(' ');
    if (parts.length >= 2){
      make = parts[0];
      model = parts.slice(1).join(' ');
    } else {
      for (const full of carsList){
        if (normalize(full).includes(n)) {
          const sp = normalize(full).split(' ');
          make = sp[0]; model = sp.slice(1).join(' ');
          break;
        }
      }
    }

    if (!make){
      showSpecsModal('Specs', `<p class="text-danger">Не удалось определить марку автомобиля для: <strong>${displayName}</strong></p>`);
      return;
    }

    showSpecsModal('Specs — ' + displayName, `<p class="text-secondary small">Запрос к NHTSA для марки <strong>${make.toUpperCase()}
    </strong>…</p><p class="text-secondary small">Если ответ долгий — подождите несколько секунд.</p>`);

    try {
      const models = await fetchModelsForMake(make);
      if (!models.length){
        document.getElementById('nomadSpecsBody').innerHTML = `<p class="text-warning">NHTSA не вернул моделей для марки <strong>
        ${make.toUpperCase()}</strong>.</p><p class="text-secondary">Вы можете показать дополнительные данные из локальной базы.</p>`;
        return;
      }

      const found = models.filter(m => normalize(m).includes(normalize(model)) || normalize(model).includes(normalize(m)));
      let html = '';
      if (found.length){
        html += `<p>Найденные совпадения модели <strong>${model}</strong>:</p><ul>`;
        found.slice(0,20).forEach(f => {
          html += `<li>${f}</li>`;
        });
        html += `</ul>`;
      } else {
        html += `<p>Модель <strong>${model || '(не указана)'}</strong> напрямую не найдена в результатах.</p>`;
        html += `<p>Вот список популярных моделей для марки <strong>${make.toUpperCase()}</strong> (первые 20):</p><ul>`;
        models.slice(0,20).forEach(m => html += `<li>${m}</li>`);
        html += `</ul>`;
      }

      html += `<p class="small text-secondary">Источник: NHTSA Vehicle API — https://vpic.nhtsa.dot.gov/</p>`;
      document.getElementById('nomadSpecsBody').innerHTML = html;

    } catch (err) {
      document.getElementById('nomadSpecsBody').innerHTML = `<p class="text-danger">Ошибка при запросе API: ${err.message}</p>`;
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    try {
      attachButtons();
      const obs = new MutationObserver(() => attachButtons());
      obs.observe(document.body, {childList: true, subtree: true});
    } catch (e){
      console.error('api_integration init error', e);
    }
  });

})();
