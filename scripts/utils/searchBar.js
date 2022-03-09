/**
 * Filter query and display recipes card matching with query
 * @param {Array | Object} recipes
 * @param {HTMLElement} searchBar
 */
const filteredRecipes = (recipes, searchBar) => {
	searchBar.addEventListener("keyup", (e) => {
		if (e.target.value.length >= 3) {
			recipesSection.innerHTML = "";
			const query = e.target.value.toLowerCase();
			const results = recipes.filter((recipe) => {
				return (
					recipe.name.toLowerCase().startsWith(query) || recipe.description.toLowerCase().includes(query) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(query))
				);
			});
			createRecipesCard(results);
			if (!results.length) {
				recipesSection.append(
					createDom(
						"div",
						`Aucune recette ne correspond à votre critère… vous pouvez
     chercher « tarte aux pommes », « poisson », etc.`,
						{ class: "no__results" }
					)
				);
			}
		} else if (e.target.value.length <= 3) {
			recipesSection.innerHTML = "";
			createRecipesCard(recipes);
		}
	});
};

