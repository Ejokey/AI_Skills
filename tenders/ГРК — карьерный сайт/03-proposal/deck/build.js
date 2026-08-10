/* КП «Карьерный сайт ГРК» — генератор HTML-слайдов (AIR, 1280x720)
   Источник: projects/ГРК/КП_ГРК_карьерный_сайт_структура.md
   Запуск: node build.js  →  deck.html
*/
const fs = require('fs');
const path = require('path');

const IMG = JSON.parse(fs.readFileSync(path.join(__dirname, 'img.json'), 'utf8'));
const img = (name) => IMG[name];

const TOTAL = 19;
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

function footer(num, sectionLabel) {
  return `
    <div class="footer">
      <div>Коммерческое предложение · Карьерный сайт ГРК</div>
      <div>${String(num).padStart(2, '0')} / ${TOTAL}</div>
    </div>
  `;
}

function slideOpen(extraClass = '') {
  return `<section class="slide ${extraClass}">`;
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
  <div class="title-eyebrow">${eyebrow('КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ · ТЕНДЕР', true)}</div>
  <h1 class="h1 h1-title">Разработка карьерного сайта<br/>компании ГРК<br/><span class="accent-text">«Твоя история начинается здесь»</span></h1>
  <p class="subtitle subtitle-dark" style="max-width:760px">Дизайн из 3 концепций, контент и обработка фото, разработка на готовой CMS EvolutionCMS (ModX), интеграция с «Поток», игровые механики и интеллектуальный поиск вакансий — под ключ, поэтапно, с фиксированной сметой по этапам.</p>
  <div class="title-footer">
    <div>
      <div class="tf-strong">ООО «КСИИ»</div>
      <div class="tf-muted">Лицин Владислав · +7 (495) 247-50-54 · info@airelations.io</div>
    </div>
    <div class="tf-right">
      <div class="tf-label">ПРОЦЕДУРА</div>
      <div class="tf-strong">тендер 4543735</div>
    </div>
  </div>
${slideClose()}
`);

/* ---- 2. Оглавление ---- */
{
  const toc = [
    ['01', 'Резюме предложения', 'Ключевое на одном слайде', 'стр. 3'],
    ['02', 'Задача, идея, функционал', 'Концепция, ИИ-агент, поиск и механики', 'стр. 4–7'],
    ['03', 'Технологии, интеграции и безопасность', 'EvolutionCMS, ИБ, 152-ФЗ', 'стр. 8'],
    ['04', 'Этапы, сроки и стоимость', 'Смета и график', 'стр. 9–10'],
    ['05', 'Релевантный опыт', 'Интер РАО, КСК, Росатом, Недвижимость и другие', 'стр. 11–15'],
    ['06', 'Команда и опция «ИИ-рекрутер»', 'Кто будет работать, что можно добавить', 'стр. 16–17'],
    ['07', 'Следующие шаги', 'Что происходит после подачи', 'стр. 18'],
  ];
  slides.push(`
${slideOpen()}
  ${eyebrow('ОГЛАВЛЕНИЕ')}
  ${heading('Что внутри предложения')}
  <div class="toc-grid">
    ${toc.map(([n, t, d, p]) => `
      <div class="toc-item">
        <div class="toc-num">${n}</div>
        <div class="toc-body">
          <div class="toc-title">${t}</div>
          <div class="toc-desc">${d}</div>
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
  ${heading('Всё предложение на одном слайде', 'Фиксированная смета по 9 этапам и полный запуск через 3 месяца — как вы и просили')}
  <div class="cards cards-3" style="margin-top:22px">
    ${card('5 600 000 ₽', `<p class="p">Итого без НДС. Работы AIR НДС не облагаются (Сколково). Смета зафиксирована по каждому из 9 этапов.</p>`, { kicker: 'СТОИМОСТЬ', style: 'padding-top:14px' })}
    ${card('3 месяца', `<p class="p">9 этапов с поэтапной сдачей. Оплата — 4 платежа по 25% на ключевых точках проекта.</p>`, { kicker: 'СРОК' })}
    ${card('2,5 месяца', `<p class="p">Рекламные кампании можно запускать на страницах предприятий уже через 2,5 месяца — как требует п. 10.2 ТЗ.</p>`, { kicker: 'ПРОМЕЖУТОЧНЫЙ ЗАПУСК' })}
  </div>
  <div class="cards cards-3" style="margin-top:16px">
    ${card('Что закрываем полностью', bullets([
      '3 дизайн-концепции, не менее 5 циклов правок',
      'Контент и обработка фото',
      'Игровые механики, интеллектуальный поиск',
      'Интеграция с HR-системой «Поток»',
    ]), { accent: true })}
    ${card('Команда', bullets([
      'Выделенный проектный менеджер',
      'Контент-менеджер и дизайнер по фото — отдельными ролями',
      'Frontend, backend, QA, DevOps — в штате',
    ]))}
    ${card('Релевантный опыт', bullets([
      '20+ сложных многостраничных проектов',
      'Интер РАО, Росатом, КСК',
      'Промышленные заказчики с распределённой структурой',
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
  ${heading('Что нужно ГРК')}
  <div class="cards cards-2" style="margin-top:22px">
    ${card('Предмет закупки', bullets([
      'Карьерный портал на сервере ГРК, домен grk, отдельная страница у каждого из 8 предприятий',
      'Полный цикл: структура → контент → 3 дизайн-концепции → разработка → проверки ИБ → запуск → SEO',
      'Игровые механики, интеллектуальный поиск, интеграция с HR-системой «Поток»',
      'Редактирование фото, текстов, видео, ТОП-10 силами ГРК',
    ]))}
    ${card('Что критично для оценки', bullets([
      'Смета, описание и длительность отдельно по каждому этапу',
      'Контент-менеджер и дизайнер (в т.ч. обработка фото) — в составе команды',
      'Не более 6 ключевых экранов главной, 2–3 клика до отклика, загрузка до 3 сек.',
      'Соответствие 152-ФЗ, WAF, проверки кода и уязвимостей со стороны ИБ',
    ]))}
  </div>
  <div class="cards cards-2" style="margin-top:16px">
    ${card('2,5 месяца', `<p class="p">Сайт частично функционирует и принимает таргет и контекст: страницы предприятий, вакансии, формы отклика.</p>`, { accent: true })}
    ${card('3 месяца', `<p class="p">Полная версия: игровые механики, ИИ-агент, интеллектуальный поиск, интеграция с «Поток», HR-дашборд.</p>`, { accent: true })}
  </div>
  <div class="callout" style="margin-top:14px">
    <b>Ориентир по контенту и подаче</b> — карьерные лендинги ГРК: kgok-rabota.ru, vkk-rabota.ru, ukk-rabota.ru
  </div>
  ${footer(4)}
${slideClose()}
`);
}

/* ---- 5. Концепция и структура сайта ---- */
{
  const steps = ['Узнаёт компанию', 'Выбирает предприятие и регион', 'Проходит тест совместимости', 'Получает профиль и рекомендации', 'Откликается'];
  slides.push(`
${slideOpen()}
  ${eyebrow('ПРЕДЛОЖЕННОЕ РЕШЕНИЕ')}
  ${heading('Не каталог вакансий, а разговор с кандидатом', 'Сторителлинг-путь и жёсткое ограничение главной — не более 6 ключевых экранов, глубина уходит на смежные страницы')}
  <div class="path-row">
    ${steps.map((s, i) => `
      <div class="path-step">
        <div class="path-num">${i + 1}</div>
        <div class="path-text">${s}</div>
      </div>
      ${i < steps.length - 1 ? '<div class="path-arrow">→</div>' : ''}
    `).join('')}
  </div>
  <div class="cards cards-3" style="margin-top:20px">
    ${card('6 экранов главной', `<p class="p">Главный экран с поиском, выбор пути, интерактивная карта, цифры о компании, что мы предлагаем, тест совместимости.</p>`)}
    ${card('8 страниц предприятий', `<p class="p">Единый шаблон на домене grk: история, вакансии, льготы, FAQ, контакты, геолокация. От Усольского калийного комбината до головного офиса в Москве.</p>`)}
    ${card('Смежные страницы', `<p class="p">Направления работ, карьерный трек, студентам и выпускникам, контакты и FAQ.</p>`)}
  </div>
  <div class="callout" style="margin-top:14px">
    <b>Истории работников и «блоки-напоминания» встроены в ленту вакансий</b>, а не лежат отдельным блоком на главной.
  </div>
  ${footer(5)}
${slideClose()}
`);
}

/* ---- 6. Ключевая идея: ИИ-агент для соискателя ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('КЛЮЧЕВАЯ ИДЕЯ')}
  ${heading('ИИ-агент для соискателя', 'Цифровой помощник сопровождает кандидата от первого вопроса до устройства на работу — и дальше')}
  <div class="cards cards-4" style="margin-top:22px">
    ${card('Первое знакомство', `<p class="p">2–3 вопроса на входе: «Кем хотите работать?», «Где готовы жить?», «Какой у вас опыт?»</p>`)}
    ${card('Персональный маршрут', `<p class="p">Подходящие вакансии и предприятия, тест на совместимость, рекомендованный карьерный трек.</p>`)}
    ${card('Сопровождение до оффера', `<p class="p">Статус заявки, напоминания о собеседованиях, помощь в подготовке к этапам отбора.</p>`)}
    ${card('Адаптация и дальше', `<p class="p">После устройства помогает новому сотруднику освоиться и найти нужную информацию.</p>`)}
  </div>
  <div class="callout callout-strong" style="margin-top:16px">
    Кандидат чувствует заботу, а не безликий портал — снижается нагрузка на рекрутеров, растёт конверсия откликов.
  </div>
  ${footer(6)}
${slideClose()}
`);
}

/* ---- 7. Функционал: поиск, механики, контент ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ФУНКЦИОНАЛ')}
  ${heading('Три вещи, которые делают сайт инструментом найма')}
  <div class="cards cards-3" style="margin-top:22px">
    ${card('Интеллектуальный поиск', bullets([
      'Свободный ввод и подсказки в реальном времени',
      '13 фильтров: вахта, переезд, зарплата, график',
      'Пустая выдача → похожие позиции + CTA',
      'Карточка вакансии — краткая и полная, ТОП-10',
    ]))}
    ${card('Игровые механики', bullets([
      'Карьерный маршрут: 5 треков — от рабочего до руководителя',
      'Тест совместимости: 15–20 вопросов, 3–5 минут',
      'Результат — индекс совместимости и рекомендации',
      'Логика теста — вместе с HR ГРК',
    ]))}
    ${card('Контент: кто что делает', bullets([
      'ГРК даёт фото, видео, тексты, буклеты, EVP, вакансии',
      'Мы: сценарии механик, слоганы, переработка текстов',
      'Дизайнер по фото: ретушь, единый стандарт',
      'После запуска ГРК правит контент самостоятельно',
    ]))}
  </div>
  ${footer(7)}
${slideClose()}
`);
}

/* ---- 7. Технологии, интеграции и безопасность ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ПРЕДЛОЖЕННОЕ РЕШЕНИЕ')}
  ${heading('EvolutionCMS — ваш выбор, наша экспертиза', 'Вы чётко обозначили приоритет: EvolutionCMS — и мы его принимаем')}
  <div class="cards cards-3" style="margin-top:22px">
    ${card('Почему EvolutionCMS', `<p class="p">Лёгкость, гибкость, открытый код. Версия 3.x построена на компонентах Laravel — а это наш конёк. Просто поддерживать силами ваших IT-служб после запуска.</p>`)}
    ${card('Наш подход', `<p class="p">Не просто «ставим CMS» — проектируем решение, которое будет жить и развиваться. Все интеграции («Поток», аналитика) — на уровне ядра. Админка — без привлечения IT.</p>`)}
    ${card('Безопасность и 152-ФЗ', `<p class="p">HTTPS, WAF, Fail2ban, 2FA для админки, защита от SQLi/XSS/CSRF, cookie-баннер и согласие в формах. Данные — на серверах ГРК.</p>`)}
  </div>
  <div class="callout" style="margin-top:16px">
    <b>Документация и передача</b> — архитектурные схемы, инструкции администратора и редактора, обучение редакторов ГРК.
  </div>
  ${footer(8)}
${slideClose()}
`);
}

/* ---- 8. Этапы, сроки и стоимость ---- */
{
  const rows = [
    ['Этап 1', 'Утверждение структуры', 'Согласованная карта сайта', '7 дн.', '295 000'],
    ['Этап 2', 'Разработка 3 концепций дизайна', '3 макета на выбор', '14 дн.', '589 000'],
    ['Этап 3', 'Утверждение контента и сценариев', 'Тексты, сценарии игр, путь повествования', '7 дн.', '295 000'],
    ['Этап 4', 'Правки дизайна', 'Не менее 5 итераций, итоговый макет', '14 дн.', '589 000'],
    ['Этап 5', 'Вёрстка', 'Mobile First + Desktop, все страницы', '21 дн.', '884 000'],
    ['Этап 6', 'Бэкенд и интеграции', 'Функционал, интеграция с «Поток»', '28 дн.', '1 180 000'],
    ['Этап 7', 'Игровые механики + ИИ-агент', 'Тесты, рекомендации, чат-бот', '21 дн.', '884 000'],
    ['Этап 8', 'Тестирование', 'Внутреннее, ИБ, финальное', '14 дн.', '589 000'],
    ['Этап 9', 'Запуск', 'Поэтапно: предприятия → полная версия', '7 дн.', '295 000'],
  ];
  slides.push(`
${slideOpen()}
  ${eyebrow('СТОИМОСТЬ')}
  ${heading('Смета по этапам', 'Состав, длительность и стоимость отдельно по каждому этапу — п. 10.3 ТЗ. Цены без НДС')}
  <table class="tbl">
    <thead>
      <tr><th>Этап</th><th>Состав работ</th><th class="r">Срок</th><th class="r">Стоимость без НДС, ₽</th></tr>
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
        <td class="r"><b>3 месяца</b></td>
        <td class="r"><b>5 600 000</b></td>
      </tr>
    </tbody>
  </table>
  <div class="cards cards-3" style="margin-top:10px">
    ${card('Порядок оплаты', bullets([
      '25% — после утверждения дизайн-макета',
      '25% — после завершения разработки (до тестирования)',
      '25% — после успешного завершения тестирования',
      '25% — после запуска, окончат. расчёт за 10 раб. дней',
    ]))}
    ${card('Что входит в цену', `<p class="p">Полный цикл разработки, ИИ-агент для соискателей, контент и сценарии, интеграция с «Поток», инфраструктура и безопасность.</p>`)}
    ${card('Что не входит', `<p class="p">Хостинг и сервер (на стороне ГРК), лицензии на стоковые материалы, рекламные бюджеты, опция «ИИ-рекрутер».</p>`)}
  </div>
  ${footer(9)}
${slideClose()}
`);
}

/* ---- 9. График проекта и поэтапный запуск ---- */
{
  const stages = ['Структура', 'Дизайн-концепции', 'Контент', 'Правки дизайна', 'Вёрстка', 'Бэкенд', 'Механики + ИИ-агент', 'Тестирование', 'Запуск'];
  slides.push(`
${slideOpen()}
  ${eyebrow('СРОКИ')}
  ${heading('3 месяца, два публичных релиза')}
  <div class="timeline">
    <div class="timeline-bar"></div>
    <div class="timeline-steps">
      ${stages.map((s, i) => `<div class="timeline-step"><div class="timeline-dot"></div><div class="timeline-label">${s}</div></div>`).join('')}
    </div>
  </div>
  <div class="cards cards-2" style="margin-top:34px">
    ${card('2,5 месяца — первый релиз', `<p class="p">Страницы 8 предприятий, вакансии, базовый поиск, формы отклика. Сайт готов принимать таргетированный и контекстный трафик — как требует п. 10.2 ТЗ. Запуск начинаем со страниц предприятий.</p>`, { accent: true })}
    ${card('3 месяца — полная версия', `<p class="p">Игровые механики, ИИ-агент, интеллектуальный поиск, интеграция с «Поток», HR-дашборд.</p>`, { accent: true })}
  </div>
  ${footer(10)}
${slideClose()}
`);
}

/* ---- 11. Релевантный опыт — обзор ---- */
{
  const exp = [
    ['Интер РАО', '5 проектов'],
    ['Росатом / Атоммедиа', 'Медиа-платформа'],
    ['КСК', '4 проекта'],
    ['Недвижимость (NDA)', 'Умный поиск'],
    ['Металлургическая компания (NDA)', 'Поиск по базам'],
    ['Телеком (NDA)', 'Генерация материалов'],
  ];
  slides.push(`
${slideOpen()}
  ${eyebrow('РЕЛЕВАНТНЫЙ ОПЫТ')}
  ${heading('Мы делали похожие проекты для лидеров отрасли', 'Корпоративные сайты, порталы и внутренние платформы для крупных компаний с распределённой структурой предприятий')}
  <div class="cards cards-3" style="margin-top:24px">
    ${exp.map(([t, d]) => card(t, `<p class="p">${d}</p>`)).join('')}
  </div>
  ${footer(11)}
${slideClose()}
`);
}

/* ---- 12. Опыт · Интер РАО ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · ИНТЕР РАО')}
  ${heading('Пять проектов для «Интер РАО»', 'Корпоративный сайт и внутренние платформы · реализовано на 1С-Битрикс')}
  <div class="shot-grid" style="margin-top:20px">
    <div class="shot-card shot-wide">
      <img src="${img('ir_konkurs.png')}" />
      <div class="shot-cap"><b>Платформа конкурсов</b><span>100 000+ пользователей, 5 000+ заявок</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('ir_main2.png')}" />
      <div class="shot-cap"><b>Основной сайт компании</b><span>Корпоративный сайт группы, 300 000+ посещений</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('ir_storitelling.png')}" />
      <div class="shot-cap"><b>Сайт-сторителлинг</b><span>20+ электростанций</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('ir_sport.jpg')}" />
      <div class="shot-cap"><b>Спорт-платформа</b><span>14 000 пользователей</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('ir_chgk.png')}" />
      <div class="shot-cap"><b>«Что? Где? Когда?»</b><span>12 700 участников</span></div>
    </div>
  </div>
  <div class="callout" style="margin-top:14px">
    <b>Почему релевантно для ГРК</b> — распределённая структура предприятий, высокая посещаемость и вовлекающие интерактивные механики.
  </div>
  ${footer(12)}
${slideClose()}
`);
}

/* ---- 13. Опыт · КСК ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · КСК')}
  ${heading('4 проекта с КСК', 'Корпоративный сайт, портал для сотрудников и личные кабинеты потребителей · 1С-Битрикс и Битрикс24')}
  <div class="shot-grid shot-grid-3" style="margin-top:20px">
    <div class="shot-card">
      <img src="${img('ksk_main.png')}" />
      <div class="shot-cap"><b>Корпоративный сайт</b><span>Сайт энергосбытовой компании</span></div>
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
  <div class="cards cards-3" style="margin-top:16px">
    ${card('1600+', `<p class="p">Посещений сайта в день</p>`)}
    ${card('500+', `<p class="p">Уникальных дизайн-интерфейсов</p>`)}
    ${card('420+', `<p class="p">Новых страниц в структуре сайта</p>`)}
  </div>
  ${footer(13)}
${slideClose()}
`);
}

/* ---- 14. Опыт · Росатом и NDA-проекты ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · РОСАТОМ И ДРУГИЕ')}
  ${heading('Умный поиск и ИИ-сценарии — наша профильная экспертиза')}
  <div class="shot-grid shot-grid-3" style="margin-top:18px">
    <div class="shot-card">
      <img src="${img('rosatom_1.png')}" />
      <div class="shot-cap"><b>Атоммедиа</b><span>Медиа-платформа, ×7 пользователей</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('metal.png')}" />
      <div class="shot-cap"><b>Металлургия (NDA)</b><span>Поиск быстрее в 3 раза</span></div>
    </div>
    <div class="shot-card">
      <img src="${img('telecom.png')}" />
      <div class="shot-cap"><b>Телеком (NDA)</b><span>Генерация пресс-релизов</span></div>
    </div>
  </div>
  <div class="cards cards-2" style="margin-top:16px">
    ${card('Росатом / Атоммедиа', `<p class="p">Личный кабинет журналиста: рост пользователей ×7, 5000+ ИИ-генераций, 500+ наград.</p>`)}
    ${card('Телеком (NDA)', `<p class="p">Генерация материалов по 89 регионам: подготовка пресс-релиза — с 5 часов до 5 минут.</p>`)}
  </div>
  <div class="callout" style="margin-top:12px">
    <b>Умный поиск и ИИ-сценарии у нас уже в проде</b> — это же ядро интеллектуального поиска вакансий и рекомендаций для ГРК.
  </div>
  ${footer(14)}
${slideClose()}
`);
}

/* ---- 15. Опыт · Недвижимость (NDA) ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЫТ · НЕДВИЖИМОСТЬ (NDA)')}
  ${heading('ИИ-ассистент с умным поиском по базе знаний', 'Название компании под NDA · реализовано на CMS 1С-Битрикс')}
  <div class="shot-grid shot-grid-2" style="margin-top:18px">
    <div class="shot-card shot-card-lg">
      <img src="${img('nedv_news.png')}" />
      <div class="shot-cap"><b>Новости и СМИ о компании</b><span>Сложная многостраничная структура</span></div>
    </div>
    <div class="shot-card shot-card-lg">
      <img src="${img('nedv_hero.png')}" style="object-position:left top" />
      <div class="shot-cap"><b>ИИ-ассистент на главной</b><span>Поисковая строка → диалог в чате</span></div>
    </div>
  </div>
  <div class="cards cards-3" style="margin-top:14px">
    ${card('Сложная структура', `<p class="p">Новости, СМИ о компании, направления деятельности, вакансии и стажировки — всё управляется контент-менеджером.</p>`)}
    ${card('CMS 1С-Битрикс', `<p class="p">Контент вынесен в инфоблоки, редактирование без разработчика.</p>`)}
    ${card('Умный поиск', `<p class="p">Поисковая строка на главной, диалог продолжается в чате. Рост конверсии +20% и 500+ диалогов за 2 месяца.</p>`)}
  </div>
  ${footer(15)}
${slideClose()}
`);
}

/* ---- 16. Команда проекта ---- */
{
  const roles = [
    ['Бизнес-аналитик', 'Структура, CJM по аудиториям, ТЗ на разработку'],
    ['UI/UX-дизайнер', '3 концепции, макеты mobile first и desktop'],
    ['Дизайнер (фото и графика)', 'Обработка съёмок, инфографика, иллюстрации'],
    ['Контент-менеджер', 'Тексты, карточки вакансий, сценарии тестов'],
    ['Frontend-разработчик', 'Адаптивная вёрстка, анимации, карта'],
    ['Backend-разработчик (EvolutionCMS)', 'CMS, поиск, механики, интеграции'],
    ['QA-инженер', 'Тестирование, приёмка, устранение замечаний'],
    ['DevOps / инженер по ИБ', 'Сервер, WAF, Fail2ban, 152-ФЗ'],
  ];
  slides.push(`
${slideOpen()}
  ${eyebrow('КОМАНДА ПРОЕКТА')}
  ${heading('Кто будет работать над проектом', 'Штатная команда. Контент-менеджер и дизайнер по обработке фото — отдельные роли, как требует ТЗ')}
  <div class="callout callout-strong" style="margin-top:22px">
    <b>Выделенный проектный менеджер</b> — единая точка входа и контроль сроков по всем 9 этапам
  </div>
  <div class="cards cards-4" style="margin-top:16px">
    ${roles.map(([t, d]) => card(t, `<p class="p">${d}</p>`)).join('')}
  </div>
  ${footer(16)}
${slideClose()}
`);
}

/* ---- 17. Опция: ИИ-рекрутер ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ОПЦИЯ · СВЕРХ БАЗОВОЙ СТОИМОСТИ')}
  ${heading('ИИ-рекрутер — цифровой помощник HR-службы', 'Автономный ассистент берёт на себя до 80% рутинных задач подбора — от скрининга резюме до помощи на финальном собеседовании')}
  <div class="cards cards-4" style="margin-top:20px">
    ${card('Скрининг резюме', `<p class="p">Парсинг любых форматов, скоринг, ранжированный шорт-лист лучших кандидатов.</p>`)}
    ${card('Интервью 24/7', `<p class="p">Текстовые и голосовые собеседования, адаптация вопросов под вакансию, анализ ответов.</p>`)}
    ${card('Психологический профиль', `<p class="p">Модель OCEAN, анализ soft skills через игры и тесты, цифровое досье кандидата.</p>`)}
    ${card('HR-аналитика', `<p class="p">Дашборд конверсии, время закрытия вакансий, прогноз эффективности найма.</p>`)}
  </div>
  <div class="cards cards-3" style="margin-top:14px">
    ${card('Эффект', `<p class="p">Сокращение цикла подбора до 40%, снижение нагрузки на рекрутеров до 70% по рутинным задачам.</p>`)}
    ${card('Технически', `<p class="p">Интеграция с «Поток», векторная база данных на серверах ГРК, LLM-движок — российская или open-source модель.</p>`)}
    ${card('Статус', `<p class="p">Не входит в базовую стоимость. Стоимость и сроки — отдельно, после утверждения базовой версии сайта.</p>`, { accent: true })}
  </div>
  ${footer(17)}
${slideClose()}
`);
}

/* ---- 18. Следующие шаги ---- */
{
  slides.push(`
${slideOpen()}
  ${eyebrow('ЧТО ДАЛЬШЕ')}
  ${heading('Следующие шаги')}
  <div class="cards cards-3" style="margin-top:22px">
    ${card('Ответы на вопросы', `<p class="p">Готовы предоставить дополнительные материалы: детальную дорожную карту, примеры портфолио, архитектурные схемы.</p>`)}
    ${card('Участие в переговорах', `<p class="p">После отбора готовы к конструктивному диалогу по цене и условиям.</p>`)}
    ${card('Старт проекта', `<p class="p">Сразу после подписания договора приступаем к этапу 1.</p>`, { accent: true })}
  </div>
  <div class="callout" style="margin-top:16px">
    Мы хотим, чтобы «Твоя история начиналась здесь» — и готовы помочь вам её написать.
  </div>
  ${footer(18)}
${slideClose()}
`);
}

/* ---- 18. Контакты ---- */
{
  slides.push(`
${slideOpen('dark')}
  <div class="blob blob-a"></div>
  <div class="blob blob-b"></div>
  <div class="logo-badge"><img src="${img('logo_air.png')}" alt="AIR" /></div>
  <h1 class="h1 h1-title" style="margin-top:210px">Готовы приступить<br/><span class="accent-text">сразу после подписания договора</span></h1>
  <p class="subtitle subtitle-dark" style="max-width:760px">Смета и сроки зафиксированы по каждому из 9 этапов. Срок действия предложения — 90 календарных дней.</p>
  <div class="title-footer">
    <div class="tf-cols">
      <div><div class="tf-label">КОНТАКТ</div><div class="tf-strong">Лицин Владислав</div></div>
      <div><div class="tf-label">ТЕЛЕФОН</div><div class="tf-strong">+7 (495) 247-50-54</div></div>
      <div><div class="tf-label">ПОЧТА</div><div class="tf-strong">info@airelations.io</div></div>
    </div>
  </div>
  <div class="tf-bottomline">ООО «КСИИ» · тендер 4543735 · b2b-center.ru</div>
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

.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: #F0EDFC; border: 1px solid ${CARD_BORDER}; color: ${ACCENT};
  border-radius: 20px; padding: 6px 14px; font-size: 11px; font-weight: 700;
  letter-spacing: 1.4px; text-transform: uppercase; margin-top: 0;
}
.eyebrow-dark { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.24); color: #C8BEFF; }
.eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; display: inline-block; }

.h1 { font-size: 32px; font-weight: 800; line-height: 1.18; margin: 14px 0 6px; letter-spacing: -0.3px; }
.h1-title { font-size: 40px; margin-top: 20px; line-height: 1.2; }
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
.toc-grid { margin-top: 16px; display: grid; grid-template-columns: 1fr; gap: 6px; }
.toc-item {
  display: flex; align-items: center; gap: 16px;
  background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 10px;
  padding: 8px 18px;
}
.toc-num {
  width: 26px; height: 26px; border-radius: 50%; background: ${ACCENT}; color: #fff;
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex: none;
}
.toc-body { flex: 1; }
.toc-title { font-weight: 700; font-size: 13.5px; color: ${INK}; }
.toc-desc { font-size: 10.5px; color: ${MUTED}; margin-top: 1px; }
.toc-page { font-size: 12px; font-weight: 700; color: ${ACCENT}; white-space: nowrap; }

/* path row (slide 5) */
.path-row { display: flex; align-items: center; margin-top: 26px; gap: 6px; }
.path-step { flex: 1; background: ${CARD_BG}; border: 1px solid ${CARD_BORDER}; border-radius: 12px; padding: 14px 12px; text-align: center; }
.path-num { width: 24px; height: 24px; border-radius: 50%; background: ${ACCENT}; color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; }
.path-text { font-size: 11.5px; color: ${INK}; font-weight: 600; line-height: 1.3; }
.path-arrow { color: ${ACCENT}; font-size: 16px; flex: none; }

/* table (slide 8) */
.tbl { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
.tbl thead th { background: ${INK}; color: #fff; text-align: left; padding: 6px 14px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.6px; font-weight: 700; }
.tbl thead th.r { text-align: right; }
.tbl tbody td { padding: 4.5px 14px; border-bottom: 1px solid ${LINE}; color: ${INK}; line-height: 1.25; }
.tbl tbody tr:nth-child(even) { background: #FAF9FE; }
.tbl .tbl-stage { color: ${ACCENT}; font-weight: 700; white-space: nowrap; }
.tbl .tbl-sub { color: ${MUTED}; font-size: 11px; }
.tbl .r { text-align: right; }
.tbl .b { font-weight: 700; }
.tbl-total td, .tbl-total td b { background: ${INK}; color: #fff !important; border-bottom: none; padding: 7px 14px; }

/* timeline (slide 9) */
.timeline { margin-top: 40px; position: relative; }
.timeline-bar { height: 6px; border-radius: 3px; background: linear-gradient(90deg, ${ACCENT_DARK}, ${ACCENT}, #C9BEFF); }
.timeline-steps { display: flex; justify-content: space-between; margin-top: 14px; }
.timeline-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
.timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: ${ACCENT}; margin-top: -25px; border: 3px solid #fff; box-shadow: 0 0 0 1px ${CARD_BORDER}; }
.timeline-label { font-size: 11px; color: ${MUTED}; margin-top: 8px; text-align: center; }

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
<title>КП — Карьерный сайт ГРК</title>
<style>${css}</style>
</head>
<body>
${slides.join('\n')}
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'deck.html'), html);
console.log('deck.html built,', slides.length, 'slides');
