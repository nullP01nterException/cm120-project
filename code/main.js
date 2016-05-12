/*
 * Paste your JSFiddle "JAVASCRIPT" code under this comment
 *
*/

canvas = document.getElementById('game');
context = canvas.getContext('2d');
////////////////////VARAIBLES///////////////////////
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMove);
////////////////////////////////////////////////////
function init(){
	context.fillStyle = "white";
  	context.fillRect(0,0,canvas.width, canvas.height);
  	context.strokeStyle = "black";
	context.strokeRect(0,0,canvas.width, canvas.height);
}

function gameState(state){
	switch(state){
		case 0:
			updateTitle();
			drawTitle();
			break;
		case 1:
			updateGameMenu();
			drawGameMenu();
			break;
		case 2:
			updateGame();
			drawGame();
			break;
		case 3:
			updateTitle();
		    drawCredits();
		    break;
		case 4:
			drawPause();
			break;
		default:
			drawGame();
			break;
	}
}

function update(){

}

function draw() {
	init();
	gameState(state);
}

function gameLoop(){
	update();
	draw();
}

setInterval(gameLoop, 60);