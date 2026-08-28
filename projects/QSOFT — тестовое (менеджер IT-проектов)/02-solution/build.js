const d = require('docx');
const fs = require('fs');
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,WidthType,ShadingType,AlignmentType,BorderStyle,PageOrientation,LevelFormat,VerticalAlign,PageBreak} = d;

const FIO = 'Лицин Владислав Владимирович';
const C = { head:'C00000', headTxt:'FFFFFF', zebra:'F5F5F5', bar:'8EA9DB', crit:'C00000', trip:'70AD47', mile:'FFC000', line:'BFBFBF' };

const B = () => ({top:{style:BorderStyle.SINGLE,size:4,color:C.line},bottom:{style:BorderStyle.SINGLE,size:4,color:C.line},left:{style:BorderStyle.SINGLE,size:4,color:C.line},right:{style:BorderStyle.SINGLE,size:4,color:C.line}});
const P = (t,o={}) => new Paragraph({spacing:{after:o.after==null?60:o.after,before:o.before||0},alignment:o.al,children:[new TextRun({text:t||'',bold:o.b,italics:o.i,size:o.sz||20,color:o.color,font:'Calibri'})]});
const cell = (t,o={}) => new TableCell({width:{size:o.w,type:WidthType.DXA},shading:o.fill?{type:ShadingType.CLEAR,fill:o.fill,color:'auto'}:undefined,verticalAlign:VerticalAlign.CENTER,margins:{top:16,bottom:16,left:70,right:70},borders:B(),children:[P(t,{after:0,b:o.b,al:o.al,sz:o.sz||18,color:o.color})]});
const H = (t,lvl) => new Paragraph({heading:lvl,spacing:{before:170,after:100},children:[new TextRun({text:t,font:'Calibri'})]});
const bullet = (t) => new Paragraph({numbering:{reference:'bul',level:0},spacing:{after:36},children:[new TextRun({text:t,size:20,font:'Calibri'})]});

const table = (widths,rows) => new Table({columnWidths:widths,width:{size:widths.reduce((a,b)=>a+b,0),type:WidthType.DXA},rows});
const headRow = (widths,labels) => new TableRow({tableHeader:true,children:labels.map((l,i)=>cell(l,{w:widths[i],b:true,fill:C.head,color:C.headTxt,al:AlignmentType.CENTER}))});

/* ---------------- ГАНТА ---------------- */
const T = (n,name,s,f,dep,who,kind) => ({n:n,name:name,s:new Date(s),f:new Date(f),dep:dep,who:who,kind:kind});
const tasks = [
  T(1,'Вводные: даты, маршрут, потолок бюджета','2026-09-01','2026-09-03','—','Владислав','crit'),
  T(2,'Проверка загранпаспортов: запас 6 месяцев','2026-09-01','2026-09-04','—','Оба','crit'),
  T(3,'Правила въезда и сроки безвизового пребывания','2026-09-03','2026-09-07','1, 2','Владислав',''),
  T(4,'Покупка авиабилетов Москва — Стамбул','2026-09-05','2026-09-19','2, 3','Владислав','crit'),
  T(5,'Веха: авиабилеты выкуплены','2026-09-19','2026-09-19','4','Владислав','mile'),
  T(6,'Жильё в Стамбуле, 8 ночей','2026-09-08','2026-09-22','4','Друг',''),
  T(7,'Жильё в Каппадокии, 5 ночей','2026-09-08','2026-09-22','4','Владислав',''),
  T(8,'Перелёт Стамбул — Кайсери и обратно','2026-09-20','2026-09-26','5','Владислав','crit'),
  T(9,'Трансферы аэропорт — отель','2026-09-24','2026-10-02','8','Друг',''),
  T(10,'Бронь полёта на шаре и экскурсий','2026-09-28','2026-10-10','7','Владислав',''),
  T(11,'Оформление страховки ВЗР на двоих','2026-10-12','2026-10-16','5','Друг',''),
  T(12,'Платёжный контур: карта и наличные','2026-10-12','2026-10-30','1','Владислав','crit'),
  T(13,'Аптечка и рецептурные препараты','2026-10-19','2026-10-23','—','Оба',''),
  T(14,'План по дням, карты, все брони в одном файле','2026-10-26','2026-11-06','6, 7, 9, 10','Владислав','crit'),
  T(15,'Веха: план согласован с другом','2026-11-09','2026-11-09','14','Оба','mile'),
  T(16,'Онлайн-регистрация и сборы','2026-11-09','2026-11-14','15','Оба','crit'),
  T(17,'Веха: вылет','2026-11-15','2026-11-15','16','—','mile'),
  T(18,'Поездка','2026-11-15','2026-11-29','17','Оба','trip'),
  T(19,'Ретроспектива: факт против плана','2026-11-30','2026-12-02','18','Владислав','')
];
const day = 86400000;
const monday = function(dt){var x=new Date(dt);var w=(x.getUTCDay()+6)%7;return new Date(x.getTime()-w*day);};
const start = monday(new Date(Math.min.apply(null,tasks.map(function(t){return +t.s;}))));
const end   = new Date(Math.max.apply(null,tasks.map(function(t){return +t.f;})));
const nWeeks = Math.round((monday(end)-start)/(7*day))+1;
const weeks = Array.from({length:nWeeks},function(_,i){return new Date(+start+i*7*day);});
const dd = function(x){return String(x.getUTCDate()).padStart(2,'0')+'.'+String(x.getUTCMonth()+1).padStart(2,'0');};
const days = function(t){return Math.round((t.f-t.s)/day)+1;};

