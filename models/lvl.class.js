class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 4800;
    backgroundMusic = new Audio('audio/backgroundMusic.mp3');

    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        //this.playBackgroundMusic();
    }

   /* playBackgroundMusic() {
        setInterval( () => {
            this.backgroundMusic.play();
        },);
    } */
}