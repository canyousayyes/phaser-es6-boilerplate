import DemoState from 'states/DemoState';

class Game extends Phaser.Game {

	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null);
		this.state.add('DemoState', DemoState, false);
		this.state.start('DemoState');
	}

}

window.Game = new Game();
