var myBooks = [
  {
    id: 0,
    title: "Harry Potter and the Deathly Hallows",
    author: "J. K. Rowling",
    cover: "http://covers.openlibrary.org/b/isbn/3551354073-M.jpg",
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
        var titel = document.createElement('li');    
        titel.style.listStyle = 'none';    
        titel.innerText = myBooks[i].title;
        titel.classList = 'title';
        document.body.appendChild(titel);

        var img = document.createElement('img');
        img.src = myBooks[i].cover;
        img.classList = 'image'
        document.body.appendChild(img);    

        var auth = document.createElement('li');
        auth.style.listStyle = 'none';
        auth.innerText = "by " + myBooks[i].author;     
        auth.classList = 'auth';
        document.body.appendChild(auth);        

        var pageProgressLabel = document.createElement('label');
        pageProgressLabel.innerText = 'at page'; 
        pageProgressLabel.classList = 'pageProgLab';
        var pageProgress = document.createElement('input');
        pageProgress.type = 'number';
        pageProgress.classList = 'pageProg';
        document.body.appendChild(pageProgressLabel);
        document.body.appendChild(pageProgress);

        var delButton = document.createElement('button');
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
  document.getElementById('output').innerHTML="";
  fetch("http://openlibrary.org/search.json?q="+document.getElementById("input").value)
  .then(response => response.json())
  .then(response => {
      for(var i=0; i<2; i++) {
          document.getElementById("output").innerHTML
          +="<h2>"+response.docs[i].title+"</h2>"
          +"<label>"+response.docs[i].author_name[0]+"</label>"
          +"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>"
          +"<button class='addToMyReadingList'>add to my reading list</button>"
      }
    addBooksToMyBooksArray()
    deleteBooksFromMyBooksArray()
  })
}

// task: reccomendation (add favorite books)