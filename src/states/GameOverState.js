class GameOverState extends Phaser.State {

    constructor() {
        super();
        this._text = null;
        this._image = null;
        this._playerPosition = null;
    }

    init(playerPosition) {
        let defaultPlayerPosition = {
            x: this.game.world.centerX,
            y: this.game.world.centerY,
        }
        this._playerPosition = Phaser.Utils.extend(defaultPlayerPosition, playerPosition);
    }

    preload() {
        this.game.load.image('player', 'assets/heart.png');
        this.game.load.image('player_broken', 'assets/heart_broken.png');
    }

    create() {
        this._image = this.game.add.image(this._playerPosition.x, this._playerPosition.y, 'player', 0);
        this._image.anchor.set(0.5);

        this.game.time.events.add(Phaser.Timer.SECOND, () => {
            this._image.loadTexture('player_broken');
        }, this);

        this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
            this._text = this.game.add.text(32, 32, "Stay Determined ...\nPress Enter to Restart", {
                fontSize: '32px',
                fill: '#FFF'
            });

            let enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
            enterKey.onDown.addOnce(this.restart, this);
        }, this);
    }

    restart() {
        this.game.state.start('BattleState');
    }
}

export default GameOverState;
