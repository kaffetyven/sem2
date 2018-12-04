let playerIndex = "";
let start = document.getElementById('start');
let playerOne = "";
let playerTwo = "";
let counter = "";
var diceImg = "";
var mobileButton = document.getElementById('mobile__button');
var desktopButton = document.getElementById('desktop__button');
var mobileButtonText = document.querySelectorAll(".button")[1];
var desktopButtonText = document.querySelectorAll(".button")[0];
var turn = "";
var player= "";
var mediaTest = window.matchMedia("(max-width: 1023px)");
var statusText = document.querySelectorAll(".status__text")[0];
window.addEventListener("load", loadTokens);

var mongo = document.getElementById('ramseysFloor');
var selveste = document.querySelectorAll('.ramsey')[0];
console.log(mongo.childNodes);

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
	setPlayer();
}

function setPlayer(){
	console.log(turn);
	if (playerIndex == 1){
		//console.log("its 1 player");
		player = document.querySelectorAll(".player1")[0];
		statusText.innerHTML = "Its your turn";
	}else{
		if (turn % 2 == 1) {
			player = document.querySelectorAll(".player2")[0];
			statusText.innerHTML = playerTwo.name + "s turn"
		}
		else {
			player = document.querySelectorAll(".player1")[0];
			statusText.innerHTML= playerOne.name +"s turn";
		}
	}
}
function Roll(){	
	var dice = Math.floor((Math.random() * 6) + 1);	
	counter = dice;	
	mobileButton.removeAttribute("onclick");
	desktopButton.removeAttribute("onclick");
	mobileButton.style.display= "none";
	desktopButton.style.display= "none";
	Dice();
}
var diceIteration = 1;
var diceInterval = "";

function Dice(){
	statusText.innerHTML = "Rolling..."
	diceInterval = setInterval(function(){		
		diceImg = document.querySelectorAll(".dice")[0];
		diceImg.src = "dice/dice"+diceIteration+".png";
		if (diceIteration == 6) {
			diceIteration = 1;
		}else{
			diceIteration += 1;
		}
	}, 100);
	//console.log(counter);	
	var modal = document.querySelectorAll(".modal")[0];
	var progress = document.querySelectorAll(".progress")[0];
	modal.style.display="flex";	
	progress.addEventListener("animationend", Continue);
}
function Continue(){
	//console.log("finished");
	statusText.innerHTML = "You have rolled: "+counter;
	if (counter == 6) {
		statusText.innerHTML = "You have Rolled: " +counter +"<br> Double Turn!"
	}
	else{
		statusText.innerHTML = "You have rolled: "+counter;
	}
	clearInterval(diceInterval);
	diceImg.src = "dice/dice"+ counter + ".png";
	mobileButton.setAttribute("onclick", "ModalAway()");
	desktopButton.setAttribute("onclick", "ModalAway()");
	mobileButtonText.innerHTML = "Continue";
	desktopButtonText.innerHTML = "Continue";
	mobileButton.style.display = "flex";
	desktopButton.style.display = "flex";
	Mediacheck(mediaTest);
}
function Mediacheck(x){
	if (x.matches){
		desktopButton.style.display = "none";
		//console.log("match");
	}
	else{
		mobileButton.style.display = "none";
		//console.log("does not match");
	}
}
function ModalAway(){
	mobileButton.style.display= "none";
	desktopButton.style.display= "none";
	var modal = document.querySelectorAll(".modal")[0];
	modal.style.display="none";
	Footsteps();
}
var steps = 0;


function Footsteps(){
	statusText.innerHTML = "Moving...";
	player.style.display = "none";
	//console.log(steps);
	steps = 0;
	var stepper = setInterval(function(){
		if (steps==0) {
			var currentTile = player.parentNode;
			var nextTile = currentTile.nextSibling.nextSibling;
			var currentRow = currentTile.parentNode;
			var newStepImg = document.createElement('img');
			newStepImg.src = "asset/stepright.png"
			if (currentRow.className == "row reverse") {
					newStepImg.src="asset/stepleft.png"
				}
			newStepImg.className= "footstep";
			if (nextTile == null) {
				var nextRow = currentRow.previousSibling.previousSibling;
				if (nextRow.className == "row reverse") {
					newStepImg.src="asset/stepleft.png";
				}else{newStepImg.src = "asset/stepright.png"}
				nextRow.firstChild.nextSibling.appendChild(newStepImg);
			}
			else{
			nextTile.appendChild(newStepImg);
			}
		}
		else{
			var stepImg = document.querySelectorAll('.footstep')[0];
			var currentTile = stepImg.parentNode;
			var nextTile = currentTile.nextSibling.nextSibling;
			var currentRow = currentTile.parentNode;
			if (nextTile == null) {
				var nextRow = currentRow.previousSibling.previousSibling;
				if (nextRow.className == "row reverse") {
					stepImg.src="asset/stepleft.png"
				}else{
					stepImg.src = "asset/stepright.png";
				}
				nextRow.firstChild.nextSibling.appendChild(stepImg);
			}
			else{
			nextTile.appendChild(stepImg);
			}
		}
		if (steps == counter-1) {
			clearInterval(stepper);
			var finalStep = document.querySelectorAll('.footstep')[0];
			var finalTile = finalStep.parentNode;
			finalTile.appendChild(player);
			finalTile.removeChild(finalStep);
			player.style.display = "block";
			checkTile();			
		}		
		steps += 1;
	}, 1000);
	
}
function checkTile(){
	if (player.parentNode.id == "trap1") {
		console.log("trap1");
	}
	if (player.parentNode.id == "trap2") {
		console.log("trap2");
	}
	if (player.parentNode.id == "trap3") {
		console.log("trap3");
	}
	if (player.parentNode.id == "trap4") {
		console.log("trap4");
	}
	if (player.parentNode.className == "tile ramsey") {
		console.log("its ramsey");		
	}
	endTurn();
}
function endTurn(){	
	if (counter !== 6) {
		turn++;
	}
	resetButtons();
	setPlayer();
}
function resetButtons(){
	mobileButton.removeAttribute("onclick");	
	mobileButtonText.innerHTML = "Roll the dice";
	mobileButton.style.display = "flex";
	mobileButton.setAttribute('onclick', 'Roll()');
	desktopButton.removeAttribute("onclick");	
	desktopButtonText.innerHTML= "Roll the dice";
	desktopButton.style.display= "flex";
	desktopButton.setAttribute('onclick', 'Roll()');
	Mediacheck(mediaTest);
}
function Move_player(){
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
		turn++
	}	
}
	
	
	
