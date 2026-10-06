// Vaishno Bhojnalaya - Main Application Controller
// Editorial Aesthetic, Bilingual Engine (EN/HI), Blur-Reveal & Slider

window.currentLang = localStorage.getItem('vb_lang') || 'en';
let activeCategory = 'all';
let searchQuery = '';
let itemPortionState = {};
let itemOptionState = {};

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initLanguage();
  initBlurReveal();
  initCuratedSlider();
  initCategoryPills();
  initSearch();
  initMobileNav();

  // Initialize Shopping Cart
  window.cart = new OrderCart();

  // Render content
  renderAllBilingualText();
  renderCuratedDishes();
  renderMenu();
});

/* ========================================================
   1. EDITORIAL PRELOADER (CALM & LUXURIOUS)
   ======================================================== */
function initPreloader() {
  const preloader = document.getElementById('culinaryPreloader');
  const fill = document.getElementById('loaderFill');
  const counter = document.getElementById('loaderPercent');
  const skipBtn = document.getElementById('skipLoaderBtn');

  if (!preloader) return;

  const totalDuration = 2400; // 2.4s smooth luxury pacing
  const startTime = performance.now();
  let animationFrameId = null;
  let isDismissed = false;

  function updateProgress(currentTime) {
    if (isDismissed) return;

    const elapsed = currentTime - startTime;
    const rawProgress = Math.min(1, elapsed / totalDuration);

    // Smooth cubic ease-out so it begins steadily and eases gently into 100%
    const easedProgress = 1 - Math.pow(1 - rawProgress, 2.2);
    const percent = Math.floor(easedProgress * 100);

    if (fill) fill.style.width = `${percent}%`;
    if (counter) counter.textContent = `${percent}%`;

    if (rawProgress < 1) {
      animationFrameId = requestAnimationFrame(updateProgress);
    } else {
      // Hold at 100% briefly so the user sees completion
      setTimeout(() => {
        dismiss();
      }, 400);
    }
  }

  animationFrameId = requestAnimationFrame(updateProgress);

  function dismiss() {
    if (isDismissed) return;
    isDismissed = true;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
      // Trigger initial reveal animations on the hero section
      document.querySelectorAll('.hero-editorial-section .reveal-blur').forEach(el => {
        el.classList.add('is-revealed');
      });
    }, 850);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      dismiss();
    });
  }

  // Backup fallback timeout
  setTimeout(() => {
    if (preloader && !isDismissed) {
      dismiss();
    }
  }, 4500);
}


/* ========================================================
   2. BILINGUAL LANGUAGE CONTROLLER (EN & HI)
   ======================================================== */
function initLanguage() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== window.currentLang) {
        setLanguage(targetLang);
      }
    });
  });

  updateLangBtnStates();
}

window.setLanguage = function(lang) {
  window.currentLang = lang;
  localStorage.setItem('vb_lang', lang);
  updateLangBtnStates();
  renderAllBilingualText();
  initCategoryPills();
  renderCuratedDishes();
  renderMenu();
  if (window.cart) window.cart.render();
};

function updateLangBtnStates() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === window.currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function renderAllBilingualText() {
  const t = window.I18N[window.currentLang] || window.I18N.en;

  // Replace text for all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Replace placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  // Headings with <em>
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });
}

/* ========================================================
   3. BLUR TEXT REVEAL INTERSECTION OBSERVER
   ======================================================== */
function initBlurReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-blur').forEach(el => {
    observer.observe(el);
  });
}

/* ========================================================
   4. CURATED MENU SLIDER
   ======================================================== */
function initCuratedSlider() {
  const track = document.getElementById('curatedSliderTrack');
  const btnPrev = document.getElementById('sliderPrev');
  const btnNext = document.getElementById('sliderNext');

  if (!track) return;

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      track.scrollBy({ left: -340, behavior: 'smooth' });
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      track.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }
}

function renderCuratedDishes() {
  const track = document.getElementById('curatedSliderTrack');
  if (!track) return;

  const curatedIds = ['thali-130', 'shahi-paneer', 'dal-makhani', 'kadhai-paneer', 'butter-naan', 'rajma-chawal'];
  const curated = curatedIds.map(id => MENU_ITEMS.find(i => i.id === id)).filter(Boolean);

  track.innerHTML = curated.map(item => {
    const name = window.currentLang === 'hi' ? item.nameHi : item.nameEn;
    const cat = MENU_CATEGORIES.find(c => c.id === item.category);
    const catName = cat ? (window.currentLang === 'hi' ? cat.nameHi : cat.nameEn) : '';

    return `
      <div class="curated-dish-card" onclick="quickAddDish('${item.id}')">
        <div class="curated-media">
          <img src="${item.image}" alt="${name}" loading="lazy">
        </div>
        <div class="curated-dish-meta">
          <span class="curated-dish-name">${name}</span>
          <span class="curated-dish-category">${catName}</span>
        </div>
      </div>
    `;
  }).join('');
}

/* ========================================================
   5. CATEGORY PILLS FILTER
   ======================================================== */
