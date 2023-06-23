// selectors
var mealList = document.getElementById('meal');
var title = document.getElementById('title');
let fav = JSON.parse(localStorage.getItem('fav'));
var html = "";

// event listeners
document.addEventListener('DOMContentLoaded', showFav);
mealList.addEventListener('click', getMealRecipe);

// will call getData function for every fav item 
function showFav(){
	if(fav.length === 0){
		mealList.innerHTML = '<h1>No favorite meal</h1>';
	}else{
		title.innerHTML = 'Favorites</h1>'
        fav.map((mealId) => {
            getData(mealId);
        })
	}
}

// will first fetch the meal from meal api and then call display function , passing meal object as argument 
function getData(mealId){
	fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+mealId)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			display(data.meals[0]);
		})
}

// displays all the favorite meals to the user 
function display(meal){

		html += `
				<div class="meal-item" data-id="${meal.idMeal}">
				    <div class="meal-img">
					    <img alt="food" src="${meal.strMealThumb}">
				    </div>
				    <div class="meal-name">
					    <h3>${meal.strMeal}</h3>
					    <a href="#" class="recipe-btn">More Info</a>
					    <button id="favorite-btn" class="favorite-btn btn" type="submit">
			            <i class="fas fa-minus"></i>
		                </button>
				    </div>
			    </div>
				`;

		mealList.innerHTML = html;

}

// executes whenever user clicked on either more info or un-favorite button  
function getMealRecipe(e){
	e.preventDefault();
// if user clicked on more info , displays a new page which shows information about that particular meal 
	if(e.target.classList.contains('recipe-btn')){
		let mealItem = e.target.parentElement.parentElement;
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			mealRecipeModal(data.meals);
		})
	}
// if user clicked on un-favorite button , it will remove that meal from favorites display page as well as from local storage
	if(e.target.classList.contains('favorite-btn')){
		let mealItem = e.target.parentElement.parentElement;
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			mealItem.remove();
			removeFavItem(data.meals[0].idMeal);
		})
	}
}

// opens up a new page which displays recipe details
function mealRecipeModal(meal){
	let info = meal[0];
	window.open(`recipe.html?id=${info.idMeal}`);
}

// this function will remove the meal from local storage 
function removeFavItem(item){
	let fav;

	if(localStorage.getItem("fav") === null){
		fav = [];
	}else{
		fav = JSON.parse(localStorage.getItem("fav"));
	}

	const favIndex = fav.indexOf(item);
	fav.splice(favIndex, 1);

	localStorage.setItem("fav", JSON.stringify(fav));
}
