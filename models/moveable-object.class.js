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


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelration;
                if (this instanceof Character && this.y > 180 && world.character.HP > 0) {
                    this.y = 180;
                    this.speedY = 0;
                }
            };
        }, 30  );
    }
    


    isAboveGround() {
        if (this instanceof ThrowableObject || world.character.HP == 0) {
            return true;
        } else {
            return this.y < 180;
        }
    };


    isDead() {
        return this.HP == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    
    characterDeathAnimation() {
        if(this.isDead()) {
            this.playAnimation(this.dead_animation);
        }
    }


    hit() {
        this.HP -= 20;
        if(this.HP < 0) {
            this.HP = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


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


    isCollidingTop(object) {
        const objectTop = object.y + object.offset.top; 
        const playerBottom = this.y + this.height - this.offset.bottom;
    return (this.x + this.width - this.offset.right) > (object.x + object.offset.left) && 
           playerBottom > objectTop && // Unterkante des Spielers ist unter der Oberkante des Objekts
           (this.x + this.offset.left) < (object.x + object.width - object.offset.right) &&
           playerBottom <= objectTop + 10; // Optionaler Schwellenwert für eine bessere Kollision
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
    }

}