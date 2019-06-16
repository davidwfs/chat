const select = document.querySelector.bind(document);
const resToJSON = res => res.json();

function showMessage(message) {
  const listMessages = select('#list-messages');
  const element = document.createElement('li');
  element.textContent = message;
  listMessages.appendChild(element);
}

const showMessages = messages => messages.forEach(showMessage);

function submitMsg(event) {
  event.preventDefault();
  const form = event.target;
  const { value: message } = form.querySelector('[name="message"]');
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
  });

  fetch('/message', {
    headers,
    method: 'POST',
    body: JSON.stringify({ message }),
  }).catch(err => console.log(err));
}

function loadMessages() {
  fetch('/message')
    .then(resToJSON)
    .then(showMessages)
    .catch(err => console.log(err));
}

window.addEventListener('load', () => {
  const formChat = select('#form-message');
  const socket = io.connect('http://localhost:5000');

  socket.on('postMessage', data => showMessage(data));
  formChat.addEventListener('submit', submitMsg);

  loadMessages();
});
