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
    document.getElementById('endgameImg').classList.add('d-none');
    document.getElementById('tryAgain').classList.add('d-none');
    document.getElementById('playGameButtons').classList.add('buttonPositionFix');
    document.getElementById('menuOverlay').classList.remove('border');
    document.getElementById('canvasDiv').classList.add('border');
}


function home() {
    document.getElementById('playGameButtons').classList.remove('buttonPositionFix');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('menuOverlay').classList.add('backgroundImage');
    document.getElementById('home').classList.add('d-none');
    document.getElementById('startGame').classList.remove('d-none');
    document.getElementById('tryAgain').classList.add('d-none');
    document.getElementById('endgameImg').classList.add('d-none');
    document.getElementById('menuOverlay').classList.add('border');
    document.getElementById('canvasDiv').classList.remove('border');
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
    let homeButton = document.getElementById('home');
    let canvas = document.getElementById('canvas');
    let controlls = document.getElementById('mobileControlles');
    let menu = document.getElementById('optionButtonsRow');
    canvas.classList.remove('d-none');
    overlay.classList.remove('backgroundImage');
    menu.classList.add('menuInGame');
    startButton.classList.add('d-none');
    homeButton.classList.add('d-none');
    controlls.classList.remove('d-none');
}


function fullscreenOption() {
    if (!fullscreen) {
        document.getElementById('canvas').classList.add('fullscreen');
        document.getElementById('endgameImg').classList.add('menuFullscreen');
        document.getElementById('menuOverlay').classList.add('menuFullscreen');
        document.getElementById('menuOverlay').classList.remove('border');
        document.getElementById('header').classList.add('d-none');
        document.getElementById('mobileControlles').classList.add('mobileControllesFullscreen');
        document.getElementById('fsImg').src = 'img/optionButtons/compress-solid.svg';
        fullscreen = true;
    } else if (fullscreen) {
        document.getElementById('canvas').classList.remove('fullscreen');
        document.getElementById('endgameImg').classList.remove('menuFullscreen');
        document.getElementById('menuOverlay').classList.remove('menuFullscreen');
        document.getElementById('menuOverlay').classList.add('border');
        document.getElementById('header').classList.remove('d-none');
        document.getElementById('mobileControlles').classList.remove('mobileControllesFullscreen');
        document.getElementById('fsImg').src = 'img/optionButtons/expand-solid.svg';
        fullscreen = false;
    }
}


function showControlles() {
    document.getElementById('controllesWindow').classList.toggle('d-none');
}