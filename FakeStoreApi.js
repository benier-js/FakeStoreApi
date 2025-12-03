const loadBtn = document.getElementById("loadBtn")
const clearBtn = document.getElementById("clearBtn")
const template = document.querySelector("template")
const ul = document.querySelector("ul")
let currentProduct = []
let previousProduct = []

async function getProducts(input = "") {
    
        console.log("éléments en cours d'affichage")
        const result = await fetch("https://fakestoreapi.com/products");
        const data = await result.json();

        // 🎯 Si pas de recherche → on utilise tous les produits
        // 🎯 Si recherche → on utilise ceux filtrés
        const productsToDisplay = input.trim() === "" ? data : data.filter(article =>
                limitToTreeWord(article.title.toLowerCase(), 3).includes(input.toLowerCase())
            );

        ul.innerHTML = ""; // on vide la liste pour ré-afficher proprement

        productsToDisplay.forEach(article => {

            const clone = template.content.cloneNode(true);

            const articleTitle = clone.querySelector("#articleTitle");
            const articlePrice = clone.querySelector("#articlePrice");
            const articleImage = clone.querySelector("#articleImage");
            const el = clone.querySelector("li") || clone.firstElementChild;

            el.style.setProperty(
            '--after-content',
            `'${limitToThreeWords(article.title, 1)}'`
            );
            
            articleTitle.textContent = limitToThreeWords(article.title);
            articlePrice.textContent = `${article.price} €`;
            articleImage.src = article.image;

            // ★ Animation bouton (inchangée)
            const btn = clone.getElementById('addToCart');
            const VISIBLE_MS = 700;
            const OUT_ANIM_MS = 280;

            btn.addEventListener('click', () => {
                if (btn.classList.contains('show-check')) return;
                btn.classList.add('show-check');

                setTimeout(() => {
                    btn.classList.add('hide-check');
                    setTimeout(() => {
                        btn.classList.remove('show-check', 'hide-check');
                    }, OUT_ANIM_MS);
                }, VISIBLE_MS);
            });

            console.log("produits obtenus")
            ul.append(clone);
        });


}


loadBtn.addEventListener("click", () => {
    getProducts("")
})

window.addEventListener("DOMContentLoaded", () => {
    getProducts("")
})

clearBtn.addEventListener("click", () => {
    ul.innerHTML = ""
})
function setRate(rate) {
    rate = Math.floor(rate)
    let rateStars = ""
    for (let index = 0; index < 5; index++) {
        if(index <= rate - 1) {
            rateStars += "★"
        }else {
            rateStars += "☆"
        }
    }
    return rateStars
}
function limitToThreeWords(text, number = 3) {
    if (typeof text !== "string") return "";

    const words = text.trim().split(/\s+/); // découpe propre (espaces multiples)
    const firstThree = words.slice(0, number);   // récupère les 3 premiers mots

    return firstThree.join(" ");            // recompose la phrase
}
const researchInput = document.getElementById("researchInput")
const researchForm = document.querySelector(".research-form")
const arrowSvg = document.querySelector(".arrowSvg")

researchInput.addEventListener("click", () => {
  researchForm.classList.add("focusStyle");
});

researchInput.addEventListener("blur", () => {
  researchForm.classList.remove("focusStyle");
});

researchInput.addEventListener("input", (e) => {
    getProducts(e.target.value);
});
