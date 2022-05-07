let myBooks = [
  {
    id: 0,
    title: "Wooden ship-building",
    author: "Charles Desmond",
    cover: "http://covers.openlibrary.org/b/isbn/9780911572377-M.jpg",
    exists: false,
    isbn: "isbn: 9780911572377"
  },
  {
    id: 1,
    title: "Food and feeding",
    author: "Sir Henry Thompson",
    cover: "http://covers.openlibrary.org/b/isbn/0543994767-M.jpg", 
    exists: false,
    isbn: "isbn: 1590861191"
  },
];

function displayBooks() { 
  for(var i = 0; i < myBooks.length; i++) {  
      if(myBooks[i].exists !== true) {        
        let newDiv = document.createElement('div');
        newDiv.classList = 'card';
        document.getElementById("theReadingList").appendChild(newDiv);

        let isbn = document.createElement('li'); 
        isbn.style.listStyle = 'none';  
        isbn.innerText = myBooks[i].isbn;
        isbn.classList = 'isbn';
        document.querySelectorAll(".card")[i].appendChild(isbn);

        let titel = document.createElement('li');    
        titel.style.listStyle = 'none';    
        titel.innerText = myBooks[i].title;
        titel.classList = 'title';
        document.querySelectorAll(".card")[i].appendChild(titel);

        let img = document.createElement('img');
        img.src = myBooks[i].cover;
        img.classList = 'image';
        document.querySelectorAll(".card")[i].appendChild(img);   

        let auth = document.createElement('li');
        auth.style.listStyle = 'none';
        auth.innerText = "by " + myBooks[i].author;     
        auth.classList = 'auth';
        document.querySelectorAll(".card")[i].appendChild(auth);  

        let pageProgressLabel = document.createElement('label');
        pageProgressLabel.innerText = 'at page'; 
        pageProgressLabel.classList = 'pageProgLab';
        let pageProgress = document.createElement('input');
        pageProgress.type = 'number';
        pageProgress.classList = 'pageProg';
        document.querySelectorAll(".card")[i].appendChild(pageProgressLabel);    
        document.querySelectorAll(".card")[i].appendChild(pageProgress);    

        let delButton = document.createElement('button');  
        delButton.onclick = deleteBooks;      
        delButton.innerText = 'delete';
        delButton.style.display = 'block';
        delButton.classList = 'delete';
        delButton.style.marginBottom = '25px';   
        document.querySelectorAll(".card")[i].appendChild(delButton);

        myBooks[i].exists = true;
    }
  }
};

function deleteBooks() {
  let delButton = document.querySelectorAll(".delete");
  let i = 0;
  delButton.forEach(function(books, index) {
    let img = document.getElementsByClassName ('image')[index];
    let auth = document.querySelectorAll('.auth')[index];
    let delButtonT = document.querySelectorAll(".delete")[index];
    let title = document.querySelectorAll(".title")[index];
    let pageCountLab = document.querySelectorAll(".pageProgLab")[index];
    let pageCount = document.querySelectorAll(".pageProg")[index];
    let newDiv = document.querySelectorAll(".card")[index];
    let brbd = document.querySelector("#brbd");
    
    i = index;
    books.onclick = function() {      
      img.remove();
      auth.remove();
      delButtonT.remove();
      title.remove();
      pageCountLab.remove();
      pageCount.remove();
      newDiv.remove();

      // workaround
      if(myBooks.length === 1) {
        myBooks.splice(0, 1);
        brbd.remove();
      } else {
        myBooks.splice(index, 1);
      }
    }
  })
};

function addBooksToMyBooksArray() {
  let cover = document.querySelectorAll(".addToMyReadingList");
  cover.forEach(function(cv, ind) {
    cv.onclick = function saveCover() {    
      var img = document.getElementsByTagName("img")[ind];
      let auth = document.getElementsByTagName("label")[ind+1].innerText;
      let title = document.getElementsByTagName("h2")[ind].innerText;
      let isbn = document.getElementsByTagName("p")[ind].innerText;
      let titleCheck = [];      
      myBooks.forEach(function(currentValue) {
        titleCheck.push(currentValue.title === title);              
      })
      console.log(titleCheck);
        
      if(titleCheck.includes(true)) {
        console.log("book is in array");
        alert("this book is already on your list");
      } else 
      {
        console.log("book isn't in array")
        myBooks.push (
          {
            id: myBooks.length+1,
            title: title,
            author: auth,
            cover: img.src,
            exists: false,
            isbn: isbn
          },
        )
      }      
    displayBooks()
    deleteBooks()
    }
  }
)};

function queryOpenLibrary() {
  let librarian = document.createElement('img');   
  let librarianText = document.createElement('label');  
  librarian.src = 'librarian.gif'; 
  librarian.classList = 'librarian';
  librarian.style = ' border-radius: 50%; '
  librarianText.classList = 'librariantext';  
  librarianText.innerText = 'the librarian is on his way to get you your books';
  librarianText.style.display = 'block';
  document.getElementById("librarian").appendChild(librarianText);
  document.getElementById("librarian").appendChild(librarian);


  document.getElementById('output').innerHTML="";
  fetch("http://openlibrary.org/search.json?q="+document.getElementById("input").value)
  .then(response => response.json())
  .then(response => {
      for(let i=0; i<2; i++) {
        document.getElementById("output").innerHTML
        +="<div class='inner'></div>"
        document.getElementsByClassName("inner")[i].innerHTML
          +="<h2 class='bookTitle'>"+response.docs[i].title+"</h2>"
          +"<label>"+response.docs[i].author_name[0]+"</label>"
          +"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]
          +"-M.jpg'><br>"
          +"<p>isbn: "+response.docs[i].isbn[0]+"</p>"
          +"<button class='addToMyReadingList'>add to my reading list</button>"
          console.log(response.docs[0]);
      }
      document.querySelector(".librarian").remove()
      document.querySelector(".librariantext").remove()
    addBooksToMyBooksArray()
    deleteBooks()
  })/* .catch(e => {
    if(e) {
      let a=document.createElement('a');
      a.target='_blank';
      a.href='https://youtu.be/ssda8v36W9g?t=20';
      if (window.confirm("You weren't specific enough in your search request or left the input field empty. The librarian is mad.")) {
        a.click();
        };
        document.querySelector(".librarian").remove()
        document.querySelector(".librariantext").remove()

      librarian.src = "https://reellibrarians.files.wordpress.com/2017/10/screen-shot-2017-09-06-at-12-17-07-pm.png"
      librarianText.innerText ="Dont you know Dewey Decimal System!?!?"

      document.getElementById("librarian").appendChild(librarianText);
      document.getElementById("librarian").appendChild(librarian);
      
      setTimeout(window.location.reload.bind(window.location), 3000)
    }
  }) */
};

document.getElementById("input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    queryOpenLibrary();
  }
});


function flip(){
  // flip images multiple times when adding to the reading list
}

displayBooks()
deleteBooks()