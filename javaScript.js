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
const inputForm = document.querySelector("form");
const inputModal = document.querySelector("#bookInputDialog");
const submitButton = inputModal.querySelector("#submit");
const cancelButton = inputModal.querySelector("#cancel");
const cardsContainer = document.querySelector(".bookshelf");
const openDialogButton = document.querySelector(".openDialog");
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
        div.dataset.id = book["id"]; //Applies "data-attribute"(data-id) to the div
        //Develop method to create "Remove" button, add listener to it and append to div
        cardsContainer.appendChild(div);
    }
}

function closeAndResetModal(){
    inputModal.close();
    inputForm.reset();
}

function updateLibrary(title, author, pages, read){
    addBookToLibrary(title, author, pages, read);
    addBookToDisplay();
}
/*###################################################################################*/

/*-=LISTENERS=-######################################################################*/
openDialogButton.addEventListener("click", event => {
    inputModal.showModal();
});

submitButton.addEventListener("click", event => {
    event.preventDefault();

    //First (working) solution
    /*
    let bookInfo = [];
    let formData = new FormData(inputForm);
    for (const dataPoint of formData){bookInfo.push(dataPoint[1]);}
    if(bookInfo.length === 4){
        updateLibrary(bookInfo[0], bookInfo[1], bookInfo[2], bookInfo[3]);
    } else {
        alert("Missing data, operation aborted");
    }
    */

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