function initCategoryPills() {
  const container = document.getElementById('categoryPills');
  if (!container) return;

  container.innerHTML = MENU_CATEGORIES.map(cat => {
    const name = window.currentLang === 'hi' ? cat.nameHi : cat.nameEn;
    const count = cat.id === 'all' ? MENU_ITEMS.length : MENU_ITEMS.filter(i => i.category === cat.id).length;
    return `
      <button class="cat-pill-minimal ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
        <span>${name}</span>
        <span style="font-size: 0.7rem; opacity: 0.75; margin-left: 4px;">(${count})</span>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.cat-pill-minimal').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.cat-pill-minimal').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      renderMenu();
    });
  });
}

/* ========================================================
   6. SEARCH FILTER
   ======================================================== */
function initSearch() {
  const searchInput = document.getElementById('menuSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderMenu();
  });
}

/* ========================================================
   7. INTERACTIVE MENU GRID RENDERING
   ======================================================== */
function renderMenu() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  const t = window.I18N[window.currentLang] || window.I18N.en;

  let filtered = MENU_ITEMS.filter(item => {
    const catMatch = (activeCategory === 'all') || (item.category === activeCategory);
    if (!catMatch) return false;

    if (searchQuery) {
      const q = searchQuery;
      const matchNameHi = item.nameHi.toLowerCase().includes(q);
      const matchNameEn = item.nameEn.toLowerCase().includes(q);
      const matchDescEn = item.descriptionEn.toLowerCase().includes(q);
      const matchDescHi = item.descriptionHi.toLowerCase().includes(q);
      return matchNameHi || matchNameEn || matchDescEn || matchDescHi;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px;">
        <h4 style="font-family: var(--font-serif); font-style: italic; font-size: 1.8rem; margin-bottom: 6px;">
          ${t.noDishesFound}
        </h4>
        <p style="color: #6a675e; font-size: 0.9rem;">${t.trySearchingElse}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const currentPortion = itemPortionState[item.id] || 'half';
    let currentPrice = item.price;
    let priceLabel = '';

    if (item.hasHalfFull) {
      currentPrice = currentPortion === 'full' ? item.prices.full : item.prices.half;
      priceLabel = currentPortion === 'full' ? t.portionFull : t.portionHalf;
    }

    const cartKey = `${item.id}_${currentPortion}_${itemOptionState[item.id] || ''}`;
    const cartItem = window.cart ? window.cart.items.find(ci => ci.key === cartKey) : null;
    const inCartQty = cartItem ? cartItem.quantity : 0;

    const displayName = window.currentLang === 'hi' ? item.nameHi : item.nameEn;
    const subName = window.currentLang === 'hi' ? item.nameEn : item.nameHi;
    const displayDesc = window.currentLang === 'hi' ? item.descriptionHi : item.descriptionEn;
    const badge = window.currentLang === 'hi' ? item.badgeHi : item.badgeEn;

    return `
      <div class="dish-card-minimal">
        <div>
          <div class="dish-title-group">
            <div>
              <div class="dish-name-editorial">${displayName}</div>
              <div class="dish-subname">${subName}</div>
            </div>
            ${badge ? `<span style="font-size: 0.7rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; border: 1px solid var(--border-hairline); padding: 2px 8px; border-radius: var(--radius-pill);">${badge}</span>` : ''}
          </div>

          <p class="dish-desc-editorial">${displayDesc}</p>

          ${item.options ? `
            <select style="width: 100%; padding: 6px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-hairline); font-size: 0.8rem; margin-bottom: 12px; background: #fff;" onchange="setDishOption('${item.id}', this.value)">
              ${item.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          ` : ''}

          ${item.hasHalfFull ? `
            <div class="dish-portion-selector">
              <button type="button" class="portion-toggle-btn ${currentPortion === 'half' ? 'active' : ''}" onclick="setDishPortion('${item.id}', 'half')">
                ${t.portionHalf} • ₹${item.prices.half}
              </button>
              <button type="button" class="portion-toggle-btn ${currentPortion === 'full' ? 'active' : ''}" onclick="setDishPortion('${item.id}', 'full')">
                ${t.portionFull} • ₹${item.prices.full}
              </button>
            </div>
          ` : ''}
        </div>

        <div class="dish-bottom-actions">
          <div class="dish-price-editorial">
            ₹${currentPrice} <span style="font-size: 0.72rem; font-family: var(--font-sans); font-style: normal; color: #6a675e;">${priceLabel ? `/ ${priceLabel}` : ''}</span>
          </div>

          <div>
            ${inCartQty > 0 ? `
              <div class="dish-stepper">
                <button type="button" onclick="cart.updateQuantity('${cartKey}', -1)" aria-label="Decrease">−</button>
                <span>${inCartQty}</span>
                <button type="button" onclick="cart.updateQuantity('${cartKey}', 1)" aria-label="Increase">+</button>
              </div>
            ` : `
              <button type="button" class="btn-pill" onclick="onCardAddClick('${item.id}')">
                + ${t.btnAddToCart}
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.setDishPortion = function(dishId, portion) {
  itemPortionState[dishId] = portion;
  renderMenu();
};

window.setDishOption = function(dishId, option) {
  itemOptionState[dishId] = option;
  renderMenu();
};

window.onCardAddClick = function(dishId) {
  const item = MENU_ITEMS.find(i => i.id === dishId);
  if (!item) return;

  const portion = itemPortionState[dishId] || (item.hasHalfFull ? 'half' : 'default');
  const option = itemOptionState[dishId] || (item.options ? item.options[0] : null);

  if (window.cart) {
    window.cart.addItem(dishId, portion, option);
  }
};

window.quickAddDish = function(dishId, defaultOption = null) {
  if (window.cart) {
    const dish = MENU_ITEMS.find(i => i.id === dishId);
    const portion = (dish && dish.hasHalfFull) ? 'half' : 'default';
    const option = defaultOption || (dish && dish.options ? dish.options[0] : null);
    window.cart.addItem(dishId, portion, option);
    window.cart.openDrawer();
  }
};

window.renderMenuQuantities = function() {
  renderMenu();
};

/* ========================================================
   8. MOBILE NAVIGATION DRAWER
   ======================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const closeBtn = document.getElementById('closeMobileNavBtn');

  if (!menuBtn || !drawer || !backdrop) return;

  function openNav() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  backdrop.addEventListener('click', closeNav);

  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}
