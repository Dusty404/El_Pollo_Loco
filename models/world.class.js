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
  sounds = soundsArr;
  backgroundMusic = bgMusic;
  showHPBar = false;


  walking_sound = new Audio("audio/walking.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  jump_sound = new Audio("audio/jump.mp3");
  

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.pushSounds();
    this.playBackgroundMusic();
  }


  cheats() {
    world.statusbarBottle.bottle_count = 2000000000000;
    world.character.HP = 200000
  }


  pushSounds() {
    this.sounds.push(this.walking_sound, this.hurt_sound, this.jump_sound);
  }


  playBackgroundMusic() {
    this.backgroundMusic.play();
  }


  stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
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
      this.setBossRelativMapEnd();
      this.playerPushBackByMapend();
    }, 10);
  }


  setBossRelativMapEnd() {
    this.lvl.enemies.forEach((enemie) => {
      if (enemie instanceof Endboss) {
        if (enemie.bossAnimationStart === true) {
          this.lvl.level_end_x = enemie.x;
        }
      }
    });
  }


  playerPushBackByMapend() {
    if (this.character.x > this.lvl.level_end_x) {
      this.character.x - enemie.speedFactor - 1;
    };
  }


  firstmeet() {
    if (this.character.x === 4800 && !this.meet) {
      this.lvl.enemies.forEach((enemie) => {
        if (enemie instanceof Endboss) {
          enemie.meet = true;
          this.meet = true;
          setTimeout(() => {
            this.showHPBar = true;
        }, 6000);  
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
        this.character.isColliding(enemie) && this.character.HP > 0 && enemie instanceof Endboss) {
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
      this.jumpOnEnemie(enemie);
      this.deleteEnemieFromMap(enemie, enemiesToRemove);
    });
    this.deleteEnemie(enemiesToRemove);
  }


  jumpOnEnemie(enemie) {
    if (this.character.isCollidingTop(enemie) && this.character.HP > 0 && this.character.speedY < 0) {
      enemie.HP--;
      this.character.speedY = 20;
      this.character.jumpAnimation();
    };
  }


  deleteEnemieFromMap(enemie, enemiesToRemove) {
    if ((enemie instanceof Chicken || enemie instanceof ChickenSmall) && enemie.HP === 0 && !enemiesToRemove.includes(enemie)) {
      enemiesToRemove.push(enemie);
      clearInterval(enemie.walk);
      clearInterval(enemie.walkanimation);
    };
  }


  deleteEnemie(enemiesToRemove) {
    enemiesToRemove.forEach((enemie) => {
      setTimeout(() => {
        const index = this.lvl.enemies.indexOf(enemie);
        if (index > -1) {
          this.lvl.enemies.splice(index, 1);
        }
      }, 200);
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
          if (enemie.HP > 0 && !enemie.gotHit && enemie.x < 5100) {
            enemie.gotHit = true;
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
    if(this.showHPBar) {
      this.addToMap(this.statusbarBossHP);
    }
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
