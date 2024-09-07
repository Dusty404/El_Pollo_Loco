class World {

    character = new Character();
    lvl = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusbar = new StatusbarHP();
    statusbarCoins = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    throwableObject = [];

    hurt_sound = new Audio('audio/hurt.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollison();
            this.checkThrowObjects();
        }, 200);
    }


    checkCollison() {
        this.lvl.enemies.forEach((enemie) => {
            if (this.character.isColliding(enemie) && this.character.HP > 0) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.HP);
                this.hurt_sound.play();
                console.log('HP = ', this.character.HP);
            }
        });
    }

    checkThrowObjects() {
        if(this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100)
            this.throwableObject.push(bottle);
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addArrayObjectToMap(this.lvl.backgroundObjects);
        this.addArrayObjectToMap(this.lvl.clouds);
        this.addArrayObjectToMap(this.lvl.enemies);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarBottle);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addArrayObjectToMap(this.throwableObject);

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