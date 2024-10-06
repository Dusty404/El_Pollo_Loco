let canvas;
let world;
let keyboard = new Keyboard();


function init() {
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
    overlay.classList.remove('backgroundImage');
    startButton.classList.add('d-none');
}