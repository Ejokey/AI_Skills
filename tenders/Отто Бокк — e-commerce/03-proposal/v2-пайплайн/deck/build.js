/* КП «Отто Бокк — интернет-магазин» — генератор HTML-слайдов (SNAgency, 1280x720)
   Источник: 03-proposal/v2-пайплайн/КП_Ottobock_структура.md (21 слайд — добавлен слайд
   «Резюме предложения» по структуре референса «Напитки Вместе»)
   Запуск: node build.js  →  deck.html
*/
const fs = require('fs');
const path = require('path');

const IMG = JSON.parse(fs.readFileSync(path.join(__dirname, 'img.json'), 'utf8'));
const img = (name) => IMG[name];

const TOTAL = 21;
const ACCENT = '#2A2AE6';
const ACCENT_DARK = '#1B1BA8';
const INK = '#111233';
const MUTED = '#5F6480';
const CARD_BG = '#F4F5FD';
const CARD_BORDER = '#DFE1F7';
const LINE = '#E9EAF6';
const DARK_BG_FROM = '#0B0B2E';
const DARK_BG_TO = '#1E1EB4';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- shared building blocks ---------- */

function eyebrow(text, dark) {
  return `<div class="eyebrow ${dark ? 'eyebrow-dark' : ''}"><span class="dot"></span>${esc(text)}</div>`;
}

function heading(title, subtitle) {
  return `
    <h1 class="h1">${title}</h1>
    ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
  `;
}

function footer(num) {
  return `
    <div class="footer">
      <div>Коммерческое предложение · Интернет-магазин Ottobock · SNAgency</div>
      <div>${String(num).padStart(2, '0')} / ${TOTAL}</div>
    </div>
  `;
}

function logoCorner() {
  return `<div class="logo-mini"><img src="${img('logo_sn.png')}" alt="SNAgency" /></div>`;
}

function slideOpen(extraClass = '') {
  const isDark = /\bdark\b/.test(extraClass);
  return `<section class="slide ${extraClass}">${isDark ? '' : logoCorner()}`;
}
function slideClose() {
  return `</section>`;
}

function card(title, bodyHtml, opts = {}) {
  const cls = ['card'];
  if (opts.accent) cls.push('card-accent');
  return `
    <div class="${cls.join(' ')}" ${opts.style ? `style="${opts.style}"` : ''}>
      ${opts.kicker ? `<div class="card-kicker">${esc(opts.kicker)}</div>` : ''}
      <h3>${title}</h3>
      ${bodyHtml}
    </div>
  `;
}

/* Блок содержания слайда: занимает свободную высоту и центрируется по вертикали */
function body(html) {
  return `<div class="body">${html}</div>`;
}

function bullets(items) {
  return `<ul class="bul">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
}

/* Плитка портфолио: картинка сверху, подпись под ней (вёрстка по образцу КП «Воксис») */
function pfItem(file, title, desc, extraClass = '') {
  return `
    <div class="pf-item ${extraClass}">
      <img src="${img(file)}" alt="" />
      <div class="pf-cap"><b>${title}</b><span>${desc}</span></div>
    </div>
  `;
}

function pfNote(title, text, extraClass = '') {
  return `
    <div class="pf-note ${extraClass}">
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
  `;
}

/* Карточка обзорного слайда опыта: клиент — что делали (без картинки), образец — КП «Напитки Вместе» */
function tile(client, what, desc) {
  return `
    <div class="tile">
      <h4>${client}</h4>
      <div class="t-what">${what}</div>
      <div class="t-desc">${desc}</div>
    </div>
  `;
}

/* Крупный скриншот-референс + буллеты справа */
function caseBlock(file, items) {
  return `
    <div class="case">
      <img class="case-shot" src="${img(file)}" alt="" />
      <ul class="case-bul">${items.map((i) => `<li>${i}</li>`).join('')}</ul>
    </div>
  `;
}

/* Метрики плитками под кейсом */
function metrics(items) {
  return `
    <div class="metrics m${items.length}">
      ${items.map(([v, d]) => `<div class="metric"><b>${v}</b><span>${d}</span></div>`).join('')}
    </div>
  `;
}

function relevance(text) {
  return `<div class="callout"><b>Почему это релевантно.</b> ${text}</div>`;
}

/* ================= SLIDES ================= */

let slides = [];

/* ---- 1. Титул ---- */
slides.push(`
${slideOpen('dark')}
  <div class="blob blob-a"></div>
  <div class="blob blob-b"></div>
  <div class="logo-badge"><img src="${img('logo_sn.png')}" alt="SNAgency" /></div>
  <div class="title-eyebrow">${eyebrow('КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ · «ПОД КЛЮЧ» НА 1С-БИТРИКС', true)}</div>
  <h1 class="h1 h1-title">Разработка интернет-магазина<br/><span class="accent-text">Ottobock</span></h1>
  <p class="subtitle subtitle-dark" style="max-width:840px">Полноценный канал B2C-продаж продукции: каталог и карточка товара, оплата картой и электронным сертификатом, доставка, личный кабинет и сервис. Интеграция с 1С как с единственным источником данных.</p>
  <div class="title-footer">
    <div>
      <div class="tf-strong">ООО «Агентство «Социальные Сети»»</div>
      <div class="tf-muted">Лицин Владислав · +7 (495) 247-51-55 · info@snetwork.ru · snetwork.ru</div>
    </div>
    <div class="tf-right">
      <div class="tf-label">ДЛЯ</div>
      <div class="tf-strong">ОТТО БОКК СЕРВИС</div>
      <div class="tf-muted">07.08.2026</div>
    </div>
  </div>
${slideClose()}
`);

/* ---- 2. Оглавление ---- */
{
  const toc = [
    ['01', 'Резюме предложения', 'стр. 3'],
    ['02', 'Задача и что в ней нетипично', 'стр. 4–5'],
    ['03', 'Что делаем: функциональные блоки', 'стр. 6–8'],
    ['04', 'Интеграция с 1С', 'стр. 9'],
    ['05', 'Сроки и команда', 'стр. 10'],
    ['06', 'Стоимость и опция «ИИ-помощник»', 'стр. 11–12'],
    ['07', 'Релевантный опыт', 'стр. 13–20'],
    ['08', 'Гарантии и следующий шаг', 'стр. 21'],
  ];
  slides.push(`
${slideOpen()}
  ${eyebrow('ОГЛАВЛЕНИЕ')}
  ${heading('Что внутри предложения')}
  ${body(`  <div class="toc-grid">
    ${toc.map(([n, t, p]) => `
      <div class="toc-item">
        <div class="toc-num">${n}</div>
        <div class="toc-body"><div class="toc-title">${t}</div></div>
        <div class="toc-page">${p}</div>
      </div>
    `).join('')}
  </div>`)}
  ${footer(2)}
${slideClose()}
`);
}

/* ---- 3. Резюме предложения ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('РЕЗЮМЕ ПРЕДЛОЖЕНИЯ')}
  ${heading('Что мы предлагаем — коротко', 'Интернет-магазин «под ключ» на 1С-Битрикс с комплексной интеграцией и опцией ИИ-помощника')}
  ${body(`  <div class="cards cards-3 cards-compact" style="margin-top:22px">
    ${card('Интернет-магазин «под ключ»', `<p class="p">1С-Битрикс, редакция «Бизнес». Каталог, корзина, оплата, доставка, личный кабинет, админка.</p>`)}
    ${card('Комплексная интеграция с 1С', `<p class="p">9 маршрутов обмена. ERP с доработками, работаем со штатным функционалом дополнительных реквизитов.</p>`)}
    ${card('ИИ-помощник', `<p class="p">Опция. Цифровой консультант с умным поиском по каталогу, 1С и регламентам, с эскалацией на оператора.</p>`, { accent: true })}
    ${card('Срок', `<p class="p">3 месяца с момента утверждения ТЗ и предоставления макетов.</p>`)}
    ${card('Стоимость', `<p class="p">3 850 000 ₽ + НДС 22% (847 000 ₽)<br>Итого с НДС — 4 697 000 ₽</p>`)}
    ${card('Гарантия и поддержка', `<p class="p">3 месяца гарантии бесплатно. Дальше — от 50 000 ₽/мес или абонемент на часы.</p>`)}
  </div>`)}
  ${footer(3)}
${slideClose()}
`);
}

