/* КП «Фонд Добрые дела» — генератор презентации (.pptx, 16:9)
   Источник: projects/Добрые дела/КП_Добрые_дела_текстовая_структура.md
   Запуск: node build_deck.js
*/
const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9'; // 10 x 5.625
pptx.author = 'Агентство «Социальные сети»';
pptx.title = 'КП — Фонд «Добрые дела»';
pptx.company = 'snetwork.io';

const C = {
  dark: '1B3A22',
  primary: '2C5F2D',
  gold: 'E9B44C',
  paper: 'F7F4EC',
  card: 'EEF3E8',
  cardGold: 'F8F0DC',
  text: '22301F',
  muted: '5F6B5F',
  white: 'FFFFFF',
  line: 'D9E2D5',
  lightOnDark: 'DCE8DC',
};
const TITLE = 'Cambria';
const BODY = 'Calibri';
const W = 10, H = 5.625, M = 0.5;
const TOTAL = 11;

function bg(slide, color) { slide.background = { color }; }

function addShadow(obj) {
  return Object.assign({}, obj, { shadow: { type: 'outer', color: '1B3A22', blur: 7, offset: 2.5, angle: 90, opacity: 0.16 } });
}

function chip(slide, x, y, w, h, text, opts = {}) {
  const line = opts.line || C.gold;
  slide.addShape('roundRect', {
    x, y, w, h, rectRadius: h / 2,
    fill: opts.fill || { color: C.white, transparency: opts.transparency != null ? opts.transparency : 0 },
    line: { type: 'solid', color: line, width: 1 },
  });
  slide.addText(text, {
    x, y, w, h, fontFace: BODY, fontSize: opts.size || 11,
    color: opts.color || C.white, bold: !!opts.bold, align: 'center', valign: 'middle', margin: 0,
    charSpacing: opts.charSpacing || 0,
  });
}

function iconCircle(slide, x, y, d, sym, opts = {}) {
  slide.addShape('ellipse', { x, y, w: d, h: d, fill: { color: opts.bg || C.gold }, line: { type: 'none' } });
  slide.addText(sym, {
    x, y, w: d, h: d, fontFace: opts.fontFace || BODY, fontSize: opts.size || Math.round(d * 28),
    bold: true, color: opts.color || C.dark, align: 'center', valign: 'middle', margin: 0,
  });
}

function footer(slide, num) {
  slide.addText('Агентство «Социальные сети» · КП · Фонд «Добрые дела»', {
    x: M, y: H - 0.32, w: 6, h: 0.24, fontFace: BODY, fontSize: 8.5, color: C.muted, margin: 0,
  });
  slide.addText(String(num).padStart(2, '0') + ' / ' + TOTAL, {
    x: W - M - 1, y: H - 0.32, w: 1, h: 0.24, fontFace: BODY, fontSize: 8.5, color: C.muted, align: 'right', margin: 0,
  });
}

function header(slide, num, title, kicker) {
  slide.addShape('ellipse', { x: M, y: 0.5, w: 0.42, h: 0.42, fill: { color: C.primary }, line: { type: 'none' } });
  slide.addText(num, {
    x: M, y: 0.5, w: 0.42, h: 0.42, fontFace: BODY, fontSize: 14, bold: true,
    color: C.white, align: 'center', valign: 'middle', margin: 0,
  });
  slide.addText(title, {
    x: M + 0.62, y: 0.42, w: W - 2 * M - 0.62, h: 0.62, fontFace: TITLE, fontSize: 26,
    bold: true, color: C.text, margin: 0, valign: 'middle',
  });
  if (kicker) {
    slide.addText(kicker, {
      x: M + 0.62, y: 1.02, w: W - 2 * M - 0.62, h: 0.3, fontFace: BODY, fontSize: 11.5,
      color: C.muted, margin: 0,
    });
  }
}

