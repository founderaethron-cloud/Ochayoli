import { readFile } from 'node:fs/promises';
import { strict as assert } from 'node:assert';

const files = ['index.html', 'styles.css', 'script.js', 'favicon.svg', 'og-poster.svg', 'robots.txt', 'sitemap.xml'];
const contents = Object.fromEntries(await Promise.all(files.map(async (file) => [file, await readFile(file, 'utf8')])));

assert.match(contents['index.html'], /<main id="content">/);
assert.match(contents['index.html'], /data-artist-grid/);
assert.match(contents['index.html'], /data-inquiry-form/);
assert.match(contents['index.html'], /application\/ld\+json/);
assert.match(contents['script.js'], /Farsida/);
assert.match(contents['script.js'], /THUVVAK/);
assert.match(contents['script.js'], /showModal/);
assert.match(contents['styles.css'], /prefers-reduced-motion/);
assert.match(contents['styles.css'], /@media \(max-width: 780px\)/);
assert.match(contents['robots.txt'], /User-agent: \*/);
assert.match(contents['sitemap.xml'], /<urlset/);

console.log(`Smoke test passed: ${files.length} site files checked.`);
