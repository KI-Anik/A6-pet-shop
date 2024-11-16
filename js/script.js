// scrolling to the section
document.getElementById('scrollButton').addEventListener('click', function() {
    document.getElementById('adopt').scrollIntoView({
        behavior: 'smooth'
    });
});

let allpets = []; // Define globally to be used in sorting

document.getElementById('sortByPrice').addEventListener('click', () => {
   const sortedPets = allpets.sort((a, b) => b.price - a.price); 
   console.log(sortedPets)
   displayCard(sortedPets); 
});


const checkValue = (value) => {
    return (value === undefined || value === null) ? 'Not Available' : value;
};

const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json()
    displayCategories(data.categories)
};

const loadCard = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    allpets = data.pets; // Assign data to global variable
    displayCard(allpets);
};

const removeActiveclass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (const btn of buttons) {
        btn.classList.remove('active')
    }
};

const loadCategoriesPhotos = async (categoryName) => {
    const spinner = document.getElementById('spinner');
    const cardContainer = document.getElementById('cards');

    // Hide cards and show spinner before fetching data
    cardContainer.classList.add('hidden');
    spinner.classList.remove('hidden');

    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
        const data = await res.json();

        setTimeout(() => {
            // Hide the spinner and display the fetched cards
            spinner.classList.add('hidden');
            cardContainer.classList.remove('hidden');
            displayCard(data.data); 
        }, 2000); 
    } catch (error) {
        console.error('Error fetching category data:', error);
        // Hide the spinner even if there is an error
        spinner.classList.add('hidden');
        cardContainer.classList.remove('hidden');
    }
};

document.getElementById('choosePetsCategory').addEventListener('click', () => {
    // Hide all cards and show spinner when clicking a category button
    const spinner = document.getElementById('spinner');
    const cardContainer = document.getElementById('cards');
    
    cardContainer.classList.add('hidden');
    spinner.classList.remove('hidden');
});

const displayCategories = (categories) => {
    categories.forEach(item => {

        // create button 
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id = "btn-${item.category}" onclick ="loadCategoriesPhotos('${item.category}')" class = "btn px-8 category-btn"> 
             <img class = "w-1/4" src = ${item.category_icon}
                <span> ${item.category} <span>
            </button>
        `;
        // add button 
        const categoriesContainer = document.getElementById('choosePetsCategory');
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
    <p><i class="fa-solid fa-border-all"></i> Breed: ${checkValue(modal.breed)}</p>
    <p><i class="fa-regular fa-calendar"></i> Birth: ${checkValue(modal.date_of_birth)}</p>
    <p><i class="fa-solid fa-mercury"></i>  Gender: ${checkValue(modal.gender)}</p>
    <p><i class="fa-solid fa-dollar-sign"></i> Price: ${checkValue(modal.price)}</p>
    <p><i class="fa-solid fa-mercury mb-4"></i> vaccinated status:${modal.vaccinated_status} </p>
    </div>
    <div>
        <h4 class = "text-lg font-bold">Details Infomation: </h4>
        <p>${modal.pet_details}</p>
    </div>
    `

    document.getElementById('my_modal_5').showModal()
}

const displayCard = (cards) => {
    console.log(cards)
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
        const newCard = document.createElement('div');
        newCard.innerHTML = `
        <div class=" card card-compact bg-base-100 shadow-xl ">
     <div class = "flex justify-center h-[250px]" ><img class = "w-4/5 rounded-2xl" src=${card.image} alt=""></div>

  <div class="card-body">
    <h2 class="card-title">${card.pet_name}</h2>
    <div class="border-b space-y-3">
    <p><i class="fa-solid fa-border-all"></i> Breed: ${checkValue(card.breed)}</p>
    <p><i class="fa-regular fa-calendar"></i> Birth: ${checkValue(card.date_of_birth)}</p>
    <p><i class="fa-solid fa-mercury"></i>  Gender: ${checkValue(card.gender)}</p>
    <p><i class="fa-solid fa-dollar-sign mb-4"></i> Price: ${checkValue(card.price)}</p>
    </div>
    <div class = "flex justify-around">
    <button onclick = "likedPhotosDisplay('${card.image}')"
class="btn btn-outline btn-success"><i class="fa-regular fa-thumbs-up"></i></button>
    <button onclick="showCongratsModal()" class="btn btn-outline btn-success">Adopt</button>
    <button onclick = "loadDetails(${card.petId})" class="btn btn-outline btn-success">Details</button>
    </div>
  </div>
</div>
        `
        cardContainer.append(newCard)
    });
}

const likedPhotosDisplay = (image) => {
    console.log(image)
    const likedPhotosContainer = document.getElementById('likedPhotos-Container');
    const div = document.createElement('div');
    div.innerHTML = `
    <img src=${image} alt="">
    `
    likedPhotosContainer.append(div)
}

 // Function to show the congrats modal and countdown
 const showCongratsModal = () => {
    const modal = document.getElementById('congrats_modal');
    const countdownElement = document.getElementById('countdown');
    let countdown = 3;

    // Open the modal
    modal.showModal();
    countdownElement.textContent = `Closing in ${countdown}...`;

    // Countdown logic
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = `Closing in ${countdown}...`;

        // Close modal when countdown reaches 0
        if (countdown === 0) {
            clearInterval(countdownInterval);
            modal.close();
        }
    }, 1000); // Update every second (1000ms)
};

loadCategories()
loadCard()