/*
 * Paste your JSFiddle "JAVASCRIPT" code under this comment
 *
*/


////////////////////VARAIBLES///////////////////////
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMove);
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
////////////////////////////////////////////////////
function init(){
	context.fillStyle = "white";
  	context.fillRect(0,0,canvas.width, canvas.height);
  	context.strokeStyle = "black";
	context.strokeRect(0,0,canvas.width, canvas.height);
	loop(music);
}

function gameState(state){
//console.log(state);
	switch(state){
		case 0:
			updateTitle();
			drawTitle();
			break;
		case 1:
			//updateGameMenu();
			//drawGameMenu();
			//break;
		case 2:
			updateGame();
			drawGame();
			break;
		case 3:
			updateTitle();
		    drawCredits();
		    break;
		case 4:
			updateTitle();
			drawInstructions();
			break;
		case 5:
			updateGame();
			drawPause();
			break;
		case 6:
			drawWin();
			break;
		case 7:
			drawLose();
			break;
		default:
		updateGame();
			drawGame();
			break;
	}
}

function update(){

}

function draw() {
	init();
	if(state == 2){
		music.pause();
		music.currentTime = 0;
		loop(gameMusic);
		loop(waves);
	}

	if(state == 5 || state == 6 || state == 7) music.pause();
	if(state == 5){
		gameMusic.pause();
		waves.pause();
	}
	gameState(state);
}

function gameLoop(){
	update();
	draw();
}

resetGame();
setInterval(gameLoop, 60);
