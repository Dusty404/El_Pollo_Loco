class StatusbarHP extends Statusbar {

    y = 0;

    images_HP = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];


    constructor() {
        super();
        this.percentage = 100;
        this.loadImages(this.images_HP);
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    };


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_HP[this.resolveIndex()];
        this.img = this.imageCache[path];
    };
}