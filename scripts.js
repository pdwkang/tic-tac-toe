// var container = document.getElementsByClassName('container');
// console.log(container);
// container[0].innerHTML = "hello, world"

// 1. set up board
// 2. user should be able to click a box and a mark shows up
// 	put an onclick in the first square
// 	when user clicks, call function that puts an x in the box.
// milestone
// 3. put an X on the square
// 4. keep track of whos turn it is
// 5. when a square is clicked, put the symbol, and change whos turn it
// 6. keep player from overwriting a square

var whosTurn = 1;    //init whosTurn to player 1
var player1Squares = [];
var player2Squares = [];
var someoneWon = false;
var winningComboReset = [];
// set up winners array
var computerPlayer = false;
var winningCombos =[
	['A1','B1','C1'],
	['A2','B2','C2'],
	['A3','B3','C3'],
	['A1','A2','A3'],
	['B1','B2','B3'],
	['C1','C2','C3'],
	['A1','B2','C3'],
	['A3','B2','C1'],	
];


function computerMove(){
	// go find a random square
	var needASquare = true;
	var squareDivs = document.getElementsByClassName('square');
	while(needASquare){
		var randomSquare = squareDivs[Math.floor(Math.random()*8)]
		isTaken = markSquare(randomSquare);
		console.log(isTaken);
		if(isTaken !== "taken"){
		needASquare = false;
		}
	}	
}

function computerAuto(){
	computerPlayer = true
}



function reset(){
	if(someoneWon){
		for(i=0; i<3; i++){
		document.getElementById(winningComboReset[i]).className = 'square'};
	};
	for(var i = 0; i<3; i++){
		for(var j=0; j<3; j++){
			document.getElementById(winningCombos[i][j]).innerHTML = winningCombos[i][j]
		}
	}	
	someoneWon = false;
	player1Squares = [];
	player2Squares = [];
	whosTurn = 1;
}




function markSquare(currentSquare){
	if((currentSquare.innerHTML ==="X")||(currentSquare.innerHTML==="O")){
		// console.log("Someone is there. Stop cheating.")
		return "taken"
	}else if(someoneWon){
		console.log('Someone already won!')
	}else{
		if(whosTurn ===1 ){
			currentSquare.innerHTML = "X";
			whosTurn = 2;
			player1Squares.push(currentSquare.id);
			checkWin(1, player1Squares);
			if(computerPlayer){
				computerMove();
			}
		}else{
			currentSquare.innerHTML = "O";
			whosTurn = 1;
			player2Squares.push(currentSquare.id);
			checkWin(2, player2Squares);
		}
	}
}


function checkWin(whoJustWent, currentSquare){
	for(var i = 0; i< winningCombos.length; i++){
		var rowCount = 0;
		for(var j = 0; j<winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			if(currentSquare.indexOf(winningSquare) > -1){
				rowCount++;	// Hit!, player has this square, somewhere.
			}
		};
		if(rowCount === 3){
			console.log("Player " + whoJustWent + " won!")
			gameOver(whoJustWent, winningCombos[i]);
			break;
		}
		// console.log("Combo completed");
	}
}

function gameOver(whoJustWon, winningCombo){
	winningComboReset = winningCombo;
	var message = "Congrats to player " + whoJustWon + ". You just won with a "
	+ winningCombo
	document.getElementById('message').innerHTML = message;
	for(var i = 0; i<winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winning-square';
	}
	someoneWon = true;
}

