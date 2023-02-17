let plantData = [];
let filteredPlants = [];

fetch("plants.json")
  .then((response) => response.json())
  .then((data) => {
    // Itera sobre os objetos no arquivo JSON
    plantData = data;
    data.forEach((plant) => {
      // Extrai as propriedades desejadas
      const imageUrl = plant.url;
      const name = plant.name;
      const price = plant.price;
      const cart = document.createElement("li");

      // Cria uma nova linha na tabela HTML com as informações extraídas
      const row = document.createElement("ul");
      const imageCell = document.createElement("img");
      const nameCell = document.createElement("p");
      const priceCell = document.createElement("p");

      imageCell.src = imageUrl;
      nameCell.innerText = name;
      priceCell.innerText = price;

      cart.appendChild(imageCell);
      cart.appendChild(nameCell);
      cart.appendChild(priceCell);
      row.appendChild(cart);

      row.setAttribute("class", "plant-list");
      document.querySelector("#plantsTable tbody").appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Erro ao buscar o arquivo JSON:", error);
  });

// Filtro ---
const sunlightSelect = document.getElementById("sunlight");
const waterSelect = document.getElementById("water");
const petsSelect = document.getElementById("pets");
const plantList = document.getElementById("plant-list");

function updatePlantList() {
  plantList.innerHTML = "";

  filteredPlants.forEach((plant) => {
    const cart = document.createElement("li");
    const name = plant.name;
    const price = plant.price;
    const imageUrl = plant.url;
    const row = document.createElement("ul");
    const nameCell = document.createElement("p");
    const priceCell = document.createElement("p");
    const imageCell = document.createElement("img");

    nameCell.innerText = name;
    priceCell.innerText = price;
    imageCell.src = imageUrl;

    cart.appendChild(nameCell);
    cart.appendChild(priceCell);
    cart.appendChild(imageCell);
    row.appendChild(cart);

    row.setAttribute("class", "plant-list");
    document.querySelector("#plantsTable tbody").appendChild(row);
  });
}

sunlightSelect.addEventListener("change", () => {
  const selectedSunlight = sunlightSelect.value;
  document.querySelector("#plantsTable tbody").innerHTML = "";
  filteredPlants = plantData.filter((plant) => plant.sun === selectedSunlight);
  updatePlantList();
  petsSelect.value = "";
  waterSelect.value = "";
});

waterSelect.addEventListener("change", () => {
  const selectedWater = waterSelect.value;
  document.querySelector("#plantsTable tbody").innerHTML = "";
  filteredPlants = plantData.filter((plant) => plant.water === selectedWater);
  updatePlantList();
  sunlightSelect.value = "";
  petsSelect.value = "";
});

petsSelect.addEventListener("change", () => {
  const selectedPets = petsSelect.value;
  const selectIsTrue = selectedPets === "true";
  document.querySelector("#plantsTable tbody").innerHTML = "";
  filteredPlants = plantData.filter((plant) => {
    return plant.toxicity !== selectIsTrue;
  });
  updatePlantList();
  sunlightSelect.value = "";
  waterSelect.value = "";
});
