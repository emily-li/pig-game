class Cli {
	constructor() {
		this.outputDiv = null
		this.inputDiv = null

		this.cmdPromptPrefix = '>'
		this.cmdTxt = ''
		this.caret_pos = -1
		
		this.game = new PigGame(this);
	}
	
    init(divId) {
        const cli = document.getElementById(divId);
		
		let output = document.createElement('div')
		output.className = "output";
		cli.appendChild(output);

		let input = document.createElement('div');
		input.className = "input";
		cli.appendChild(input);

        this.outputDiv = output;
        this.inputDiv = input;

        this.buildCmdPrompt();
		
        const that = this;

		document.onkeypress = function(event) { return that.keyPress(event); };
        document.onkeydown = function(event) { return that.keyDown(event); };
		
		this.game.run();
    }
	
    keyPress(event) {
		const key = event.which || event.keyCode || 0;
        if(key != 13) {
            this.enterChar(String.fromCharCode(key));
            this.buildCmdPrompt();
        }
    }

    keyDown(event) {
        if(event.keyCode == 8) this.backspace();
        else if (event.keyCode == 37) this.caretBack();
        else if (event.keyCode == 39) this.caretNext();
        else if (event.keyCode == 46) this.del();
        else if (event.keyCode == 13) this.enter();
        this.buildCmdPrompt();
    }

    enter() {
        this.println(this.cmdPromptPrefix + this.cmdTxt + '\n');
		this.run(this.cmdTxt);
        this.cmdTxt = '';
    }

    println(txt) {
        var span = document.createElement('span');
        span.innerHTML = (txt ? txt : '') + '\n';
        this.outputDiv.appendChild(span);
    }
	
    caretBack() {
        if(this.caret_pos < 0)this.caret_pos = this.cmdTxt.length;
        if(this.caret_pos > 0)this.caret_pos--;
    }
	
    caretNext() {
        if(this.caret_pos <= this.cmdTxt.length && this.caret_pos >= 0)this.caret_pos++;
        if(this.caret_pos >= this.cmdTxt.length)this.caret_pos = -1;
    }
	
    enterChar(c) {
        if (this.caret_pos != -1) {
            this.cmdTxt = this.cmdTxt.substr(0, this.caret_pos) + c + this.cmdTxt.substr(this.caret_pos);
            this.caretNext();
        }
        else this.cmdTxt += c;
    }

    backspace() {
        if (this.caret_pos != -1) {
            this.cmdTxt = this.cmdTxt.substr(0, this.caret_pos - 1) + this.cmdTxt.substr(this.caret_pos);
            this.caretBack();
        }
        else this.cmdTxt = this.cmdTxt.substring(0, this.cmdTxt.length - 1);
    }

    del() {
        if(this.caret_pos != -1) {
            this.cmdTxt = this.cmdTxt.substr(0, this.caret_pos) + this.cmdTxt.substr(this.caret_pos + 1);
            if(this.caret_pos >= this.cmdTxt.length)this.caret_pos = -1;
        }
    }

    buildCmdPrompt() {
        if (this.caret_pos == -1 || this.cmdTxt.trim() == '') 
			this.inputDiv.innerHTML = this.cmdPromptPrefix + this.cmdTxt + '<span class="caret"> </span>';
        else {
            const before = this.cmdTxt.substr(0, this.caret_pos);
            const curr = this.cmdTxt.substr(this.caret_pos, 1);
            const after = this.cmdTxt.substr(this.caret_pos + 1);
            this.inputDiv.innerHTML = this.cmdPromptPrefix + before + '<span class="caret">' + curr + '</span>' + after;
        }
    }
	
    run(userInput) {
        const cmd = userInput.trim().toLowerCase;
        if (cmd == '') return;
		this.game.run(userInput);
    }
};