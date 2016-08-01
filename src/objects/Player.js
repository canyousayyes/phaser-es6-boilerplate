class Player extends Phaser.Sprite {
    constructor(game, x, y, key = 'player', frame = 0) {
        super(game, x, y, key, frame);

        this._slowSpeed = 200;
        this._fastSpeed = 400;
        this._isSlow = false;

        this.game.physics.arcade.enable(this);
        this.anchor.set(0.5);
        this.body.collideWorldBounds = true;
        this.game.world.addChild(this);

        this._aura = new Phaser.Sprite(this.game, 0, 0, 'aura', 0);
        this.game.physics.arcade.enable(this._aura);
        this._aura.anchor.set(0.5);
        this._aura.alpha = 0.5;
        this._aura.scale.set(2, 2);
        this.addChild(this._aura);
    }

    get speed() {
        return this._isSlow ? this._slowSpeed : this._fastSpeed;
    }

    get aura() {
        return this._aura;
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
