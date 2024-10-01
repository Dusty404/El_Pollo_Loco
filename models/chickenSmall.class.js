class ChickenSmall extends MoveableObject {

    y = 365;
    height = 60;
    width = 60;
    speed = 0.15 + Math.random() * 1;
    HP = 1;
    walkanimation;

    offset = {
        top: 5,
        bottom: 10,
        left: 10,
        right: 20
    };

    walk = setInterval(() => {
        this.moveLeft();
    }, 1000 / 60)

    walk_animation_Images = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    chicken_dead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    chicken_sound = new Audio('audio/chicken.mp3')
    
    

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.HP = 1;
        this.x = 500 + 100 + Math.random() * 500;
        this.loadImages(this.walk_animation_Images);
        this.loadImages(this.chicken_dead);
        
        this.animation();
        this.checkdeath();
    }


    animation() {
        setInterval( () => {
            this.chicken_sound.play();
        }, 2000);

        this.walkanimation = setInterval( () => {
            this.playAnimation(this.walk_animation_Images);
        }, 150);
    }

    checkdeath() {
        setInterval(() => {
        if (this.isDead()) {
            this.loadImage(this.chicken_dead);
        }
        }, 10)
    }
}