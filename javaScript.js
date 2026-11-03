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
        return `${this.title} by ${this.author} 
                ${this.pages} pages
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
/*###################################################################################*/

/*-=FUNCTIONS=-######################################################################*/
function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read));
}

function addBookToDisplay(){
    cardsContainer.textContent = "";

    /*ALT to TRY
      while (myNode.firstChild) {
         myNode.removeChild(myNode.lastChild);
      }
     */
    for(const book of myLibrary){
        let div = document.createElement("div");
        div.classList.add("bookCard");
        div.innerText = book.info();
        cardsContainer.appendChild(div);
    }
}
/*###################################################################################*/