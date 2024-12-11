class StatusbarBottle extends Statusbar {
    
    y = 100;

    images_Bottle = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    bottle_count = 0;

    constructor() {
        super();
        this.percentage = 0;
        this.loadImages(this.images_Bottle);
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    };

    /**
    * Sets the percentage of the HP bar and updates the corresponding image.
    * 
    * @param {number} percentage - The percentage to set (0-100).
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_Bottle[this.resolveIndex()];
        this.img = this.imageCache[path];
    };
}