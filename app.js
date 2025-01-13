
fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`)
    .then(res => res.json())
    .then(data => {
        clearCard();
        displayProd(data.drinks);
    })
    .catch((err) => {
        console.log(err);
    })

document.getElementById("search").addEventListener("click", (event) => {
    const inputVal = document.getElementById("inputVal").value;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputVal}`)
    .then(res => res.json())
    .then(data => {
        clearCard();
        displayProd(data.drinks);
    })
    .catch((err) => {
        console.log(err);
        if (err) {
            const cartCont = document.getElementById("card-cont");
            cartCont.innerHTML=`
                <div>
                <h1 class="text-2xl text-center font-medium">Nof found</h1>
                </div>
            `;
            console.log("dbie");
        }
        
    })


})

const clearCard = ()=>{
    const cartCont = document.getElementById("card-cont");
    cartCont.innerHTML='';
}

const displayProd = (prods) => {
    const cartCont = document.getElementById("card-cont");
    prods.forEach(prod => {


        const div = document.createElement("div");
        div.innerHTML =
            `
            <div class="card" style="width: 260px;">
                <img src="${prod.strDrinkThumb}" class="card-img-top w-64 h-52 " alt="...">
                <div class="card-body text-center">
                    <h5 class="text-lg font-medium">Name: ${prod.strDrink}</h5>
                    <p class="card-text">Category: ${prod.strCategory}</p>
                    <p class="card-text my-2">Instructions: ${prod.strInstructions.slice(0, 15)}</p>
                    <!-- Button trigger modal -->
                    <button onclick="singleProd(${prod.idDrink})" class="btn btn-primary" >
                    Details
                    </button>


                    
                    <button onclick="handleAddToCart('${prod.strDrink}')" class="btn btn-primary">Add To Cart</button>
                </div>
            </div>
                    `

        cartCont.appendChild(div);
    });
}
const singleProd = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((json) => set(json.drinks[0]))
    console.log(id);
    
    
    function set(prod) {
        const title = document.getElementById("mod-title");
        const body = document.getElementById("mod-body");
        console.log(prod);
        
        title.innerText = prod.strDrink;
        body.innerHTML = `
        <img src="${prod.strDrinkThumb}" class="card-img-top m-auto w-64 h-52" alt="${prod.strDrink}">
        <p class="text-xl my-3 font-bold">Category: ${prod.strCategory}</p>
        <p class="text-xl my-3">Alcoholic: ${prod.strAlcoholic}</p>
        <p class="text-justify">Instructions: ${prod.strInstructions}</p>
        `;
    }
    let modal1 = new bootstrap.Modal(document.getElementById("nothing"));

    function toggleModal1() {
        modal1.toggle();
    }
    toggleModal1();
}
const handleAddToCart = (item) => {
    const cartCount = document.getElementById("count").innerText;
    // console.log(item)
    let convertedCount = parseInt(cartCount)
    if (convertedCount > 6) {
        return alert("Can't add item");
    }
    convertedCount++;
    document.getElementById("count").innerText = convertedCount;
    const container = document.getElementById("table");
    const tr = document.createElement("tr");
    // console.log(item.strMeal);
    tr.innerHTML = `
                <th scope="row">${convertedCount}</th>
                <td>${item}</td>
    `;
    container.appendChild(tr);
}





// function set(prod) {
//     const title = document.getElementById("mod-title");
//     const body = document.getElementById("mod-body");
//     console.log(prod);
    
//     title.innerText = prod.strMeal;
//     body.innerHTML = `
//     <img src="${prod.strMealThumb}" class="card-img-top m-auto w-64 h-52" alt="${prod.strMeal}">
//     <p class="text-xl my-3 font-bold">Category: ${prod.strCategory}</p>
//     <p class="text-xl my-3">Area: ${prod.strArea}</p>
//     <p class="text-justify">Instructions: ${prod.strInstructions}</p>
// `;