function featureRow(slide, x, y, w, d, sym, lead, desc, circColor, symColor) {
  iconCircle(slide, x, y, d, sym, { bg: circColor || C.primary, color: symColor || C.white, size: Math.round(d * 26) });
  slide.addText(lead, {
    x: x + d + 0.18, y: y - 0.06, w: w - d - 0.18, h: 0.3, fontFace: BODY, fontSize: 14.5,
    bold: true, color: C.text, margin: 0,
  });
  slide.addText(desc, {
    x: x + d + 0.18, y: y + 0.26, w: w - d - 0.18, h: 0.42, fontFace: BODY, fontSize: 11.5,
    color: C.muted, margin: 0,
  });
}

/* ============ 1. Титульный ============ */
const s1 = pptx.addSlide();
bg(s1, C.dark);
s1.addShape('ellipse', { x: 7.8, y: -1.3, w: 3.4, h: 3.4, fill: { color: 'FFFFFF', transparency: 93 }, line: { type: 'none' } });
s1.addShape('ellipse', { x: 9.0, y: 0.1, w: 1.5, h: 1.5, fill: { color: C.gold, transparency: 78 }, line: { type: 'none' } });
s1.addShape('ellipse', { x: -1.2, y: 4.3, w: 2.4, h: 2.4, fill: { color: C.gold, transparency: 88 }, line: { type: 'none' } });

chip(s1, 0.6, 0.62, 3.35, 0.44, 'КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ', {
  fill: { color: 'FFFFFF', transparency: 90 }, line: C.gold, color: C.gold, size: 10.5, bold: true, charSpacing: 1.5,
});

s1.addText('Разработка сайта для\nблаготворительного фонда\n«Добрые дела»', {
  x: 0.6, y: 1.35, w: 7.6, h: 1.95, fontFace: TITLE, fontSize: 31, bold: true, color: C.white,
  margin: 0, lineSpacingMultiple: 1.05,
});

s1.addText('Два пути к результату: классический конструктор Тильда или Vibe-лендинг\nс ИИ-текстами — плюс виджет приёма пожертвований прямо на сайте', {
  x: 0.6, y: 3.18, w: 7.3, h: 0.8, fontFace: BODY, fontSize: 13.5, color: C.lightOnDark, margin: 0, lineSpacingMultiple: 1.1,
});

chip(s1, 0.6, 4.2, 1.45, 0.42, 'Тильда', { fill: { color: 'FFFFFF', transparency: 88 }, line: C.gold, color: C.white, size: 11 });
chip(s1, 2.17, 4.2, 3.0, 0.42, 'Vibe-лендинг с ИИ-текстами', { fill: { color: 'FFFFFF', transparency: 88 }, line: C.gold, color: C.white, size: 11 });
chip(s1, 5.29, 4.2, 2.55, 0.42, 'Виджет пожертвований', { fill: { color: 'FFFFFF', transparency: 88 }, line: C.gold, color: C.white, size: 11 });

s1.addText('Агентство «Социальные сети» · snetwork.io', {
  x: 0.6, y: 5.0, w: 4.8, h: 0.3, fontFace: BODY, fontSize: 12, bold: true, color: C.white, margin: 0,
});
s1.addText('2026', { x: 8.8, y: 5.0, w: 0.6, h: 0.3, fontFace: BODY, fontSize: 12, color: C.gold, align: 'right', margin: 0 });

/* ============ 2. Содержание ============ */
const s2 = pptx.addSlide();
bg(s2, C.white);
s2.addText('КП · ФОНД «ДОБРЫЕ ДЕЛА»', {
  x: M, y: 0.5, w: 6, h: 0.3, fontFace: BODY, fontSize: 11, bold: true, color: C.primary, charSpacing: 2, margin: 0,
});
s2.addText('Содержание', { x: M, y: 0.82, w: 8, h: 0.65, fontFace: TITLE, fontSize: 28, bold: true, color: C.text, margin: 0 });

