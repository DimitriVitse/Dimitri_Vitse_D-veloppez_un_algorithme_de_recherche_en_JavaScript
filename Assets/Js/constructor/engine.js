import { recipes } from '../../Api/Api.js';

export class Engine {

    allRecipes = [];

    //Render toutes les recettes
    async getAll() {

        this.allRecipes = recipes;
        return this.allRecipes;
    }

    resetDisplayer() {
        const cardContaineur = document.querySelector('.result_section');
        cardContaineur.innerHTML = '';
    }

    resetDisplay() {
        // --- pointer Dom
        const cardContaineur = document.querySelector('.result_section')
        const allListContainer = document.getElementsByClassName('listtag')
        cardContaineur.innerHTML = ''
        // A VOIR ********************************
        for (let list of allListContainer) {

            list.innerHTML = '';
        }

    }

    //render avec une recherche
    async search_engine(terme) {

        this.resetDisplay();

        this.newAllRecipes = { recipes: [] };
        this.allRecipes.map((value, index) => {
            if (value.name.toLowerCase().includes(terme.target.value.toLowerCase())) {
                this.newAllRecipes.recipes.push(value);
            }
            if (value.description.toLowerCase().includes(terme.target.value.toLowerCase())) {
                this.newAllRecipes.recipes.push(value)
            }
            value.ingredients.map((ingredient) => {

                if (ingredient.ingredient.toLowerCase().includes(terme.target.value.toLowerCase())) {
                    this.newAllRecipes.recipes.push(value)
                }
            })

        })


        //Enleve les doublons du tableau
        let recipes = Array.from(new Set(this.newAllRecipes.recipes))

        let TagChoosen = { TagAppareil: [], TagIngredient: [], TagUstensil: [] };

        let taglist = document.getElementsByClassName('Tag-list')[0]

        if (taglist && taglist.children && taglist.children.length > 0) {


            for (let i = 0; i < taglist.children.length; i++) {
                let ClassName = taglist.children[i].className.split(" ");

                if (ClassName[1] === "tag-appareil") { TagChoosen.TagAppareil.push(taglist.children[i].innerText) }
                if (ClassName[1] === "tag-ingredients") { TagChoosen.TagIngredient.push(taglist.children[i].innerText) }
                if (ClassName[1] === "tag-ustensiles") { TagChoosen.TagUstensil.push(taglist.children[i].innerText) }
            }

        }

        const observer = new MutationObserver((data) => {

            for (let i = 0; i < data[0].target.children.length; i++) {

                let StringClassnameOfTag = data[0].target.children[i].className;
                let ArrayOfClassName = StringClassnameOfTag.split(" ");

                if (!TagChoosen.TagAppareil.includes(data[0].target.children[i].innerText) && ArrayOfClassName[1] === "tag-appareil") {
                    TagChoosen.TagAppareil.push(data[0].target.children[i].innerText);

                }
                if (!TagChoosen.TagIngredient.includes(data[0].target.children[i].innerText) && ArrayOfClassName[1] === "tag-ingredients") {
                    TagChoosen.TagIngredient.push(data[0].target.children[i].innerText);
                }
                if (!TagChoosen.TagUstensil.includes(data[0].target.children[i].innerText) && ArrayOfClassName[1] === "tag-ustensiles") {
                    TagChoosen.TagUstensil.push(data[0].target.children[i].innerText);
                }

                data[0].target.children[i].lastChild.addEventListener("click", function tagchoosen(e) {
                    if (TagChoosen.TagAppareil.length != 0) {
                        const resultfind = TagChoosen.TagAppareil.find(element => element === e.path[1].firstChild.innerText)


                        TagChoosen.TagAppareil = TagChoosen.TagAppareil.filter(element => element != resultfind);

                        if (TagChoosen.TagAppareil.includes(e.path[1].firstChild.innerText)) {
                            TagChoosen.TagAppareil.splice(e.path[1].firstChild.innerText, 1)
                        }
                    }
                    if (TagChoosen.TagUstensil.length != 0) {
                        const resultfind = TagChoosen.TagUstensil.find(element => element === e.path[1].firstChild.innerText)


                        TagChoosen.TagUstensil = TagChoosen.TagUstensil.filter(element => element != resultfind);

                        if (TagChoosen.TagUstensil.includes(e.path[1].firstChild.innerText)) {
                            TagChoosen.TagUstensil.splice(e.path[1].firstChild.innerText, 1)
                        }
                    }
                    if (TagChoosen.TagIngredient.length != 0) {
                        const resultfind = TagChoosen.TagIngredient.find(element => element === e.path[1].firstChild.innerText)


                        TagChoosen.TagIngredient = TagChoosen.TagIngredient.filter(element => element != resultfind);

                        if (TagChoosen.TagIngredient.includes(e.path[1].firstChild.innerText)) {
                            TagChoosen.TagIngredient.splice(e.path[1].firstChild.innerText, 1)
                        }
                    }


                })
            }


        });

        observer.observe(taglist, { subtree: true, childList: true });

        recipes.forEach(element => {

            if (TagChoosen.TagAppareil.length != 0) { recipes = recipes.filter(element => element.appliance == TagChoosen.TagAppareil) }

            if (TagChoosen.TagIngredient.length != 0) {
                console.log(TagChoosen)
                for (let i = 0; i < TagChoosen.TagIngredient.length; i++) {

                    recipes = recipes.filter(({ ingredients }) =>

                        ingredients.some(({ ingredient }) => ingredient.toLowerCase() == TagChoosen.TagIngredient[i])
                    );
                }
            }
            if (TagChoosen.TagUstensil.length != 0) {
                for (let i = 0; i < TagChoosen.TagUstensil.length; i++) {
                    for (let k = 0; k < element.ustensils.length; k++) {
                        recipes = recipes.filter(item => TagChoosen.TagUstensil.includes(item.ustensils[i].toLowerCase()))
                    }
                }
            }
        });

        //Convert en objet avant l'envoi
        this.newAllRecipes = { recipes }
        console.log(this.newAllRecipes);
        // return un tableau de recette
        return this.newAllRecipes

    }

}