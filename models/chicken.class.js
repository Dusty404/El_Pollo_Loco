class Chicken extends MoveableObject {

    y = 345;
    height= 80;
    speed = 0.15 + Math.random() * 1;
    walk_animation_Images = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    chicken_sound = new Audio('audio/chicken.mp3')
    
    

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + 100 + Math.random() * 500;
        this.loadImages(this.walk_animation_Images);
        
        this.animation();
    }


    animation() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
        
        
        setInterval( () => {
            this.chicken_sound.play();
        }, 2000);

        setInterval( () => {
            this.playAnimation(this.walk_animation_Images);
        }, 150);
    }
}