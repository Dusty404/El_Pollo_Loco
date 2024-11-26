class Bottle extends DrawableObject {

    imageNr;

    offset = {
        top: 20,
        bottom: 30,
        left: 30,
        right: 50
      };

    bottleImages = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    constructor() {
        super();
        this.loadImages(this.bottleImages);
        this.x = 400 + Math.random() * 4400
        this.y = 350;
        this.width = 90;
        this.height = 90;
        this.selectImage();
        this.loadImage(`img/6_salsa_bottle/${this.imageNr}_salsa_bottle_on_ground.png`);
    }


selectImage() {
    this.imageNr = Math.random();
    if(this.imageNr < 0.4) {
        this.imageNr = 1;
    } else {
        this.imageNr = 2
    }
};
}