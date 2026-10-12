import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const directory = path.dirname(fileURLToPath(import.meta.url));
const target = new URL('./index.html', import.meta.url).href;
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await mkdir(path.join(directory, 'qa'), { recursive: true });

try {
  await page.goto(target);
  assert.equal(await page.locator('.slide').count(), 13);
  assert.equal(await page.locator('#progress button').count(), 13);
  for (const [width, height] of [[1920, 1080], [1366, 768], [390, 844]]) {
    await page.setViewportSize({ width, height });
    for (let slide = 1; slide <= 13; slide++) {
      await page.goto(`${target}#${slide}`);
      await page.locator('.slide:not([hidden]) img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
      assert.equal(await page.locator('.slide:not([hidden])').count(), 1);
      assert.equal(await page.locator('#counter').textContent(), `${slide} / 13`);
      const layout = await page.evaluate(() => {
        const current = document.querySelector('.slide:not([hidden])');
        const bounds = current.getBoundingClientRect();
        const footer = current.querySelector('footer').getBoundingClientRect();
        const overflow = [...current.querySelectorAll('h1, h2, h3, p, li, img, figcaption, .journey-caption, .context-band, .column-label, .model-note')].filter(element => {
          const box = element.getBoundingClientRect();
          return box.left < bounds.left - 1 || box.right > bounds.right + 1 || box.top < bounds.top - 1 || box.bottom > footer.top - 2;
        }).map(element => element.textContent || element.alt);
        return { overflow, horizontal: document.documentElement.scrollWidth > innerWidth, brokenImages: [...current.querySelectorAll('img')].some(image => !image.complete || image.naturalWidth === 0) };
      });
      assert.deepEqual(layout, { overflow: [], horizontal: false, brokenImages: false }, `Slide ${slide}, ${width} × ${height}`);
      if (width !== 390) await page.locator('#stage').screenshot({ path: path.join(directory, 'qa', `${width}-slide-${slide}.png`), animations: 'disabled' });
    }
  }
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto(`${target}#1`);
  assert.equal(await page.locator('#previous').isDisabled(), true);
  await page.keyboard.press('ArrowLeft');
  assert.equal(await page.locator('#counter').textContent(), '1 / 13');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Space');
  assert.equal(await page.locator('#counter').textContent(), '3 / 13');
  await page.keyboard.press('n');
  assert.equal(await page.locator('#notes').isVisible(), true);
  assert.match(await page.locator('#notes-timing').textContent(), /Presenter 2/);
  assert.match(await page.locator('#notes-script').textContent(), /All the screens here use fictional data/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#notes').isVisible(), false);
  await page.locator('.slide:not([hidden]) [data-screen="match"]').click();
  assert.equal(await page.locator('#screen-dialog').isVisible(), true);
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#counter').textContent(), '3 / 13');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#screen-dialog').isVisible(), false);
  await page.locator('#next').focus();
  await page.keyboard.press('Space');
  assert.equal(await page.locator('#counter').textContent(), '4 / 13');
  await page.keyboard.press('End');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#counter').textContent(), '13 / 13');
  assert.equal(await page.locator('#next').isDisabled(), true);
  await page.keyboard.press('Home');
  await page.keyboard.press('f');
  await page.waitForFunction(() => document.fullscreenElement !== null);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.fullscreenElement === null);
  await page.goto(`${target}#99`);
  assert.equal(await page.locator('#counter').textContent(), '1 / 13');
  assert.deepEqual(await page.evaluate(() => window.PITCH_NOTES.map(note => note.presenter)), ['Presenter 1', 'Presenter 1', ...Array(8).fill('Presenter 2'), ...Array(3).fill('Presenter 3')]);
  assert.equal(await page.evaluate(() => window.PITCH_NOTES.reduce((total, note) => total + note.target, 0)), 300);
  await page.context().setOffline(true);
  await page.reload();
  for (let slide = 1; slide <= 13; slide++) {
    await page.keyboard.press('End');
    await page.locator(`#progress button:nth-child(${slide})`).click();
    await page.locator('.slide:not([hidden]) img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    assert.equal(await page.locator('#counter').textContent(), `${slide} / 13`);
  }
  await page.context().setOffline(false);
  assert.deepEqual(errors, []);
  await page.goto(target);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: path.join(directory, 'E-JUAN-Pitch.pdf'), preferCSSPageSize: true, printBackground: true, tagged: true });
  const report = 'PASS: 13 slides at 1920x1080, 1366x768 and 390x844; no overflow, footer overlap or broken images; arrows, space, boundaries, hash, notes, screen zoom, fullscreen/escape and offline file rendering. Three-presenter structure preserved; rehearsal targets total 300 seconds. Zero runtime errors. PDF exported.\n';
  await writeFile(path.join(directory, 'qa', 'results.txt'), report);
  console.log(report);
} finally {
  await browser.close();
}
