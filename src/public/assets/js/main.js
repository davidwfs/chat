const select = document.querySelector.bind(document);
const resToJSON = res => res.json();

function showMessage({ content }) {
  const listMessages = select('#list-messages');
  const element = document.createElement('li');
  element.textContent = content;
  listMessages.appendChild(element);
}

const showMessages = messages => messages.forEach(showMessage);

function submitMsg(event) {
  event.preventDefault();
  const form = event.target;
  const author = localStorage.getItem('author');
  const textarea = form.querySelector('[name="message"]');
  const { value: content } = textarea;
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
  });

  fetch('/message', {
    headers,
    method: 'POST',
    body: JSON.stringify({ author, content }),
  })
    .then(() => {
      textarea.value = '';
    })
    .catch(err => console.log(err));
}

function loadMessages() {
  fetch('/message')
    .then(resToJSON)
    .then(showMessages)
    .catch(err => console.log(err));
}

function setAuthor(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector('[name="author"]');
  const { value: author } = input;
  localStorage.setItem('author', author);
}

window.addEventListener('load', () => {
  const formMessage = select('#form-message');
  const formAuthor = select('#form-author');
  const socket = io.connect('http://localhost:5000');

  socket.on('postMessage', message => showMessage(message));
  formMessage.addEventListener('submit', submitMsg);
  formAuthor.addEventListener('submit', setAuthor);

  loadMessages();
});
