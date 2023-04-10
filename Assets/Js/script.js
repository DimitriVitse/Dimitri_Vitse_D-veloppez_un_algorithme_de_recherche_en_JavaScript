import { Main } from './constructor/Main.js'

let main = new Main()

//Init
await main.start()

main.DisplayTag()
main.DisplayRecetteCard()


//Ajout du listener sur input
const searchInput = document.getElementById('searchinput')
searchInput.addEventListener('input', (terme) => {


    if (terme.target.value.length >= 3) {
        main.search(terme)
            .then(() => {
                console.log('dans script.js main.search');
                main.DisplayTag()
                main.DisplayRecetteCard()
            })
            .catch(err => console.log(err))

        let taglist = document.getElementsByClassName('Tag-list')[0];

        const observer = new MutationObserver((mutation) => {
            if (mutation.addedNodes != 0 || mutation.removedNodes != 0) {
                console.log(mutation)
                main.search(terme)
                    .then(() => {
                        console.log('dans script.js main.search');
                        main.resetDisplay();
                        main.DisplayTag();
                        main.DisplayRecetteCard();

                    })
                    .catch(err => console.log(err))
            }


        })
        observer.observe(taglist, { subtree: true, childList: true });



    }
    else {
        main.resetStart()
    }
})
