var localCardData = [];
function Card(apiParam, imgUrl, iconUrl) {
    this.apiParam = apiParam;
    this.imgUrl = imgUrl;
    this.iconUrl = iconUrl;    
    localCardData.push(this);
}
var addCard = new Card("?name=Jon+Snow", "characters/jon.png", "icons/stark.png",);
var addCard = new Card("?name=Tyrion+Lannister", "characters/tyrion.png", "icons/lannister.png",);
var addCard = new Card("?name=Daenerys+Targaryen", "characters/daenerys.png", "icons/targaryen.png",);
var addCard = new Card("?name=Samwell+Tarly", "characters/samwell.png", "icons/tarly.png",);
var addCard = new Card("?name=Sansa+Stark", "characters/sansa.png", "icons/stark.png",);
var addCard = new Card("?name=Jaime+Lannister", "characters/jaime.png", "icons/lannister.png",);
var addCard = new Card("?name=Jorah+Mormont", "characters/jorah.png", "icons/targaryen.png",);
var addCard = new Card("?name=Theon+Greyjoy", "characters/theon.png", "icons/greyjoy.png",);
var addCard = new Card("?name=Arya+Stark", "characters/arya.png", "icons/stark.png",);
var addCard = new Card("?name=Cersei+Lannister", "characters/cersei.png", "icons/lannister.png",);
//console.log(localCardData);
var cardContainer = document.getElementById('card__container');

for (let i in localCardData){
	console.log(localCardData[i]);
	
	fetch('https://anapioficeandfire.com/api/characters/'+localCardData[i].apiParam)
	  .then(function(response) {
	    return response.json();    
	  })
	  .then(function(myJson) {	  	
	    if(myJson[0].name == "Daenerys Targaryen"){
	    	//console.log(myJson[1]);
	    	console.log(localCardData[i]);

	    	var myImg = document.createElement("img");
	    	myImg.src = localCardData[i].imgUrl;
	    	
	    	var card = document.createElement('p');
			card.className = "card__name";
			var myCard = document.createElement('div');
			myCard.className = "card";
			myCard.setAttribute("onclick", "enterGame()")
	    	card.innerHTML = myJson[1].name;
	    	
	    	myCard.appendChild(card);
	    	myCard.appendChild(myImg);
	    	
			cardContainer.appendChild(myCard);    	
	    	

	    	getHouse(myJson[1].allegiances[0]);

	    }
	    else{
	    	//console.log(myJson[0]);
	    	var card = document.createElement('p');
			card.className = "card__name";
			var myCard = document.createElement('div');
			var myImg = document.createElement("img");
	    	myImg.src = localCardData[i].imgUrl;
			myCard.className = "card";
	    	card.innerHTML = myJson[0].name;

	    	myCard.appendChild(card);
	    	myCard.appendChild(myImg);
			cardContainer.appendChild(myCard);	 	
	    	

	    	if(myJson[0].allegiances.length > 1){
	    		getHouse(myJson[0].allegiances[1]);
	    	}
	    	else{getHouse(myJson[0].allegiances[0])}
	    }	    	    
	});
	//console.log(name);
		
}

function getHouse(x){
	fetch(x)
	  .then(function(response) {
	    return response.json();    
	  })
	  .then(function(myJson) {	  	
	    //console.log(myJson.name)
	     
	});
}


function myFunction(target){
	//console.log(target);
	var finder = target.querySelectorAll(".iconImg");
	console.log(finder[0]);
}