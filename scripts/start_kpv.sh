#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="korean_phonetics_visualizer"
CONFIG_DIR="$HOME/.config/kpv"
CONFIG_FILE="$CONFIG_DIR/project_path"
CANDIDATE_ROOTS=(
  "$HOME/Documents/Codes"
  "$HOME/Documents"
  "$HOME/Projects"
  "$HOME"
)

log() {
  printf '[start-kpv] %s\n' "$*"
}

fatal() {
  printf '[start-kpv] ERROR: %s\n' "$*" >&2
  exit 1
}

resolve_hint() {
  local hint="$1"
  if [[ -n "$hint" && -d "$hint" && -f "$hint/package.json" ]]; then
    printf '%s' "$hint"
    return 0
  fi
  return 1
}

auto_detect() {
  for root in "${CANDIDATE_ROOTS[@]}"; do
    [[ -d "$root" ]] || continue
    local found
    found=$(find "$root" -maxdepth 4 -type d -name "$PROJECT_NAME" -print -quit 2>/dev/null || true)
    if [[ -n "$found" && -f "$found/package.json" ]]; then
      printf '%s' "$found"
      return 0
    fi
  done
  return 1
}

PROJECT_DIR=""

if resolve_hint "${KPV_HOME:-}" >/dev/null; then
  PROJECT_DIR=$(resolve_hint "${KPV_HOME:-}")
elif [[ -f "$CONFIG_FILE" ]]; then
  saved_path=$(<"$CONFIG_FILE")
  if resolve_hint "$saved_path" >/dev/null; then
    PROJECT_DIR=$(resolve_hint "$saved_path")
  fi
fi

if [[ -z "$PROJECT_DIR" ]]; then
  default_hint="$HOME/Documents/Codes/$PROJECT_NAME"
  if resolve_hint "$default_hint" >/dev/null; then
    PROJECT_DIR=$(resolve_hint "$default_hint")
  else
    PROJECT_DIR=$(auto_detect || true)
  fi
fi

if [[ -z "$PROJECT_DIR" ]]; then
  fatal "未能自动定位 $PROJECT_NAME，请设置 KPV_HOME 或在 $CONFIG_FILE 写入路径。"
fi

mkdir -p "$CONFIG_DIR"
printf '%s\n' "$PROJECT_DIR" > "$CONFIG_FILE"

log "定位到项目目录：$PROJECT_DIR"

command -v npm >/dev/null 2>&1 || fatal "未检测到 npm，请先安装 Node.js/NPM。"

cd "$PROJECT_DIR"

[[ -f package.json ]] || fatal "路径 $PROJECT_DIR 缺少 package.json。"

if [[ ! -d node_modules ]]; then
  log "首次运行，执行 npm install..."
  npm install
fi

log "启动 Vite 开发服务器 (Ctrl+C 停止)"
npm run dev -- --host
