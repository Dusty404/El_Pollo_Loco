class ThrowableObject extends MoveableObject {

    x;
    y;
    HP = 1;
    hit = false;

    offset = {
        top: 20,
        bottom: 30,
        left: 20,
        right: 40
    };

    spinSpeed = setInterval(() => {
        this.x += 8
    }, 25);
    


    salsaRotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    bottleBreacks = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.loadImages(this.salsaRotation);
        this.loadImages(this.bottleBreacks);
        this.x = x;
        this.y = y;
        this.HP = 1;
        this.height = 50;
        this.width = 50;
        this.throw(100, 150)
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.spinSpeed;
        if(world.character.otherDirection == true) {
            this.spinSpeed = setInterval(() => {
                this.x -= 16
            }, 25); 
        }
        this.bottleanimation();
    }

    bottleanimation() {
        setInterval(() => {
        if (this.hit === true) {
            this.splashanimation();
        }},50);
        setInterval(() => {
        if (this.hit === false) {
            this.spinanimation();
        }},50);

    }


    splashanimation() {
        this.speedY = 0;
        clearInterval(this.spin);
        clearInterval(this.spinSpeed);
        this.playAnimation(this.bottleBreacks);
    }


    spinanimation() {
        this.playAnimation(this.salsaRotation);
    }
}