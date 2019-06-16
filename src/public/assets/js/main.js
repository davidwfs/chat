const select = document.querySelector.bind(document);

function listMsgs(msgs) {
  const boxMgsgs = select('#box-msg');
  const html = msgs.map(msg => `<p>${msg}</p>`).join('');

  boxMgsgs.innerHTML = html;
}

window.addEventListener('load', () => {
  fetch('/value')
    .then(res => res.json())
    .then(listMsgs)
    .catch(err => console.log(err));
});
