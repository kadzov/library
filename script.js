let myLibrary = [];
const list = document.querySelector('#list');
const button = document.querySelector('button');
window.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    button.blur();
    addBookToLibrary();
  }
});
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
function addBookToLibrary() {
  const data = document.querySelectorAll('[type="text"]');
  myLibrary.push(new Book(...Array.from(data).map(i => i.value)));
  const book = myLibrary[myLibrary.length - 1];
  const card = document.createElement('div');
  card.style.position = 'relative';
  card.innerHTML += `<span class='x'>✖</span>`;
  card.innerHTML += `<span class='status'>✔</span>`;
  for (const info in book) {
    card.innerHTML += `<p>${book[info]}</p>`;
  }
  list.appendChild(card);
  const x = document.querySelectorAll('.x')[myLibrary.length - 1];
  x.addEventListener('click', () => {
    card.remove();
    myLibrary.splice(myLibrary.indexOf(card), 1);
  });
  const status = document.querySelectorAll('.status')[myLibrary.length - 1];
  status.addEventListener('click', e => {
    if (getComputedStyle(status).color === 'rgba(255, 255, 255, 0.376)') {
      e.target.style.color = '#26ff00';
      card.lastChild.textContent = 'read';
    } else {
      e.target.style.color = '#ffffff60';
      card.lastChild.textContent = 'not read yet';
    }
  });
}
