// ==========================================================================
// Damabang (담아방) Mobile Main Application Engine
// - Web Share Target Support (Instagram / YouTube 1-Click Share)
// - Smart Content Analyzer (Auto Category, Title, City, Spot, Tags & Notes)
// - Real Media Thumbnail Engine
// - 100% On-Device Local Storage (IndexedDB)
// ==========================================================================

// ==========================================================================
// Smart Content & Metadata Analyzer Engine
// ==========================================================================
const SmartContentAnalyzer = {
  CITIES: {
    '도쿄': { name: '도쿄 (Tokyo)', defaultImg: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80' },
    '시부야': { city: '도쿄 (Tokyo)', name: '시부야 (Shibuya)', defaultImg: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80' },
    '신주쿠': { city: '도쿄 (Tokyo)', name: '신주쿠', defaultImg: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80' },
    '오사카': { name: '오사카 (Osaka)', defaultImg: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=800&q=80' },
    '교토': { name: '교토 (Kyoto)', defaultImg: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80' },
    '후쿠오카': { name: '후쿠오카 (Fukuoka)', defaultImg: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80' },
    '삿포로': { name: '삿포로 (Sapporo)', defaultImg: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80' },
    '제주': { name: '제주도 (Jeju)', defaultImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80' },
    '제주도': { name: '제주도 (Jeju)', defaultImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80' },
    '서귀포': { city: '제주도 (Jeju)', name: '서귀포', defaultImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80' },
    '성수': { city: '서울 (Seoul)', name: '성수동', defaultImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    '성수동': { city: '서울 (Seoul)', name: '성수동', defaultImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    '부산': { name: '부산 (Busan)', defaultImg: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80' },
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
    '맥주', '하이볼', '야시장', '크루아상', '에스프레소', '말차', '젤라또'
  ],

  INSIGHT_KEYWORDS: [
    '생산성', '공부', '개발', '독서', '마인드셋', '자기계발', '습관', '루틴', '동기부여', '꿀팁', '노션',
    'ai', '챗지피티', 'chatgpt', '경제', '재테크', '주식', '투자', '코딩', '업무', '효율', '책추천', '부업',
    '마케팅', '성공', '강의', '지식', '통찰', '인사이트', '커리어', '시간관리'
  ],

  TRAVEL_KEYWORDS: [
    '여행', '투어', '핫플', '명소', '랜드마크', '전망대', '호텔', '료칸', '숙소', '에어비앤비', '리조트',
    '공항', '비행기', '항공권', '야경', '축제', '감성숙소', '해변', '바다', '산책', '테마파크', '디즈니',
    '유니버셜', '온천', '일몰', '선셋', '포토스팟', '인생샷', '루프탑', '코스'
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
        // Direct media preview proxy URL
        realThumbnail = `https://www.instagram.com/p/${instaCode}/media/?size=l`;
        embedUrl = `https://www.instagram.com/p/${instaCode}/embed/`;
      }
    }

    // 4. Identify City & Spot Name
    let detectedCity = '';
    let detectedSpot = '';
    let defaultImg = '';

    const searchCorpus = (inputTitle + ' ' + text + ' ' + tags.join(' ')).toLowerCase();

    for (const [key, info] of Object.entries(this.CITIES)) {
      if (searchCorpus.includes(key.toLowerCase())) {
        detectedCity = info.city || info.name;
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

    // 6. Clean Text for Title & Spot
    let cleanText = text
      .replace(/(https?:\/\/[^\s]+)/gi, '')
      .replace(/#([a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+)/g, '')
      .replace(/[\r\n]+/g, ' ')
      .trim();

    let title = inputTitle.trim() || cleanText.slice(0, 50).trim();
    if (!title && tags.length > 0) {
      title = `${tags.slice(0, 2).map(t => '#' + t).join(' ')} 추천 콘텐츠`;
    } else if (!title) {
      title = platform === 'instagram' ? '인스타그램 릴스 추천 콘텐츠' : platform === 'youtube' ? '유튜브 추천 영상' : '담아둔 콘텐츠';
    }

    // Spot name heuristic
    if (detectedCity && !detectedSpot) {
      const parts = title.split(/[·|\-\/\s]/).filter(p => p.length >= 2 && !p.includes(detectedCity));
      if (parts.length > 0) {
        detectedSpot = parts[0];
      }
    }

    const memo = cleanText.length > 10 ? cleanText : `${title}\n(인스타그램/유튜브에서 담아방으로 보관됨)`;
    const finalThumbnail = realThumbnail || defaultImg || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';

    return {
      url: url || text,
      platform,
      title,
      category,
      city: detectedCity,
      spotName: detectedSpot,
      tags: tags.length > 0 ? tags : (detectedCity ? [detectedCity.split(' ')[0], category] : [category]),
      memo,
      thumbnail: finalThumbnail,
      realThumbnail,
      embedUrl,
      insightPoints: [
        `${title} 핵심 꿀팁 요약`,
        detectedCity ? `📍 위치: ${detectedCity} ${detectedSpot}` : '💡 유용한 인사이트 보관됨'
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

    // 6. Handle Web Share Target or Action URLs (?url=... or ?action=add)
    this.handleIncomingShareTarget();
  }

  // Handle Incoming Share from Instagram / YouTube / Mobile Share Sheet
  async handleIncomingShareTarget() {
    const params = new URLSearchParams(window.location.search);
    const sharedUrl = params.get('url');
    const sharedText = params.get('text');
    const sharedTitle = params.get('title');
    const action = params.get('action');

    if (sharedUrl || sharedText || sharedTitle) {
      const combinedInput = [sharedUrl, sharedText].filter(Boolean).join(' ');
      const analysis = SmartContentAnalyzer.analyze(combinedInput, sharedTitle || '');

      this.openAddModal(analysis);
      this.showToast('✨ 공유된 콘텐츠를 스마트 분석하여 자동 채웠습니다!');
      
      // Clean up URL parameters without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (action === 'add') {
      this.openAddModal();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // Register Service Worker for PWA & Offline Support
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('PWA Service Worker registered:', reg.scope))
          .catch(err => console.warn('Service Worker registration failed:', err));
      });
    }
  }

  // Bind UI Events
  bindEvents() {
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

  // Switch Active Tab View
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

  // Toggle Selection Mode
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

  // Filter Pins based on category & search
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

  // Render Feed Tab with Accurate Real Thumbnails
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

      const thumbUrl = pin.thumbnail || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
      const cityName = pin.location && pin.location.city ? pin.location.city : '';
      const spotName = pin.location && pin.location.name ? pin.location.name : '';
      const locationText = [cityName, spotName].filter(Boolean).join(' · ');

      const tagsHtml = (pin.tags || []).slice(0, 3).map(t => `<span class="tag-pill">#${t}</span>`).join('');

      return `
        <article class="pin-card ${isSelected ? 'selected' : ''}" data-id="${pin.id}">
          <div class="card-media-wrapper">
            <img class="card-img" src="${thumbUrl}" alt="${pin.title}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';" />
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

    // Attach click listeners
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

  // Render Spots Tab
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

  // Render Planner Initial
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

  // Render Settings Tab
  async renderSettings() {
    const stats = await window.storageManager.getStats();
    document.getElementById('stat-total-pins').innerText = `${stats.count}개`;
    document.getElementById('stat-storage-size').innerText = stats.formattedSize;
  }

  // Modal Handling
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  // Open Add Pin Modal with Optional Pre-analyzed Data
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

  // Live Auto-Analysis on Paste / Input
  handleUrlInputLive(inputText) {
    if (!inputText) {
      document.getElementById('url-preview-box').classList.remove('active');
      this.currentAutoAnalysis = null;
      return;
    }

    const currentTitle = document.getElementById('add-title').value;
    const analysis = SmartContentAnalyzer.analyze(inputText, currentTitle);
    this.currentAutoAnalysis = analysis;

    // Auto-fill fields if empty or freshly analyzed
    if (!document.getElementById('add-title').value || document.getElementById('add-title').value.includes('인스타그램') || document.getElementById('add-title').value.includes('유튜브')) {
      document.getElementById('add-title').value = analysis.title;
    }
    document.getElementById('add-category').value = analysis.category;
    if (analysis.city) document.getElementById('add-city').value = analysis.city;
    if (analysis.spotName) document.getElementById('add-spot-name').value = analysis.spotName;
    if (analysis.tags.length > 0) document.getElementById('add-tags').value = analysis.tags.join(', ');
    if (!document.getElementById('add-memo').value) document.getElementById('add-memo').value = analysis.memo;

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
      previewThumb.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80';
    };

    const isInsta = analysis.platform === 'instagram';
    const isYt = analysis.platform === 'youtube';
    previewPlatform.innerHTML = isInsta ? '📷 Instagram 릴스/게시물 분석 완료' : isYt ? '▶️ YouTube 영상 썸네일 추출 완료' : '🔗 웹 링크 분석 완료';
    previewTitle.innerText = `${analysis.category === 'travel' ? '✈️ 여행' : analysis.category === 'food' ? '🍱 맛집' : analysis.category === 'insight' ? '💡 인사이트' : '🎨 라이프'} · ${analysis.city || '일반'}`;
  }

  // Open Detail Modal
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
      detailImage.src = pin.thumbnail || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
      detailImage.onerror = () => {
        detailImage.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
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

  // Submit Add Pin Form
  async handleAddPinSubmit() {
    const url = document.getElementById('add-url').value.trim();
    const title = document.getElementById('add-title').value.trim();
    const category = document.getElementById('add-category').value;
    const city = document.getElementById('add-city').value.trim();
    const spotName = document.getElementById('add-spot-name').value.trim();
    const tagsRaw = document.getElementById('add-tags').value.trim();
    const memo = document.getElementById('add-memo').value.trim();

    if (!url || !title) {
      alert('URL과 제목을 입력해주세요.');
      return;
    }

    const analysis = this.currentAutoAnalysis || SmartContentAnalyzer.analyze(url, title);
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.replace('#', '').trim()).filter(Boolean) : analysis.tags;

    const newPin = {
      id: 'pin_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      url: url,
      title: title,
      platform: analysis.platform || (url.includes('instagram.com') ? 'instagram' : url.includes('youtube.com') || url.includes('youtu.be') ? 'youtube' : 'generic'),
      category: category,
      tags: tags,
      location: {
        city: city || analysis.city || '',
        name: spotName || analysis.spotName || '',
        address: ''
      },
      memo: memo || analysis.memo || '',
      thumbnail: analysis.thumbnail,
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
    this.showToast(`✨ '${title}' 담아방에 보관 완료!`);
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

// Global App Instance Initialization
window.addEventListener('DOMContentLoaded', () => {
  window.damabangApp = new DamabangApp();
});
