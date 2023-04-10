const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = { GET_DATA: '/data', SEND_DATA: '/' };
const Method = { GET: 'GET', POST: 'POST' };
const ErrorText = { GET_DATA: 'He удалось загрузить данные. Попробуйте обновить страницу', SEND_DATA: 'He удалось отправить форму. Попробуйте ещё раз' };

const getServerInteraction = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => getServerInteraction(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => getServerInteraction(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
