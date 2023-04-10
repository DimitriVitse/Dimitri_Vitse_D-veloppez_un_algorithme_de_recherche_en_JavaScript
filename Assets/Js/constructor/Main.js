import { constructRecette } from './ConstructCardRecette.js';

import { Engine } from './engine.js'

export class Main extends Engine {
    // --conteneur des resultats (init et/ou après recherche)
    result = [];

    // --récup ustensils
    ustensils = [];

    // --array ingrédients
    ingredients = [];

    // --array appareils
    appareils = [];

    resetexctrudeur() {
        this.ustensils = [];
        this.ingredients = [];
        this.appareils = [];
    }

    async start() {
        this.result = await this.getAll();
        this.extA();
        this.extI();
        this.extU();
    }

    //  Reset start after delete user input if < 3
    async resetStart() {
        await this.start()
        this.resetDisplay()
        this.DisplayTag()
        this.DisplayRecetteCard()
    }

    async search(terme) {

        this.result = await this.search_engine(terme);

        this.resetexctrudeur();

        this.extA();
        this.extI();
        this.extU();

        return true;
    }


    async extA() {




        this.appliances = [];

        if (this.result.recipes) {
            for (let i = 0; i < this.result.recipes.length; i++) {

                if (this.appliances.includes(this.result.recipes[i].appliance)) { this.appliances = this.appliances }
                else { this.appliances.push(this.result.recipes[i].appliance); }
            }
        } else {
            for (let i = 0; i < this.result.length; i++) {

                if (this.appliances.includes(this.result[i].appliance)) { this.appliances = this.appliances }
                else { this.appliances.push(this.result[i].appliance); }


            }
        }



    }

    async extI() {



        this.ingredients = [];


        if (this.result.recipes) {
            this.result.recipes.forEach(element => {
                for (let i = 0; i < element.ingredients.length; i++) {
                    if (this.ingredients.includes(element.ingredients[i].ingredient.toLowerCase())) { this.ingredients = this.ingredients }
                    else { this.ingredients.push(element.ingredients[i].ingredient.toLowerCase()) }
                }

            })


        } else {
            this.result.forEach(element => {
                for (let i = 0; i < element.ingredients.length; i++) {
                    if (this.ingredients.includes(element.ingredients[i].ingredient.toLowerCase())) { this.ingredients = this.ingredients }
                    else { this.ingredients.push(element.ingredients[i].ingredient.toLowerCase()) }
                }
            })




        }
        this.ingredients.sort();


    }

    async extU() {



        this.ustensils = [];

        if (this.result.recipes) {
            this.result.recipes.forEach(element => {
                for (let i = 0; i < element.ustensils.length; i++) {
                    if (this.ustensils.includes(element.ustensils[i].toLowerCase())) { this.ustensils = this.ustensils }
                    else { this.ustensils.push(element.ustensils[i].toLowerCase()) }
                }

            })


        } else {
            this.result.forEach(element => {
                for (let i = 0; i < element.ustensils.length; i++) {
                    if (this.ustensils.includes(element.ustensils[i].toLowerCase())) { this.ustensils = this.ustensils }
                    else { this.ustensils.push(element.ustensils[i].toLowerCase()) }
                }
            })

        }

        this.ustensils.sort();

    }



    DisplayTag() {
        this.DisplayUstensilsList()
        this.DisplayIngredientsList()
        this.DisplayAppareilList()


    }

