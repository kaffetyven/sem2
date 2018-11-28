function Redirect(){
	window.location.href = "character_select.html";
}
function onePlayer(){
	localStorage.setItem("players", "1");
	window.location.href = "character_select.html";
}
function twoPlayer(){
	localStorage.setItem("players", "2");
	window.location.href = "character_select.html";
}