import CrudApi from "./CrudApi";

class BreedApi extends CrudApi {
    constructor() {
        super('breeds')
    }
}

export let breeds = new BreedApi();