let playerIndex = "";
let start = document.getElementById('start');
let playerOne = ""
let playerTwo = ""
window.addEventListener("load", loadTokens);
function loadTokens(){
	if (sessionStorage.getItem("players") == null){
		window.location.href = "index.html";
	}
	else{
		playerIndex = sessionStorage.getItem("players");		
	}
	playerOne = JSON.parse(sessionStorage.getItem("player1"));
	var playerOneToken = document.createElement('img');
	playerOneToken.src=playerOne.tokenUrl;
	playerOneToken.className = "player"+" player1";	
	start.appendChild(playerOneToken);
	if (playerIndex == 2) {
		playerTwo = JSON.parse(sessionStorage.getItem("player2"));
		var playerTwoToken = document.createElement('img');
		if (playerOne.tokenUrl == playerTwo.tokenUrl){
			var str = playerTwo.tokenUrl;
			var a = str.split(".");
			a[0]+="2";
			var strNew = a.join(".");
			playerTwoToken.src = strNew;
		}
		else{
			playerTwoToken.src=playerTwo.tokenUrl;
		}
		playerTwoToken.className = "player"+" player2";
		start.appendChild(playerTwoToken);
	}

}


var turn = 0;
function Roll(){	
	var dice = Math.floor((Math.random() * 6) + 1);	
	var counter = dice;
	console.log(counter);
	if (turn % 2 == 1) {
		var player = document.querySelectorAll(".player1")[0];
	} else {var player = document.querySelectorAll(".player2")[0];}

	for (i = 0; i < counter; i++){		
		var currentTile = player.parentNode;
		var currentRow= currentTile.parentNode;
		var nextTile = currentTile.nextSibling.nextSibling;
		if (nextTile == null) {
			var nextRow = currentRow.previousSibling.previousSibling;
			nextRow.firstChild.nextSibling.appendChild(player);
			console.log(player.parentNode.className);
		}
		else {
		nextTile.appendChild(player);
		console.log(player.parentNode);
		}		
	}
	if (counter !== 6) {
		turn=turn+1
	}	
	
	//console.log(turn);
}