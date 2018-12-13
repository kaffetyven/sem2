//writes the number of players to the sessionstorage depending on what button is clicked.
function onePlayer(){
	sessionStorage.setItem("players", "1");
	window.location.href = "character_select.html";
}

function twoPlayer(){
	sessionStorage.setItem("players", "2");
	window.location.href = "character_select.html";
}