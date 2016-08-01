class GameSprite extends Phaser.Sprite {
    setBodyDimension(width, height) {
        if (width > 0 && height > 0) {
            this.body.width = width;
            this.body.height = height;
            this.body.offset.x = (this.width - this.body.width) / 2;
            this.body.offset.y = (this.height - this.body.height) / 2;
        }
    }
}

export default GameSprite;
