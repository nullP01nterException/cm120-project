function updateGame(){
	changeGameState();
}

function drawGame(){
	drawWave();
}

function drawPause(){
	context.font = "32px Verdana";
	context.fillStyle = 'black';
	context.fillText("PAUSE", canvas.width/2, canvas.height/2);
}

function changeGameState(){
	if(paused) state = 5;
	else state = 2;
}