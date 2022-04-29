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

        var delButton = document.createElement('button');
        delButton.innerText = 'delete';
        delButton.style.display = 'block';
        delButton.style.marginBottom = '25px'
        delButton.classList = 'delete';    
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

    books.onclick = function() {
      myBooks.splice(index, 1);
      console.log(myBooks);      
      img.remove();
      auth.remove();
      delButtonT.remove();
      title.remove();
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
      
      if(myBooks[0,myBooks.length-1].title !== title) {
        myBooks.push (
          {
            id: myBooks.length+1,
            title: title,
            author: auth,
            cover: img.src,
            on: false   
          },
        )
      } else {
        alert("book already on your list");
      }
    displayBooksFromMyBooksArray()
    deleteBooksFromMyBooksArray()
    }})}


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



// tasks:
// 1. add disabled to buttons
// 2. prevent code from adding book thats already on the list
// 3. save data in array
// 4. reccomendation (add favorite books)