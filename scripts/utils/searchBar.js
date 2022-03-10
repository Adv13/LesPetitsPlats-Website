const filteredRecipes = (recipes, searchBar) => {
	searchBar.addEventListener("keyup", (e) => {
		if (e.target.value.length >= 3) {
			const results = [];
			recipesSection.innerHTML = "";
			const query = e.target.value.toLowerCase();
			for (let i = 0; i < recipes.length; i++) {
				const { name, ingredients, description } = recipes[i];
				const includesInName = name.toLowerCase().includes(query);
				const includesInDescription = description.toLowerCase().includes(query);
				let includesInIngredients = false;
				for (let y = 0; y < ingredients.length; y++) {
					if (ingredients[y].ingredient.toLowerCase().includes(query)) {
						includesInIngredients = true;
					}
				}
				if (includesInName || includesInDescription || includesInIngredients) {
					results.push(recipes[i]);
				}
			}

			if (results.length) {
				recipesSection.innerHTML = "";
				createRecipesCard(results);
			}

			if (!results.length) {
				recipesSection.innerHTML = "";
				recipesSection.append(
					createDom(
						"div",
						`Aucune recette ne correspond à votre critère… vous pouvez
						chercher « tarte aux pommes », « poisson », etc.`,
						{ class: "no__results" }
					)
				);
			}
		}
		if (e.target.value.length <= 3) {
			recipesSection.innerHTML = "";
			createRecipesCard(recipes);
		}
	});
};
