var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){

	setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons(){
	for(var i=0; i<modeButtons.length; i++){
	modeButtons[i].addEventListener("click",function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		//figure out how many squares to show
		if(this.textContent === "Easy"){
			numSquares=3;
		}else{
			numSquares=6;
		}
		//in alternativa all'if si può fare anche con una sola riga
		//this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
		reset();
	})
    }
}

function setUpSquares(){
	for(var i = 0; i < squares.length; i++){

	//add click listeners to squares
	squares[i].addEventListener("click", function(){
		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;

		//compare color to pickedColor
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
			resetButton.textContent = "Play Again";
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	});
    }
}



function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for(var i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display="none";
		}
	}
	//reset message
	messageDisplay.textContent="";
	resetButton.textContent="New Colors";
	//reset h1 color
	h1.style.backgroundColor = "steelblue"; 
}

resetButton.addEventListener("click", function(){
	reset();
}) 

function changeColors(color){
	//loop trough all squares
	for(var i=0; i<squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor=color;
	}
}

function pickColor(){
	//pick a random number
	var random = Math.floor(Math.random() * colors.length); //math.random prende un numero casuale da 0 a 1, moltiplicato per colors.length si ottiene il numero che ci serve tramilte la funzione floor che leva i decimali
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = [];

	//add num random colors to array
	for (var i=0; i < num; i++){
		//get random color and push into arr
        arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a RED from 0 to 255
	var r = Math.floor(Math.random()*256);
	//pick a GREEN from 0 to 255
	var g = Math.floor(Math.random()*256);
	//pick a BLUE from 0 to 255
	var b = Math.floor(Math.random()*256);

	//create the color format
	var col="rgb("+r+", "+g+", "+b+")";

	//return the random color
	return col;
}