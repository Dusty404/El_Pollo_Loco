class Bottle extends DrawableObject {

    imageNr;

    offset = {
        top: 20,
        bottom: 30,
        left: 30,
        right: 50
    };

    /**
     * Array of bottle images to choose from.
     * @type {string[]}
     */
    bottleImages = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Constructor for the Bottle class.
     * Randomly positions the bottle, selects an image, and initializes the object.
     */
    constructor() {
        super();
        this.loadImages(this.bottleImages);
        this.x = 400 + Math.random() * 4400;
        this.y = 350;
        this.width = 90;
        this.height = 90;
        this.selectImage();
        this.loadImage(this.bottleImages[this.imageNr - 1]);
    }

    /**
     * Selects an image for the bottle randomly.
     * Sets `imageNr` to 1 or 2 based on a probability threshold.
     */
    selectImage() {
        this.imageNr = Math.random() < 0.4 ? 1 : 2;
    }
}