/* ---- 4. Задача ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ЗАДАЧА')}
  ${heading('Канал B2C-продаж, который доводит покупателя от выбора до сервиса', 'Автоматизировать заказ, оплату, доставку и сервис. Провести пользователя от выбора до покупки и поддержать после неё.')}
  ${body(`  <div class="cards cards-3" style="margin-top:22px">
    ${card('Продажа без менеджера там, где это возможно', `<p class="p">Типовые позиции покупаются самостоятельно: выбор, оплата, доставка. С менеджеров снимается рутина по заказам, которые не требуют участия человека.</p>`, { kicker: 'ЦЕЛЬ 01' })}
    ${card('Живое согласование там, где без него нельзя', `<p class="p">Импортные кресла-коляски, индивидуальный подбор, изделия с бланками. Такие позиции уходят на согласование с менеджером, а не в обычную оплату.</p>`, { kicker: 'ЦЕЛЬ 02' })}
    ${card('Один источник правды — 1С', `<p class="p">Номенклатура, цены, остатки, заказы и статусы живут в 1С. Сайт отображает и передаёт данные, но не заводит собственную параллельную реальность.</p>`, { kicker: 'ЦЕЛЬ 03' })}
  </div>
  <div class="callout callout-strong" style="margin-top:18px">
    <b>Новая платформа полностью заменяет действующий ottobock-mobility.ru.</b> Язык интерфейса — русский. Платформа разработки — 1С-Битрикс.
  </div>`)}
  ${footer(4)}
${slideClose()}
`);
}

/* ---- 5. Что в этом проекте нетипично ---- */
{
  const items = [
    ['Электронный сертификат', 'Оплата с проверкой кода ТСР/ТРУ. При несовпадении кода товара и сертификата оплата блокируется.'],
    ['Импортные кресла-коляски', 'Обязательное согласование с менеджером независимо от наличия товара на складе.'],
    ['Товары с бланками и индивидуальным подбором', 'Оплата блокируется до тех пор, пока заказ не согласован.'],
    ['Остатки без жёсткого резерва', 'Проверка наличия на этапе корзины и повторно перед оформлением заказа.'],
    ['Покупатель ≠ получатель', 'Оформление доступно без обязательной авторизации, данные получателя отделены от данных плательщика.'],
    ['Статусная модель 1С', '«На согласовании», «К выполнению», «Закрыт». Готовность к оплате приходит отдельным реквизитом.'],
  ];
  slides.push(`
${slideOpen()}
  ${eyebrow('ЧТО В ЭТОМ ПРОЕКТЕ НЕТИПИЧНО')}
  ${heading('Шесть мест, где обычный интернет-магазин не работает', 'Эти сценарии определяют архитектуру решения и заложены в оценку сроков и стоимости')}
  ${body(`  <div class="cards cards-3" style="margin-top:20px">
    ${items.map(([t, d]) => card(t, `<p class="p">${d}</p>`)).join('')}
  </div>`)}
  ${footer(5)}
${slideClose()}
`);
}

