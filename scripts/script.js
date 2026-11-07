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

    this.changeReadStatus = function () {
        this.read = this.read ? false : true;
    }
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
    const btns = document.createElement('span');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    //add classes
    bookCard.className = "book-item";
    btns.className = "book-btns"
    removeBtn.className = "remove-btn";
    readBtn.className = "read-btn";

    //add textcontent
    bookHeading.textContent = `${book.title} by ${book.author}`
    bookDesc.textContent = `This book has ${book.pages} pages. ` + (
                            (book.read) ? 
                            `You have read this book and given it a rating of ${book.rating}.` : 
                            `You have not read this book.`);
    removeBtn.textContent = `Remove`;
    readBtn.textContent = 'Read';

    removeBtn.dataset.bookid = book.id;
    readBtn.dataset.bookid = book.id;

    //append elements
    btns.append(readBtn, removeBtn);
    bookCard.append(bookHeading, bookDesc, btns);
    bookContainer.appendChild(bookCard);

    // remove button behaviour
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => btn.addEventListener("click", removeBook));

    // read-btn behavious
    const readBtns = document.querySelectorAll('.read-btn');
    readBtns.forEach(btn => btn.addEventListener("click", readBook));
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

function removeBook(ev) {
    const btnclicked = ev.target;
    const targetid = btnclicked.dataset.bookid;

    myLibrary.splice(
        myLibrary.findIndex(index => index.id === targetid),
        1
    );

    displayBooks();
}

function readBook(ev) {
    const btnclicked = ev.target;
    const targetid = btnclicked.dataset.bookid;

    const targetBook = myLibrary.filter(book => book.id === targetid);
    
    targetBook[0].changeReadStatus();

    if (targetBook[0].read) {
        const userRating = prompt(`Rate ${targetBook[0].title} from 1 (lowest) to 5 (highest).`);
        targetBook[0].rating = roundRating(userRating);
    }

    displayBooks();
}

function roundRating (rating) {
    // guard checks to limit the range of our rating
    if (rating > 5) return 5;
    if (rating < 1) return 1;

    // separate the integer and decimal portions
    let integer = rating * 10;
    let decimal = integer % 10;
    integer -= decimal;

    // if decimal is equal to 0.5, the rating will increase by 0.5
    // else if decimal is greater than 0.5, the rating will increase by 1
    // else, the rating will increase by 0
    decimal = (decimal === 5) ? 5 
            : (decimal > 5) ? 10 
            : 0;

    // sum the integer and decimal parts
    rating = (integer + decimal) / 10;

    return rating;
}

const bookContainer = document.querySelector(".book-container");

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
    ratingOutput.textContent = `${val} / 5`;
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

// testbooks
testBooks(1);