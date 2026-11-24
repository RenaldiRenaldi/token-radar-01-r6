// Development only. The graded entry reads the committed capture assets.
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {pathToFileURL} from 'node:url';

const [preview, destination] = process.argv.slice(2);
if (!preview || !destination || !process.env.PLAYWRIGHT_MODULE) {
  throw Error('Set PLAYWRIGHT_MODULE and pass the preview directory and capture destination');
}
const playwright = await import(process.env.PLAYWRIGHT_MODULE);
const {chromium} = playwright.default ?? playwright;
const browser = await chromium.launch({executablePath: process.env.CHROME_PATH, args: ['--no-sandbox']});
await mkdir(destination, {recursive:true});
try {
  const width = Number(process.env.VIEWPORT_WIDTH ?? 1440);
  const height = Number(process.env.VIEWPORT_HEIGHT ?? 900);
  const page = await browser.newPage({viewport:{width, height}, deviceScaleFactor:1});
  page.setDefaultTimeout(12000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.route(/^https?:/, route => route.abort());
  await page.goto(pathToFileURL(resolve(preview, 'dashboard/index.html')).href);
  assert.match(await page.locator('#detail').innerText(), /MATCH/);
  const mismatch = await page.evaluate(() => window.SOUNDINGS.ledger.filter(r => recalc(r) !== r.implied_value_usd).length);
  assert.equal(mismatch, 0);
  const take = name => page.screenshot({path: join(destination, name + '.jpg'), type:'jpeg', quality:94, animations:'disabled'});
  await take('01-board');
  await page.locator('[data-view=validation]').click();
  assert.match(await page.locator('#extra').innerText(), /CONFORMAL PRICING|Priced prediction intervals/);
  await take('02-validation');
  await page.locator('[data-view=launch]').click();
  await page.locator('#scope').selectOption({label:'Watchlist · 40'});
  await page.locator('#sort').selectOption({label:'Farm net'});
  assert.equal(await page.locator('#rows tr').count(), 40);
  await take('03-watchlist');
  await page.locator('[data-view=portfolio]').click();
  const initial = await page.locator('#portfolio-results').innerText();
  await page.locator('[data-setting=budget]').fill('2500');
  assert.notEqual(await page.locator('#portfolio-results').innerText(), initial);
  await take('04-portfolio');
  await page.locator('[data-view=universe]').click();
  assert.equal(await page.locator('#rows tr').count(), 758);
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
