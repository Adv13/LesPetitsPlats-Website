'use strict';

import Builder from './page/Builder.js';
import Messages from './page/Messages.js';
import Search from './search/Search.js';
import Utils from './utilities/Utils.js';

/* initialize the webpage by default with Builder class and, thanks to the addEventlistener "keyup", check if the caracters are more than 2.

If yes, we create a table called "recipesMatched" where we add each recipe checked that match the input by the name, description or ingredients and we return that table as a result on the webpage.

If no result is found, display a message saying it. 

Clean the webpage and initialize Builder default webpage again after (when there is no more than 2 caracters in the input). */

// Build by default without search
Builder.init();

// Build with search Input
document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
    let valueSearch = key.target.value;
    if (Utils.isValid(valueSearch)) {
        let result = Search.searchMainInput(valueSearch);
        if (result.recipesMatched.length === 0) {
            return Messages.buildResultMessageWithNoResult();
        }
        Utils.clearRecipesSection();
        Builder.initSearch(result);
        return;
    }
    // Reset Build
    Utils.clearRecipesSection();
    Builder.init();
});

