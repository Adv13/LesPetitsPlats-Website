/**
	* Create globals objects for all categories
	* @param {Array | Objects} recipes 
	* @returns {Array}
	*/
const generateFilters = (recipes) => {
	let ingredients = [];
	let appliances = [];
	let ustensils = [];
	recipes.forEach((recipe) => {
		ingredients = [
			...new Set([...ingredients, ...recipe.ingredients.map((i) => i.ingredient)])].sort();
		ustensils = [...new Set([...ustensils, ...recipe.ustensils.map((u) => u)])].sort();
		appliances = [...new Set([...appliances, ...[recipe.appliance]])].sort();
	});
	return { ingredients, ustensils, appliances };
};

/**
	* Fetch data on local file
	* @returns {Array | Objects}
	*/
const getData = async () =>
	await fetch("../scripts/data/recipes.json", {
		mode: "no-cors",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log("An error occurs when fetching recipes", err));

/**
	* Create recipes card with a constructor
	* @param {Array | Object} recipes 
	*/
const createRecipesCard = (recipes) => {
	recipes.forEach((recipe) => {
		recipesSection.append(new RecipeCard(recipe).recipeCard);
	});
};
/*  */
const init = async () => {
	const { recipes } = await getData();
	generateFilters(recipes);
	listenOnInputs(recipes);
	createRecipesCard(recipes)
	filteredRecipes(recipes, globalSearchBar);
};

init();