const toc = [
  'Резюме предложения', 'Понимание задачи', 'Два варианта решения',
  'Виджет пожертвований', 'Смета и сроки', 'Эксплуатация: кто вносит изменения',
  'Релевантный опыт', 'Техническая поддержка', 'Контакты',
];
const tocCols = [
  { x: 0.7, items: [0, 1, 2, 3, 4] },
  { x: 5.35, items: [5, 6, 7, 8] },
];
const tocY0 = 1.85, tocStep = 0.62;
for (const col of tocCols) {
  col.items.forEach((idx, k) => {
    const cy = tocY0 + k * tocStep;
    iconCircle(s2, col.x, cy, 0.36, String(idx + 1).padStart(2, '0'), { bg: C.primary, color: C.white, size: 10 });
    s2.addText(toc[idx], {
      x: col.x + 0.5, y: cy - 0.03, w: 4.1, h: 0.42, fontFace: BODY, fontSize: 13.5, color: C.text, valign: 'middle', margin: 0,
    });
  });
}
footer(s2, 2);

/* ============ 3. 01 Резюме предложения ============ */
const s3 = pptx.addSlide();
bg(s3, C.white);
header(s3, '01', 'Резюме предложения', 'Самое важное — на одном слайде');

const resCards = [
  { n: '1', stat: '2 пути', cap: 'Быстрый и бюджетный Vibe-лендинг\nили классический конструктор' },
  { n: '2', stat: 'от 1 недели', cap: 'Срок готового сайта\nпо любому из вариантов' },
  { n: '3', stat: 'Виджет', cap: 'Приём пожертвований\nпрямо на сайте' },
  { n: '4', stat: '30–100 тыс. ₽', cap: 'Диапазон стоимости\nв зависимости от варианта' },
];
const cw = 2.12, cg = 0.17, cX0 = M, cY = 1.6, cH = 2.55;
resCards.forEach((card, i) => {
  const cx = cX0 + i * (cw + cg);
  s3.addShape('roundRect', addShadow({ x: cx, y: cY, w: cw, h: cH, rectRadius: 0.14, fill: { color: C.card }, line: { type: 'none' } }));
  iconCircle(s3, cx + cw / 2 - 0.28, cY + 0.32, 0.56, card.n, { bg: C.gold, color: C.dark, size: 17 });
  s3.addText(card.stat, {
    x: cx + 0.12, y: cY + 1.05, w: cw - 0.24, h: 0.62, fontFace: BODY, fontSize: 19, bold: true,
    color: C.primary, align: 'center', valign: 'middle', margin: 0,
  });
  s3.addText(card.cap, {
    x: cx + 0.14, y: cY + 1.72, w: cw - 0.28, h: 0.7, fontFace: BODY, fontSize: 11.5,
    color: C.muted, align: 'center', margin: 0, lineSpacingMultiple: 1.05,
  });
});
s3.addShape('roundRect', { x: M, y: 4.35, w: 9.0, h: 0.7, rectRadius: 0.35, fill: { color: C.cardGold }, line: { type: 'none' } });
iconCircle(s3, 0.78, 4.52, 0.36, '♥', { bg: C.gold, color: C.dark, size: 13 });
s3.addText('Стоимость виджета пожертвований считается отдельно от сайта и определяется по итогам брифинга', {
  x: 1.3, y: 4.35, w: 8.0, h: 0.7, fontFace: BODY, fontSize: 12.5, color: C.text, valign: 'middle', margin: 0,
});
footer(s3, 3);

/* ============ 4. 02 Понимание задачи ============ */
const s4 = pptx.addSlide();
bg(s4, C.white);
header(s4, '02', 'Понимание задачи', 'Современный сайт, который работает на миссию фонда');