const gFixed = [3300,760,760,520,900,900];
const wkTotal = 15038 - gFixed.reduce(function(a,b){return a+b;},0);
const wkW = Math.floor(wkTotal/nWeeks);
const gW = gFixed.concat(Array(nWeeks).fill(wkW));

const gHead = new TableRow({tableHeader:true,children:[].concat(
  ['№ / Задача','Начало','Оконч.','Дн.','Зависит','Ответств.'].map(function(l,i){return cell(l,{w:gFixed[i],b:true,fill:C.head,color:C.headTxt,al:AlignmentType.CENTER,sz:16});}),
  weeks.map(function(w){return cell(dd(w),{w:wkW,b:true,fill:C.head,color:C.headTxt,al:AlignmentType.CENTER,sz:12});}))});

const gRows = tasks.map(function(t,idx){
  const fillFor = t.kind==='crit'?C.crit:t.kind==='mile'?C.mile:t.kind==='trip'?C.trip:C.bar;
  const zeb = idx%2 ? C.zebra : undefined;
  return new TableRow({children:[].concat([
    cell(t.n+'. '+t.name,{w:gFixed[0],fill:zeb,sz:16,b:t.kind==='mile'}),
    cell(dd(t.s),{w:gFixed[1],fill:zeb,al:AlignmentType.CENTER,sz:16}),
    cell(dd(t.f),{w:gFixed[2],fill:zeb,al:AlignmentType.CENTER,sz:16}),
    cell(String(days(t)),{w:gFixed[3],fill:zeb,al:AlignmentType.CENTER,sz:16}),
    cell(t.dep,{w:gFixed[4],fill:zeb,al:AlignmentType.CENTER,sz:16}),
    cell(t.who,{w:gFixed[5],fill:zeb,al:AlignmentType.CENTER,sz:16})],
    weeks.map(function(w){var we=new Date(+w+6*day); var on = t.s<=we && t.f>=w; return cell('',{w:wkW,fill:on?fillFor:zeb});}))});
});

