import recipes from '../API/recipesData';

export function renderHtml(){
    let html = '';
    recipes.forEach(function (elt, index){
        html += `
        <div>
            <div>${elt.name}</div>
            <div>dgd</div>
            <div>gdfgdf</div>
        </div>
        `
    })
    return `
    <div>
    ${html}
    </div>
    `
}