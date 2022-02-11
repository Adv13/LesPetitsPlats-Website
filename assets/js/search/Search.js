'use strict';

import DataLogic from '../utilities/DataLogic.js';
import Utils from '../utilities/Utils.js';
/*
SEARCH BAR : Manage the main searchbar buy updating the text in the input (normalizetext), create a table 'recipesMatched' and return it with the datalogic structure.

SEARCH INPUT FILTER : Manage the search input filter bar buy updating the text in the input (normalizetext),create a table 'resultInput' and return it.

SEARCH FILTER TAG INGREDIENTS : Manage the search filter tag 'ing' bar buy updating the text in the input (normalizetext),create a table 'resultIng' and return it.

SEARCH FILTER TAG APPLIANCES : Manage the search filter tag 'app' bar buy updating the text in the input (normalizetext),create a table 'resultApp' and return it.

SEARCH FILTER TAG USTENSILES : Manage the search filter tag bar 'ust' buy updating the text in the input (normalizetext),create a table 'resultUst' and return it.

*/
export default class Search {
    static searchMainInput(value) {
        let recipesMatched = [];

        recipesApiResult.forEach(recipe => {
            if (Utils.normalizeText(recipe.name).includes(Utils.normalizeText(value)) || Utils.normalizeText(recipe.description).includes(Utils.normalizeText(value)) || recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(value))) {
                recipesMatched.push(recipe);
            };
        });
        return {
            'recipesMatched': recipesMatched,
            'ingredients': DataLogic.getAllIngredients(recipesMatched),
            'appliances': DataLogic.getAllAppliances(recipesMatched),
            'ustensils': DataLogic.getAllUstensils(recipesMatched),
        };
    }

    // search by input for ingredients/appliances/ustensils
    static searchInputFilters(collection, value) {
        let resultInput = [];
        collection.forEach(elt => {
            if (Utils.normalizeText(elt).includes(Utils.normalizeText(value))) {
                resultInput.push(elt);
            };
        });

        return resultInput;
    }

    // search by tags for ingredients
    static searchByIngTags(recipes, tagIng) {
        let resultIng = [];

        recipes.forEach(recipe => {
            if (recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(tagIng))) {
                resultIng.push(recipe);
            }
        });

        return resultIng;
    }

    // search by tags for appliances
    static searchByAppTags(recipes, tagApp) {
        let resultApp = [];

        recipes.forEach(recipe => {
            if (Utils.normalizeText(recipe.appliance).includes(tagApp)) {
                resultApp.push(recipe);
            }
        });

        return resultApp;
    }

    // search by tags for ustensils
    static searchByUstTags(recipes, tagUst) {
        let resultUst = [];

        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ust => {
                if (Utils.normalizeText(ust).includes(tagUst)) {
                    resultUst.push(recipe);
                }
            });
        });

        return resultUst;
    }
}
