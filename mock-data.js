// Preloaded Sample Data for Instant Experience (Korean travel spots & insights)
const INITIAL_SAMPLE_PINS = [
  {
    id: "pin_tokyo_01",
    title: "도쿄 시부야 스카이 노을 꿀팁! 예약 시간대 & 포토존 3곳",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    platform: "youtube",
    category: "travel",
    tags: ["도쿄여행", "시부야", "야경스팟", "포토존", "3박4일"],
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    location: {
      name: "시부야 스카이 (Shibuya Sky)",
      city: "도쿄 (Tokyo)",
      address: "2 Chome-24-12 Shibuya, Tokyo",
      lat: 35.6585,
      lng: 139.7013
    },
    memo: "일몰 40분 전 입장 예약이 가장 베스트! 코너 자리에서 역광 실루엣 샷 필수. 가방은 사물함에 넣어야 하니 폰만 챙기기.",
    insightPoints: [
      "일몰 40분 전 시간대로 사전 예약 필수",
      "북서쪽 코너에서 후지산과 도쿄타워가 동시에 보임",
      "야외 루프탑 바람이 강하니 얇은 외투 지참"
    ],
    recommendedDay: "Day 1 (저녁)",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  },
  {
    id: "pin_tokyo_02",
    title: "현지인 줄서는 츠키지 장외시장 우니동 & 계란말이 골목 투어",
    url: "https://www.instagram.com/reel/C3_sample1",
    platform: "instagram",
    category: "food",
    tags: ["도쿄맛집", "츠키지시장", "우니동", "길거리음식"],
    thumbnail: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    location: {
      name: "츠키지 장외시장 (Tsukiji Outer Market)",
      city: "도쿄 (Tokyo)",
      address: "4 Chome-16-2 Tsukiji, Chuo City, Tokyo",
      lat: 35.6655,
      lng: 139.7707
    },
    memo: "아침 8시~9시 사이에 가야 웨이팅 적음! 야마초 100엔 계란말이랑 우니 토라(Toratora) 성게알 덮밥 강추.",
    insightPoints: [
      "오전 8:30 방문 시 대기 10분 이내로 단축",
      "현금 결제만 가능한 점포가 많으니 잔돈 준비",
      "시장 골목 안쪽 스탠딩 식사 구역 이용할 것"
    ],
    recommendedDay: "Day 2 (아침)",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  },
  {
    id: "pin_tokyo_03",
    title: "도쿄 힙스터 성지 나카메구로 & 다이칸야마 감성 산책 코스",
    url: "https://www.instagram.com/reel/C4_sample2",
    platform: "instagram",
    category: "travel",
    tags: ["도쿄카페", "나카메구로", "다이칸야마", "감성여행"],
    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    location: {
      name: "스타벅스 리저브 로스터리 도쿄 & 츠타야 서점",
      city: "도쿄 (Tokyo)",
      address: "Nakameguro, Meguro City, Tokyo",
      lat: 35.6441,
      lng: 139.6987
    },
    memo: "나카메구로 메구로강 따라 벚꽃길 걷고 리저브 테라스에서 커피 한잔. 도보 10분으로 다이칸야마 츠타야 이동!",
    insightPoints: [
      "스타벅스 로스터리는 오픈런 또는 평일 오후 2시 추천",
      "츠타야 서점 2층 안진 라운지 분위기 최고",
      "골목 편집숍들은 보통 12시 이후 오픈"
    ],
    recommendedDay: "Day 2 (오후)",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString()
  },
  {
    id: "pin_jeju_01",
    title: "제주 서쪽 노을 감성 끝판왕! 애월-한림 해안도로 숨은 카페 4선",
    url: "https://www.youtube.com/watch?v=sample_jeju",
    platform: "youtube",
    category: "travel",
    tags: ["제주여행", "애월카페", "노을맛집", "해안도로", "2박3일"],
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    location: {
      name: "한담해변 & 협재해수욕장 일몰 포인트",
      city: "제주도 (Jeju)",
      address: "제주특별자치도 제주시 애월읍 애월로 11",
      lat: 33.4625,
      lng: 126.3112
    },
    memo: "애월 한담산책로에서 산책 후 협재 쪽으로 드라이브. 비양도 뒤로 지는 일몰 뷰가 진짜 예술임.",
    insightPoints: [
      "일몰 1시간 전 한담산책로 주차장 만차 주의 (인근 공영주차장 이용)",
      "바람이 많이 부니 삼각대 고정 필수",
      "주변 딱새우회 포장해서 숙소에서 먹기 추천"
    ],
    recommendedDay: "Day 1 (오후)",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
  },
  {
    id: "pin_jeju_02",
    title: "도민이 몰래가는 제주 흑돼지 & 보말칼국수 찐 로컬 맛집",
    url: "https://www.instagram.com/p/sample_jeju_food",
    platform: "instagram",
    category: "food",
    tags: ["제주맛집", "흑돼지", "보말칼국수", "로컬식당"],
    thumbnail: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    location: {
      name: "서귀포 올레시장 인근 로컬 흑돼지 골목",
      city: "제주도 (Jeju)",
      address: "제주특별자치도 서귀포시 서귀동",
      lat: 33.2494,
      lng: 126.5638
    },
    memo: "멜젓에 푹 찍어 먹는 두툼한 근고기. 저녁 6시 넘어가면 대기 생기니 5시 30분 방문 권장.",
    insightPoints: [
      "고사리와 묵은지를 함께 구워 먹는 조합이 핵심",
      "식후 올레시장에서 마농치킨, 오메기떡 야식 쇼핑",
      "렌터카 주차는 올레시장 공영주차타워 이용 편리"
    ],
    recommendedDay: "Day 2 (저녁)",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString()
  },
  {
    id: "pin_insight_01",
    title: "성공하는 사람들의 아침 15분 루틴 - 뇌과학 기반 모닝 루틴",
    url: "https://www.youtube.com/watch?v=sample_routine",
    platform: "youtube",
    category: "insight",
    tags: ["자기계발", "모닝루틴", "생산성", "동기부여", "뇌과학"],
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    location: {
      name: "홈 오피스 / 일상",
      city: "생산성/라이프",
      address: ""
    },
    memo: "기상 직후 스마트폰 보지 않기, 햇빛 5분 쬐기, 미온수 한 잔, 가장 중요한 1가지 일(Most Important Task) 메모하기.",
    insightPoints: [
      "기상 직후 도파민 중독(SNS) 차단이 하루 집중력을 결정함",
      "햇빛을 보면 멜라토닌 분비 억제 & 세로토닌 활성화",
      "오늘 반드시 끝낼 '원 씽(One Thing)'을 포스트잇에 적고 시작"
    ],
    recommendedDay: "상시 루틴",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
  },
  {
    id: "pin_insight_02",
    title: "일 잘하는 사람의 노션 템플릿 & 프로젝트 관리 프레임워크",
    url: "https://www.youtube.com/watch?v=sample_notion",
    platform: "youtube",
    category: "insight",
    tags: ["노션", "생산성", "프로젝트관리", "일잘러", "정리법"],
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
    location: {
      name: "워크스페이스",
      city: "생산성/라이프",
      address: ""
    },
    memo: "PARA 방식(Projects, Areas, Resources, Archives)을 활용한 두 번째 뇌(Second Brain) 구축 시스템 정리.",
    insightPoints: [
      "기한이 있는 실행 목표는 Projects로 분리",
      "평생 유지할 지속 영역(건강, 재정, 공부)은 Areas로 관리",
      "참고 자료는 즉시 Resources로 아카이빙 후 검색 활용"
    ],
    recommendedDay: "생산성 시스템",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString()
  }
];
