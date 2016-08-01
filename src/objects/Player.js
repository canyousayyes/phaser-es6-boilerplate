import GameSprite from 'objects/GameSprite';

class Player extends GameSprite {
    constructor(game, x, y, key = 'player', frame = 0) {
        super(game, x, y, key, frame);

        // Set member variables
        this._slowSpeed = 200;
        this._fastSpeed = 400;
        this._isSlow = false;

        // Set player sprite
        this.game.physics.arcade.enable(this);
        this.anchor.set(0.5);
        this.body.collideWorldBounds = true;
        this.game.world.addChild(this);
        this.setBodyDimension(4, 4);

        // Set aura sprite
        this._aura = new Phaser.Sprite(this.game, 0, 0, 'aura', 0);
        this.game.physics.arcade.enable(this._aura);
        this._aura.anchor.set(0.5);
        this._aura.alpha = 0;
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
        // Move player based on arrow keys and shift key
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

    updateAuraAlpha(relativeDistance) {
        this._aura.alpha = 1 - relativeDistance;
    }
}

export default Player;
