let myBooks = [
  {
    id: 0,
    title: "Wooden ship-building",
    author: "Charles Desmond",
    cover: "http://covers.openlibrary.org/b/isbn/9780911572377-M.jpg",
    exists: false
  },
  {
    id: 1,
    title: "Food and feeding",
    author: "Sir Henry Thompson",
    cover: "http://covers.openlibrary.org/b/isbn/0543994767-M.jpg", 
    exists: false
  },
];

function displayBooks() { 
  for(var i = 0; i < myBooks.length; i++) {  
      if(myBooks[i].exists !== true) {        
        let newDiv = document.createElement('div');
        newDiv.classList = 'card';
        document.getElementById("theReadingList").appendChild(newDiv);

        let titel = document.createElement('li');    
        titel.style.listStyle = 'none';    
        titel.innerText = myBooks[i].title;
        titel.classList = 'title';
        document.querySelectorAll(".card")[i].appendChild(titel);

        let img = document.createElement('img');
        img.src = myBooks[i].cover;
        img.classList = 'image';
        //img.width = '100px';
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
  }

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
      /* console.log("I am i " + i)   
      console.log(delButton)
      console.log("index number: " + index); 
      console.log(`myBooks Array:`);
      console.log(myBooks); */
      
      img.remove();
      auth.remove();
      delButtonT.remove();
      title.remove();
      pageCountLab.remove();
      pageCount.remove();
      newDiv.remove();

      // PROBLEM: we are always removing index one instead of index zero
      // because the button remains asigned to its original place (1)
      // hint: the bug does not seem to be related to the styling
      // solution: get right index number

      // maybe make new html file, create simply 2 buttons. then create a js file and create an array. add function to the buttons, then delete them from array and see what happens.

       // maybe taking the delButton query out of the function and updating it could help      

      // SOLUTION: RN, I JUST CALL IT WITHIN THE CODE, SO IT ONLY GETS RUN ONCE. WHAT I NEED TO DO IS ADD THIS FUNCTION TO THE DELETE BUTTONS IN THE DISPLAY FUNCTION WHERE THE BUTTONS ARE CREATED SO IT GETS REASIGNED EACH TIME ANEW + check programm flow again

      // surrender: workaround
      if(myBooks.length === 1) {
        myBooks.splice(0, 1);
        brbd.remove();
      } else {
        myBooks.splice(index, 1);
      }
      
    }
  })
}

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
            exists: false   
          },
        )
      }      
    displayBooks()
    deleteBooks()
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
        //create div element
        // put in there
        // change HTML, and add to new div in HTML
          document.getElementById("output").innerHTML
          +="<h2>"+response.docs[i].title+"</h2>"
          +"<label>"+response.docs[i].author_name[0]+"</label>"
          +"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>"
          +"<button class='addToMyReadingList'>add to my reading list</button>"
      }
      document.querySelector(".librarian").remove()
      document.querySelector(".librariantext").remove()
    addBooksToMyBooksArray()
    deleteBooks()
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

displayBooks()
deleteBooks()

// todo: 
// dropdown for outputs, using bootstrap
// add isbn number + filter for isbn existing in arr
// fix creation of multiple .card divs