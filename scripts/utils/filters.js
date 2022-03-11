
const listenOnInputs = (recipes) => {
	const { ingredients, ustensils, appliances } = generateFilters(recipes);

	/**
	 * Affichage des ustensils au clique sur le toggle
	 */
	ustensilsForm.addEventListener("click", () => {
		if (ustensilsWrapper.classList.contains("ustensils__results__undisplayed")) {
			appliancesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			appliancesWrapper.classList.replace("appliances__results__displayed", "appliances__results__undisplayed")
			appliancesWrapper.innerHTML = "";
			ingredientChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ingredientWrapper.classList.replace("ingredient__results__displayed", "ingredient__results__undisplayed")
			ingredientWrapper.innerHTML = "";
			ustensilsChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
			ustensilsWrapper.classList.replace("ustensils__results__undisplayed","ustensils__results__displayed")
			ustensils.forEach((ustensil) => {
				return ustensilsWrapper.append(createDom("li", `${ustensil}`, { class: "ustensil__item" }));
			});
		} else {
			ustensilsChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ustensilsWrapper.classList.replace("ustensils__results__displayed","ustensils__results__undisplayed")
			ustensilsWrapper.innerHTML = "";
		}
		listenOnUstensilsInput();
	});

	ustensilsInput.addEventListener("keyup", (e) => {
		ustensilsWrapper.innerHTML = "";
		if (e.target.value.length > 3) {
			const query = e.target.value.toLowerCase();
			const results = ustensils.filter((ustensil) => {
				return ustensil.toLowerCase().includes(query);
			});
			results.forEach((result) => {
				return ustensilsWrapper.append(createDom("li", `${result}`, { class: "ustensil__item" }));
			});
		}
		listenOnUstensilsInput();
	});

	const listenOnUstensilsInput = () => {
		const ustensilsItems = document.querySelectorAll(".ustensil__item");
		ustensilsItems.forEach((item) => {
			item.addEventListener("click", () => {
				selectedFilters.push(item.textContent);
				const selectedFiltersUnduplicated = [...new Set(selectedFilters)];
				createFiltersBar(selectedFiltersUnduplicated, recipes);
			});
		});
	};

	/**
	 * Affichage des ingredients au clique sur le toggle
	 */
	ingredientForm.addEventListener("click", () => {
		if (ingredientWrapper.classList.contains("ingredient__results__undisplayed")) {
			ingredientChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
			ingredientWrapper.classList.replace("ingredient__results__undisplayed","ingredient__results__displayed")
			appliancesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ustensilsChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ustensilsWrapper.classList.replace("ustensils__results__displayed", "ustensils__results__undisplayed")
			appliancesWrapper.classList.replace("appliances__results__displayed", "appliances__results__undisplayed")
			appliancesWrapper.innerHTML = "";
			ingredients.forEach((ingredient) => {
				return ingredientWrapper.append(
					createDom("li", `${ingredient}`, { class: "ingredient__item" })
				);
			});
		} else {
			ingredientChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ingredientWrapper.classList.replace("ingredient__results__displayed", "ingredient__results__undisplayed")
			ingredientWrapper.innerHTML = "";
		}
		listenOnIngredientsItems();
	});

	ingredientInput.addEventListener("keyup", (e) => {
		ingredientWrapper.innerHTML = "";
		if (e.target.value.length >= 3) {
			const query = e.target.value.toLowerCase();
			const results = ingredients.filter((ingredient) => {
				return ingredient.toLowerCase().includes(query);
			});
			results.forEach((result) => {
				return ingredientWrapper.append(createDom("li", `${result}`, { class: "ingredient__item" }));
			});
		}
		listenOnIngredientsItems();
	});

	const listenOnIngredientsItems = () => {
		const ingredientsItems = document.querySelectorAll(".ingredient__item");
		ingredientsItems.forEach((item) => {
			item.addEventListener("click", () => {
				selectedFilters.push(item.textContent);
				const selectedFiltersUnduplicated = [...new Set(selectedFilters)];
				createFiltersBar(selectedFiltersUnduplicated, recipes);
			});
		});
	};

	/**
	 * Affichage des appareils au clique sur le toggle
	 */
	 appliancesForm.addEventListener("click", () => {
		if (appliancesWrapper.classList.contains("appliances__results__undisplayed")) {
			appliancesChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
			ingredientChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ustensilsChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			appliancesWrapper.classList.replace("appliances__results__undisplayed", "appliances__results__displayed")
			ingredientWrapper.classList.replace("ingredient__results__displayed", "ingredient__results__undisplayed")
			ustensilsWrapper.classList.replace("ustensils__results__displayed", "ustensils__results__undisplayed")
			appliances.forEach((appliances) => {
				appliancesWrapper.innerHTML += `<li class="appliances__item">${appliances}</li>`;
				ustensilsWrapper.innerHTML = "";
				ingredientWrapper.innerHTML = "";
			});
		} else {
			appliancesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			appliancesWrapper.classList.replace("appliances__results__displayed", "appliances__results__undisplayed")
			appliancesWrapper.innerHTML = "";
		}
		listenOnAppliancesItems();
	});

	appliancesInput.addEventListener("keyup", (e) => {
		appliancesWrapper.innerHTML = "";
		if (e.target.value.length > 3) {
			const query = e.target.value.toLowerCase();
			const results = appliances.filter((item) => {
				return item.toLowerCase().includes(query);
			});
			results.forEach((result) => {
				return appliancesWrapper.append(createDom("li", `${result}`, { class: "appliances__item" }));
			});
		}
		listenOnAppliancesItems();
	});

	const listenOnAppliancesItems = () => {
		const appliancesItems = document.querySelectorAll(".appliances__item");
		appliancesItems.forEach((item) => {
			item.addEventListener("click", () => {
				selectedFilters.push(item.textContent);
				const selectedFiltersUnduplicated = [...new Set(selectedFilters)];
				createFiltersBar(selectedFiltersUnduplicated, recipes);
			});
		});
	};
};
