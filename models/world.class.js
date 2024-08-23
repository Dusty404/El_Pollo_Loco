class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds =[
       new Cloud(),
    ];
    backgroundObjects = [
        new Backgroundobject('img/5_background/layers/air.png'),
        new Backgroundobject('img/5_background/layers/3_third_layer/1.png'),
        new Backgroundobject('img/5_background/layers/2_second_layer/1.png'),
        new Backgroundobject('img/5_background/layers/1_first_layer/1.png')
    ];
    ctx;
    canvas;
    keyboard;

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

        this.addArrayObjectToMap(this.backgroundObjects);
        this.addArrayObjectToMap(this.clouds);
        this.addArrayObjectToMap(this.enemies);
        this.addToMap(this.character);

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
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    }

}