class Game {
  constructor(growth_speed = 1, water_drop_speed = 1, game_speed = 1000) {
    this.growth_speed = growth_speed;
    this.water_drop_speed = water_drop_speed;
    this.game_speed = game_speed;
  }
}

export let game = new Game();
