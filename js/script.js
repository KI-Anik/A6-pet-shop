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

const loadCategoriesPhotos = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`);
    const data = await res.json();
    displayCategoriesPhotos(data)
}

const displayCategoriesPhotos = (photos) => {
    displayCard(photos.data)

}

const displayCategories = (categories) => {
    // console.log(categories)
    categories.forEach(item => {
        console.log(item.category)

        // create button 
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button onclick ="loadCategoriesPhotos('${item.category}')" class = "btn"> 
             <img class = "w-1/4" src = ${item.category_icon}
                <span> ${item.category} <span>
            </button>
        `

        // add button 
        const categoriesContainer = document.getElementById('categoryName');
        categoriesContainer.append(buttonContainer)
    });
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

    cards.forEach(card => {
        
        const Newcard = document.createElement('div');
        Newcard.innerHTML = `
        <div class="card card-compact bg-base-100 shadow-xl ">
  <figure class = "h-[200px] ">
    <img
      src=${card.image}
      class = "w-5/6 h-4/5 rounded-3xl object-fill"
      alt="pet" />
  </figure>
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
    <button class="btn">Details</button>
    </div>
  </div>
</div>
        `
        cardContainer.append(Newcard)
    });
}

loadCategories()
loadCard()