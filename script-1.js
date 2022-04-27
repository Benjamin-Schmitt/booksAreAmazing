






function getBooks() {
  document.getElementById('output').innerHTML="";
  fetch("http://openlibrary.org/search.json?q="+document.getElementById("input").value)
  .then(a => a.json())
  .then(response => {
      for(var i=1; i<3; i++) {
          document.getElementById("output").innerHTML
          +="<h2>"+response.docs[i].title+"</h2>"
          +"<label>"+response.docs[i].author_name[0]+"</label>"
          +"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>"
          +"<button class='adder' onclick='getQuery()'>add to my reading list</button>" 
      }
      getCover(); 
      getQuery();
  })
}

//intended fix: take out dom element selection out of getQuery() so it does not get targeted a second time, whenever the button is clicked 
function getQuery() {
  let cover = document.querySelectorAll(".adder");
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
      page.type = 'text'
      document.body.appendChild(page);
      
      var delButton = document.createElement('button');
      delButton.innerText = 'delete from reading list';
      delButton.style.display = 'block';
      delButton.style.marginBottom = '25px'
      document.body.appendChild(delButton);
    }
  }) 
}

function getCover() {
  let cover = document.querySelectorAll("img"); 
  let author = document.querySelectorAll("label"); 
  cover.forEach(function(cv, ind) {
    cv.onclick = function saveCover() {
        var img = document.createElement('img'); 
        img.src = cv.src;   
        document.body.appendChild(img);
        console.dir(cv)
        var auth = document.createElement('li');
        auth.innerText = author[ind+1].innerText;
        auth.style.marginBottom = "50px";
        document.body.appendChild(auth);
        
        var delButton = document.createElement('button');
        delButton.innerText = 'delete from reading list';
        document.body.appendChild(delButton)
        
      }
    }
  )
}




function deleteElement() {

}