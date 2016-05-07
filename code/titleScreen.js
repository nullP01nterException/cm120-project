function updateTitle(){
	
}

function drawTitle(){
	context.fillStyle = 'red';
	context.fillRect(0,0,canvas.width,canvas.height);
	context.font = "32px Verdana";
	context.fillStyle = 'black';
	context.fillText("Title", canvas.width/2, canvas.height/2);
}