/* ---- 6. Витрина и покупка ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ФУНКЦИОНАЛЬНЫЕ БЛОКИ · 1 ИЗ 3')}
  ${heading('Витрина и покупка')}
  ${body(`  <div class="cards cards-2" style="margin-top:22px">
    ${card('Каталог и карточка товара', bullets([
      'Сложная система характеристик и торговых предложений (SKU)',
      'Динамические сценарии действия: «в корзину» или «оставить заявку» — в зависимости от типа товара',
      'Глобальный подбор по коду ТСР с переходом сразу в нужный раздел каталога',
      'Фильтры, сортировки, сопутствующие товары, отзывы после модерации',
    ]))}
    ${card('Корзина и оформление заказа', bullets([
      'Оформление без обязательной авторизации',
      'Разделение данных покупателя и получателя',
      'Проверка остатков на этапе корзины',
      'Финальная проверка наличия перед созданием заказа',
      'Промокоды и расчёт итоговой суммы с учётом доставки',
    ]))}
  </div>
  <div class="callout" style="margin-top:18px">
    Тип товара определяет сценарий покупки. Часть позиций уходит в обычную корзину, часть — в заявку на согласование с менеджером. Логика едина для каталога, карточки и корзины.
  </div>`)}
  ${footer(6)}
${slideClose()}
`);
}

/* ---- 7. Деньги и логистика ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ФУНКЦИОНАЛЬНЫЕ БЛОКИ · 2 ИЗ 3')}
  ${heading('Деньги и логистика')}
  ${body(`  <div class="cards cards-2" style="margin-top:22px">
    ${card('Оплата', bullets([
      'Банковская карта и электронный сертификат через PayKeeper',
      'Валидация кода ТСР/ТРУ при оплате сертификатом',
      'Блокировка оплаты до согласования для товаров с бланками и индивидуальным подбором',
      'Фиксация факта оплаты и передача её в 1С',
    ]))}
    ${card('Доставка', bullets([
      'Тарифные таблицы, которые загружаются в административную панель',
      'API согласованных перевозчиков: Почта России, транспортные компании',
      'Расчёт стоимости доставки на сайте при оформлении заказа',
      'Трек-номер и статусы отправления при наличии данных от перевозчика',
    ]))}
  </div>
  <div class="callout" style="margin-top:18px">
    Способы оплаты и перечень перевозчиков настраиваются на стороне сайта. Тарифы обновляются загрузкой файла, без участия разработчика.
  </div>`)}
  ${footer(7)}
${slideClose()}
`);
}

/* ---- 8. После покупки и админка ---- */
{
  slides.push(`
${slideOpen('dense')}
  ${eyebrow('ФУНКЦИОНАЛЬНЫЕ БЛОКИ · 3 ИЗ 3')}
  ${heading('После покупки и административная часть')}
  ${body(`  <div class="cards cards-3" style="margin-top:18px">
    ${card('Личный кабинет', bullets([
      'Заказы и их статусы',
      'Покупки: оборудование с серийными номерами, гарантия, документы',
      'Избранное и промокоды',
      'Уведомления со счётчиком в шапке сайта',
      'Сервисные обращения и возвраты',
    ]))}
    ${card('Административная часть', bullets([
      'Управление контентом и баннерами',
      'Промокоды и тарифы доставки',
      'Модерация отзывов',
      'Логи интеграций с 1С и внешними сервисами',
      'Управление каталогом и типами товаров',
    ]))}
    ${card('SEO и аналитика', bullets([
      'Человекопонятные URL и редактируемые мета-теги',
      'Микроразметка Product, Article, FAQPage, Review',
      'Яндекс.Метрика и Google Tag Manager',
      'Карта 301-редиректов по списку URL от заказчика',
    ]))}
  </div>
  <div class="callout" style="margin-top:16px">
    Список URL для 301-редиректов передаёт заказчик. Мы переносим карту редиректов на новую платформу и проверяем её после запуска, чтобы позиции действующего сайта не потерялись.
  </div>`)}
  ${footer(8)}
${slideClose()}
`);
}

/* ---- 9. Интеграция с 1С ---- */
{
  const routes = [
    'Номенклатура',
    'Цены и остатки',
    'Характеристики товаров',
    'Заказы с сайта → 1С',
    'Статусы из 1С → сайт',
    'Заказы из 1С в личный кабинет',
    'Применённые промокоды',
    'Оплата и доставка',
    'Оборудование и возвраты',
  ];
  slides.push(`
${slideOpen('dense')}
  ${eyebrow('ИНТЕГРАЦИЯ С 1С')}
  ${heading('Комплексный обмен, а не только API на стороне сайта', 'В объём работ входит проектирование обмена, разработка REST API (JSON), совместное тестирование и помощь в настройке коннектора на стороне заказчика — до стабильной работы обмена.')}
  ${body(`  <div class="routes">
    ${routes.map((r, i) => `<div class="route"><span class="route-num">${String(i + 1).padStart(2, '0')}</span>${r}</div>`).join('')}
  </div>
  <div class="cards cards-3 cards-compact" style="margin-top:16px">
    ${card('Конфигурация', `<p class="p">1С:ERP с доработками. Признаки товаров формируются типовыми дополнительными реквизитами.</p>`)}
    ${card('Доработки 1С', `<p class="p">Доработок конфигурации не требуется. Работаем со штатным функционалом дополнительных реквизитов.</p>`)}
    ${card('Оборудование и сервис', `<p class="p">Серийные номера, гарантия и документы приходят из 1С и отображаются в личном кабинете покупателя.</p>`)}
  </div>`)}
  ${footer(9)}
${slideClose()}
`);
}

/* ---- 10. Сроки и команда ---- */
{
  const rows = [
    ['Анализ, проектирование архитектуры', '1 неделя'],
    ['Вёрстка и разработка функционала', '6 недель'],
    ['Интеграция с 1С и внешними сервисами', '3 недели'],
    ['Тестирование и отладка', '2 недели'],
    ['Приёмочные испытания, обучение, запуск', '1 неделя'],
  ];
  const team = [
    ['2 backend-разработчика', 'Функционал каталога, заказов, оплаты на 1С-Битрикс'],
    ['Frontend-разработчик', 'Вёрстка и адаптивность витрины и личного кабинета'],
    ['Интегратор', 'Обмен с 1С, платёжный шлюз, API перевозчиков'],
    ['Тестировщик', 'Функциональное и приёмочное тестирование, частичная занятость'],
    ['Проект-менеджер', 'Сроки, приёмка, единая точка коммуникации'],
  ];
  slides.push(`
${slideOpen('dense')}
  ${eyebrow('СРОКИ И КОМАНДА')}
  ${heading('3 месяца с момента утверждения ТЗ и предоставления макетов')}
  ${body(`  <div class="two-col">
    <table class="tbl">
      <thead><tr><th>Этап</th><th class="r">Длительность</th></tr></thead>
      <tbody>
        ${rows.map(([t, d]) => `<tr><td><b>${t}</b></td><td class="r b">${d}</td></tr>`).join('')}
        <tr class="tbl-total"><td><b>Итого до запуска</b></td><td class="r"><b>3 месяца</b></td></tr>
      </tbody>
    </table>
    <div class="team-list">
      ${team.map(([t, d]) => `<div class="team-item"><b>${t}</b><span>${d}</span></div>`).join('')}
    </div>
  </div>
  <div class="callout" style="margin-top:16px">
    Этапы частично идут параллельно: интеграция с 1С стартует до окончания разработки функционала, тестирование ведётся по мере готовности блоков.
  </div>`)}
  ${footer(10)}
${slideClose()}
`);
}

