PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  spec TEXT,
  description TEXT,
  is_featured INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 1,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  object_key TEXT,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_primary INTEGER NOT NULL DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_published INTEGER NOT NULL DEFAULT 1,
  is_pinned INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_notices_published ON notices(is_published);

INSERT OR IGNORE INTO categories (id, name, slug, order_index) VALUES
  (1, '반지', 'rings', 1),
  (2, '목걸이', 'necklaces', 2),
  (3, '귀걸이', 'earrings', 3),
  (4, '팔찌', 'bracelets', 4);

INSERT OR IGNORE INTO settings (key, value) VALUES
  ('shop_name', 'JU JEWELRY'),
  ('business_name', 'JU JEWELRY'),
  ('representative_name', ''),
  ('business_number', ''),
  ('phone_primary', '02-123-4567'),
  ('phone_secondary', '010-9876-5432'),
  ('email', 'contact@jujewelry.com'),
  ('address', '서울특별시 종로구 돈화문로 10길 15 (묘동)'),
  ('business_hours', '평일 10:30 - 19:30 / 주말 11:00 - 18:30'),
  ('closed_day', '화요일 휴무'),
  ('kakao_map_url', ''),
  ('naver_map_url', 'https://map.naver.com'),
  ('instagram_url', ''),
  ('facebook_url', ''),
  ('home_hero_line_1', '오래 간직할 수 있는 빛,'),
  ('home_hero_line_2', 'Ju가 차분히 제안합니다'),
  ('home_hero_cta', '컬렉션 보기'),
  ('home_menu_cta', '상담 예약'),
  ('home_menu_note', '제품 비교와 선물 상담이 필요하시면 문의 페이지에서 편하게 남겨 주세요.'),
  ('home_benefit_1_title', '정교한 세공'),
  ('home_benefit_1_description', '착용감과 비율까지 살핀 섬세한 마감'),
  ('home_benefit_2_title', '선물 포장'),
  ('home_benefit_2_description', '받는 순간까지 고급스럽게 완성하는 패키지'),
  ('home_benefit_3_title', '엄선된 소재'),
  ('home_benefit_3_description', '14K/18K 골드와 선별된 스톤의 안정적인 품질'),
  ('home_benefit_4_title', '맞춤 상담'),
  ('home_benefit_4_description', '예산과 용도에 맞춰 차분하게 제안합니다'),
  ('home_brand_kicker', 'Brand Story'),
  ('home_brand_title_1', '시간이 지나도'),
  ('home_brand_title_2', '자연스럽게 빛나는 주얼리'),
  ('home_brand_description', 'Ju는 과한 장식보다 균형과 착용감을 먼저 봅니다. 매일의 옷차림에도, 특별한 날에도 편안하게 어울리는 주얼리를 제안합니다.'),
  ('home_brand_cta', '브랜드 이야기 보기'),
  ('home_collection_kicker', 'Collection'),
  ('home_collection_title', '카테고리별 컬렉션'),
  ('home_collection_necklaces_title', 'NECKLACES'),
  ('home_collection_necklaces_subtitle', '목걸이'),
  ('home_collection_earrings_title', 'EARRINGS'),
  ('home_collection_earrings_subtitle', '귀걸이'),
  ('home_collection_rings_title', 'RINGS'),
  ('home_collection_rings_subtitle', '반지'),
  ('home_collection_bracelets_title', 'BRACELETS'),
  ('home_collection_bracelets_subtitle', '팔찌'),
  ('home_recommended_kicker', 'Recommended'),
  ('home_recommended_title', 'Ju 추천 제품'),
  ('home_signature_kicker', 'Signature Collection'),
  ('home_signature_title_1', '빛의 결을 담은'),
  ('home_signature_title_2', '시그니처 컬렉션'),
  ('home_signature_description', '작지만 선명한 반짝임, 매일 손이 가는 편안한 비율. Ju가 오래 착용할 수 있는 기본을 세심하게 고릅니다.'),
  ('home_signature_cta', '시그니처 제품 보기'),
  ('home_consult_kicker', 'Gift & Consultation'),
  ('home_consult_title_1', '마음을 전하는 순간도'),
  ('home_consult_title_2', '차분하게 준비해 드립니다'),
  ('home_consult_description', '착용할 분의 취향, 예산, 필요한 날짜를 알려주시면 어울리는 제품과 포장까지 함께 안내해 드립니다.'),
  ('home_consult_cta', '상담 예약하기'),
  ('home_consult_feature_1_title', '선물 포장'),
  ('home_consult_feature_1_description', '받는 순간까지 정돈된 패키지로 준비합니다.'),
  ('home_consult_feature_2_title', '1:1 상담'),
  ('home_consult_feature_2_description', '취향과 예산에 맞춰 부담 없이 비교해 드립니다.'),
  ('home_consult_feature_3_title', '제품 확인'),
  ('home_consult_feature_3_description', '소재와 스펙, 관리 방법까지 함께 안내합니다.'),
  ('home_footer_note', '오래 착용할 수 있는 빛을 Ju의 시선으로 제안합니다.');
