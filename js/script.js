// Data Controller class
class PlantsDataController {
  constructor() {
    this.data = [
      {
        id: 1,
        name: "Euphorbia eritrea",
        sun: "high",
        water: "rarely",
        url: "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/euphorbia-eritrea.png",
        price: 25,
        toxicity: false,
      },
      {
        id: 2,
        name: "Succulent Bowl",
        sun: "high",
        water: "rarely",
        url: "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/succulent-bowl.png",
        price: 30,
        toxicity: false,
      },
      {
        id: 3,
        name: "Bunny ears cacti",
        sun: "high",
        water: "rarely",
        url: "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/bunny-ears-cacti.png",
        price: 20,
        toxicity: false,
      },
      {
        id: 4,
        name: "Ficus lyrata",
        sun: "high",
        water: "regularly",
        url: "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/ficus-lyrata.png",
        price: 30,
        toxicity: false,
      },
      {
        id: 5,
        name: "Bamboo",
        sun: "low",
        url: "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/lucky-bamboo.png",
        water: "regularly",
        price: 15,
        toxicity: false,
      },
      {
        id: 6,
        name: "Ponytail Palm",
        sun: "low",
        water: "regularly",
        url: "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/ponytail-palm.png",
        price: 50,
        toxicity: false,
      },
      {
        id: 7,
        name: "Pilea peperomioides",
        sun: "no",
        url: "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/pilea-peperomioides.png",
        water: "regularly",
        price: 50,
        toxicity: true,
      },
      {
        id: 8,
        name: "Calathea triostar",
        sun: "no",
        water: "daily",
        url: "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/calathea-triostar.png",
        price: 50,
        toxicity: true,
      },
      {
        id: 9,
        name: "Monstera deliciosa",
        sun: "no",
        url: "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/monstera-deliciosa.png",
        water: "daily",
        price: 50,
        toxicity: true,
      },
    ];
    this.filteredPlants;
  }

  // Method for get data
  getPlants() {
    try {
      return this.data;
    } catch (error) {
      console.error("error listing data:", error);
      throw error;
    }
  }

  // Method to filter the data list
  filterDataPlants(sun, water, pets) {
    try {
      const plants = this.getPlants();
      const toxicity = /^true$/i.test(pets);

      this.filteredPlants = plants.filter((plant) => {
        return (
          (sun ? plant.sun === sun : true) &&
          (water ? plant.water === water : true) &&
          (pets ? plant.toxicity === toxicity : true)
        );
      });

      return this.filteredPlants;
    } catch (error) {
      console.error("Error filtering plants:", error);
      throw error;
    }
  }
}

// All methods responsible for the DOM
class AppController {
  constructor() {
    this.cardsContainer = document.querySelector(".cards-container");
    this.PlantsController = new PlantsDataController();
  }

  // get all plants list and render
  getAllPlants() {
    const plantsList = this.PlantsController.getPlants();
    plantsList.forEach((plant) => {
      this.render(plant);
    });
  }

  // get filter options from html and check if's null
  getFilterOptions() {
    const sun = document.querySelector("#sunlight").value;
    const water = document.querySelector("#water").value;
    const pets = document.querySelector("#toxicity").value;

    return {
      sun: sun === "null" ? null : sun,
      water: water === "null" ? null : water,
      pets: pets === "null" ? null : pets,
    };
  }

  // get filter options and render it
  filterPlants() {
    const { sun, water, pets } = this.getFilterOptions();
    const filteredList = this.PlantsController.filterDataPlants(
      sun,
      water,
      pets
    );

    if (filteredList.length < 1) {
      this.showResultsCard(false);
      return;
    }

    this.showResultsCard(true);
    this.cardsContainer.innerHTML = "";
    filteredList.forEach((plant) => {
      this.render(plant);
    });
  }

  // render all data on html
  render(data) {
    this.cardsContainer.innerHTML += `
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
  showResultsCard(findResults) {
    const resultsCard = document.querySelector("#find-results");
    const noResultsCard = document.querySelector("#no-results");

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

    if (!findResults) {
      noResultsCard.classList.remove("hide");
      resultsCard.classList.add("hide");
      return;
    }

    this.cardsContainer.innerHTML = "";
    noResultsCard.classList.add("hide");
    resultsCard.classList.remove("hide");
  }

  // Start filters application logic
  startApp() {
    const toxicitySelect = document.querySelector("#toxicity");
    const otherSelects = document.querySelectorAll("select:not(#toxicity)");

    // Check if toxicity value is not null
    toxicitySelect.addEventListener("change", () => {
      if (toxicitySelect.value !== "null") {
        document.querySelector("#sunlight").value = "null";
        document.querySelector("#water").value = "null";
        this.filterPlants();
      }
    });

    // Add change event listeners to other selects
    otherSelects.forEach((select) => {
      select.addEventListener("change", () => {
        toxicitySelect.value = "null";
        this.filterPlants();
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const App = new AppController();
  App.startApp();
  App.getAllPlants();
});