/* ---- 11. Стоимость ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('СТОИМОСТЬ')}
  ${heading('Единая цена «под ключ»')}
  ${body(`  <div class="price-row">
    <div class="price-box">
      <div class="price-label">Стоимость работ</div>
      <div class="price-main">3 850 000 ₽</div>
      <div class="price-sub">НДС 22% — 847 000 ₽</div>
      <div class="price-total">Итого с НДС — 4 697 000 ₽</div>
    </div>
    ${card('Что входит в стоимость', bullets([
      'Разработка всего функционала по техническому заданию, все разделы',
      'Лицензия «1С-Битрикс: Управление сайтом», редакция «Бизнес» — 77 200 ₽',
      'Настройка инфраструктуры: облачный хостинг, ежедневные бэкапы, мониторинг доступности и критических ошибок',
      '3 месяца гарантийной поддержки',
      'Документация и обучение сотрудников заказчика',
    ]), { accent: true, style: 'flex:1' })}
  </div>
  <div class="callout" style="margin-top:18px">
    <b>Фиксированная цена, без скрытых платежей.</b> Действительна при неизменности технического задания. НДС начисляется сверху.
  </div>`)}
  ${footer(11)}
${slideClose()}
`);
}

/* ---- 12. Опция «ИИ-помощник» ---- */
{
  slides.push(`
${slideOpen('dense')}
  ${eyebrow('ОПЦИЯ · ИИ-ПОМОЩНИК')}
  ${heading('Цифровой консультант в магазине — опция +650 000 ₽', 'НДС 22% — 143 000 ₽. Итого по опции — 793 000 ₽ с НДС.')}
  ${body(`  <div class="cards cards-3" style="margin-top:16px">
    ${card('Подбирает и объясняет', `<p class="p">Ведёт живой диалог, выясняет потребности и образ жизни покупателя, рекомендует и сравнивает модели простым языком.</p>`)}
    ${card('Помнит контекст', `<p class="p">Вернувшись через неделю с вопросом о доставке, пользователь не объясняет заново, какое изделие он выбрал.</p>`)}
    ${card('Работает на актуальных данных', `<p class="p">Индексирует каталог, карточки, статьи и инструкции, данные из 1С об остатках, ценах и статусах, регламенты по сертификатам.</p>`)}
    ${card('Ведёт по процедурам', `<p class="p">Объясняет, как проверить электронный сертификат, оформить возврат и заказать сервисное обслуживание.</p>`)}
    ${card('Передаёт оператору', `<p class="p">Эскалирует по триггерам: сложный вопрос, негатив, запрос звонка. Оператор получает полную историю переписки.</p>`)}
    ${card('Не теряет обращение', `<p class="p">При передаче оператору автоматически создаётся лид в Битрикс24, обращение не остаётся без ответа.</p>`)}
  </div>
  <div class="price-strip">
    <div><span class="ps-label">Итого с ИИ-помощником</span><span class="ps-main">4 500 000 ₽</span></div>
    <div><span class="ps-label">НДС 22%</span><span class="ps-main">990 000 ₽</span></div>
    <div class="ps-accent"><span class="ps-label">Итого с НДС</span><span class="ps-main">5 490 000 ₽</span></div>
  </div>`)}
  ${footer(12)}
${slideClose()}
`);
}

