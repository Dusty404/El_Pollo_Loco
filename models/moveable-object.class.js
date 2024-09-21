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
            };
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
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
            return  (this.x + this.width - this.offset.right) > (object.x + object.offset.left) && 
                    (this.y + this.height - this.offset.bottom) > (object.y + object.offset.top) &&
                    (this.x + this.offset.left) < (object.x + object.width - object.offset.right) &&
                    (this.y + this.offset.top) < (object.y + object.height - object.offset.bottom);
        
        /* return (this.x + this.width) >= object.x && this.x <= (object.x + object.width) && 
                (this.y + this.offsetY + this.height) >= object.y &&
                (this.y + this.offsetY) <= (object.y + object.height) && 
                object.onCollisionCourse; */ // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
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