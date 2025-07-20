// html elements
var nameInput=document.getElementById("bookmarkName");
var urlInput=document.getElementById("bookmarkURL");
var modal=document.querySelector(".my-modal");
var submitBtn=document.querySelector(".btn-submit")
var closeBtn=document.querySelector(".closeBtn");
var deletBtn=document.querySelector(".btn-delete");
// variables
var index;
var bookmarks=[];
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;


var bookmarks=JSON.parse(localStorage.getItem("bookmarks")) || [];
displayBookmarks();
// if(localStorage.getItem('bookmarks')){
//     bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
// }
// else{
//     bookmarks=[];
// }
// functions

function createBookmark(){
    if(validate(nameRegex,nameInput)&&validate(urlRegex,urlInput))
  {

    var bookmark={
        name:capitalize(nameInput.value.trim()),
        url:urlInput.value,
    }
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    displayBookmarks();
    clear();
    console.log( bookmarks); 
  }
  else{
    // alert("8lt");
    showModal();
  }
    
}
function validate(regex,bookmarkInput){
    if(regex.test(bookmarkInput.value)){
      bookmarkInput.classList.add("is-valid");
      bookmarkInput.classList.remove("is-invalid");
    //   bookmarkInput.nextElementSibling.nextElementSibling.classList.add("d-none");
      return true;
      // console.log("sa7");
    }
    else{
      // console.log("8lt");
      bookmarkInput.classList.remove("is-valid");
      bookmarkInput.classList.add("is-invalid");
    //   bookmarkInput.nextElementSibling.nextElementSibling.classList.remove("d-none");
      return false;
  
    }
    
  }
function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
  }

  function visit(index) {
    var url = bookmarks[index].url;
  
    // If it doesn't start with http:// or https://, add https://
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
  
    window.open(url, '_blank');
  }
  
  
function displayBookmarks(){
    var bookmark='';
    for(var i=0;i<bookmarks.length;i++){
        bookmark+=`
            <tr>
              <td >${i+1}</td>
              <td>${bookmarks[i].name}</td>
              <td><button class="btn btn-visit  " onclick="visit(${i})"><a href="${bookmarks[i].url}"></a><i class="fa-solid fa-eye me-1"></i> Visit</button></td>
              <td><button class="btn btn-delete " onclick="deleteBookmark(${i})" >
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button></td>
            </tr>`
    }
    document.getElementById('tableContent').innerHTML=bookmark;
    
}
function capitalize(str) {
    let arr = str.split("");
    arr[0] = arr[0].toUpperCase();
    return arr.join("");
  }
function clear()
{
    nameInput.value="";
    urlInput.value="";
}
function showModal(){
    modal.classList.remove("d-none");

}
function closeModal(){
    modal.classList.add("d-none");
    
}




// events


closeBtn.addEventListener("click",closeModal);
submitBtn.addEventListener("click", createBookmark);

// document.getElementById('tableContent').addEventListener("click", function(e) {
//     if (e.target.closest(".btn-delete")) {
//       var index = Array.from(document.querySelectorAll(".btn-delete")).indexOf(e.target.closest(".btn-delete"));
//       deleteBookmark(index);
//     }
//   });

document.addEventListener("keydown",function(e){
    // console.log(e.code);
    if (e.code=="Escape"){
        
       
            closeModal();
           
    }
    
})

modal.addEventListener("click",function(e){
    if(e.target==modal){
        closeModal();
    }
});



// inputs style cases
var inputs = document.querySelectorAll('.form-control');
for(let i=0;i<inputs.length;i++){
    inputs[i].addEventListener('input', () => {
        if (inputs[i].value.trim() === "") {
          inputs[i].classList.add('empty');
        } else {
          inputs[i].classList.remove('empty');
        }
      });
    
      inputs[i].addEventListener('focus', () => {
        if (inputs[i].value.trim() === "") {
          inputs[i].classList.add('empty');
        } else {
          inputs[i].classList.remove('empty');
        }
      });
}