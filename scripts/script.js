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
    bookDesc.textContent = `This book has ${book.pages} pages. \n` + (
                            (book.read) ? 
                            `You have read this book and given it a rating of ${book.rating}` : 
                            `You have not read this book.`);

    //append elements
    bookCard.append(bookHeading, bookDesc)
    bookContainer.appendChild(bookCard);
}

function displayBooks() {
    myLibrary.forEach(book => createBookCard(book))
}

const bookContainer = document.querySelector(".book-container")
