import BattleState from 'states/BattleState';
import GameOverState from 'states/GameOverState';
import WinState from 'states/WinState';

class Game extends Phaser.Game {

	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null);
		this.state.add('BattleState', BattleState, false);
		this.state.add('GameOverState', GameOverState, false);
		this.state.add('WinState', WinState, false);
		this.state.start('BattleState');
	}

}

window.Game = new Game();
