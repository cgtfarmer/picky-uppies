class ErrorMessage {
  static errorMsgUi = document.querySelector('#error-msg');

  constructor(text) {
    ErrorMessage.errorMsgUi.innerHTML = text;
    ErrorMessage.errorMsgUi.hidden = false;
    window.setTimeout(() => {
      ErrorMessage.errorMsgUi.hidden = true;
    }, 3000);
  }
}