    DisplayUstensilsList() {
        let tagchosen = [];
        let divinput = document.getElementById('third-header-dropdown');
        divinput.addEventListener("input", function SearchTag() {
            // Declare variables
            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById('ustensils-input');
            filter = input.value.toUpperCase();
            ul = document.getElementById("ustensils-list");
            li = ul.getElementsByTagName('li');

            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                a = li[i];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });
        let taglist = document.getElementsByClassName('Tag-list')[0]
        for (let i = 0; i < taglist.children.length; i++) {
            let ClassName = taglist.children[i].className.split(" ")[1];
            let name = taglist.children[i].innerText
            if (ClassName == 'tag-ustensiles') {
                this.ustensils = this.ustensils.filter(element => element !== name)
            }




        }
        const ustensilsContainer = document.getElementById('ustensils-list')

        for (let i = 0; i < this.ustensils.length; i++) {
            const ustensilsTemplate = `<li class='filter_select_all filter_select_ustensiles' ><a class="link_tag_ustensiles" href="#">${this.ustensils[i]}</a></li>`
            ustensilsContainer.insertAdjacentHTML('beforeend', ustensilsTemplate)
        }
        const filterselect = document.querySelectorAll(".filter_select_ustensiles");
        filterselect.forEach(element => {
            element.addEventListener("click", function (e) {
                const divtaglist = document.querySelector('.Tag-list')

                divtaglist.innerHTML += ('beforeend', `<li class='tag-selected tag-ustensiles'><p>${e.target.textContent}</p> <i class="fa-regular fa-circle-xmark"></i></li>`);
                tagchosen.push(e.target.textContent)
                e.target.parentElement.style.display = 'none';
                let selectedtag = document.querySelectorAll(".tag-ustensiles")

                selectedtag.forEach(element => {

                    element.lastChild.addEventListener("click", function (e) {
                        let selectedtemplate = document.getElementsByClassName('filter_select_ustensiles')
                        let selectedfilter = document.getElementsByClassName('link_tag_ustensiles')
                        let tagdelete = e.target.parentElement.innerText;

                        for (let i = 0; i < selectedtemplate.length; i++) {
                            if (selectedfilter[i].innerHTML == tagdelete) {
                                selectedtemplate[i].style.display = 'block';

                            }
                        }

                        e.target.parentElement.remove();
                        tagchosen = tagchosen.filter(tag => tag != tagdelete)

                    })
                })

            })
        });

    }


    DisplayIngredientsList() {
        let tagchosen = [];
        let divinput = document.getElementById('first-header-dropdown');
        divinput.addEventListener("input", function SearchTag() {
            // Declare variables
            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById('ingredients-input');
            filter = input.value.toUpperCase();
            ul = document.getElementById("ingredients-list");
            li = ul.getElementsByTagName('li');

            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                a = li[i];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });
        let taglist = document.getElementsByClassName('Tag-list')[0]

        if (taglist && taglist.children && taglist.children.length > 0) {


            for (let i = 0; i < taglist.children.length; i++) {
                let ClassName = taglist.children[i].className.split(" ")[1];
                let name = taglist.children[i].innerText
                if (ClassName == 'tag-ingredients') {
                    this.ingredients = this.ingredients.filter(element => element !== name)
                }




            }

        }
        const ingredientsContainer = document.getElementById('ingredients-list')

        for (let i = 0; i < this.ingredients.length; i++) {
            const ingredientsTemplate = `<li class='filter_select_all filter_select_ingredients' ><a class="link_tag_ingredients" href="#">${this.ingredients[i]}</a></li>`
            ingredientsContainer.insertAdjacentHTML('beforeend', ingredientsTemplate)
        }
        const filterselect = document.querySelectorAll(".filter_select_ingredients");
        filterselect.forEach(element => {
            element.addEventListener("click", function (e) {
                const divtaglist = document.querySelector('.Tag-list')

                divtaglist.innerHTML += ('beforeend', `<li class='tag-selected tag-ingredients'><p>${e.target.textContent}</p> <i class="fa-regular fa-circle-xmark"></i></li>`);
                tagchosen.push(e.target.textContent)
                e.target.parentElement.style.display = 'none';
                let selectedtag = document.querySelectorAll(".tag-ingredients")

                selectedtag.forEach(element => {

                    element.lastChild.addEventListener("click", function (e) {
                        let selectedtemplate = document.getElementsByClassName('filter_select_ingredients')
                        let selectedfilter = document.getElementsByClassName('link_tag_ingredients')
                        let tagdelete = e.target.parentElement.innerText;

                        for (let i = 0; i < selectedtemplate.length; i++) {
                            if (selectedfilter[i].innerHTML == tagdelete) {
                                selectedtemplate[i].style.display = 'block';

                            }
                        }

                        e.target.parentElement.remove();
                        tagchosen = tagchosen.filter(tag => tag != tagdelete)

                    })
                })

            })
        });

    }


