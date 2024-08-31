class Endboss extends MoveableObject {

    y = 30;
    height = 430;
    width = 250;

    walk_animation_Images = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    constructor() {
        super().loadImage(this.walk_animation_Images[0]);
        this.loadImages(this.walk_animation_Images);
        this.x = 2500;
        this.animate();
    }

    animate(){
        setInterval( () => {
            this.playAnimation(this.walk_animation_Images);
        }, 250);
    }
}