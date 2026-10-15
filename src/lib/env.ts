import "server-only"

// 서버 전용 환경 변수 접근 헬퍼. process.env는 이 파일에서만 읽는다.

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(
      `환경 변수 ${name}이(가) 설정되지 않았다. .env.local에 값을 추가한다 (.env.example 참조).`
    )
  }

  return value
}

function getNotionApiKey(): string {
  return readRequiredEnv("NOTION_API_KEY")
}

function getNotionDatabaseId(): string {
  return readRequiredEnv("NOTION_DATABASE_ID")
}

export { getNotionApiKey, getNotionDatabaseId }
