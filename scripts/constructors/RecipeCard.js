class RecipeCard {
	constructor(data) {
		this._id = data.id;
		this._name = data.name;
		this._image = data.image;
		this._description = data.description;
		this._time = data.time;
		this._servings = data.servings;
		this._ustensils = data.ustensils;
		this._ingredients = data.ingredients;
		this._appliance = data.appliance;
	}

	/**
	 * Create recipe card with create dom function
	 * @returns HTMLElement - Recipe card
	 */
	get recipeCard() {
		const card = createDom(
			"article",
			{ class: "recipe__card" },
			createDom("img", {src:('./assets/recettes/') + `${this._image}`}, { class: "recipe__card__image", alt:`${this._name}` }),
			createDom(
				"section",
				{ class: "recipe__card__section" },
				createDom(
					"header",
					{ class: "recipe__card__header" },
					createDom("h2", `${this._name}`, { class: "recipe__card__header__title" }),
					createDom(
						"h2",
						`${this._time}min `, {class: "recipe__card__header__time"},
						createDom("i", { class: "fal fa-clock recipe__card__header__icon" })
					)
				),
				createDom(
					"aside",
					{ class: "recipe__card__aside" },
					createDom(
						"ul",
						{ class: "recipe__card__list" },
						// ... pour transformer les éléments du tableau en paramètres pour createDom
						//     .map() pour renvoyer un tableau car .forEach() renvoie undefined
						...this._ingredients.map((ingredient) => {
							// return pour renvoyer une valeur sinon .map() renvoie un tableau de undefined
							return createDom(
								"li",
								createDom("strong", `${ingredient.ingredient} `),
								ingredient.quantity ? `: ${ingredient.quantity} ` : "",
								ingredient.unit ? `${ingredient.unit} ` : "",
								{
									class: "recipe__card__list__item",
								}
							);
						})
					),
					createDom("p", `${this._description}`, { class: "recipe__card__description" })
				)
			)
		);
		return card;
	}
}
