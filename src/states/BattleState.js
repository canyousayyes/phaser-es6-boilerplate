import Player from 'objects/Player';

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

        this._bullets = this.game.add.group();
        let red = this._bullets.create(100, 200, 'red');

        this._player = new Player(this.game, this.game.world.centerX, this.game.world.height - 200);
    }

    update() {
    }
}

export default BattleState;
