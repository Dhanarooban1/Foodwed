// Page1
 const scrollToTop = () => {
  window.scrollBy({top: window.innerHeight, behavior: 'smooth'});
 }
  const mBtn =() =>{
  let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  window.scrollBy({top: vh * 2, behavior: 'smooth'});
 }

//page2
const URL = `https://www.themealdb.com/api/json/v1/1/random.php`   //API





// code for popup to learn how to do it
const displayGuide =() =>{
  let popContent = document.getElementById("pop_content");
  popContent.style.display = "block";
 }
 const closeGuideW =()=>{
  let popContent = document.getElementById("pop_content");
  popContent.style.display = "None";
 }

const Close =()=>{
  let lp = document.getElementById("mobilein");
  lp.style.display = "None"
 }


 let guide = () =>{
   let youtubeLink = document.getElementById("youtubeLink");
   let alink = document.getElementById("alink");
   document.getElementById('youtubeLink').addEventListener('click', function(event){
     event.preventDefault();
    });
    
axios.get(URL)
.then(Response =>{
let meal = Response.data.meals[0];
let youtube = meal.strYoutube;  
let article = meal.strSource;
  youtubeLink.href = youtube;
  alink.href = article
 }).catch(error => console.error(error.message));
  
}
guide()



function RandomFood(){
let randomImage = document.getElementById("randomImage");
let randomName=document.getElementById('randomName')
let instructions = document.getElementById('instruction');
let popup = document.getElementById("popup");
let popupMobile = document.getElementById("popupMobile");
popup.innerHTML=""
popupMobile.innerHtml = ""

axios.get(URL)
.then(response => {
  let meal = response.data.meals[0];
  let imageUrl = meal.strMealThumb; 
  let name = meal.strMeal;
  document.getElementById('name').innerHTML = name
  randomName.innerHTML=meal.strMeal
  randomImage.src =imageUrl;
  imgBox.innerHTML = `<img src="${imageUrl}" alt="Meal Image">`;

let data = response.data.meals[0];
let div = document.createElement("div"); div.className='ingredients-div';
// POP
    for(let i=1;i<=20;i++){
      let p=document.createElement("p");
      let item=`strIngredient${i}`
      if(data[item]){
        p.innerText= "●" + data[item]
        div.append(p)
      }
    }
let newIngredient = document.createElement('div')
    newIngredient.className='ingredients-div';
    newIngredient.innerHTML = div.innerHTML;
    popup.append(newIngredient);
    popupMobile.append(div); 
  }).catch(error => console.error(error.message));
}
RandomFood()




//page3
document.getElementById('myInputField').addEventListener('keypress',function(event)  {
   if (event.key === 'Enter') {
    let inputValue = this.value;
    const search = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(inputValue)}`;
    axios.get(search)
    .then(response => {
      displayNew(response.data.meals);
    })
    .catch(error => console.error(error.message));
  }
});                                                                                  




const displayNew = (meals) => {
  var elements = meals.map((meal, index) => {
   return ( `<div id="data${index}">
     <img id="img${index}" style="height:300px" 
     src=${meal.strMealThumb} alt="Meal image" />
     <p> ${meal.strMeal}</p>
     </div>`);
  });
 
  document.getElementById("container").innerHTML = elements.join(" ");
  document.getElementById("container").scrollIntoView({ behavior: 'smooth' });
  for (let i = 0; i < meals.length; i++) {
   document.getElementById(`img${i}`).addEventListener('click', function() {
     window.open(meals[i].strYoutube, '_blank');
   });
  }
 };




let open = document.getElementById("randomImage");
open.addEventListener('click', function() {
    mobileIn.style.display = 'block';
});







var non = window.onload = function() {
  document.getElementById('mobilein').style.display = 'none';
};
document.getElementById('randomImage').addEventListener('click', function(event) {
  document.getElementById('mobilein').style.display = 'flex';
  event.stopPropagation(); // Prevent the click from being detected by the document
});

// Event listener for the document to hide #mobilein when clicking outside
document.addEventListener('click', function(event) {
  var isClickInsideMobileIn = document.getElementById('mobilein').contains(event.target);
  if (!isClickInsideMobileIn) {
    non();
  }
});

document.getElementById('referButton').addEventListener('click', function() {
  RandomFood(); // Call the function that updates the random item
});