s4.addShape('roundRect', addShadow({ x: M, y: 1.75, w: 4.35, h: 2.75, rectRadius: 0.14, fill: { color: C.paper }, line: { type: 'none' } }));
s4.addText('Фонду нужен современный сайт, который:', {
  x: 0.85, y: 2.05, w: 3.7, h: 0.6, fontFace: BODY, fontSize: 15, bold: true, color: C.text, margin: 0, lineSpacingMultiple: 1.1,
});
s4.addText('• рассказывает о миссии и проектах фонда\n• вызывает доверие у потенциальных доноров\n• даёт возможность сделать пожертвование в один клик\n• не требует навыков программирования для обновления контента', {
  x: 0.85, y: 2.62, w: 3.75, h: 1.7, fontFace: BODY, fontSize: 12, color: C.text, margin: 0, lineSpacingMultiple: 1.22,
});
s4.addText('Формулировка нейтральная — уточним по брифу/ТЗ фонда.', {
  x: 0.85, y: 4.12, w: 3.7, h: 0.3, fontFace: BODY, fontSize: 10, italic: true, color: C.muted, margin: 0,
});

const needRows = [
  { lead: 'О миссии и проектах', desc: 'История фонда, направления помощи, истории подопечных' },
  { lead: 'Доверие у доноров', desc: 'Прозрачность, отчётность, понятные реквизиты' },
  { lead: 'Пожертвование в один клик', desc: 'Виджет приёма платежей прямо на сайте' },
  { lead: 'Без навыков программирования', desc: 'Команда фонда сама обновляет контент' },
];
const ny0 = 1.75, nStep = 0.86;
needRows.forEach((r, i) => {
  const ry = ny0 + i * nStep;
  featureRow(s4, 5.35, ry + 0.08, 4.15, 0.42, '✓', r.lead, r.desc, C.primary, C.white);
});
footer(s4, 4);

/* ============ 5. 03 Два варианта решения ============ */
const s5 = pptx.addSlide();
bg(s5, C.white);
header(s5, '03', 'Два варианта решения', 'Сравнение по срокам, стоимости и эксплуатации');

const tBorder = { type: 'solid', color: C.line, pt: 1 };
const thCell = { fontFace: BODY, fontSize: 13, bold: true, color: C.white, fill: { color: C.primary }, align: 'center', valign: 'middle', margin: 4, border: tBorder };
const tLab = { fontFace: BODY, fontSize: 12.5, bold: true, color: C.text, fill: { color: C.card }, align: 'left', valign: 'middle', margin: 4, border: tBorder };
const tDat = { fontFace: BODY, fontSize: 12.5, color: C.text, align: 'center', valign: 'middle', margin: 4, border: tBorder };

const optRows = [
  [
    { text: 'Параметр', options: tLab },
    { text: 'Vibe-лендинг\nбез админки', options: thCell },
    { text: 'Vibe-лендинг\nс админкой', options: thCell },
    { text: 'Тильда', options: thCell },
  ],
  [
    { text: 'Срок', options: tLab },
    { text: 'до 1 недели', options: tDat },
    { text: 'до 3 недель', options: tDat },
    { text: 'до 3 недель', options: tDat },
  ],
  [
    { text: 'Стоимость', options: tLab },
    { text: 'до 30 000 ₽', options: tDat },
    { text: 'до 100 000 ₽', options: tDat },
    { text: 'до 100 000 ₽', options: tDat },
  ],
  [
    { text: 'Правки после сдачи', options: tLab },
    { text: 'только через агентство', options: tDat },
    { text: 'команда фонда — через админку', options: tDat },
    { text: 'команда фонда — через Тильду', options: tDat },
  ],
];
s5.addTable(optRows, {
  x: M, y: 1.62, w: 9.0, colW: [1.95, 2.35, 2.35, 2.35], rowH: [0.6, 0.55, 0.55, 0.68],
  fontFace: BODY, valign: 'middle', margin: 4,
});
s5.addText('Тексты и вёрстку для Vibe-лендинга генерирует ИИ под задачу фонда — включено в стоимость.', {
  x: M, y: 4.25, w: 9.0, h: 0.35, fontFace: BODY, fontSize: 11, italic: true, color: C.muted, margin: 0,
});
footer(s5, 5);

