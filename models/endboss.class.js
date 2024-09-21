class Endboss extends MoveableObject {

    y = 30;
    height = 430;
    width = 250;
    HP = 3;
    BossIsDead = false;
    walk;
    bossDeath;
    Deathcheckint;
    hurt;
    hitregInterval;
    attack = false;
    attackCooldown = false;


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
        this.x = 2000;
        this.animate();
        this.checkdeath();
        this.HP = 3;
        this.attack = false;
    }

    animate() {
        this.bossWalk();
        if (this.HP === 3) {
            this.hitregInterval = setInterval(() => {
                this.bossHP2();
            }, 10);
        } else if (this.HP === 2) {
            this.hitregInterval = setInterval(() => {
                this.bossHP1();
            }, 10);
        };
        this.checkAttack = setInterval(() => {
            this.attackCheck();
        }, 10);
    }

    bossHP2() {
        if (this.HP === 2) {
            clearInterval(this.hitregInterval);
            clearInterval(this.walk);
            this.bossHurt();
            setTimeout(() => {
                clearInterval(this.hurt);
                this.bossWalk();
            }, 2000);
        }
    }

    bossHP1() {
        if (this.HP === 1) {
            clearInterval(this.hitregInterval);
            clearInterval(this.walk);
            this.bossHurt();
            setTimeout(() => {
                clearInterval(this.hurt);
                this.bossWalk();
            }, 2000);
        }
    }

    checkdeath() {
        this.Deathcheckint = setInterval(() => {
            if (this.HP === 0) {
                this.BossIsDead = true;
                this.deathAnimation();
                clearInterval(this.Deathcheckint);
            }
        }, 10);
    }


    deathAnimation() {
        if (this.BossIsDead) {
            clearInterval(this.walk);
            clearInterval(this.hurt);
            clearInterval(this.attackInt);
            clearInterval(this.bossDeath);
    
            this.bossDeath = setInterval(() => {
                this.playAnimation(this.hurt_animation_Images);
            }, 100);
    
            setTimeout(() => {
                clearInterval(this.bossDeath);
                this.bossDeath = setInterval(() => {
                    this.loadImage(this.dead_animation_Images[0]);
                    this.playAnimation(this.dead_animation_Images);
                }, 200);
            }, 2000);
        }
    }


    bossAttack() {
        if (this.HP >0) {
        clearInterval(this.walk);  // Vorherige Animation stoppen
        clearInterval(this.hurt);
        clearInterval(this.bossDeath);
    
        let attackInt = setInterval(() => {
            this.playAnimation(this.attack_animation_Images);
        }, 200);
    
        setTimeout(() => {
            clearInterval(attackInt);
            this.attack = false;
            this.bossWalk();  // Zurück zur Laufanimation, nachdem der Angriff abgeschlossen ist
        }, 2000);
        }
    }

    bossWalk() {
        if (this.HP >0) {
        clearInterval(this.walk);  // Vorheriges Intervall beenden, um Überlagerungen zu verhindern
    
        this.walk = setInterval(() => {
            this.playAnimation(this.walk_animation_Images);
        }, 250);
    }
    }

    bossHurt() {
        if (this.HP >0) {
        clearInterval(this.hurt);
    
        this.hurt = setInterval(() => {
            this.playAnimation(this.hurt_animation_Images);
        }, 100);
    }
    }


    attackCheck() {
        if (this.attack === true && !this.attackCooldown) {
            clearInterval(this.walk);
            clearInterval(this.hurt);
            this.attackCooldown = true;
            this.bossAttack();
            setTimeout(() => {
                this.attackCooldown = false;
            }, 2000);
        }
    }

}