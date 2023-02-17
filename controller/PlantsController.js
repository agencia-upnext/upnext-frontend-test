class PlantsController {
  constructor() {
    this.endpoint = "../api/plants.json";
    this.filteredPlants;
  }

  // Method for request data
  async getPlants() {
    try {
      const response = await fetch(this.endpoint);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }

  // Method to filter the data
  async filterPlants(sun, water, pets) {
    try {
      const plants = await this.getPlants();
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
      console.error("Erro ao filtrar plantas:", error);
      throw error;
    }
  }
}

export default new PlantsController();
