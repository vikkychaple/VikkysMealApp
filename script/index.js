// selectors
var search = document.getElementById('search-input');
var searchButton = document.getElementById('search-btn');
var mealList = document.getElementById('meal');

// event listeners
search.addEventListener('input', display);
searchButton.addEventListener('click', display);
mealList.addEventListener('click', getMealRecipe);

// called after every input or when the user click the search button
function display(){
	getMealList(search.value.trim());
}

// takes the input value then display meals to user
function getMealList(text){
	
	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		let html = "";
		if(data.meals){
			data.meals.forEach((meal) => {
				html += `
				<div class="meal-item" data-id="${meal.idMeal}">
				    <div class="meal-img">
					    <img alt="food" src="${meal.strMealThumb}">
				    </div>
				    <div class="meal-name">
					    <h3>${meal.strMeal}</h3>
					    <a href="#" class="recipe-btn">More Info</a>
					    <button id="favorite-btn" class="favorite-btn upg-btn" type="submit">
			            <i class="far fa-star"></i>
		                </button>
				    </div>
			    </div>
				`;
			})
		}else{
			html = "<h1>sorry there's are no meal</h1>";
		}

		mealList.innerHTML = html;

	})
	
}

// executes whenever user clicked on either more info or favorite button 
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
// if user clicked on favorite button , add that meal to favorite list
	if(e.target.classList.contains('favorite-btn')){
		let mealItem = e.target.parentElement.parentElement;
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			initializeLocalStorage(data.meals[0].idMeal);
		})
	}
}

// opens up a new page which displays recipe details
function mealRecipeModal(meal){
	let info = meal[0];
	window.open(`recipe.html?id=${info.idMeal}`);
}


// function to save favorite meal selected by user to the local storage of browser
function initializeLocalStorage(item){
	let fav;

	if(localStorage.getItem("fav") === null){
		fav = [];
	}else{
		fav = JSON.parse(localStorage.getItem("fav"));
	}

	fav.push(item);
	localStorage.setItem("fav", JSON.stringify(fav));
}
