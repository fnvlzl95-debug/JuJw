INSERT OR IGNORE INTO categories (id, name, slug, icon, order_index)
VALUES
  (1, '반지', 'rings', '💍', 1),
  (2, '목걸이', 'necklaces', '📿', 2),
  (3, '귀걸이', 'earrings', '💎', 3),
  (4, '팔찌', 'bracelets', '⌚', 4);

INSERT OR IGNORE INTO products (
  id,
  category_id,
  name,
  spec,
  description,
  image_url,
  is_featured,
  order_index
)
VALUES
  (1, 1, '18K 솔리테어 다이아 반지', '0.3ct / 18K White Gold', '대표 베스트셀러 라인으로 웨딩 및 데일리 라인업에 적합한 반지입니다.', NULL, 1, 1),
  (2, 2, '14K 테니스 목걸이', '2.0ct Total / 14K Gold', '매장 메인 디스플레이용으로 제안하기 좋은 볼륨감 있는 대표 제품입니다.', NULL, 1, 2),
  (3, 3, '18K 드롭 귀걸이', '0.5ct / 18K Rose Gold', '선물 수요가 높은 드롭 스타일 제품으로 시즌 제안에 적합합니다.', NULL, 1, 3),
  (4, 4, '18K 테니스 팔찌', '3.0ct Total / 18K Gold', '브랜드 대표 팔찌 라인으로 세트 제안이 가능한 품목입니다.', NULL, 1, 4),
  (5, 1, '플래티넘 웨딩 밴드', 'Pt950 / 3mm', '커플 및 웨딩 상담에 자주 포함되는 베이직 플래티넘 밴드입니다.', NULL, 0, 5),
  (6, 2, '18K 펄 펜던트', 'South Sea Pearl / 18K', '중장년 고객층 비중이 높은 매장에 적합한 클래식 라인입니다.', NULL, 0, 6),
  (7, 3, '14K 후프 귀걸이', '14K Gold / 20mm', '기본 판매량이 높은 데일리 후프 제품입니다.', NULL, 0, 7),
  (8, 4, '14K 체인 팔찌', '14K Gold / 18cm', '레이어드 판매용으로 제안하기 쉬운 기본 체인 스타일입니다.', NULL, 0, 8);

INSERT OR IGNORE INTO settings (key, value)
VALUES
  ('siteName', 'Ju Jewelry'),
  ('siteUrl', 'https://jujewelry.co.kr'),
  ('heroTitle', '믿을 수 있는 귀금속 파트너'),
  ('heroSubtitle', 'Premium Jewelry Wholesale'),
  ('heroDescription', '사업자 고객을 위한 주얼리 도매 상담과 대표 라인업 안내를 제공합니다.'),
  ('intro', '종로권 주얼리 도매 파트너로서 안정적인 품질과 빠른 응대를 지향합니다.'),
  ('phone', '02-000-0000'),
  ('email', 'info@jujewelry.kr'),
  ('addressLine1', '서울특별시 종로구 종로3가 귀금속 상권'),
  ('addressLine2', '방문 전 상담 예약 권장'),
  ('postalCode', '03140'),
  ('hoursWeekday', '평일 09:00 - 18:00'),
  ('hoursWeekend', '주말/공휴일 휴무 (예약 상담 가능)'),
  ('parking', '인근 공영주차장 이용'),
  ('businessName', 'Ju Jewelry'),
  ('representativeName', '홍길동'),
  ('businessNumber', '000-00-00000'),
  ('mapEmbedUrl', 'https://www.google.com/maps?q=%EC%A2%85%EB%A1%9C3%EA%B0%80%20%EA%B7%80%EA%B8%88%EC%86%8D%EA%B1%B0%EB%A6%AC&output=embed'),
  ('naverMapUrl', 'https://map.naver.com/p/search/%EC%A2%85%EB%A1%9C3%EA%B0%80%20%EA%B7%80%EA%B8%88%EC%86%8D%EA%B1%B0%EB%A6%AC'),
  ('footerNote', '실제 사업자 정보와 상세 주소는 관리자 설정에서 교체할 수 있습니다.'),
  ('contactResponseTime', '영업일 기준 24시간 이내 연락');

INSERT OR IGNORE INTO admins (id, email, password_hash, name)
VALUES (
  1,
  'admin@jujewelry.kr',
  '433a759c8bbe26b3ac2d7d739846d796:10c228606b7654e4cfee315e1c20b1da04e9111390760683e7d0b05a63ae4bd58a106d986c349023822c89f34419b3054b4bef0831ed417da06ea7dbb3fd00f3',
  'Ju Jewelry Admin'
);