    DisplayAppareilList() {
        let tagchosen = [];
        let divinput = document.getElementById('secondary-header-dropdown');
        divinput.addEventListener("input", function SearchTag() {
            // Declare variables
            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById('appareils-input');
            filter = input.value.toUpperCase();
            ul = document.getElementById("appareils-list");
            li = ul.getElementsByTagName('li');

            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                a = li[i];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });
        console.log(this.appliances)
        const appliancesContainer = document.getElementById('appareils-list')
        let taglist = document.getElementsByClassName('Tag-list')[0]

        if (taglist && taglist.children && taglist.children.length > 0) {


            for (let i = 0; i < taglist.children.length; i++) {
                let ClassName = taglist.children[i].className.split(" ")[1];
                let name = taglist.children[i].innerText
                if (ClassName == 'tag-appareil') {
                    this.appliances = this.appliances.filter(element => element !== name)
                }




            }

        }
        for (let i = 0; i < this.appliances.length; i++) {
            const applianceTemplate = `<li class='filter_select_all filter_select_apparel' ><a class="link_tag_apparel link_tag" href="#">${this.appliances[i]}</a></li>`
            appliancesContainer.insertAdjacentHTML('beforeend', applianceTemplate)
        }
        const filterselect = document.querySelectorAll(".filter_select_apparel");
        filterselect.forEach(element => {
            element.firstChild.addEventListener("click", function (e) {
                const divtaglist = document.querySelector('.Tag-list')

                divtaglist.innerHTML += ('beforeend', `<li class='tag-selected tag-appareil'><p>${e.target.textContent}</p> <i class="fa-regular fa-circle-xmark"></i></li>`);
                tagchosen.push(e.target.textContent)
                e.target.parentElement.style.display = 'none';

                let selectedtag = document.querySelectorAll(".tag-appareil")
                selectedtag.forEach(element => {

                    element.lastChild.addEventListener("click", function (e) {

                        let selectedtemplate = document.getElementsByClassName('filter_select_apparel')
                        let selectedfilter = document.getElementsByClassName('link_tag_apparel')
                        let tagdelete = e.target.parentElement.innerText;

                        for (let i = 0; i < selectedtemplate.length; i++) {
                            if (selectedfilter[i].innerHTML == tagdelete) {
                                selectedtemplate[i].style.display = 'block';

                            }
                        }

                        e.target.parentElement.remove();
                        tagchosen = tagchosen.filter(tag => tag != tagdelete)

                    })
                })

            })
        });

    }

    DisplayRecetteCard() {
        const searchInput = document.getElementById('searchinput')
        const container = document.querySelector('.result_section');
        let listedesrecettes = '';
        if (searchInput.value.length >= 3) { listedesrecettes = this.result.recipes.map(recette => new constructRecette(recette)); }
        else { listedesrecettes = this.result.map(recette => new constructRecette(recette)); }
        let startlist = '';
        let error = `<p>Aucune recette ne correspond à votre critère... vous pouvez chercher << Salade de Riz >>, << Tomate >>, etc. </p>`;

        listedesrecettes.map(recette => {
            startlist += recette.getRecipeCardDOM(recette.ingredients)
        })

        if (listedesrecettes.length !== 0) {
            container.insertAdjacentHTML("beforeend", startlist);
        } else {
            container.insertAdjacentHTML("beforeend", error);
        }

    }




}