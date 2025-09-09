function getElement(id) {
    return document.getElementById(id);
}

function limitChars(text, charLimit) {
    if (text.length > charLimit) {
        return text.slice(0, charLimit) + "...";
    }
    return text;
}

let cartArray = [];

const categoryContainer = getElement("category-container");
const plantsContainer = getElement("plants-container");
const addToCart = getElement("addToCart-card");
const addToCartAndCountTotal = getElement("addToCartAndCountTotal");
const plantDetailsModal = getElement("plant-details-modal");
const plantDetails = getElement("plantDetails");

const loadPlantsByDefault = () => {
    categoryContainer.children[0].classList.add("bg-[#14803c]", "text-white");
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => showPlants(data.plants));
}
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => showCategories(data.categories));
}
const showCategories = (categories) => {
    categories.forEach(element => {
        categoryContainer.innerHTML += `
            <li id="${element.id}" class="w-[60%] mx-auto text-center md:w-full md:text-left font-normal text-[16px] hover:bg-[#14803c] hover:text-white cursor-pointer rounded-sm p-1">${element.category_name}</li>
        `
    });

    categoryContainer.addEventListener("click", (e) => {
        const allLi = document.querySelectorAll("li");
        allLi.forEach(li => {
            li.classList.remove("bg-[#14803c]", "text-white");
        })
        if (e.target.localName === "li") {
            e.target.classList.add("bg-[#14803c]", "text-white");
            loadPlantsByCategory(e.target.id);
        }
    })
}

const loadPlantsByCategory = (id) => {
    if (id === "defaultCategory") {
        return;
    }
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => showPlants(data.plants))
        .catch(err => alert("SORRY !!!\nSomething Went Wrong."));
}
const showPlants = (plants) => {
    plantsContainer.innerHTML = "";
    plants.forEach(plant => {
        plantDescription = limitChars(plant.description, 80)
        const plantCard = document.createElement('div');
        plantCard.classList.add("plant-div");
        plantCard.innerHTML = `
            <div id="${plant.id}" class="w-[80%] md:w-full p-2 rounded-md bg-white space-y-2">
                <img class="w-full h-[220px] rounded-md" src="${plant.image}" alt="">
                <h1 class="font-bold cursor-pointer">${plant.name}</h1>
                <p class="text-[#4e5761]">${plantDescription}</p>
                <div class="flex justify-between items-center">
                    <h2 class="text-[#14803c] bg-[#dcfce7] rounded-full px-2 py-1">${plant.category}</h2>
                    <h2>৳ <span class="font-semibold text-[#14803c]">${plant.price}</span></h2>
                </div>
                <button class="w-full bg-[#28a757] rounded-md p-1 text-white cursor-pointer">Add to Cart</button>    
            </div>
        `
        plantsContainer.appendChild(plantCard);
    });
}

const addToCartPlant = () => {
    plantsContainer.addEventListener("click", (e) => {

        if (e.target.innerText === "Add to Cart") {

            const plantId = e.target.parentNode.id;
            const plantName = e.target.parentNode.children[1].innerText;
            const plantPrice = e.target.parentNode.children[3].children[1].children[0].innerText;
            const cartData = {
                id: plantId,
                name: plantName,
                price: plantPrice
            };
            cartArray.push(cartData);

            if (addToCart) {
                addToCartAndCountTotal.children[0].children[0].classList.add("hidden");
                addToCartAndCountTotal.children[1].classList.remove("hidden");
                addToCartAndCountTotal.children[1].classList.add("flex");
            }

            toCart(cartArray);

            const totalPrice = getElement("totalPrice")
            const price = Number(totalPrice.innerText);
            const total = price + Number(plantPrice);
            totalPrice.innerText = total;
        }
    });

}

const toCart = (cartArray) => {
    addToCart.innerHTML = "";
    cartArray.forEach(data => {
        addToCart.innerHTML += `
                            <div class="flex justify-between items-center bg-white p-2 rounded-md">
                                <div>
                                    <h1>${data.name}</h1>
                                    <p>৳ <span>${data.price}</span></p>
                                </div>
                                <p onclick="clearCart('${data.id}')" id="clearCart" class="cursor-pointer">❌</p>
                            </div>
                            <hr>
        `
    });
}

const clearCart = (id) => {
    const filteredCartArray = [];
    cartArray.filter(data => {
        if (data.id !== id) {
            filteredCartArray.push(data);
        }
        else {
            const totalPrice = getElement("totalPrice")
            const price = Number(totalPrice.innerText);
            const total = price - Number(data.price);
            totalPrice.innerText = total;
        }
    })

    cartArray = filteredCartArray;

    if (filteredCartArray.length === 0) {
        addToCartAndCountTotal.children[0].children[0].classList.remove("hidden");
        addToCartAndCountTotal.children[1].classList.remove("flex");
        addToCartAndCountTotal.children[1].classList.add("hidden");
    }

    toCart(cartArray);

}

plantsContainer.addEventListener("click", (e) => {
    if (e.target.localName === "h1") {
        fetchPlantDetails(e);
    }
})

const fetchPlantDetails = (e) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${e.target.parentNode.id}`)
        .then(res => res.json())
        .then(data => showPlantDetails(data.plants))
        .catch(err => alert("SORRY !!!\nSomthing Went Wrong."));
}

const showPlantDetails = (data) => {
    console.log(data);
    plantDetailsModal.showModal()
    plantDetails.innerHTML = `
                <h1 class="font-bold text-xl">${data.name}</h1>
                <img class="w-full h-[220px] rounded-md" src="${data.image}" alt="">
                <p class="font-semibold">Category: <span class="text-[#4e5761] font-normal">${data.category}</span></p>
                <p class="font-semibold">Price: ৳<span class="text-[#4e5761] font-normal">${data.price}</span></p>
                <p class="font-semibold">Description: <span class="text-[#4e5761] font-normal">${data.description}</span></p>
    `
}

loadPlantsByDefault();
loadCategory();
addToCartPlant();