/* ---------------- БЮДЖЕТ ---------------- */
const budget = [
  ['Перелёты','Москва — Стамбул, 2 чел.','2 × 24 000','48 000','Ноябрь, низкий сезон; прямой рейс'],
  ['Перелёты','Кайсери — Стамбул — Москва, 2 чел.','2 × 28 000','56 000','Обратный со внутренней стыковкой'],
  ['Перелёты','Стамбул — Кайсери, 2 чел.','2 × 6 000','12 000','Местный лоукостер'],
  ['Проживание','Стамбул, 8 ночей','8 × 9 000','72 000','5 ночей в начале и 3 в конце'],
  ['Проживание','Каппадокия, 5 ночей','5 × 8 000','40 000','Отель в пещерном формате'],
  ['Активности','Полёт на воздушном шаре, 2 чел.','2 × 22 000','44 000','Главная цель поездки, бронь заранее'],
  ['Активности','Экскурсии, музеи, входные билеты','—','30 000','Оценка по шести объектам'],
  ['Питание','14 дней на двоих','28 × 3 500','98 000','Средний чек, без высокой кухни'],
  ['Транспорт','Трансферы, местный транспорт, авто на 2 дня','—','20 000',''],
  ['Прочее','Страховка ВЗР, 2 чел.','2 × 3 500','7 000','Покрытие 50 000 €, активный отдых'],
  ['Прочее','Мобильная связь: eSIM, 2 чел.','2 × 1 500','3 000',''],
  ['Прочее','Сувениры, личные траты','—','20 000','']
];
const direct = budget.reduce(function(a,r){return a+Number(r[3].replace(/\s/g,''));},0);
const reserve = Math.round(direct*0.12/1000)*1000;
const total = direct + reserve;
const money = function(n){return n.toLocaleString('ru-RU').replace(/ /g,' ');};

const bW = [1700,4600,1700,1700,5338];
const bRows = [headRow(bW,['Статья','Позиция','Расчёт','Сумма, ₽','Комментарий'])];
budget.forEach(function(r,i){bRows.push(new TableRow({children:r.map(function(v,j){return cell(v,{w:bW[j],fill:i%2?C.zebra:undefined,al:(j>=2&&j<4)?AlignmentType.CENTER:undefined});})}));});
const totRow=function(l,v,fill){return new TableRow({children:[
  new TableCell({width:{size:bW[0]+bW[1]+bW[2],type:WidthType.DXA},columnSpan:3,borders:B(),shading:{type:ShadingType.CLEAR,fill:fill,color:'auto'},margins:{top:40,bottom:40,left:80,right:80},children:[P(l,{after:0,b:true,sz:18})]}),
  cell(money(v),{w:bW[3],b:true,fill:fill,al:AlignmentType.CENTER}),
  cell('',{w:bW[4],fill:fill})]});};
bRows.push(totRow('Прямые расходы, итого',direct,'E8E8E8'));
bRows.push(totRow('Резерв на непредвиденное, 12 %',reserve,'E8E8E8'));
bRows.push(totRow('ИТОГО НА ДВОИХ',total,'FFD9D9'));
bRows.push(totRow('На одного человека',total/2,'FFD9D9'));

