class GameOverState extends Phaser.State {

    constructor() {
        super();
        this._text = null;
    }

    preload() {
        this.game.load.image('player', 'assets/star.png');
    }

    create() {
        this._text = this.game.add.text(32, 32, "Game Over\nPress Enter to Restart", {
            fontSize: '32px',
            fill: '#FFF'
        });

        let enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onDown.addOnce(this.restart, this);
    }

    restart() {
        this.game.state.start('BattleState');
    }
}

export default GameOverState;
