class Statusbar extends DrawableObject {

    x = 20;
    y = 20;


    images_HP = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];


    images_Coin = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];


    images_Bottle = [
        'img/7_statusbars/1_statusbar/1_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_bottle/orange/100.png'
    ];

    percentage = 100;


    constructor() {
        super();
        this.percentage = 100;
        this.loadImages(this.images_HP);
        this.loadImages(this.images_Coin);
        this.loadImages(this.images_Bottle);
        this.x = 20;
        this.y = 5;
        this.width = 200;
        this.height = 70;
        this.setPercentage(100);
    };


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_HP[this.resolveIndex()];
        this.img = this.imageCache[path];
    };


    resolveIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if(this.percentage > 80) {
            return 4;
        } else if(this.percentage > 60) {
            return 3;
        } else if(this.percentage > 40) {
            return 2;
        } else if(this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    };

}