let num = 1;
const classBooks = document.getElementsByClassName("books");
let individualCircle;
let circle;
let toggle;
let toggleId;

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
    } else if (lowerCase === "no") {
        return `${this.read}, I haven't read it, but I'm planning on it.`;
    } else {
        return "Hmmmm let me think...";
    }
};
//Prototype pushes all of "Book Obj" to library array
Book.prototype.pushToLib = function() {
    myLibrary.push(this);
};

//changes read status to other option.
Book.prototype.changeRead = function() {
    let readText = this.read.toLowerCase();
    if (readText === "yes") {
        this.read = "No";
    } else {
        this.read = "Yes";
    }
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
    //adds book to myLib arr
    newBook.pushToLib();

    render();
}
//gives books individual id, will make targeting book for deletion easier
function assignId() {
    let jsClassBooks = Array.from(classBooks);
    for (let i = 0; i < jsClassBooks.length; i++) {
        jsClassBooks[i].setAttribute("id", "book" + i);
    }
}

function assignCircleId() {
    let circles = Array.from(document.getElementsByClassName("circle"));
    for (let i = 0; i < circles.length; i++) {
        circles[i].setAttribute("id", "circles" + i);
    }
}

function circleThing() {
    //note to self, on addEventListener, you can not just pass in the function as a second value
    //you must pass another function that references that function. Or it will fire immediatly and
    //not on your event listener.
    let targetAllCircles = Array.from(document.getElementsByClassName("circle"));

    for (let i = 0; i < targetAllCircles.length; i++) {
        targetAllCircles[i].addEventListener("click", function(event) {
            individualCircle = event.target.getAttribute("id");
            removeFromLib();
        });
    }
}

function toggleWork() {
    let toggleChoice = document.getElementById(toggleId);
    let parentId = toggleChoice.parentNode.id;
    let parentDiv = document.getElementById(parentId);

    //finds book in array that toggle div was inside of and changes read
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === parentDiv.firstElementChild.textContent) {
            myLibrary[i].changeRead();
        }
    }

    render();
}

//gives all toggles an Id.
function giveToggleId() {
    let allToggles = Array.from(document.getElementsByClassName("readStatus"));
    for (let i = 0; i < allToggles.length; i++) {
        allToggles[i].setAttribute("id", "toggle" + i);
        allToggles[i].addEventListener("click", function(event) {
            toggleId = event.target.getAttribute("id");
            toggleWork();
        });
    }
}

//uses circle id to find parent element text content. Uses that to find its index in myLib arr. Splices the array, and rerenders the array.
function removeFromLib() {
    let circleOfChoice = document.getElementById(individualCircle);
    let getParentId = circleOfChoice.parentNode.id;
    let parentDiv = document.getElementById(getParentId);

    //needs to remove the book from array, or when rendered or books added, will add book again.
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === parentDiv.firstElementChild.textContent) {
            myLibrary.splice(i, 1);
        }
    }

    render();
}

function toggleRead() {}

//creates divs from array in html
function render() {
    let bookContainer = document.getElementById("bookContainer");
    let bookContainerChildren = bookContainer.firstElementChild;

    while (bookContainerChildren) {
        bookContainerChildren.remove();
        bookContainerChildren = bookContainer.firstElementChild;
    }

    myLibrary.forEach(book => {
        const newBookDiv = document.createElement("div");
        bookContainer.appendChild(newBookDiv);

        //give books a class
        newBookDiv.setAttribute("class", "books");

        //creates title
        const newBookTitle = document.createElement("h1");
        let titleText = document.createTextNode(`${book.title}`);
        newBookTitle.appendChild(titleText);

        //creates author
        const newBookAuthor = document.createElement("h3");
        let authorText = document.createTextNode(`Author: ${book.author}`);
        newBookAuthor.appendChild(authorText);

        //Gives description of book
        const bookDescrBox = document.createElement("h3");
        let descriptionText = document.createTextNode(
            `Description: The book is ${book.pages} pages. ${book.readResponse()}`
        );
        bookDescrBox.appendChild(descriptionText);

        //gives toggle read ability.
        toggle = document.createElement("div");
        toggle.setAttribute("class", "readStatus");
        let toggleText = document.createTextNode("Click to Change Read Status");
        toggle.appendChild(toggleText);

        //create remove circle div
        circle = document.createElement("div");
        let circleText = document.createTextNode("X");
        circle.appendChild(circleText);
        circle.setAttribute("class", "circle");

        //Appending all to book Div
        newBookDiv.appendChild(newBookTitle);
        newBookDiv.appendChild(newBookTitle);
        newBookDiv.appendChild(newBookAuthor);
        newBookDiv.appendChild(toggle);
        newBookDiv.appendChild(bookDescrBox);
        newBookDiv.appendChild(circle);

        assignId();
    });

    assignCircleId();
    giveToggleId();
    circleThing();
}

render();