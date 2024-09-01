class World {

    character = new Character();
    lvl = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    hurt_sound = new Audio('audio/hurt.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollison();
    }


    setWorld() {
        this.character.world = this;
    }
    

    checkCollison() {
        setInterval(() => {
            this.lvl.enemies.forEach((enemie) => {
                if (this.character.isColliding(enemie) && this.character.HP > 0) {
                    this.character.HP -= 1;
                    this.hurt_sound.play();
                    console.log('HP = ', this.character.HP);
                }
            });
        }, 1000);
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addArrayObjectToMap(this.lvl.backgroundObjects);
        this.addArrayObjectToMap(this.lvl.clouds);
        this.addArrayObjectToMap(this.lvl.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addArrayObjectToMap(ao) {
        ao.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(object) {

        if (object.otherDirection) {
            this.flipImage(object);
        }

        object.draw(this.ctx);
        object.drawObjectFrame(this.ctx);


        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }


    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }


    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

}