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
        this.game.load.image('aura', 'assets/aura.png');
        this.game.load.image('enemy', 'assets/koraku.png');
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this._player = new Player(this.game, this.game.world.centerX, this.game.world.height - 200);
        this._enemy = new Enemy(this.game, this.game.world.centerX, this.game.world.centerY - 200, 'enemy', 0);
    }

    update() {
        this.game.physics.arcade.overlap(this._player, this._enemy.bullets, this.hitPlayerCallback, null, this);
        // Not using overlap() here since we need to update the parameters even when they are not overlapped
        this.checkAuraEnemyDistance(this._player.aura, this._enemy);

        this.game.debug.body(this._enemy);
        this.game.debug.body(this._player);
        this.game.debug.body(this._player.aura);
    }

    hitPlayerCallback() {
        this.state.start('GameOverState');
    }

    checkAuraEnemyDistance(aura, enemy) {
        // Calculate absolute distance and relative distance
        // Relative distance: the actual distance relative to the distance when they are just contacted
        // 1: not overlaped, 0: center overlapped
        let absDistance = Phaser.Math.distance(aura.body.center.x, aura.body.center.y,
            enemy.body.center.x, enemy.body.center.y);
        let contactDistance = (
            Math.max(aura.body.width, aura.body.height) +
            Math.max(enemy.body.width, enemy.body.height)
        ) / 2;
        let relativeDistance = (absDistance > contactDistance) ? 1 : (absDistance / contactDistance);

        // then trigger both aura and enemy actions
        this._player.updateAuraAlpha(relativeDistance);
    }
}

export default BattleState;
