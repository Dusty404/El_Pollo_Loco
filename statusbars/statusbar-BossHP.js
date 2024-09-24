class StatusbarBossHP extends Statusbar {

    y = 0;
    x = 300;

    images_BossHP = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];


    constructor() {
        super();
        this.percentage = 100;
        this.loadImages(this.images_BossHP);
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    };


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_BossHP[this.resolveIndex()];
        this.img = this.imageCache[path];
    };
}