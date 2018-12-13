//global variables and arrays
var playerIndex = "";
var localHouseData = [];
window.addEventListener("load", loadPlayers);
var currentCharacter = 1;

//checks the session storage for how many cards there are to be selected.
function loadPlayers(){
	if (sessionStorage.getItem("players") == null) {
		window.location.href = "index.html";
	} 
	else{
		playerIndex = sessionStorage.getItem("players");		
	}
}

// builds all the houses as objects
function House(name, imgUrl) {
    this.name = name;
    this.imgUrl = imgUrl;
    localHouseData.push(this);      
}
var addHouse = new House("Stark", "asset/stark.png");
var addHouse = new House("Lannister", "asset/lannister.png");
var addHouse = new House("Targaryen", "asset/targaryen.png");
var addHouse = new House("Tarly", "asset/tarly.png");
var addHouse = new House("Greyjoy", "asset/greyjoy.png");

//creates a player object with information to be used for the game and victory page.
function Player(playerIndex, name, imgUrl, tokenUrl) {
    this.playerIndex = playerIndex;
    this.name = name;
    this.imgUrl = imgUrl;
    this.tokenUrl = tokenUrl;    
}

/*
	This function uses the information on the cards that is clicked to build player objects that
	are sent to the session storage.
	It also creates a modal within the card to make sure you have not clicked a card by mistake.
*/ 
function selectCard(target){	
	Cancel();
	var playerName = target.querySelectorAll(".card__name")[0].innerHTML;
	var playerHouse = "";
	var playerImg = target.querySelectorAll("img")[0].src;
	var cardHouse = target.querySelectorAll("#"+playerName.replace(/ /g,'')+"__house")[0].innerHTML;	
	for (let i in localHouseData){
		if (cardHouse.includes(localHouseData[i].name)) {
			playerHouse = localHouseData[i].imgUrl;
		} 
	}
	var addPlayer = new Player(currentCharacter, playerName, playerImg, playerHouse);	
	sessionStorage.setItem("player"+currentCharacter, JSON.stringify(addPlayer));

	var modal = document.createElement('div');
	modal.className = "modal";

	var modalText = document.createElement('p');
	modalText.className = "modal__text";
	if (playerIndex == 1){
		modalText.innerHTML = "You have selected "+playerName+", continue?";
	}
	else{
		modalText.innerHTML = "You have selected "+playerName+" as player"+currentCharacter+", continue?";
	}	
	var modalMenu = document.createElement('div');
	modalMenu.className = "modal__menu";
	var modalElementFirst = document.createElement('div');
	var modalElementSecond = document.createElement('div');
	var modalContinue = document.createElement('a');
	modalContinue.innerHTML = "Continue";
	modalContinue.setAttribute('onclick', 'Continue()');
	var modalCancel = document.createElement('a');
	modalCancel.innerHTML = "Cancel";	
	modalCancel.setAttribute('onclick', 'Cancel()');
	modalElementFirst.appendChild(modalContinue);
	modalElementSecond.appendChild(modalCancel);
	modalMenu.appendChild(modalElementFirst);
	modalMenu.appendChild(modalElementSecond);
	modal.appendChild(modalText);
	modal.appendChild(modalMenu);
	target.appendChild(modal);
	target.removeAttribute("onclick");	
}

// this function removes the current modal and resets the onclick attribute of the card that was displaying the modal.
function Cancel(){
	var currentModal = document.querySelectorAll('.modal')[0];
	if (currentModal == null) {		
		return
	}
	else{		
		var parent = currentModal.parentNode;
		setTimeout(function(){
			parent.setAttribute("onclick", "selectCard(this)");	
		}, 500);	
	}
	parent.removeChild(currentModal);	
}

/*
	This function will remove any selected cards so that you cant have 2 of the same characters playing.
	if all characters have been selected it will take you to the game page.
*/
function Continue(){
	if (playerIndex == 2) {
		if (currentCharacter == 1){
			var currentModal = document.querySelectorAll('.modal')[0];
			var parent = currentModal.parentNode;
			parent.style.display = "none";
			currentCharacter = currentCharacter + 1;
			var status = document.querySelectorAll('.selector')[0];
			status.innerHTML = "Player2";
			window.scrollTo(0, 0);
		}
		else{
			window.location.href = "game.html";
		}
	}
	else{
		window.location.href = "game.html";
	}
}