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
  jump_nimation_Images = [
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
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

  walking_sound = new Audio("audio/walking.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  jump_sound = new Audio("audio/jump.mp3");
  

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.walk_animation_Images);
    this.loadImages(this.idl_animation);
    this.loadImages(this.jump_nimation_Images);
    this.loadImages(this.dead_animation);
    this.loadImages(this.hurt_Animation_Images);
    this.loadImages(this.lazy_animation_Images);
    this.animation();
    this.applyGravity();
    //this.testint();
  }

  testint() {
    setInterval(() => {
      console.log(this.speedY)
    }, 10);
  }

  animation() {
    setInterval(() => {
      this.world.camera_x = -this.x + 100;

      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.lvl.level_end_x &&
        this.HP > 0
      ) {
        this.moveRight();
      }

      if (this.world.keyboard.LEFT && this.x > 0 && this.HP > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround() && this.HP > 0) {
        this.walking_sound.pause();
        this.jump_sound.play();
        this.world.sounds.push(this.jump_sound);
        this.jump();
      }
    }, 1000 / 60);

    this.movement();
  }

  movement() {
    this.movementInt = setInterval(() => {
      if (this.isDead()) {
        this.setFalse();
        this.deadAnimation();
      } else if (this.isHurt() && this.HP > 1) {
        this.setFalse();
        this.playAnimation(this.hurt_Animation_Images);
      } else if (this.isAboveGround()) {
        this.setFalse();
        this.jumpAnimation();
      } else if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && this.HP > 0 && !this.alreadyIdl) {
        this.idlAnimation();
      } else if (this.lazy && !this.alreadyLazy) {
        this.lazyAniamtion();
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.setFalse();
        this.playAnimation(this.walk_animation_Images);
        this.walking_sound.play();
      }
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
        this.walking_sound.pause();
      }
      console.log(this.speedY)
    }, 50);
  }

  deadAnimation() {
    clearInterval(this.movementInt);
    this.speedY = 20;
    this.dead = setInterval(() => {
      this.playAnimation(this.dead_animation);
      this.x -= 10;
    }, 142.85);
    setTimeout(() => {
      clearInterval(this.dead);
    }, 1000);
  }

  jumpAnimation() {
    clearInterval(this.movementInt);
    this.jumpInt = setInterval(() => {
      this.playAnimation(this.jump_nimation_Images);
      if (this.y == 180) {
        clearInterval(this.jumpInt);
        this.movement();
      }
    }, 140);
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
  }
}
