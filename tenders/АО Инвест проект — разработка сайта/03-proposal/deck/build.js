/* КП «АО Инвест проект — разработка сайта» — генератор HTML-слайдов (AIR, 1280x720)
   Источник: 03-proposal/КП_Инвест_проект_структура.md
   Запуск: node build.js  →  deck.html
*/
const fs = require('fs');
const path = require('path');

const IMG = JSON.parse(fs.readFileSync(path.join(__dirname, 'img.json'), 'utf8'));
const img = (name) => IMG[name];

const TOTAL = 16;
const ACCENT = '#6C4CE0';
const ACCENT_DARK = '#4A2FBE';
const INK = '#15132B';
const MUTED = '#63677E';
const CARD_BG = '#F6F5FC';
const CARD_BORDER = '#E4E1F6';
const LINE = '#ECEAF6';
const DARK_BG_FROM = '#120F28';
const DARK_BG_TO = '#241A57';

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
      <div>КП · Разработка сайта — Институт развития промышленного дизайна Москвы</div>
      <div>${String(num).padStart(2, '0')} / ${TOTAL}</div>
    </div>
  `;
}

function logoCorner() {
  return `<div class="logo-mini"><img src="${img('logo_air.png')}" alt="AIR" /></div>`;
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

function bullets(items) {
  return `<ul class="bul">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
}

/* ================= SLIDES ================= */

let slides = [];

/* ---- 1. Титульный ---- */
slides.push(`
${slideOpen('dark')}
  <div class="blob blob-a"></div>
  <div class="blob blob-b"></div>
  <div class="logo-badge"><img src="${img('logo_air.png')}" alt="AIR" /></div>
  <div class="title-eyebrow">${eyebrow('КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ · ЭЛЕКТРОННЫЙ АУКЦИОН', true)}</div>
  <h1 class="h1 h1-title">Разработка сайта<br/><span class="accent-text">Института развития промышленного дизайна Москвы</span></h1>
  <p class="subtitle subtitle-dark" style="max-width:820px">Аналитика и прототип, айдентика проекта, дизайн-макеты, вёрстка и разработка на 1С-Битрикс, запуск и техническая поддержка — под ключ, поэтапно, с оплатой по факту приёмки каждого этапа.</p>
  <div class="title-footer">
    <div>
      <div class="tf-strong">ООО «КСИИ»</div>
      <div class="tf-muted">Владислав Лицин · +7 (495) 247-50-54 · info@airelations.io</div>
    </div>
    <div class="tf-right">
      <div class="tf-label">ЭЛЕКТРОННЫЙ АУКЦИОН</div>
      <div class="tf-strong">закупка 32616263956</div>
      <div class="tf-muted">приём заявок до 17.08.2026, 10:00</div>
    </div>
  </div>
${slideClose()}
`);

/* ---- 2. Оглавление ---- */
{
  const toc = [
    ['01', 'Резюме предложения', 'стр. 3'],
    ['02', 'Как мы поняли задачу', 'стр. 4'],
    ['03', 'Структура портала', 'стр. 5'],
    ['04', 'Личные кабинеты и модерация', 'стр. 6'],
    ['05', 'Технологии и требования к платформе', 'стр. 7'],
    ['06', 'Этапы, сроки и ориентировочная стоимость', 'стр. 8'],
    ['07', 'График проекта', 'стр. 9'],
    ['08', 'Команда проекта', 'стр. 10'],
    ['09', 'Релевантный опыт', 'стр. 11–14'],
    ['10', 'Что вы получаете на выходе', 'стр. 15'],
    ['11', 'Контакты', 'стр. 16'],
  ];
  slides.push(`
${slideOpen()}
  ${eyebrow('ОГЛАВЛЕНИЕ')}
  ${heading('Что внутри предложения')}
  <div class="toc-grid">
    ${toc.map(([n, t, p]) => `
      <div class="toc-item">
        <div class="toc-num">${n}</div>
        <div class="toc-body">
          <div class="toc-title">${t}</div>
        </div>
        <div class="toc-page">${p}</div>
      </div>
    `).join('')}
  </div>
  ${footer(2)}
${slideClose()}
`);
}