/* ---- 13. Опыт · обзорный слайд-плитка (образец — стр. 15 КП «Напитки Вместе») ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('РЕЛЕВАНТНЫЙ ОПЫТ')}
  ${heading('Сложные проекты на 1С-Битрикс: каталоги, личные кабинеты, интеграции', 'Высоконагруженные порталы и личные кабинеты с оплатой, документами и обменом данными с учётными системами компании')}
  ${body(`  <div class="tiles">
    ${tile('КСК', '3 проекта', 'Корпоративный сайт и личные кабинеты потребителей с показаниями, начислениями и оплатой')}
    ${tile('Интер РАО', '5 проектов', 'Основной сайт, сторителлинг, спорт-платформа, игры, платформа конкурсов')}
    ${tile('Росатом', 'Атоммедиа', 'Личный кабинет журналиста с ИИ-адаптацией пресс-релизов, документами и уведомлениями')}
    ${tile('Недвижимость', 'Корпоративный сайт (NDA)', 'Сайт на 1С-Битрикс и ИИ-ассистент с умным поиском по базе знаний')}
    ${tile('Телеком', 'ИИ-сервис (NDA)', 'Генерация пресс-релизов по данным об объектах для 89 регионов')}
    ${tile('Металлургия', 'Внутренние сервисы (NDA)', 'Умный поиск по внутренним базам, маршрутизация почты, протоколы совещаний')}
  </div>
  <div class="pf-foot">Кейсы реализованы на <b>1С-Битрикс</b></div>`)}
  ${footer(13)}
${slideClose()}
`);
}

/* ---- 14. Опыт · КСК (только веб-проекты) ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · КАЛУЖСКАЯ СБЫТОВАЯ КОМПАНИЯ')}
  ${heading('Корпоративный сайт и два личных кабинета потребителей', 'Единый вход, расчёты, документы и оплата счетов · реализовано на 1С-Битрикс')}
  ${body(`  <div class="pf-grid pf-grid-wide">
    ${pfItem('ksk_main.png', 'Корпоративный сайт', 'Многостраничная структура, онлайн-сервисы, единый вход в личные кабинеты. <span class="lnk">kskkaluga.ru</span>')}
    ${pfItem('ksk_teplo.png', 'Личный кабинет: теплоэнергия', 'Показания, расчёты, документы по договору, оплата. <span class="lnk">teplo.kskkaluga.ru</span>')}
    ${pfItem('ksk_electro.png', 'Личный кабинет: электроэнергия', 'Начисления, история платежей, оплата счетов за электроэнергию. <span class="lnk">svet.kskkaluga.ru</span>')}
  </div>
  ${metrics([['1600+', 'посещений сайта в день'], ['65+', 'обращений в первую неделю запуска'], ['500+', 'уникальных дизайн-интерфейсов'], ['420+', 'новых страниц в структуре сайта']])}
  ${relevance('Витрина, личные кабинеты с разными ролями и оплата, завязанная на данные учётной системы, — та же архитектура, что нужна интернет-магазину с согласованием заказов.')}`)}
  ${footer(14)}
${slideClose()}
`);
}

/* ---- 15. Опыт · Интер РАО, 5 проектов (образец — стр. 18 референса) ---- */
{
  slides.push(`
${slideOpen('dense')}
  ${eyebrow('ОПЫТ · ИНТЕР РАО')}
  ${heading('Пять проектов для «Интер РАО»', 'Корпоративный сайт и внутренние высоконагруженные платформы · реализовано на 1С-Битрикс')}
  ${body(`  <div class="pf-grid pf-grid-6">
    ${pfItem('ir_main.png', 'Основной сайт компании', 'Корпоративный сайт группы. 300 000+ посещений.')}
    ${pfItem('ir_storitel.png', 'Сайт-сторителлинг', 'История компании в лицах и фактах: таймлайны по 20+ электростанциям.')}
    ${pfItem('ir_sport.jpg', 'Спорт-платформа', 'Корпоративные турниры, статистика игроков, билеты. 14 000+ пользователей.')}
    ${pfItem('ir_chgk.png', '«Что? Где? Когда?»', 'Интеллектуальные игры с рейтингом в реальном времени. 12 700+ участников.')}
    ${pfItem('ir_konkurs.png', 'Платформа конкурсов', 'Защита от накрутки голосов, личные кабинеты организаторов. 100 000+ пользователей, 5 000+ заявок.')}
    ${pfNote('5 проектов', 'Долгосрочное сотрудничество: от корпоративного сайта до высоконагруженных внутренних платформ с личными кабинетами и защитой от злоупотреблений.')}
  </div>`)}
  ${footer(15)}
${slideClose()}
`);
}

/* ---- 16. Опыт · Росатом / Атоммедиа ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · РОСАТОМ')}
  ${heading('Атоммедиа: личный кабинет журналиста', 'Медиа-платформа с ИИ-функционалом · atommedia.online · реализовано на 1С-Битрикс')}
  ${body(`  ${caseBlock('rosatom_1.png', [
    'Личный кабинет с персональной лентой новостей, подписками и уведомлениями',
    'ИИ-адаптация пресс-релизов под формат изданий, генерация подкастов, карточек и коротких видео',
    'Встроенные видео-трансляции мероприятий',
    'Автоматическая рассылка пресс-релизов по подписке',
    'Наградная система и статусы материалов в кабинете пользователя',
  ])}
  ${metrics([['×7', 'рост числа зарегистрированных пользователей'], ['5000+', 'ИИ-генераций материалов'], ['500+', 'наград получено пользователями']])}`)}
  ${footer(16)}
${slideClose()}
`);
}

/* ---- 17. Опыт · недвижимость (NDA) ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · НЕДВИЖИМОСТЬ (NDA)')}
  ${heading('Корпоративный сайт и ИИ-ассистент по базе знаний', 'Компания в сфере коммерческой недвижимости · название под NDA · реализовано на 1С-Битрикс')}
  ${body(`  ${caseBlock('nedv_ai.png', [
    'ИИ-ассистент с умным поиском по базе знаний клиента',
    'В базу знаний включён контент сайта, работающего на 1С-Битрикс',
    'Интерфейс в виде поисковой строки на главной странице',
    'Продолжение диалога в интерфейсе чата с ИИ-ассистентом',
  ])}
  ${metrics([['Умный поиск', 'ИИ-ассистент по базе знаний клиента'], ['1С-Битрикс', 'контент сайта включён в базу знаний'], ['Строка → чат', 'поиск на главной, диалог в чате']])}`)}
  ${footer(17)}
${slideClose()}
`);
}

/* ---- 18. Опыт · телеком (NDA) ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · ТЕЛЕКОММУНИКАЦИИ (NDA)')}
  ${heading('ИИ-генерация контента для 89 регионов', 'Телекоммуникационная компания · название под NDA · сервис в промышленной эксплуатации')}
  ${body(`  ${caseBlock('telecom_1.png', [
    'Сервис ИИ-генерации новостей на основании файла с перечнем адресов новых объектов',
    'Публикация материалов по 89 регионам присутствия компании',
    'Единый стиль и структура пресс-релизов без ручного редактирования',
    'Контроль качества и модерация перед публикацией',
  ])}
  ${metrics([['5 часов → 5 минут', 'подготовка 10 пресс-релизов по данным об объектах'], ['20 → 5', 'сотрудников на задаче, остальные переведены на другие направления'], ['−35%', 'ошибок по причине человеческого фактора']])}`)}
  ${footer(18)}
${slideClose()}
`);
}

/* ---- 19. Опыт · металлургия (NDA) ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · МЕТАЛЛУРГИЯ (NDA)')}
  ${heading('Умный поиск и автоматизация внутренних процессов', 'Металлургическая компания · название под NDA · сервисы в промышленной эксплуатации')}
  ${body(`  ${caseBlock('metal_1.png', [
    'Умный поиск по внутренним базам данных компании',
    'Фильтрация и маршрутизация входящей почты по подразделениям',
    'Автоматическое протоколирование совещаний',
    'Работа с закрытым контуром данных заказчика',
  ])}
  ${metrics([['×3', 'быстрее поиск нужных документов по сравнению с ручным'], ['×1,5', 'быстрее подготовка протоколов совещаний'], ['×1,5', 'выше корректность переадресации почты']])}`)}
  ${footer(19)}
${slideClose()}
`);
}

/* ---- 20. Опыт · имиджевые интерактивные порталы (OVAL, АГК) ---- */
{
  slides.push(`
${slideOpen('dense')}
  ${eyebrow('ОПЫТ · ИМИДЖЕВЫЕ ИНТЕРАКТИВНЫЕ ПОРТАЛЫ')}
  ${heading('Когда задача — подача и вовлечение, а не только функциональность', 'Два проекта, где сложный материал превращается в понятный маршрут пользователя · реализовано на 1С-Битрикс')}
  ${body(`  <div class="pf-grid pf-grid-2">
    ${pfItem('oval.png', 'Образовательный центр (NDA)', 'Имиджевый интерактивный сайт информационно-образовательного центра XXII Олимпийских зимних игр. 3D-сцены с мультимедийным контентом и управлением через гироскоп мобильного устройства, заказ билетов и интернет-эквайринг, мультиязычность.')}
    ${pfItem('agk.png', 'Генерирующая компания (NDA)', 'Имиджевый сайт-сторителлинг «Энергия из отходов»: превращение отходов в энергию. Наглядная подача сложного производственного процесса через визуальный сторителлинг, минималистичная структура и качественный визуальный ряд.')}
  </div>
  ${relevance('Оба проекта — про то, как объяснить пользователю сложный продукт и довести его до целевого действия. Для каталога технически сложных изделий это ровно та же задача.')}`)}
  ${footer(20)}
${slideClose()}
`);
}

