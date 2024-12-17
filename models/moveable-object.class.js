class MoveableObject extends DrawableObject {

    speed = 0.5;
    otherDirection = false;
    speedY = 0;
    accelration = 2;
    HP = 1;
    lastHit = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
    * Applies gravity to the character by updating the vertical position (`y`) 
    * and adjusting the vertical speed (`speedY`), simulating gravity's pull.
    * If the character reaches the ground, it is reset to a y-position of 180 and speedY is set to 0.
    * This method runs periodically to apply the gravity effect.
    */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelration;
                if (this.y > 180 && world.character.HP > 0 && this instanceof Character) {
                    this.y = 180;
                    this.speedY = 0;
                } else if (this.y > 345 && this instanceof Chicken) {
                    this.y = 345;
                    this.speedY = 0;
                }
            };
        }, 30);
    }

    /**
     * Checks whether the character is above the ground.
     * For throwable objects or if the character's HP is 0, it always returns true.
     * Otherwise, it returns true if the character's y-position is above 180.
     * @returns {boolean} True if the character is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject || world.character.HP == 0) {
            return true;
        } else if (this instanceof Character) {
            return this.y < 180;
        } else if (this instanceof Chicken) {
            return this.y < 345;
        }
    }

    /**
     * Checks if the character is dead.
     * A character is considered dead if their HP is 0.
     * @returns {boolean} True if the character is dead, false otherwise.
     */
    isDead() {
        return this.HP == 0;
    }

    /**
     * Checks if the character was recently hurt.
     * The method checks if the character's last hit occurred less than 1 second ago.
     * @returns {boolean} True if the character is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Plays the character's death animation if the character is dead.
     * This method triggers the death animation based on the character's state.
     */
    characterDeathAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.dead_animation);
        }
    }

    /**
     * Reduces the character's HP by 20 when hit. If the HP goes below 0, it is set to 0.
     * The method also records the time of the hit, which is used to track if the character was recently hit.
     */
    hit() {
        this.HP -= 20;
        if (this.HP < 0) {
            this.HP = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the character is colliding with another object.
     * This method compares the bounding box of the character and the given object 
     * to detect if their rectangles overlap.
     * @param {Object} object The object to check collision with.
     * @returns {boolean} True if the character is colliding with the object, false otherwise.
     */
    isColliding(object) {
        const objectTop = object.y + object.offset.top;
        const objectBottom = object.y + object.height - object.offset.bottom;
        const playerBottom = this.y + this.height - this.offset.bottom;
        const playerTop = this.y + this.offset.top;

        return (this.x + this.width - this.offset.right) > (object.x + object.offset.left) &&
            playerBottom > objectTop &&
            (this.x + this.offset.left) < (object.x + object.width - object.offset.right) &&
            (playerTop < objectBottom);
    }

    /**
     * Checks if the character is colliding with the top of an object.
     * This method checks if the character's bottom edge is just above the top edge of the object,
     * with an optional threshold to improve the collision detection.
     * @param {Object} object The object to check collision with.
     * @returns {boolean} True if the character is colliding with the top of the object, false otherwise.
     */
    isCollidingTop(object) {
        const objectTop = object.y + object.offset.top;
        const playerBottom = this.y + this.height - this.offset.bottom;
        return (this.x + this.width - this.offset.right) > (object.x + object.offset.left) &&
            playerBottom > objectTop && // Unterkante des Spielers ist unter der Oberkante des Objekts
            (this.x + this.offset.left) < (object.x + object.width - object.offset.right) &&
            playerBottom <= objectTop + 20; // Optionaler Schwellenwert für eine bessere Kollision
    }

    /**
     * Moves the character to the right by updating the x-position.
     * The method also sets `otherDirection` to false, indicating the direction the character is facing.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the character to the left by updating the x-position.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates the jump by setting the vertical speed (`speedY`) to a positive value.
     * This makes the character start moving upwards, simulating a jump.
     */
    jump() {
        this.speedY = 30;
    }


}