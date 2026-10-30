import { readFile } from 'node:fs/promises';
import { strict as assert } from 'node:assert';

const files = ['index.html', 'styles.css', 'script.js', 'contact.php', 'favicon.svg', 'og-poster.svg', 'robots.txt', 'sitemap.xml'];
const contents = Object.fromEntries(await Promise.all(files.map(async (file) => [file, await readFile(file, 'utf8')])));

assert.match(contents['index.html'], /<main id="content">/);
assert.doesNotMatch(contents['index.html'], /data-artist-grid|id="artists"|id="farsida"|data-profile-dialog/);
assert.match(contents['index.html'], /data-inquiry-form/);
assert.match(contents['index.html'], /action="contact\.php"/);
assert.match(contents['index.html'], /hello@ochayoli\.in/);
assert.match(contents['index.html'], /Six artists, six directions/);
assert.match(contents['index.html'], /application\/ld\+json/);
assert.match(contents['script.js'], /THUVVAK/);
assert.match(contents['script.js'], /fetch\(inquiryForm\.action/);
assert.doesNotMatch(contents['script.js'], /showModal|data-artist/);
assert.match(contents['contact.php'], /hello@ochayoli\.in/);
assert.match(contents['contact.php'], /FILTER_VALIDATE_EMAIL/);
assert.match(contents['styles.css'], /prefers-reduced-motion/);
assert.match(contents['styles.css'], /@media \(max-width: 780px\)/);
assert.match(contents['robots.txt'], /User-agent: \*/);
assert.match(contents['sitemap.xml'], /<urlset/);

console.log(`Smoke test passed: ${files.length} site files checked.`);
