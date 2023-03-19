

export class constructRecette {

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

        let card = `
           <article class="card">
                <div class="card_img">
                    <img src="../../Assets/Public/Images/recette-image.jpg" alt="${this.name}" >
                </div>
                <div class="card_info">
                    <div class="top_card_info">
                        <h2>${this.name}</h2>
                        <div class='time'>
                        <i class="fa-regular fa-clock"></i>
                            <p>${this.time} min</p>
                        </div>                  
                    </div>
                    <div class="bottom_card_info">
                        <ul class="info_ingredients">
                        ${ingredientList}
                        </ul>
                        <div class="info_description"><p>${this.description.slice(0, 200)}...</p></div>
                    </div>
                </div>
                <p></p>
            </article>
        `
        return card
    }


}



