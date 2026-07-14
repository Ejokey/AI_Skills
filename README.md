# AI_Skills

Главный репозиторий всех Claude-скиллов: дизайн, вайб-кодинг, брейншторм и (в будущем) продажи/менеджмент. Совместим со стандартом [`npx skills`](https://github.com/vercel-labs/skills) — можно ставить как через него, так и напрямую копированием в `~/.claude/skills/`.

На текущем этапе в репозиторий добавляются только **готовые существующие скиллы** из внешних источников — свои с нуля пока не пишем.

## Структура

```
AI_Skills/
├── skills/
│   ├── design/          # дизайн, анимации, UI-полировка
│   └── engineering/      # поиск и установка скиллов
├── docs/                 # инструкции по среде (например, установка на старый iMac)
└── README.md
```

Правила организации:
- **Одна папка = один скилл**, обязательно с `SKILL.md` (frontmatter: `name`, `description`).
- **Категория = сфера задачи**, а не источник скилла.
- `name` в frontmatter уникален по всему репозиторию — иначе конфликт при глобальной установке.

## Что внутри

### `skills/design/`
| Скилл | Источник | Для чего |
|---|---|---|
| `impeccable` | [impeccable.style](https://impeccable.style) | Полный дизайн/UX-аудит и полировка интерфейсов |
| `emil-design-eng` | [emilkowalski/skills](https://github.com/emilkowalski/skills) | Дизайн и анимация — базовые советы |
| `review-animations` | emilkowalski/skills | Строгая оценка анимаций по чек-листу |
| `improve-animations` | emilkowalski/skills | Аудит анимаций в коде, план улучшений |
| `animation-vocabulary` | emilkowalski/skills | Точный словарь для описания анимаций |
| `apple-design` | emilkowalski/skills | Принципы Apple HIG для веба |

### `skills/engineering/`
| Скилл | Источник | Для чего |
|---|---|---|
| `find-skills` | [vercel-labs/skills](https://github.com/vercel-labs/skills) | Поиск и установка новых скиллов из каталогов |

## Установка

### Локальная машина — один раз, доступно во всех проектах
```bash
mkdir -p ~/.claude/skills
cp -R skills/design/* skills/engineering/* ~/.claude/skills/
```

### Через `npx skills` (если предпочитаешь их CLI)
```bash
npx skills add <твой-github>/AI_Skills
```
CLI сам обнаружит скиллы по пути `skills/<category>/<name>/SKILL.md` и предложит выбрать, что ставить и куда (глобально/в проект).

### Веб-версия (claude.ai/code) — доступно во всех новых чатах
Каждая веб-сессия — свежий контейнер, локальный `~/.claude/skills/` туда не попадает. Решение — **SessionStart hook**, который при старте любой веб-сессии клонирует этот репозиторий и копирует `skills/*` в `~/.claude/skills/`.

## Документация среды

- [`docs/imac-catalina-claude-setup.md`](docs/imac-catalina-claude-setup.md) — как настроить полноценную среду для Claude на старом iMac (macOS Catalina 10.15.8): Claude Code CLI, ограничения VS Code-расширения, путь через OpenCore Legacy Patcher.

## Добавление нового скилла

1. Выбери категорию (или создай новую, если она про принципиально новую сферу).
2. `skills/<category>/<имя-скилла>/SKILL.md` с frontmatter `name` + `description`.
3. Проверь, что `name` не конфликтует с уже существующими в репо.
4. Добавь строку в таблицу выше со ссылкой на источник.
</content>
