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
    emptyCoin = new Emptycoin();


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
        this.checkCollisonEnemie();
        this.checkCollisonCoin();
        this.checkCollisonBottle();
    }


    checkCollisonEnemie() {
        this.lvl.enemies.forEach((enemie) => {
            if (this.character.isColliding(enemie) && this.character.HP > 0) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.HP);
                this.hurt_sound.play();
            }
        });  
    }


    checkCollisonEnemieAndBottle() {
        this.lvl.enemies.forEach((enemie, index) => {
            const enemieToRemove = [];
            if (this.throwableObject.isColliding(enemie)) {
                enemieToRemove.push(index);
            }
        });  

        enemiesToRemove.reverse().forEach(index => {
            this.lvl.enemies.splice(index, 1);
        });
    }


    checkCollisonCoin() {
        const coinsToRemove = [];
        this.lvl.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && this.statusbarCoins.coins < 5) {
                this.statusbarCoins.coins++;
                this.statusbarCoins.setPercentage(this.statusbarCoins.coins * 20);                
                coinsToRemove.push(index);
            }
        });
    
        coinsToRemove.reverse().forEach(index => {
            this.lvl.coins.splice(index, 1);
        });
    }


    checkCollisonBottle() {
        const bottlesToRemove = [];
        this.lvl.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.statusbarBottle.bottle_count < 5) {
                this.statusbarBottle.bottle_count++
                this.statusbarBottle.setPercentage(this.statusbarBottle.bottle_count * 20);
                bottlesToRemove.push(index);
            }
        });


        bottlesToRemove.reverse().forEach(index => {
            this.lvl.bottles.splice(index, 1);
        });
    }


    checkThrowObjects() {
        if(this.keyboard.D && this.statusbarBottle.bottle_count > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100)
            this.throwableObject.push(bottle);
            this.statusbarBottle.bottle_count--
            this.statusbarBottle.setPercentage(this.statusbarBottle.bottle_count * 20);
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addArrayObjectToMap(this.lvl.backgroundObjects);
        this.addArrayObjectToMap(this.lvl.clouds);
        this.addArrayObjectToMap(this.lvl.enemies);
        this.addArrayObjectToMap(this.lvl.coins);
        this.addArrayObjectToMap(this.lvl.bottles);

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