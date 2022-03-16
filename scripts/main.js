/////////////////////////////////////////////////////////////////////////////////////
///////////// Ce script permet de récupérer les données du fichier recipes.json via la constante non modifiable "getData"
////////////////////////
///////////// Ensuite, dans la constante "generateFilters", utiliser un forEach sur chaque recette
///////////// permettant, dans 3 tableaux (ingrédients, appliances, ustensils), de dispatcher les données par ordre ascendant (= alphabétique)
////////////////////////
///////////// Ensuite, dans la constante "createRecipesCard", pour chaque recette,
///////////// l'ajouter dans la constante "recipesSection" en récupérant ses données grâce au constructor "recipeCard" appliqué à la recette
///////////// pour permettre ensuite de créer le dom dans le html
////////////////////////
///////////// L'init asynchrone permet d'attendre d'avoir les donénes avant d'appliquer les fonctions nécessaires à la construction de la page
////////////////////////
///////////// listenOnInput permet d'ajouter la fonction qui s'active et déclanche une autre fonction selon l'event qui a eu lieu

/*
 Create globals objects for all categories
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

/*
Fetch data on local file
*/
const getData = async () =>
	await fetch("./scripts/data/recipes.json", {
		mode: "no-cors",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log("An error occurs when fetching recipes", err));

/*
Create recipes card with a constructor
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
