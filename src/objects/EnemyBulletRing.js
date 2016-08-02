import Enemy from 'objects/Enemy';
import Bullet from 'objects/Bullet';

class EnemyBulletRing extends Enemy {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        // Create bullet group
        this._bullets.classType = Bullet;
        this._bullets.createMultiple(500, 'red');
        this._bullets.forEach((bullet) => bullet.setBodyDimension(16, 16));

        // Add time events
        this.game.time.events.loop(Phaser.Timer.SECOND, this.shoot, this);
        this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.move, this);
    }

    move() {
        let angle = this.game.rnd.integerInRange(0, 359);
        this.game.physics.arcade.velocityFromAngle(angle, 100, this.body.velocity);
        this.game.time.events.add(Phaser.Timer.SECOND, () => {
            this.body.velocity.set(0, 0);
        }, this);
    }

    shoot() {
        if (!this.alive) { return; }
        let initAngle = this.game.rnd.angle();
        for (let i = 0; i < 18; i++) {
            let bullet = this._bullets.getFirstExists(false);
            if (bullet) {
                bullet.fire(this.position.x, this.position.y, initAngle + i * 20, 100, 0, 0);
            }
        }
    }
}

export default EnemyBulletRing;
