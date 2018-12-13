//Declaring some global variables and setting an onload on the window to load the victorious player.
var winnerObject = "";
var victoryImg = document.getElementById('winner__img');
window.addEventListener("load", loadVictory);

//Loads the victorious player from the sessionStorage or returns you to index if no victory is found.
function loadVictory(){ 
	if (sessionStorage.getItem("victory") == null){
		window.location.href = "index.html";
	}
	else{
		var winner = sessionStorage.getItem("victory");
		winnerObject = JSON.parse(sessionStorage.getItem(winner));
		var str = winnerObject.imgUrl;		
		var res = str.split("game/");
		victoryImg.src = res[1];
		clearMemory();
	}
}

//clears the sessionStorage for everything exept for how many players are selected.
function clearMemory(){
	sessionStorage.removeItem("victory");
	sessionStorage.removeItem("player1");
	sessionStorage.removeItem("player2");	
}

//keeps the playerIndex and let you select character and play again with the same playerIndex
function retry(){
	window.location.href = "character_select.html";
}

//clears the playerindex and takes you back to the index
function mainMenu(){
	sessionStorage.removeItem("players");
	window.location.href = "index.html";
}