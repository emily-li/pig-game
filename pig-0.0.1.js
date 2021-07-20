class Pig {
	constructor(cli) {
		this.cli = cli;
	}
	
	speak(words) {
		this.cli.println(words);
	}
	
	introduce(pigNumber) {
		this.speak(this.pigGamePig());
		this.speak(`The pig number is ${pigNumber}`);
		this.cli.println();
	}
	
	summarise(gameState) {
		this.cli.println();
		this.speak(gameState.players.map(p => this.getSummary(p)).join('\n'))
		this.cli.println();
	}
	
	closeGame(gameState) {
		const winner = gameState.players.find(p => p.won);
		
		this.cli.println();
		this.speak(`Congratulations, ${winner.name}. You have escaped my grasp this time.`);
		this.speak(`Now, I must tend to the newest of my flock.`);
		this.cli.println();
		this.summarise(gameState);
		this.cli.println();
	}
	
	getSummary(player) {
		return `Player:\t${player.name}\t\tHold:\t${player.holdValue}\t\tCurrent:\t${player.currentValue}`;
	}
	
	pigGamePig() { return `
                                                                   						        		                                                                               					   								                                                            					      
		▒▓███▄        █████░                                           		     	      
			████▄▄▄▄▄▄█     █                                          					      
			▒█       ░▒░   █░                                          					      
			█   ▄▄     ▒    ▒█                                       					      
		  ▒█▒ ▄█░▒█     ▒     █                                       					      
		▄▀▄▄    ▀▀           ▒▒█▄_                                      					  
	▄▄▒                      ▒▒▒████████                               					  
	█o o▒█                               ███                           					      
	▒███▄▄▄                                 ███████                      		              
		▀▀▀█░                                      ████                					      
			█░       ▄▄▒                               ████            					      
			███▒▒▒██                                      ██            				      
				█                                           ██          				      
				█                                            ██         				      
				█                                             ▒▒  ▄   					      
				▒█   ▒                                        ▒▒  ▄█▒  					      
				▒█  ▒                 ▒█                     ▒▒ █▒░  					      
				▒█   ▒         ▒     ▒█                      ▒▒ ░█▒   					      
				▒█   ▒       ▒     ▒█                     ▒▒▀▀▀     					      
				█   ▒█▒   ▒      ▒█                    ▒▒         					      
				█   █ █  ▒         ▒█               ▒▒▒▒            				      
				█  █  █  █▄▄▄       ▒█            ▒▒               					      
				█  █  █  █   █▒▒▒▒▒▒▒█▄▄      ▒▒▒▒                 					      
				█▄▄▒  █  █    ▄▄▄▄▀▀▀      ▒▒▒▒▒                   					      
				   	▒█▄▄▒   ▒█▄▄▄▄▄▄▄██▒▒▒▒                       					      
																												
    			                                                                                                   
 ▄▄▄█████▓ ██░ ██  ██▓  ██████     ██▓  ██████     ██▓███   ██▓  ▄████      ▄████  ▄▄▄       ███▄ ▄███▓▓█████      
 ▓  ██▒ ▓▒▓██░ ██▒▓██▒▒██    ▒    ▓██▒▒██    ▒    ▓██░  ██▒▓██▒ ██▒ ▀█▒    ██▒ ▀█▒▒████▄    ▓██▒▀█▀ ██▒▓█   ▀      
 ▒ ▓██░ ▒░▒██▀▀██░▒██▒░ ▓██▄      ▒██▒░ ▓██▄      ▓██░ ██▓▒▒██▒▒██░▄▄▄░   ▒██░▄▄▄░▒██  ▀█▄  ▓██    ▓██░▒███        
 ░ ▓██▓ ░ ░▓█ ░██ ░██░  ▒   ██▒   ░██░  ▒   ██▒   ▒██▄█▓▒ ▒░██░░▓█  ██▓   ░▓█  ██▓░██▄▄▄▄██ ▒██    ▒██ ▒▓█  ▄      
   ▒██▒ ░ ░▓█▒░██▓░██░▒██████▒▒   ░██░▒██████▒▒   ▒██▒ ░  ░░██░░▒▓███▀▒   ░▒▓███▀▒ ▓█   ▓██▒▒██▒   ░██▒░▒████▒     
   ▒ ░░    ▒ ░░▒░▒░▓  ▒ ▒▓▒ ▒ ░   ░▓  ▒ ▒▓▒ ▒ ░   ▒▓▒░ ░  ░░▓   ░▒   ▒     ░▒   ▒  ▒▒   ▓▒█░░ ▒░   ░  ░░░ ▒░ ░     
     ░     ▒ ░▒░ ░ ▒ ░░ ░▒  ░ ░    ▒ ░░ ░▒  ░ ░   ░▒ ░      ▒ ░  ░   ░      ░   ░   ▒   ▒▒ ░░  ░      ░ ░ ░  ░     
   ░       ░  ░░ ░ ▒ ░░  ░  ░      ▒ ░░  ░  ░     ░░        ▒ ░░ ░   ░    ░ ░   ░   ░   ▒   ░      ░      ░        
           ░  ░  ░ ░        ░      ░        ░               ░        ░          ░       ░  ░       ░      ░  ░     
 	
    `; }
}