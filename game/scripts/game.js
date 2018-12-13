//declares a lot of global variables and applies the event listener to the window element to load the correct game tokens
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
var trapModal = document.querySelectorAll(".modal")[1];
var trapText = document.querySelectorAll(".trap__text")[0];
var trapImg = document.querySelectorAll(".ramsey_img_container")[0];
var checkpoint1= document.getElementById("checkpoint1");
var checkpoint2= document.getElementById("checkpoint2");
var checkpoint3= document.getElementById("checkpoint3");
var hasRamseyMoved = false;
var hasPlayerMoved = false;
window.addEventListener("load", loadTokens);
var customstart = document.querySelectorAll('.ramsey')[0];

//loads the correct tokens from the sessionStorage objects or refers you to the index if there are none.
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
	playerOneToken.id = "player1";
	start.appendChild(playerOneToken);
	if (playerIndex == 2) {
		playerTwo = JSON.parse(sessionStorage.getItem("player2"));
		var playerTwoToken = document.createElement('img');
		if (playerOne.tokenUrl == playerTwo.tokenUrl){ //<- If the tokens are from the same house use the 2nd version.
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
		playerTwoToken.id= "player2";
		start.appendChild(playerTwoToken);

	}
	setPlayer();
}

//this function determines what token is the current player based on the global turn variable
function setPlayer(){	
	if (playerIndex == 1){		
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
	checkTile();
}

//returns a number between 1-6 and removes the buttons from the UI.
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

//Starts the rolling of the dice animation
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
	var modal = document.querySelectorAll(".modal")[0];
	var progress = document.querySelectorAll(".progress")[0];
	modal.style.display="flex";	
	progress.addEventListener("animationend", Continue);
}

