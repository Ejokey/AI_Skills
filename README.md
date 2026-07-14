# AI_Skills

Главный репозиторий всех Claude-скиллов: дизайн, вайб-кодинг, брейншторм и (в будущем) продажи/менеджмент. Совместим со стандартом [`npx skills`](https://github.com/vercel-labs/skills) — можно ставить как через него, так и напрямую копированием в `~/.claude/skills/`.

## Структура

```
AI_Skills/
├── skills/
│   ├── design/          # дизайн, презентации, анимации, UI-полировка
│   ├── engineering/      # вайб-кодинг лендингов, поиск скиллов, скрипты
│   └── brainstorm/       # структурирование брейншторма
├── docs/                 # инструкции по среде (например, установка на старый iMac)
└── README.md
```

Правила организации:
- **Одна папка = один скилл**, обязательно с `SKILL.md` (frontmatter: `name`, `description`).
- **Категория = сфера задачи**, а не источник скилла — внешние и свои скиллы лежат вперемешку внутри `design/`, `engineering/` и т.д.
- `name` в frontmatter уникален по всему репозиторию — иначе конфликт при глобальной установке.

## Что внутри

### `skills/design/`
| Скилл | Источник | Для чего |
|---|---|---|
| `design-system` | свой | Единый визуальный язык: палитра, типографика, отступы |
| `presentation-builder` | свой | Презентации из текста |
| `impeccable` | [impeccable.style](https://impeccable.style) | Полный дизайн/UX-аудит и полировка интерфейсов |
| `emil-design-eng` | [emilkowalski/skills](https://github.com/emilkowalski/skills) | Дизайн и анимация — базовые советы |
| `review-animations` | emilkowalski/skills | Строгая оценка анимаций по чек-листу |
| `improve-animations` | emilkowalski/skills | Аудит анимаций в коде, план улучшений |
| `animation-vocabulary` | emilkowalski/skills | Точный словарь для описания анимаций |
| `apple-design` | emilkowalski/skills | Принципы Apple HIG для веба |

### `skills/engineering/`
| Скилл | Источник | Для чего |
|---|---|---|
| `landing-vibe` | свой | Вайб-кодинг одностраничных лендингов |
| `find-skills` | [vercel-labs/skills](https://github.com/vercel-labs/skills) | Поиск и установка новых скиллов из каталогов |

### `skills/brainstorm/`
| Скилл | Источник | Для чего |
|---|---|---|
| `brainstorm-structure` | свой | Структура открытого брейншторма: дивергенция → кластеризация → отбор |

## Установка

### Локальная машина — один раз, доступно во всех проектах
```bash
mkdir -p ~/.claude/skills
cp -R skills/design/* skills/engineering/* skills/brainstorm/* ~/.claude/skills/
```

### Через `npx skills` (если предпочитаешь их CLI)
```bash
npx skills add <твой-github>/AI_Skills
```
CLI сам обнаружит скиллы по пути `skills/<category>/<name>/SKILL.md` и предложит выбрать, что ставить и куда (глобально/в проект).

### Веб-версия (claude.ai/code) — доступно во всех новых чатах
Каждая веб-сессия — свежий контейнер, локальный `~/.claude/skills/` туда не попадает. Решение — **SessionStart hook**, который при старте любой веб-сессии клонирует этот репозиторий и копирует `skills/*` в `~/.claude/skills/`. См. `docs/` (будет добавлено) для готового хука.

## Документация среды

- [`docs/imac-catalina-claude-setup.md`](docs/imac-catalina-claude-setup.md) — как настроить полноценную среду для Claude на старом iMac (macOS Catalina 10.15.8): Claude Code CLI, ограничения VS Code-расширения, путь через OpenCore Legacy Patcher.

## Добавление нового скилла

1. Выбери категорию (или создай новую, если она про принципиально новую сферу).
2. `skills/<category>/<имя-скилла>/SKILL.md` с frontmatter `name` + `description`.
3. Проверь, что `name` не конфликтует с уже существующими в репо.
4. Если скилл внешний — добавь строку в таблицу выше со ссылкой на источник.
</content>