/* ---- 21. Гарантии и следующий шаг ---- */
{
  slides.push(`
${slideOpen('dense')}
  ${eyebrow('ГАРАНТИИ И СЛЕДУЮЩИЙ ШАГ')}
  ${heading('Что происходит после запуска')}
  ${body(`  <div class="cards cards-3" style="margin-top:16px">
    ${card('Инфраструктура', `<p class="p">Облачный хостинг с резервированием, ежедневные бэкапы, отработанный сценарий восстановления.</p>`)}
    ${card('Мониторинг', `<p class="p">Доступность сайта и серверов, очереди обмена с 1С, прохождение оплат, критические ошибки интеграций.</p>`)}
    ${card('Гарантия', `<p class="p">3 месяца бесплатно. Устраняем ошибки, не связанные с изменением технического задания.</p>`)}
    ${card('Пост-гарантийная поддержка', `<p class="p">По отдельному договору. Базовый пакет — от 50 000 ₽ в месяц, либо абонемент на часы.</p>`)}
    ${card('Передача прав', `<p class="p">Полный исходный код, документация по администрированию и по интеграции с 1С.</p>`)}
    ${card('Сопровождение приёмки', `<p class="p">Проходим приёмочные испытания по критериям приёмки из технического задания.</p>`)}
  </div>
  <div class="contact-strip">
    <div class="cs-left">
      <div class="cs-title">Следующий шаг — согласовать детали интеграции и перейти к договору</div>
      <div class="cs-sub">Готовы обсудить открытые вопросы по обмену с 1С и зафиксировать план работ.</div>
    </div>
    <div class="cs-right">
      <div class="cs-org">ООО «Агентство «Социальные Сети»»</div>
      <div class="cs-contact">Лицин Владислав · +7 (495) 247-51-55 · info@snetwork.ru · snetwork.ru</div>
    </div>
  </div>`)}
  ${footer(21)}
${slideClose()}
`);
}

/* ================= CSS ================= */

