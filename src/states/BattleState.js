import Player from 'objects/Player';
import Bullet from 'objects/Bullet';

class BattleState extends Phaser.State {

    constructor() {
        super();
        this._bullets = null;
        this._player = null;
    }

    preload() {
        this.game.load.image('red', 'assets/red.png');
        this.game.load.image('player', 'assets/star.png');
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this._player = new Player(this.game, this.game.world.centerX, this.game.world.height - 200);

        this._bullets = this.game.add.group(this.game.world, 'Bullet', false, true, Phaser.Physics.ARCADE);
        this._bullets.classType = Bullet;
        this._bullets.createMultiple(500, 'red');
        this._nextFire = 0;
    }

    update() {
        if (this.game.time.time < this._nextFire) { return; }

        for (let i = 0; i < 36; i++) {
            let bullet = this._bullets.getFirstExists(false);
            if (bullet) {
                bullet.fire(this.game.world.centerX, this.game.world.centerY, i * 10, 200, 0, 0);
            }
        }

        this._nextFire = this.game.time.time + 500;
    }
}

export default BattleState;
