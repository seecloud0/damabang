// ==========================================================================
// Damabang (담아방) Mobile Main Application Engine - v12.0.0
// - Web Share Target Immediate Auto-Save (Instagram / YouTube 1-Click Share)
// - Smart Content & Tag Analyzer with Deep Keyword & Preset Matching
// - Real Media & Location-matched High Quality Visual Engine
// - 1-Tap Quick Auto-fill Chips & Clipboard Auto-Paste
// - 100% On-Device Local Storage (IndexedDB)
// ==========================================================================

// ==========================================================================
// Smart Content & Metadata Analyzer Engine
// ==========================================================================
const SmartContentAnalyzer = {
  PRESETS: {
    'shibuya': {
      title: '도쿄 시부야 스카이 노을 & 루프탑 일몰 예약 꿀팁',
      category: 'travel',
      city: '도쿄 (Tokyo)',
      spotName: '시부야 스카이 (Shibuya Sky)',
      tags: ['도쿄여행', '시부야스카이', '노을맛집', '야경명소', '3박4일'],
      memo: '일몰 40분 전 시간대로 사전 예약 필수! 북서쪽 코너에서 후지산과 도쿄타워가 동시에 보이며, 루프탑 바람이 강하니 얇은 외투 지참하기.',
      thumbnail: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
      insightPoints: ['일몰 40분 전 사전 예약 필수', '북서쪽 코너 도쿄타워 뷰 명당', '사물함에 가방 보관 후 폰만 지참']
    },
    'tsukiji': {
      title: '도쿄 츠키지 장외시장 줄서는 우니동 & 계란말이 골목 투어',
      category: 'food',
      city: '도쿄 (Tokyo)',
      spotName: '츠키지 장외시장 (Tsukiji Outer Market)',
      tags: ['도쿄맛집', '츠키지시장', '우니동', '계란말이', '미식투어'],
      memo: '오전 8:30 방문 시 대기 시간 10분 이내! 야마초 100엔 계란말이와 우니 토라 성게알 덮밥 필수 코스, 현금 결제 준비.',
      thumbnail: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
      insightPoints: ['오전 8:30 방문으로 대기 최소화', '우니토라 성게알 덮밥 강추', '현금 결제 점포 많음']
    },
    'aewol': {
      title: '제주 애월 한담해변 노을 카페 & 오션뷰 드라이브 코스',
      category: 'travel',
      city: '제주도 (Jeju)',
      spotName: '한담해변 & 애월 카페거리',
      tags: ['제주여행', '애월카페', '노을명소', '한담산책로', '감성여행'],
      memo: '일몰 1시간 전 한담산책로 주차 후 협재 쪽으로 드라이브. 비양도 너머로 지는 일몰 뷰와 딱새우회 포장 추천.',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      insightPoints: ['일몰 1시간 전 한담산책로 주차', '비양도 배경 노을 뷰 최고', '주변 딱새우회 포장 추천']
    },
    'seongsu': {
      title: '성수동 신상 감성 베이커리 & 팝업스토어 데이트 코스',
      category: 'food',
      city: '서울 (Seoul)',
      spotName: '성수동 카페거리 & 연무장길',
      tags: ['서울핫플', '성수동카페', '베이커리', '디저트맛집', '주말나들이'],
      memo: '주말 오후에는 웨이팅이 길어지므로 12시 이전 방문 추천! 소금빵 맛집과 팝업스토어 도보 5분 거리 동선 구성.',
      thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      insightPoints: ['오전 11:30 방문으로 웨이팅 단축', '연무장길 팝업스토어 순회', '소금빵 & 에스프레소 코스']
    },
    'haeundae': {
      title: '부산 해운대 블루라인파크 해변열차 & 광안리 드론쇼 명당',
      category: 'travel',
      city: '부산 (Busan)',
      spotName: '해운대 블루라인파크 & 미포정거장',
      tags: ['부산여행', '해운대', '해변열차', '광안리', '야경투어'],
      memo: '미포에서 송정까지 스카이캡슐 탑승 시 바다 쪽 좌석 사전 예약 필수! 저녁에는 광안리 해변에서 드론라이트쇼 관람.',
      thumbnail: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80',
      insightPoints: ['스카이캡슐 2주 전 사전 예약', '미포 출발 편도 탑승 추천', '광안리 토요일 드론쇼 연계']
    },
    'notion': {
      title: '일잘러의 노션 생산성 루틴 & 스마트 시간 관리 비법',
      category: 'insight',
      city: '생산성/라이프',
      spotName: '자기계발 & 워크스페이스',
      tags: ['생산성', '노션', '시간관리', '습관루틴', '자기계발'],
      memo: '하루 10분 아침 저널링과 주간 리뷰 루틴 구축하기. 할 일 목록을 우선순위 3가지로 압축하여 집중력 극대화.',
      thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
      insightPoints: ['아침 10분 데일리 플래닝', '우선순위 3가지 법칙 적용', '주말 30분 위클리 리뷰']
    },
    'kyoto': {
      title: '교토 기요미즈데라(청수사) 아침 산책 & 아라시야마 대나무숲',
      category: 'travel',
      city: '교토 (Kyoto)',
      spotName: '기요미즈데라 & 니넨자카',
      tags: ['교토여행', '청수사', '아라시야마', '감성산책', '일본여행'],
      memo: '오전 7시 개장 시간에 맞춰 청수사 방문 시 인파 없이 인생샷 촬영 가능. 이후 아라비카 응커피 테라스 추천.',
      thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      insightPoints: ['오전 7시 얼리버드 방문 필수', '니넨자카-산넨자카 전통 골목', '아라시야마 대나무숲 힐링']
    }
  },

  CITIES: {
    '도쿄': { name: '도쿄 (Tokyo)', defaultImg: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80' },
    '시부야': { city: '도쿄 (Tokyo)', name: '시부야 (Shibuya)', defaultImg: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80' },
    '신주쿠': { city: '도쿄 (Tokyo)', name: '신주쿠', defaultImg: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80' },
    '긴자': { city: '도쿄 (Tokyo)', name: '긴자', defaultImg: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80' },
    '오사카': { name: '오사카 (Osaka)', defaultImg: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=800&q=80' },
    '교토': { name: '교토 (Kyoto)', defaultImg: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80' },
    '후쿠오카': { name: '후쿠오카 (Fukuoka)', defaultImg: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80' },
    '유후인': { city: '후쿠오카 (Fukuoka)', name: '유후인 료칸', defaultImg: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80' },
    '삿포로': { name: '삿포로 (Sapporo)', defaultImg: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80' },
    '제주': { name: '제주도 (Jeju)', defaultImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80' },
    '제주도': { name: '제주도 (Jeju)', defaultImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80' },
    '애월': { city: '제주도 (Jeju)', name: '애월 한담해변', defaultImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
    '서귀포': { city: '제주도 (Jeju)', name: '서귀포', defaultImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80' },
    '성수': { city: '서울 (Seoul)', name: '성수동', defaultImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    '성수동': { city: '서울 (Seoul)', name: '성수동', defaultImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    '홍대': { city: '서울 (Seoul)', name: '홍대/연남', defaultImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    '부산': { name: '부산 (Busan)', defaultImg: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80' },
    '해운대': { city: '부산 (Busan)', name: '해운대', defaultImg: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80' },
    '광안리': { city: '부산 (Busan)', name: '광안리', defaultImg: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80' },
    '강릉': { name: '강릉 (Gangneung)', defaultImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
    '경주': { name: '경주 (Gyeongju)', defaultImg: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80' },
    '파리': { name: '파리 (Paris)', defaultImg: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80' },
    '런던': { name: '런던 (London)', defaultImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80' },
    '방콕': { name: '방콕 (Bangkok)', defaultImg: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80' },
    '다낭': { name: '다낭 (Da Nang)', defaultImg: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80' },
    '발리': { name: '발리 (Bali)', defaultImg: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' }
  },

  FOOD_KEYWORDS: [
    '맛집', '카페', '라멘', '스시', '초밥', '우동', '디저트', '베이커리', '빵집', '식당', '고기', '삼겹살',
    '오마카세', '이자카야', '와인', '브런치', '커피', '밥집', '미식', '돈카츠', '돈까스', '야키토리', '텐동',
    '떡볶이', '국밥', '파스타', '피자', '버거', '수제버거', '흑돼지', '회', '해산물', '갈비', '솥밥', '안주',
    '맥주', '하이볼', '야시장', '크루아상', '에스프레소', '말차', '젤라또', '소금빵', '베이글', '샌드위치'
  ],

  INSIGHT_KEYWORDS: [
    '생산성', '공부', '개발', '독서', '마인드셋', '자기계발', '습관', '루틴', '동기부여', '꿀팁', '노션',
    'ai', '챗지피티', 'chatgpt', '경제', '재테크', '주식', '투자', '코딩', '업무', '효율', '책추천', '부업',
    '마케팅', '성공', '강의', '지식', '통찰', '인사이트', '커리어', '시간관리', '정리'
  ],

  TRAVEL_KEYWORDS: [
    '여행', '투어', '핫플', '명소', '랜드마크', '전망대', '호텔', '료칸', '숙소', '에어비앤비', '리조트',
    '공항', '비행기', '항공권', '야경', '축제', '감성숙소', '해변', '바다', '산책', '테마파크', '디즈니',
    '유니버셜', '온천', '일몰', '선셋', '포토스팟', '인생샷', '루프탑', '코스', '드라이브'
  ],

  analyze(rawInput, inputTitle = '') {
    const text = String(rawInput || '').trim();
    
    // 1. Extract URL
    const urlMatch = text.match(/(https?:\/\/[^\s]+)/i);
    const url = urlMatch ? urlMatch[0] : (text.startsWith('http') ? text : '');
    
    // 2. Extract Hashtags
    const tagMatches = text.match(/#([a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+)/g) || [];
    const tags = tagMatches.map(t => t.replace('#', '').trim()).filter(Boolean);

    // 3. Detect Platform & IDs
    let platform = 'generic';
    let youtubeId = null;
    let instaCode = null;
    let realThumbnail = null;
    let embedUrl = null;

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      platform = 'youtube';
      const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
      youtubeId = ytMatch ? ytMatch[1] : null;
      if (youtubeId) {
        realThumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
        embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
      }
    } else if (url.includes('instagram.com')) {
      platform = 'instagram';
      const instaMatch = url.match(/instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/i);
      instaCode = instaMatch ? instaMatch[1] : null;
      if (instaCode) {
        realThumbnail = `https://www.instagram.com/p/${instaCode}/media/?size=l`;
        embedUrl = `https://www.instagram.com/p/${instaCode}/embed/`;
      }
    }

    // 4. Identify City & Spot Name from Text / Tags
    let detectedCity = '';
    let detectedSpot = '';
    let defaultImg = '';

    const searchCorpus = (inputTitle + ' ' + text + ' ' + tags.join(' ')).toLowerCase();

    for (const [key, info] of Object.entries(this.CITIES)) {
      if (searchCorpus.includes(key.toLowerCase())) {
        detectedCity = info.city || info.name;
        detectedSpot = info.name || key;
        defaultImg = info.defaultImg;
        break;
      }
    }

    // 5. Determine Category
    let category = 'lifestyle';
    const isFood = this.FOOD_KEYWORDS.some(k => searchCorpus.includes(k));
    const isInsight = this.INSIGHT_KEYWORDS.some(k => searchCorpus.includes(k));
    const isTravel = this.TRAVEL_KEYWORDS.some(k => searchCorpus.includes(k)) || !!detectedCity;

    if (isFood) {
      category = 'food';
      if (!defaultImg) defaultImg = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
    } else if (isInsight) {
      category = 'insight';
      if (!defaultImg) defaultImg = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80';
    } else if (isTravel) {
      category = 'travel';
      if (!defaultImg) defaultImg = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
    }

    // 6. Clean Text for Title
    let cleanText = text
      .replace(/(https?:\/\/[^\s]+)/gi, '')
      .replace(/#([a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+)/g, '')
      .replace(/[\r\n]+/g, ' ')
      .trim();

    let title = inputTitle.trim() || cleanText.slice(0, 50).trim();
    if (!title && tags.length > 0) {
      title = `${tags.slice(0, 2).map(t => '#' + t).join(' ')} 핵심 꿀팁 & 명소`;
    } else if (!title && detectedCity) {
      title = `${detectedCity} ${detectedSpot || '핫플레이스'} 추천 코스`;
    } else if (!title) {
      title = platform === 'instagram' ? '인스타그램 릴스 저장 콘텐츠' : platform === 'youtube' ? '유튜브 추천 영상' : '담아둔 콘텐츠';
    }

    // Final tags consolidation
    let finalTags = tags;
    if (finalTags.length === 0) {
      if (detectedCity) {
        finalTags = [detectedCity.split(' ')[0], detectedSpot.split(' ')[0], category === 'food' ? '맛집투어' : category === 'travel' ? '여행' : '인사이트'].filter(Boolean);
      } else {
        finalTags = [category === 'food' ? '맛집' : category === 'travel' ? '여행지' : category === 'insight' ? '자기계발' : '라이프'];
      }
    }

    // Memo structured formatting
    const memo = cleanText.length > 15 
      ? cleanText 
      : `${title}\n\n📌 추천 포인트: ${detectedCity ? detectedCity + ' ' + detectedSpot : '소장 가치 높은 콘텐츠'}\n💡 꿀팁: 사전 예약 및 시간대 확인 후 방문 추천!`;

    const finalThumbnail = realThumbnail || defaultImg || 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80';

    return {
      url: url || text,
      platform,
      title,
      category,
      city: detectedCity,
      spotName: detectedSpot,
      tags: finalTags,
      memo,
      thumbnail: finalThumbnail,
      realThumbnail,
      embedUrl,
      insightPoints: [
        `${title} 핵심 포인트 요약`,
        detectedCity ? `📍 추천 위치: ${detectedCity} ${detectedSpot}` : '💡 유용한 인사이트 보관됨',
        '⏰ 추천 시간대 확인 후 방문 권장'
      ]
    };
  }
};

class DamabangApp {
  constructor() {
    this.currentTab = 'feed';
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.pins = [];
    this.selectedPinIds = new Set();
    this.isSelectionMode = false;
    this.activePin = null;

    this.init();
  }

  async init() {
    // 1. Initialize Local Storage
    await window.storageManager.init();

    // 2. Load existing data or populate with initial sample data
    let existingPins = await window.storageManager.getAllPins();
    if (!existingPins || existingPins.length === 0) {
      console.log('Populating initial Korean travel & insight presets for Damabang');
      await window.storageManager.importPins(INITIAL_SAMPLE_PINS);
      this.pins = await window.storageManager.getAllPins();
    } else {
      this.pins = existingPins;
    }

    // 3. Setup DOM Event Listeners
    this.bindEvents();

    // 4. Render Initial Views
    this.render();

    // 5. Register PWA Service Worker
    this.registerServiceWorker();

    // 6. Handle Web Share Target Immediate Auto-Save
    this.handleIncomingShareTarget();

    // 7. Check Clipboard for Instagram links
    this.checkClipboardForInstagramLink();
  }

  // Handle Incoming Share from Instagram / YouTube / Mobile Share Sheet
  async handleIncomingShareTarget() {
    const fullSearch = window.location.search || (window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '');
    const params = new URLSearchParams(fullSearch);
    const sharedUrl = params.get('url');
    const sharedText = params.get('text');
    const sharedTitle = params.get('title');
    const action = params.get('action');

    if (sharedUrl || sharedText || sharedTitle) {
      const combinedInput = [sharedUrl, sharedText].filter(Boolean).join(' ');
      console.log('🔥 Incoming Web Share Target detected:', { sharedUrl, sharedText, sharedTitle, combinedInput });

      const analysis = SmartContentAnalyzer.analyze(combinedInput, sharedTitle || '');

      const newPin = {
        id: 'pin_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        url: analysis.url,
        title: analysis.title,
        platform: analysis.platform,
        category: analysis.category,
        tags: analysis.tags,
        location: {
          city: analysis.city,
          name: analysis.spotName,
          address: ''
        },
        memo: analysis.memo,
        thumbnail: analysis.thumbnail,
        insightPoints: analysis.insightPoints,
        createdAt: new Date().toISOString()
      };

      await window.storageManager.savePin(newPin);
      this.pins = await window.storageManager.getAllPins();

      this.switchTab('feed');
      this.render();

      this.showToast(`🎉 '${analysis.title}' 담아방에 자동 보관 완료!`);
      setTimeout(() => {
        this.openDetailModal(newPin);
      }, 350);

      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (action === 'add') {
      this.openAddModal();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // Check Clipboard for copied Instagram / YouTube Links
  async checkClipboardForInstagramLink() {
    if (!navigator.clipboard || !navigator.clipboard.readText) return;

    try {
      const checkClip = async () => {
        try {
          const text = await navigator.clipboard.readText();
          if (text && (text.includes('instagram.com') || text.includes('youtube.com') || text.includes('youtu.be'))) {
            const alreadyExists = this.pins.some(p => p.url && text.includes(p.url));
            if (!alreadyExists) {
              const banner = document.getElementById('clipboard-banner');
              const urlText = document.getElementById('clipboard-url-text');
              if (banner && urlText) {
                this.pendingClipboardText = text;
                urlText.innerText = text;
                banner.style.display = 'flex';
              }
            }
          }
        } catch (e) {
          // ignore
        }
      };

      window.addEventListener('focus', checkClip);
      setTimeout(checkClip, 800);
    } catch (e) {
      console.warn('Clipboard check disabled:', e);
    }
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('PWA Service Worker registered:', reg.scope))
          .catch(err => console.warn('Service Worker registration failed:', err));
      });
    }
  }

  bindEvents() {
    window.addEventListener('pageshow', () => this.handleIncomingShareTarget());
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.handleIncomingShareTarget();
      }
    });

    // Tab Navigation
    document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Category Chips & Horizontal Carousel Slider
    const categoryContainer = document.getElementById('category-chips');
    const scrollLeftBtn = document.getElementById('chip-scroll-left');
    const scrollRightBtn = document.getElementById('chip-scroll-right');

    const updateScrollButtons = () => {
      if (!categoryContainer || !scrollLeftBtn || !scrollRightBtn) return;
      const { scrollLeft, scrollWidth, clientWidth } = categoryContainer;
      scrollLeftBtn.classList.toggle('hidden', scrollLeft <= 5);
      scrollRightBtn.classList.toggle('hidden', scrollLeft >= scrollWidth - clientWidth - 5);
    };

    if (categoryContainer) {
      document.querySelectorAll('#category-chips .cat-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#category-chips .cat-chip').forEach(c => c.classList.remove('active'));
          btn.classList.add('active');
          this.currentCategory = btn.getAttribute('data-category');
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          this.renderFeed();
        });
      });

      if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', () => {
          categoryContainer.scrollBy({ left: -140, behavior: 'smooth' });
        });
      }
      if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => {
          categoryContainer.scrollBy({ left: 140, behavior: 'smooth' });
        });
      }

      let isDown = false;
      let startX;
      let scrollLeft;

      categoryContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        categoryContainer.classList.add('is-dragging');
        startX = e.pageX - categoryContainer.offsetLeft;
        scrollLeft = categoryContainer.scrollLeft;
      });

      categoryContainer.addEventListener('mouseleave', () => {
        isDown = false;
        categoryContainer.classList.remove('is-dragging');
      });

      categoryContainer.addEventListener('mouseup', () => {
        isDown = false;
        categoryContainer.classList.remove('is-dragging');
      });

      categoryContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - categoryContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        categoryContainer.scrollLeft = scrollLeft - walk;
        updateScrollButtons();
      });

      categoryContainer.addEventListener('scroll', updateScrollButtons);
      setTimeout(updateScrollButtons, 200);
    }

    // Quick Preset Chips in Add Modal
    document.querySelectorAll('#quick-preset-chips .quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const presetKey = chip.getAttribute('data-preset');
        const preset = SmartContentAnalyzer.PRESETS[presetKey];
        if (preset) {
          document.getElementById('add-title').value = preset.title;
          document.getElementById('add-category').value = preset.category;
          document.getElementById('add-city').value = preset.city;
          document.getElementById('add-spot-name').value = preset.spotName;
          document.getElementById('add-tags').value = preset.tags.join(', ');
          document.getElementById('add-memo').value = preset.memo;

          this.currentAutoAnalysis = {
            ...preset,
            url: document.getElementById('add-url').value || `https://instagram.com/p/${presetKey}_sample`,
            platform: 'instagram'
          };
          this.updatePreviewBox(this.currentAutoAnalysis);
          this.showToast(`✨ '${preset.spotName}' 꿀팁 정보가 자동 채워졌습니다!`);
        }
      });
    });

    // Search Input
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');

    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      searchClear.style.display = this.searchQuery.length > 0 ? 'block' : 'none';
      this.renderFeed();
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      this.searchQuery = '';
      searchClear.style.display = 'none';
      this.renderFeed();
    });

    // Quick Paste Button in Header
    const btnQuickPaste = document.getElementById('btn-quick-paste');
    if (btnQuickPaste) {
      btnQuickPaste.addEventListener('click', async () => {
        let textToPaste = '';
        if (navigator.clipboard && navigator.clipboard.readText) {
          try {
            textToPaste = await navigator.clipboard.readText();
          } catch (e) {
            // fallback
          }
        }
        if (!textToPaste) {
          textToPaste = prompt('인스타그램 또는 유튜브 링크 / 본문 내용을 붙여넣으세요:');
        }

        if (textToPaste && textToPaste.trim()) {
          const analysis = SmartContentAnalyzer.analyze(textToPaste.trim());
          this.openAddModal(analysis);
          this.showToast('✨ 링크와 내용을 분석하여 자동으로 채웠습니다!');
        }
      });
    }

    // Clipboard Banner Actions
    const btnClipboardAdd = document.getElementById('btn-clipboard-add');
    const btnClipboardClose = document.getElementById('btn-clipboard-close');
    const clipboardBanner = document.getElementById('clipboard-banner');

    if (btnClipboardAdd) {
      btnClipboardAdd.addEventListener('click', () => {
        if (this.pendingClipboardText) {
          const analysis = SmartContentAnalyzer.analyze(this.pendingClipboardText);
          this.openAddModal(analysis);
          if (clipboardBanner) clipboardBanner.style.display = 'none';
          this.showToast('✨ 복사된 링크가 자동 입력되었습니다!');
        }
      });
    }

    if (btnClipboardClose && clipboardBanner) {
      btnClipboardClose.addEventListener('click', () => {
        clipboardBanner.style.display = 'none';
      });
    }

    // Selection Mode Toggle
    const toggleSelectBtn = document.getElementById('btn-toggle-select');
    toggleSelectBtn.addEventListener('click', () => {
      this.toggleSelectionMode();
    });

    // Quick Sample Load Button
    document.getElementById('btn-quick-sample').addEventListener('click', async () => {
      if (confirm('도쿄/제주도 여행 및 인사이트 예시 데이터를 담아방에 추가하시겠습니까?')) {
        await window.storageManager.importPins(INITIAL_SAMPLE_PINS);
        this.pins = await window.storageManager.getAllPins();
        this.render();
        this.showToast('✨ 예시 데이터가 담아방에 추가되었습니다!');
      }
    });

    // Selection Bar Plan Action
    document.getElementById('btn-plan-selected').addEventListener('click', () => {
      if (this.selectedPinIds.size === 0) {
        this.showToast('일정을 생성할 핀을 먼저 선택해주세요.');
        return;
      }
      this.switchTab('planner');
      this.generateAIPlanFromSelected();
    });

    // FAB Add Modal
    document.getElementById('fab-add').addEventListener('click', () => {
      this.openAddModal();
    });

    document.getElementById('btn-close-add').addEventListener('click', () => {
      this.closeModal('modal-add');
    });

    // Detail Modal Close
    document.getElementById('btn-close-detail').addEventListener('click', () => {
      this.closeModal('modal-detail');
    });

    // Guide Modal
    document.getElementById('btn-show-pwa-guide').addEventListener('click', () => {
      this.openModal('modal-pwa-guide');
    });
    document.getElementById('btn-close-pwa-guide').addEventListener('click', () => {
      this.closeModal('modal-pwa-guide');
    });
    document.getElementById('btn-confirm-guide').addEventListener('click', () => {
      this.closeModal('modal-pwa-guide');
    });

    // Add Form Submit
    document.getElementById('form-add-pin').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddPinSubmit();
    });

    // Live URL & Text Auto-Analysis on Paste / Input
    const addUrlInput = document.getElementById('add-url');
    addUrlInput.addEventListener('input', (e) => {
      this.handleUrlInputLive(e.target.value.trim());
    });

    // Live Title Input listener to update category/tags/spot
    const addTitleInput = document.getElementById('add-title');
    addTitleInput.addEventListener('input', (e) => {
      const titleVal = e.target.value.trim();
      if (titleVal.length >= 2) {
        const partialAnalysis = SmartContentAnalyzer.analyze(titleVal, titleVal);
        if (partialAnalysis.city && !document.getElementById('add-city').value) {
          document.getElementById('add-city').value = partialAnalysis.city;
        }
        if (partialAnalysis.spotName && !document.getElementById('add-spot-name').value) {
          document.getElementById('add-spot-name').value = partialAnalysis.spotName;
        }
        if (partialAnalysis.category) {
          document.getElementById('add-category').value = partialAnalysis.category;
        }
      }
    });

    // Planner Tab Generate Button
    document.getElementById('btn-generate-ai-plan').addEventListener('click', () => {
      this.generateAIPlanFromFilters();
    });

    // Settings Actions: Export JSON
    document.getElementById('btn-export-json').addEventListener('click', async () => {
      const jsonStr = await window.storageManager.exportToJSON();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `damabang_backup_${dateStr}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast('📁 스마트폰에 담아방 백업 파일이 다운로드되었습니다.');
    });

    // Settings Actions: Import JSON
    const inputImport = document.getElementById('input-import-json');
    inputImport.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        const pinsToImport = Array.isArray(data) ? data : data.pins;
        if (pinsToImport && Array.isArray(pinsToImport)) {
          await window.storageManager.importPins(pinsToImport);
          this.pins = await window.storageManager.getAllPins();
          this.render();
          this.showToast(`🎉 ${pinsToImport.length}개의 콘텐츠가 담아방에 복원되었습니다!`);
        } else {
          alert('올바른 담아방 백업 JSON 파일 형식이 아닙니다.');
        }
      } catch (err) {
        alert('파일을 읽는 중 오류가 발생했습니다: ' + err.message);
      }
    });

    // Settings Actions: Clear Data
    document.getElementById('btn-clear-data').addEventListener('click', async () => {
      if (confirm('⚠️ 담아방의 모든 저장된 핀을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        await window.storageManager.clearAll();
        this.pins = [];
        this.selectedPinIds.clear();
        this.render();
        this.showToast('🗑️ 모든 데이터가 초기화되었습니다.');
      }
    });

    // Delete Active Pin from Detail Sheet
    document.getElementById('detail-delete-btn').addEventListener('click', async () => {
      if (!this.activePin) return;
      if (confirm(`'${this.activePin.title}' 콘텐츠를 담아방에서 삭제하시겠습니까?`)) {
        await window.storageManager.deletePin(this.activePin.id);
        this.pins = await window.storageManager.getAllPins();
        this.selectedPinIds.delete(this.activePin.id);
        this.closeModal('modal-detail');
        this.render();
        this.showToast('🗑️ 핀이 삭제되었습니다.');
      }
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    const targetPane = document.getElementById(`tab-${tabId}`);
    if (targetPane) targetPane.classList.add('active');

    if (tabId === 'feed') {
      this.renderFeed();
    } else if (tabId === 'spots') {
      this.renderSpots();
    } else if (tabId === 'planner') {
      this.renderPlannerInitial();
    } else if (tabId === 'settings') {
      this.renderSettings();
    }
  }

  toggleSelectionMode() {
    this.isSelectionMode = !this.isSelectionMode;
    const btn = document.getElementById('btn-toggle-select');
    const container = document.getElementById('app-container');
    const selectionBar = document.getElementById('selection-bar');

    if (this.isSelectionMode) {
      btn.classList.add('active');
      container.classList.add('selection-mode');
      selectionBar.classList.add('active');
      this.updateSelectionCountUI();
    } else {
      btn.classList.remove('active');
      container.classList.remove('selection-mode');
      selectionBar.classList.remove('active');
      this.selectedPinIds.clear();
      this.renderFeed();
    }
  }

  updateSelectionCountUI() {
    document.getElementById('selected-count').innerText = this.selectedPinIds.size;
  }

  getFilteredPins() {
    return this.pins.filter(pin => {
      if (this.currentCategory !== 'all' && pin.category !== this.currentCategory) {
        return false;
      }

      if (this.searchQuery) {
        const query = this.searchQuery;
        const inTitle = pin.title && pin.title.toLowerCase().includes(query);
        const inMemo = pin.memo && pin.memo.toLowerCase().includes(query);
        const inCity = pin.location && pin.location.city && pin.location.city.toLowerCase().includes(query);
        const inSpot = pin.location && pin.location.name && pin.location.name.toLowerCase().includes(query);
        const inTags = pin.tags && pin.tags.some(t => t.toLowerCase().includes(query));

        return inTitle || inMemo || inCity || inSpot || inTags;
      }

      return true;
    });
  }

  render() {
    this.renderFeed();
    this.renderSpots();
    this.renderSettings();
  }

  renderFeed() {
    const grid = document.getElementById('pins-grid');
    const emptyState = document.getElementById('feed-empty');
    const filtered = this.getFilteredPins();

    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyState.style.display = 'flex';
      return;
    }

    emptyState.style.display = 'none';
    grid.innerHTML = filtered.map(pin => {
      const isSelected = this.selectedPinIds.has(pin.id);
      const isInstagram = pin.platform === 'instagram';
      const platformClass = isInstagram ? 'instagram' : 'youtube';
      const platformIcon = isInstagram ? 'ri-instagram-fill' : 'ri-youtube-fill';
      const platformName = isInstagram ? 'Reels' : 'YouTube';

      const thumbUrl = pin.thumbnail || 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80';
      const cityName = pin.location && pin.location.city ? pin.location.city : '';
      const spotName = pin.location && pin.location.name ? pin.location.name : '';
      const locationText = [cityName, spotName].filter(Boolean).join(' · ');

      const tagsHtml = (pin.tags || []).slice(0, 3).map(t => `<span class="tag-pill">#${t}</span>`).join('');

      return `
        <article class="pin-card ${isSelected ? 'selected' : ''}" data-id="${pin.id}">
          <div class="card-media-wrapper">
            <img class="card-img" src="${thumbUrl}" alt="${pin.title}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80';" />
            <div class="card-badges">
              <span class="platform-badge ${platformClass}">
                <i class="${platformIcon}"></i> ${platformName}
              </span>
            </div>
            <div class="select-checkbox">
              <i class="ri-check-line"></i>
            </div>
          </div>
          <div class="card-body">
            <h3 class="card-title">${pin.title}</h3>
            ${locationText ? `
              <div class="card-location">
                <i class="ri-map-pin-line"></i> ${locationText}
              </div>
            ` : ''}
            ${pin.memo ? `<p class="card-memo">${pin.memo}</p>` : ''}
            <div class="card-tags">${tagsHtml}</div>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.pin-card').forEach(card => {
      card.addEventListener('click', () => {
        const pinId = card.getAttribute('data-id');
        const pin = this.pins.find(p => p.id === pinId);
        if (!pin) return;

        if (this.isSelectionMode) {
          if (this.selectedPinIds.has(pinId)) {
            this.selectedPinIds.delete(pinId);
            card.classList.remove('selected');
          } else {
            this.selectedPinIds.add(pinId);
            card.classList.add('selected');
          }
          this.updateSelectionCountUI();
        } else {
          this.openDetailModal(pin);
        }
      });
    });
  }

  renderSpots() {
    const container = document.getElementById('spots-container');
    const travelPins = this.pins.filter(p => p.location && (p.location.city || p.location.name));

    if (travelPins.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="ri-map-pin-line"></i></div>
          <h3 class="empty-title">저장된 여행 장소가 없습니다</h3>
          <p class="empty-desc">새 콘텐츠를 담을 때 여행지와 장소명을 적어주시면 자동으로 지도 스팟이 구성됩니다.</p>
        </div>
      `;
      return;
    }

    const cityMap = {};
    travelPins.forEach(pin => {
      const city = pin.location.city || '기타 명소';
      if (!cityMap[city]) cityMap[city] = [];
      cityMap[city].push(pin);
    });

    container.innerHTML = Object.keys(cityMap).map(city => {
      const cityPins = cityMap[city];
      const itemsHtml = cityPins.map((pin, idx) => {
        const spotName = pin.location.name || pin.title;
        const mapSearchQuery = encodeURIComponent(`${city} ${spotName}`);
        const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${mapSearchQuery}`;

        return `
          <div class="spot-item">
            <div class="spot-info">
              <div class="spot-name">${idx + 1}. ${spotName}</div>
              <div class="spot-note">${pin.recommendedDay ? `<strong>${pin.recommendedDay}</strong> · ` : ''}${pin.memo || pin.title}</div>
            </div>
            <div class="spot-actions">
              <a href="${googleMapUrl}" target="_blank" class="spot-btn" title="구글 지도 검색">
                <i class="ri-map-pin-2-fill" style="color: var(--kraken-purple);"></i> 길찾기
              </a>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="city-group-card">
          <div class="city-header">
            <div class="city-title">
              <i class="ri-map-pin-fill" style="color: var(--kraken-purple);"></i>
              ${city}
            </div>
            <span class="tag-pill" style="color: var(--kraken-purple); background: var(--kraken-purple-subtle);">${cityPins.length}개 스팟</span>
          </div>
          <div class="spot-timeline">
            ${itemsHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  renderPlannerInitial() {
    const outputContainer = document.getElementById('plan-output-container');
    if (!outputContainer.innerHTML.trim()) {
      this.generateAIPlanFromFilters();
    }
  }

  generateAIPlanFromSelected() {
    const selectedList = this.pins.filter(p => this.selectedPinIds.has(p.id));
    if (selectedList.length === 0) return;
    this.renderPlanOutput(selectedList, '담아방 맞춤 여행 & 인사이트 플랜');
  }

  generateAIPlanFromFilters() {
    const cityFilter = document.getElementById('planner-city-select').value;
    let targetPins = this.pins;

    if (cityFilter !== 'all') {
      targetPins = this.pins.filter(p => p.location && p.location.city === cityFilter);
    }
    if (targetPins.length === 0) targetPins = this.pins;

    this.renderPlanOutput(targetPins, `${cityFilter === 'all' ? '전체 추천' : cityFilter} 스마트 여행 일정`);
  }

  renderPlanOutput(pins, titleText) {
    const container = document.getElementById('plan-output-container');
    const isInsightMode = pins.every(p => p.category === 'insight') || (pins.length === 1 && pins[0].category === 'insight');

    if (isInsightMode) {
      const insightsList = pins.flatMap(p => p.insightPoints || [p.memo || p.title]);
      let markdownText = `# 💡 ${titleText} 요약\n\n`;
      insightsList.forEach((point, i) => {
        markdownText += `${i + 1}. ${point}\n`;
      });

      container.innerHTML = `
        <div class="plan-day-card">
          <div class="plan-day-header">
            <span class="day-badge" style="background: linear-gradient(135deg, #10b981, #06b6d4);">💡 핵심 인사이트</span>
            <span class="day-theme">${titleText}</span>
          </div>
          <div class="plan-steps">
            ${insightsList.map((pt, i) => `
              <div class="plan-step-row">
                <div class="step-time">Point ${i + 1}</div>
                <div class="step-content">
                  <div class="step-title">${pt}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <button class="btn-copy-plan" style="margin-top: 14px; width: 100%;" onclick="damabangApp.copyToClipboard('${encodeURIComponent(markdownText)}')">
            <i class="ri-file-copy-line"></i> 인사이트 마크다운 복사하기
          </button>
        </div>
      `;
      return;
    }

    const days = [
      { dayNumber: 1, theme: '도착 및 핫플레이스 탐방 & 노을 스팟', slots: ['09:30', '12:30', '16:00', '19:30'], spots: [] },
      { dayNumber: 2, theme: '로컬 미식 투어 & 감성 골목 산책', slots: ['08:30', '12:00', '15:00', '18:30'], spots: [] },
      { dayNumber: 3, theme: '시그니처 랜드마크 & 힐링 코스', slots: ['10:00', '13:00', '16:30', '19:00'], spots: [] }
    ];

    pins.forEach((pin, index) => {
      const dayIndex = index % days.length;
      const slotTime = days[dayIndex].slots[days[dayIndex].spots.length % 4] || '14:00';
      days[dayIndex].spots.push({
        time: slotTime,
        title: pin.location && pin.location.name ? pin.location.name : pin.title,
        desc: pin.memo || '현장 꿀팁 및 사진 스팟',
        tips: pin.insightPoints || []
      });
    });

    const activeDays = days.filter(d => d.spots.length > 0);
    let mdOutput = `# ✈️ ${titleText}\n\n`;
    activeDays.forEach(d => {
      mdOutput += `## 📅 Day ${d.dayNumber}: ${d.theme}\n`;
      d.spots.forEach(s => {
        mdOutput += `- **${s.time}** ${s.title}: ${s.desc}\n`;
      });
      mdOutput += `\n`;
    });

    container.innerHTML = activeDays.map(day => `
      <div class="plan-day-card">
        <div class="plan-day-header">
          <span class="day-badge">Day ${day.dayNumber}</span>
          <span class="day-theme">${day.theme}</span>
        </div>
        <div class="plan-steps">
          ${day.spots.map(spot => `
            <div class="plan-step-row">
              <div class="step-time">${spot.time}</div>
              <div class="step-content">
                <div class="step-title">${spot.title}</div>
                <div class="step-desc">${spot.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('') + `
      <button class="btn-copy-plan" style="margin-top: 6px; width: 100%;" onclick="damabangApp.copyToClipboard('${encodeURIComponent(mdOutput)}')">
        <i class="ri-file-copy-line"></i> 전체 여행 일정표 마크다운 복사하기
      </button>
    `;
  }

  copyToClipboard(encodedText) {
    const text = decodeURIComponent(encodedText);
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('📋 클립보드에 마크다운이 복사되었습니다!');
    }).catch(() => {
      this.showToast('복사에 실패했습니다. 수동으로 복사해주세요.');
    });
  }

  async renderSettings() {
    const stats = await window.storageManager.getStats();
    document.getElementById('stat-total-pins').innerText = `${stats.count}개`;
    document.getElementById('stat-storage-size').innerText = stats.formattedSize;
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  openAddModal(prefillData = null) {
    const form = document.getElementById('form-add-pin');
    form.reset();
    document.getElementById('url-preview-box').classList.remove('active');

    if (prefillData) {
      document.getElementById('add-url').value = prefillData.url || '';
      document.getElementById('add-title').value = prefillData.title || '';
      document.getElementById('add-category').value = prefillData.category || 'travel';
      document.getElementById('add-city').value = prefillData.city || '';
      document.getElementById('add-spot-name').value = prefillData.spotName || '';
      document.getElementById('add-tags').value = (prefillData.tags || []).join(', ');
      document.getElementById('add-memo').value = prefillData.memo || '';

      this.currentAutoAnalysis = prefillData;
      this.updatePreviewBox(prefillData);
    } else {
      this.currentAutoAnalysis = null;
    }

    this.openModal('modal-add');
  }

  handleUrlInputLive(inputText) {
    if (!inputText) {
      document.getElementById('url-preview-box').classList.remove('active');
      this.currentAutoAnalysis = null;
      return;
    }

    const currentTitle = document.getElementById('add-title').value;
    const analysis = SmartContentAnalyzer.analyze(inputText, currentTitle);
    this.currentAutoAnalysis = analysis;

    document.getElementById('add-title').value = analysis.title;
    document.getElementById('add-category').value = analysis.category;
    if (analysis.city) document.getElementById('add-city').value = analysis.city;
    if (analysis.spotName) document.getElementById('add-spot-name').value = analysis.spotName;
    if (analysis.tags.length > 0) document.getElementById('add-tags').value = analysis.tags.join(', ');
    if (analysis.memo) document.getElementById('add-memo').value = analysis.memo;

    this.updatePreviewBox(analysis);
  }

  updatePreviewBox(analysis) {
    const previewBox = document.getElementById('url-preview-box');
    const previewThumb = document.getElementById('preview-thumb-img');
    const previewPlatform = document.getElementById('preview-platform-text');
    const previewTitle = document.getElementById('preview-auto-title');

    previewBox.classList.add('active');
    previewThumb.src = analysis.thumbnail;
    previewThumb.onerror = () => {
      previewThumb.src = 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=400&q=80';
    };

    const isInsta = analysis.platform === 'instagram';
    const isYt = analysis.platform === 'youtube';
    previewPlatform.innerHTML = isInsta ? '📷 Instagram 릴스/게시물 분석 완료' : isYt ? '▶️ YouTube 영상 썸네일 추출 완료' : '🔗 스마트 분석 완료';
    previewTitle.innerText = `${analysis.category === 'travel' ? '✈️ 여행' : analysis.category === 'food' ? '🍱 맛집' : analysis.category === 'insight' ? '💡 인사이트' : '🎨 라이프'} · ${analysis.city || '명소'}`;
  }

  openDetailModal(pin) {
    this.activePin = pin;
    document.getElementById('detail-title').innerText = pin.title;

    const videoContainer = document.getElementById('detail-video-container');
    const imageContainer = document.getElementById('detail-image-container');
    const detailImage = document.getElementById('detail-image');

    const youtubeId = this.extractYouTubeId(pin.url);
    if (youtubeId) {
      videoContainer.style.display = 'block';
      videoContainer.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `;
      imageContainer.style.display = 'none';
    } else {
      videoContainer.style.display = 'none';
      videoContainer.innerHTML = '';
      imageContainer.style.display = 'block';
      detailImage.src = pin.thumbnail || 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80';
      detailImage.onerror = () => {
        detailImage.src = 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80';
      };
    }

    const badgesContainer = document.getElementById('detail-badges');
    const isInsta = pin.platform === 'instagram';
    badgesContainer.innerHTML = `
      <span class="platform-badge ${isInsta ? 'instagram' : 'youtube'}">
        <i class="${isInsta ? 'ri-instagram-fill' : 'ri-youtube-fill'}"></i> ${isInsta ? 'Instagram' : 'YouTube'}
      </span>
      <span class="tag-pill" style="background: var(--kraken-purple-subtle); color: var(--kraken-purple-deep); font-weight: 600;">
        ${pin.category === 'travel' ? '✈️ 여행/명소' : pin.category === 'food' ? '🍱 맛집/카페' : pin.category === 'insight' ? '💡 인사이트' : '🎨 라이프'}
      </span>
    `;

    const locationText = [pin.location?.city, pin.location?.name, pin.location?.address].filter(Boolean).join(' · ');
    document.getElementById('detail-location-text').innerText = locationText || '위치 정보 없음';
    document.getElementById('detail-memo-text').innerText = pin.memo || '작성된 메모가 없습니다.';

    const insightsBox = document.getElementById('detail-insights-box');
    const insightsList = document.getElementById('detail-insights-list');
    if (pin.insightPoints && pin.insightPoints.length > 0) {
      insightsBox.style.display = 'block';
      insightsList.innerHTML = pin.insightPoints.map(p => `<li>${p}</li>`).join('');
    } else {
      insightsBox.style.display = 'none';
    }

    const externalLink = document.getElementById('detail-external-link');
    externalLink.href = pin.url || '#';

    const mapLink = document.getElementById('detail-map-link');
    const mapQuery = encodeURIComponent(`${pin.location?.city || ''} ${pin.location?.name || pin.title}`);
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    this.openModal('modal-detail');
  }

  async handleAddPinSubmit() {
    const url = document.getElementById('add-url').value.trim();
    const title = document.getElementById('add-title').value.trim();
    const category = document.getElementById('add-category').value;
    const city = document.getElementById('add-city').value.trim();
    const spotName = document.getElementById('add-spot-name').value.trim();
    const tagsRaw = document.getElementById('add-tags').value.trim();
    const memo = document.getElementById('add-memo').value.trim();

    if (!url && !title) {
      alert('URL 또는 제목을 입력해주세요.');
      return;
    }

    const analysis = this.currentAutoAnalysis || SmartContentAnalyzer.analyze(url || title, title);
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.replace('#', '').trim()).filter(Boolean) : analysis.tags;

    const newPin = {
      id: 'pin_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      url: url || analysis.url || '#',
      title: title || analysis.title,
      platform: analysis.platform || (url.includes('instagram.com') ? 'instagram' : url.includes('youtube.com') || url.includes('youtu.be') ? 'youtube' : 'generic'),
      category: category || analysis.category || 'travel',
      tags: tags.length > 0 ? tags : analysis.tags,
      location: {
        city: city || analysis.city || '',
        name: spotName || analysis.spotName || '',
        address: ''
      },
      memo: memo || analysis.memo || '',
      thumbnail: analysis.thumbnail || 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
      insightPoints: analysis.insightPoints || [
        `${title} 핵심 꿀팁 요약`,
        city ? `📍 추천 위치: ${city} ${spotName}` : '💡 유용한 인사이트 보관됨'
      ],
      createdAt: new Date().toISOString()
    };

    await window.storageManager.savePin(newPin);
    this.pins = await window.storageManager.getAllPins();
    this.closeModal('modal-add');
    this.render();
    this.showToast(`✨ '${newPin.title}' 담아방에 보관 완료!`);
  }

  extractYouTubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match ? match[1] : null;
  }

  showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    toastMsg.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.damabangApp = new DamabangApp();
});
