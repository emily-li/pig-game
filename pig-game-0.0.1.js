class PigGame {

	constructor(cli) {
		this.cli = cli;
		this.pigNumber = 28;
		this.pig = new Pig(cli);
		this.state = new GameState();
	}
	
	run(userInput) {
		this[this.state.state](userInput);
	}
	
	init() {
		this.pig.introduce(this.pigNumber);
		this.getNumPlayers();
	}

	getNumPlayers(userInput) {
		if (userInput != undefined) {
			const numPlayers = parseInt(userInput);
			if (numPlayers > 0) {
				this.getPlayerNames(numPlayers);
				return;
			} else {
				this.pig.speak('Play if you want to play.');
			}		
		} 		
		this.pig.speak('How many are you?');
		this.state.state = 'getNumPlayers';
	}
	
	getPlayerNames(totalPlayers) {
		this.state.state = 'getPlayerName'
		this.state.players = new Array(totalPlayers);
		this.getPlayerName();
	}
	
	getPlayerName(userInput) {
		const getNextPlayerIdx = function(players) { return players.findIndex(x => x === undefined); }
		
		const currentPlayerIdx = getNextPlayerIdx(this.state.players);
		if (userInput != undefined)	{
			this.pig.speak('Good.');
			this.state.players[currentPlayerIdx] = new Player(userInput.trim(), currentPlayerIdx);
		}
		const nextPlayer = getNextPlayerIdx(this.state.players);
		if (nextPlayer >= 0 && nextPlayer < this.state.players.length) {
			this.pig.speak(`Player ${nextPlayer + 1}. Who art thou?`)
		} else {
			this.setFirstPlayer();
		}
	}
	
	setFirstPlayer() {
		this.state.players[this.randomInt(this.state.players.length)].active = true;
		this.state.state = 'playTurn';
		this.playTurn();
	}
	
	playTurn(userInput) {
		const currentPlayer = this.state.players.find( p => p.active );
		
		if (userInput != undefined) {
			const input = userInput.trim().toLowerCase();
			const choice = input.length > 0 ? input[0] : null;
			if (choice == 'r') {
				this.handleRoll(currentPlayer);
			} else if (choice == 'h') {
				this.handleHold(currentPlayer);
			} else {
				this.pig.speak(`Why must you try my patience?`);	
			}
			this.pig.summarise(this.state);
			if (this.won(currentPlayer)) {
				this.handleHold(currentPlayer);
				currentPlayer.won = true;
				this.pig.closeGame(this.state);
				this.state = new GameState();
				return;
			}
		}
		
		if (currentPlayer.active) {
			this.pig.speak(`${currentPlayer.name}. Do you roll (r) or do you hold (h)?`);
		} else {
			this.setNextPlayer(currentPlayer);
			this.playTurn();
		}
	}
	
	handleRoll(player) {
		const roll = this.rollDie();
		this.pig.speak(`You rolled ${roll}.`);
		if (roll == 1) {
			player.currentValue = 0;
			player.active = false;
			this.pig.speak('');
			this.pig.speak(`${"(╥ᆺ╥  )".repeat(10)}`);
			this.pig.speak('');
			this.pig.speak('My condolences.');
			this.pig.speak('');
			this.pig.speak(`${"(╥ᆺ╥  )".repeat(10)}`);
		} else {
			player.currentValue += roll;
		}
	}
	
	handleHold(player) {
		player.holdValue += player.currentValue;
		player.currentValue = 0;
		player.active = false;
	}
	
	won(player) {
		return player.holdValue + player.currentValue >= this.pigNumber
	}
	
	setNextPlayer(lastPlayer) {
		const i = lastPlayer.idx == this.state.players.length - 1 ? 0 : lastPlayer.idx + 1;
		this.state.players[i].active = true;
	}
	
	randomInt(max) {
		return Math.floor(Math.random() * max);
	}
	
	rollDie() {
		return this.randomInt(6) + 1;
	}
};