const button = document.querySelector("button")
const template = document.querySelector("template")
const ul = document.querySelector("ul")

async function getProducts() {
    const result = await fetch("https://fakestoreapi.com/products")
    const data = await result.json()
    console.log(data)
    data.forEach(article => {
        console.log(article)
        const clone = template.content.cloneNode(true)
        const articleTitle = clone.getElementById("articleTitle")
        const articleDescription = clone.getElementById("articleDescription")
        const articlePrice = clone.getElementById("articlePrice")
        const articleImage = clone.getElementById("articleImage")
        // les avis
        const articleRateSpan = clone.querySelector(".rating-wrapper")
        const articleStars = clone.getElementById("stars")
        const ratingValue = clone.getElementById("ratingValue")
        const ratingCount = clone.getElementById("ratingCount")

        ratingValue.textContent = article.rating.rate
        articleStars.textContent = setRate(article.rating.rate)
        ratingCount.textContent = article.rating.count
        articleTitle.textContent = article.title
        articleDescription.textContent = article.description
        articleTitle.textContent = article.title
        articlePrice.textContent = article.price
        articleImage.setAttribute("src", article.image)

        ul.append(clone)
        
    });
}

button.addEventListener("click", getProducts)

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