let myLibrary = [];
const list = document.querySelector('#list');
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
function addBookToLibrary() {
  const data = document.querySelectorAll('[type="text"]')
  myLibrary.push(new Book(...Array.from(data).map(x => x.value)));
  displayBook()
}
function displayBook() {
  const book = document.createElement('div');
  book.textContent = Object.values(myLibrary[0])
  list.appendChild(book)
}
