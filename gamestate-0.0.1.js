class GameState {
	constructor(state, players) {
		this.state = state == undefined ? 'init' : state;
		this.players = players == undefined ? new Array() : players;
	}
}

class Player {
	constructor(name, i) {
		this.name = name;
		this.idx = i;
		this.holdValue = 0;
		this.currentValue = 0;
		this.active = false;
		this.won = false;
	}
}