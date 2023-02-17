const plantData = [
  {
    name: "Euphorbia eritrea",
    sun: "high",
    water: "rarely",
    toxicity: false,
  },
  {
    name: "Succulent Bowl",
    sun: "high",
    water: "rarely",
    toxicity: false,
  },
  {
    name: "Bunny ears cacti",
    sun: "high",
    water: "rarely",
    toxicity: false,
  },
  {
    name: "Ficus lyrata",
    sun: "high",
    water: "regularly",
    toxicity: false,
  },
  {
    name: "Bamboo",
    sun: "low",
    water: "regularly",
    toxicity: false,
  },
  {
    name: "Ponytail Palm",
    sun: "low",
    water: "regularly",
    toxicity: false,
  },
  {
    name: "Pilea peperomioides",
    sun: "no",
    water: "regularly",
    toxicity: true,
  },
  {
    name: "Calathea triostar",
    sun: "no",
    water: "daily",
    toxicity: true,
  },
  {
    name: "Monstera deliciosa",
    sun: "no",
    water: "daily",
    toxicity: true,
  },
];

const sunlightSelect = document.getElementById("sunlight");
const waterSelect = document.getElementById("water");
const petsSelect = document.getElementById("pets");
const plantList = document.getElementById("plant-list");

function updatePlantList() {
  plantList.innerHTML = "";

  const selectedSunlight = sunlightSelect.value;
  const selectedWater = waterSelect.value;
  const selectedPets = petsSelect.value;

  const filteredPlants = plantData.filter((plant) => {
    if (selectedSunlight && plant.sun !== selectedSunlight) {
      return false;
    }
    if (selectedWater && plant.water !== selectedWater) {
      return false;
    }
    if (selectedPets === "true" && plant.toxicity !== false) {
      return false;
    }
    return true;
  });

  filteredPlants.forEach((plant) => {
    const li = document.createElement("li");
    li.textContent = plant.name;
    plantList.appendChild(li);
  });
}

sunlightSelect.addEventListener("change", () => {
  updatePlantList();
});

waterSelect.addEventListener("change", () => {
  updatePlantList();
});

petsSelect.addEventListener("change", () => {
  if (petsSelect.value === "true") {
    const filteredPlants = plantData.filter(
      (plant) => plant.toxicity === false
    );

    sunlightSelect.value = "";
    waterSelect.value = "";

    filteredPlants.forEach((plant) => {
      const li = document.createElement("li");
      li.textContent = plant.name;
      plantList.appendChild(li);
    });
  } else {
    updatePlantList();
  }
});
