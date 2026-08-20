# Проверка макетов до показа человеку

Два прогона: автоматический по структуре файла и расчётный по типографике.
Оба находят то, что глазом на скриншоте не видно.

---

## Прогон 1: аудит структуры (read-only `use_figma`)

Один вызов, ничего не меняет. Ищет ровно те дефекты, которые всплывали на реальных сборках.

```js
const FRAMES=['3:19','3:20','3:21','3:22','3:23','3:24'];
const KEEP=/^(Card|Doctor|Stat|Tile|Step|Review|Chip|Item|Button|Form|State|Notice|Table|input|Accordion|FAQ|Grid|⟨)/;
const isWhite=f=>f&&f.type==='SOLID'&&f.color.r>0.88&&f.color.g>0.88&&f.color.b>0.88;
const isDark=f=>f&&((f.type==='SOLID'&&(f.color.r+f.color.g+f.color.b)/3<0.45)||f.type==='GRADIENT_LINEAR');

const clipped=[], zeroW=[], empty=[], strayWhite=[], phones={}, prices={};
for(const id of FRAMES){
  const f=await figma.getNodeByIdAsync(id); if(!f) continue;
  const fn=f.name.slice(0,24);
  for(const t of f.findAll(n=>n.type==='TEXT')){
    if(t.width<2) zeroW.push(fn+' :: '+t.name);
    if(!t.characters.trim()) empty.push(fn+' :: '+t.name);
    for(const m of t.characters.match(/\+7 \(\d{3}\) [\d-]+/g)||[]) phones[m]=(phones[m]||0)+1;
    for(const m of t.characters.match(/\d[\d\s]{2,}\s?₽/g)||[]) prices[m.trim()]=(prices[m.trim()]||0)+1;
    const p=t.parent;
    if(p&&p.type==='FRAME'&&p.layoutMode&&p.layoutMode!=='NONE'){
      try{ if(p.layoutSizingVertical==='FIXED' &&
             t.height > p.height-(p.paddingTop||0)-(p.paddingBottom||0)+1)
        clipped.push(fn+' :: '+p.name+' › '+t.name.slice(0,26)); }catch(e){}
    }
  }
  for(const sec of f.children){
    if(!isDark((sec.fills||[])[0])) continue;
    for(const n of sec.findAll(x=>x.type==='FRAME')){
      if(KEEP.test(n.name)) continue;
      if(isWhite((n.fills||[])[0])) strayWhite.push(fn+' :: '+sec.name.slice(0,20)+' › '+n.name);
    }
  }
  for(const b of f.findAll(n=>n.type==='FRAME'&&/^Button \//.test(n.name)))
    if(b.height<44) clipped.push('ТАЧ-ТАРГЕТ '+fn+' :: '+b.name+' h='+Math.round(b.height));
}
return {clipped, zeroW, empty, strayWhite, phones, prices};
```

Как читать результат:

| Поле | Что значит |
|---|---|
| `clipped` | Текст выше своего контейнера — ловушка `resize` из figma-build.md |
| `zeroW` | Схлопнувшийся в нитку переносимый текст |
| `strayWhite` | Белая заливка обёртки на тёмной секции |
| `phones` / `prices` | Должно быть ровно столько ключей, сколько разных значений в источнике. Лишний ключ = опечатка в одном из фреймов |

Всё должно быть пустым. `phones` и `prices` — сверить со списком фактов вручную.

---

## Прогон 2: типографика и контраст (расчёт, Figma не нужна)

Считается по токенам и известной геометрии. Запускать даже когда квота Figma исчерпана.

```python
def rgb(h): return tuple(int(h[i:i+2],16)/255 for i in (1,3,5))
def lum(c):
    f=lambda v: v/12.92 if v<=0.03928 else ((v+0.055)/1.055)**2.4
    r,g,b=map(f,c); return 0.2126*r+0.7152*g+0.0722*b
def cr(a,b):
    L=sorted((lum(rgb(a)),lum(rgb(b))))
    return (L[1]+0.05)/(L[0]+0.05)

# каждая пара «цвет текста / фон под ним», которая реально встречается
for name,fg,bg,large in PAIRS:
    need = 3.0 if large else 4.5
    print(name, round(cr(fg,bg),2), 'OK' if cr(fg,bg)>=need else 'FAIL')

# длина строки: ширина колонки / (кегль * 0.5) — для Roboto и похожих
for label,w,fs in BLOCKS:
    ch = round(w/(fs*0.5))
    print(label, ch, 'OK' if 45<=ch<=75 else ('ДЛИННО' if ch>75 else 'коротко'))
```

⚠️ На Windows запускать как `PYTHONUTF8=1 python - <<'PY'`, иначе кириллица в heredoc
превращается в мусор и скрипт падает на разборе hex-строк.

### Что ловится этим прогоном

**Приглушённый серый не проходит контраст.** Типовое значение вида `#7A8B94` даёт
3.5:1 на белом при норме 4.5. Им обычно набраны подписи и **дисклеймеры** — то есть
юридически значимый текст оказывается самым нечитаемым на странице. Порог проходит
примерно от `#5A6E7C`.

**Длина строки.** Абзац в 880 px при кегле 17 — это 104 знака. Список во всю ширину
1280 при 16 — 160 знаков. Норма 65–75. Правится ограничением ширины колонки, а не кеглем.

---

## Прогон 3: сверка макета с текстовым документом

Автоматикой не ловится, но проваливается регулярно.

- **Нумерация.** «Блок 7» в документе против «08 / …» в макете. Возникает, когда в макете
  один блок документа разложен на две секции. Лечится таблицей соответствия в документе
- **Блоки, добавленные поздно.** Всё, что появилось в макете после согласования текстов,
  в документ обычно не попадает
- **Обещания, которых нет в данных.** Смета или документ описывают поле, которого у
  заказчика не существует. Проверять по фактическому источнику, а не по формулировке
- **Форматирование после автоформаттеров.** Markdown-линтеры склеивают `**Вопрос**?Ответ`.
  Ловится `grep -n '\*\*?[А-ЯA-Z0-9]'`

---

## Прогон 4: `impeccable critique`

Регистр `brand` для лендинга. Даёт оценку по 10 эвристикам Нильсена, вердикт по
AI-паттернам и персонажей.

Что регулярно всплывает именно там:
- Одинаковые карточные сетки — восемь подряд читаются одной текстурой
- Hero-metric блок (крупная цифра + мелкая подпись × 4) — SaaS-клише
- Плоская шкала кегля: 18 ступеней с шагом 6% системой не читается
- Отсутствие состояний ошибки и валидации, когда форма — целевое действие
- Мобильная версия как десктоп в одну колонку, без пересборки порядка блоков
