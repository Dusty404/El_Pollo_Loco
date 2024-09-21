class Bottle extends CollectableObject {

    offset = {
        top: 20,
        bottom: 30,
        left: 30,
        right: 50
      };

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