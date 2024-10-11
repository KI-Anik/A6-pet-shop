const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json()
    // console.log(data)
    displayCategories(data.categories)
};

const loadCard = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json()
    displayCard(data.pets)
};

const removeActiveclass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (const btn of buttons) {
        btn.classList.remove('active')
    }
}

const loadCategoriesPhotos = async (categoryName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
    const data = await res.json();
    displayCard(data.data)

    // remove color on button
    removeActiveclass()
   
    // active color on button
    const activeBtn = document.getElementById(`btn-${categoryName}`)
    activeBtn.classList.add('active')
}

// const displayCategoriesPhotos = (photos) => {
//     displayCard(photos.data)

// }

const displayCategories = (categories) => {
    // console.log(categories)
    categories.forEach(item => {
        // console.log(item.category)

        // create button 
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id = "btn-${item.category}" onclick ="loadCategoriesPhotos('${item.category}')" class = "btn px-8 category-btn"> 
             <img class = "w-1/4" src = ${item.category_icon}
                <span> ${item.category} <span>
            </button>
        `

        // add button 
        const categoriesContainer = document.getElementById('categoryName');
        categoriesContainer.append(buttonContainer)
    });
};

const loadDetails = async (id) => {
    const response = await fetch (`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await response.json();
    displayDetails(data.petData)
}

const displayDetails = (modal) => {
    console.log(modal)
    const modalContainer = document.getElementById('modal-content');
    modalContainer.innerHTML = `
    <div class = "flex justify-center" ><img class = "w-full" src=${modal.image} alt=""></div>

     <div class="card-body">
    <h2 class="text-2xl font-bold">${modal.pet_name}</h2>
    <div class="grid grid-cols-2 border-b gap-3">
    <p><i class="fa-solid fa-border-all"></i> Breed: ${modal.breed}</p>
    <p><i class="fa-regular fa-calendar"></i> Birth: ${modal.date_of_birth}</p>
    <p><i class="fa-solid fa-mercury"></i>  Gender: ${modal.gender}</p>
    <p><i class="fa-solid fa-dollar-sign"></i> Price: ${modal.price}</p>
    <p><i class="fa-solid fa-mercury mb-4"></i> vaccinated status:${modal.vaccinated_status} </p>
    </div>
    <div>
        <h4 class = "text-lg font-bold">Details Infomation: </h4>
        <p>${modal.pet_details}</p>
    </div>
    `

    document.getElementById('my_modal_5').showModal()
}


/**
{
    "petId": 1,
    "breed": "Golden Retriever",
    "category": "Dog",
    "date_of_birth": "2023-01-15",
    "price": 1200,
    "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
    "gender": "Male",
    "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
    "vaccinated_status": "Fully",
    "pet_name": "Sunny"
}
 */

const displayCard = (cards) => {
    // console.log(cards)
    const cardContainer = document.getElementById('cards')
    cardContainer.innerHTML = "";

    if (cards.length == 0) {
        cardContainer.classList.remove("grid")
        cardContainer.innerHTML = `
        <div class="min-h-[500px] space-y-5 flex flex-col justify-center items-center">
            <img src="./images/error.webp" alt="">
            <h3 class="text-3xl font-bold">No Information Available</h3>
<p class = "w-1/2 text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
    its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `
        return;
    }
    else{
        cardContainer.classList.add("grid")
    }

    cards.forEach(card => {
        console.log(card.petId)
        const Newcard = document.createElement('div');
        Newcard.innerHTML = `
        <div class=" card card-compact bg-base-100 shadow-xl ">
     <div class = "flex justify-center h-[250px]" ><img class = "w-4/5 rounded-2xl" src=${card.image} alt=""></div>

  <div class="card-body">
    <h2 class="card-title">${card.pet_name}</h2>
    <div class="border-b space-y-3">
    <p><i class="fa-solid fa-border-all"></i> Breed: ${card.breed}</p>
    <p><i class="fa-regular fa-calendar"></i> Birth: ${card.date_of_birth}</p>
    <p><i class="fa-solid fa-mercury"></i>  Gender: ${card.gender}</p>
    <p><i class="fa-solid fa-dollar-sign mb-4"></i> Price: ${card.price}</p>
    </div>
    <div class = "flex justify-around">
    <button class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
    <button class="btn">Adopt</button>
    <button onclick = "loadDetails(${card.petId})" class="btn">Details</button>
    </div>
  </div>
</div>
        `
        cardContainer.append(Newcard)
    });
}

loadCategories()
loadCard()