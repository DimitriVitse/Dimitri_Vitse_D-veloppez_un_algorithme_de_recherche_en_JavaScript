export class constructTag {

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.appliance = data.appliance
        this.time = data.time
        this.description = data.description
        this.ingredients = data.ingredients
    }

    //------------- return toutes les values des recettes
    get(property) {
        if (isset(this[property])) {
            return this[property]
        }
    }

    //------------- return l'affichage d'une card
    getRecipeCardDOM(ingredientsArr) {

        let ingredientList = ''

        for (let i = 0; i < ingredientsArr.length; i++) {
            ingredientList += `
                <li><b>${ingredientsArr[i].ingredient}</b>  ${ingredientsArr[i].quantity !== undefined ? `:` + ingredientsArr[i].quantity : ''} ${ingredientsArr[i].unit !== undefined ? ingredientsArr[i].unit : ''}</li>
           
            `
        }
    }
}