var Word = require('./word.js');

var Letter = function(input) {
	var inUse = new Word(input)
	this.letters = inUse.text.split("");
	this.length = inUse.length;
	this.array = [];
	this.displayBlanks = function() {
		for (var i = 0; i < this.length; i++) {
			this.array.push("_");
		}
		console.log(this.array.join("  "));
	}
	this.replaceBlank = function(answer) {
		for (var i = 0; i < this.length; i++) {
			if (this.letters[i] == answer) {
				this.array[i] = answer;
			};
		};
	};
};

module.exports = Letter;