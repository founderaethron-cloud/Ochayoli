const artists = [
  { name: 'Farsida', letter: 'F', tag: 'Multilingual producer · Kerala', bio: 'Farsin Sidhu. A producer moving between languages and textures, building beats that let Malayalam sit alongside other tongues without losing its edge.' },
  { name: 'Jarvie G', letter: 'J', tag: 'Actor / hip-hop artist · Kerala', bio: 'A screen performer bringing his own raw, streetwise energy into Malayalam hip-hop.' },
  { name: 'Kazee', letter: 'K', tag: 'Freestyle MC · Periyar', bio: 'Periyar roots. Freestyle instinct. Local stories delivered with unmistakable grit.' },
  { name: 'NAN6', letter: 'N', tag: 'Folk-influenced artist · Kochi / Alappad', bio: 'From Alappad to Kochi, turning lived experience and identity into collective sound.' },
  { name: 'Lostix', letter: 'L', tag: 'Hard techno / EDM producer · Kerala', bio: 'Industrial rhythms, hypnotic grooves, and an electronic sound designed to leave an imprint.' }
];

const releases = [
  { title: 'THUVVAK', artist: 'Farsida', detail: 'A selected track reference from the O\'Flow curated set. Official release metadata and listening link to be added.' },
  { title: 'LAAV', artist: 'Farsida', detail: 'A selected track reference from the O\'Flow curated set. Official release metadata and listening link to be added.' },
  { title: 'MELLE PANJO', artist: 'Jarvie G', detail: 'A selected track reference from the O\'Flow curated set. Official release metadata and listening link to be added.' }
];

const artistGrid = document.querySelector('[data-artist-grid]');
const releaseGrid = document.querySelector('[data-release-grid]');

artistGrid.innerHTML = artists.map((artist, index) => `
  <article class="artist-row">
    <span class="artist-row__number mono">${String(index + 1).padStart(2, '0')}</span>
    <h3>${artist.name}</h3>
    <p class="artist-row__tag mono">${artist.tag}</p>
    <button class="artist-row__open" type="button" aria-label="Open ${artist.name} profile" data-artist="${artist.name}">↗</button>
  </article>
`).join('');

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

const dialog = document.querySelector('[data-profile-dialog]');
const dialogTitle = dialog.querySelector('[data-dialog-title]');
const dialogKicker = dialog.querySelector('[data-dialog-kicker]');
const dialogBio = dialog.querySelector('[data-dialog-bio]');
const dialogStatus = dialog.querySelector('[data-dialog-status]');

artistGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-artist]');
  if (!button) return;
  const artist = artists.find((item) => item.name === button.dataset.artist);
  if (!artist) return;
  dialogKicker.textContent = `${artist.tag} / O'Flow profile`;
  dialogTitle.textContent = artist.name;
  dialogBio.textContent = artist.bio;
  dialogStatus.textContent = 'Full profile and official links coming soon';
  if (typeof dialog.showModal === 'function') dialog.showModal();
});

dialog.querySelectorAll('[data-dialog-close]').forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

releaseGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.release-card__button');
  if (!button) return;
  const card = button.closest('.release-card');
  const isOpen = card.classList.toggle('is-open');
  button.setAttribute('aria-expanded', String(isOpen));
  button.setAttribute('aria-label', `${isOpen ? 'Hide' : 'Show'} note for ${card.querySelector('.release-card__title').textContent}`);
  button.textContent = isOpen ? '−' : '↗';
});

document.querySelector('[data-inquiry-form]').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const draft = `Ochayoli inquiry\nFrom: ${form.get('name')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`;
  const status = document.querySelector('[data-form-status]');
  try {
    await navigator.clipboard.writeText(draft);
    status.textContent = 'Inquiry copied. Send it through the official contact channel when available.';
  } catch {
    status.textContent = 'Copy is unavailable in this browser. Your details have not been sent or stored.';
  }
});
