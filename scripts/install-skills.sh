#!/bin/bash
# Syncs every skill from ./skills/<role>/<name>/ into the global runtime folder
# ~/.claude/skills/ that Claude Code actually reads skills from.
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/skills"
TARGET_DIR="$HOME/.claude/skills"

mkdir -p "$TARGET_DIR"

count=0
find "$SOURCE_DIR" -mindepth 2 -maxdepth 2 -type d | while read -r skill_dir; do
  skill_name="$(basename "$skill_dir")"
  rm -rf "${TARGET_DIR:?}/${skill_name}"
  cp -R "$skill_dir" "$TARGET_DIR/"
  echo "installed: $skill_name"
done

echo "Synced $(find "$SOURCE_DIR" -mindepth 2 -maxdepth 2 -type d | wc -l) skills into $TARGET_DIR"
echo "Restart your Claude Code session for changes to take effect."
