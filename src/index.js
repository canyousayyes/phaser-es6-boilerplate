import BattleState from 'states/BattleState';

class Game extends Phaser.Game {

	constructor() {
		super(720, 1280, Phaser.AUTO, 'content', null);
		this.state.add('BattleState', BattleState, false);
		this.state.start('BattleState');
	}

}

window.Game = new Game();
