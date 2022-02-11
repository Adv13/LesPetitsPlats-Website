'use strict';

import Appliances from '../filters/Appliances.js';
import DataLogic from '../utilities/DataLogic.js';
import DomService from './DomService.js';
import Ingredients from '../filters/Ingredients.js';
import Messages from './Messages.js';
import Ustensils from '../filters/Ustensils.js';

/* init allows the creation of the default webpage with all recipes buy using the table "recipesApiResult". 
initSearch allows the creation of the webpage with the results of the search by using the table "recipesMatched".

Also show the result by using the class Domservice in order to create the webpage, DataLogic in order to formats all recipes, Ingredients/Appliances/Ustensils classes in order to manage their appereance and functionalities (display of items, searchinput bar, and filtertag in each of them) and Messages class in order to hide it.

*/

export default class Builder {
    static init() {
        // Build Section with all Recipes before Search
        DomService.buildResult(recipesApiResult);
        Messages.hideMessage();
        // Ingredients logic
        Ingredients.init(DataLogic.getAllIngredients(recipesApiResult), recipesApiResult);
        // Appliances logic
        Appliances.init(DataLogic.getAllAppliances(recipesApiResult), recipesApiResult);
        // Ustensils logic
        Ustensils.init(DataLogic.getAllUstensils(recipesApiResult), recipesApiResult);
    }

    static initSearch(result) {
        // Build Section after Search
        DomService.buildResult(result.recipesMatched);
        Messages.buildResultMessageWithResult(result.recipesMatched);
        // Ingredients logic
        Ingredients.init(result.ingredients, result.recipesMatched);
        // Appliances logic
        Appliances.init(result.appliances, result.recipesMatched);
        // Ustensils logic
        Ustensils.init(result.ustensils, result.recipesMatched);
    }
}
