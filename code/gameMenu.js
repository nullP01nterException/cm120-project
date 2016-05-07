function updateGameMenu(){}

function drawGameMenu(){
	context.fillStyle = 'green';
	context.fillRect(0,0,canvas.width,canvas.height);
	context.font = "32px Verdana";
	context.fillStyle = 'black';
	context.fillText("Menu", canvas.width/2, canvas.height/2);
}