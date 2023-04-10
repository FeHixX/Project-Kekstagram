import { isEscapeKey } from './util.js';
import { addDocumentListener, dellDocumentListener } from './upload-file.js';

const CLASS_MESSAGE = { SUCCESS: 'success', ERROR: 'error' };
const messageFragment = document.createDocumentFragment();

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error-message');
  alertContainer.textContent = message;
  document.body.append(alertContainer);
};

const modalUpload = () => {
  const uploadTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
  const uploadElement = uploadTemplate.cloneNode(true);
  messageFragment.append(uploadElement);
  document.body.append(messageFragment);
};

const getPressingKey = () => {
  let windowMessage;
  if (document.querySelector(`.${CLASS_MESSAGE.SUCCESS}`)) {
    windowMessage = document.querySelector(`.${CLASS_MESSAGE.SUCCESS}`);
  } else if (document.querySelector(`.${CLASS_MESSAGE.ERROR}`)) {
    windowMessage = document.querySelector(`.${CLASS_MESSAGE.ERROR}`);
    addDocumentListener();
  }
  windowMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    getPressingKey();
  }
}

const onButtonCloseClick = (value) => {
  const messageButton = document.querySelector(`.${value}__button`);
  messageButton.addEventListener('click', (evt) => {
    document.querySelector(`.${value}`).remove();
    if (evt.target.matches(`.${CLASS_MESSAGE.ERROR}__button`)) {
      addDocumentListener();
    }
    document.removeEventListener('keydown', onDocumentKeydown);
  });
};

const checkMessageListener = (value) => {
  const windowMessage = document.querySelector(`.${value}`);
  const onCloseMessageClick = (evt) => {
    if (windowMessage === evt.target) {
      windowMessage.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
    if (evt.target.matches(`.${CLASS_MESSAGE.ERROR}`)) {
      addDocumentListener();
    }
  };
  windowMessage.addEventListener('click', onCloseMessageClick);
};

const getMessage = (value) => {
  document.querySelector('.img-upload__message').remove();
  const messageTemplate = document.querySelector(`#${value}`).content.querySelector(`.${value}`);
  const messageElement = messageTemplate.cloneNode(true);
  messageFragment.append(messageElement);
  document.body.append(messageFragment);

  if (messageElement.matches(`.${CLASS_MESSAGE.ERROR}`)) {
    dellDocumentListener();
  }
  document.addEventListener('keydown', onDocumentKeydown);
};

const showMessage = (value) => {
  getMessage(value);
  checkMessageListener(value);
  onButtonCloseClick(value);
};

export { showAlert, modalUpload, showMessage };
