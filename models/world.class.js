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
  statusbarBossHP = new StatusbarBossHP();
  throwableObject = [];
  meet = false;

  hurt_sound = new Audio("audio/hurt.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
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
      this.checkCollisonEnemie();
    }, 600);
    setInterval(() => {
      this.checkThrowObjects();
    }, 200);
    setInterval(() => {
      this.checkCollison();
      this.firstmeet();
      this.lvl.enemies.forEach((enemie) => {
        if (enemie instanceof Endboss) {
          if (enemie.bossAnimationStart === true) {
            this.lvl.level_end_x = enemie.x;
          }
        }
      });
      if (this.character.x > this.lvl.level_end_x) {
        this.character.x--;
      }
    }, 10);
  }

  firstmeet() {
    if (this.character.x === 4800 && !this.meet) {
      this.lvl.enemies.forEach((enemie) => {
        if (enemie instanceof Endboss) {
          enemie.meet = true;
          this.meet = true;
          console.log(this.meet, enemie.meet);
        }
      });
    }
  }

  checkCollison() {
    this.checkCollisonCoin();
    this.checkCollisonBottle();
    this.checkCollisionTop();
  }

  checkCollisonEnemie() {
    this.lvl.enemies.forEach((enemie) => {
      if (
        this.character.isColliding(enemie) &&
        this.character.HP > 0 &&
        enemie instanceof Endboss
      ) {
        enemie.attack = true;
        this.character.hit();
        this.statusbar.setPercentage(this.character.HP);
        this.hurt_sound.play();
      } else if (this.character.isColliding(enemie) && this.character.HP > 0 && enemie.HP > 0) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.HP);
        this.hurt_sound.play();
      }
    });
  }


  checkCollisionTop() {
    const enemiesToRemove = [];

    this.lvl.enemies.forEach((enemie) => {
      if (this.character.isCollidingTop(enemie) && this.character.HP > 0 && this.character.speedY < 0) {
        enemie.HP--;
        this.character.speedY = 20;
      }

      if ((enemie instanceof Chicken || enemie instanceof ChickenSmall) && enemie.HP === 0 && !enemiesToRemove.includes(enemie)) {
        enemiesToRemove.push(enemie);
        clearInterval(enemie.walk);
        clearInterval(enemie.walkanimation);
      }
    });

    enemiesToRemove.forEach((enemie) => {
      setTimeout(() => {
        const index = this.lvl.enemies.indexOf(enemie);
        if (index > -1) {
          this.lvl.enemies.splice(index, 1);
        }
      }, 100);
    });
  }

  checkCollisonEnemieAndBottle() {
    const enemiesToRemove = [];

    this.lvl.enemies.forEach((enemie) => {
      for (let i = 0; i < this.throwableObject.length; i++) {
        const bottle = this.throwableObject[i];
        if (bottle.hit) continue;
        if (bottle.isColliding(enemie) && enemie instanceof Endboss) {
          bottle.hit = true;
          if (enemie.HP > 0 && !enemie.gotHit && enemie.x < 5000) {
            enemie.gotHit = true;
            console.log(enemie.gotHit);
            enemie.HP--;
            this.statusbarBossHP.setPercentage(enemie.HP * 20);
          }
          setTimeout(() => {
            this.throwableObject.splice(i, 1);
          }, 100);
          if (enemie.HP === 0 && !enemiesToRemove.includes(enemie)) {
            enemiesToRemove.push(enemie);
            clearInterval(enemie.walk);
            clearInterval(enemie.walkanimation);
          }
        } else if (bottle.isColliding(enemie)) {
          bottle.hit = true;
          if (enemie.HP > 0 && !enemie.gotHit) {
            enemie.gotHit = true;
            console.log(enemie.gotHit);
            enemie.HP--;
          } else if (enemie.HP > 0) {
            enemie.HP--;
          }
          setTimeout(() => {
            this.throwableObject.splice(i, 1);
          }, 100);

          if (enemie.HP === 0 && !enemiesToRemove.includes(enemie)) {
            enemiesToRemove.push(enemie);
            clearInterval(enemie.walk);
            clearInterval(enemie.walkanimation);
          }
        }
      }
    });

    enemiesToRemove.forEach((enemie) => {
      const delay = enemie instanceof Endboss ? 3000 : 1000;

      setTimeout(() => {
        const index = this.lvl.enemies.indexOf(enemie);
        if (index > -1) {
          this.lvl.enemies.splice(index, 1);
          console.log("Gegner entfernt:", enemie);
        }
      }, delay);
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

    coinsToRemove.reverse().forEach((index) => {
      this.lvl.coins.splice(index, 1);
    });
  }

  checkCollisonBottle() {
    const bottlesToRemove = [];
    this.lvl.bottles.forEach((bottle, index) => {
      if (
        this.character.isColliding(bottle) &&
        this.statusbarBottle.bottle_count < 5
      ) {
        this.statusbarBottle.bottle_count++;
        this.statusbarBottle.setPercentage(
          this.statusbarBottle.bottle_count * 20
        );
        bottlesToRemove.push(index);
      }
    });

    bottlesToRemove.reverse().forEach((index) => {
      this.lvl.bottles.splice(index, 1);
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.statusbarBottle.bottle_count > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 100
      );
      this.throwableObject.push(bottle);
      this.statusbarBottle.bottle_count--;
      this.statusbarBottle.setPercentage(
        this.statusbarBottle.bottle_count * 20
      );

      setInterval(() => {
        this.checkCollisonEnemieAndBottle();
      }, 10);
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
    this.addToMap(this.statusbarBossHP);
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
    ao.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }

    object.draw(this.ctx);
    //object.drawObjectFrame(this.ctx);

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
