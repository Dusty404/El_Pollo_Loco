class World {

    character = new Character();
    lvl = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
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
        requestAnimationFrame(function() {
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
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.x = object.x * -1;
        }
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if (object.otherDirection) {
            object.x = object.x * -1;
            this.ctx.restore();
        }
    }

}