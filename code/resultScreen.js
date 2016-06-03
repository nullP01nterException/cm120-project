function drawWin(){
	background();
	context.font = "32px Verdana";
	context.fillStyle = 'white';
	context.fillText("You Win!", canvas.width/2-50, canvas.height/2);
	context.font = "25px Verdana";
	//context.fillText("Click to return to main menu", canvas.width/2-175, canvas.height/2+50);

	if(mouseClicked){
		state = 0;
		win = null;
		alive = true;
		resetGame();
		muteState = 0;
	}
}

function drawLose(){
	background();
	context.font = "32px Verdana";
	context.fillStyle = 'white';
	context.fillText("You Lose...", canvas.width/2-50, canvas.height/2);
	context.font = "25px Verdana";
	//context.fillText("Click to return to main menu", canvas.width/2-175, canvas.height/2+50);

	if(mouseClicked){
		state = 0;
		win = null;
		alive = true;
		resetGame();
		muteState = 0;
	}
}