/*#-=CONSTRUCTORS=-##################################################################*/
function Book(title, author, pages, read){
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.read = read;
    this.title = title;
    this.pages = pages;
    this.author = author;
    
    /*Best practice: a function should return values. These can be passed wherever, 
      no ties had to what the function ('info()', in this case) does.*/
    this.info = function(){
        return `"${this.title}" by author: "${this.author}" 
                pages: ${this.pages}
                status: ${this.read}
                id: ${this.id}`;
    }
}
/*###################################################################################*/


/*-=PROTOTYPES=-#####################################################################*/
Book.prototype.changeStatus = function(){
    if(this.read === "read"){
        this.read = "not read"
    } else {
        this.read = "read";
    }
};
/*###################################################################################*/

/*-=LIBRARY=-########################################################################*/
//Chosen 'let' over 'const' to enable self-assignment (myLibrary = myLibrary.filter())
let myLibrary = [];
/*###################################################################################*/

/*-=REFERENCES=-######################################################################*/
const inputForm = document.querySelector("form");
const inputModal = document.querySelector("#bookInputDialog");
const submitButton = inputModal.querySelector("#sbm");
const cancelButton = inputModal.querySelector("#cancel");
const cardsContainer = document.querySelector(".bookshelf");
const openDialogButton = document.querySelector(".openDialog");
/*###################################################################################*/


/*-=FUNCTIONS=-######################################################################*/
function makeRemoveButton(){
    let remButton = document.createElement("button");
    remButton.setAttribute("type", "button");
    remButton.setAttribute("class", "remButton");
    remButton.textContent = "Remove Book";
    remButton.addEventListener("click", event => {
        let bookId = event.target.parentNode.dataset.id;
        removeBookFromLibrary(bookId);
        updateDisplay();
    });

    return remButton;
}

function makeStatusToggleButton(){
    let statusToggle = document.createElement("button");
    statusToggle.setAttribute("type", "button");
    statusToggle.setAttribute("class", "statusToggle");
    statusToggle.textContent = "Change Status";
    statusToggle.addEventListener("click", event => {
        //Retrieve book id
        let bookId = event.target.parentNode.dataset.id;

        //Extract book from array of books
        let book = myLibrary.find(book => book.id === bookId);

        //Get book's index inside array of books
        let bookIndex = myLibrary.indexOf(book);

        //Change book's read status
        book.changeStatus();

        //Remove previous book iteration & insert new at same position
        myLibrary.splice(bookIndex, 1, book);

        //Repaint library display (order of books unaltered)
        updateDisplay();
    });

    return statusToggle;
}

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read));
}

//Take bookId, removes matching book from myLibrary
function removeBookFromLibrary(bookId){
    myLibrary = myLibrary.filter(book => book.id !== bookId);
}

function updateDisplay(){
    //Removes all existing book cards
    cardsContainer.textContent = "";
     
    //Populates display div with book cards
    for(const book of myLibrary){
        let div = document.createElement("div");
        div.classList.add("bookCard");
        div.innerText = book.info() + "\n";
        div.dataset.id = book["id"]; //Applies "data-attribute"(data-id) to the div
        div.appendChild(makeRemoveButton());
        div.appendChild(makeStatusToggleButton());
        //Develop method to create "Remove" button, add listener to it and append to div
        cardsContainer.appendChild(div);
    }
}

function updateLibrary(title, author, pages, read){
    addBookToLibrary(title, author, pages, read);
    updateDisplay();
}

function closeAndResetModal(){
    inputModal.close();
    inputForm.reset();
}
/*###################################################################################*/


/*-=LISTENERS=-######################################################################*/
openDialogButton.addEventListener("click", event => {
    inputModal.showModal();
});

inputForm.addEventListener("submit", event => {

    event.preventDefault();

    //Refined solution
    let formData = new FormData(inputForm);

    //"Array.from()" converts iterable into array
    //"formData.values()" retrieves iterable containing values only
    let bookInfo = Array.from(formData.values());

    if (bookInfo.length === 4) {
        //"..." (Spread Operator) unpacks values inside array into individual arguments
        updateLibrary(...bookInfo);
    } else {
        alert("Missing data, operation aborted");
    }

    closeAndResetModal();
});


cancelButton.addEventListener("click", event => {
    closeAndResetModal();
});
/*###################################################################################*/