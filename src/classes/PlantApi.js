import CrudApi from "./CrudApi";

class PlantApi extends CrudApi {
  constructor() {
    super("plants");
  }
}

export let plants = new PlantApi();
