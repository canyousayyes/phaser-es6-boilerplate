import Player from 'objects/Player';
import Enemy from 'objects/Enemy';
import Bullet from 'objects/Bullet';

class BattleState extends Phaser.State {

    constructor() {
        super();
        this._bullets = null;
        this._player = null;
        this._enemy = null;
    }

    preload() {
        this.game.load.image('red', 'assets/red.png');
        this.game.load.image('player', 'assets/star.png');
        this.game.load.image('enemy', 'assets/koraku.png');
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this._player = new Player(this.game, this.game.world.centerX, this.game.world.height - 200);
        this._enemy = new Enemy(this.game, this.game.world.centerX, this.game.world.centerY - 200, 'enemy', 0);
    }

    update() {
    }
}

export default BattleState;
