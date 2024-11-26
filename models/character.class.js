class Character extends MoveableObject {
  y = 180;
  height = 250;
  width = 150;
  speed = 10;
  HP = 100;
  movementInt;
  jumpInt;
  idlInt;
  dead;
  lazyTimeout;
  alreadyIdl = false;
  lazy = false;
  alreadyLazy = false;
  isMoving = false;

  offset = {
    top: 100,
    bottom: 0,
    left: 20,
    right: 50,
  };

  walk_animation_Images = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  idl_animation = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  jump_animation_Images = [
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
  ];
  dead_animation = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  hurt_Animation_Images = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  lazy_animation_Images = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  world;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.walk_animation_Images);
    this.loadImages(this.idl_animation);
    this.loadImages(this.jump_animation_Images);
    this.loadImages(this.dead_animation);
    this.loadImages(this.hurt_Animation_Images);
    this.loadImages(this.lazy_animation_Images);
    this.animation();
    this.applyGravity();
  }

  stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  animation() {
    setInterval(() => {
      this.world.camera_x = -this.x + 100;
      this.animateGoRight();
      this.animateGoLeft();
      this.animateJump();
    }, 1000 / 60);
    this.movement();
    this.pauseWalkingSoundCheck()
  }

  animateGoRight() {
    if (
      this.world.keyboard.RIGHT &&
      this.x < this.world.lvl.level_end_x &&
      this.HP > 0
    ) {
      this.moveRight();
    }
  }

  animateGoLeft() {
    if (this.world.keyboard.LEFT && this.x > 0 && this.HP > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  animateJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround() && this.HP > 0) {
      walking_sound.pause();
      jump_sound.play();
      this.jump();
    }
  }

  movement() {
    this.movementInt = setInterval(() => {
      if (this.isDead()) {
        this.playDeadAnimation();
      } else if (this.isHurt() && this.HP > 1) {
        this.playHurtAnimation();
      } else if (this.isAboveGround()) {
        this.playJumpAnimation();
      } else if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && this.HP > 0 && !this.alreadyIdl) {
        this.playIdlAnimation();
      } else if (this.lazy && !this.alreadyLazy) {
        this.playLazyAnimation
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.walking();
      }
    }, 50);
  }

  playDeadAnimation() {
    this.setFalse();
    this.deadAnimation();
  }

  playHurtAnimation() {
    this.setFalse();
    this.playAnimation(this.hurt_Animation_Images);
  }

  playJumpAnimation() {
    walking_sound.pause();
    this.setFalse();
    this.jumpAnimation();
  }

  playIdlAnimation() {
    this.idlAnimation();
    this.isMoving = false;
  }

  playLazyAnimation() {
    this.lazyAniamtion();
    afk_sound.play();
  }

  walking() {
    this.setFalse();
    this.isMoving = true;
    this.playAnimation(this.walk_animation_Images);
    walking_sound.play();
  }

  pauseWalkingSoundCheck() {
    setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
        walking_sound.pause();
      }
    }, );
  }

  deadAnimation() {
    handleSoundAndMusic();
    clearInterval(this.movementInt);
    clearInterval(this.jumpInt);
    this.deathAnimation();
    this.endGame();
  }

  deathAnimation() {
    this.speedY = 20;
    this.dead = setInterval(() => {
      this.playAnimation(this.dead_animation);
      this.x -= 10;
    }, 142.85);
  }

  endGame() {
    setTimeout(() => {
      stopGame();
      this.showEndscreen();
      this.playAgain();
      gameOver_sound.play();
    }, 1000);
  }

  jumpAnimation() {
    clearInterval(this.movementInt);
    clearInterval(this.jumpInt);
    this.currentImage = 0;
    this.jumpInt = setInterval(() => {
      if (this.isDead()) {
        clearInterval(this.jumpInt);
        this.movement();
      }
      this.stopJumpAnimationRepeate();
    }, 80);
  }

  stopJumpAnimationRepeate() {
    this.playAnimation(this.jump_animation_Images);
    if (this.currentImage >= this.jump_animation_Images.length) {
      this.currentImage = this.jump_animation_Images.length - 1;
      this.img = this.imageCache[this.jump_animation_Images[this.currentImage]];
      if (this.y == 180) {
        clearInterval(this.jumpInt);
        this.idlAnimation();
        this.movement();
      }
    }
  }

  idlAnimation() {
    this.alreadyIdl = true;
    clearInterval(this.lazyInt);
    this.idlInt = setInterval(() => {
      this.playAnimation(this.idl_animation);
    }, 140);
    if (!this.lazy) {
      this.lazyTimeout = setTimeout(() => {
        this.lazy = true;
      }, 5000);
    }
  }

  lazyAniamtion() {
    clearInterval(this.idlInt);
    this.alreadyLazy = true;
    this.lazyInt = setInterval(() => {
      this.playAnimation(this.lazy_animation_Images);
    }, 140);
  }

  setFalse() {
    this.alreadyIdl = false;
    this.alreadyLazy = false;
    this.lazy = false;
    clearInterval(this.idlInt);
    clearInterval(this.lazyInt);
    clearTimeout(this.lazyTimeout);
    afk_sound.pause();
    afk_sound.currentTime = 0;
  }

  showEndscreen() {
    document.getElementById("endgameImg").src =
      "img/9_intro_outro_screens/game_over/game over.png";
    document.getElementById("endgameImg").classList.remove("d-none");
    document.getElementById("mobileControlles").classList.add("d-none");
  }

  playAgain() {
    document.getElementById("tryAgain").classList.remove("d-none");
    document.getElementById("home").classList.remove("d-none");
  }
}
