// Shopping Cart & WhatsApp Order Builder with Full Bilingual Support

class OrderCart {
  constructor() {
    this.items = this.loadCart();
    this.cartDrawer = document.getElementById('cartDrawer');
    this.cartBackdrop = document.getElementById('cartBackdrop');
    this.cartCountBadges = document.querySelectorAll('.cart-count');
    this.cartTotalDisplays = document.querySelectorAll('.cart-total-amount');
    this.cartItemsList = document.getElementById('cartItemsList');
    this.freeDeliveryProgress = document.getElementById('freeDeliveryProgress');
    this.freeDeliveryNotice = document.getElementById('freeDeliveryNotice');
    
    this.initEvents();
    this.render();
  }

  get lang() {
    return window.currentLang || 'en';
  }

  get t() {
    return window.I18N[this.lang] || window.I18N.en;
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('vb_cart_items_v2');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('vb_cart_items_v2', JSON.stringify(this.items));
    } catch (e) {
      console.error(e);
    }
  }

  initEvents() {
    document.querySelectorAll('.trigger-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    const closeBtn = document.getElementById('closeCartBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    if (this.cartBackdrop) {
      this.cartBackdrop.addEventListener('click', () => this.closeDrawer());
    }

    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitWhatsAppOrder();
      });
    }

    const clearBtn = document.getElementById('clearCartBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const confirmMsg = this.lang === 'hi' 
          ? 'क्या आप थाली खाली करना चाहते हैं?' 
          : 'Are you sure you want to clear your plate?';
        if (confirm(confirmMsg)) {
          this.items = [];
          this.saveCart();
          this.render();
          this.showToast(this.lang === 'hi' ? 'थाली खाली कर दी गई है' : 'Order plate cleared');
        }
      });
    }
  }

  openDrawer() {
    if (this.cartDrawer) this.cartDrawer.classList.add('active');
    if (this.cartBackdrop) this.cartBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    if (this.cartDrawer) this.cartDrawer.classList.remove('active');
    if (this.cartBackdrop) this.cartBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  addItem(itemId, portion = 'half', option = null) {
    const dish = MENU_ITEMS.find(i => i.id === itemId);
    if (!dish) return;

    let price = 0;
    if (dish.hasHalfFull) {
      price = portion === 'full' ? dish.prices.full : dish.prices.half;
    } else {
      price = dish.price;
    }

    const cartKey = `${itemId}_${portion}_${option || ''}`;
    const existingIndex = this.items.findIndex(i => i.key === cartKey);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += 1;
    } else {
      this.items.push({
        key: cartKey,
        id: itemId,
        nameEn: dish.nameEn,
        nameHi: dish.nameHi,
        portion: portion,
        option: option,
        price: price,
        quantity: 1,
        image: dish.image
      });
    }

    this.saveCart();
    this.render();
    const itemName = this.lang === 'hi' ? dish.nameHi : dish.nameEn;
    this.showToast(`${this.lang === 'hi' ? 'जोड़ा गया' : 'Added'}: ${itemName}`);
  }

  updateQuantity(key, delta) {
    const itemIndex = this.items.findIndex(i => i.key === key);
    if (itemIndex > -1) {
      this.items[itemIndex].quantity += delta;
      if (this.items[itemIndex].quantity <= 0) {
        this.items.splice(itemIndex, 1);
        this.showToast(this.lang === 'hi' ? 'आइटम हटा दिया गया' : 'Item removed');
      }
      this.saveCart();
      this.render();
    }
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  render() {
    const subtotal = this.getSubtotal();
    const count = this.getTotalCount();
    const minOrder = RESTAURANT_INFO.minOrderForFreeDelivery;
    const t = this.t;

    this.cartCountBadges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    this.cartTotalDisplays.forEach(d => {
      d.textContent = `₹${subtotal}`;
    });

    // Free delivery meter
    if (this.freeDeliveryProgress && this.freeDeliveryNotice) {
      if (subtotal === 0) {
        this.freeDeliveryProgress.style.width = '0%';
        this.freeDeliveryNotice.innerHTML = t.freeDeliveryBase;
      } else if (subtotal >= minOrder) {
        this.freeDeliveryProgress.style.width = '100%';
        this.freeDeliveryProgress.style.backgroundColor = '#1a1a1a';
        this.freeDeliveryNotice.innerHTML = t.freeDeliveryUnlocked;
      } else {
        const remaining = minOrder - subtotal;
        const pct = Math.min(100, Math.round((subtotal / minOrder) * 100));
        this.freeDeliveryProgress.style.width = `${pct}%`;
        this.freeDeliveryProgress.style.backgroundColor = '#1a1a1a';
        this.freeDeliveryNotice.innerHTML = t.freeDeliveryRemaining.replace('{amount}', remaining);
      }
    }

    // Render items list
    if (this.cartItemsList) {
      if (this.items.length === 0) {
        this.cartItemsList.innerHTML = `
          <div style="text-align: center; padding: 60px 20px;">
            <div style="font-family: var(--font-serif); font-style: italic; font-size: 2.2rem; color: #1a1a1a; margin-bottom: 8px;">
              ${t.cartEmptyTitle}
            </div>
            <p style="font-size: 0.88rem; color: #6a675e; margin-bottom: 24px; max-width: 280px; margin-left: auto; margin-right: auto;">
              ${t.cartEmptyDesc}
            </p>
            <button class="btn-pill filled" onclick="cart.closeDrawer(); location.href='#menuFullSection'">
              ${t.btnBrowseMenu}
            </button>
          </div>
        `;
        const checkoutCard = document.getElementById('checkoutSummaryCard');
        if (checkoutCard) checkoutCard.style.display = 'none';
      } else {
        const checkoutCard = document.getElementById('checkoutSummaryCard');
        if (checkoutCard) checkoutCard.style.display = 'block';

        this.cartItemsList.innerHTML = this.items.map(item => {
          const name = this.lang === 'hi' ? item.nameHi : item.nameEn;
          const subName = this.lang === 'hi' ? item.nameEn : item.nameHi;
          let portionStr = '';
          if (item.portion === 'full') {
            portionStr = this.lang === 'hi' ? 'फुल (Full)' : 'Full Portion';
          } else if (item.portion === 'half') {
            portionStr = this.lang === 'hi' ? 'हाफ (Half)' : 'Half Portion';
          }

          return `
            <div class="cart-item-row-minimal">
              <div style="flex: 1; padding-right: 14px;">
                <div style="font-weight: 600; font-size: 0.95rem; color: #1a1a1a;">${name}</div>
                <div style="font-size: 0.78rem; color: #736e65;">${subName}</div>
                ${portionStr ? `<div style="font-size: 0.72rem; color: #1a1a1a; font-weight: 600; margin-top: 2px;">• ${portionStr}</div>` : ''}
                ${item.option ? `<div style="font-size: 0.72rem; color: #a06e30; margin-top: 2px;">• ${item.option}</div>` : ''}
                <div style="font-family: var(--font-serif); font-style: italic; font-size: 1.15rem; color: #1a1a1a; margin-top: 4px;">
                  ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}
                </div>
              </div>
              <div>
                <div class="dish-stepper">
                  <button type="button" onclick="cart.updateQuantity('${item.key}', -1)" aria-label="Decrease">−</button>
                  <span>${item.quantity}</span>
                  <button type="button" onclick="cart.updateQuantity('${item.key}', 1)" aria-label="Increase">+</button>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    if (window.renderMenuQuantities) {
      window.renderMenuQuantities();
    }
  }

  submitWhatsAppOrder() {
    if (this.items.length === 0) return;

    const nameInput = document.getElementById('custName');
    const phoneInput = document.getElementById('custPhone');
    const addressInput = document.getElementById('custAddress');
    const notesInput = document.getElementById('custNotes');
    const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'Delivery';
    const chosenNumber = document.querySelector('input[name="whatsappPhone"]:checked')?.value || RESTAURANT_INFO.phone1;

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const address = addressInput ? addressInput.value.trim() : '';
    const notes = notesInput ? notesInput.value.trim() : '';

    if (!name) {
      alert(this.lang === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'Please enter your name');
      if (nameInput) nameInput.focus();
      return;
    }

    if (orderType.includes('Delivery') && !address) {
      alert(this.lang === 'hi' ? 'कृपया डिलीवरी का पता दर्ज करें' : 'Please enter delivery address');
      if (addressInput) addressInput.focus();
      return;
    }

    const subtotal = this.getSubtotal();
    const isFree = subtotal >= RESTAURANT_INFO.minOrderForFreeDelivery;

    let msg = `*Namaste Vaishno Bhojnalaya!* 🙏\n`;
    msg += `I would like to place an order:\n\n`;
    msg += `🍱 *ORDER DETAILS (${orderType.toUpperCase()}):*\n`;
    msg += `----------------------------------------\n`;

    this.items.forEach((item, idx) => {
      let line = `${idx + 1}. *${item.nameEn}* / ${item.nameHi}`;
      if (item.portion && item.portion !== 'default') line += ` [${item.portion.toUpperCase()}]`;
      if (item.option) line += ` (${item.option})`;
      line += `\n   ➔ ₹${item.price} x ${item.quantity} = *₹${item.price * item.quantity}*`;
      msg += line + `\n`;
    });

    msg += `----------------------------------------\n`;
    msg += `💰 *Subtotal:* ₹${subtotal}\n`;
    if (orderType.includes('Delivery')) {
      msg += `🛵 *Delivery:* ${isFree ? 'FREE DELIVERY! 🎉' : 'Below ₹300 (Standard area fee applies)'}\n`;
    }

    msg += `\n👤 *CUSTOMER INFO:*\n`;
    msg += `• Name: ${name}\n`;
    if (phone) msg += `• Mobile: ${phone}\n`;
    if (orderType.includes('Delivery')) {
      msg += `• Delivery Address: ${address}\n`;
    } else {
      msg += `• Type: Takeaway / Pickup at Restaurant\n`;
    }

    if (notes) {
      msg += `• Special Notes: ${notes}\n`;
    }

    msg += `\n✨ Please confirm my order and share the preparation time. Thank you!`;

    const encoded = encodeURIComponent(msg);
    const targetPhone = chosenNumber.replace(/\D/g, '');
    const fullPhone = targetPhone.startsWith('91') ? targetPhone : `91${targetPhone}`;
    const waUrl = `https://wa.me/${fullPhone}?text=${encoded}`;

    window.open(waUrl, '_blank');
    this.showToast(this.lang === 'hi' ? 'व्हाट्सएप खोला जा रहा है...' : 'Opening WhatsApp...');
  }

  showToast(text) {
    let toast = document.getElementById('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #1a1a1a;
        color: #f3f1e7;
        padding: 10px 22px;
        border-radius: 9999px;
        font-size: 0.82rem;
        font-weight: 500;
        z-index: 99999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.style.opacity = '1';
    toast.style.visibility = 'visible';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.visibility = 'hidden';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2600);
  }
}

window.OrderCart = OrderCart;
