class Coin extends CollectableObject {


    coinImages = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.coinImages);
        this.coinAnimation();
        this.x = Math.random() * 900 + 60;
        this.y = Math.random() * 200;
        this.width = 150;
        this.height = 150;
    }


    coinAnimation() {
        setInterval(() => {
            this.playAnimation(this.coinImages);
        }, 600);
    }
}