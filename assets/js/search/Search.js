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



/**
 * Take an user request, return a list of corresponding recipes
 * @param {string} request - text typed by the user in the input field
 * @param {string} appliance - value of the appliance <select>
 * @param {string} ustensil - value of the ustensil <select>
 * @returns {array} - array of objects (corresponding recipes)
 */
 /*static searchMainInput(request, appliance, ustensil, ingredients) {
    console.time("search");
    let recipes = recipesApiResult.recipes;
    recipes = searchByAppTags(recipes, appliance.toLowerCase());
    recipes = searchByUstTags(recipes, ustensil.toLowerCase());
    recipes = searchByIngTags(recipes, ingredients);
    recipes = searchInputFilters(recipes, request.toLowerCase());
    //save the result
    lastSearch = [appliance, ustensil, ingredients, recipes];
    console.timeEnd("search");
    return recipes;
}*/

// store last results
let lastSearch = [];
export function getLastSearch() {
    return lastSearch;
}
export default class Search {
    
    static mainSearch(request, appliance, ustensil, ingredients) {
        console.time("search");
        let recipes = recipesApiResult.recipes;
        recipes = searchByAppTags(recipes, appliance.toLowerCase());
        recipes = searchByUstTags(recipes, ustensil.toLowerCase());
        recipes = searchByIngTags(recipes, ingredients);
        recipes = searchInputFilters(recipes, request.toLowerCase());
        //save the result
        lastSearch = [appliance, ustensil, ingredients, recipes];
        console.timeEnd("search");
        return recipes;
    }
}

    /**
    * Check if a recipe match with the searchedInputFilter string
    * @param {array} recipes - array of objects
    * @param {string} request
    * @returns {array} - array of objects (corresponding recipes)
    */
     function searchInputFilters(recipes, request) {
        let recipesMatched = [];
        for (let recipe of recipes) {
            if (recipe.name.toLowerCase().includes(request) 
                || recipe.description.toLowerCase().includes(request)
                || recipe.ingredients
                    .filter(ingredient => ingredient.ingredient
                        .toLowerCase().includes(request)).length > 0) {
                recipesMatched.push(recipe)
            }
        }
        return recipesMatched;
    }

    /**
     * Check if a recipe match with the all the tagged ingredients
     * @param {array} recipes - array of objects
     * @param {array} ingredients
     * @returns {array} - array of objects (corresponding recipes)
     */
    function searchByIngTags(recipes, ingredients) {
        let recipesMatched = [];

        for (let recipe of recipes) {
            let ingredientsMatch = []
            ingredients.forEach(ingredient => {
                ingredientsMatch.push(
                    recipe.ingredients.filter(recIngredient =>
                        recIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase())    
                    ).length > 0 
            )})
            if (ingredientsMatch.every(match => match == true)) {
                recipesMatched.push(recipe)
            }
        }

        return recipesMatched;
    }

    /**
     * Check if a recipe match with the requested appliance
     * @param {array} recipes - array of objects
     * @param {string} appliance
     * @returns {array} - array of objects (corresponding recipes)
     */
    function searchByAppTags(recipes, appliance) {
        let recipesMatched = [];

        for (let recipe of recipes) {
            if (recipe.appliance.toLowerCase().includes(appliance)) {
                recipesMatched.push(recipe)
            }
        }

        return recipesMatched;
    }

    /**
     * Check if a recipe match with the requested ustensil,
     * @param {array} recipes - array of objects
     * @param {string} ustensil
     * @returns {array} - array of objects (corresponding recipes)
     */
    function searchByUstTags(recipes, ustensil) {
        let recipesMatched = [];

        for (let recipe of recipes) {
            if (ustensil == "" || recipe.ustensils.filter(usten => usten.includes(ustensil)).length > 0) {
                recipesMatched.push(recipe)
            }
        }

        return recipesMatched;
    }
