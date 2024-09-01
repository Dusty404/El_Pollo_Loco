class MoveableObject {
    x = 120;
    y = 275;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.5;
    otherDirection = false;
    speedY = 0;
    accelration = 2;
    HP = 1;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelration;
            };
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 180;
    };


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawObjectFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    isDead() {
        return this.HP === 0;
    }


    isColliding(object) {
            return this.x + this.width > object.x &&
                this.y + this.height > object.y &&
                this.x < object.x &&
                this.y < object.y + object.height
        
        /* return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
                (this.y + this.offsetY + this.height) >= obj.y &&
                (this.y + this.offsetY) <= (obj.y + obj.height) && 
                obj.onCollisionCourse; */ // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % this.walk_animation_Images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    jump() {
        this.speedY = 30;
    }

}