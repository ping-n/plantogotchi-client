class Config {
  constructor(growth_speed = 1, water_drop = 1) {
    this.growth_speed = growth_speed;
    this.water_drop = water_drop;
  }
}

class Breed {
  constructor(name, max_growth) {
    this.name = name;
    this.max_growth = max_growth;
  }
}

class Plant {
  constructor(
    name,
    water_level = 100,
    alive = true,
    growth_stage = 0,
    god_mode = false
  ) {
    this.name = name;
    this.water_level = water_level;
    this.alive = alive;
    this.growth_stage = growth_stage;
    this.god_mode = god_mode;
  }

  grow = () => {
    return (this.growth_stage += 1);
  };

  dropWaterLevel = () => {
    return (this.water_level -= 1);
  };

  changePlantState = () => {
    if (this.water_level === 0) {
      this.alive = false;
    }
  };

  fullyGrown = (breed) => {
    if (this.growth_stage === breed.max_growth) {
      //set everything to max?
      this.god_mode = true;
      return "I have entered god mode";
    }
  };

  deadPlant = () => {
    if (this.water_level === 0) {
      this.alive = false;
      return "Dead Plant";
    }
  };
}

const config = new Config();

const test = new Plant("plant1");

const breed = new Breed("Breed1", 25);

let sec = 0;
let controlTime = 100

let time = setInterval(() => {
  if (sec % config.water_drop === 0) {
    test.dropWaterLevel();
    console.log(test);
  }
  if (sec % config.growth_speed === 0 && test.water_level >= 50) {
    test.grow();
    console.log(test);
  }
  test.fullyGrown(breed);
  test.deadPlant()
  if (!test.alive || test.god_mode) {
    console.log("plant entered god mode")
    clearInterval(time);
  }
  sec += 1;
  console.log(sec);
}, controlTime);
