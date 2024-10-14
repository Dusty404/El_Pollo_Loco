let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;


function init() {
    startLvl();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileControlls();
    showgame();
}


window.addEventListener('keydown', (e) => {
    if (e['keyCode'] === 37) {
        keyboard.LEFT = true;
    }

    if (e['keyCode'] === 38) {
        keyboard.UP = true;
    }

    if (e['keyCode'] === 40) {
        keyboard.DOWN = true;
    }

    if (e['keyCode'] === 39) {
        keyboard.RIGHT = true;
    }

    if (e['keyCode'] === 32) {
        keyboard.SPACE = true;
    }

    if (e['keyCode'] === 68) {
        keyboard.D = true;
    }
})


window.addEventListener('keyup', (e) => {
    if (e['keyCode'] === 37) {
        keyboard.LEFT = false;
    }

    if (e['keyCode'] === 38) {
        keyboard.UP = false;
    }

    if (e['keyCode'] === 40) {
        keyboard.DOWN = false;
    }

    if (e['keyCode'] === 39) {
        keyboard.RIGHT = false;
    }

    if (e['keyCode'] === 32) {
        keyboard.SPACE = false;
    }

    if (e['keyCode'] === 68) {
        keyboard.D = false;
    }
});


function mobileControlls() {
    document.getElementById('mobileRunLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('mobileRunLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('mobileRunRigth').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('mobileRunRigth').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('mobileJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('mobileJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('mobileThrowBottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('mobileThrowBottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}


function showgame() {
    let overlay = document.getElementById('menuOverlay');
    let startButton = document.getElementById('startGame');
    let canvas = document.getElementById('canvas');
    let controlls = document.getElementById('mobileControlles');
    let menu = document.getElementById('optionButtonsRow');
    canvas.classList.remove('d-none');
    overlay.classList.remove('backgroundImage');
    menu.classList.add('menuInGame');
    startButton.classList.add('d-none');
    controlls.classList.remove('d-none');
}


function fullscreenOption() {
    if (!fullscreen) {
        document.getElementById('canvas').classList.add('fullscreen');
        document.getElementById('menuOverlay').classList.add('menuFullscreen');
        document.getElementById('header').classList.add('d-none');
        document.getElementById('mobileControlles').classList.add('mobileControllesFullscreen');
        fullscreen = true;
    } else if (fullscreen) {
        document.getElementById('canvas').classList.remove('fullscreen');
        document.getElementById('menuOverlay').classList.remove('menuFullscreen');
        document.getElementById('header').classList.remove('d-none');
        document.getElementById('mobileControlles').classList.remove('mobileControllesFullscreen');
        fullscreen = false;
    }
}


function gameOver() {
    this.world.sounds.forEach(sound => {
        sound.pause();
    });
    
}