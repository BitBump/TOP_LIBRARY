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

/*-=LIBRARY=-########################################################################*/
const myLibrary = [];
/*###################################################################################*/

/*-=REFERENCES=-######################################################################*/
const cardsContainer = document.querySelector(".bookshelf");
const openDialogButton = document.querySelector(".openDialog");
const inputForm = document.querySelector("form");
const inputModal = document.querySelector("#bookInputDialog");
const submitButton = inputModal.querySelector("#submit");
const cancelButton = inputModal.querySelector("#cancel");
/*###################################################################################*/

/*-=FUNCTIONS=-######################################################################*/
function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read));
}

function addBookToDisplay(){
    //Removes all existing book cards
    cardsContainer.textContent = "";
     
    //Populates display div with book cards
    for(const book of myLibrary){
        let div = document.createElement("div");
        div.classList.add("bookCard");
        div.innerText = book.info();
        cardsContainer.appendChild(div);
    }
}
/*###################################################################################*/

/*-=LISTENERS=-######################################################################*/
openDialogButton.addEventListener("click", event => {
    inputModal.showModal();
});

submitButton.addEventListener("click", event => {
    event.preventDefault();

    //Add code to: retrieve data/add to library/update display

    inputModal.close();
    inputForm.reset();
});

cancelButton.addEventListener("click", event => {
    inputModal.close();
    inputForm.reset();
});
/*###################################################################################*/