/* ---- 3. Резюме предложения ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('РЕЗЮМЕ ПРЕДЛОЖЕНИЯ')}
  ${heading('Всё предложение на одном слайде', 'Портал для взаимодействия производителей, дизайн-студий и Института — 6 этапов от прототипа до поддержки, на платформе 1С-Битрикс')}
  <div class="cards cards-3" style="margin-top:22px">
    ${card('6 этапов', `<p class="p">От предпроектной аналитики и прототипа до запуска и 130 дней поддержки. Оплата поэтапная, по факту приёмки, аванс не предусмотрен.</p>`)}
    ${card('1С-Битрикс', `<p class="p">Разработка на имеющейся у заказчика платформе, ядро D7, штатные возможности CMS, кастомный функционал — в отдельной директории без правки ядра.</p>`)}
    ${card('130 дней поддержки', `<p class="p">После запуска — сопровождение и доработки по заявкам, приоритеты и сроки реакции — по регламенту ТЗ.</p>`)}
  </div>
  <div class="cards cards-3" style="margin-top:16px">
    ${card('Что закрываем полностью', bullets([
      'Аналитика и прототип',
      'Айдентика и гайдбук',
      'Дизайн-макеты под десктоп и мобайл',
      'Вёрстка и разработка на 1С-Битрикс',
      'Личные кабинеты и модерация',
      'Запуск и поддержка',
    ]), { accent: true })}
    ${card('Команда', bullets([
      'Бизнес-аналитик',
      'UX/UI-дизайнер',
      'Frontend и backend на 1С-Битрикс',
      'QA',
      'Проектный менеджер — штатная команда',
    ]))}
    ${card('Релевантный опыт', bullets([
      'Многостраничные порталы и личные кабинеты для КСК, Росатом, Интер РАО',
      'Интерфейсы на 1С-Битрикс для NDA-проектов',
    ]))}
  </div>
  ${footer(3)}
${slideClose()}
`);
}

/* ---- 4. Как мы поняли задачу ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ПОНИМАНИЕ ЗАДАЧИ')}
  ${heading('Портал для производителей, студий и Института')}
  <div class="cards cards-2" style="margin-top:22px">
    ${card('Предмет закупки', bullets([
      'Информационно-просветительский портал, равный и беспрепятственный доступ для всех категорий пользователей, без дискриминационных условий',
      'Три аудитории с разными сценариями: производители, дизайн-студии и дизайнеры, Институт как оператор и модератор',
      'Полный цикл: структура и прототип → айдентика → дизайн-макеты → вёрстка и разработка → запуск на 1С-Битрикс → поддержка',
    ]))}
    ${card('Что критично', bullets([
      'Реестр студий с рейтингом, карточками портфолио и заявками на коммерческое предложение',
      'Модуль открытых конкурсов на разработку промышленного дизайна — с приёмом заявок, статусами и назначением жюри',
      'Личные кабинеты производителя и студии, весь публикуемый контент проходит модерацию администратора',
      'Соответствие 152-ФЗ, работа по HTTPS, кроссбраузерность и адаптивность под десктоп и мобайл',
    ]))}
  </div>
  <div class="callout callout-strong" style="margin-top:16px">
    <b>Заказчик по договору и оператор сайта — разные стороны.</b> Договор — с АО «Инвест проект», содержательные решения по структуре и айдентике согласовываются с Институтом развития промышленного дизайна как оператором и модератором портала.
  </div>
  ${footer(4)}
${slideClose()}
`);
}

/* ---- 5. Структура портала ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('СТРУКТУРА ПОРТАЛА')}
  ${heading('Три раздела для трёх аудиторий', 'Единая навигация, поиск по сайту, версия для слабовидящих — на каждой странице')}
  <div class="cards cards-3" style="margin-top:22px">
    ${card('Институт', bullets([
      'Цели и задачи, что такое промышленный дизайн и зачем он нужен, команда, контакты',
      'Статический раздел, полностью управляется через CMS',
    ]))}
    ${card('Производителям', bullets([
      'Реестр студий: поиск, фильтры по отрасли/специализации/рейтингу, карточки с портфолио и кейсами',
      'Запрос коммерческого предложения выбранным студиям, заявка на экспертный анализ',
      'Документы для заказа услуг, учебные материалы (со ссылкой на внешнюю LMS), программа практики студентов, целевые меры поддержки, стандарты и рекомендации, премия «Лучший промышленный дизайн России», размещение вакансий',
    ]))}
    ${card('Студиям и дизайнерам', bullets([
      'Открытые конкурсы на разработку промышленного дизайна — приём заявок, статусы, жюри',
      'Календарь отраслевых мероприятий, вакансии, стажировки, справочник профильных вузов',
    ]))}
  </div>
  <div class="callout" style="margin-top:14px">
    <b>Раздел «Медиа»</b> — экспертные статьи и кейсы, категории и теги, публикация материалов студий после модерации.
  </div>
  ${footer(5)}
${slideClose()}
`);
}

/* ---- 6. Личные кабинеты и модерация ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ЛИЧНЫЕ КАБИНЕТЫ')}
  ${heading('Три роли, один административный контур', 'Гость, производитель, студия — с разным набором прав, вся публикация — через модерацию')}
  <div class="cards cards-3" style="margin-top:22px">
    ${card('Производитель', bullets([
      'Отправка запросов коммерческого предложения',
      'Заявки на экспертный анализ',
      'Размещение вакансий',
      'Запись на обучение',
      'История обращений',
    ]))}
    ${card('Студия', bullets([
      'Редактирование профиля',
      'Загрузка портфолио и кейсов',
      'Участие в конкурсах',
      'Отслеживание статуса заявок',
    ]))}
    ${card('Администратор', bullets([
      'Управление всеми разделами и контентом',
      'Модерация профилей и публикаций',
      'Назначение рейтинга студий',
      'Обработка заявок на КП и экспертный анализ',
      'Управление конкурсами, журнал действий',
    ]))}
  </div>
  <div class="callout" style="margin-top:14px">
    <b>Импорт и экспорт данных</b> — реестр студий, список конкурсов, меры поддержки выгружаются в PDF / Excel / CSV прямо из административной панели.
  </div>
  ${footer(6)}
${slideClose()}
`);
}

/* ---- 7. Технологии и требования к платформе ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ТЕХНОЛОГИИ')}
  ${heading('1С-Битрикс, безопасность и SEO из коробки', 'Разработка на имеющейся у Института платформе, без модификации ядра CMS')}
  <div class="cards cards-3" style="margin-top:22px">
    ${card('Платформа', `<p class="p">1С-Битрикс, современное ядро D7 и ORM, кастомный функционал — в директории /local/, ядро CMS не модифицируется. Frontend — HTML5/CSS3/JS, кроссбраузерность для Chrome, Яндекс.Браузер, Edge, Safari, десктоп и мобайл.</p>`)}
    ${card('Безопасность и 152-ФЗ', `<p class="p">Работа по HTTPS с момента запуска, защита от XSS/SQL-инъекций/CSRF, ролевая модель доступа, уникальные учётные записи, cookie-баннер с обозначенным сроком действия и атрибутами secure/http-only.</p>`)}
    ${card('SEO и доступность', `<p class="p">Человекопонятные URL, sitemap.xml, редактируемые title/description/keywords на каждой странице, версия для слабовидящих по ГОСТ Р 52872-2019, интеграция Яндекс.Метрики.</p>`)}
  </div>
  <div class="callout" style="margin-top:16px">
    <b>Без Google Analytics</b> — на сайте используется только Яндекс.Метрика, как того требует техническое задание.
  </div>
  ${footer(7)}
${slideClose()}
`);
}

/* ---- 8. Этапы, сроки и стоимость ---- */
{
  const rows = [
    ['Этап 1', 'Подготовка и проектирование структуры', 'Аналитика и прототип сайта, презентация с прототипами архитектуры', '1–10', '969 000'],
    ['Этап 2', 'Айдентика проекта', 'Фирменный стиль, шаблоны презентаций и рекламных форматов, макеты сувенирной продукции, гайдбук', '10–45', '1 100 000'],
    ['Этап 3', 'Проектирование и прототипирование страниц', 'Дизайн-концепция и дизайн-макеты всех страниц под десктоп и мобайл, 3 универсальных шаблона', '25–60', '1 561 000'],
    ['Этап 4', 'Frontend и backend разработка, вёрстка', 'Вёрстка макетов, тестирование, подготовка к запуску, кроссбраузерная проверка', '40–80', '2 180 000'],
    ['Этап 5', 'Запуск в работу сайта', 'Программирование и запуск страниц на 1С-Битрикс, испытания, ввод в эксплуатацию', '50–90', '2 969 000'],
    ['Этап 6', 'Поддержка', 'Сопровождение и поддержка работоспособности сайта 130 раб. дней после запуска', '90–220', '2 061 000'],
  ];
  slides.push(`
${slideOpen()}
  ${eyebrow('СТОИМОСТЬ')}
  ${heading('6 этапов от прототипа до поддержки', 'Стоимость приведена справочно, на уровне начальной цены договора — итоговая определяется на электронном аукционе 19.08.2026')}
  <table class="tbl">
    <thead>
      <tr><th>Этап</th><th>Состав работ</th><th class="r">Срок, раб. дни</th><th class="r">Стоимость, ₽</th></tr>
    </thead>
    <tbody>
      ${rows.map(([n, t, d, s, p]) => `
        <tr>
          <td class="tbl-stage">${n}</td>
          <td><b>${t}</b> <span class="tbl-sub">— ${d}</span></td>
          <td class="r">${s}</td>
          <td class="r b">${p}</td>
        </tr>
      `).join('')}
      <tr class="tbl-total">
        <td colspan="2"><b>ИТОГО</b></td>
        <td class="r"><b>220 раб. дней</b></td>
        <td class="r"><b>10 838 000</b></td>
      </tr>
    </tbody>
  </table>
  <div class="cards cards-3" style="margin-top:10px">
    ${card('Порядок оплаты', `<p class="p">Поэтапно, по факту приёмки каждого этапа, аванс не предусмотрен.</p>`)}
    ${card('НДС', `<p class="p">Работы AIR не облагаются НДС (резидент Сколково).</p>`)}
    ${card('Как формируется итоговая цена', `<p class="p">Суммы приведены на уровне начальной (максимальной) цены договора; фактическая цена определяется на аукционе и пересчитывается пропорционально проценту снижения по каждому этапу.</p>`)}
  </div>
  ${footer(8)}
${slideClose()}
`);
}

