///////////////////////////////////////////////////////////////////////////////////////////
////////////////// Constante "createFiltersBar" qui permet d'ajouter la partie html concernant les filtres sélectionnés
///////////////////////////////////////
////////////////// Constante "researchOnFilters" qui permet d'utiliser filter() pour comparer la query et les données 
////////////////// pour retourner celles qui matchent.
////////////////// si la constante result non modifiable est pas vide alors appeler recipesSection, createRecipesCard, listenOnFilterBar pour afficher le résultat
////////////////// si la constante result est vide alors afficher "Aucune recette ne correspond à votre critère… vous pouvez
////////////////// chercher « tarte aux pommes », « poisson », etc.
///////////////////////////////////////
////////////////// listenOnFilterBar permet, pour chaque filtre/tag, d'appeler la fonction removeFilter qui permet de le retirer lorsqu'il y a un click dessus
///////////////////////////////////////
////////////////// removeFilter permet de supprimé le filtre sélectionné et, si l'array est pas vide de 
////////////////// lancer recipesSection et createRecipesCard
////////////////// sinon lancer researchOnFilters


////////////////// REMINDER : slice() extracts the text from one string and returns a new string.
////////////////// REMINDER : The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.


const createFiltersBar = (selectedFiltersUnduplicated, recipes) => {
	filtersBar.innerHTML = "";
	selectedFiltersUnduplicated.forEach((filter) => {
		return filtersBar.append(
			createDom(
				"div",
				`${filter}`,
				{ class: "filter__query" },
				createDom("i", { class: "fal fa-times-circle filter__query__icon" })
			)
		);
	});
	researchOnFilters(recipes, selectedFiltersUnduplicated);
};

const researchOnFilters = (recipes, selectedFiltersUnduplicated) => {
	const filterQuery = document.querySelectorAll(".filter__query");
	const filters = Array.from(filterQuery);
	const result = recipes.filter((recipe) => {
		return filters.every((item) => {
			const formatedItem = item.textContent.toLowerCase();
			return (
				recipe.ingredients.some((i) => {
					return i.ingredient.toLowerCase().includes(formatedItem);
				}) ||
				recipe.appliance.toLowerCase().includes(formatedItem) ||
				recipe.ustensils.some((ustensil) => {
					return ustensil.toLowerCase() === formatedItem;
				})
			);
		});
	});
	if (result.length) {
		recipesSection.innerHTML = "";
		createRecipesCard(result);
		listenOnFilterBar(filters, recipes);
	} else if (!result.length) {
		listenOnFilterBar(filters, recipes);
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
};

const listenOnFilterBar = (filters, recipes) => {
	filters.forEach((filter) => {
		filter.addEventListener("click", () => {
			removeFilter(filter, filters, recipes);
		});
	});
};

const removeFilter = (selectedFilter, arrayOfFilters, recipes) => {
	const index = arrayOfFilters.indexOf(selectedFilter);
	arrayOfFilters.slice(index, 0);
	selectedFilter.remove();
	selectedFilters.splice(0, selectedFilters.length)
	if (!arrayOfFilters.length) {
		recipesSection.innerHTML = "";
		createRecipesCard(recipes);
	} else {
		researchOnFilters(recipes, arrayOfFilters);
	}
};