//Displays what the player has rolled and displays the buttons again with a new onclick attribute.
function Continue(){	
	statusText.innerHTML = "You have rolled: "+counter;
	if (counter == 6 && playerIndex == 2) {
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

//a simple function to check what button to remove.
function Mediacheck(x){
	if (x.matches){
		desktopButton.style.display = "none";		
	}
	else{
		mobileButton.style.display = "none";		
	}
}

//removes the dice modal.
function ModalAway(){
	mobileButton.style.display= "none";
	desktopButton.style.display= "none";
	var modal = document.querySelectorAll(".modal")[0];
	modal.style.display="none";
	Footsteps();
}
var steps = 0;

/*	makes footsteps "animation" on each tile. on the first step it creates the image.
	for the next step it just moves it.
	for the last step it appends the playertoken again and removes the footseps img.
	this function also checks for victory.
*/
function Footsteps(){
	statusText.innerHTML = "Moving...";
	player.style.display = "none";	
	steps = 0;
	var stepper = setInterval(function(){
		if (steps==0) { //<- the first step creates the footstep element
			var currentTile = player.parentNode;
			var nextTile = currentTile.nextSibling.nextSibling;
			var currentRow = currentTile.parentNode;
			var newStepImg = document.createElement('img');
			newStepImg.src = "asset/stepright.png"
			if (currentRow.className == "row reverse") { //<- flip footsteps for next row
					newStepImg.src="asset/stepleft.png"
				}
			newStepImg.className= "footstep";
			if (nextTile == null) {
				var nextRow = currentRow.previousSibling.previousSibling;
				if (nextRow.className == "row reverse") {
					newStepImg.src="asset/stepleft.png";
				}else{
					newStepImg.src = "asset/stepright.png"
				}
				nextRow.firstChild.nextSibling.appendChild(newStepImg);
			}
			else{ //<- if the first step is a victory
				if (nextTile.id === "goal") {
					clearInterval(stepper);					
					victory();					
				}
				else{
					nextTile.appendChild(newStepImg);
				}			
			}
		}
		else{ //<- find the footsteps and append it to the next tile
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
			else{ //<-- checks for victory
				if (nextTile.id === "goal") {
					clearInterval(stepper);					
					victory();
				}
				else{
					nextTile.appendChild(stepImg);
				}			
			}
		}
		if (steps == counter-1) { //<- last step
			clearInterval(stepper);
			var finalStep = document.querySelectorAll('.footstep')[0];
			var finalTile = finalStep.parentNode;
			finalTile.appendChild(player);
			finalTile.removeChild(finalStep);
			player.style.display = "block";
			hasPlayerMoved = true;			
			checkTile();			
		}		
		steps += 1;
	}, 1000);	
}
/*
	This function checks the tile that the player has landed on.
	The first if statement is run when the player is standing in a trap or on the ramsey tile.

	If the player is standing in a trap i display a trap modal with the trap information and
	set a new onclick attribute on the buttons.

	Since this function also runs at the beginning of each turn i have included a boolean value
	to check if the player has moved.

*/
function checkTile(){	
	if (player.parentNode.className == "tile trap" || player.parentNode.className == "tile ramsey"){
		if (player.parentNode.id == "trap1") {			
			statusText.innerHTML = "You have walked in a Trap!";
			trapText.innerHTML = "You woke up the prison guard! <br> He sends you back to the dungeon cell!";
			start.appendChild(player);
		}
		if (player.parentNode.id == "trap2") {
			statusText.innerHTML = "You have walked in a Trap!";
			trapText.innerHTML = "Ramsey's dogs have found you! <br> They chase you back to the cellar.";
			checkpoint1.appendChild(player);			
		}
		if (player.parentNode.id == "trap3") {
			statusText.innerHTML = "You have walked in a Trap!";
			trapText.innerHTML = "You have been spotted by patroling guards! <br> You rush back down to the cellar to hide!";
			checkpoint2.appendChild(player);
		}
		if (player.parentNode.id == "trap4") {
			statusText.innerHTML = "You have walked in a Trap!";
			trapText.innerHTML = "You failed to sneak past the towerguard! <br> He pushes you off the towerwall and you fall to the courtyard";			
			checkpoint3.appendChild(player);			
		}
		if (player.parentNode.className == "tile ramsey") {
		statusText.innerHTML = "Ramsey has found you!";
		trapImg.style.display="block";
		trapText.innerHTML= "Hello Reek! <br> You thought you could escape didn't you? <br> Ramsey tosses you back into the dungeon cell.";		
		start.appendChild(player);	
		}

		trapModal.style.display = "flex";
		mobileButton.setAttribute("onclick", "TrapAway()");
		desktopButton.setAttribute("onclick", "TrapAway()");
		mobileButtonText.innerHTML = "Continue";
		desktopButtonText.innerHTML = "Continue";
		mobileButton.style.display = "flex";
		desktopButton.style.display = "flex";
		Mediacheck(mediaTest);
	}
	else{
		if (hasPlayerMoved == false) {
			//console.log("it works");
		}
		else{ //<- if the player has moved this will run.			
			if (hasRamseyMoved == true){
				endTurn();
			}
			else{
				moveRamsey();
			}
		}		
	}	
}

// removes the trap modal and check if ramsey has moved.
function TrapAway(){
	trapImg.style.display = "none";
	trapModal.style.display = "none";
	if (hasRamseyMoved == true) {
		endTurn();
	}
	else{
		moveRamsey();
	}	
}

// changes the turn if unless a 6 has been rolled, and resets the player and ramsey booleans.
function endTurn(){	
	if (counter !== 6) {
		turn++;		
	}
	hasRamseyMoved = false;
	hasPlayerMoved = false;
	resetButtons();
	setPlayer();	
}

//Sets the onclick attribute on the buttons back to the original state.
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

/*
	each turn ramsey will move on the board within his row.

*/
function moveRamsey(){
	var possibleChildnodes = [1, 3, 5, 7, 9];
	var ramseyRoll = Math.floor((Math.random() * 5));	
	var ramseyRow = document.getElementById('ramseysFloor');
	var currentRamsey = document.querySelectorAll('.ramsey')[0];
	var res = possibleChildnodes[ramseyRoll];
	if (currentRamsey == ramseyRow.childNodes[res]) { //<- if the same tile is rolled, then it will run itself again.
		moveRamsey();
	}else{
		currentRamsey.className = "tile";
		ramseyRow.childNodes[res].className += ' ramsey';
		hasRamseyMoved = true;
		checkTile();
	}	
}

// sends a victory item with the value of the player id to the session storage and directs the user to the victory page.
function victory(){	
	sessionStorage.setItem('victory', player.id);
	window.location.href = "victory.html";
}
