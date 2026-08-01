#!/bin/bash
# 사용자 프롬프트 제출 시 command-log/에 날짜별로 기록
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

INPUT=$(cat)
PROMPT=$(echo "$INPUT" | jq -r '.prompt // ""')
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""')
CWD=$(echo "$INPUT" | jq -r '.cwd // ""')
TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // ""')
GIT_BRANCH=$(git -C "$PROJECT_DIR" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
GIT_COMMIT=$(git -C "$PROJECT_DIR" rev-parse --short HEAD 2>/dev/null || echo "")

LOG_DIR="$PROJECT_DIR/command-log"
mkdir -p "$LOG_DIR"

DATE=$(date '+%Y-%m-%d')
TIME=$(date '+%H:%M:%S')
LOG_FILE="$LOG_DIR/${DATE}.md"

if [ ! -f "$LOG_FILE" ]; then
  echo "# ${DATE} 지시 기록" >> "$LOG_FILE"
  echo "" >> "$LOG_FILE"
fi

{
  echo "## ${TIME}"
  echo "- session: ${SESSION_ID}"
  echo "- cwd: ${CWD}"
  echo "- branch: ${GIT_BRANCH}"
  echo "- commit: ${GIT_COMMIT}"
  echo "- transcript(클로드 작업내역 경로): ${TRANSCRIPT_PATH}"
  echo ""
  echo "- message: $PROMPT"
  echo ""
  echo "---"
  echo ""
} >> "$LOG_FILE"

exit 0
