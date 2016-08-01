class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'player', 0);

        this._slowSpeed = 200;
        this._fastSpeed = 400;
        this._isSlow = false;

        this.game.physics.arcade.enable(this);
        this.anchor.set(0.5);
        this.body.collideWorldBounds = true;
        this.game.world.addChild(this);
    }

    get speed() {
        return this._isSlow ? this._slowSpeed : this._fastSpeed;
    }

    update() {
        let cursors = this.game.input.keyboard.createCursorKeys();

        this._isSlow = this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT);

        this.body.velocity.set(0);

        if (cursors.left.isDown) {
            this.body.velocity.x -= this.speed;
        } else if (cursors.right.isDown) {
            this.body.velocity.x += this.speed;
        }

        if (cursors.up.isDown) {
            this.body.velocity.y -= this.speed;
        } else if (cursors.down.isDown) {
            this.body.velocity.y += this.speed;
        }
    }

}

export default Player;
