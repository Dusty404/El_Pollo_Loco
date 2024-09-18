class ThrowableObject extends MoveableObject {


    salsaRotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.loadImages(this.salsaRotation);
        
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.throw(100, 150)
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10
        }, 25);
        this.bottleanimation();
    }

    bottleanimation() {
        setInterval(() => {
            this.playAnimation(this.salsaRotation);
        }, 50);
    }
}