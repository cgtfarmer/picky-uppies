class ShopSuccessMessage {
  static ui = document.querySelector('#shop-success-msg');

  constructor(text) {
    ShopSuccessMessage.ui.innerHTML = text;
    ShopSuccessMessage.ui.hidden = false;
    window.setTimeout(() => {
      ShopSuccessMessage.ui.hidden = true;
    }, 4000);
  }
}