/* ---------------- РИСКИ ---------------- */
const risks = [
  ['R1','Резкий рост цен на авиабилеты до момента покупки','Средняя','Высокое','Высокий','Купить билеты в первые три недели плана, до пика спроса; настроить оповещения о цене; при превышении потолка на 20 % сдвигаем даты в пределах ноября','Владислав','Цена выросла на 15 % от целевой'],
  ['R2','Загранпаспорт участника заканчивается раньше чем через 6 месяцев','Низкая','Критическое','Высокий','Проверка сроков в первый день планирования, до любых оплат; при риске — подача на новый паспорт с запасом в 2 месяца','Оба','Срок действия менее 8 месяцев на дату возврата'],
  ['R3','Отказ или сбой платежа российской картой за рубежом','Высокая','Высокое','Критический','Заранее оформить платёжный инструмент, работающий в стране; везти наличными 30 % бюджета; ключевые брони оплатить до вылета','Владислав','Тестовый платёж не проходит'],
  ['R4','Отмена полёта на шаре из-за погоды','Высокая','Среднее','Высокий','Ставить полёт на второй день в Каппадокии, оставляя три дня на перенос; выбирать оператора с бесплатным переносом и возвратом','Владислав','Прогноз ветра выше 8 м/с'],
  ['R5','Срыв внутренней стыковки Кайсери — Стамбул перед вылетом домой','Средняя','Критическое','Критический','Не брать единый билет со стыковкой менее 4 часов; заложить ночь в Стамбуле перед обратным рейсом','Владислав','Задержка внутреннего рейса более часа'],
  ['R6','Болезнь одного из участников до или во время поездки','Средняя','Высокое','Высокий','Страховка ВЗР с покрытием 50 000 €; возвратные тарифы на жильё; аптечка с рецептурными препаратами и выписками','Оба','Симптомы за 5 дней до вылета'],
  ['R7','Расхождение ожиданий с другом по темпу и наполнению поездки','Средняя','Среднее','Средний','План по дням фиксируем письменно и согласуем до оплат; в каждом городе один день без программы; договорённость о раздельных активностях','Оба','Возражения на этапе согласования плана'],
  ['R8','Отмена брони жилья со стороны хозяина в последний момент','Низкая','Высокое','Средний','Бронировать через площадку с гарантией и рейтингом; держать по два запасных варианта на город','Друг','Хозяин не подтверждает бронь за 14 дней'],
  ['R9','Перерасход бюджета в поездке','Высокая','Среднее','Высокий','Резерв 12 % отдельной строкой; общий кошелёк на совместные траты; сверка расходов раз в три дня; резерв расходуется только по согласию обоих','Владислав','Пройдено 60 % бюджета до середины срока'],
  ['R10','Утрата документов или телефона в поездке','Низкая','Высокое','Средний','Сканы документов в облаке и офлайн у обоих; бумажная копия брони; контакты консульства в заметках','Оба','—']
];
const rW = [500,3350,880,1220,1050,4750,1108,2180];
const rRows = [headRow(rW,['ID','Риск','Вероят.','Влияние','Уровень','Митигация','Владелец','Триггер'])];
risks.forEach(function(r,i){
  var lvl=r[4]; var lf = lvl==='Критический'?'FFC7CE':lvl==='Высокий'?'FFE0B2':'FFF2CC';
  rRows.push(new TableRow({children:r.map(function(v,j){return cell(v,{w:rW[j],fill:j===4?lf:(i%2?C.zebra:undefined),al:(j===0||j===2||j===3||j===4)?AlignmentType.CENTER:undefined,b:j===4});})}));
});
const probs=['Высокая','Средняя','Низкая'], imps=['Среднее','Высокое','Критическое'];
const mW=[3038,4000,4000,4000];
const mapRows=[new TableRow({tableHeader:true,children:[cell('Вероятность / Влияние',{w:mW[0],b:true,fill:C.head,color:C.headTxt,al:AlignmentType.CENTER})].concat(imps.map(function(i){return cell(i,{w:mW[1],b:true,fill:C.head,color:C.headTxt,al:AlignmentType.CENTER});}))})];
probs.forEach(function(p){
  mapRows.push(new TableRow({children:[cell(p,{w:mW[0],b:true,fill:'E8E8E8',al:AlignmentType.CENTER})].concat(
    imps.map(function(im,k){var ids=risks.filter(function(r){return r[2]===p&&r[3]===im;}).map(function(r){return r[0];}).join(', ');
      var score=(p==='Высокая'?3:p==='Средняя'?2:1)*(k+1);
      var f = score>=6?'FFC7CE':score>=4?'FFE0B2':'E2EFDA';
      return cell(ids||'—',{w:mW[1],fill:f,al:AlignmentType.CENTER,b:true});}))}));
});

