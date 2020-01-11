let num = 1;

//Book obj constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//simple prototype to display read info.
Book.prototype.readResponse = function() {
    let lowerCase = this.read.toLowerCase();
    if (lowerCase === "yes") {
        return `${this.read}, I have read ${this.title}!`;
    } else {
        return `${this.read}, I haven't read it, but I'm planning on it.`;
    }
};
//Prototype pushes all of "Book Obj" to library array
Book.prototype.pushToLib = function() {
    myLibrary.push(this);
};

// Demo books - Used to populate page. Can be removed.
const lotr1 = new Book(
    "Lord of the Rings: The Fellow Ship of the Ring",
    "J.R.R Tolkien",
    398,
    "Yes"
);
const lotr2 = new Book(
    "Lord of the Rings: The Two Towers",
    "J.R.R Tolkien",
    400,
    "No"
);
const lotr3 = new Book(
    "Lord of the Rings: The Return of the King",
    "J.R.R Tolkien",
    400,
    "No"
);
let myLibrary = [lotr1, lotr2, lotr3];

// Creates book obj from user input
function createBook() {
    let newTitle = document.getElementById("title").value;
    let newAuthor = document.getElementById("author").value;
    let newPages = document.getElementById("pages").value;
    let newRead = document.getElementById("read").value;
    const newBook = new Book(newTitle, newAuthor, newPages, newRead);
    newBook.pushToLib();

    render();
}

function removeFromLib() {}

//creates divs from array in html
function render() {
    const bookContainer = document.getElementById("bookContainer");

    myLibrary.forEach(book => {
        const newBookDiv = document.createElement("div");
        bookContainer.appendChild(newBookDiv);
        //creates title
        const newBookTitle = document.createElement("h1");
        let titleText = document.createTextNode(`${book.title}`);
        newBookTitle.appendChild(titleText);
        //creates author
        const newBookAuthor = document.createElement("h3");
        let authorText = document.createTextNode(`${book.author}`);
        newBookAuthor.appendChild(authorText);
        //Gives description of book
        const bookDescrBox = document.createElement("h3");
        let descriptionText = document.createTextNode(
            `The book is ${book.pages} pages, and ${book.readResponse()}`
        );
        bookDescrBox.appendChild(descriptionText);
        //create remove circle div
        const circle = document.createElement("div");
        circle.setAttribute("id", "circle");

        newBookDiv.appendChild(newBookTitle);
        newBookDiv.appendChild(newBookTitle);
        newBookDiv.appendChild(newBookAuthor);
        newBookDiv.appendChild(bookDescrBox);
        newBookDiv.appendChild(circle);
        newBookDiv.style.backgroundColor = "blue";
        newBookDiv.style.border = "2px solid black";
    });
}

render();