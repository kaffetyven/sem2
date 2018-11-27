function Redirect(){
	window.location.href = "character_select.html";
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