# Сборка макетов в Figma через `use_figma`

Ловушки Plugin API и готовые хелперы. Каждый пункт раздела «Ловушки» однажды стоил
отдельного цикла правок — читай до первого скрипта, а не после.

---

## Ловушки

### 1. `createAutoLayout()` создаёт фрейм с БЕЛОЙ заливкой по умолчанию

Самая дорогая из всех. На светлых секциях незаметно, а на тёмном фоне вылезают белые
прямоугольники: полоса кнопок, колонка текста, обёртки строк.

```js
const row = figma.createAutoLayout('HORIZONTAL');
row.fills = [];   // ← обязательно для любой служебной обёртки
```

Если поймал поздно — вычистить пачкой, сохранив осмысленно белые поверхности:

```js
const KEEP=/^(Card|Doctor|Stat|Tile|Step|Review|Chip|Item|Button|Form|State|Notice|Table|input|Accordion|FAQ|Grid|⟨)/;
const isWhite=f=>f&&f.type==='SOLID'&&f.color.r>0.88&&f.color.g>0.88&&f.color.b>0.88;
for(const n of sec.findAll(x=>x.type==='FRAME')){
  if(KEEP.test(n.name)) continue;
  if(isWhite((n.fills||[])[0])) n.fills=[];
}
```

⚠️ Строки таблиц заливаются белым осознанно — не вычищай их вслепую.

### 2. `resize(w, h)` фиксирует ОБЕ оси → текст обрезается

Приём «задать ширину колонки через `resize(280, 10)`» оставляет высоту 10 px, и текст
вылезает за границу контейнера.

```js
const col = figma.createAutoLayout('VERTICAL');
row.appendChild(col);
col.layoutSizingHorizontal = 'FIXED';
col.resize(280, 10);
col.layoutSizingVertical = 'HUG';   // ← вернуть высоту по контенту
```

Проверка после сборки — в `quality-gates.md`.

### 3. Карточки в сетке разной высоты

Дети сетки по умолчанию тянутся по своему контенту, и низы в строке не совпадают.

```js
card.layoutSizingVertical = 'FILL';   // не 'HUG'
```

Работает и в обычном горизонтальном auto-layout, и в `layoutWrap='WRAP'`.

### 4. Отрицательный padding запрещён

`paddingTop = -7` роняет скрипт целиком. Для выключки маркера списка по базовой линии
оборачивай маркер в контейнер с положительным отступом:

```js
const dotWrap = figma.createAutoLayout('VERTICAL', {name:'dot'});
dotWrap.paddingTop = 9;            // подгон под line-height текста
dotWrap.appendChild(dot);
```

### 5. Переносимый текст схлопывается в нитку

`layoutSizingHorizontal='FILL'` сам по себе игнорируется в режиме `WIDTH_AND_HEIGHT`.
Порядок строго такой:

```js
parent.appendChild(t);
t.textAutoResize = 'HEIGHT';
t.layoutSizingHorizontal = 'FILL';
```

### 6. Аннотации Dev Mode недоступны

`node.annotations = [...]` падает с `you don't have permission to edit annotations on this
file`. Комментарии Plugin API тоже не создаёт.

Решение: видимые плашки внутри макета — пунктирная рамка, цвет, отличный от контента,
имя слоя `⟨Аннотация⟩ …`. Плюс отдельный фрейм-документ с полными примерами.

### 7. Мелочи, которые ломают скрипт

| Что | Как правильно |
|---|---|
| `figma.currentUser` | Не поддерживается, роняет весь скрипт |
| `figma.notify()` | Не реализован |
| `figma.currentPage = page` | Только `await figma.setCurrentPageAsync(page)` |
| Цвета | Диапазон 0–1, не 0–255 |
| Прозрачность | На уровне paint (`opacity`), не в `color.a` |
| Стиль Roboto | `'SemiBold'` слитно. У Inter — `'Semi Bold'` раздельно |
| `layoutSizingVertical` | `'FIXED' / 'HUG' / 'FILL'`. `'AUTO'` — это другой энум |
| Новые узлы верхнего уровня | Позиционировать вручную, иначе все лягут в (0,0) |

### 8. Квота MCP

План Starter: **≈20 вызовов на окно**, окно похоже на суточное. Копия файла внутри того же
аккаунта не помогает — лимит на команду, не на файл. Смена аккаунта помогает.

Отсюда правило: **один вызов = один смысловой кусок макета**, не одна правка.
Скриншот делай в том же вызове, что и сборку (`await node.screenshot({scale:0.3})`),
а не отдельным.

Симптомы различаются:
- `tool call limit` — аккаунт верный, квота исчерпана
- `you don't have edit access` — не тот аккаунт или нет прав на файл

