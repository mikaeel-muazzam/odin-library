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
