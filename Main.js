//import "jquery.js" from "/home/petty22/Documents/GamePlay/node_modules/jquery/dist/jquery.js"

/*$(document).ready(function(){
    $("#start").click(function(){
        $(".one").hide();
    });
});*/
var card = {
	suit:"",
	value:"",
	name:"",
	points: 0,
	image : ""
}
var deck = [];
function cards(){
	this.names = ["A","Deuce","Tres","Quad","Pent","Hex","Sept","Oct","Nein","Deca","Jack","Queen","King"];
	this.suits=["Hearts","Diamonds","Spades","Clubs"];
    for (var i = 0; i<this.suits.length;i++){         
    	for (var j=0;j<this.names.length;j++){             
    		var temp = Object.create(card);
			temp.suit = this.suits[i];             
			temp.name = this.names[j];
			temp.value = j+1;
			var imgAddress = "/home/petty22/Documents/GamePlay/images/JPEG/"+temp.suit+ "/"+temp.value+temp.suit[0]+".jpg";
			temp.image = imgAddress;        
			if(suits[i]==="Spades"){
				temp.points=temp.value;
			}else if(temp.name==="A"){
				temp.points = 1;
			}else if (temp.name==="Deca" && temp.suit==="Diamonds"){
				temp.points = 6;
			}
			else{
				temp.points = 0;
			}
			deck.push(temp);         
		}     
	} 
} 
var centerTable = {
	call1 : [],
	call2 : [],
	myCards: []
}
function player(){
	this.name="";
	this.point=0;
	this.team="";
	this.myCards=[];
	this.desig ="none";
}
function teams() {
	name="",
	players= [],
	points=0
}
var player1 = new player();
var player2 = new player();
var player3 = new player();
var player4 = new player();
var teamA = new teams();
var teamB = new teams();
function showCards(player) {
	var x = document.getElementsByClassName(player.desig)[0];
	if(count<0){
		for(var i=0;i<player.myCards.length;i++){
        var img = document.createElement("img");
        img.src =player.myCards[i].image;
        img.width = 30;
        img.height = 45;
        img.alt = "Cards";
        img.draggable = "true";
       	img.id = "cardsOfPlayer" + player.name+ player.myCards[i].suit+player.myCards[i].value;
        img.addEventListener("dragstart", drag);
        x.appendChild(img);
    	}
    	count++;
	}
	else if(count===0){
		x.style.display="none";
		count = 3;
	}
	else if(count===3){
		x.style.display = "block";
		count = 0;
	}

}
function centerCards(extraCards){
	var x = document.getElementById("callArea");
	if(x.style.display==="none"){
		for(var i =0;i<extraCards.myCards.length;i++){
			var img = document.createElement("img");
	        img.src =extraCards.myCards[i].image;
	        img.width = 30;
	        img.height = 45;
	        img.alt = "Cards";
	        img.draggable = "true";
	        img.id = "middleCards"+extraCards.myCards[i].suit+extraCards.myCards[i].value;
	        img.addEventListener("dragstart", drag);
	        x.appendChild(img);
		}
		x.style.display="flex";
	}else{
		x.style.display = "none";
		while(x.firstChild){
			x.removeChild(x.firstChild);
		}
	}
}
function compare(a, b){
  const value1 = a.value;
  const value2 = b.value;
  var comparison = 0;
  if (value1 > value2) {
    comparison = -1;
  } else if (value2 > value1) {
    comparison = 1;
  }
  return comparison;
}

function sortCards(player){
	player.myCards.sort(compare);
	var x = document.getElementsByClassName(player.desig)[0];
	while(x.firstChild){
		x.removeChild(x.firstChild);
	}
	count=-1;
	showCards(player);
}
function start(){
		centerTable.myCards=[];
		for(var i=0; i<4;i++){
			centerTable.myCards.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);
			player1.myCards.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);
		}
	}
function distribute(){
		for(var i=0;i<4;i++){
			player2.myCards.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);
			player3.myCards.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);
			player4.myCards.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);	
		}
		for(var i=0;i<8;i++){
			player1.myCards.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);
			player2.myCards.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);
			player3.myCards.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);
			player4.myCards.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);
		}
	}
function checkCards(player){
		for(var i =0;i<12;i++){
			if(player.myCards[i].value>=9){
				return true;
			}else{
				return false;
			}
		}
	}
var count = -1;
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
function makeFirstCall(player){
	var x = document.getElementsByClassName(player.desig)[0];

}	
function game(){
	player1.name = "one";
	player2.name = "two";
	player3.name = "three";
	player4.name = "four";
	player1.desig="un";
	player2.desig = "dos";
	player3.desig = "tres";
	player4.desig = "quad";
	player1.team = player3.team = "A";
	player2.team = player4.team = "B";
	teamA.name = "A";
	teamB.name = "B";
	teamA.players = [player1,player3];
	teamB.players = [player2,player4];
	player1.myCards = [];
	player2.myCards = [];
	player3.myCards = [];
	player4.myCards = [];
	deck = [];
	cards();
	start();
	centerCards(centerTable);
	centerCards(centerTable);
	if(player1.myCards[0].value<9 && player1.myCards[1].value<9 && player1.myCards[2].value<9 && player1.myCards[3].value<9){
		game();
	}
	distribute();
	if(checkCards(player2) || checkCards(player3) || checkCards(player4)){
		game();
	}
	console.log(centerTable);
}
