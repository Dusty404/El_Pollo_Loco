class Chicken extends MoveableObject {

    y = 345;
    height = 80;
    speed = 0.15 + Math.random() * 1;
    randomTime;
    HP = 1;
    walkanimation;
    jumpTimer = this.randomTime + 2000;

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
        this.applyGravity();
        this.chickenJump();
        this.setTimer();
    }

    /**
     * Starts the animation loop for the character's walking animation.
     * The animation changes the character's image at regular intervals.
     */
    animation() {
        this.walkanimation = setInterval(() => {
            this.playAnimation(this.walk_animation_Images);
        }, 150);
    }

    /**
     * Periodically checks if the character is dead.
     * If dead, the character's image is updated to a dead chicken image.
     */
    checkdeath() {
        setInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.chicken_dead);
            }
        }, 10);
    }

    /**
     * Sets the chicken's horizontal position.
     * If the calculated position exceeds 5000, it is capped at 5000.
     */
    setChickenPosition() {
        let x = this.setX();
        if (x > 5000) {
            this.x = 5000;
        } else {
            this.x = x;
        }
    }

    /**
     * Generates a random horizontal position for the chicken.
     * The position is a random value between 400 and 5200.
     * @returns {number} A random horizontal position for the chicken.
     */
    setX() {
        return 400 + Math.random() * 4800;
    }

    /**
     * Sets a random time interval for the chicken's jump.
     * The random time is generated between 0 and 4000 milliseconds.
     * 
     */
    setTimer() {
        this.randomTime = Math.random() * 4000;
    }

    /**
     * Initiates a periodic jump action for the chicken.
     * The chicken jumps at a random time interval and repeats every 2000 milliseconds.
     * 
     */
    chickenJump() {
        setInterval(() => {
            let jumpInt = setInterval(() => {
                this.speedY = 20; // Sets upward speed for the jump.
                clearInterval(jumpInt);
            }, this.randomTime);
        }, 2000);
    }
}