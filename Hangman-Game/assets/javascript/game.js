var wordOptions = ["dog", "cat", "elephant", "giraffe", "longhorn", "hippo"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

function startGame() {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersinWord = selectedWord.split("");
	numBlanks = lettersinWord.length;

	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];

	for(var i=0; i<numBlanks; i++){
		blanksAndSuccesses.push("_");
	}

	document.getElementById("wordtoGuess").innerHTML= blanksAndSuccesses.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;
}

function checkLetters(letter){
	var isLetterInWord = false;
	for(var i = 0; i<numBlanks; i++){
		if(selectedWord[i] == letter){
			isLetterInWord = true;
		}
	}

	if(isLetterInWord){
		for(var i=0; i<numBlanks; i++){
			if(selectedWord[i] == letter){
				blanksAndSuccesses[i] = letter;
			}
		}
	}

	else{
		wrongLetters.push(letter);
		guessesLeft --
	}
}

function roundComplete(){
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordtoGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

	if(lettersinWord.toString() == blanksAndSuccesses.toString()){
		winCount++;
		alert("You won!");

		document.getElementById("winCounter").innerHTML = winCount;

		startGame();
	}

	else if(guessesLeft == 0){
		lossCount ++;
		alert("You lost!");

		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}
	
}

startGame();

document.onkeyup = function(event){
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();
}