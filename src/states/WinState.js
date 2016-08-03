class WinState extends Phaser.State {

    constructor() {
        super();
        this._text = null;
        this._image = null;
    }

    preload() {
        this.game.load.image('win', 'assets/pinch.jpg');
    }

    create() {
        this._text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, "You Win!\nPress Enter to Restart", {
            font: '24pt "8bitOperator"',
            fill: '#FFF',
            align: 'center'
        });
        this._text.anchor.set(0.5);

        this._image = this.game.add.image(this.game.world.centerX, this.game.world.centerY - 100, 'win', 0);
        this._image.anchor.set(0.5);

        let enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onDown.addOnce(this.restart, this);
    }

    restart() {
        this.game.state.start('BattleState');
    }
}

export default WinState;
