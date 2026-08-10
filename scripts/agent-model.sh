#!/usr/bin/env bash
# Переключение модели у агентов Claude Code (.claude/agents/*.md).
#
# Зачем: стадии тендерного пайплайна разной сложности. Приёмку и разбор файлов
# незачем гонять на дорогой модели, а КП и проверку — есть зачем. Поле model
# во frontmatter это решает, но руками править шесть файлов туда-обратно неудобно,
# особенно когда идёт замер «а справится ли модель попроще».
#
# Использование:
#   bash scripts/agent-model.sh show                        текущая раскладка
#   bash scripts/agent-model.sh set haiku tender-intake      одному агенту
#   bash scripts/agent-model.sh set haiku --all              всем
#   bash scripts/agent-model.sh reset tender-intake          вернуть как было
#   bash scripts/agent-model.sh reset --all                  вернуть всё как было
#
# reset убирает строку model: целиком — агент снова наследует модель сессии,
# то есть ровно то поведение, что было до всех экспериментов.
#
# Допустимые значения: haiku, sonnet, opus, inherit.
# Сторонние модели (deepseek, gpt-5.6-luna и прочее с opencode-go) здесь
# указать НЕЛЬЗЯ — Claude Code принимает только свои. Для них нужен hermes.
#
# После правки — рестарт сессии Claude Code, frontmatter читается на старте.

set -euo pipefail

cd "$(dirname "$0")/.."
AGENTS_DIR=".claude/agents"

die() { echo "ошибка: $*" >&2; exit 1; }

[ -d "$AGENTS_DIR" ] || die "нет папки $AGENTS_DIR (запускать из корня репозитория)"

all_agents() {
  find "$AGENTS_DIR" -maxdepth 1 -name '*.md' ! -name 'MODELS.md' -exec basename {} .md \;
}

# Модель из frontmatter, или "-" если поле не задано (наследует сессию).
current_model() {
  awk 'NR==1 && $0=="---" {inside=1; next}
       inside && $0=="---" {exit}
       inside && /^model:[[:space:]]*/ {sub(/^model:[[:space:]]*/,""); print; found=1; exit}
       END {if (!found) print "-"}' "$1"
}

cmd_show() {
  printf '%-18s %s\n' "АГЕНТ" "МОДЕЛЬ"
  for a in $(all_agents); do
    printf '%-18s %s\n' "$a" "$(current_model "$AGENTS_DIR/$a.md")"
  done
  echo
  echo '"-" = поле не задано, агент наследует модель сессии (поведение по умолчанию)'
}

# Ставит или заменяет model: внутри frontmatter. Если поля нет — вставляет
# сразу после name:, чтобы порядок полей был предсказуемым во всех файлах.
apply_model() {
  local file="$1" model="$2" tmp
  tmp="$(mktemp)"
  awk -v m="$model" '
    NR==1 && $0=="---" {inside=1; print; next}
    inside && $0=="---" {
      if (!done) print "model: " m
      inside=0; done=1; print; next
    }
    inside && /^model:[[:space:]]*/ {print "model: " m; done=1; next}
    {print}
  ' "$file" > "$tmp"
  mv "$tmp" "$file"
}

drop_model() {
  local file="$1" tmp
  tmp="$(mktemp)"
  awk 'NR==1 && $0=="---" {inside=1; print; next}
       inside && $0=="---" {inside=0; print; next}
       inside && /^model:[[:space:]]*/ {next}
       {print}' "$file" > "$tmp"
  mv "$tmp" "$file"
}

# Разворачивает --all в список агентов, иначе проверяет, что каждый существует.
resolve_targets() {
  if [ "${1:-}" = "--all" ]; then
    all_agents
    return
  fi
  [ $# -gt 0 ] || die "не указан агент (или --all)"
  for a in "$@"; do
    [ -f "$AGENTS_DIR/$a.md" ] || die "нет агента '$a' в $AGENTS_DIR"
    echo "$a"
  done
}

case "${1:-show}" in
  show)
    cmd_show
    ;;
  set)
    shift
    model="${1:-}"
    case "$model" in
      haiku|sonnet|opus|inherit) ;;
      "") die "не указана модель (haiku | sonnet | opus | inherit)" ;;
      *) die "модель '$model' не поддерживается Claude Code. Допустимо: haiku, sonnet, opus, inherit" ;;
    esac
    shift
    for a in $(resolve_targets "$@"); do
      apply_model "$AGENTS_DIR/$a.md" "$model"
      echo "$a → $model"
    done
    echo
    echo "рестарт сессии Claude Code, чтобы применилось"
    ;;
  reset)
    shift
    for a in $(resolve_targets "$@"); do
      drop_model "$AGENTS_DIR/$a.md"
      echo "$a → наследует модель сессии"
    done
    echo
    echo "рестарт сессии Claude Code, чтобы применилось"
    ;;
  *)
    die "неизвестная команда '${1}'. Есть: show, set, reset"
    ;;
esac