/* ============ 6. 04 Виджет ============ */
const s6 = pptx.addSlide();
bg(s6, C.white);
header(s6, '04', 'Виджет «Сделать пожертвование»', 'Приём пожертвований на любом варианте сайта');

const wdgRows = [
  { lead: 'Любой вариант сайта', desc: 'Устанавливается и на Тильду, и на Vibe-лендинг' },
  { lead: 'Отдельная строка сметы', desc: 'Стоимость виджета считается отдельно от сайта' },
  { lead: 'Цена — по итогам брифинга', desc: 'Зависит от способа приёма платежей и интеграций фонда' },
];
const wy0 = 1.8, wStep = 0.95;
wdgRows.forEach((r, i) => {
  const ry = wy0 + i * wStep;
  featureRow(s6, 0.55, ry, 5.3, 0.44, '♥', r.lead, r.desc, C.gold, C.dark);
});

// мок-виджет
s6.addShape('roundRect', addShadow({ x: 6.55, y: 1.62, w: 2.9, h: 2.9, rectRadius: 0.16, fill: { color: C.dark }, line: { type: 'none' } }));
iconCircle(s6, 6.55 + 1.45 - 0.35, 1.95, 0.7, '♥', { bg: C.gold, color: C.dark, size: 20 });
s6.addText('Сделать\nпожертвование', {
  x: 6.75, y: 2.72, w: 2.5, h: 0.75, fontFace: TITLE, fontSize: 15, bold: true, color: C.white, align: 'center', margin: 0, lineSpacingMultiple: 1.0,
});
s6.addShape('roundRect', { x: 6.9, y: 3.55, w: 2.2, h: 0.5, rectRadius: 0.25, fill: { color: C.gold }, line: { type: 'none' } });
s6.addText('Пожертвовать', {
  x: 6.9, y: 3.55, w: 2.2, h: 0.5, fontFace: BODY, fontSize: 13, bold: true, color: C.dark, align: 'center', valign: 'middle', margin: 0,
});
s6.addText('Любая сумма · безопасно', {
  x: 6.75, y: 4.15, w: 2.5, h: 0.3, fontFace: BODY, fontSize: 10, color: C.lightOnDark, align: 'center', margin: 0,
});
s6.addText('Примерный вид виджета на сайте', {
  x: 6.55, y: 4.62, w: 2.9, h: 0.25, fontFace: BODY, fontSize: 9.5, italic: true, color: C.muted, align: 'center', margin: 0,
});
footer(s6, 6);

/* ============ 7. 05 Смета и сроки ============ */
const s7 = pptx.addSlide();
bg(s7, C.white);
header(s7, '05', 'Смета и сроки', 'Сводная таблица по всем вариантам');

