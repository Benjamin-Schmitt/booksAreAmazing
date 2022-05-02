const myBooks = [
  {
    id: 0,
    title: "Wooden ship-building",
    author: "Charles Desmond",
    cover: "http://covers.openlibrary.org/b/isbn/9780911572377-M.jpg",
    on: false
  },
  {
    id: 1,
    title: "Food and feeding",
    author: "Sir Henry Thompson",
    cover: "http://covers.openlibrary.org/b/isbn/0543994767-M.jpg", 
    on: false
  },
];

function displayBooksFromMyBooksArray() { 
  for(var i = 0; i < myBooks.length; i++) {
      if(myBooks[i].on !== true) {
        let titel = document.createElement('li');    
        titel.style.listStyle = 'none';    
        titel.innerText = myBooks[i].title;
        titel.classList = 'title';
        document.body.appendChild(titel);

        let img = document.createElement('img');
        img.src = myBooks[i].cover;
        img.classList = 'image'
        document.body.appendChild(img);    

        let auth = document.createElement('li');
        auth.style.listStyle = 'none';
        auth.innerText = "by " + myBooks[i].author;     
        auth.classList = 'auth';
        document.body.appendChild(auth);        

        let pageProgressLabel = document.createElement('label');
        pageProgressLabel.innerText = 'at page'; 
        pageProgressLabel.classList = 'pageProgLab';
        let pageProgress = document.createElement('input');
        pageProgress.type = 'number';
        pageProgress.classList = 'pageProg';
        document.body.appendChild(pageProgressLabel);
        document.body.appendChild(pageProgress);

        let delButton = document.createElement('button');
        delButton.innerText = 'delete';
        delButton.style.display = 'block';
        delButton.classList = 'delete'; 
        delButton.style.marginBottom = '25px';   
        document.body.appendChild(delButton);

        myBooks[i].on = true;
      }
    }
  }
displayBooksFromMyBooksArray()

function deleteBooksFromMyBooksArray() {
  let delButton = document.querySelectorAll(".delete");
  delButton.forEach(function(books, index) {
    let img = document.getElementsByClassName ('image')[index];
    let auth = document.querySelectorAll('.auth')[index];
    let delButtonT = document.querySelectorAll(".delete")[index];
    let title = document.querySelectorAll(".title")[index];
    let pageCountLab = document.querySelectorAll(".pageProgLab")[index];
    let pageCount = document.querySelectorAll(".pageProg")[index];

    books.onclick = function() {     
      img.remove();
      auth.remove();
      delButtonT.remove();
      title.remove();
      pageCountLab.remove();
      pageCount.remove();
      myBooks.splice(index, 1)
    }
  }) 
}
deleteBooksFromMyBooksArray()

function addBooksToMyBooksArray() {
  let cover = document.querySelectorAll(".addToMyReadingList");
  cover.forEach(function(cv, ind) {
    cv.onclick = function saveCover() {    
      var img = document.getElementsByTagName("img")[ind]
      let auth = document.getElementsByTagName("label")[ind+1].innerText
      let title = document.getElementsByTagName("h2")[ind].innerText
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
            on: false   
          },
        )
      }      
    displayBooksFromMyBooksArray()
    deleteBooksFromMyBooksArray()
    }
  }
)}

function queryOpenLibrary() {
  let librarian = document.createElement('img');   
  let librarianText = document.createElement('label');  
  librarian.src = 'librarian.gif'; 
  librarian.classList = 'librarian';
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
          +="<h2>"+response.docs[i].title+"</h2>"
          +"<label>"+response.docs[i].author_name[0]+"</label>"
          +"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>"
          +"<button class='addToMyReadingList'>add to my reading list</button>"
      }
      document.querySelector(".librarian").remove()
      document.querySelector(".librariantext").remove()
    addBooksToMyBooksArray()
    deleteBooksFromMyBooksArray()
  }).catch(e => {
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
  })
}


// todo: 
// dropdown for outputs, using bootstrap
// to array func
// let or const instead of var
// seperate func expressions from func call
// rename .on into "exists"
// add isbn number + filter for isbn existing in arr
