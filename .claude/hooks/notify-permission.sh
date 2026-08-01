#!/bin/bash
# Claude Code 권한 요청 시 슬랙으로 알림 전송
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
[ -f "$PROJECT_DIR/.env" ] && source "$PROJECT_DIR/.env"

if [ -z "${SLACK_WEBHOOK_URL:-}" ]; then
  exit 0
fi

INPUT=$(cat)
MESSAGE=$(echo "$INPUT" | jq -r '.message // "권한 확인이 필요합니다."')
CWD=$(echo "$INPUT" | jq -r '.cwd // ""')
PROJECT_NAME=$(basename "$CWD")

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

TEXT=":warning: *권한 승인 필요*
프로젝트 : ${PROJECT_NAME}
상태 : 권한 승인 필요
메시지 : ${MESSAGE}
시간 : ${TIMESTAMP}"

curl -s -X POST -H 'Content-type: application/json' \
  --data "$(jq -n --arg text "$TEXT" '{text: $text}')" \
  "$SLACK_WEBHOOK_URL" > /dev/null

exit 0
