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
    speedFactor = 2;
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


    stopGame() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    animate() {
        this.bossWalk();
        if (this.HP > 0) {
            this.walkSpeed = setInterval(() => {
                this.x -= this.speedFactor;
            }, 25);
            this.hitregInterval = setInterval(() => {
                this.bossHP();
            }, );
            this.checkAttack = setInterval(() => {
                this.attackCheck();
            }, );
        }
    }

    bossHP() {
        if (this.gotHit == true) {
            clearInterval(this.hitregInterval);
            clearInterval(this.walk);
            this.bossHurt();
            setTimeout(() => {
                clearInterval(this.hurt);
                this.bossWalk();
                this.animate();
            }, 2000);
        }
    }

    checkdeath() {
        this.Deathcheckint = setInterval(() => {
            if (this.HP == 0) {
                clearInterval(this.walkSpeed);
                this.BossIsDead = true;
                this.deathAnimation();
                clearInterval(this.Deathcheckint);
                this.showWinScreen();
            }
        }, 10);
    }

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


    stopAnimationInterval() {
        clearInterval(this.walk);
        clearInterval(this.hurt);
        clearInterval(this.attackInt);
        clearInterval(this.bossDeath);
    }


    playBossDeathAnimation() {        
        clearInterval(this.bossDeath);
        this.bossDeath = setInterval(() => {
            this.loadImage(this.dead_animation_Images[0]);
            this.playAnimation(this.dead_animation_Images);
        }, 200);        
    }


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

    startWalkAgain() {
        setTimeout(() => {
            clearInterval(this.attackInt);
            this.attack = false;
            this.bossWalk();
        }, 2000);
    }

    bossWalk() {
        if (this.HP > 0) {
            clearInterval(this.walk);
            this.walk = setInterval(() => {
                this.playAnimation(this.walk_animation_Images);
            }, 250);
        }
    }

    bossHurt() {
        if (this.HP > 0) {
            clearInterval(this.walkSpeed);
            clearInterval(this.hurt);
            this.speedFactor++
            this.hurt = setInterval(() => {
                this.playAnimation(this.hurt_animation_Images);
            }, 100);
            this.resetHitRegestration();
        }
    }


    resetHitRegestration() {
        setTimeout(() => {
            this.gotHit = false;
        }, 2000);
    }


    attackCheck() {
        if (this.attack === true && !this.attackCooldown) {
            clearInterval(this.walk);
            this.attackCooldown = true;
            this.bossAttack();
            this.resetAttackColldown();
        }
    }

    resetAttackColldown() {
        setTimeout(() => {
            this.attackCooldown = false;
        }, 2000);
    }

    checkFirstMeet() {
        this.checkFirstMeetInt = setInterval(() => {
            if (this.meet) {
                clearInterval(this.checkFirstMeetInt);
                this.firstMeetAnimation();
            }
        }, 10);
    }

    firstMeetAnimation() {
        this.bossWalk();
        this.firstMeetAnimationInt = setInterval(() => {
            if(this.x > 5100 && !this.bossAnimationStart) {
                this.speedFactor = 1;
                this.x -= this.speedFactor;
            } else {
                this.playMeetAnimation();
            }
        }, 10);
    }


    playMeetAnimation() {
        this.speedFactor = 0;
        clearInterval(this.walk);
        this.bossAnimationStart = true;
        clearInterval(this.firstMeetAnimationInt);
        this.bossAlert();
        this.startBossWalk();
    }


    startBossWalk() {
        setTimeout(() => {
            clearInterval(this.bossalerte);
            this.speedFactor = 2;
            this.animate();
        }, 2800); 
    }


    bossAlert() {
        this.loadImage(this.alert_animation_Images[0]);
        this.bossalerte = setInterval(() => {
            this.playAnimation(this.alert_animation_Images);
        }, 600);
    }


    winGame() {
        document.getElementById('endgameImg').src = 'img/9_intro_outro_screens/win/won_2.png';
        document.getElementById('endgameImg').classList.remove('d-none');
        document.getElementById('mobileControlles').classList.add('d-none');
        document.getElementById('home').classList.remove('d-none');
    }

}