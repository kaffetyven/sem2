var playerIndex = "";
window.addEventListener("load", loadPlayers);

function loadPlayers(){
	if (localStorage.getItem("players") == null) {
		window.location.href = "index.html";
	} 
	else{
		playerIndex = localStorage.getItem("players");
		console.log(playerIndex);
	}
	
}
function selectCard(target){
	//console.log(target);
	var finder = target.querySelectorAll(".card__icon");
	console.log(finder[0]);
}