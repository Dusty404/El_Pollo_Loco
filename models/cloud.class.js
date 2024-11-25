class Cloud extends MoveableObject {
    y = 0;
    height = 400;
    width = 720;


    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = x;
        this.animate();
    }


    resetPosition() {
        if(this.x < -719) {
            this.x = 719 * 8
        }
    }
    
    
    animate(){
        setInterval(() => {
            this.moveLeft();
            this.resetPosition()
        }, 50);
    }    
}