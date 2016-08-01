class BattleState extends Phaser.State {

    constructor() {
        super();
        this._bullets = null;
    }

    preload() {
        this.game.load.image('red', 'assets/red.png');
    }

    create() {
        this._bullets = this.game.add.group();

        let red = this._bullets.create(100, 200, 'red');
        red.scale.setTo(1);
    }

    update() {

    }
}

export default BattleState;