const sumRows = [
  [
    { text: 'Вариант', options: tLab },
    { text: 'Срок', options: thCell },
    { text: 'Стоимость сайта', options: thCell },
    { text: 'Стоимость с виджетом', options: thCell },
  ],
  [
    { text: 'Vibe-лендинг без админки', options: tLab },
    { text: 'до 1 недели', options: tDat },
    { text: 'до 30 000 ₽', options: tDat },
    { text: 'до 30 000 ₽ + виджет (по брифингу)', options: tDat },
  ],
  [
    { text: 'Vibe-лендинг с админкой', options: tLab },
    { text: 'до 3 недель', options: tDat },
    { text: 'до 100 000 ₽', options: tDat },
    { text: 'до 100 000 ₽ + виджет (по брифингу)', options: tDat },
  ],
  [
    { text: 'Тильда', options: tLab },
    { text: 'до 3 недель', options: tDat },
    { text: 'до 100 000 ₽', options: tDat },
    { text: 'до 100 000 ₽ + виджет (по брифингу)', options: tDat },
  ],
];
s7.addTable(sumRows, {
  x: M, y: 1.6, w: 9.0, colW: [2.3, 1.5, 1.7, 3.5], rowH: [0.5, 0.6, 0.6, 0.6],
  fontFace: BODY, valign: 'middle', margin: 4,
});
s7.addShape('roundRect', addShadow({ x: M, y: 4.2, w: 9.0, h: 0.78, rectRadius: 0.14, fill: { color: C.card }, line: { type: 'none' } }));
iconCircle(s7, 0.82, 4.38, 0.42, '✓', { bg: C.primary, color: C.white, size: 13 });
s7.addText('Техническая поддержка после сдачи проекта', {
  x: 1.45, y: 4.2, w: 5.2, h: 0.78, fontFace: BODY, fontSize: 13.5, bold: true, color: C.text, valign: 'middle', margin: 0,
});
s7.addText('3 500 ₽ / час', {
  x: 6.6, y: 4.2, w: 2.7, h: 0.78, fontFace: BODY, fontSize: 16, bold: true, color: C.primary, align: 'right', valign: 'middle', margin: 0,
});
footer(s7, 7);

/* ============ 8. 06 Эксплуатация ============ */
const s8 = pptx.addSlide();
bg(s8, C.white);
header(s8, '06', 'Эксплуатация: кто вносит изменения', 'Три варианта — три модели управления контентом');

const ops = [
  {
    num: '1', t: 'Тильда', badge: 'самостоятельно', badgeBg: C.primary,
    desc: 'Команда фонда сама меняет тексты, фото и блоки в любой момент — без обращения к разработчику.', tint: C.card,
  },
  {
    num: '2', t: 'Vibe-лендинг\nбез админки', badge: 'через агентство', badgeBg: C.muted,
    desc: 'Быстрее и дешевле всего, но любые правки после запуска вносятся только через нашу команду.', tint: C.paper,
  },
  {
    num: '3', t: 'Vibe-лендинг\nс админкой', badge: 'своя админка', badgeBg: C.gold,
    desc: 'Золотая середина: простая панель управления контентом, но разработка дороже и дольше, чем базовый вариант.', tint: C.cardGold,
  },
];
const ow = 2.87, og = 0.19, oX0 = M, oY = 1.62, oH = 2.95;
ops.forEach((op, i) => {
  const ox = oX0 + i * (ow + og);
  s8.addShape('roundRect', addShadow({ x: ox, y: oY, w: ow, h: oH, rectRadius: 0.14, fill: { color: op.tint }, line: { type: 'none' } }));
  iconCircle(s8, ox + 0.28, oY + 0.28, 0.5, op.num, { bg: C.gold, color: C.dark, size: 14 });
  s8.addText(op.t, {
    x: ox + 0.28, y: oY + 0.95, w: ow - 0.56, h: 0.62, fontFace: BODY, fontSize: 14.5, bold: true,
    color: C.text, margin: 0, lineSpacingMultiple: 1.0,
  });
  s8.addShape('roundRect', { x: ox + 0.28, y: oY + 1.62, w: 1.75, h: 0.36, rectRadius: 0.18, fill: { color: op.badgeBg }, line: { type: 'none' } });
  s8.addText(op.badge, {
    x: ox + 0.28, y: oY + 1.62, w: 1.75, h: 0.36, fontFace: BODY, fontSize: 10, bold: true,
    color: op.badgeBg === C.gold ? C.dark : C.white, align: 'center', valign: 'middle', margin: 0,
  });
  s8.addText(op.desc, {
    x: ox + 0.28, y: oY + 2.12, w: ow - 0.56, h: 0.75, fontFace: BODY, fontSize: 11.5, color: C.text, margin: 0, lineSpacingMultiple: 1.12,
  });
});
footer(s8, 8);

