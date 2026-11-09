/**
 * TAROT MYSTIC - 5-Page Wizard, Stacked Deck Fan-Out, Hover Wave & Flying Card Engine
 */

(function () {
  const {
    FULL_TAROT_DECK,
    EXTERNAL_TAROT_DECKS,
    EXTERNAL_CARD_BACKS,
    SPREAD_TYPES,
    READING_TOPICS,
    getCardImageUrls,
    getCardBackUrls
  } = window.TarotData;

  const state = {
    currentPage: 1,
    fullName: "Nguyễn Minh Anh",
    age: "",
    dob: "2002-08-15",
    selectedTopicId: "love",
    selectedSpreadId: "you-partner-relationship",
    question: "Người ấy đang thực sự nghĩ gì về mối quan hệ của chúng tôi và tương lai hai đứa sẽ ra sao?",
    selectedDeckId: "rider-waite",
    selectedBackId: "rws-classic",
    allowReversed: true,
    isDeckFannedOut: false,
    isAnimatingFlight: false,
    shuffledDeck: [],
    pickedIndices: [], // Max 3 indices from shuffledDeck
    isFlipped: false,
    isAnalyzing: false,
    lastReadingMarkdown: "",
    readingHistory: JSON.parse(localStorage.getItem("tarot_reading_history") || "[]")
  };

  function createFallbackCardDataUri(title = "TAROT") {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="500" viewBox="0 0 300 500">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e1035"/>
          <stop offset="100%" stop-color="#0b0616"/>
        </linearGradient>
      </defs>
      <rect width="300" height="500" rx="18" fill="url(#g)" stroke="#d4af37" stroke-width="6"/>
      <rect x="18" y="18" width="264" height="464" rx="12" fill="none" stroke="#fae29c" stroke-width="1.5" stroke-dasharray="6,4"/>
      <circle cx="150" cy="210" r="62" fill="none" stroke="#d4af37" stroke-width="2"/>
      <polygon points="150,155 166,192 206,195 175,220 185,258 150,237 115,258 125,220 94,195 134,192" fill="#d4af37" opacity="0.85"/>
      <text x="150" y="340" text-anchor="middle" fill="#fae29c" font-family="Georgia, serif" font-size="18" font-weight="bold">${title.replace(/[<>&"']/g, "")}</text>
      <text x="150" y="370" text-anchor="middle" fill="#b6a8cc" font-family="sans-serif" font-size="13">Tarot Mystic Sanctuary</text>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  window.handleTarotImgError = function (imgEl, fallbackUrl, cardTitle) {
    if (!imgEl.dataset.triedFallback && fallbackUrl) {
      imgEl.dataset.triedFallback = "1";
      imgEl.src = fallbackUrl;
    } else {
      imgEl.onerror = null;
      imgEl.src = createFallbackCardDataUri(cardTitle || "TAROT MYSTIC");
    }
  };

  // =========================================================================
  // 1. MULTI-PAGE WIZARD NAVIGATION (Chuyển trang mỗi lần lựa chọn)
  // =========================================================================
  function goToPage(pageNumber) {
    const targetNum = Number(pageNumber);
    if (targetNum < 1 || targetNum > 5) return;

    // Sync inputs before leaving Page 1 or Page 2
    const nameInput = document.getElementById("input-fullname");
    const ageInput = document.getElementById("input-age");
    const dobInput = document.getElementById("input-dob");
    const qInput = document.getElementById("input-question");

    if (nameInput) state.fullName = nameInput.value.trim();
    if (ageInput) state.age = ageInput.value.trim();
    if (dobInput) state.dob = dobInput.value;
    if (qInput) state.question = qInput.value.trim();

    state.currentPage = targetNum;
    window.SoundFX.playChime(480 + targetNum * 45, 0.25, 0.06);

    // Toggle active page section
    for (let i = 1; i <= 5; i++) {
      const pageEl = document.getElementById(`page-${i}`);
      if (pageEl) {
        pageEl.classList.toggle("active-page", i === targetNum);
      }
    }

    // Update top stepper pills
    document.querySelectorAll("#wizard-stepper .step-pill").forEach((pill) => {
      const pNum = Number(pill.dataset.gotoPage);
      pill.classList.toggle("active", pNum === targetNum);
      pill.classList.toggle("completed", pNum < targetNum);
    });

    // If entering Page 4 (Draw Page), render the 3 target slots & stacked deck
    if (targetNum === 4) {
      renderTopTargetSlots();
      renderDeckRitualStage();
      updatePickStatusText();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // =========================================================================
  // 2. STARFIELD CANVAS ANIMATION
  // =========================================================================
  function initStarfield() {
    const canvas = document.getElementById("starfield-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        speed: (Math.random() * 0.014 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
        gold: Math.random() < 0.35
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.15) s.speed = -s.speed;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? `rgba(250, 226, 156, ${Math.max(0.1, Math.min(1, s.alpha))})`
          : `rgba(230, 220, 255, ${Math.max(0.1, Math.min(0.85, s.alpha))})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();
  }

  // =========================================================================
  // 3. PAGE 1 & PAGE 2: PROFILE, ASTROLOGY & TOPIC SELECTION
  // =========================================================================
  function getActiveDeck() {
    return EXTERNAL_TAROT_DECKS.find((d) => d.id === state.selectedDeckId) || EXTERNAL_TAROT_DECKS[0];
  }

  function getActiveSpread() {
    return SPREAD_TYPES.find((s) => s.id === state.selectedSpreadId) || SPREAD_TYPES[0];
  }

  function getActiveTopic() {
    return READING_TOPICS.find((t) => t.id === state.selectedTopicId) || READING_TOPICS[0];
  }

  function syncAgeFromDob() {
    const dobEl = document.getElementById("input-dob");
    const ageEl = document.getElementById("input-age");
    if (!dobEl || !ageEl) return;
    const val = dobEl.value;
    if (val && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const birthYear = Number(val.split("-")[0]);
      const nowYear = new Date().getFullYear();
      const calcAge = Math.max(1, nowYear - birthYear);
      state.age = String(calcAge);
      ageEl.value = state.age;
    }
  }

  function updateDestinyProfileUI() {
    const nameEl = document.getElementById("input-fullname");
    const ageEl = document.getElementById("input-age");
    const dobEl = document.getElementById("input-dob");

    state.fullName = nameEl ? nameEl.value : "";
    state.age = ageEl ? ageEl.value : "";
    state.dob = dobEl ? dobEl.value : "";

    const profile = window.AstrologyEngine.analyzeUserProfile({
      fullName: state.fullName,
      dob: state.dob,
      ageInput: state.age
    });

    const box = document.getElementById("destiny-profile-box");
    if (!box) return;

    box.innerHTML = `
      <div>
        <div class="utility-flex" style="justify-content:space-between; margin-bottom:10px;">
          <span class="deck-card-badge"><i class="fa-solid fa-sparkles"></i> Hồ Sơ Bản Mệnh</span>
          <span style="font-size:0.8rem; color:var(--gold-light);">${profile.dobFormatted} • ${profile.age} tuổi</span>
        </div>
        <h3 style="font-family:var(--font-display); font-size:1.22rem; color:#fff; margin-bottom:4px;">
          ${profile.fullName}
        </h3>
        <p style="font-size:0.84rem; color:var(--text-muted); margin-bottom:14px;">
          ${profile.lifePathLabel}
        </p>
        <div class="destiny-badge-grid">
          <div class="destiny-stat">
            <div class="destiny-stat-label">Cung Hoàng Đạo</div>
            <div class="destiny-stat-val">${profile.zodiac.symbol} ${profile.zodiac.name}</div>
          </div>
          <div class="destiny-stat">
            <div class="destiny-stat-label">Nguyên Tố & Sao Chiếu</div>
            <div class="destiny-stat-val">${profile.zodiac.element} • ${profile.zodiac.ruler}</div>
          </div>
          <div class="destiny-stat">
            <div class="destiny-stat-label">Can Chi & Ngũ Hành</div>
            <div class="destiny-stat-val">${profile.canChi} • ${profile.easternElement}</div>
          </div>
          <div class="destiny-stat">
            <div class="destiny-stat-label">Con Số Chủ Đạo</div>
            <div class="destiny-stat-val">Số ${profile.lifePath} • Năm cá nhân ${profile.personalYear}</div>
          </div>
        </div>
      </div>
      <div style="background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.28); border-radius:12px; padding:10px 14px; font-size:0.82rem;">
        <strong style="color:var(--gold-light);"><i class="fa-solid fa-crown"></i> Lá Bài Bản Mệnh Ngày Sinh:</strong>
        <span style="color:#fff; margin-left:4px;">${profile.birthTarot}</span>
      </div>
    `;
  }

  function renderTopicPills() {
    const container = document.getElementById("topic-pills-container");
    const samplesBox = document.getElementById("sample-questions-container");
    if (!container) return;

    container.innerHTML = READING_TOPICS.map((t) => `
      <div class="topic-chip-card ${t.id === state.selectedTopicId ? "active" : ""}" data-topic="${t.id}">
        <i class="fa-solid ${t.icon}"></i>
        <span>${t.label}</span>
      </div>
    `).join("");

    container.querySelectorAll(".topic-chip-card").forEach((card) => {
      card.addEventListener("click", () => {
        state.selectedTopicId = card.dataset.topic;
        const topicObj = getActiveTopic();
        if (topicObj.recommendedSpread) {
          state.selectedSpreadId = topicObj.recommendedSpread;
          const spreadSelect = document.getElementById("select-spread-type");
          if (spreadSelect) spreadSelect.value = state.selectedSpreadId;
        }
        const qInput = document.getElementById("input-question");
        if (qInput && topicObj.sampleQuestions[0]) {
          qInput.value = topicObj.sampleQuestions[0];
          state.question = qInput.value;
        }
        window.SoundFX.playChime(528, 0.2);
        renderTopicPills();
      });
    });

    const activeTopic = getActiveTopic();
    if (samplesBox) {
      samplesBox.innerHTML = activeTopic.sampleQuestions
        .map((q) => `<button type="button" class="sample-q-btn"><i class="fa-regular fa-comment-dots"></i> "${q}"</button>`)
        .join("");

      samplesBox.querySelectorAll(".sample-q-btn").forEach((b, i) => {
        b.addEventListener("click", () => {
          const qInput = document.getElementById("input-question");
          if (qInput) {
            qInput.value = activeTopic.sampleQuestions[i];
            state.question = qInput.value;
          }
        });
      });
    }
  }

  function renderSpreadSelect() {
    const sel = document.getElementById("select-spread-type");
    if (!sel) return;
    sel.innerHTML = SPREAD_TYPES.map((s) => `
      <option value="${s.id}" ${s.id === state.selectedSpreadId ? "selected" : ""}>
        ${s.name} — ${s.desc}
      </option>
    `).join("");

    sel.addEventListener("change", () => {
      state.selectedSpreadId = sel.value;
    });
  }

  // =========================================================================
  // 4. PAGE 3: EXTERNAL 78-CARD DECKS & CARD BACKS (Click Deck -> Go to Page 4)
  // =========================================================================
  function renderExternalDecksGrid() {
    const grid = document.getElementById("external-decks-grid");
    if (!grid) return;

    grid.innerHTML = EXTERNAL_TAROT_DECKS.map((deck) => {
      const isSelected = deck.id === state.selectedDeckId;
      const backObj = getCardBackUrls(deck.defaultBackId);
      const previews = deck.sampleCards
        .map((url) => `<img src="${url}" alt="${deck.name}" class="deck-mini-img" loading="lazy" onerror="handleTarotImgError(this, '', '${deck.name}')">`)
        .join("");

      return `
        <div class="deck-option-card ${isSelected ? "selected" : ""}" data-deck-id="${deck.id}">
          <div>
            <div class="deck-preview-strip">
              <img src="${backObj.primary}" alt="Mặt sau" title="Mặt sau lá bài" class="deck-mini-img" loading="lazy" onerror="handleTarotImgError(this, '${backObj.fallback}', 'Back')">
              ${previews}
            </div>
            <div class="utility-flex" style="justify-content:space-between; margin-top:10px;">
              <span class="deck-card-badge">${deck.badge}</span>
              <span style="font-size:0.74rem; color:var(--text-muted);">${deck.year}</span>
            </div>
            <h4 class="deck-card-title">${deck.name}</h4>
            <p class="deck-card-desc" style="margin-top:4px;">${deck.description}</p>
          </div>
          <div class="utility-flex" style="justify-content:space-between; padding-top:8px; border-top:1px solid rgba(255,255,255,0.08); font-size:0.78rem;">
            <span style="color:var(--gold-light); font-weight:600;">
              <i class="fa-solid fa-hand-pointer"></i> Nhấp chọn & Qua trang rút bài ➔
            </span>
            <button type="button" class="btn-preview-deck" data-preview-deck="${deck.id}" style="background:none; border:none; color:#d8b4fe; cursor:pointer; text-decoration:underline; font-size:0.75rem;">
              Xem 78 lá
            </button>
          </div>
        </div>
      `;
    }).join("");

    grid.querySelectorAll(".deck-option-card").forEach((cardEl) => {
      cardEl.addEventListener("click", (e) => {
        if (e.target.closest(".btn-preview-deck")) return;
        const newDeckId = cardEl.dataset.deckId;
        state.selectedDeckId = newDeckId;
        const deckObj = getActiveDeck();
        state.selectedBackId = deckObj.defaultBackId;
        renderExternalDecksGrid();
        renderCardBacksStrip();
        // Reset deck to stacked state for the new deck and transition to Page 4
        resetAndPrepareDeck();
        goToPage(4);
      });
    });

    grid.querySelectorAll(".btn-preview-deck").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openEncyclopediaModal(btn.dataset.previewDeck);
      });
    });
  }

  function renderCardBacksStrip() {
    const strip = document.getElementById("card-backs-strip");
    if (!strip) return;

    strip.innerHTML = EXTERNAL_CARD_BACKS.map((back) => {
      const isSelected = back.id === state.selectedBackId;
      return `
        <div class="back-option-item ${isSelected ? "selected" : ""}" data-back-id="${back.id}">
          <img src="${back.url}" alt="${back.name}" class="back-thumb-img" loading="lazy" onerror="handleTarotImgError(this, '${back.fallbackUrl}', 'BACK')">
          <div>
            <div style="font-size:0.83rem; font-weight:700; color:${isSelected ? "var(--gold-light)" : "#fff"};">${back.name}</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">${back.origin}</div>
          </div>
        </div>
      `;
    }).join("");

    strip.querySelectorAll(".back-option-item").forEach((el) => {
      el.addEventListener("click", () => {
        state.selectedBackId = el.dataset.backId;
        window.SoundFX.playChime(639, 0.22);
        renderCardBacksStrip();
      });
    });
  }

  // =========================================================================
  // 5. PAGE 4: 3 PRE-VISIBLE SLOTS + STACKED DECK -> FAN OUT -> HOVER -> FLY UP
  // =========================================================================
  function shuffleDeckArray() {
    const copy = [...FULL_TAROT_DECK];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    state.shuffledDeck = copy.map((card, idx) => ({
      card,
      isReversed: state.allowReversed ? Math.random() < 0.36 : false,
      deckOrder: idx + 1
    }));
  }

  function resetAndPrepareDeck() {
    shuffleDeckArray();
    state.pickedIndices = [];
    state.isDeckFannedOut = false;
    state.isFlipped = false;
    state.isAnimatingFlight = false;
    renderTopTargetSlots();
    renderDeckRitualStage();
    updatePickStatusText();
  }

  function updatePickStatusText() {
    const statusText = document.getElementById("pick-instruction-text");
    const revealBtn = document.getElementById("btn-flip-and-analyze");
    const count = state.pickedIndices.length;
    const spread = getActiveSpread();

    if (revealBtn) {
      revealBtn.disabled = count < 3 || state.isAnimatingFlight;
    }

    if (!statusText) return;

    if (!state.isDeckFannedOut) {
      statusText.innerHTML = `Bộ bài <strong>${getActiveDeck().name} (78 lá)</strong> đã sẵn sàng. Hãy <strong>nhấn vào bộ bài xếp chồng bên dưới</strong> để xòe bài ra!`;
    } else if (count < 3) {
      const nextSlot = spread.slots[count];
      statusText.innerHTML = `Đang chọn <strong>${nextSlot.title} (${count}/3)</strong> — Hãy di chuột qua bộ bài xòe (lá bài sẽ nổi lên theo tay bạn) và nhấp chọn 1 lá để lá bài bay lên ô!`;
    } else {
      statusText.innerHTML = `<span style="color:#69f0ae; font-weight:600;"><i class="fa-solid fa-circle-check"></i> Cả 3 lá bài định mệnh đã bay vào 3 ô! Đang chuyển sang trang Lật Mở 3 Lá & Luận Giải AI...</span>`;
    }
  }

  // Render the 3 destination slots always visible at the top of Page 4
  function renderTopTargetSlots() {
    const row = document.getElementById("draw-target-slots-row");
    if (!row) return;

    const spread = getActiveSpread();
    const backUrls = getCardBackUrls(state.selectedBackId);

    row.innerHTML = spread.slots.map((slot, slotIdx) => {
      const pickedIdx = state.pickedIndices[slotIdx];
      const isFilled = pickedIdx !== undefined;
      const isNextTarget = state.pickedIndices.length === slotIdx;

      return `
        <div class="target-slot-card ${isFilled ? "slot-filled" : ""} ${isNextTarget ? "active-target" : ""}" id="target-slot-box-${slotIdx}">
          <div class="target-slot-title">${slot.title}</div>
          <div class="target-slot-sub">${slot.subtitle}</div>

          <div class="slot-card-frame" id="target-slot-frame-${slotIdx}">
            ${
              isFilled
                ? `<img src="${backUrls.primary}" alt="Lá bài đã chọn #${pickedIdx + 1}" onerror="handleTarotImgError(this, '${backUrls.fallback}', 'TAROT')">`
                : `
                  <i class="fa-solid fa-wand-sparkles" style="font-size:1.4rem; color:rgba(212,175,55,0.4); margin-bottom:6px;"></i>
                  <span style="font-size:0.74rem; color:rgba(212,175,55,0.65);">Ô Bài Số ${slotIdx + 1}</span>
                `
            }
          </div>

          <div style="margin-top:8px; min-height:24px;">
            ${
              isFilled
                ? `
                  <span style="font-size:0.76rem; color:var(--gold-light); font-weight:600;">
                    <i class="fa-solid fa-check"></i> Lá số #${pickedIdx + 1}
                  </span>
                `
                : `<span style="font-size:0.73rem; color:var(--text-muted);">Đang chờ lá bài bay vào...</span>`
            }
          </div>
        </div>
      `;
    }).join("");
  }

  // Render either State A (Stacked Deck) or State B (78 Fanned Out Cards)
  function renderDeckRitualStage() {
    const stackedStage = document.getElementById("stacked-deck-stage");
    const stackedPile = document.getElementById("stacked-deck-pile");
    const fannedStage = document.getElementById("fanned-deck-stage");
    if (!stackedStage || !fannedStage || !stackedPile) return;

    const backUrls = getCardBackUrls(state.selectedBackId);

    // Populate the 5 visual layers of the 3D stacked deck
    stackedPile.innerHTML = Array.from({ length: 5 }, (_, i) => `
      <div class="stack-layer">
        <img src="${backUrls.primary}" alt="Deck Stack Layer ${i + 1}" onerror="handleTarotImgError(this, '${backUrls.fallback}', 'TAROT')">
      </div>
    `).join("");

    if (!state.isDeckFannedOut) {
      stackedStage.style.display = "flex";
      fannedStage.style.display = "none";
      fannedStage.innerHTML = "";
    } else {
      stackedStage.style.display = "none";
      fannedStage.style.display = "flex";
      buildFannedOutCardsDOM(fannedStage, backUrls);
    }
  }

  function buildFannedOutCardsDOM(fannedStage, backUrls) {
    // 2 Curved Fan Rows of 39 cards each = 78 cards total
    const buildRowHtml = (slice, offset) => {
      const mid = (slice.length - 1) / 2;
      return slice.map((item, localIdx) => {
        const globalIdx = offset + localIdx;
        const isPicked = state.pickedIndices.includes(globalIdx);
        // Gentle parabolic curve and angle so it looks like a real spread fan
        const norm = (localIdx - mid) / mid; // -1 to +1
        const arcY = Math.round(norm * norm * 16); // 0px at center, +16px at edges
        const arcRot = (norm * 9).toFixed(2); // -9deg to +9deg

        return `
          <div class="FanCard ${isPicked ? "picked" : ""}"
               data-deck-idx="${globalIdx}"
               data-row-idx="${localIdx}"
               style="--arc-y:${arcY}px; --arc-rot:${arcRot}deg; z-index:${localIdx + 1};">
            <img src="${backUrls.primary}"
                 alt="Lá bài #${globalIdx + 1}"
                 onerror="handleTarotImgError(this, '${backUrls.fallback}', 'TAROT')">
            <span class="fan-card-num">${globalIdx + 1}</span>
          </div>
        `;
      }).join("");
    };

    const row1Html = buildRowHtml(state.shuffledDeck.slice(0, 39), 0);
    const row2Html = buildRowHtml(state.shuffledDeck.slice(39, 78), 39);

    fannedStage.innerHTML = `
      <div style="font-size:0.82rem; color:var(--gold-light); text-align:center;">
        <i class="fa-solid fa-hand-pointer"></i> Di chuột qua dải bài để lá bài nổi lên • Nhấp chuột chọn lá bài để bay vào 3 ô phía trên
      </div>
      <div class="fan-spread-row" id="fan-row-1">${row1Html}</div>
      <div class="fan-spread-row" id="fan-row-2">${row2Html}</div>
    `;

    // Trigger staggered fan-out animation
    const allCards = fannedStage.querySelectorAll(".FanCard");
    allCards.forEach((cardEl, i) => {
      setTimeout(() => {
        cardEl.classList.add("fanned-in");
      }, (i % 39) * 11);
    });

    // Attach smooth Hover Wave Lift & Click-to-Fly handlers to each row
    ["fan-row-1", "fan-row-2"].forEach((rowId) => {
      const rowEl = document.getElementById(rowId);
      if (!rowEl) return;
      const rowCards = Array.from(rowEl.querySelectorAll(".FanCard"));

      rowCards.forEach((cardEl, localIdx) => {
        cardEl.addEventListener("mouseenter", () => {
          if (state.isAnimatingFlight) return;
          applyHoverWave(rowCards, localIdx);
        });

        cardEl.addEventListener("click", () => {
          const deckIdx = Number(cardEl.dataset.deckIdx);
          handleSelectFannedCard(cardEl, deckIdx);
        });
      });

      rowEl.addEventListener("mouseleave", () => {
        clearHoverWave(rowCards);
      });
    });
  }

  // Smooth wave lift when moving mouse across fanned cards
  function applyHoverWave(rowCards, hoveredLocalIdx) {
    rowCards.forEach((c, idx) => {
      c.classList.remove("hover-direct", "hover-near-1", "hover-near-2");
      const dist = Math.abs(idx - hoveredLocalIdx);
      if (dist === 0) {
        c.classList.add("hover-direct");
      } else if (dist === 1) {
        c.classList.add("hover-near-1");
      } else if (dist === 2) {
        c.classList.add("hover-near-2");
      }
    });
  }

  function clearHoverWave(rowCards) {
    rowCards.forEach((c) => {
      c.classList.remove("hover-direct", "hover-near-1", "hover-near-2");
    });
  }

  // Click stacked deck -> Fan out all 78 cards
  function handleExpandStackedDeck() {
    if (state.isDeckFannedOut) return;
    state.isDeckFannedOut = true;
    window.SoundFX.playShuffle();
    renderDeckRitualStage();
    updatePickStatusText();
  }

  // Click a card in the fanned deck -> Fly it into the target slot at the top!
  function handleSelectFannedCard(cardEl, deckIdx) {
    if (state.isAnimatingFlight) return;
    if (state.pickedIndices.includes(deckIdx)) return;
    if (state.pickedIndices.length >= 3) return;

    const targetSlotIdx = state.pickedIndices.length;
    const slotFrameEl = document.getElementById(`target-slot-frame-${targetSlotIdx}`);
    if (!slotFrameEl) return;

    state.isAnimatingFlight = true;
    state.pickedIndices.push(deckIdx);
    window.SoundFX.playCardPick(targetSlotIdx + 1);

    // Mark original card in the fan as picked immediately
    cardEl.classList.remove("hover-direct", "hover-near-1", "hover-near-2");
    cardEl.classList.add("picked");

    // Animate flying clone from cardEl to slotFrameEl
    animateCardFlightToSlot(cardEl, slotFrameEl, () => {
      state.isAnimatingFlight = false;
      renderTopTargetSlots();
      const landedFrame = document.getElementById(`target-slot-frame-${targetSlotIdx}`);
      if (landedFrame) {
        landedFrame.classList.add("landed-pulse");
      }
      updatePickStatusText();

      // If all 3 cards have been chosen & landed, automatically proceed to Page 5 (Flip & AI Analysis)!
      if (state.pickedIndices.length === 3) {
        setTimeout(() => {
          handleFlipAndAnalyze();
        }, 700);
      }
    });
  }

  function animateCardFlightToSlot(sourceEl, targetFrameEl, onComplete) {
    const startRect = sourceEl.getBoundingClientRect();
    const endRect = targetFrameEl.getBoundingClientRect();
    const backUrls = getCardBackUrls(state.selectedBackId);

    const clone = document.createElement("div");
    clone.className = "flying-card-clone";
    clone.style.left = `${startRect.left}px`;
    clone.style.top = `${startRect.top}px`;
    clone.style.width = `${startRect.width}px`;
    clone.style.height = `${startRect.height}px`;
    clone.style.transform = "rotate(0deg) scale(1.15)";
    clone.innerHTML = `<img src="${backUrls.primary}" alt="Flying Tarot Card" onerror="handleTarotImgError(this, '${backUrls.fallback}', 'TAROT')">`;

    document.body.appendChild(clone);

    // Force browser layout before setting target coordinates
    void clone.offsetWidth;

    requestAnimationFrame(() => {
      clone.style.left = `${endRect.left}px`;
      clone.style.top = `${endRect.top}px`;
      clone.style.width = `${endRect.width}px`;
      clone.style.height = `${endRect.height}px`;
      clone.style.transform = "rotate(360deg) scale(1)";
    });

    setTimeout(() => {
      clone.remove();
      if (typeof onComplete === "function") onComplete();
    }, 700);
  }

  // Quick Random 3 Draw (also fans deck if stacked and flies 3 random cards into the 3 slots!)
  function handleAutoPickRandom3() {
    if (state.isAnimatingFlight) return;
    if (!state.isDeckFannedOut) {
      state.isDeckFannedOut = true;
      renderDeckRitualStage();
    }

    state.pickedIndices = [];
    renderTopTargetSlots();

    const available = Array.from({ length: 78 }, (_, i) => i);
    const chosen3 = [];
    for (let k = 0; k < 3; k++) {
      const r = Math.floor(Math.random() * available.length);
      chosen3.push(available[r]);
      available.splice(r, 1);
    }

    // Sequentially fly the 3 random cards into Slot 1, 2, 3
    let step = 0;
    function flyNext() {
      if (step >= 3) return;
      const deckIdx = chosen3[step];
      const cardEl = document.querySelector(`.FanCard[data-deck-idx="${deckIdx}"]`);
      step++;
      if (cardEl) {
        handleSelectFannedCard(cardEl, deckIdx);
        if (step < 3) {
          setTimeout(flyNext, 740);
        }
      }
    }
    setTimeout(flyNext, 180);
  }

  // =========================================================================
  // 6. PAGE 5: 3D CARD FLIP & GEMINI AI READING
  // =========================================================================
  function renderRevealedThreeCardsStage() {
    const stage = document.getElementById("three-slots-stage");
    if (!stage) return;

    const spread = getActiveSpread();
    const backUrls = getCardBackUrls(state.selectedBackId);

    stage.innerHTML = spread.slots.map((slot, slotIdx) => {
      const pickedDeckIdx = state.pickedIndices[slotIdx];
      if (pickedDeckIdx === undefined) return "";

      const drawn = state.shuffledDeck[pickedDeckIdx];
      const frontUrls = getCardImageUrls(drawn.card, state.selectedDeckId);
      const orientClass = drawn.isReversed ? "reversed" : "upright";
      const orientText = drawn.isReversed ? "Lá Bài Ngược (Reversed) ↺" : "Lá Bài Xuôi (Upright) ↑";
      const keywords = (drawn.isReversed ? drawn.card.keywordsRev : drawn.card.keywordsUp).join(" • ");

      return `
        <div class="spread-slot-box">
          <div class="slot-header-tag">${slot.title}</div>
          <div class="slot-sub-tag">${slot.subtitle}</div>

          <div class="tarot-3d-viewport" data-zoom-slot="${slotIdx}" style="cursor:pointer;" title="Nhấn để phóng to mặt trước & mặt sau">
            <div class="tarot-3d-inner" id="card-3d-inner-${slotIdx}">
              <div class="tarot-face tarot-face-back">
                <img src="${backUrls.primary}" alt="Card Back" onerror="handleTarotImgError(this, '${backUrls.fallback}', 'BACK')">
              </div>
              <div class="tarot-face tarot-face-front ${drawn.isReversed ? "reversed-card" : ""}">
                <img src="${frontUrls.primary}" alt="${drawn.card.name}" onerror="handleTarotImgError(this, '${frontUrls.fallback}', '${drawn.card.name}')">
              </div>
            </div>
          </div>

          <span class="orientation-pill ${orientClass}">${orientText}</span>
          <div class="drawn-card-title">${drawn.card.name}</div>
          <div class="drawn-card-vi">${drawn.card.nameVi}</div>
          <div class="drawn-card-kw">${keywords}</div>
          <button type="button" class="sample-q-btn" data-zoom-slot="${slotIdx}" style="margin-top:10px;">
            <i class="fa-solid fa-magnifying-glass-plus"></i> Xem chi tiết lá bài
          </button>
        </div>
      `;
    }).join("");

    // Staggered 3D Flip animation for the 3 cards on Page 5
    spread.slots.forEach((_, idx) => {
      setTimeout(() => {
        const inner = document.getElementById(`card-3d-inner-${idx}`);
        if (inner) inner.classList.add("is-flipped");
      }, 220 + idx * 240);
    });

    stage.querySelectorAll("[data-zoom-slot]").forEach((el) => {
      el.addEventListener("click", () => {
        const idx = Number(el.dataset.zoomSlot);
        if (state.pickedIndices[idx] !== undefined) {
          openCardDetailModal(state.shuffledDeck[state.pickedIndices[idx]]);
        }
      });
    });
  }

  async function handleFlipAndAnalyze() {
    if (state.pickedIndices.length < 3 || state.isAnalyzing) return;

    state.isFlipped = true;
    state.isAnalyzing = true;

    // Transition to Page 5
    goToPage(5);
    renderRevealedThreeCardsStage();
    window.SoundFX.playCardFlip();

    const loadingBox = document.getElementById("ai-loading-container");
    const resultBox = document.getElementById("ai-result-container");
    const chatList = document.getElementById("followup-chat-list");

    if (loadingBox) loadingBox.style.display = "block";
    if (resultBox) resultBox.style.display = "none";
    if (chatList) chatList.innerHTML = "";

    const activeTopic = getActiveTopic();
    if (!state.question) {
      state.question = activeTopic.sampleQuestions[0];
    }

    const profile = window.AstrologyEngine.analyzeUserProfile({
      fullName: state.fullName,
      dob: state.dob,
      ageInput: state.age
    });

    const drawnCards = state.pickedIndices.map((idx) => state.shuffledDeck[idx]);
    const spread = getActiveSpread();
    const deck = getActiveDeck();

    const aiResponse = await window.TarotAI.generateTarotReading({
      profile,
      topicLabel: activeTopic.label,
      question: state.question,
      spread,
      drawnCards,
      deck
    });

    state.isAnalyzing = false;
    state.lastReadingMarkdown = aiResponse.text;
    window.SoundFX.playRevealComplete();

    if (loadingBox) loadingBox.style.display = "none";
    if (resultBox) {
      resultBox.style.display = "block";
      const modelBadge = document.getElementById("ai-model-used-badge");
      if (modelBadge) {
        modelBadge.innerHTML = aiResponse.isLiveAI
          ? `<i class="fa-solid fa-bolt"></i> Phân tích bởi Gemini AI (${aiResponse.modelUsed})`
          : `<i class="fa-solid fa-sparkles"></i> Phân tích bởi Hệ Thống Huyền Học Tarot Mystic`;
      }

      const contentDiv = document.getElementById("ai-reading-markdown");
      if (contentDiv) {
        contentDiv.innerHTML = window.renderMarkdownToHtml(aiResponse.text);
      }
    }

    saveReadingToHistory({
      id: Date.now(),
      timestamp: new Date().toLocaleString("vi-VN"),
      fullName: profile.fullName,
      age: profile.age,
      dobFormatted: profile.dobFormatted,
      zodiac: profile.zodiac.name,
      topic: activeTopic.label,
      question: state.question,
      deckName: deck.name,
      cards: drawnCards.map((d) => ({
        name: d.card.name,
        nameVi: d.card.nameVi,
        isReversed: d.isReversed
      })),
      readingText: aiResponse.text
    });
  }

  // =========================================================================
  // 7. FOLLOW-UP CHAT, ENCYCLOPEDIA & HISTORY MODALS
  // =========================================================================
  async function handleSendFollowUp() {
    const input = document.getElementById("input-followup-question");
    const btn = document.getElementById("btn-send-followup");
    const chatList = document.getElementById("followup-chat-list");
    if (!input || !chatList) return;

    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    btn.disabled = true;

    const userBubble = document.createElement("div");
    userBubble.className = "chat-bubble user";
    userBubble.innerHTML = `<strong>Bạn:</strong> ${text.replace(/</g, "&lt;")}`;
    chatList.appendChild(userBubble);

    const aiBubble = document.createElement("div");
    aiBubble.className = "chat-bubble ai";
    aiBubble.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <em>Tarot Reader AI đang kết nối 3 lá bài để giải đáp thêm cho bạn...</em>`;
    chatList.appendChild(aiBubble);
    chatList.scrollTop = chatList.scrollHeight;

    const profile = window.AstrologyEngine.analyzeUserProfile({
      fullName: state.fullName,
      dob: state.dob,
      ageInput: state.age
    });
    const drawnCards = state.pickedIndices.map((idx) => state.shuffledDeck[idx]);
    const spread = getActiveSpread();

    const replyMd = await window.TarotAI.askFollowUpQuestion({
      profile,
      question: state.question,
      spread,
      drawnCards,
      previousReading: state.lastReadingMarkdown,
      followUpText: text
    });

    aiBubble.innerHTML = `
      <div style="font-size:0.78rem; color:var(--gold-light); margin-bottom:4px;">
        <i class="fa-solid fa-hat-wizard"></i> <strong>Tarot Reader AI:</strong>
      </div>
      <div class="reading-markdown-content">${window.renderMarkdownToHtml(replyMd)}</div>
    `;
    btn.disabled = false;
    chatList.scrollTop = chatList.scrollHeight;
  }

  function openEncyclopediaModal(deckIdToView) {
    const modal = document.getElementById("modal-encyclopedia");
    const deckSelect = document.getElementById("gallery-deck-select");
    const suitSelect = document.getElementById("gallery-suit-filter");
    if (!modal) return;

    const activeDeckId = deckIdToView || state.selectedDeckId;
    if (deckSelect) {
      deckSelect.innerHTML = EXTERNAL_TAROT_DECKS.map((d) => `
        <option value="${d.id}" ${d.id === activeDeckId ? "selected" : ""}>${d.name} (${d.cardCount} Lá)</option>
      `).join("");
    }

    function renderGalleryCards() {
      const chosenDeckId = deckSelect ? deckSelect.value : activeDeckId;
      const chosenSuit = suitSelect ? suitSelect.value : "all";
      const grid = document.getElementById("encyclopedia-cards-grid");
      const backPreview = document.getElementById("encyclopedia-back-preview");

      const deckObj = EXTERNAL_TAROT_DECKS.find((d) => d.id === chosenDeckId) || EXTERNAL_TAROT_DECKS[0];
      const backUrls = getCardBackUrls(deckObj.defaultBackId);

      if (backPreview) {
        backPreview.innerHTML = `
          <div class="utility-flex" style="background:rgba(212,175,55,0.1); padding:10px 16px; border-radius:12px; border:1px solid rgba(212,175,55,0.3);">
            <img src="${backUrls.primary}" alt="Card Back" style="width:45px; height:74px; object-fit:cover; border-radius:6px; border:1px solid var(--gold-primary);" onerror="handleTarotImgError(this, '${backUrls.fallback}', 'BACK')">
            <div>
              <div style="font-weight:700; color:var(--gold-light); font-size:0.9rem;">${deckObj.name} — Đầy Đủ 78 Lá Bài & Mặt Sau Nguồn Ngoài</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Xuất xứ: ${deckObj.origin} • Mặt sau mặc định: ${backUrls.name}</div>
            </div>
          </div>
        `;
      }

      const filtered = FULL_TAROT_DECK.filter((c) => {
        if (chosenSuit === "all") return true;
        if (chosenSuit === "Major") return c.arcana === "Major";
        return c.suit === chosenSuit;
      });

      if (grid) {
        grid.innerHTML = filtered.map((card) => {
          const urls = getCardImageUrls(card, chosenDeckId);
          return `
            <div class="gallery-card-item" data-card-index="${card.index}" data-deck="${chosenDeckId}">
              <img src="${urls.primary}" alt="${card.name}" loading="lazy" onerror="handleTarotImgError(this, '${urls.fallback}', '${card.name}')">
              <div style="font-weight:700; font-size:0.84rem; color:#fff; margin-top:8px;">${card.name}</div>
              <div style="font-size:0.74rem; color:var(--gold-light);">${card.nameVi}</div>
              <div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">${card.element}</div>
            </div>
          `;
        }).join("");

        grid.querySelectorAll(".gallery-card-item").forEach((itemEl) => {
          itemEl.addEventListener("click", () => {
            const idx = Number(itemEl.dataset.cardIndex);
            const cardObj = FULL_TAROT_DECK[idx];
            openCardDetailModal({ card: cardObj, isReversed: false }, itemEl.dataset.deck);
          });
        });
      }
    }

    if (deckSelect) deckSelect.onchange = renderGalleryCards;
    if (suitSelect) suitSelect.onchange = renderGalleryCards;

    renderGalleryCards();
    modal.classList.add("open");
  }

  function openCardDetailModal(drawnItem, overrideDeckId = null) {
    const modal = document.getElementById("modal-card-detail");
    const body = document.getElementById("modal-card-detail-body");
    if (!modal || !body || !drawnItem) return;

    const deckId = overrideDeckId || state.selectedDeckId;
    const frontUrls = getCardImageUrls(drawnItem.card, deckId);
    const backUrls = getCardBackUrls(state.selectedBackId);
    const c = drawnItem.card;

    body.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:22px; align-items:start;">
        <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;">
          <div style="text-align:center;">
            <div style="font-size:0.75rem; color:var(--gold-light); margin-bottom:6px;">Mặt Trước (${c.name})</div>
            <img src="${frontUrls.primary}" alt="${c.name}" style="width:185px; height:312px; object-fit:cover; border-radius:12px; border:2px solid var(--gold-primary); transform:${drawnItem.isReversed ? "rotate(180deg)" : "none"};" onerror="handleTarotImgError(this, '${frontUrls.fallback}', '${c.name}')">
          </div>
          <div style="text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:6px;">Mặt Sau (${backUrls.name})</div>
            <img src="${backUrls.primary}" alt="Mặt sau" style="width:185px; height:312px; object-fit:cover; border-radius:12px; border:2px solid rgba(212,175,55,0.5);" onerror="handleTarotImgError(this, '${backUrls.fallback}', 'BACK')">
          </div>
        </div>
        <div>
          <span class="deck-card-badge">${c.arcanaVi}</span>
          <h3 style="font-family:var(--font-display); font-size:1.45rem; color:#fff; margin-top:8px;">${c.name}</h3>
          <div style="font-size:1rem; color:var(--gold-light); margin-bottom:12px;">${c.nameVi}</div>
          <p style="font-size:0.86rem; color:var(--text-muted); margin-bottom:12px;">
            <strong>Nguyên tố:</strong> ${c.element} &nbsp;|&nbsp; <strong>Chiêm tinh / Lĩnh vực:</strong> ${c.astro}
          </p>
          <div style="background:rgba(56,239,125,0.08); border-left:3px solid #69f0ae; padding:10px 14px; border-radius:8px; margin-bottom:12px;">
            <div style="font-weight:700; color:#69f0ae; font-size:0.86rem;">Ý Nghĩa Xuôi (Upright): ${c.keywordsUp.join(" • ")}</div>
            <p style="font-size:0.88rem; margin-top:4px;">${c.meaningUp}</p>
          </div>
          <div style="background:rgba(255,107,107,0.08); border-left:3px solid #ff8a80; padding:10px 14px; border-radius:8px;">
            <div style="font-weight:700; color:#ff8a80; font-size:0.86rem;">Ý Nghĩa Ngược (Reversed): ${c.keywordsRev.join(" • ")}</div>
            <p style="font-size:0.88rem; margin-top:4px;">${c.meaningRev}</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("open");
  }

  function saveReadingToHistory(entry) {
    state.readingHistory.unshift(entry);
    if (state.readingHistory.length > 15) {
      state.readingHistory = state.readingHistory.slice(0, 15);
    }
    localStorage.setItem("tarot_reading_history", JSON.stringify(state.readingHistory));
  }

  function openHistoryModal() {
    const modal = document.getElementById("modal-history");
    const listEl = document.getElementById("history-list-container");
    if (!modal || !listEl) return;

    if (state.readingHistory.length === 0) {
      listEl.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:28px;">Chưa có lịch sử trải bài nào được lưu.</p>`;
    } else {
      listEl.innerHTML = state.readingHistory.map((item) => `
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(212,175,55,0.28); border-radius:14px; padding:16px; margin-bottom:14px;">
          <div class="utility-flex" style="justify-content:space-between; margin-bottom:6px;">
            <strong style="color:var(--gold-light); font-size:0.96rem;">${item.fullName} (${item.age} tuổi • ${item.dobFormatted})</strong>
            <span style="font-size:0.76rem; color:var(--text-muted);">${item.timestamp}</span>
          </div>
          <div style="font-size:0.84rem; color:#e5c3ff; margin-bottom:6px;">
            <strong>Chủ đề:</strong> ${item.topic} — <em>"${item.question}"</em>
          </div>
          <div style="font-size:0.82rem; color:#fff; margin-bottom:10px;">
            <strong>3 Lá Đã Rút (${item.deckName}):</strong>
            ${item.cards.map((c) => `${c.name} (${c.isReversed ? "Ngược" : "Xuôi"})`).join(" • ")}
          </div>
          <details style="font-size:0.86rem; color:var(--text-muted); cursor:pointer;">
            <summary style="color:var(--gold-light); font-weight:600;">Xem lại toàn bộ luận giải AI</summary>
            <div class="reading-markdown-content" style="margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.1);">
              ${window.renderMarkdownToHtml(item.readingText)}
            </div>
          </details>
        </div>
      `).join("");
    }
    modal.classList.add("open");
  }

  // =========================================================================
  // 8. INITIALIZATION & EVENT LISTENERS
  // =========================================================================
  function initApp() {
    initStarfield();
    syncAgeFromDob();
    updateDestinyProfileUI();
    renderTopicPills();
    renderSpreadSelect();
    renderExternalDecksGrid();
    renderCardBacksStrip();
    resetAndPrepareDeck();

    // Form inputs on Page 1
    const nameEl = document.getElementById("input-fullname");
    const ageEl = document.getElementById("input-age");
    const dobEl = document.getElementById("input-dob");

    if (nameEl) nameEl.addEventListener("input", updateDestinyProfileUI);
    if (ageEl) ageEl.addEventListener("input", updateDestinyProfileUI);
    if (dobEl) {
      dobEl.addEventListener("change", () => {
        syncAgeFromDob();
        updateDestinyProfileUI();
      });
    }

    // Wizard Page Navigation Buttons
    document.getElementById("brand-home-link")?.addEventListener("click", () => goToPage(1));
    document.getElementById("btn-page1-next")?.addEventListener("click", () => goToPage(2));
    document.getElementById("btn-page2-next")?.addEventListener("click", () => goToPage(3));
    document.getElementById("btn-page3-next")?.addEventListener("click", () => {
      resetAndPrepareDeck();
      goToPage(4);
    });

    document.querySelectorAll("[data-goto-page]").forEach((el) => {
      el.addEventListener("click", () => {
        const target = Number(el.dataset.gotoPage);
        if (target === 5 && state.pickedIndices.length < 3) {
          goToPage(4);
          return;
        }
        goToPage(target);
      });
    });

    // Page 4: Click on Stacked Deck to Fan Out 78 Cards!
    const stackedStage = document.getElementById("stacked-deck-stage");
    if (stackedStage) {
      stackedStage.addEventListener("click", handleExpandStackedDeck);
    }

    const btnResetStack = document.getElementById("btn-reset-stack");
    if (btnResetStack) {
      btnResetStack.addEventListener("click", () => {
        window.SoundFX.playShuffle();
        resetAndPrepareDeck();
      });
    }

    const btnAutoPick = document.getElementById("btn-auto-pick-3");
    if (btnAutoPick) {
      btnAutoPick.addEventListener("click", handleAutoPickRandom3);
    }

    const chkReversed = document.getElementById("chk-allow-reversed");
    if (chkReversed) {
      chkReversed.addEventListener("change", () => {
        state.allowReversed = chkReversed.checked;
        resetAndPrepareDeck();
      });
    }

    const btnFlipAnalyze = document.getElementById("btn-flip-and-analyze");
    if (btnFlipAnalyze) {
      btnFlipAnalyze.addEventListener("click", handleFlipAndAnalyze);
    }

    // Page 5 actions
    document.getElementById("btn-new-reading")?.addEventListener("click", () => {
      resetAndPrepareDeck();
      goToPage(4);
    });
    document.getElementById("btn-back-to-draw")?.addEventListener("click", () => {
      resetAndPrepareDeck();
      goToPage(4);
    });
    document.getElementById("btn-restart-from-page1")?.addEventListener("click", () => {
      resetAndPrepareDeck();
      goToPage(1);
    });

    const btnCopyReading = document.getElementById("btn-copy-reading");
    if (btnCopyReading) {
      btnCopyReading.addEventListener("click", () => {
        if (!state.lastReadingMarkdown) return;
        navigator.clipboard.writeText(state.lastReadingMarkdown).then(() => {
          const orig = btnCopyReading.innerHTML;
          btnCopyReading.innerHTML = `<i class="fa-solid fa-check"></i> Đã sao chép!`;
          setTimeout(() => {
            btnCopyReading.innerHTML = orig;
          }, 2200);
        });
      });
    }

    // Follow-up Chat
    document.getElementById("btn-send-followup")?.addEventListener("click", handleSendFollowUp);
    document.getElementById("input-followup-question")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSendFollowUp();
      }
    });

    // Top Nav Modals
    document.getElementById("nav-btn-encyclopedia")?.addEventListener("click", () => openEncyclopediaModal(state.selectedDeckId));
    document.getElementById("nav-btn-history")?.addEventListener("click", openHistoryModal);

    const btnSound = document.getElementById("nav-btn-sound");
    if (btnSound) {
      btnSound.addEventListener("click", () => {
        const on = window.SoundFX.toggle();
        btnSound.innerHTML = on
          ? `<i class="fa-solid fa-volume-high"></i> Âm thanh: Bật`
          : `<i class="fa-solid fa-volume-xmark"></i> Âm thanh: Tắt`;
      });
    }

    const modalApi = document.getElementById("modal-api-settings");
    const inputApiKey = document.getElementById("input-gemini-key");
    const selectModel = document.getElementById("select-gemini-model");

    document.getElementById("nav-btn-api")?.addEventListener("click", () => {
      if (inputApiKey) inputApiKey.value = window.TarotAI.getApiKey();
      if (selectModel) selectModel.value = window.TarotAI.preferredModel;
      modalApi?.classList.add("open");
    });

    document.getElementById("btn-save-api-key")?.addEventListener("click", () => {
      window.TarotAI.setApiKey(
        inputApiKey ? inputApiKey.value : "",
        selectModel ? selectModel.value : "gemini-3-flash-preview"
      );
      modalApi?.classList.remove("open");
    });

    document.getElementById("btn-reset-api-key")?.addEventListener("click", () => {
      window.TarotAI.resetDefaultKey();
      if (inputApiKey) inputApiKey.value = window.TarotAI.getApiKey();
      if (selectModel) selectModel.value = window.TarotAI.preferredModel;
    });

    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.getElementById(btn.dataset.closeModal)?.classList.remove("open");
      });
    });

    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) backdrop.classList.remove("open");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initApp);
})();
