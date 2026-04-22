# D1 / R2 Setup

## 1) D1 스키마 적용

```bash
wrangler d1 execute jujw-db --local --file=./db/schema.sql
```

운영 DB에도 동일하게 적용:

```bash
wrangler d1 execute jujw-db --remote --file=./db/schema.sql
```

## 2) Cloudflare Pages / Secrets

Cloudflare Pages 프로젝트에 아래 값을 환경 변수 또는 Secret으로 설정하세요.

```env
JWT_SECRET=your-long-random-secret
SITE_URL=https://your-site.pages.dev
R2_PUBLIC_BASE_URL=https://your-r2-public-domain
```

운영 환경에서는 `JWT_SECRET`과 D1 바인딩이 없으면 관리자 로그인과 쓰기 작업이 실패합니다.

## 3) 관리자 계정

관리자 로그인은 아래 두 방식 중 하나를 사용합니다.

1. `admins` 테이블에 저장된 계정
2. `ADMIN_EMAIL`, `ADMIN_PASSWORD` 환경 변수 계정

운영 시작 전에는 D1의 `admins` 테이블에 실제 계정을 넣는 방식을 권장합니다.

## 4) R2

`wrangler.toml`의 `bucket_name`/`binding` 값을 실제 버킷과 맞추고,
공개 URL이 있다면 `R2_PUBLIC_BASE_URL`을 설정하세요.

Cloudflare Pages 배포용 GitHub Actions를 쓰려면 저장소 Secret에 아래도 추가해야 합니다.

```env
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ACCOUNT_ID=...
```
