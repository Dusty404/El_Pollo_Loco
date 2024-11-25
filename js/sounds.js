let bgMusic = new Audio('audio/backgroundMusic.mp3');
let win_game_sound = new Audio("audio/victory_sound.mp3");
let walking_sound = new Audio("audio/walking.mp3");
let hurt_sound = new Audio("audio/hurt.mp3");
let jump_sound = new Audio("audio/jump.mp3");
let gameOver_sound = new Audio("audio/dead.mp3");
let chicken_death_sound = new Audio("audio/chicken_death_sound.mp3");
let Small_chicken_death_sound = new Audio("audio/small_chicken_death_sound.mp3");
let bottle_shatter_sound = new Audio("audio/bottle_shatter_sound.mp3");
let afk_sound = new Audio("audio/Sleeping.mp3");
let boss_death_sound = new Audio("audio/boss_death_sound.mp3");
let coin_collect_sound = new Audio("audio/coin_collect_sound.mp3")
let bottle_collect_sound = new Audio("audio/bottle_collect_sound.mp3")
let soundsArr = [walking_sound, hurt_sound, jump_sound, chicken_death_sound, Small_chicken_death_sound, bottle_shatter_sound,
     afk_sound, bottle_collect_sound, coin_collect_sound, boss_death_sound];
let musicArr = [bgMusic];
let soundMute = false;
let musicMute = false;
bgMusic.loop = true;
bgMusic.volume = 0.5;
win_game_sound.volume = 0.1;
coin_collect_sound.volume = 0.1;
afk_sound.volume = 0.1;
chicken_death_sound.volume = 0.2;
Small_chicken_death_sound.volume = 0.4;
bottle_shatter_sound.volume = 0.2;
bottle_collect_sound.volume = 0.5;

function muteSounds() {
    if (soundMute === false) {
        soundsArr.forEach(sound => {
            sound.muted = true;
        });
        soundMute = true;
        document.getElementById('soundImg').src ='img/optionButtons/mute.svg';
    } else if (soundMute === true) {
        soundsArr.forEach(sound => {
            sound.muted = false;
        });
        soundMute = false;
        document.getElementById('soundImg').src ='img/optionButtons/volume-high-solid.svg';
    }
}


function muteMusic() {
    if (musicMute === false) {
        bgMusic.muted = true;
        win_game_sound.muted = true;
        musicMute = true;        
        document.getElementById('musicImg').src ='img/optionButtons/xmark-solid.svg';
    } else if (musicMute === true) {
        bgMusic.muted = false;
        win_game_sound.mute = false;
        musicMute = false;
        document.getElementById('musicImg').src ='img/optionButtons/music-solid.svg';
    }
}


function handleSoundAndMusic() {
    soundsArr.forEach(sound => {
      sound.pause();
    });
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }