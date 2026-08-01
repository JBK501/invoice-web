#!/bin/bash
# Claude Code 작업 완료 시 슬랙으로 알림 전송
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
[ -f "$PROJECT_DIR/.env" ] && source "$PROJECT_DIR/.env"

if [ -z "${SLACK_WEBHOOK_URL:-}" ]; then
  exit 0
fi

INPUT=$(cat)
LAST_MESSAGE=$(echo "$INPUT" | jq -r '.last_assistant_message // "작업이 완료되었습니다."')
CWD=$(echo "$INPUT" | jq -r '.cwd // ""')
PROJECT_NAME=$(basename "$CWD")

SUMMARY="${LAST_MESSAGE:0:500}"
if [ "${#LAST_MESSAGE}" -gt 500 ]; then
  SUMMARY="${SUMMARY}..."
fi

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

TEXT=":white_check_mark: *작업 완료 알림*
프로젝트 : ${PROJECT_NAME}
상태 : 완료
메시지 : ${SUMMARY}
시간 : ${TIMESTAMP}"

curl -s -X POST -H 'Content-type: application/json' \
  --data "$(jq -n --arg text "$TEXT" '{text: $text}')" \
  "$SLACK_WEBHOOK_URL" > /dev/null

exit 0
