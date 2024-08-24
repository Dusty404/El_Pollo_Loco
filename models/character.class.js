class Character extends MoveableObject {
  y = 180;
  height = 250;
  width = 150;
  speed = 10;
  walk_animation = [
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
  world;

  walking_sound = new Audio('audio/walking.mp3');

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.walk_animation);
    this.animation();
  }

  animation() {
    setInterval(() => {
      this.world.camera_x = -this.x + 100;
      if (this.world.keyboard.RIGHT && this.x < this.world.lvl.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
    
      
    }, 1000 / 60);

    setInterval(() => {

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.walk_animation.length;
        let path = this.walk_animation[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        this.walking_sound.play();
      } else {
        this.walking_sound.pause();
      }
  
      
    }, 50);
    
  }

  jump() {}
}
