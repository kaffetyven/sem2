function Redirect(){
	window.location.href = "character_select.html";
}
function onePlayer(){
	sessionStorage.setItem("players", "1");
	window.location.href = "character_select.html";
}
function twoPlayer(){
	sessionStorage.setItem("players", "2");
	window.location.href = "character_select.html";
}