// ==========================================================================
// Damabang (담아방) Mobile Main Application Engine
// ==========================================================================

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
      btn.addEventListener('click', (e) => {
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
      // Click on chip
      document.querySelectorAll('#category-chips .cat-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#category-chips .cat-chip').forEach(c => c.classList.remove('active'));
          btn.classList.add('active');
          this.currentCategory = btn.getAttribute('data-category');
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          this.renderFeed();
        });
      });

      // Arrow buttons
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

      // Drag to scroll for mouse & touch
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
        const walk = (x - startX) * 1.5; // scroll speed multiplier
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

    // Add Form URL Input live parser
    document.getElementById('add-url').addEventListener('input', (e) => {
      this.handleUrlInput(e.target.value.trim());
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
      inputImport.value = '';
    });

    // Settings Actions: Clear Data
    document.getElementById('btn-clear-data').addEventListener('click', async () => {
      if (confirm('정말로 담아방에 보관된 모든 콘텐츠를 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.')) {
        await window.storageManager.clearAllPins();
        this.pins = [];
        this.selectedPinIds.clear();
        this.render();
        this.showToast('🗑️ 담아방의 모든 데이터가 초기화되었습니다.');
      }
    });

    // Detail Delete Action
    document.getElementById('detail-delete-btn').addEventListener('click', async () => {
      if (!this.activePin) return;
      if (confirm(`'${this.activePin.title}' 핀을 담아방에서 삭제하시겠습니까?`)) {
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

    // Update Bottom Nav
    document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Tab Panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    const targetPane = document.getElementById(`tab-${tabId}`);
    if (targetPane) targetPane.classList.add('active');

    // Tab-specific rendering
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
      // Category filter
      if (this.currentCategory !== 'all' && pin.category !== this.currentCategory) {
        return false;
      }

      // Search Query filter
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

  // Render Everything
  render() {
    this.renderFeed();
    this.renderSpots();
    this.renderSettings();
  }

  // Render Feed Tab
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
            <img class="card-img" src="${thumbUrl}" alt="${pin.title}" loading="lazy" />
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

    // Attach click listeners to cards
    grid.querySelectorAll('.pin-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const pinId = card.getAttribute('data-id');
        const pin = this.pins.find(p => p.id === pinId);
        if (!pin) return;

        if (this.isSelectionMode) {
          // Toggle Selection
          if (this.selectedPinIds.has(pinId)) {
            this.selectedPinIds.delete(pinId);
            card.classList.remove('selected');
          } else {
            this.selectedPinIds.add(pinId);
            card.classList.add('selected');
          }
          this.updateSelectionCountUI();
        } else {
          // Open Detail Modal
          this.openDetailModal(pin);
        }
      });
    });
  }

  // Render Spots Tab (Grouped by Destination City)
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

    // Group by City
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
                <i class="ri-map-pin-2-fill" style="color: #60a5fa;"></i> 길찾기
              </a>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="city-group-card">
          <div class="city-header">
            <div class="city-title">
              <i class="ri-navigation-fill" style="color: var(--color-travel);"></i> ${city}
            </div>
            <span style="font-size: 12px; color: var(--text-muted);">${cityPins.length}개 스팟</span>
          </div>
          <div class="spot-timeline">
            ${itemsHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Planner Initial state
  renderPlannerInitial() {
    const outputContainer = document.getElementById('plan-output-container');
    if (!outputContainer.innerHTML.trim()) {
      this.generateAIPlanFromFilters();
    }
  }

  // AI Plan Generator from Selected Pins
  generateAIPlanFromSelected() {
    const selectedList = this.pins.filter(p => this.selectedPinIds.has(p.id));
    if (selectedList.length === 0) return;

    this.renderPlanOutput(selectedList, '담아방 맞춤 여행 & 인사이트 플랜');
  }

  // AI Plan Generator from Filters
  generateAIPlanFromFilters() {
    const cityFilter = document.getElementById('planner-city-select').value;
    let targetPins = this.pins;

    if (cityFilter !== 'all') {
      targetPins = this.pins.filter(p => p.location && p.location.city === cityFilter);
    }

    if (targetPins.length === 0) {
      targetPins = this.pins;
    }

    this.renderPlanOutput(targetPins, `${cityFilter === 'all' ? '전체 추천' : cityFilter} 스마트 여행 일정`);
  }

  // Render Plan Output Cards
  renderPlanOutput(pins, titleText) {
    const container = document.getElementById('plan-output-container');
    
    // Check if pins are primarily insight vs travel
    const isInsightMode = pins.every(p => p.category === 'insight') || (pins.length === 1 && pins[0].category === 'insight');

    if (isInsightMode) {
      // Render Insight Summary Card
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

    // Travel Itinerary Generator (Distribute into Day 1, Day 2, Day 3)
    const days = [
      { dayNumber: 1, theme: '도착 및 핫플레이스 탐방 & 노을 스팟', slots: ['09:30', '12:30', '16:00', '19:30'], spots: [] },
      { dayNumber: 2, theme: '로컬 미식 투어 & 감성 골목 산책', slots: ['08:30', '12:00', '15:00', '18:30'], spots: [] },
      { dayNumber: 3, theme: '시그니처 랜드마크 & 힐링 코스', slots: ['10:00', '13:00', '16:30', '19:00'], spots: [] }
    ];

    // Distribute pins across days
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

    // Filter out empty days if fewer pins
    const activeDays = days.filter(d => d.spots.length > 0);

    // Build Markdown string for easy clipboard copying
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

  // Copy helper
  copyToClipboard(encodedText) {
    const text = decodeURIComponent(encodedText);
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('📋 여행 일정표가 클립보드에 복사되었습니다!');
    }).catch(err => {
      alert('복사 실패: ' + err);
    });
  }

  // Render Settings Tab Statistics
  async renderSettings() {
    const stats = await window.storageManager.getStorageStats();
    document.getElementById('stat-total-pins').innerText = `${stats.totalPins}개`;
    document.getElementById('stat-storage-size').innerText = `${stats.sizeKB} KB`;
  }

  // Open Add Pin Modal
  openAddModal() {
    document.getElementById('form-add-pin').reset();
    document.getElementById('url-preview-box').classList.remove('active');
    this.openModal('modal-add');
  }

  // Open Detail Modal
  openDetailModal(pin) {
    this.activePin = pin;
    document.getElementById('detail-title').innerText = pin.title;
    
    // Video embedding (YouTube support)
    const videoContainer = document.getElementById('detail-video-container');
    const imageContainer = document.getElementById('detail-image-container');
    const detailImage = document.getElementById('detail-image');
    
    const youtubeId = this.extractYouTubeId(pin.url);
    if (youtubeId) {
      videoContainer.style.display = 'block';
      videoContainer.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      imageContainer.style.display = 'none';
    } else {
      videoContainer.style.display = 'none';
      videoContainer.innerHTML = '';
      imageContainer.style.display = 'block';
      detailImage.src = pin.thumbnail || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
    }

    // Badges
    const badgesContainer = document.getElementById('detail-badges');
    const isInsta = pin.platform === 'instagram';
    badgesContainer.innerHTML = `
      <span class="platform-badge ${isInsta ? 'instagram' : 'youtube'}">
        <i class="${isInsta ? 'ri-instagram-fill' : 'ri-youtube-fill'}"></i> ${isInsta ? 'Instagram' : 'YouTube'}
      </span>
      <span class="tag-pill" style="background: rgba(99, 102, 241, 0.2); color: #c7d2fe; font-weight: 600;">
        ${pin.category === 'travel' ? '✈️ 여행/명소' : pin.category === 'food' ? '🍱 맛집/카페' : pin.category === 'insight' ? '💡 인사이트' : '🎨 라이프'}
      </span>
    `;

    // Location & Memo
    const locationText = [pin.location?.city, pin.location?.name, pin.location?.address].filter(Boolean).join(' · ');
    document.getElementById('detail-location-text').innerText = locationText || '위치 정보 없음';
    document.getElementById('detail-memo-text').innerText = pin.memo || '작성된 메모가 없습니다.';

    // Insights List
    const insightsBox = document.getElementById('detail-insights-box');
    const insightsList = document.getElementById('detail-insights-list');
    if (pin.insightPoints && pin.insightPoints.length > 0) {
      insightsBox.style.display = 'block';
      insightsList.innerHTML = pin.insightPoints.map(p => `<li>${p}</li>`).join('');
    } else {
      insightsBox.style.display = 'none';
    }

    // External link & Map link
    const externalLink = document.getElementById('detail-external-link');
    externalLink.href = pin.url || '#';

    const mapLink = document.getElementById('detail-map-link');
    const mapQuery = encodeURIComponent(`${pin.location?.city || ''} ${pin.location?.name || pin.title}`);
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    this.openModal('modal-detail');
  }

  // Handle URL live input in Add Form
  handleUrlInput(url) {
    const previewBox = document.getElementById('url-preview-box');
    const previewThumb = document.getElementById('preview-thumb-img');
    const previewPlatform = document.getElementById('preview-platform-text');
    const previewTitle = document.getElementById('preview-auto-title');

    if (!url) {
      previewBox.classList.remove('active');
      return;
    }

    const youtubeId = this.extractYouTubeId(url);
    const isInsta = url.includes('instagram.com');

    if (youtubeId) {
      previewBox.classList.add('active');
      previewThumb.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
      previewPlatform.innerText = '▶️ YouTube 영상 감지됨';
      previewTitle.innerText = `YouTube ID: ${youtubeId}`;
      document.getElementById('add-category').value = 'travel';
    } else if (isInsta) {
      previewBox.classList.add('active');
      previewThumb.src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80';
      previewPlatform.innerText = '📷 Instagram 게시물 감지됨';
      previewTitle.innerText = '인스타그램 릴스/게시글';
    } else {
      previewBox.classList.remove('active');
    }
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

    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
    
    // Auto-detect platform and thumbnail
    const youtubeId = this.extractYouTubeId(url);
    const isInsta = url.includes('instagram.com');
    const platform = youtubeId ? 'youtube' : isInsta ? 'instagram' : 'other';

    let thumbnail = '';
    if (youtubeId) {
      thumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    } else if (category === 'food') {
      thumbnail = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
    } else if (category === 'insight') {
      thumbnail = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80';
    } else {
      thumbnail = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
    }

    // Auto generate insight points from memo lines
    const insightPoints = memo ? memo.split('\n').map(l => l.replace(/^[-*•\d.]\s*/, '').trim()).filter(Boolean) : [];

    const newPin = {
      id: 'pin_' + Date.now(),
      title,
      url,
      platform,
      category,
      tags,
      thumbnail,
      location: {
        name: spotName,
        city: city,
        address: ''
      },
      memo,
      insightPoints: insightPoints.length > 0 ? insightPoints : [memo],
      createdAt: new Date().toISOString()
    };

    await window.storageManager.savePin(newPin);
    this.pins = await window.storageManager.getAllPins();
    
    this.closeModal('modal-add');
    this.render();
    this.showToast('🎉 담아방에 안전하게 보관되었습니다!');
  }

  // Extract YouTube ID helper
  extractYouTubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
  }

  // Generic Modal open / close
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      // If closing detail modal, clear any video iframe to stop audio
      if (modalId === 'modal-detail') {
        document.getElementById('detail-video-container').innerHTML = '';
      }
    }
  }

  // Toast Notification
  showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    toastMsg.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

// Instantiate App
window.damabangApp = new DamabangApp();
