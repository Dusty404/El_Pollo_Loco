let level1;

function startLvl() {
  level1 = new Level(
    /**
     * Array of enemies for the level, including chickens, small chickens, and the end boss.
     * @type {Array<Chicken|ChickenSmall|Endboss>}
     */
    [
      new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
      new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
      new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), 
      new ChickenSmall(), new ChickenSmall(), new ChickenSmall(),
      new Endboss()
    ],
    /**
     * Array of clouds in the level for the parallax background.
     * @type {Array<Cloud>}
     */
    [
      new Cloud(0), new Cloud(719), new Cloud(719 * 2), new Cloud(719 * 3),
      new Cloud(719 * 4), new Cloud(719 * 5), new Cloud(719 * 6), 
      new Cloud(719 * 7), new Cloud(719 * 8)
    ],
    /**
     * Array of background objects for the level, including multiple layers for parallax scrolling.
     * Each object represents a background layer image at a specific position.
     * @type {Array<Backgroundobject>}
     */
    [
      new Backgroundobject("img/5_background/layers/air.png", -719 * 2),
      new Backgroundobject("img/5_background/layers/3_third_layer/1.png", -719 * 2),
      new Backgroundobject("img/5_background/layers/2_second_layer/1.png", -719 * 2),
      new Backgroundobject("img/5_background/layers/1_first_layer/1.png", -719 * 2),
      new Backgroundobject("img/5_background/layers/air.png", -719),
      new Backgroundobject("img/5_background/layers/3_third_layer/2.png", -719),
      new Backgroundobject("img/5_background/layers/2_second_layer/2.png", -719),
      new Backgroundobject("img/5_background/layers/1_first_layer/2.png", -719),

      new Backgroundobject("img/5_background/layers/air.png", 0),
      new Backgroundobject("img/5_background/layers/3_third_layer/1.png", 0),
      new Backgroundobject("img/5_background/layers/2_second_layer/1.png", 0),
      new Backgroundobject("img/5_background/layers/1_first_layer/1.png", 0),
      new Backgroundobject("img/5_background/layers/air.png", 719),
      new Backgroundobject("img/5_background/layers/3_third_layer/2.png", 719),
      new Backgroundobject("img/5_background/layers/2_second_layer/2.png", 719),
      new Backgroundobject("img/5_background/layers/1_first_layer/2.png", 719),

      new Backgroundobject("img/5_background/layers/air.png", 719 * 2),
      new Backgroundobject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new Backgroundobject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new Backgroundobject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
      new Backgroundobject("img/5_background/layers/air.png", 719 * 3),
      new Backgroundobject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new Backgroundobject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new Backgroundobject("img/5_background/layers/1_first_layer/2.png", 719 * 3),

      new Backgroundobject("img/5_background/layers/air.png", 719 * 4),
      new Backgroundobject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
      new Backgroundobject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
      new Backgroundobject("img/5_background/layers/1_first_layer/1.png", 719 * 4),
      new Backgroundobject("img/5_background/layers/air.png", 719 * 5),
      new Backgroundobject("img/5_background/layers/3_third_layer/2.png", 719 * 5),
      new Backgroundobject("img/5_background/layers/2_second_layer/2.png", 719 * 5),
      new Backgroundobject("img/5_background/layers/1_first_layer/2.png", 719 * 5),

      new Backgroundobject("img/5_background/layers/air.png", 719 * 6),
      new Backgroundobject("img/5_background/layers/3_third_layer/1.png", 719 * 6),
      new Backgroundobject("img/5_background/layers/2_second_layer/1.png", 719 * 6),
      new Backgroundobject("img/5_background/layers/1_first_layer/1.png", 719 * 6),
      new Backgroundobject("img/5_background/layers/air.png", 719 * 7),
      new Backgroundobject("img/5_background/layers/3_third_layer/2.png", 719 * 7),
      new Backgroundobject("img/5_background/layers/2_second_layer/2.png", 719 * 7),
      new Backgroundobject("img/5_background/layers/1_first_layer/2.png", 719 * 7)
    ],
    /**
     * Array of coins available in the level.
     * @type {Array<Coin>}
     */
    [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
    /**
     * Array of bottles available in the level.
     * @type {Array<Bottle>}
     */
    [
      new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),
      new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),
      new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),
      new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),
      new Bottle(), new Bottle()
    ]
  );
}
