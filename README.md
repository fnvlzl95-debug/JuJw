# Ju Jewelry

Next.js 14 기반 Ju Jewelry B2B 사이트입니다. 공개 페이지, 상담 접수, 관리자 페이지, Cloudflare 배포 준비를 포함합니다.

## Stack

- Next.js 14 App Router
- Tailwind CSS
- Cloudflare Workers/OpenNext
- D1 / R2 준비
- 로컬 개발 시 `data/local-db.json` fallback 사용

## Scripts

- `npm run dev`: 로컬 개발 서버
- `npm run build`: Next.js 프로덕션 빌드
- `npm run lint`: ESLint 실행
- `npm run typecheck`: TypeScript 타입 검사
- `npm run preview`: OpenNext Cloudflare preview 산출물 생성 및 미리보기
- `npm run db:migrate:local`: 로컬 D1 마이그레이션
- `npm run db:seed:local`: 로컬 D1 seed 적용

## Admin

- 기본 로컬 관리자 계정
- 이메일: `admin@jujewelry.kr`
- 비밀번호: `admin1234!`

운영 환경에서는 `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`를 반드시 교체하세요.

## Cloudflare

1. `.dev.vars.example`을 참고해 `.dev.vars`를 구성합니다.
2. `wrangler.jsonc`의 D1/R2 바인딩 값을 실제 리소스로 교체합니다.
3. `npx opennextjs-cloudflare build` 또는 `npm run preview`로 산출물을 검증합니다.
4. 실제 배포 전 `cloudflare-env.d.ts`는 `npm run cf-typegen`으로 생성합니다.

## Notes

- 공개 페이지의 소개/거래 안내/FAQ 본문은 코드 기반으로 관리합니다.
- 제품, 문의, 연락처/지도/히어로 문구는 관리자에서 관리하도록 구성했습니다.
- 로컬에서 Cloudflare 바인딩이 없으면 JSON 저장소 fallback이 동작합니다.
