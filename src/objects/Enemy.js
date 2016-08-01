import Bullet from 'objects/Bullet';

class Enemy extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        // Set member variables
        this.maxHealth = this.health = 10000;

        // Set physics body to be center of texture
        this.game.physics.arcade.enable(this);
        this.body.width = this.body.height = 128;
        this.body.offset.x = (this.width - this.body.width) / 2;
        this.body.offset.y = (this.height - this.body.height) / 2;

        // Center align the texture
        this.anchor.set(0.5);
        this.game.world.addChild(this);
        this.game.world.sendToBack(this);

        // Create Bullet for that enemy
        this._bullets = this.game.add.group(this.game.world, 'Bullet', false, true, Phaser.Physics.ARCADE);
        this._bullets.classType = Bullet;
        this._bullets.createMultiple(500, 'red');
        this.game.world.bringToTop(this._bullets);

        // Health bar sprite
        let healthBar = new Phaser.Graphics(this.game, 0, 0);
        this.addChild(healthBar);
        this._healthBar = healthBar;
        this.updateHealthBar();

        // Add time events
        this.game.time.events.loop(Phaser.Timer.SECOND, this.shoot, this);
    }

    get bullets() { return this._bullets; }

    shoot() {
        let initAngle = this.game.rnd.angle();
        for (let i = 0; i < 36; i++) {
            let bullet = this._bullets.getFirstExists(false);
            if (bullet) {
                bullet.fire(this.position.x, this.position.y, initAngle + i * 10, 200, 0, 0);
            }
        }
    }

    update() {
    }

    updateHealthBar() {
        // Update health bar
        let arcAngle = Phaser.Math.PI2 * this.health / this.maxHealth;
        this._healthBar.clear();
        this._healthBar.lineStyle(8, 0xB22222);
        this._healthBar.arc(0, 0, 150, 0, arcAngle, false);
    }

    updateHealth(relativeDistance) {
        let damageValue = (1 - relativeDistance) * 100;
        if (damageValue > 0) {
            // Update health value
            this.damage(damageValue);
            this.updateHealthBar();
        }
    }
}

export default Enemy;
