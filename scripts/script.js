console.log("Welcome to the library");

const myLibrary = [];

function Book(title, author, pages, read, rating) {
    // the constructor..
    //protection if called without 'new'
    if (!new.target) {
        throw Error("You must use 'new' with a constructor function!!!");
    }
    //uuid creation
    const id = crypto.randomUUID()

    //properties
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
}

function addBookToLibrary(title, author, pages, read, rating) {
    // take params, create a book then store it in the array
    const book = new Book(title, author, pages, read, rating);
    myLibrary.push(book);
    displayBooks();
}

function createBookCard(book) {
    //create elements
    const bookCard = document.createElement('div');
    const bookHeading = document.createElement('h3');
    const bookDesc = document.createElement('p');

    //add classes
    bookCard.className = "book-item";

    //add textcontent
    bookHeading.textContent = `${book.title} by ${book.author}`
    bookDesc.textContent = `This book has ${book.pages} pages. ` + (
                            (book.read) ? 
                            `You have read this book and given it a rating of ${book.rating}` : 
                            `You have not read this book.`);

    //append elements
    bookCard.append(bookHeading, bookDesc)
    bookContainer.appendChild(bookCard);
}

function displayBooks() {
    bookContainer.replaceChildren();
    myLibrary.forEach(book => createBookCard(book))
}

function testBooks(num) {
    for (let i = 0; i < num; i++) {
        addBookToLibrary('The Hobbit', 'J. Tolkien', 500, true, 5);
        addBookToLibrary('Mr. Fox', 'R. Dahl', 67, false);
        addBookToLibrary('Frankenstein', 'M. Shelley', '235', 'true', 4.5);
        addBookToLibrary('The Becoming', 'J. Doe', 333, false);
    }
}

const bookContainer = document.querySelector(".book-container");

testBooks(0);

// Responsive feedback in the form
// hide/reveal rating slider if not read/read
const readCheck = document.querySelector("#read");
const rateBook = document.querySelector("#rate-book")
readCheck.addEventListener("input", () => rateBook.toggleAttribute("hidden"));

// rating slider
const ratingInput = document.querySelector("#rating");
const ratingOutput = document.querySelector("#rating-output");

ratingInput.addEventListener("input", ev => {
    const val = ev.target.value;
    ratingOutput.textContent = val;
});

// addbook behaviour
const addButton = document.querySelector("#addbook");

addButton.addEventListener("click", ev => {
    ev.preventDefault();
    console.log(`submitted`);

    addBookToLibrary(
        document.querySelector('#title').value,
        document.querySelector('#author').value,
        document.querySelector('#pages').value,
        document.querySelector('#read').checked,
        document.querySelector('#rating').value,
    );
});