let bgMusic = new Audio('audio/backgroundMusic.mp3');
let win_game_sound = new Audio("audio/victory_sound.mp3")
let soundsArr = [];
let musicArr = [bgMusic];
let soundMute = false;
let musicMute = false;
bgMusic.loop = true;
win_game_sound.volume = 0.2;

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
        win_game_sound.mute = true;
        musicMute = true;        
        document.getElementById('musicImg').src ='img/optionButtons/xmark-solid.svg';
    } else if (musicMute === true) {
        bgMusic.muted = false;
        win_game_sound.mute = false;
        musicMute = false;
        document.getElementById('musicImg').src ='img/optionButtons/music-solid.svg';
    }
}