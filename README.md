# AI_Skills

Главный репозиторий всех Claude-скиллов: дизайн, вайб-кодинг, брейншторм и (в будущем) продажи/менеджмент. Совместим со стандартом [`npx skills`](https://github.com/vercel-labs/skills) — можно ставить как через него, так и напрямую копированием в `~/.claude/skills/`.

На текущем этапе в репозиторий добавляются только **готовые существующие скиллы** из внешних источников — свои с нуля пока не пишем.

## Структура

```
AI_Skills/
├── skills/
│   ├── design/          # дизайн, анимации, UI-полировка
│   ├── engineering/      # поиск и установка скиллов
│   └── marketing/         # позиционирование, копирайтинг, описания продукта
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
| `presentation-creator` | [getsentry/skills](https://github.com/getsentry/skills) | Генератор презентаций: React+Vite+Recharts → один самодостаточный HTML-файл, аккуратный визуал и графики только на реальных данных |
| `presentation-design` | [jwynia/agent-skills](https://github.com/jwynia/agent-skills) | Не генератор, а фреймворк ревью: оценка ясности, визуальной иерархии и когнитивной нагрузки готовой презентации (любой инструмент — reveal.js/PowerPoint/Keynote) |

### `skills/engineering/`
| Скилл | Источник | Для чего |
|---|---|---|
| `find-skills` | [vercel-labs/skills](https://github.com/vercel-labs/skills) | Поиск и установка новых скиллов из каталогов |
| `agent-browser` | [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | CLI для браузерной автоматизации: навигация, формы, скриншоты, скрапинг, тестирование веб-приложений |
| `deep-research` | [199-biotechnologies/claude-deep-research-skill](https://github.com/199-biotechnologies/claude-deep-research-skill) | Глубокое многошаговое исследование темы: поиск по источникам с трекингом цитат, проверка утверждений, структурированный отчёт (Markdown + HTML/PDF, таблицы источников и claims) |

### `skills/marketing/`
| Скилл | Источник | Для чего |
|---|---|---|
| `positioning-messaging` | [refoundai/lenny-skills](https://github.com/refoundai/lenny-skills) | Фреймворк позиционирования (58 продуктовых лидеров): аудитория → отличие от альтернатив → сообщение. Применять ДО написания текста |
| `copywriting` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | Конверсионные тексты: слоганы, полные описания — специфичность, выгоды вместо фич, CTA-формулы |
| `product-description-generator` | [nexscope-ai/ecommerce-skills](https://github.com/nexscope-ai/ecommerce-skills) | Раскладывает готовый месседж по полям листинга: тайтл, буллеты, полное описание, ключевые слова |

Для формы «описание приложения в маркетплейсе» (название/слоган/полное описание/ключевые слова) — использовать все три по порядку: сначала `positioning-messaging` (в чём суть и отличие), потом `copywriting` (сильный текст), потом `product-description-generator` (разложить по конкретным полям).

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

### Веб-версия (claude.ai/code) — доступно во всех новых чатах, в любом репозитории

Каждая веб-сессия — свежий контейнер, локальный `~/.claude/skills/` туда не попадает. Решение — **SessionStart hook** (`.claude/hooks/sync-ai-skills.sh` + `.claude/settings.json` в этом репозитории): при старте любой веб-сессии он клонирует/обновляет `AI_Skills` и копирует все `skills/<category>/<name>/` в `~/.claude/skills/`. На локальной машине хук — no-op (проверяет `CLAUDE_CODE_REMOTE`).

**Чтобы это работало и в других твоих репозиториях** (не только в `AI_Skills`), скопируй туда те же два файла:

```bash
mkdir -p .claude/hooks
curl -fsSL https://raw.githubusercontent.com/Ejokey/AI_Skills/main/.claude/hooks/sync-ai-skills.sh \
  -o .claude/hooks/sync-ai-skills.sh
chmod +x .claude/hooks/sync-ai-skills.sh
```

и добавь в `.claude/settings.json` этого репо (создай, если его ещё нет; если уже есть — слей `hooks` вручную):
```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/sync-ai-skills.sh" }
        ]
      }
    ]
  }
}
```

Закоммить и запушь в дефолтную ветку репозитория — после этого **любая новая веб-сессия по этому репо** подтягивает актуальный набор скиллов из `AI_Skills` автоматически, без ручной установки. Обновил скилл в `AI_Skills` — в следующей веб-сессии (в любом репо с этим хуком) он уже доступен.

## Документация среды

- [`docs/imac-catalina-claude-setup.md`](docs/imac-catalina-claude-setup.md) — как настроить полноценную среду для Claude на старом iMac (macOS Catalina 10.15.8): Claude Code CLI, ограничения VS Code-расширения, путь через OpenCore Legacy Patcher.

## Добавление нового скилла

1. Выбери категорию (или создай новую, если она про принципиально новую сферу).
2. `skills/<category>/<имя-скилла>/SKILL.md` с frontmatter `name` + `description`.
3. Проверь, что `name` не конфликтует с уже существующими в репо.
4. Добавь строку в таблицу выше со ссылкой на источник.
</content>
