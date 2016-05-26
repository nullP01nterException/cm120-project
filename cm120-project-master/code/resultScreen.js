function drawWin(){
	background();
	context.font = "32px Verdana";
	context.fillStyle = 'white';
	context.fillText("You Win!", canvas.width/2-50, canvas.height/2);
}

function drawLose(){
	background();
	context.font = "32px Verdana";
	context.fillStyle = 'white';
	context.fillText("You Lose...", canvas.width/2-50, canvas.height/2);
}