const css = `
@page { margin: 0; size: 1280px 720px; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; }

.slide {
  width: 1280px; height: 720px; position: relative;
  background: #FFFFFF; color: ${INK};
  padding: 48px 64px 74px 64px;
  overflow: hidden;
  page-break-after: always;
  display: flex; flex-direction: column;
}
/* Содержание слайда: блоки идут сверху вниз с равным зазором,
   основной блок забирает остаток высоты — без «дыры» посередине и пустого низа */
.body { flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 18px; min-height: 0; padding-top: 16px; }
.body > * { margin-top: 0 !important; }
/* блоки, которые должны забирать остаток высоты слайда целиком */
.body > .toc-grid,
.body > .two-col,
.body > .routes,
.body > .price-row,
.body > .tiles { flex: 1 1 auto; }
/* карточки забирают половину свободной высоты: не жмутся к заголовку и не раздуваются */
.body > .cards { flex: 0.5 1 auto; }
/* «содержательный блок» (карточки / кейс-скриншот / цена), сразу за которым идёт ещё
   один блок (плашка-вывод, метрики, контактная полоса) — стоят вплотную друг к другу
   фиксированным зазором, остаток высоты уходит вниз слайда, а не разрывает контент
   посередине. Точечно — чтобы не задеть слайды, где после блока есть другие
   элементы-заполнители (плитки, таблицы) */
.body:has(> .cards + .callout),
.body:has(> .cards + .contact-strip),
.body:has(> .price-row + .callout),
.body:has(> .case + .metrics) { justify-content: flex-start; gap: 24px; }
.body:has(> .cards + .callout) > .cards,
.body:has(> .cards + .contact-strip) > .cards,
.body:has(> .price-row + .callout) > .price-row,
.body:has(> .case + .metrics) > .case { flex: 0 0 auto; }
/* единственный блок на слайде растягивается на всю свободную высоту */
.body > :only-child { flex: 1 1 auto; }
.body > .cards, .body > .tiles { grid-auto-rows: 1fr; }
/* Компактная сетка: высота карточек по контенту, остаток высоты уходит вниз слайда.
   Для слайдов с короткими текстами в карточках — иначе карточки растягиваются
   на всю высоту и внутри них зияет пустота. Правило идёт последним, чтобы перебить
   и :only-child, и grid-auto-rows: 1fr выше */
.body:has(> .cards-compact) { justify-content: flex-start; }
.body > .cards-compact { flex: 0 0 auto; grid-auto-rows: min-content; }
.slide.dark {
  background: linear-gradient(135deg, ${DARK_BG_FROM} 0%, ${DARK_BG_TO} 100%);
  color: #FFFFFF;
}
.blob { position: absolute; border-radius: 50%; filter: blur(2px); }
.blob-a { width: 620px; height: 620px; right: -180px; top: -220px; background: radial-gradient(circle, rgba(90,90,255,0.55) 0%, rgba(90,90,255,0) 70%); }
.blob-b { width: 420px; height: 420px; left: -160px; bottom: -180px; background: radial-gradient(circle, rgba(40,40,220,0.35) 0%, rgba(40,40,220,0) 70%); }

.logo-badge {
  position: absolute; left: 64px; top: 40px;
  background: #FFFFFF; border-radius: 10px; padding: 8px 14px;
  display: inline-flex; align-items: center;
}
.logo-badge img { height: 34px; width: auto; display: block; }
.title-eyebrow { margin-top: 128px; }

.logo-mini { position: absolute; right: 64px; top: 38px; z-index: 5; }
.logo-mini img { height: 32px; width: auto; display: block; }

.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: #ECEDFD; border: 1px solid ${CARD_BORDER}; color: ${ACCENT};
  border-radius: 20px; padding: 6px 14px; font-size: 11px; font-weight: 700;
  letter-spacing: 1.4px; text-transform: uppercase; margin-top: 0;
  align-self: flex-start;
}
.eyebrow-dark { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.26); color: #BFC2FF; }
.eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; display: inline-block; }

.h1 { font-size: 32px; font-weight: 800; line-height: 1.18; margin: 14px 0 6px; letter-spacing: -0.3px; }
.h1-title { font-size: 40px; margin-top: 20px; line-height: 1.25; }
.accent-text { color: ${ACCENT}; }
.slide.dark .accent-text { color: #9FA6FF; }

.subtitle { font-size: 14.5px; color: ${MUTED}; line-height: 1.5; max-width: 980px; margin: 0; }
.subtitle-dark { color: #C4C7EA; }

.cards { display: grid; gap: 16px; }
.cards-2 { grid-template-columns: repeat(2, 1fr); }
.cards-3 { grid-template-columns: repeat(3, 1fr); }

.card {
  background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 14px;
  padding: 18px 20px;
  display: flex; flex-direction: column; justify-content: flex-start;
}
.card-accent { border: 2px solid ${ACCENT}; background: #ECEDFD; }
.card-kicker { font-size: 10px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 6px; }
.card h3 { font-size: 16.5px; margin: 0 0 8px; font-weight: 700; color: ${INK}; line-height: 1.25; }
.card .p { font-size: 12.5px; color: #565A70; line-height: 1.55; margin: 0; }
.bul { margin: 0; padding-left: 16px; font-size: 12px; color: #565A70; line-height: 1.45; }
.bul li { margin-bottom: 4px; }
.bul li:last-child { margin-bottom: 0; }

.callout {
  background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 12px;
  padding: 14px 20px; font-size: 13px; color: #4A4E63; line-height: 1.5;
}
.callout-strong { border: 2px solid ${ACCENT}; background: #ECEDFD; font-size: 14px; color: ${INK}; }

/* footer */
.footer {
  position: absolute; left: 64px; right: 64px; bottom: 22px;
  display: flex; justify-content: space-between;
  font-size: 10.5px; color: #9599AC;
  border-top: 1px solid ${LINE}; padding-top: 10px;
}

/* toc */
.toc-grid { margin-top: 20px; display: grid; grid-template-columns: 1fr; gap: 8px; }
.toc-item {
  display: flex; align-items: center; gap: 16px;
  background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 10px;
  padding: 11px 20px;
}
.toc-num {
  width: 26px; height: 26px; border-radius: 50%; background: ${ACCENT}; color: #fff;
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex: none;
}
.toc-body { flex: 1; }
.toc-title { font-weight: 700; font-size: 15px; color: ${INK}; }
.toc-page { font-size: 12.5px; font-weight: 700; color: ${ACCENT}; white-space: nowrap; }

/* tables */
.tbl { width: 100%; border-collapse: collapse; margin-top: 0; font-size: 12.5px; }
.tbl thead th { background: ${INK}; color: #fff; text-align: left; padding: 8px 14px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.6px; font-weight: 700; }
.tbl thead th.r { text-align: right; }
.tbl tbody td { padding: 9px 14px; border-bottom: 1px solid ${LINE}; color: ${INK}; line-height: 1.3; }
.tbl tbody tr:nth-child(even) { background: #FAFAFE; }
.tbl .r { text-align: right; }
.tbl .b { font-weight: 700; }
.tbl-total td, .tbl-total td b { background: ${INK}; color: #fff !important; border-bottom: none; padding: 10px 14px; }

.two-col { display: grid; grid-template-columns: 1.15fr 1fr; gap: 22px; margin-top: 18px; align-items: stretch; }
.two-col .tbl { height: 100%; }
.team-list { display: flex; flex-direction: column; gap: 8px; justify-content: space-between; }
.team-item { background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 10px; padding: 9px 16px; }
.team-item b { display: block; font-size: 13px; color: ${INK}; }
.team-item span { display: block; font-size: 11.5px; color: ${MUTED}; margin-top: 2px; line-height: 1.35; }

/* routes (slide 8) */
.routes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 20px; }
.route {
  display: flex; align-items: center; gap: 10px;
  background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 10px;
  padding: 11px 16px; font-size: 13px; font-weight: 600; color: ${INK};
}
.route-num { color: ${ACCENT}; font-weight: 800; font-size: 11px; }

/* price (slide 10) */
.price-row { display: flex; gap: 20px; margin-top: 24px; align-items: stretch; }
.price-box {
  width: 380px; flex: none; border-radius: 16px; padding: 26px 28px;
  background: linear-gradient(135deg, ${DARK_BG_FROM} 0%, ${DARK_BG_TO} 100%); color: #fff;
  display: flex; flex-direction: column; justify-content: center;
}
.price-label { font-size: 11px; letter-spacing: 1.2px; text-transform: uppercase; color: #A9AEEF; }
.price-main { font-size: 40px; font-weight: 800; margin-top: 8px; letter-spacing: -1px; }
.price-sub { font-size: 14px; color: #C4C7EA; margin-top: 8px; }
.price-total { font-size: 19px; font-weight: 700; margin-top: 18px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.22); }

.price-strip { display: flex; gap: 14px; margin-top: 16px; }
.price-strip > div {
  flex: 1; background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 12px;
  padding: 12px 20px; display: flex; align-items: baseline; justify-content: space-between;
}
.price-strip .ps-accent { background: ${ACCENT}; border-color: ${ACCENT}; }
.ps-label { font-size: 11.5px; color: ${MUTED}; }
.ps-main { font-size: 20px; font-weight: 800; color: ${INK}; }
.price-strip .ps-accent .ps-label { color: #D5D7FF; }
.price-strip .ps-accent .ps-main { color: #fff; }

/* портфолио в стиле КП «Воксис» */
.pf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px 20px; margin-top: 18px; }
.pf-item { display: flex; flex-direction: column; }
.pf-item img {
  width: 100%; height: 148px; object-fit: cover; object-position: top; display: block;
  border-radius: 12px; border: 1px solid ${CARD_BORDER};
}
.pf-cap { margin-top: 10px; }
.pf-cap b { display: block; font-size: 13px; font-weight: 700; color: ${ACCENT}; line-height: 1.3; }
.pf-cap span { display: block; font-size: 11.5px; color: ${MUTED}; line-height: 1.45; margin-top: 4px; }
.pf-note {
  background: #ECEDFD; border-radius: 14px; padding: 20px 22px;
  display: flex; flex-direction: column; justify-content: center;
}
.pf-note h3 { font-size: 19px; font-weight: 800; margin: 0 0 10px; color: ${INK}; letter-spacing: -0.2px; }
.pf-note p { font-size: 11.5px; color: #565A70; line-height: 1.5; margin: 0; }
.pf-grid-6 img { height: 166px; }
.pf-grid-6 .pf-cap b { font-size: 12.5px; }
.pf-grid-6 .pf-cap span { font-size: 11px; }
.pf-grid-wide img { height: 200px; }
.pf-grid-2 { grid-template-columns: repeat(2, 1fr); gap: 16px 24px; }
.pf-grid-2 img { height: 306px; }
.pf-grid-2 .pf-cap b { font-size: 15px; }
.pf-grid-2 .pf-cap span { font-size: 12.5px; }
.lnk { color: ${ACCENT}; }
.pf-foot { text-align: center; font-size: 13px; color: ${MUTED}; }
.pf-foot b { color: ${INK}; }

/* обзорный слайд опыта: плитка «клиент — что делали» */
.tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px 20px; }
.tile {
  background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 14px;
  padding: 18px 22px; display: flex; flex-direction: column; justify-content: center;
}
.tile h4 { font-size: 21px; font-weight: 800; color: ${ACCENT}; margin: 0 0 8px; letter-spacing: -0.3px; }
.tile .t-what { font-size: 13px; font-weight: 700; color: ${INK}; }
.tile .t-desc { font-size: 12px; color: ${MUTED}; line-height: 1.45; margin-top: 6px; }

/* слайд-кейс: крупный скриншот + буллеты справа */
.case { display: grid; grid-template-columns: 620px 1fr; gap: 30px; align-items: stretch; }
.case-shot {
  width: 100%; height: 100%; max-height: 320px; min-height: 260px;
  object-fit: cover; object-position: top center; display: block;
  border-radius: 14px; border: 1px solid ${CARD_BORDER}; background: #FBFBFE;
}
.case-bul { margin: 0; padding-left: 18px; font-size: 13.5px; color: #4A4E63; line-height: 1.5; }
.case-bul li { margin-bottom: 12px; }
.case-bul li:last-child { margin-bottom: 0; }

/* метрики плитками под кейсом */
.metrics { display: grid; gap: 14px; }
.metrics.m3 { grid-template-columns: repeat(3, 1fr); }
.metrics.m4 { grid-template-columns: repeat(4, 1fr); }
.metric {
  background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 12px;
  padding: 14px 18px;
}
.metric b { display: block; font-size: 22px; font-weight: 800; color: ${ACCENT}; letter-spacing: -0.4px; line-height: 1.15; }
.metric span { display: block; font-size: 11.5px; color: ${MUTED}; line-height: 1.4; margin-top: 5px; }

/* dense */
.slide.dense .h1 { font-size: 27px; margin: 12px 0 5px; }
.slide.dense .subtitle { font-size: 13px; line-height: 1.45; max-width: 1010px; }
.slide.dense .card { padding: 15px 17px; }
.slide.dense .card h3 { font-size: 15px; margin-bottom: 7px; }
.slide.dense .card .p { font-size: 12px; line-height: 1.5; }
.slide.dense .bul { font-size: 11.5px; line-height: 1.4; padding-left: 15px; }
.slide.dense .callout { font-size: 12px; padding: 12px 18px; line-height: 1.45; }

/* contact strip (slide 15) */
.contact-strip {
  margin-top: 16px; border-radius: 14px; padding: 18px 24px;
  background: linear-gradient(135deg, ${DARK_BG_FROM} 0%, ${DARK_BG_TO} 100%); color: #fff;
  display: flex; justify-content: space-between; align-items: center; gap: 30px;
}
.cs-title { font-size: 16px; font-weight: 700; }
.cs-sub { font-size: 12px; color: #C4C7EA; margin-top: 5px; }
.cs-right { text-align: right; }
.cs-org { font-size: 13.5px; font-weight: 700; }
.cs-contact { font-size: 12px; color: #C4C7EA; margin-top: 4px; }

/* title slide footer */
.title-footer { position: absolute; left: 64px; right: 64px; bottom: 48px; display: flex; justify-content: space-between; align-items: flex-end; }
.tf-right { text-align: right; }
.tf-label { font-size: 10px; letter-spacing: 1.2px; text-transform: uppercase; color: #9095DC; margin-bottom: 4px; }
.tf-strong { font-size: 14px; font-weight: 700; color: #fff; }
.tf-muted { font-size: 12px; color: #B3B7E4; margin-top: 3px; }
`;

const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<title>КП — интернет-магазин Ottobock — SNAgency</title>
<style>${css}</style>
</head>
<body>
${slides.join('\n')}
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'deck.html'), html);
console.log('deck.html built,', slides.length, 'slides');
