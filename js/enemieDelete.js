let enemiesToRemove = [];

/**
  * Plays the death sound of the respective enemy.
  */
function playDeathSound(enemie) {
    if (enemie instanceof Chicken) {
        chicken_death_sound.play();
    } else if (enemie instanceof ChickenSmall) {
        Small_chicken_death_sound.play();
    };
}

/**
* Deletes an enemy from the map with a delay based on its type.
*/
function deleteEnemie(allEnemies) {
    enemiesToRemove.forEach((enemie) => {
        const delay = enemie instanceof Endboss ? 3000 : 200;
        setTimeout(() => {
            const index = allEnemies.indexOf(enemie);
            if (index > -1) {
                allEnemies.splice(index, 1);
            }
        }, delay);
    });
}


/**
* Deletes an enemy from the map when its HP reaches zero.
*/
function deleteEnemieFromMap(enemie) {
    if (enemie.HP === 0 && !enemiesToRemove.includes(enemie)) {
        enemiesToRemove.push(enemie);
        clearInterval(enemie.walk);
        clearInterval(enemie.walkanimation);
    }
}


/**
* Displays options for restarting the game or returning to the home screen.
*/
function playAgain() {
    document.getElementById("tryAgain").classList.remove("d-none");
    document.getElementById("home").classList.remove("d-none");
}
