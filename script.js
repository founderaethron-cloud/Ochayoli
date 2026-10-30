const releases = [
  { title: 'THUVVAK', artist: 'Farsida', detail: 'A selected track reference from the O\'Flow curated set. Official release metadata and listening link to be added.' },
  { title: 'LAAV', artist: 'Farsida', detail: 'A selected track reference from the O\'Flow curated set. Official release metadata and listening link to be added.' },
  { title: 'MELLE PANJO', artist: 'Jarvie G', detail: 'A selected track reference from the O\'Flow curated set. Official release metadata and listening link to be added.' }
];

const releaseGrid = document.querySelector('[data-release-grid]');

releaseGrid.innerHTML = releases.map((release, index) => `
  <article class="release-card">
    <span class="release-card__index mono">${String(index + 1).padStart(2, '0')}</span>
    <h3 class="release-card__title">${release.title}</h3>
    <p class="release-card__artist mono">${release.artist} · listening link to be added</p>
    <button class="release-card__button" type="button" aria-expanded="false" aria-label="Show note for ${release.title}">↗</button>
    <p class="release-card__details">${release.detail}</p>
  </article>
`).join('');

const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.menu-toggle__label').textContent = isOpen ? 'Close' : 'Menu';
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('.menu-toggle__label').textContent = 'Menu';
}));

releaseGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.release-card__button');
  if (!button) return;
  const card = button.closest('.release-card');
  const isOpen = card.classList.toggle('is-open');
  button.setAttribute('aria-expanded', String(isOpen));
  button.setAttribute('aria-label', `${isOpen ? 'Hide' : 'Show'} note for ${card.querySelector('.release-card__title').textContent}`);
  button.textContent = isOpen ? '−' : '↗';
});

const inquiryForm = document.querySelector('[data-inquiry-form]');
const inquiryStatus = document.querySelector('[data-form-status]');
const inquiryButton = inquiryForm.querySelector('button[type="submit"]');

inquiryForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  inquiryButton.disabled = true;
  inquiryStatus.textContent = 'Sending inquiry…';
  try {
    const response = await fetch(inquiryForm.action, {
      method: 'POST',
      body: new FormData(inquiryForm),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) throw new Error(result.message || 'The inquiry could not be sent.');
    inquiryForm.reset();
    inquiryStatus.textContent = result.message || 'Inquiry sent to hello@ochayoli.in.';
  } catch (error) {
    inquiryStatus.textContent = error.message || 'The inquiry could not be sent. Please try again.';
  } finally {
    inquiryButton.disabled = false;
  }
});
