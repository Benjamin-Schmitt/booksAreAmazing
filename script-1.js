var myBooks = [
  {
    id: 1,
    title: "Harry Potter and the Deathly Hallows",
    author: "J. K. Rowling",
    cover: "http://covers.openlibrary.org/b/isbn/3551354073-M.jpg" 
  },
  {
    id: 2,
    title: "Food and feeding",
    author: "Sir Henry Thompson",
    cover: "http://covers.openlibrary.org/b/isbn/0543994767-M.jpg" 
  },
];


function displayBooksFromMyBooksArray() { 
  for(var i = 0; i < myBooks.length; i++) {

    var titel = document.createElement('li');    
    titel.style.listStyle = 'none';    
    titel.innerText = myBooks[i].title;
    document.body.appendChild(titel);

    var img = document.createElement('img');
    img.src = myBooks[i].cover;
    document.body.appendChild(img);
    

    var auth = document.createElement('li');
    auth.style.listStyle = 'none';
    auth.innerText = "by " + myBooks[i].author;     
    document.body.appendChild(auth); 

    var delButton = document.createElement('button');
    delButton.innerText = 'delete';
    delButton.style.display = 'block';
    delButton.style.marginBottom = '25px'
    delButton.classList = 'delete';
    document.body.appendChild(delButton);
  }
}
displayBooksFromMyBooksArray()





function addBooksToMyBooksArray() {
  let cover = document.querySelectorAll(".addToMyReadingList");
  cover.forEach(function(cv, ind) {
    cv.onclick = function saveCover() {    
      var img = document.getElementsByTagName("img")[ind]
      let auth = document.getElementsByTagName("label")[ind+1].innerText
      let title = document.getElementsByTagName("h2")[ind].innerText
      myBooks.push(
        {
          id: myBooks.length+1,
          title: title,
          author: auth,
          cover: img.src   
        },
      )
    displayBooksFromMyBooksArray()
    }})}



/* 
 
    var img = document.createElement('img'); 
    img.src = document.querySelectorAll("img").src;   
    myBooks.push(img.src);
    displayBooksFromMyBooksArray()
    console.log(myBooks);  

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
    document.body.appendChild(delButton)
  } */






/* function addBooksToMyBooksArray() {
  let cover = document.querySelectorAll("button.addToMyReadingList");
  cover.forEach(function(cv, ind) {
    cv.onclick = function saveCover() {      
      var img = document.createElement('img'); 
      img.src = document.querySelectorAll("img")[ind].src;   
      myBooks.push(img.src);
      console.log(myBooks);      

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
      document.body.appendChild(delButton)
    }
  })
} */

/* function displayBooksFromMyBooksArray() { 
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
} */




//just a SEARCH DISPLAY
function queryOpenLibrary() {
  document.getElementById('output').innerHTML="";
  fetch("http://openlibrary.org/search.json?q="+document.getElementById("input").value)
  .then(response => response.json())
  .then(response => {
      for(var i=0; i<3; i++) {
          document.getElementById("output").innerHTML
          +="<h2>"+response.docs[i].title+"</h2>"
          +"<label>"+response.docs[i].author_name[0]+"</label>"
          +"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>"
          +"<button class='addToMyReadingList'>add to my reading list</button>"
      }
  addBooksToMyBooksArray()
  })
}





function deleteElement() {
  // target all individual del button using their class 'delete'
  // add function, that targets the content above it
  // idea: first, write a function, that saves content to an array. That way, you only have to target them within the array
}

// structure
// ONE function that adds books, and only books from array get added

// tasks:
// 1. add disabled to buttons
// 2. prevent code from adding book thats already on the list
// 3. save data in array
// 4. reccomendation (add favorite books)