/* ============ 9. 07 Релевантный опыт ============ */
const s9 = pptx.addSlide();
bg(s9, C.white);
header(s9, '07', 'Релевантный опыт', 'Не только коммерческие — работали с имиджевыми и социально значимыми сайтами');

const cases = [
  { name: 'Атоммедиа (Росатом)', desc: 'Личный кабинет журналиста: персональная лента, видеотрансляции, авторассылка пресс-релизов, ИИ-адаптация текстов', tag: 'atommedia.online', link: true },
  { name: 'Интер РАО', desc: 'Корпоративный сайт группы (300 000+ посещений), сайт-сторителлинг, спортплатформа, интеллектуальная игра и портал конкурсов', tag: '5 проектов', link: false },
  { name: 'Недвижимость (NDA)', desc: 'Сайт с ИИ-ассистентом и умным поиском: +20% к конверсии за 2 месяца, 500+ диалогов, ответы клиентам 24/7', tag: 'NDA', link: false },
  { name: 'КСК — Калужская сбытовая компания', desc: 'Корпоративный сайт, портал сотрудников и личные кабинеты — четыре проекта в долгосрочном сотрудничестве', tag: '4 проекта', link: false },
  { name: 'OVAL', desc: 'Имиджевый образовательный портал: 3D-сцены с гироскопом, продажа билетов и эквайринг, мультиязычность RU/EN', tag: 'oval.olympicuniversity.ru', link: true },
  { name: 'АГК', desc: 'Сайт-сторителлинг «Энергия из отходов»: наглядная подача сложного технологического процесса', tag: 'w2e.ru/process', link: true },
];
const kw = 2.87, kg = 0.19, kX0 = M, kH = 1.62, kY0 = 1.58, kY1 = 3.36;
cases.forEach((c, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const kx = kX0 + col * (kw + kg);
  const ky = row === 0 ? kY0 : kY1;
  s9.addShape('roundRect', addShadow({ x: kx, y: ky, w: kw, h: kH, rectRadius: 0.12, fill: { color: C.paper }, line: { type: 'none' } }));
  iconCircle(s9, kx + 0.2, ky + 0.18, 0.3, String(i + 1), { bg: C.gold, color: C.dark, size: 9 });
  s9.addText(c.name, {
    x: kx + 0.2, y: ky + 0.56, w: kw - 0.4, h: 0.26, fontFace: BODY, fontSize: 12.5, bold: true, color: C.text, margin: 0,
  });
  s9.addText(c.desc, {
    x: kx + 0.2, y: ky + 0.84, w: kw - 0.4, h: 0.62, fontFace: BODY, fontSize: 9.8, color: C.muted, margin: 0, lineSpacingMultiple: 1.05,
  });
  s9.addText(c.tag, {
    x: kx + 0.2, y: ky + kH - 0.3, w: kw - 0.4, h: 0.22, fontFace: BODY, fontSize: 9.5, bold: true,
    color: c.link ? C.primary : C.muted, margin: 0,
  });
});
footer(s9, 9);

/* ============ 10. 08 Техническая поддержка ============ */
const s10 = pptx.addSlide();
bg(s10, C.white);
header(s10, '08', 'Техническая поддержка', 'Остаёмся на связи после сдачи проекта');

