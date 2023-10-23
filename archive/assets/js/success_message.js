class SuccessMessage {
  static successMsgUi = document.querySelector('#success-msg');

  constructor(text) {
    SuccessMessage.successMsgUi.innerHTML = text;
    SuccessMessage.successMsgUi.hidden = false;
    window.setTimeout(() => {
      SuccessMessage.successMsgUi.hidden = true;
    }, 7000);
  }
}