/* ---- 9. График проекта ---- */
{
  const stages = ['Подготовка и проектирование', 'Айдентика проекта', 'Дизайн-макеты страниц', 'Frontend/backend, вёрстка', 'Запуск на 1С-Битрикс', 'Поддержка'];
  slides.push(`
${slideOpen()}
  ${eyebrow('СРОКИ')}
  ${heading('220 рабочих дней, поэтапная сдача')}
  <div class="timeline">
    <div class="timeline-bar"></div>
    <div class="timeline-steps">
      ${stages.map((s) => `<div class="timeline-step"><div class="timeline-dot"></div><div class="timeline-label">${s}</div></div>`).join('')}
    </div>
  </div>
  <div class="callout callout-strong" style="margin-top:40px">
    <b>90-й день — сайт запущен и работает.</b> Полная версия принята заказчиком по этапам 1–5. Дальше 130 рабочих дней идёт поддержка и сопровождение — доработки по заявкам Института в рамках согласованных приоритетов и сроков реакции.
  </div>
  ${footer(9)}
${slideClose()}
`);
}

/* ---- 10. Команда проекта ---- */
{
  const roles = [
    ['Бизнес-аналитик', 'Предпроектная аналитика, структура портала, прототип'],
    ['UI/UX-дизайнер', 'Айдентика проекта, дизайн-макеты страниц под десктоп и мобайл'],
    ['Frontend-разработчик', 'Адаптивная вёрстка, кроссбраузерность'],
    ['Backend-разработчик (1С-Битрикс)', 'Кастомный функционал в /local/, интеграции, ЛК'],
    ['QA-инженер', 'Тестирование, кроссбраузерная и кроссплатформенная проверка'],
    ['Специалист поддержки', 'Сопровождение после запуска, обработка заявок по регламенту'],
  ];
  slides.push(`
${slideOpen()}
  ${eyebrow('КОМАНДА ПРОЕКТА')}
  ${heading('Кто будет работать над проектом', 'Штатная команда, единая точка входа — проектный менеджер')}
  <div class="callout callout-strong" style="margin-top:22px">
    <b>Выделенный проектный менеджер</b> — контроль сроков и приёмки по всем 6 этапам, единая точка коммуникации с Институтом.
  </div>
  <div class="cards cards-3" style="margin-top:16px">
    ${roles.map(([t, d]) => card(t, `<p class="p">${d}</p>`)).join('')}
  </div>
  ${footer(10)}
${slideClose()}
`);
}

