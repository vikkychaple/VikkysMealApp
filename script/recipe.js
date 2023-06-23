// selectors
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');

// event listeners
var mealInfo = document.querySelector('.meal-info');

// fetch the meal data from meal api
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			getMealRecipe(data.meals);
		})


// displays the meal details to the user 
function getMealRecipe(meal){
	let info = meal[0];
	let html = `
	<div class="main">
		<div class="container">
			<div class="central-div">
				<div class="product-div-left">
					<div class="img-box">
						<img src="${info.strMealThumb}" alt="">
	                </div>
	            </div>
	            <div class="product-div-right">
	            	<span class="product-name">Meal Name : ${info.strMeal}</span>
	            	<span class="product-category">Category : ${info.strCategory}</span>
	            	<span class="product-category set">Instructions :</span>
	            	<p class="product-desc">${info.strInstructions}</p>
	            </div>
	        </div>
	    </div>
	</div>
	`;

		mealInfo.innerHTML = html;
		

