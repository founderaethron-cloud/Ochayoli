const artists = [
  { name: 'Farsida', letter: 'F', tag: 'Hip-hop / Composer / Producer', bio: 'Farsin Sidhu. A multilingual, genre-fluid artist and producer from Kerala, always in pursuit of the next sound.' },
  { name: 'Jarvie G', letter: 'J', tag: 'Hip-hop / Film', bio: 'A screen performer bringing his own raw, streetwise energy into Malayalam hip-hop.' },
  { name: 'Kazee', letter: 'K', tag: 'Freestyle / MC', bio: 'Periyar roots. Freestyle instinct. Local stories delivered with unmistakable grit.' },
  { name: 'NAN6', letter: 'N', tag: 'Urban / Folk-influenced hip-hop', bio: 'From Alappad to Kochi, turning lived experience and identity into collective sound.' },
  { name: 'Lostix', letter: 'L', tag: 'Hard techno / EDM', bio: 'Industrial rhythms, hypnotic grooves, and an electronic sound designed to leave an imprint.' }
];

const releases = [
  { title: 'THUVVAK', artist: 'Farsida', detail: 'A selected track reference from the O\'Flow curated set. Official release metadata and listening link to be added.' },
  { title: 'LAAV', artist: 'Farsida', detail: 'A selected track reference from the O\'Flow curated set. Official release metadata and listening link to be added.' },
  { title: 'MELLE PANJO', artist: 'Jarvie G', detail: 'A selected track reference from the O\'Flow curated set. Official release metadata and listening link to be added.' }
];

const artistGrid = document.querySelector('[data-artist-grid]');
const releaseGrid = document.querySelector('[data-release-grid]');

artistGrid.innerHTML = artists.map((artist, index) => `
  <article class="artist-card" data-letter="${artist.letter}">
    <div class="artist-card__top"><span>${String(index + 1).padStart(2, '0')} / Artist</span><span>O'Flow</span></div>
    <div class="artist-card__bottom">
      <div><h3>${artist.name}</h3><p class="artist-card__tag">${artist.tag}</p></div>
      <button class="artist-card__open" type="button" aria-label="Open ${artist.name} profile" data-artist="${artist.name}">↗</button>
    </div>
  </article>
`).join('');

releaseGrid.innerHTML = releases.map((release) => `
  <article class="release-card">
    <div class="release-card__art" role="img" aria-label="Illustrative placeholder artwork for ${release.title}"><span class="release-card__title">${release.title.replace(' ', '<br />')}</span></div>
    <h3>${release.title}</h3>
    <p>${release.artist}</p>
    <button class="release-card__button" type="button" aria-expanded="false">View catalogue note <span aria-hidden="true">＋</span></button>
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
  button.innerHTML = isOpen ? 'Hide catalogue note <span aria-hidden="true">−</span>' : 'View catalogue note <span aria-hidden="true">＋</span>';
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
