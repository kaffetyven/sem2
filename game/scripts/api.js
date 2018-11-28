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
	fetch('https://anapioficeandfire.com/api/characters/'+localCardData[i].apiParam)
	  .then(function(response) {
	    return response.json();    
	  })
	  .then(function(myJson) {	  	
	    if(myJson[0].name == "Daenerys Targaryen"){
	    	//console.log(myJson[1]);
	    	//console.log(localCardData[i]);
	    	//console.log(myJson[1].titles[1]);

	    	var cardImg = document.createElement("img");
	    	cardImg.src = localCardData[i].imgUrl;
	    	
	    	var cardName = document.createElement('p');
			cardName.className = "card__name";
			cardName.innerHTML = myJson[1].name;

			var myCard = document.createElement('div');
			myCard.className = "card";
			myCard.setAttribute("onclick", "selectCard(this)");

			var cardBottom = document.createElement('div');
			cardBottom.className = "container " + "card__bottom";			

			var cardIcon = document.createElement('div');
			cardIcon.className = "card__icon";

			var cardIconImg= document.createElement('img');
			cardIconImg.src = localCardData[i].iconUrl;

			var cardText = document.createElement('div');
			cardText.className = "card__text";

			var cardTitle = document.createElement('p');
			cardTitle.innerHTML = "Title: " + myJson[1].titles[1];

			var cardHouse = document.createElement('p');
			var makeId = myJson[1].name + "__house";
			var houseId = makeId.replace(/ /g,'');
			cardHouse.id = houseId;
			cardHouse.innerHTML = "loading";
	    	

			cardIcon.appendChild(cardIconImg);
			cardText.appendChild(cardTitle);
			cardText.appendChild(cardHouse);
			cardBottom.appendChild(cardText);
			cardBottom.appendChild(cardIcon);
	    	myCard.appendChild(cardName);
	    	myCard.appendChild(cardImg);
	    	myCard.appendChild(cardBottom);
	    	
			cardContainer.appendChild(myCard);    	
	    	

	    	getHouse(myJson[1].allegiances[0], houseId);

	    }
	    else{
	    	var cardImg = document.createElement("img");
	    	cardImg.src = localCardData[i].imgUrl;
	    	
	    	var cardName = document.createElement('p');
			cardName.className = "card__name";
			cardName.innerHTML = myJson[0].name;

			var myCard = document.createElement('div');
			myCard.className = "card";
			myCard.setAttribute("onclick", "selectCard(this)");

			var cardBottom = document.createElement('div');
			cardBottom.className = "container " + "card__bottom";			

			var cardIcon = document.createElement('div');
			cardIcon.className = "card__icon";

			var cardIconImg= document.createElement('img');
			cardIconImg.src = localCardData[i].iconUrl;

			var cardText = document.createElement('div');
			cardText.className = "card__text";

			var cardTitle = document.createElement('p');
			if (myJson[0].titles == "") {
				cardTitle.innerHTML = "Title: None";
			} 
			else{
				cardTitle.innerHTML = "Title: " + myJson[0].titles[0];
			}			

			var cardHouse = document.createElement('p');
			var makeId = myJson[0].name + "__house";
			var houseId = makeId.replace(/ /g,'');
			cardHouse.id = houseId;			
			cardHouse.innerHTML = "loading";	    	

			cardIcon.appendChild(cardIconImg);
			cardText.appendChild(cardTitle);
			cardText.appendChild(cardHouse);
			cardBottom.appendChild(cardText);
			cardBottom.appendChild(cardIcon);
	    	myCard.appendChild(cardName);
	    	myCard.appendChild(cardImg);
	    	myCard.appendChild(cardBottom);
	    	
			cardContainer.appendChild(myCard); 	 	
	    	

	    	if(myJson[0].allegiances.length > 1){
	    		getHouse(myJson[0].allegiances[1], houseId);
	    	}
	    	else{getHouse(myJson[0].allegiances[0], houseId)}
	    }	    	    
	});
	//console.log(name);
		
}

function getHouse(x, y){
	fetch(x)
	  .then(function(response) {
	    return response.json();    
	  })
	  .then(function(myJson) {	  	
	    var houseName = myJson.name;
	    //console.log(houseName);
	    var test = document.querySelectorAll("#"+y);
	    test[0].innerHTML = "House: " + houseName;

	     
	});
}


