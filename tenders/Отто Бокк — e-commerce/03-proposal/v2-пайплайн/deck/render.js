/* Рендер deck.html → PDF + PNG-скриншоты по слайдам + проверка переполнения */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const dir = __dirname;
  const htmlPath = path.join(dir, 'deck.html');
  const outDir = path.join(dir, 'shots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'));
  await page.waitForTimeout(400);

  const report = await page.evaluate(() => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    return slides.map((slide, i) => {
      const slideRect = slide.getBoundingClientRect();
      const footer = slide.querySelector('.footer, .title-footer');
      const footerTop = footer ? footer.getBoundingClientRect().top - slideRect.top : 720;
      const bodyEl = slide.querySelector('.body');
      const bodyClipped = bodyEl ? bodyEl.scrollHeight > bodyEl.clientHeight + 1 : false;
      let maxBottom = 0;
      let offender = null;
      slide.querySelectorAll('*').forEach((el) => {
        if (el.classList.contains('body')) return;
        if (el.classList.contains('footer') || el.classList.contains('title-footer')) return;
        if (el.closest('.footer') || el.closest('.title-footer')) return;
        if (el.classList.contains('blob') || el.closest('.blob')) return;
        const r = el.getBoundingClientRect();
        const bottom = r.bottom - slideRect.top;
        if (bottom > maxBottom) { maxBottom = bottom; offender = el.className || el.tagName; }
      });
      return {
        index: i + 1,
        footerTop: Math.round(footerTop),
        maxBottom: Math.round(maxBottom),
        bodyClipped,
        overflow: maxBottom > footerTop + 1 || bodyClipped,
        offender: String(offender).slice(0, 80),
      };
    });
  });

  console.log('=== Overflow report ===');
  let anyOverflow = false;
  for (const r of report) {
    const status = r.overflow ? 'OVERFLOW' : 'ok';
    if (r.overflow) anyOverflow = true;
    console.log(`slide ${String(r.index).padStart(2, '0')}: content bottom=${r.maxBottom}px, footer top=${r.footerTop}px -> ${status}${r.overflow ? ' (' + r.offender + ')' : ''}`);
  }
  fs.writeFileSync(path.join(dir, 'overflow-report.json'), JSON.stringify(report, null, 2));

  const slideHandles = await page.$$('.slide');
  for (let i = 0; i < slideHandles.length; i++) {
    await slideHandles[i].screenshot({ path: path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`) });
  }

  await page.pdf({
    path: path.join(dir, '..', 'КП_Ottobock_SNAgency_v2.pdf'),
    width: '1280px',
    height: '720px',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  await browser.close();
  console.log(anyOverflow ? '\n!! Есть переполнение — см. overflow-report.json' : '\nПереполнений не найдено.');
})();
