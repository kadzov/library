screen.orientation.lock()
let myLibrary = [];
const list = document.querySelector('#list');
const button = document.querySelector('button');
window.addEventListener('propertydown', e => {
  if (e.code === 'Enter') {
    button.blur();
    addBookToLibrary();
  }
});
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = this.changeStatus();
  }
  changeStatus() {
    if (!this.read || this.read === 'read') {
      return this.read = 'not read';
    }
    return this.read = 'read';
  }
}
const checkbox = document.querySelector('#read');
checkbox.addEventListener('click', e => {
  if (e.target.value === 'on') {
    Book.prototype.changeStatus();
  }
});
function addBookToLibrary() {
  const data = document.querySelectorAll('[type="text"]');
  myLibrary.push(new Book(...Array.from(data).map(i => i.value)));
  createCard();
}
if (localStorage.length > 0) {
  for (const property in localStorage) {
    if (localStorage.hasOwnProperty(property)) {
      myLibrary.push(new Book(...JSON.parse(localStorage[property])));
      createCard();
    }
  }
}
//save read status after reload
function createCard() {
  let array = [];
  for (const object of myLibrary) {
    for (const property in object) {
      array.push(object[property]);
    }
    localStorage.setItem(myLibrary.indexOf(object), JSON.stringify(array));
    array = [];
  }
  const book = myLibrary[myLibrary.length - 1];
  const card = document.createElement('div');
  card.style.position = 'relative';
  card.innerHTML += `<span class='x'>✖</span>`;
  card.innerHTML += `<span class='status'>✔</span>`;
  for (const info in book) {
    card.innerHTML += `<p>${book[info]}</p>`;
  }
  list.appendChild(card);
  const status = document.querySelectorAll('.status')[myLibrary.length - 1];
  if (card.lastChild.textContent === 'read') {
    status.style.color = '#26ff00';
  }
  status.addEventListener('click', e => {
    if (card.lastChild.textContent === 'not read') {
      e.target.style.color = '#26ff00';
      card.lastChild.textContent = 'read';
    } else {
      e.target.style.color = '#ffffff60';
      card.lastChild.textContent = 'not read';
    }
  });
  const x = document.querySelectorAll('.x')[myLibrary.length - 1];
  x.addEventListener('click', () => {
    card.remove();
    myLibrary.splice(myLibrary.indexOf(card), 1);
  });
}
