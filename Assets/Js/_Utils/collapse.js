// ---- Pointer Dom
//dropdown
const ingredientsDropdown = document.querySelector('#first-dropdown')
const appareilsDropdown = document.querySelector('#secondary-dropdown')
const ustensilsDropdown = document.querySelector('#third-dropdown')

const arrowBtn = document.querySelectorAll('.arrow-down')
//containeur
const ingredientsContainer = document.querySelector('#ingredients-container')
const appareilsContainer = document.querySelector('#appareils-container')
const ustensilsContainer = document.querySelector('#ustensils-container')
//-- dropdown inputs ingredients
const inputOne = document.getElementById('ingredients-input1')
const inputTwo = document.getElementById('ingredients-input12')


// ----- Ouverture et Fermeture
let isVisible = false

/**
 * Ouverture et fermeture du menu de tri
 */
const toggleDropdown = (container, dropdown) => {
    //listBottom.classList.toggle("isVisible")  // method toggle()
    isVisible = !isVisible  // version ternere
    isVisible ? container.classList.add("isVisible") : container.classList.remove("isVisible")
    isVisible ? dropdown.classList.add("resize") : dropdown.classList.remove("resize")
    //isVisible ? arrowBtn.classList.add("rotate") : arrowBtn.classList.remove("rotate")

}
for (let i = 0; i < arrowBtn.length; i++) {
    arrowBtn[i].addEventListener('click', (e) => {

        if (e.target.parentNode.id === 'ingredientsBtn') {
            toggleDropdown(ingredientsContainer, ingredientsDropdown)
            resetDropdown(appareilsDropdown, appareilsContainer)
            resetDropdown(ustensilsDropdown, ustensilsContainer)

        }
        if (e.target.parentNode.id === 'btnappareil') {
            toggleDropdown(appareilsContainer, appareilsDropdown)
            resetDropdown(ingredientsDropdown, ingredientsContainer)
            resetDropdown(ustensilsDropdown, ustensilsContainer)


        }
        if (e.target.parentNode.id === 'ustensilsBtn') {
            toggleDropdown(ustensilsContainer, ustensilsDropdown)
            resetDropdown(ingredientsDropdown, ingredientsContainer)
            resetDropdown(appareilsDropdown, appareilsContainer)


        }
    })
}
const resetDropdown = (dropdown, container) => {
    dropdown.classList.remove("resize")
    container.classList.remove("isVisible")
}
const timerDropdown = () => {
    // ajout timer 
    if (isVisible) {
        window.setTimeout(() => {
            container.classList.remove("isVisible")
            //arrowImg.classList.remove("rotate")
        }, 10000)
    }
}