const legendRow = function(items){return new Table({columnWidths:items.map(function(){return [300,3459];}).reduce(function(a,b){return a.concat(b);},[]),width:{size:15038,type:WidthType.DXA},rows:[new TableRow({children:items.map(function(it){return [cell('',{w:300,fill:it[0]}),cell(it[1],{w:3459,sz:16})];}).reduce(function(a,b){return a.concat(b);},[])})]});};
const introW = [3000,12000];
const introRows = [headRow(introW,['Параметр','Значение'])].concat([
  ['Маршрут','Москва → Стамбул (5 ночей) → Каппадокия (5 ночей) → Стамбул (3 ночи) → Москва'],
  ['Даты поездки','15–29 ноября 2026, 14 дней и 13 ночей'],
  ['Старт подготовки','1 сентября 2026 — за 10,5 недель до вылета'],
  ['Участники','Двое. Я веду планирование и контроль, друг закрывает часть задач и согласует решения'],
  ['Потолок бюджета','550 000 ₽ на двоих, договорённость достигнута до начала оплат'],
  ['Ключевая цель поездки','Полёт на воздушном шаре в Каппадокии — вокруг неё строится расписание'],
  ['Формат управления','Общий файл с планом и бронями, сверка статуса раз в неделю']
].map(function(r,i){return new TableRow({children:r.map(function(v,j){return cell(v,{w:introW[j],fill:i%2?C.zebra:undefined,b:j===0});})});}));