---

## Изображения

`upload_assets` с `nodeId` работает только при `count: 1`. Для десятков узлов —
загрузить один раз без `nodeId`, забрать `imageHash` и переиспользовать:

```bash
# 1. получить N submitUrl через upload_assets
curl -s -F "file=@photo.png;type=image/png" "<submitUrl>"
# → {"success":true,"imageHash":"701837a8...","placedOnNodeId":"2002:2"}
```

```js
// 2. проставить на все нужные узлы
rect.fills = [{ type:'IMAGE', scaleMode:'FILL', imageHash:'701837a8...' }];
// 3. удалить временные фреймы, созданные загрузкой
```

Выгрузка обратно: `download_assets` с `defaultFormat: 'pdf'` даёт векторный PDF фрейма.
Ссылки живут минуты — качай сразу.

---

## Базовый набор хелперов

Контекст между вызовами `use_figma` не сохраняется — хелперы включаются в каждый скрипт.

```js
const hex = h => ({r:parseInt(h.slice(1,3),16)/255, g:parseInt(h.slice(3,5),16)/255, b:parseInt(h.slice(5,7),16)/255});
const SOLID = c => [{type:'SOLID', color:c}];
const AL = (d,o={}) => figma.createAutoLayout(d,o);
function pad(n,t,r,b,l){n.paddingTop=t;n.paddingRight=r;n.paddingBottom=b;n.paddingLeft=l;return n;}

function T(ch,o={}){
  const t=figma.createText();
  t.fontName={family:'Roboto',style:o.w||'Regular'};
  t.characters=ch;
  t.fontSize=o.s||16;
  t.lineHeight={unit:'PERCENT',value:o.lh||150};
  t.fills=SOLID(o.c||C.sec);
  t.name=ch.slice(0,42);
  return t;
}
function addT(p,ch,o={}){
  const t=T(ch,o); p.appendChild(t);
  t.textAutoResize='HEIGHT'; t.layoutSizingHorizontal='FILL';
  return t;
}
function section(root,o={}){
  const s=AL('VERTICAL',{name:o.name,itemSpacing:o.gap==null?24:o.gap});
  pad(s,o.pt==null?72:o.pt,PAD,o.pb==null?72:o.pb,PAD);
  s.fills=o.bg?SOLID(o.bg):[];          // ← пусто, а не белое
  root.appendChild(s); s.layoutSizingHorizontal='FILL';
  return s;
}
function card(o={}){
  const c=AL('VERTICAL',{name:o.name||'Card',itemSpacing:o.gap==null?10:o.gap});
  const P=o.p==null?24:o.p; pad(c,P,P,P,P);
  c.cornerRadius=12; c.fills=SOLID(o.bg||C.white);
  c.strokes=SOLID(o.bd||C.border); c.strokeWeight=1;
  return c;
}
function grid(p,gap){
  const g=AL('HORIZONTAL',{itemSpacing:gap});
  g.layoutWrap='WRAP'; g.counterAxisSpacing=gap;
  p.appendChild(g); g.layoutSizingHorizontal='FILL';
  return g;
}
function gridItem(g,n,cols,gap,W){
  g.appendChild(n);
  n.layoutSizingHorizontal='FIXED';
  n.resize((W-gap*(cols-1))/cols, n.height);
  n.layoutSizingVertical='FILL';        // ← равная высота в строке
  return n;
}
```

Позиционирование фреймов на канвасе: десктопы в ряд с шагом `ширина + 400`,
мобильные отдельным рядом. Начинать не от (0,0).

---

## Hero с фоновым изображением

Паттерн «фото на всю ширину, текст поверх» (референс — cmwp.ru):

```js
hero.fills = [{
  type:'GRADIENT_LINEAR',
  gradientTransform:[[1,0,0],[0,1,0]],
  gradientStops:[
    {position:0,   color:{r:0.043,g:0.129,b:0.180,a:1}},
    {position:0.55,color:{r:0.055,g:0.176,b:0.243,a:1}},
    {position:1,   color:{r:0.086,g:0.267,b:0.357,a:1}}
  ]
}];
```

Стопы **непрозрачные**. Полупрозрачные поверх белого фрейма дают вымытый правый край
и создают ложное впечатление белых блоков.

После смены фона на тёмный:
1. Перекрасить тексты в белый, кроме тех, что внутри белых карточек и форм
2. Контурные кнопки: `fills=[]`, `strokes=SOLID(white)`, текст белый
3. Заливные кнопки осветлить — бренд-цвет с сайта обычно рассчитан на белый фон
4. **Вычистить белые заливки обёрток** (ловушка 1) — иначе увидишь белые прямоугольники
