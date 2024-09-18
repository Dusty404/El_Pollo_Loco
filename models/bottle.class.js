class Bottle extends CollectableObject {

    bottleImages = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.bottleImages);
        this.x = 200 + Math.random() * 3000;
        this.y = 350;
        this.width = 90;
        this.height = 90;
    }
}