s10.addShape('roundRect', addShadow({ x: M, y: 1.75, w: 3.7, h: 2.5, rectRadius: 0.14, fill: { color: C.dark }, line: { type: 'none' } }));
s10.addText('3 500 ₽', {
  x: 0.85, y: 2.15, w: 3.0, h: 0.75, fontFace: TITLE, fontSize: 40, bold: true, color: C.gold, margin: 0,
});
s10.addText('/ час', {
  x: 0.9, y: 2.92, w: 2.9, h: 0.35, fontFace: BODY, fontSize: 15, bold: true, color: C.lightOnDark, margin: 0,
});
s10.addText('Поддержка и доработки после сдачи проекта', {
  x: 0.85, y: 3.42, w: 3.1, h: 0.6, fontFace: BODY, fontSize: 11.5, color: C.lightOnDark, margin: 0, lineSpacingMultiple: 1.1,
});
const supRows = [
  { lead: 'Правки после запуска', desc: 'Быстрые изменения контента и доработки силами агентства' },
  { lead: 'Консультации команды фонда', desc: 'Помогаем работать с сайтом и обновлять контент' },
];
const sy0 = 1.85, sStep = 1.05;
supRows.forEach((r, i) => {
  featureRow(s10, 4.9, sy0 + i * sStep, 4.6, 0.44, '✓', r.lead, r.desc, C.primary, C.white);
});
s10.addText('Условия SLA и гарантий обсуждаем отдельно — на брифинге.', {
  x: 4.9, y: 4.15, w: 4.6, h: 0.3, fontFace: BODY, fontSize: 10.5, italic: true, color: C.muted, margin: 0,
});
footer(s10, 10);

/* ============ 11. 09 Контакты ============ */
const s11 = pptx.addSlide();
bg(s11, C.dark);
s11.addShape('ellipse', { x: 7.9, y: -1.2, w: 3.2, h: 3.2, fill: { color: 'FFFFFF', transparency: 93 }, line: { type: 'none' } });
s11.addShape('ellipse', { x: -1.0, y: 4.4, w: 2.3, h: 2.3, fill: { color: C.gold, transparency: 88 }, line: { type: 'none' } });
iconCircle(s11, 0.8, 0.9, 0.85, '♥', { bg: C.gold, color: C.dark, size: 24 });
s11.addText('Готовы обсудить детали', {
  x: 0.8, y: 2.0, w: 8.2, h: 0.75, fontFace: TITLE, fontSize: 30, bold: true, color: C.white, margin: 0,
});
s11.addText('Проведём брифинг по виджету пожертвований и запустим проект.', {
  x: 0.8, y: 2.78, w: 7.5, h: 0.4, fontFace: BODY, fontSize: 14, color: C.lightOnDark, margin: 0,
});
s11.addShape('roundRect', addShadow({ x: 0.8, y: 3.45, w: 5.1, h: 1.55, rectRadius: 0.14, fill: { color: C.white }, line: { type: 'none' } }));
s11.addText('Екатерина Миличихина', {
  x: 1.1, y: 3.65, w: 4.5, h: 0.35, fontFace: BODY, fontSize: 15.5, bold: true, color: C.text, margin: 0,
});
const contacts = [
  { l: 'ПОЧТА', v: 'info@snetwork.io' },
  { l: 'ТЕЛЕФОН', v: '+7 (495) 247-50-54' },
  { l: 'САЙТ', v: 'snetwork.io' },
];
contacts.forEach((c, i) => {
  const cy = 4.08 + i * 0.31;
  s11.addText(c.l, { x: 1.1, y: cy, w: 1.15, h: 0.24, fontFace: BODY, fontSize: 8.5, bold: true, color: C.primary, charSpacing: 1, margin: 0, valign: 'middle' });
  s11.addText(c.v, { x: 2.3, y: cy, w: 3.4, h: 0.24, fontFace: BODY, fontSize: 12, color: C.text, margin: 0, valign: 'middle' });
});
s11.addText('Агентство «Социальные сети» · 2026', {
  x: 0.8, y: 5.15, w: 4.5, h: 0.3, fontFace: BODY, fontSize: 11, color: C.white, margin: 0,
});

/* ============ Сохранение ============ */
pptx.writeFile({ fileName: 'КП_Добрые_дела.pptx' })
  .then(() => { console.log('OK: КП_Добрые_дела.pptx создан'); })
  .catch((e) => { console.error('ERR', e); process.exit(1); });
