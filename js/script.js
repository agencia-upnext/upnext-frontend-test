import PlantsController from "../controller/PlantsController.js";
const cardsContainer = document.querySelector(".cards-container");

// Get all plants
async function getAllPlants() {
  const plantsList = await PlantsController.getPlants();
  plantsList.forEach((plant) => {
    render(plant);
  });
}

// Get filter options from select
function getFilterOptions() {
  const sun = document.querySelector("#sunlight").value;
  const water = document.querySelector("#water").value;
  const pets = document.querySelector("#toxicity").value;

  return {
    sun: sun === "null" ? null : sun,
    water: water === "null" ? null : water,
    pets: pets === "null" ? null : pets,
  };
}

// Filter plants from plants list
async function filterPlants() {
  const { sun, water, pets } = getFilterOptions();
  const filteredList = await PlantsController.filterPlants(sun, water, pets);

  if (filteredList.length < 1) {
    showResultsCard(false);
    return;
  }

  showResultsCard(true);
  cardsContainer.innerHTML = '';
  filteredList.forEach((plant) => {
    render(plant);
  });
}

// Render plants cards
function render(data) {
  cardsContainer.innerHTML += `
    <div class="card">
      <div class="card-header">
        <img src="${data?.url}" alt="${data?.name}">
      </div>
      <div class="card-body">
        <p class="plant-name">${data?.name}</p>
        <p class="price">$${data?.price}</p>
      </div>
    </div>
  `;
}

// Show find/no results cards
function showResultsCard(findResults) {
  const resultsCard = document.querySelector("#find-results");
  const noResultsCard = document.querySelector("#no-results");

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });

  if (!findResults) {
    noResultsCard.classList.remove("hide");
    resultsCard.classList.add("hide");
    return;
  }

  cardsContainer.innerHTML = "";
  noResultsCard.classList.add("hide");
  resultsCard.classList.remove("hide");
}

// Start application
function startApp() {
  const toxicitySelect = document.querySelector("#toxicity");
  const otherSelects = document.querySelectorAll("select:not(#toxicity)");

  // Check if toxicity value is not null
  toxicitySelect.addEventListener("change", () => {
    if (toxicitySelect.value !== "null") {
      document.querySelector("#sunlight").value = "null";
      document.querySelector("#water").value = "null";
      filterPlants();
    }
  });

  // Add change event listeners to other selects
  otherSelects.forEach((select) => {
    select.addEventListener("change", () => {
      toxicitySelect.value = 'null';
      filterPlants();
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  startApp();
  getAllPlants();
});