/* ---- 11. Релевантный опыт — обзор ---- */
{
  const exp = [
    ['КСК', 'Сайт, ЛК электроэнергия, ЛК тепло, ЛК сотрудника'],
    ['Интер РАО', 'Конкурсы, сторителлинг'],
    ['Росатом / Атоммедиа', 'Личный кабинет с ИИ'],
    ['Компания в сфере недвижимости (NDA)', 'Интерфейс на 1С-Битрикс'],
  ];
  slides.push(`
${slideOpen()}
  ${eyebrow('РЕЛЕВАНТНЫЙ ОПЫТ')}
  ${heading('Мы делали похожие порталы и личные кабинеты для лидеров отрасли', 'Многостраничные сайты на 1С-Битрикс, справочники и реестры, личные кабинеты, модули заявок и конкурсов')}
  <div class="cards cards-4" style="margin-top:24px">
    ${exp.map(([t, d]) => card(t, `<p class="p">${d}</p>`)).join('')}
  </div>
  ${footer(11)}
${slideClose()}
`);
}

/* ---- 12. Опыт · КСК ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · КСК')}
  ${heading('Основной сайт и личные кабинеты потребителей', 'Калужская сбытовая компания · реализовано на 1С-Битрикс')}
  <div class="shot-grid shot-grid-3" style="margin-top:18px">
    <div class="shot-card">
      <img src="${img('ksk_main.png')}" />
      <div class="shot-cap"><b>Основной сайт компании</b><span>Многостраничная структура</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('ksk_teplo.png')}" />
      <div class="shot-cap"><b>ЛК потребителя теплоэнергии</b><span>Показания, расчёты, оплата</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('ksk_electro.png')}" />
      <div class="shot-cap"><b>ЛК потребителя электроэнергии</b><span>Оплата счетов</span></div>
    </div>
  </div>
  <div class="callout" style="margin-top:12px">
    <b>Почему релевантно</b> — многостраничная структура, справочники и личные кабинеты с разными ролями пользователей, административная панель с модерацией контента.
  </div>
  ${footer(12)}
${slideClose()}
`);
}

/* ---- 13. Опыт · Интер РАО ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · ИНТЕР РАО')}
  ${heading('Пять проектов для «Интер РАО»', 'Корпоративный сайт и внутренние платформы · реализовано на 1С-Битрикс')}
  <div class="shot-grid" style="margin-top:16px">
    <div class="shot-card shot-wide">
      <img src="${img('ir_konkurs.png')}" />
      <div class="shot-cap"><b>Платформа конкурсов</b><span>100 000+ пользователей, 5 000+ заявок, 35+ конкурсов</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('ir_main2.png')}" />
      <div class="shot-cap"><b>Основной сайт компании</b><span>Корпоративный сайт группы. 300 000+ посещений</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('ir_storitelling.png')}" />
      <div class="shot-cap"><b>Сайт-сторителлинг</b><span>История компании в лицах и фактах: таймлайны по 20+ электростанциям</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('ir_sport.jpg')}" />
      <div class="shot-cap"><b>Спорт-платформа</b><span>Турниры, статистика игроков, билеты. 14 000+ пользователей</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('ir_chgk.png')}" />
      <div class="shot-cap"><b>«Что? Где? Когда?»</b><span>Игры с рейтингом в реальном времени. 12 700+ участников</span></div>
    </div>
    ${card('5 проектов', `<p class="p">Долгосрочное сотрудничество: от корпоративного сайта до высоконагруженных внутренних платформ.</p>`, { accent: true })}
  </div>
  <div class="callout" style="margin-top:14px">
    <b>Почему релевантно</b> — модуль конкурсов с приёмом заявок, статусами и жюри — прямой аналог модуля «Открытые конкурсы на разработку промышленного дизайна».
  </div>
  ${footer(13)}
${slideClose()}
`);
}

/* ---- 14. Опыт · Росатом и NDA-проекты ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · РОСАТОМ И NDA-ПРОЕКТЫ')}
  ${heading('Работаем с 1С-Битрикс и личными кабинетами не первый раз')}
  <div class="shot-grid shot-grid-3" style="margin-top:18px">
    <div class="shot-card">
      <img src="${img('rosatom_1.png')}" />
      <div class="shot-cap"><b>Атоммедиа</b><span>Личный кабинет журналиста с ИИ, ×7 пользователей</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('rosatom_2.png')}" />
      <div class="shot-cap"><b>Атоммедиа</b><span>5000+ ИИ-генераций</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('nedv_ai.png')}" />
      <div class="shot-cap"><b>Компания в сфере недвижимости (NDA)</b><span>ИИ-ассистент, умный поиск по базе знаний</span></div>
    </div>
  </div>
  <div class="cards cards-2" style="margin-top:16px">
    ${card('Росатом / Атоммедиа', `<p class="p">Личный кабинет журналиста с ИИ-функционалом: рост числа зарегистрированных пользователей ×7, 5000+ ИИ-генераций.</p>`)}
    ${card('Компания в сфере коммерческой недвижимости (NDA)', `<p class="p">ИИ-ассистент с умным поиском по базе знаний, интерфейс встроен в сайт на CMS 1С-Битрикс.</p>`)}
  </div>
  ${footer(14)}
${slideClose()}
`);
}

/* ---- 15. Что вы получаете на выходе ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ЧТО НА ВЫХОДЕ')}
  ${heading('Что передаём при сдаче')}
  <div class="cards cards-3" style="margin-top:22px">
    ${card('6', `<p class="p">этапов с раздельной приёмкой</p>`, { kicker: 'ЭТАПОВ' })}
    ${card('130 дней', `<p class="p">поддержки после запуска</p>`, { kicker: 'ПОДДЕРЖКА' })}
    ${card('1С-Битрикс', `<p class="p">без модификации ядра</p>`, { kicker: 'ПЛАТФОРМА' })}
  </div>
  <div class="callout callout-strong" style="margin-top:16px">
    <b>Передаём при сдаче</b> — исходный код, доступы к платформе, инструкция по эксплуатации сайта на 1С-Битрикс, гайдбук по фирменному стилю, протокол тестирования, акты сдачи-приёмки по каждому этапу.
  </div>
  ${footer(15)}
${slideClose()}
`);
}

/* ---- 16. Контакты ---- */
{
  slides.push(`
${slideOpen('dark')}
  <div class="blob blob-a"></div>
  <div class="blob blob-b"></div>
  <div class="logo-badge"><img src="${img('logo_air.png')}" alt="AIR" /></div>
  <h1 class="h1 h1-title" style="margin-top:210px">Готовы приступить<br/><span class="accent-text">сразу после заключения договора</span></h1>
  <p class="subtitle subtitle-dark" style="max-width:780px">Стоимость и сроки по этапам зафиксированы на уровне начальной цены договора, итоговая цена — по результатам электронного аукциона 19.08.2026.</p>
  <div class="title-footer">
    <div class="tf-cols">
      <div><div class="tf-label">КОНТАКТ</div><div class="tf-strong">Владислав Лицин</div></div>
      <div><div class="tf-label">ТЕЛЕФОН</div><div class="tf-strong">+7 (495) 247-50-54</div></div>
      <div><div class="tf-label">ПОЧТА</div><div class="tf-strong">info@airelations.io</div></div>
    </div>
  </div>
  <div class="tf-bottomline">ООО «КСИИ» · закупка 32616263956 · roseltorg.ru</div>
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
  padding: 48px 64px 0 64px;
  overflow: hidden;
  page-break-after: always;
}
.slide.dark {
  background: linear-gradient(135deg, ${DARK_BG_FROM} 0%, ${DARK_BG_TO} 100%);
  color: #FFFFFF;
}
.blob { position: absolute; border-radius: 50%; filter: blur(2px); }
.blob-a { width: 620px; height: 620px; right: -180px; top: -220px; background: radial-gradient(circle, rgba(140,110,255,0.55) 0%, rgba(140,110,255,0) 70%); }
.blob-b { width: 420px; height: 420px; left: -160px; bottom: -180px; background: radial-gradient(circle, rgba(90,60,220,0.35) 0%, rgba(90,60,220,0) 70%); }

.logo-badge {
  position: absolute; left: 64px; top: 40px;
  background: #FFFFFF; border-radius: 10px; padding: 8px 14px;
  display: inline-flex; align-items: center;
}
.logo-badge img { height: 20px; width: auto; display: block; }
.title-eyebrow { margin-top: 118px; }

.logo-mini { position: absolute; right: 64px; top: 44px; }
.logo-mini img { height: 15px; width: auto; display: block; opacity: 0.85; }

.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: #F0EDFC; border: 1px solid ${CARD_BORDER}; color: ${ACCENT};
  border-radius: 20px; padding: 6px 14px; font-size: 11px; font-weight: 700;
  letter-spacing: 1.4px; text-transform: uppercase; margin-top: 0;
}
.eyebrow-dark { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.24); color: #C8BEFF; }
.eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; display: inline-block; }

.h1 { font-size: 32px; font-weight: 800; line-height: 1.18; margin: 14px 0 6px; letter-spacing: -0.3px; }
.h1-title { font-size: 38px; margin-top: 20px; line-height: 1.25; }
.accent-text { color: ${ACCENT}; }
.slide.dark .accent-text { color: #A996FF; }

.subtitle { font-size: 14.5px; color: ${MUTED}; line-height: 1.5; max-width: 920px; margin: 0; }
.subtitle-dark { color: #C7C3E0; }

.cards { display: grid; gap: 16px; }
.cards-1 { grid-template-columns: 1fr; }
.cards-2 { grid-template-columns: repeat(2, 1fr); }
.cards-3 { grid-template-columns: repeat(3, 1fr); }
.cards-4 { grid-template-columns: repeat(4, 1fr); }

.card {
  background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 14px;
  padding: 18px 20px;
}
.card-accent { border: 2px solid ${ACCENT}; background: #F2EEFD; }
.card-kicker { font-size: 10px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 6px; }
.card h3 { font-size: 17px; margin: 0 0 8px; font-weight: 700; color: ${INK}; }
.card .p { font-size: 12.5px; color: #565A70; line-height: 1.55; margin: 0; }
.bul { margin: 0; padding-left: 16px; font-size: 12px; color: #565A70; line-height: 1.4; }
.bul li { margin-bottom: 3px; }
.bul li:last-child { margin-bottom: 0; }

.callout {
  background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 12px;
  padding: 14px 20px; font-size: 13px; color: #4A4E63; line-height: 1.5;
}
.callout-strong { border: 2px solid ${ACCENT}; background: #F2EEFD; font-size: 14px; color: ${INK}; }

/* footer */
.footer {
  position: absolute; left: 64px; right: 64px; bottom: 22px;
  display: flex; justify-content: space-between;
  font-size: 10.5px; color: #9599AC;
  border-top: 1px solid ${LINE}; padding-top: 10px;
}

/* toc */
.toc-grid { margin-top: 10px; display: grid; grid-template-columns: 1fr; gap: 4px; }
.toc-item {
  display: flex; align-items: center; gap: 14px;
  background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 8px;
  padding: 4px 16px;
}
.toc-num {
  width: 20px; height: 20px; border-radius: 50%; background: ${ACCENT}; color: #fff;
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 10px; flex: none;
}
.toc-body { flex: 1; }
.toc-title { font-weight: 700; font-size: 13px; color: ${INK}; }
.toc-desc { font-size: 10.5px; color: ${MUTED}; margin-top: 1px; }
.toc-page { font-size: 11.5px; font-weight: 700; color: ${ACCENT}; white-space: nowrap; }

/* table (slide 8) */
.tbl { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
.tbl thead th { background: ${INK}; color: #fff; text-align: left; padding: 6px 14px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.6px; font-weight: 700; }
.tbl thead th.r { text-align: right; }
.tbl tbody td { padding: 5px 14px; border-bottom: 1px solid ${LINE}; color: ${INK}; line-height: 1.25; }
.tbl tbody tr:nth-child(even) { background: #FAF9FE; }
.tbl .tbl-stage { color: ${ACCENT}; font-weight: 700; white-space: nowrap; }
.tbl .tbl-sub { color: ${MUTED}; font-size: 11px; }
.tbl .r { text-align: right; }
.tbl .b { font-weight: 700; }
.tbl-total td, .tbl-total td b { background: ${INK}; color: #fff !important; border-bottom: none; padding: 7px 14px; }

/* timeline (slide 9) */
.timeline { margin-top: 50px; position: relative; }
.timeline-bar { height: 6px; border-radius: 3px; background: linear-gradient(90deg, ${ACCENT_DARK}, ${ACCENT}, #C9BEFF); }
.timeline-steps { display: flex; justify-content: space-between; margin-top: 14px; }
.timeline-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
.timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: ${ACCENT}; margin-top: -25px; border: 3px solid #fff; box-shadow: 0 0 0 1px ${CARD_BORDER}; }
.timeline-label { font-size: 11px; color: ${MUTED}; margin-top: 8px; text-align: center; padding: 0 4px; }

/* shots */
.shot-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 14px; }
.shot-grid-3 { grid-template-columns: repeat(3, 1fr); }
.shot-grid-2 { grid-template-columns: 1.3fr 1fr; }
.shot-wide { grid-row: span 1; }
.shot-card { border: 1px solid ${CARD_BORDER}; border-radius: 12px; overflow: hidden; background: #fff; }
.shot-card img { width: 100%; height: 130px; object-fit: cover; object-position: top; display: block; }
.shot-card-lg img { height: 240px; }
.shot-cap { padding: 10px 12px; }
.shot-cap b { display: block; font-size: 12px; color: ${INK}; }
.shot-cap span { font-size: 10.5px; color: ${MUTED}; }

/* title slide footer */
.title-footer { position: absolute; left: 64px; right: 64px; bottom: 44px; display: flex; justify-content: space-between; align-items: flex-end; }
.tf-right { text-align: right; }
.tf-label { font-size: 10px; letter-spacing: 1.2px; text-transform: uppercase; color: #9C93D6; margin-bottom: 4px; }
.tf-strong { font-size: 13.5px; font-weight: 700; color: #fff; }
.tf-muted { font-size: 11.5px; color: #B7B0DE; margin-top: 2px; }
.tf-cols { display: flex; gap: 56px; }
.tf-bottomline { position: absolute; left: 64px; bottom: 22px; font-size: 11px; color: #8E86C4; }
`;

const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<title>КП — АО «Инвест проект» — разработка сайта</title>
<style>${css}</style>
</head>
<body>
${slides.join('\n')}
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'deck.html'), html);
console.log('deck.html built,', slides.length, 'slides');
