class ShopErrorMessage {
  static ui = document.querySelector('#shop-error-msg');

  constructor(text) {
    ShopErrorMessage.ui.innerHTML = text;
    ShopErrorMessage.ui.hidden = false;
    window.setTimeout(() => {
      ShopErrorMessage.ui.hidden = true;
    }, 3000);
  }
}

