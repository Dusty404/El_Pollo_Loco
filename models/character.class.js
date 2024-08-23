class Character extends MoveableObject {

    y = 180;
    height = 250;
    width = 150;
    walk_animation = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walk_animation)
        this.animation();
        
    }


    animation() {
        if (this.world.keyboard.RIGHT) {
            setInterval( () => {
                let i = this.currentImage % this.walk_animation.length;
                let path = this.walk_animation[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }, 1000 / 4);
        }
    }



    jump() {

    }
}