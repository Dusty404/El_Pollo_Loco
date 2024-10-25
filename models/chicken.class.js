class Chicken extends MoveableObject {

    y = 345;
    height= 80;
    speed = 0.15 + Math.random() * 1;
    HP = 1;
    walkanimation;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    walk = setInterval(() => {
        this.moveLeft();
    }, 1000 / 60)

    walk_animation_Images = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    chicken_dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];   

    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.HP = 1;
        this.loadImages(this.walk_animation_Images);
        this.loadImages(this.chicken_dead);
        this.animation();
        this.checkdeath();
        this.setChickenPosition();
    }


    animation() {
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


    setChickenPosition() {
        let x = this.setX()
        if(x > 5000) {
            this.x = 5000;
        } else {
            this.x = x;
        }
    }

    setX() {
        return 400 + Math.random() * 4800;
    }
}