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
  enemiesToRemove = [];
  hitCD = false;


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.playBackgroundMusic();
  }


  cheats() {
    world.statusbarBottle.bottle_count = 2000000000000;
    world.character.HP = 200000
  }


  playBackgroundMusic() {
    this.backgroundMusic.play();
  }


  setWorld() {
    this.character.world = this;
  }
  
  run() {
    setInterval(() => {
      this.checkCollisonEnemie();
    }, );
    setInterval(() => {
      this.checkThrowObjects();
    }, 200);
    setInterval(() => {
      this.checkCollison();
      this.firstmeet();
      this.setBossRelativMapEnd();
      this.playerPushBackByMapend();
    }, );
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
      if (this.character.isColliding(enemie) && this.character.HP > 0 && enemie instanceof Endboss && !this.hitCD) {
        enemie.attack = true;
        this.gotHitByEnemie(enemie);
      } else if (this.character.isColliding(enemie) && this.character.HP > 0 && enemie.HP > 0 &&
                !this.hitCD && !this.character.isCollidingTop(enemie)) {
        this.gotHitByEnemie();
      }
    });
  }


  gotHitByEnemie() {
    this.hitCD = true;
    this.character.hit();
    this.statusbar.setPercentage(this.character.HP);
    hurt_sound.play();
    setTimeout(() => {
      this.hitCD = false;
    }, 600);
  }


  checkCollisionTop() {
    this.lvl.enemies.forEach((enemie) => {
      this.jumpOnEnemie(enemie);
      this.deleteChickenFromMap(enemie);
    });
    this.deleteEnemie();
  }


  jumpOnEnemie(enemie) {
    if (this.character.isCollidingTop(enemie) && this.character.HP > 0 && this.character.speedY < 0) {
      enemie.HP--;
      this.playDeathSound(enemie);
      this.character.speedY = 20;
      this.character.jumpAnimation();
    };
  }


  deleteChickenFromMap(enemie) {
    if ((enemie instanceof Chicken || enemie instanceof ChickenSmall) && enemie.HP === 0 && !this.enemiesToRemove.includes(enemie)) {
      this.enemiesToRemove.push(enemie);
      clearInterval(enemie.walk);
      clearInterval(enemie.walkanimation);
    };
  }


  deleteEnemie() {
    this.enemiesToRemove.forEach((enemie) => {
      const delay = enemie instanceof Endboss ? 3000 : 200;
      setTimeout(() => {
        const index = this.lvl.enemies.indexOf(enemie);
        if (index > -1) {
          this.lvl.enemies.splice(index, 1);
        }
      }, delay);
    });
  }


  checkCollisonEnemieAndBottle() {
    this.lvl.enemies.forEach((enemie) => {
      this.handleBottleCollisionEnemie(enemie);
    });
    this.deleteEnemie();
  }


  handleBottleCollisionEnemie(enemie) {
    for (let i = 0; i < this.throwableObject.length; i++) {
      const bottle = this.throwableObject[i];
      if (bottle.hit) continue;
      if (bottle.isColliding(enemie) && enemie instanceof Endboss) {
        this.bossBottleHit(i, enemie, bottle);
        bottle_shatter_sound.play();
      } else if (bottle.isColliding(enemie)) {
        this.playDeathSound(enemie);
        this.chickenBottleHit(i, enemie, bottle);
        this.deleteChickenFromMap(enemie);
        bottle_shatter_sound.play();
      } else if (bottle.y > 400) {
        bottle.hit = true;
        bottle_shatter_sound.play();
        setTimeout(() => {
          this.throwableObject.splice(i, 1);
        }, 100);
      }
    }
  }


  deleteEnemieFromMap(enemie) {
    if (enemie.HP === 0 && !this.enemiesToRemove.includes(enemie)) {
    this.enemiesToRemove.push(enemie);
    clearInterval(enemie.walk);
    clearInterval(enemie.walkanimation);
    }
  }


  chickenBottleHit(i, enemie, bottle) {
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
  }


  bossBottleHit(i, enemie ,bottle) {
    bottle.hit = true;
    if (enemie.HP > 0 && !enemie.gotHit && enemie.x < 5100) {
      enemie.gotHit = true;
      enemie.HP--;
      chicken_death_sound.play();
      this.statusbarBossHP.setPercentage(enemie.HP * 20);
    }
    setTimeout(() => {
      this.throwableObject.splice(i, 1);
    }, 100);
    this.deleteEnemieFromMap(enemie);
  }


  checkCollisonCoin() {
    const coinsToRemove = [];
    this.lvl.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && this.statusbarCoins.coins < 5) {
        coin_collect_sound.play();
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
      if (this.character.isColliding(bottle) && this.statusbarBottle.bottle_count < 5) {
        bottle_collect_sound.play();
        this.statusbarBottle.bottle_count++;
        this.statusbarBottle.setPercentage(this.statusbarBottle.bottle_count * 20);
        bottlesToRemove.push(index);
      }
    });
    bottlesToRemove.reverse().forEach((index) => {
      this.lvl.bottles.splice(index, 1);
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.statusbarBottle.bottle_count > 0) {
      let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
      this.throwableObject.push(bottle);
      this.statusbarBottle.bottle_count--;
      this.statusbarBottle.setPercentage(this.statusbarBottle.bottle_count * 20);
      setInterval(() => {
        this.checkCollisonEnemieAndBottle();
      }, 10);
    }
  }


  playDeathSound(enemie) {
    if (enemie instanceof Chicken) {
      chicken_death_sound.play();
    } else if (enemie instanceof ChickenSmall) {
      Small_chicken_death_sound.play();
    };
  }


  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawWorld();
    this.drawStatusBars();
    this.drawCharacterAndBottles();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }


  drawWorld() {
    this.ctx.translate(this.camera_x, 0);
    this.addArrayObjectToMap(this.lvl.backgroundObjects);
    this.addArrayObjectToMap(this.lvl.clouds);
    this.addArrayObjectToMap(this.lvl.enemies);
    this.addArrayObjectToMap(this.lvl.coins);
    this.addArrayObjectToMap(this.lvl.bottles);
    this.ctx.translate(-this.camera_x, 0);
  }


  drawStatusBars() {
    this.addToMap(this.statusbar);
    this.addToMap(this.statusbarCoins);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarBottle);
    if(this.showHPBar) {
      this.addToMap(this.statusbarBossHP);
    }
  }


  drawCharacterAndBottles() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addArrayObjectToMap(this.throwableObject);
    this.ctx.translate(-this.camera_x, 0);
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


  playAgain() {
    document.getElementById('tryAgain').classList.remove('d-none');
  }
}