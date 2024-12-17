class Endboss extends MoveableObject {

    y = 30;
    height = 430;
    width = 250;
    HP = 5;
    BossIsDead = false;
    walk;
    bossDeath;
    Deathcheckint;
    checkFirstMeetInt;
    hurt;
    hitregInterval;
    attack = false;
    attackCooldown = false;
    walkSpeed;
    gotHit = false;
    attackInt;
    meet = false;
    speedFactor;
    firstMeetAnimationInt;
    bossalerte;
    bossAnimationStart = false;

    offset = {
        top: 70,
        bottom: 90,
        left: 0,
        right: 0
    };

    walk_animation_Images = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    hurt_animation_Images = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    alert_animation_Images = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    attack_animation_Images = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    dead_animation_Images = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.walk_animation_Images[0]);
        this.loadImages(this.walk_animation_Images);
        this.loadImages(this.attack_animation_Images);
        this.loadImages(this.dead_animation_Images);
        this.loadImages(this.alert_animation_Images);
        this.loadImages(this.hurt_animation_Images);
        this.x = 5400;
        this.checkdeath();
        this.HP = 5;
        this.attack = false;
        this.checkFirstMeet();
    }

    /**
    * Stops the game by clearing all intervals.
    * This method iterates over a range of interval IDs and clears each using `window.clearInterval()`.
    */
    stopGame() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Starts the animation for the boss, including movement, attack, and hit registration.
     * This method checks if the boss's HP is greater than 0 and, if so, initiates intervals for walking speed, 
     * hit registration, and attack checks.
     */
    animate() {
        this.bossWalk();
        if (this.HP > 0) {
            this.walkSpeed = setInterval(() => {
                this.x -= this.speedFactor;
            }, 25);
            this.hitregInterval = setInterval(() => {
                this.bossHP();
            },);
            this.checkAttack = setInterval(() => {
                this.attackCheck();
            },);
        }
    }

    /**
     * Handles the boss's health when it gets hit.
     * This method clears the hit registration interval and walking animation, 
     * plays the hurt animation, and re-starts the walking animation after a delay.
     */
    bossHP() {
        if (this.gotHit == true) {
            clearInterval(this.hitregInterval);
            clearInterval(this.walk);
            this.bossHurt();
            setTimeout(() => {
                clearInterval(this.hurt);
                this.animate();
            }, 2000);
        }
    }

    /**
     * Checks if the boss is dead, and if so, stops the walking and attack intervals, 
     * plays the death animation, and shows the win screen.
     */
    checkdeath() {
        this.Deathcheckint = setInterval(() => {
            if (this.HP == 0) {
                clearInterval(this.walkSpeed);
                this.speedFactor = 0;
                this.BossIsDead = true;
                this.deathAnimation();
                clearInterval(this.Deathcheckint);
                this.showWinScreen();
            }
        }, 10);
    }

    /**
     * Shows the win screen after the boss's death.
     * Stops the game, pauses background music, plays a win sound, and triggers the win game screen.
     */
    showWinScreen() {
        setTimeout(() => {
            stopGame();
            bgMusic.pause();
            bgMusic.currentTime = 0;
            win_game_sound.play();
            pausesSound();
            this.winGame();
        }, 3000);
    }

    /**
     * Plays the boss death animation after checking if the boss is dead.
     * This method stops other animations, plays the death sound, and starts the death animation.
     */
    deathAnimation() {
        if (this.BossIsDead) {
            this.stopAnimationInterval();
            boss_death_sound.play();
            this.bossDeath = setInterval(() => {
                this.playAnimation(this.hurt_animation_Images);
            }, 100);
            setTimeout(() => {
                this.playBossDeathAnimation();
            }, 2000);
        }
    }

    /**
     * Stops all animation intervals (walking, hurting, attacking, death animations).
     * This method clears all intervals related to boss animation to ensure no other actions occur.
     */
    stopAnimationInterval() {
        clearInterval(this.walk);
        clearInterval(this.hurt);
        clearInterval(this.attackInt);
        clearInterval(this.bossDeath);
    }

    /**
     * Plays the boss's death animation after the death sequence.
     * This method stops the previous death animation and starts the final death animation.
     */
    playBossDeathAnimation() {
        clearInterval(this.bossDeath);
        this.bossDeath = setInterval(() => {
            this.loadImage(this.dead_animation_Images[0]);
            this.playAnimation(this.dead_animation_Images);
        }, 200);
    }

    /**
     * Handles the boss's attack animation.
     * If the boss is alive and not already hurt, the attack animation is played and the boss starts walking again after a delay.
     */
    bossAttack() {
        if (this.HP > 0 && !this.gotHit) {
            clearInterval(this.walk);
            clearInterval(this.hurt);
            clearInterval(this.bossDeath);
            this.attackInt = setInterval(() => {
                this.playAnimation(this.attack_animation_Images);
            }, 200);
            this.startWalkAgain();
        }
    }

    /**
     * Starts the boss walking again after completing the attack animation.
     * This method waits for the attack animation to finish, then resumes the boss's walking animation.
     */
    startWalkAgain() {
        setTimeout(() => {
            clearInterval(this.attackInt);
            this.attack = false;
            this.bossWalk();
        }, 2000);
    }

    /**
     * Starts the walking animation for the boss.
     * This method checks if the boss is alive and then starts the walking animation.
     */
    bossWalk() {
        if (this.HP > 0) {
            clearInterval(this.walk);
            this.walk = setInterval(() => {
                this.playAnimation(this.walk_animation_Images);
            }, 250);
        }
    }

    /**
     * Handles the boss's hurt state.
     * If the boss is hit, it stops the walking animation, increases the speed factor, 
     * and plays the hurt animation, resetting the hit registration after a delay.
     */
    bossHurt() {
        if (this.HP > 0) {
            clearInterval(this.hurt);
            if (this.HP <= 2) {
                this.speedFactor = 2.6;
            }
            this.hurt = setInterval(() => {
                this.playAnimation(this.hurt_animation_Images);
            }, 100);
            this.resetHitRegestration();
        }
    }

    /**
     * Resets the hit registration after a delay.
     * This method sets the `gotHit` flag back to false after a short timeout.
     */
    resetHitRegestration() {
        setTimeout(() => {
            this.gotHit = false;
        }, 2000);
    }

    /**
     * Checks if the boss is allowed to attack.
     * If the boss is ready to attack and there's no ongoing cooldown, it triggers the attack animation.
     */
    attackCheck() {
        if (this.attack === true && !this.attackCooldown) {
            clearInterval(this.walk);
            this.attackCooldown = true;
            this.bossAttack();
            this.resetAttackColldown();
        }
    }

    /**
     * Resets the attack cooldown.
     * This method waits for a period of time before allowing the boss to attack again.
     */
    resetAttackColldown() {
        setTimeout(() => {
            this.attackCooldown = false;
        }, 2000);
    }

    /**
     * Checks if the boss has met the player for the first time.
     * If the boss has met the player, it triggers the first meeting animation.
     */
    checkFirstMeet() {
        this.checkFirstMeetInt = setInterval(() => {
            if (this.meet) {
                clearInterval(this.checkFirstMeetInt);
                this.firstMeetAnimation();
            }
        }, 10);
    }

    /**
     * Plays the animation when the boss first meets the player.
     * This method makes the boss walk towards the player before playing the encounter animation.
     */
    firstMeetAnimation() {
        this.bossWalk();
        this.firstMeetAnimationInt = setInterval(() => {
            if (this.x > 5100 && !this.bossAnimationStart) {
                this.speedFactor = 1;
                this.x -= this.speedFactor;
            } else {
                this.playMeetAnimation();
            }
        }, 10);
    }

    /**
     * Plays the meeting animation when the boss first sees the player.
     * This method stops the walking animation and starts the boss alert animation, followed by walking again.
     */
    playMeetAnimation() {
        this.speedFactor = 0;
        clearInterval(this.walk);
        this.bossAnimationStart = true;
        clearInterval(this.firstMeetAnimationInt);
        this.bossAlert();
        this.startBossWalk();
    }

    /**
     * Starts the boss's walk animation after the alert animation.
     * This method waits for the alert animation to finish before allowing the boss to walk towards the player.
     */
    startBossWalk() {
        setTimeout(() => {
            clearInterval(this.bossalerte);
            this.speedFactor = 2;
            this.animate();
        }, 2800);
    }

    /**
     * Plays the boss alert animation.
     * This method triggers the alert animation and plays it at regular intervals.
     */
    bossAlert() {
        this.loadImage(this.alert_animation_Images[0]);
        this.bossalerte = setInterval(() => {
            this.playAnimation(this.alert_animation_Images);
        }, 600);
    }

    /**
     * Displays the win screen after the game is won.
     * This method shows the win screen and gives options to return to the home page or retry the game.
     */
    winGame() {
        document.getElementById('endgameImg').src = 'img/9_intro_outro_screens/win/won_2.png';
        document.getElementById('endgameImg').classList.remove('d-none');
        document.getElementById('mobileControlles').classList.add('d-none');
        document.getElementById('home').classList.remove('d-none');
        document.getElementById('tryAgain').classList.remove('d-none');
    }
}