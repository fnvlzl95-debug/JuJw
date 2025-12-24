# Ju Jewelry B2B 웹사이트 기술 설계서

## 1. 프로젝트 개요

### 1.1 목적
- B2B 주얼리 도매 업체 브랜드 웹사이트
- 브랜드 소개, 제품 카탈로그, 오시는 길, 문의 기능 제공
- 관리자 페이지를 통한 콘텐츠 관리

### 1.2 디자인 컨셉
- **스타일**: Quiet Luxury (design14 기반)
- **색상**: 아이보리(#fdfcfa), 골드 악센트(#a08c5b), 다크 텍스트(#1a1a1a)
- **폰트**: Pretendard(본문), Noto Serif KR(제목), Cormorant Garamond(영문)
- **특징**: 절제된 고급감, 넓은 여백, 섬세한 타이포그래피

---

## 2. 페이지 구성

### 2.1 공개 페이지 (Public)
| 페이지 | 경로 | 설명 |
|--------|------|------|
| 홈 | `/` | 히어로, 신뢰 배지, 카테고리 미리보기, CTA |
| 브랜드 소개 | `/about` | 종로 종묘귀금속에 위치한 쥬얼리 도매 판매점, 철학, 강점 |
| 제품 | `/products` | 카테고리별 대표 라인업 |
| 거래 안내 | `/trade` | 거래 조건, 결제, 배송, AS |
| 오시는 길 | `/location` | 주소, 지도, 운영시간, 주차 |
| 문의하기 | `/contact` | 상담 요청 폼 |
| FAQ | `/faq` | 자주 묻는 질문 |

### 2.2 관리자 페이지 (Admin)
| 페이지 | 경로 | 설명 |
|--------|------|------|
| 로그인 | `/admin/login` | 관리자 인증 |
| 대시보드 | `/admin` | 문의 현황, 최근 활동 |
| 제품 관리 | `/admin/products` | 대표 라인업 CRUD |
| 문의 관리 | `/admin/inquiries` | 문의 목록, 상태 관리 |
| 설정 | `/admin/settings` | 연락처, 운영시간 등 |

---

## 3. 기술 스택 (권장)

### 3.1 프론트엔드

#### Option A: Next.js (권장)
```
Framework: Next.js 14 (App Router)
Styling: Tailwind CSS 3.4
Animation: Framer Motion (선택)
Icons: Lucide React
```

**장점:**
- SSG/SSR 지원으로 SEO 최적화
- App Router의 서버 컴포넌트로 빠른 로딩
- Cloudflare Pages 완벽 지원 (@cloudflare/next-on-pages)
- 풍부한 생태계, 다양한 라이브러리 호환

#### Option B: Astro
```
Framework: Astro 4.x
Styling: Tailwind CSS
Interactive: React Islands
```

**장점:**
- 기본적으로 0 JS 번들 (정적 사이트에 최적)
- Cloudflare와 네이티브 통합

### 3.2 백엔드 / 데이터베이스

#### Option A: Cloudflare 풀스택 (권장)
```
Database: Cloudflare D1 (SQLite)
Storage: Cloudflare R2
Auth: 자체 구현 (JWT) 또는 Cloudflare Access
Runtime: Cloudflare Workers
```

**장점:**
- 단일 플랫폼에서 모든 인프라 관리
- 글로벌 엣지 배포로 빠른 응답
- 저렴한 비용 (소규모 트래픽 무료)
- R2: S3 호환 스토리지, egress 무료

**예상 비용:** 무료 ~ $5/월 (소규모 기준)

#### Option B: Supabase
```
Database: PostgreSQL
Storage: Supabase Storage
Auth: Supabase Auth
```

**장점:**
- 관리형 서비스로 빠른 개발
- 실시간 구독, Row Level Security
- 내장 인증 시스템

**예상 비용:** 무료 ~ $25/월

### 3.3 권장 조합

```
┌─────────────────────────────────────────────────────┐
│                    RECOMMENDED                       │
├─────────────────────────────────────────────────────┤
│  Frontend: Next.js 14 + Tailwind CSS               │
│  Database: Cloudflare D1                            │
│  Storage:  Cloudflare R2                            │
│  Deploy:   Cloudflare Pages                         │
│  Auth:     Simple JWT (관리자 1-2명)                │
└─────────────────────────────────────────────────────┘
```

**이유:**
1. Cloudflare 단일 플랫폼 → 관리 간소화
2. D1/R2 무료 티어로 충분 → 비용 최소화
3. Next.js App Router → 세련된 UX 구현 용이
4. 소규모 관리자 → 복잡한 Auth 불필요

---

## 4. 데이터베이스 스키마

### 4.1 테이블 구조

```sql
-- 제품 카테고리
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,           -- '반지', '목걸이' 등
  slug TEXT UNIQUE NOT NULL,    -- 'rings', 'necklaces'
  icon TEXT,                    -- 이모지 또는 아이콘 이름
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 대표 제품 라인업
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER REFERENCES categories(id),
  name TEXT NOT NULL,           -- '18K 솔리테어 다이아 반지'
  spec TEXT,                    -- '0.3ct / 18K White Gold'
  description TEXT,
  image_url TEXT,               -- R2 이미지 URL
  is_featured BOOLEAN DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 문의 내역
CREATE TABLE inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL,   -- 상호/성함
  phone TEXT NOT NULL,
  interest TEXT,                -- 관심 품목
  message TEXT,
  status TEXT DEFAULT 'pending', -- pending, contacted, completed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 사이트 설정
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 관리자 계정
CREATE TABLE admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 4.2 예상 데이터 규모

| 테이블 | 예상 레코드 | 비고 |
|--------|------------|------|
| categories | 4-6개 | 반지, 목걸이, 귀걸이, 팔찌 등 |
| products | 20-50개 | 대표 라인업만 |
| inquiries | 월 10-50건 | 문의 내역 |
| settings | 10-20개 | 연락처, 운영시간 등 |
| admins | 1-2명 | 관리자 |

→ **D1 무료 티어(5GB)로 충분**

---

## 5. API 엔드포인트

### 5.1 공개 API

```
GET  /api/categories          카테고리 목록
GET  /api/products            제품 목록 (카테고리 필터 가능)
GET  /api/products/featured   대표 라인업
GET  /api/settings            공개 설정값
POST /api/inquiries           문의 제출
```

### 5.2 관리자 API

```
POST /api/admin/login         로그인

# 제품 관리
GET    /api/admin/products          목록
POST   /api/admin/products          생성
PUT    /api/admin/products/:id      수정
DELETE /api/admin/products/:id      삭제

# 이미지 업로드
POST /api/admin/upload              R2 이미지 업로드

# 문의 관리
GET   /api/admin/inquiries          목록
PATCH /api/admin/inquiries/:id      상태 변경

# 설정
GET  /api/admin/settings            전체 설정
PUT  /api/admin/settings            설정 저장
```

---

## 6. 이미지 저장소 (Cloudflare R2)

### 6.1 버킷 구조

```
ju-jewelry-assets/
├── products/
│   ├── {product-id}/
│   │   ├── main.webp          메인 이미지
│   │   └── thumb.webp         썸네일
├── brand/
│   ├── hero.webp              히어로 이미지
│   ├── about-1.webp           소개 이미지
│   └── showroom.webp          매장 이미지
└── temp/                       업로드 임시 저장
```

### 6.2 이미지 최적화

```
포맷: WebP (fallback: JPEG)
메인 이미지: max 1200x1600px
썸네일: 400x400px
품질: 80%
```

---

## 7. 배포 구성

### 7.1 Cloudflare Pages 설정

```yaml
# wrangler.toml
name = "ju-jewelry"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "ju-jewelry-db"
database_id = "xxxxx"

[[r2_buckets]]
binding = "BUCKET"
bucket_name = "ju-jewelry-assets"
```

### 7.2 환경 변수

```env
# Production
DATABASE_URL=       # D1 연결
R2_BUCKET=          # R2 버킷명
JWT_SECRET=         # 관리자 인증용
ADMIN_EMAIL=        # 초기 관리자
```

### 7.3 도메인 연결

```
jujewelry.co.kr → Cloudflare Pages
www.jujewelry.co.kr → redirect to apex
```

---

## 8. 프로젝트 구조

```
ju-jewelry/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/           # 공개 페이지 그룹
│   │   │   ├── page.tsx        # 홈
│   │   │   ├── about/
│   │   │   ├── products/
│   │   │   ├── trade/
│   │   │   ├── location/
│   │   │   └── contact/
│   │   ├── admin/              # 관리자 페이지
│   │   │   ├── login/
│   │   │   ├── products/
│   │   │   ├── inquiries/
│   │   │   └── settings/
│   │   ├── api/                # API 라우트
│   │   │   ├── categories/
│   │   │   ├── products/
│   │   │   ├── inquiries/
│   │   │   └── admin/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/             # Header, Footer, Nav
│   │   ├── ui/                 # Button, Input, Card 등
│   │   ├── sections/           # Hero, Categories, etc.
│   │   └── admin/              # 관리자 UI 컴포넌트
│   ├── lib/
│   │   ├── db.ts               # D1 연결
│   │   ├── r2.ts               # R2 연결
│   │   ├── auth.ts             # 인증 유틸
│   │   └── utils.ts
│   └── styles/
│       └── design-tokens.ts    # 색상, 폰트 등
├── public/
│   └── fonts/                  # 로컬 폰트 (선택)
├── wrangler.toml               # Cloudflare 설정
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 9. 디자인 토큰

```typescript
// src/styles/design-tokens.ts

export const colors = {
  bg: {
    primary: '#fdfcfa',
    secondary: '#f5f4f1',
    surface: '#ffffff',
  },
  text: {
    default: '#1a1a1a',
    muted: '#6b6b6b',
    subtle: '#9a9a9a',
  },
  accent: {
    default: '#a08c5b',
    hover: '#8a7a50',
  },
  border: '#e5e4e1',
}

export const fonts = {
  sans: ['Pretendard', '-apple-system', 'sans-serif'],
  serif: ['Noto Serif KR', 'Cormorant Garamond', 'serif'],
  display: ['Cormorant Garamond', 'serif'],
}

export const spacing = {
  section: {
    sm: '64px',
    md: '80px',
    lg: '120px',
  },
  container: {
    padding: '48px',
    maxWidth: '1200px',
  },
}
```

---

## 10. 개발 단계

### Phase 1: 기초 (1주)
- [x] 설계서 작성
- [ ] Next.js 프로젝트 세팅
- [ ] Tailwind 설정 + 디자인 토큰
- [ ] 레이아웃 컴포넌트 (Header, Footer)
- [ ] 홈페이지 구현

### Phase 2: 페이지 (1주)
- [ ] 브랜드 소개 페이지
- [ ] 제품 페이지
- [ ] 거래 안내 페이지
- [ ] 오시는 길 페이지
- [ ] 문의하기 페이지

### Phase 3: 백엔드 (1주)
- [ ] Cloudflare D1 세팅
- [ ] API 라우트 구현
- [ ] 문의 폼 연동
- [ ] Cloudflare R2 세팅

### Phase 4: 관리자 (1주)
- [ ] 관리자 로그인
- [ ] 제품 CRUD
- [ ] 이미지 업로드
- [ ] 문의 관리

### Phase 5: 마무리 (3일)
- [ ] SEO 최적화
- [ ] 성능 최적화
- [ ] 도메인 연결
- [ ] 배포

---

## 11. 패키지 목록

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "@cloudflare/next-on-pages": "^1.11.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "@types/node": "^20.12.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "wrangler": "^3.50.0"
  }
}
```

---

## 12. 참고사항

### 12.1 SEO 체크리스트
- [ ] 메타 태그 (title, description, og:image)
- [ ] 시맨틱 HTML (header, main, section, footer)
- [ ] 구조화된 데이터 (LocalBusiness schema)
- [ ] sitemap.xml
- [ ] robots.txt

### 12.2 성능 목표
- Lighthouse 점수: 90+ (모든 항목)
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

### 12.3 브라우저 지원
- Chrome 90+
- Safari 14+
- Firefox 90+
- Edge 90+
- Mobile: iOS Safari, Chrome Mobile