const doc = new Document({
  creator:FIO, title:'Тестовое задание на позицию «Менеджер IT-проектов» — QSOFT',
  numbering:{config:[{reference:'bul',levels:[{level:0,format:LevelFormat.BULLET,text:'—',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:360,hanging:200}}}}]}]},
  styles:{default:{document:{run:{font:'Calibri',size:22}}},
    paragraphStyles:[
      {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:30,bold:true,color:'C00000',font:'Calibri'}},
      {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:24,bold:true,color:'404040',font:'Calibri'}}]},
  sections:[
  { properties:{page:{size:{orientation:PageOrientation.LANDSCAPE},margin:{top:520,bottom:300,left:900,right:900}}}, children:[
    new Paragraph({spacing:{after:0},children:[new TextRun({text:'QSOFT',bold:true,size:40,color:'C00000',font:'Calibri'})]}),
    new Paragraph({spacing:{after:300},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:C.line}},children:[new TextRun({text:'101000, Россия, Москва, Покровский бульвар, 4/17, стр. 1',size:18,color:'808080',font:'Calibri'})]}),
    new Paragraph({spacing:{after:80},children:[new TextRun({text:'Тестовое задание на позицию: менеджер IT-проектов',bold:true,size:36,font:'Calibri'})]}),
    new Paragraph({spacing:{after:400},children:[new TextRun({text:'Кандидат: '+FIO,size:24,color:'404040',font:'Calibri'})]}),

    H('Текст задания','Heading1'),
    P('Мы в QSOFT ценим в своих сотрудниках навык поиска решений для нестандартных задач — нам важно понять ваш подход к работе и решению задач.',{i:true,after:160}),
    P('Кейс:',{b:true}),
    P('Вы с другом собираетесь в отпуск, вы совместно определили даты и маршрут поездки. Так как вы уже опытный управленец, вы решили взять планирование на себя.',{after:160}),
    P('Задача:',{b:true}),
    P('Вам необходимо организовать отпуск и подготовить:'),
    bullet('диаграмму Ганта процесса подготовки отпуска (не прикреплять картинкой в задание);'),
    bullet('бюджет отпуска;'),
    bullet('матрицу рисков и план их митигации.'),

    H('Ответ','Heading1'),
    H('1. Вводные, которые я зафиксировал','Heading2'),
    P('Параметров поездки в задании нет — я зафиксировал их сам. Записанное допущение можно оспорить по одному пункту. Невысказанное приходится оспаривать вместе со всем планом.',{after:140}),
    table(introW,introRows),
    P('',{after:120}),
    P('Друг здесь не исполнитель, а вторая сторона: у него свои задачи и право вето на общие решения. Отсюда веха согласования в плане и правило, что резерв тратится только по согласию обоих.',{after:120}),
    H('2. Диаграмма Ганта: подготовка отпуска','Heading1'),
    P('Таблица Word, не картинка. Строка — задача, заливка справа — недели, на которые она приходится. Красным выделен критический путь: сдвиг любой из этих задач сдвигает вылет.',{after:140}),
    table(gW,[gHead].concat(gRows)),
    P('',{after:100}),
    legendRow([[C.crit,'Критический путь'],[C.bar,'Задача с запасом по срокам'],[C.mile,'Веха — точка контроля'],[C.trip,'Поездка']]),
    P('',{after:90}),
    P('Логика плана, коротко:',{b:true,after:80}),
    bullet('Документы проверяем в первый день, до оплат. Просроченный паспорт в сентябре стоит поездки в МФЦ. В ноябре — стоит поездки.'),
    bullet('Билеты берём раньше жилья: они дорожают быстрее и задают все остальные даты.'),
    bullet('Между готовым планом 6 ноября и вылетом 15-го — буфер в девять дней. На переносы и то, что всплывёт.'),
    bullet('Полёт на шаре — на второй день в Каппадокии. Останется три дня на перенос по погоде, а отменяют их часто.'),
    H('3. Бюджет отпуска','Heading1'),
    P('На двоих, в рублях, по ценам ноября. Резерв вынесен отдельной строкой: это не «запас на всякий случай», а часть бюджета со своим правилом расходования.',{after:140}),
    table(bW,bRows),
    P('',{after:90}),
    P('Как я управляю этим бюджетом:',{b:true,after:80}),
    bullet('Резерв ' + money(reserve) + ' ₽ тратится по согласию обоих и только на риски из матрицы ниже. Остался — делим пополам после поездки.'),
    bullet('Общие траты — из общего кошелька, личные каждый несёт сам. Снимает большую часть бытовых споров.'),
    bullet('Контрольная точка: потратили больше 60 % к середине поездки — режем рестораны и экскурсии, а не двигаем обратный билет.'),
    bullet('Треть бюджета везём наличными — прямое следствие риска R3.'),
    bullet('После поездки сверяем план с фактом — чтобы следующая оценка была точнее.'),

    H('4. Матрица рисков и план митигации','Heading1'),
    H('4.1. Карта рисков','Heading2'),
    P('Уровень риска — вероятность на влияние. Красная зона меняет план, жёлтая требует наблюдения, зелёную принимаем как есть.',{after:120}),
    table(mW,mapRows),
    P('',{after:160}),
    H('4.2. Реестр рисков','Heading2'),
    table(rW,rRows),
    P('',{after:90}),
    P('Принципы, по которым составлена матрица:',{b:true,after:80}),
    bullet('У каждого риска есть владелец. Риск без владельца не управляется, он просто записан.'),
    bullet('У каждого есть триггер — событие, по которому включается план Б. Без триггера митигация остаётся благим намерением.'),
    bullet('Два критических риска, R3 и R5, закрыты переделкой плана, а не смягчением: платёжный контур готовим заранее, перед обратным рейсом ночуем в Стамбуле. Дороже — зато убирает сценарий, где поездка срывается целиком.'),
    bullet('R7 — расхождение ожиданий с другом — риск управленческий, а не логистический. Спор о темпе поездки дешевле провести в сентябре по переписке, чем на четвёртый день в Стамбуле.'),

    H('5. Главное','Heading1'),
    P('Девятнадцать задач на отпуск вдвоём выглядят избыточно. Но структура та же, что в IT-проекте: критический путь держит дату, деньги и документы проверяются до старта, у каждого риска есть владелец. Разница только в цене ошибки.',{after:100}),
    P('План ценен не тем, что всё пойдёт по нему. Что-то сломается обязательно: шар не полетит, рейс задержат. Ценно то, что к этому моменту решение уже принято, а деньги на него отложены.',{after:100})
  ]}]});

Packer.toBuffer(doc).then(function(b){fs.writeFileSync(process.argv[2],b);console.log('ok',b.length,'weeks:',nWeeks,'direct:',direct,'reserve:',reserve,'total:',total);});
