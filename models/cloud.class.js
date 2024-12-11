class Cloud extends MoveableObject {
    y = 0;
    height = 400;
    width = 720;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = x;
        this.animate();
    }

    /**
    * Resets the position of the object when it moves out of bounds.
    * If the horizontal position (`x`) is less than `-719`, it resets the position to `719 * 8`.
    */
    resetPosition() {
        if (this.x < -719) {
            this.x = 719 * 8;
        }
    }

    /**
     * Animates the object by moving it to the left at regular intervals.
     * Calls the `moveLeft` method to update the position and ensures the position is reset using `resetPosition` when needed.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            this.resetPosition();
        }, 50);
    }

}