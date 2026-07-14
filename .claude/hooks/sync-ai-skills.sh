#!/bin/bash
set -euo pipefail

# Only run on Claude Code on the web — local machines manage ~/.claude/skills manually.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

AI_SKILLS_REPO="https://github.com/Ejokey/AI_Skills.git"
CACHE_DIR="$HOME/.cache/ai-skills"
TARGET_DIR="$HOME/.claude/skills"

mkdir -p "$TARGET_DIR"

if [ -d "$CACHE_DIR/.git" ]; then
  git -C "$CACHE_DIR" fetch --depth 1 origin main
  git -C "$CACHE_DIR" reset --hard origin/main
else
  rm -rf "$CACHE_DIR"
  git clone --depth 1 "$AI_SKILLS_REPO" "$CACHE_DIR"
fi

# Copy every skill from every category (skills/<category>/<name>/) into the flat
# global skills directory Claude Code reads from.
find "$CACHE_DIR/skills" -mindepth 2 -maxdepth 2 -type d | while read -r skill_dir; do
  skill_name="$(basename "$skill_dir")"
  rm -rf "${TARGET_DIR:?}/${skill_name}"
  cp -R "$skill_dir" "$TARGET_DIR/"
done

echo "Synced $(find "$CACHE_DIR/skills" -mindepth 2 -maxdepth 2 -type d | wc -l) skills from AI_Skills into $TARGET_DIR"
