let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;

/**
 * Initializes the game environment, setting up the canvas, world, controls, 
 * and resetting any required elements.
 */
function init() {
  resetSounds();
  startLvl();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  mobileControlls();
  showgame();
  document.getElementById("endgameImg").classList.add("d-none");
  document.getElementById("tryAgain").classList.add("d-none");
  document.getElementById("impressum").classList.add("d-none");
}

/**
 * Resets the game sound effects by stopping playback and resetting the time.
 */
function resetSounds() {
  gameOver_sound.pause();
  gameOver_sound.currentTime = 0;
  win_game_sound.pause();
  win_game_sound.currentTime = 0;
}

/**
 * Returns the game to the home menu and resets related game elements.
 */
function home() {
  gameOver_sound.pause();
  gameOver_sound.currentTime = 0;
  win_game_sound.pause();
  win_game_sound.currentTime = 0;
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("menuOverlay").classList.add("backgroundImage");
  document.getElementById("home").classList.add("d-none");
  document.getElementById("startGame").classList.remove("d-none");
  document.getElementById("tryAgain").classList.add("d-none");
  document.getElementById("endgameImg").classList.add("d-none");
  document.getElementById("impressum").classList.remove("d-none");
}

/**
 * Sets up keyboard event listeners for game controls.
 */
window.addEventListener("keydown", (e) => {
  if (e["keyCode"] === 37) keyboard.LEFT = true;
  if (e["keyCode"] === 38) keyboard.UP = true;
  if (e["keyCode"] === 40) keyboard.DOWN = true;
  if (e["keyCode"] === 39) keyboard.RIGHT = true;
  if (e["keyCode"] === 32) keyboard.SPACE = true;
  if (e["keyCode"] === 68) keyboard.D = true;
});

window.addEventListener("keyup", (e) => {
  if (e["keyCode"] === 37) keyboard.LEFT = false;
  if (e["keyCode"] === 38) keyboard.UP = false;
  if (e["keyCode"] === 40) keyboard.DOWN = false;
  if (e["keyCode"] === 39) keyboard.RIGHT = false;
  if (e["keyCode"] === 32) keyboard.SPACE = false;
  if (e["keyCode"] === 68) keyboard.D = false;
});

/**
 * Sets up touch controls for mobile devices.
 */
function mobileControlls() {
  document.getElementById("mobileRunLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("mobileRunLeft").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("mobileRunRigth").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("mobileRunRigth").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("mobileJump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById("mobileJump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById("mobileThrowBottle").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById("mobileThrowBottle").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}

/**
 * Displays the game screen and hides menu elements.
 */
function showgame() {
  let overlay = document.getElementById("menuOverlay");
  let startButton = document.getElementById("startGame");
  let homeButton = document.getElementById("home");
  let canvas = document.getElementById("canvas");
  let controlls = document.getElementById("mobileControlles");
  let menu = document.getElementById("optionButtonsRow");
  canvas.classList.remove("d-none");
  overlay.classList.remove("backgroundImage");
  menu.classList.add("menuInGame");
  startButton.classList.add("d-none");
  homeButton.classList.add("d-none");
  controlls.classList.remove("d-none");
}

/**
 * Displays the impressum (legal notice) window.
 */
function showImpressum() {
  document.getElementById("impressumWindow").classList.remove("d-none");
}

/**
 * Hides the impressum (legal notice) window.
 */
function closeImpressum() {
  document.getElementById("impressumWindow").classList.add("d-none");
}

/**
 * Toggles the display of the controls information window.
 */
function showControlles() {
  document.getElementById("controllesWindow").classList.toggle("d-none");
}

/**
 * Toggles fullscreen mode for the game.
 */
function fullscreenOn() {
  let overlay = document.getElementById("menuOverlay");
  if (!fullscreen) {
    enterFullscreen(overlay);
    fullscreen = true;
  } else {
    exitFullscreen();
    fullscreen = false;
  }
}

/**
 * Enters fullscreen mode for the specified element.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

/**
 * Stops all ongoing game intervals and clears the timers.
 */
function stopGame() {
  let interval = window.setTimeout(function() {}, 0);
  while (interval--) {
    window.clearTimeout(interval);
  }
}
