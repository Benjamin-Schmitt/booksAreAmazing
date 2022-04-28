var myBooks = [
  {
    id: 1,
    title: "Harry Potter",
    author: "J. K. Rowling",
    cover: "" 
  }
]


function displayBooksFromMyBooks() { 
  var img = document.createElement('img'); 
  img.src = document.querySelectorAll("img")[ind].src;   
  document.body.appendChild(img);      

  var auth = document.createElement('li');
  auth.style.listStyle = 'none';
  auth.innerText = document.querySelectorAll("label")[ind+1].innerText;      
  document.body.appendChild(auth);

  var page = document.createElement('input');
  page.type = 'text';
  document.body.appendChild(page);
  
  var delButton = document.createElement('button');
  delButton.innerText = 'delete';
  delButton.style.display = 'block';
  delButton.style.marginBottom = '25px'
  delButton.classList = 'delete';
  document.body.appendChild(delButton);


  //add from array
  let cover = document.querySelectorAll("button.addToMyReadingList");
  cover.forEach(function(cv, ind) {
    cv.onclick = function saveCover() {
      //add from (last in) array
    }
  })
}



/* function addBooks() {
  let cover = document.querySelectorAll("button.addToMyReadingList");
  cover.forEach(function(cv, ind) {
    cv.onclick = function saveCover() {      
      var img = document.createElement('img'); 
      img.src = document.querySelectorAll("img")[ind].src;   
      document.body.appendChild(img);      

      var auth = document.createElement('li');
      auth.style.listStyle = 'none';
      auth.innerText = document.querySelectorAll("label")[ind+1].innerText;      
      document.body.appendChild(auth);

      var page = document.createElement('input');
      page.type = 'text';
      document.body.appendChild(page);
      
      var delButton = document.createElement('button');
      delButton.innerText = 'delete';
      delButton.style.display = 'block';
      delButton.style.marginBottom = '25px'
      delButton.classList = 'delete';
      document.body.appendChild(delButton);
    }
  })
} */

function deleteElement() {
  // target all individual del button using their class 'delete'
  // add function, that targets the content above it
  // idea: first, write a function, that saves content to an array. That way, you only have to target them within the array
}

function queryOpenLibrary() {
  document.getElementById('output').innerHTML="";
  fetch("http://openlibrary.org/search.json?q="+document.getElementById("input").value)
  .then(a => a.json())
  .then(response => {
      for(var i=1; i<3; i++) {
          document.getElementById("output").innerHTML
          +="<h2>"+response.docs[i].title+"</h2>"
          +"<label>"+response.docs[i].author_name[0]+"</label>"
          +"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>"
          +"<button class='addToMyReadingList' onclick='addBooks()'>add to my reading list</button>"
      }
      addBooks();
  })
}



// structure
// ONE function that adds books, and only books from array get added

// tasks:
// 1. add disabled to buttons
// 2. prevent code from adding book thats already on the list
// 3. save data in array
// 4. reccomendation (add favorite books)

