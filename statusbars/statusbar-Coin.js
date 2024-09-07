class StatusbarCoin extends Statusbar {
    y = 50;

    images_Coin = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];


    constructor() {
        super();
        this.percentage = 0;
        this.loadImages(this.images_Coin);
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    };


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_Coin[this.resolveIndex()];
        this.img = this.imageCache[path];
    };

}