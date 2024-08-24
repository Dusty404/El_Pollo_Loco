class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    backgroundMusic = new Audio('audio/backgroundMusic.mp3');

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.playBackgroundMusic();
    }

    playBackgroundMusic() {
        setInterval( () => {
            this.backgroundMusic.play();
        },);
    }
}