let myLibrary = [];
const list = document.querySelector('#list');
const button = document.querySelector('button');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? read : this.changeStatus();
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

if (localStorage) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.hasOwnProperty(i)) {
      myLibrary.push(new Book(...JSON.parse(localStorage[i])));
      createCard();
    }
  }
}
function addBookToLibrary() {
  const data = document.querySelectorAll('[type="text"]');
  myLibrary.push(new Book(...Array.from(data).map(i => i.value)));
  createCard();
}

function updateStorage() {
  let array = [];
  for (const object of myLibrary) {
    for (const property in object) {
      array.push(object[property]);
    }
    localStorage.setItem(myLibrary.indexOf(object), JSON.stringify(array));
    array = [];
  }
}

function createCard() {

  updateStorage();
  const book = myLibrary[myLibrary.length - 1];
  const card = document.createElement('div');
  card.style.position = 'relative';
  card.innerHTML += `<span class='x'>✖</span>`;
  card.innerHTML += `<span class='status'>✔</span>`;
  for (const info in book) {
    card.innerHTML += `<p>${book[info]}</p>`;
  }
  list.insertBefore(card, list.childNodes[0]);

  const x = document.querySelector('.x');
  x.addEventListener('click', () => {
    card.remove();
    localStorage.removeItem(myLibrary.indexOf(book));
    myLibrary.splice(myLibrary.indexOf(book), 1);
    localStorage.clear();
    updateStorage();
  });

  const status = document.querySelector('.status');
  if (card.lastChild.textContent === 'read') {
    status.style.color = '#26ff00';
  }
  status.addEventListener('click', e => {
    if (card.lastChild.textContent === 'not read') {
      card.lastChild.textContent = 'read';
      e.target.style.color = '#26ff00';
      updateStatus()
    } else {
      card.lastChild.textContent = 'not read';
      e.target.style.color = '#ffffff60';
      updateStatus()
    }
  });
  function updateStatus() {
    const newStatus = JSON.parse(localStorage[myLibrary.indexOf(book)]);
    newStatus[newStatus.length - 1] = card.lastChild.textContent
    localStorage.removeItem(myLibrary.indexOf(book));
    localStorage.setItem(myLibrary.indexOf(book), JSON.stringify(newStatus));
  }

}

window.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    button.blur();
    addBookToLibrary();
  }
});
