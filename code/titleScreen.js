function updateTitle(){
	mouseOver();
	changeScreenTitle();
}

function drawTitle(){
	//Start Game
	if(titleOver){
		background();
		context.font = "50px Verdana";
		context.fillStyle = 'white';
		context.fillText("Start Game", canvas.width/2-120, canvas.height/2);
		context.font = "32px Verdana";
		context.fillText("Credits", canvas.width/2 - 40, canvas.height/2 + 120);
		context.fillText("Instructions", canvas.width/2 - 70, canvas.height/2 + 60);
	}
	//Credits
	else if(titleInstructOver){
		background();
		context.font = "32px Verdana";
		context.fillStyle = 'white';
		context.fillText("Start Game", canvas.width/2-70, canvas.height/2);
		context.fillText("Credits", canvas.width/2 - 40, canvas.height/2 + 120)
		context.font = "50px Verdana";
		context.fillText("Instructions", canvas.width/2 - 120, canvas.height/2 + 60);
	}
	else if (titleCreditOver){
		background();
		context.font = "32px Verdana";
		context.fillStyle = 'white';
		context.fillText("Start Game", canvas.width/2-70, canvas.height/2);
		context.fillText("Instructions", canvas.width/2 - 70, canvas.height/2 + 60);
		context.font = "50px Verdana";
		context.fillText("Credits", canvas.width/2 - 60, canvas.height/2 + 120);
	}
	//default
	else{
		background();
		context.font = "32px Verdana";
		context.fillStyle = 'white';
		context.fillText("Start Game", canvas.width/2-70, canvas.height/2);
		context.fillText("Credits", canvas.width/2 - 40, canvas.height/2 + 120);
		context.fillText("Instructions", canvas.width/2 - 70, canvas.height/2 + 60);
	}
}

function drawInstructions(){
	background();
	context.font = "32px Verdana";
	context.fillStyle = 'white';
	context.fillText("Use the arrow keys to play", canvas.width/2-200, canvas.height/2);

	context.fillStyle = 'blue';
	context.fillRect(10,10,50,30);
	context.fillStyle = 'white';
	context.font = "20px Verdana";
	context.fillText("Back", 10,35);
}

function drawCredits(){
	background();
	context.font = "32px Verdana";
	context.fillStyle = 'white';
	context.fillText("The Fellowship of the Reef", canvas.width/2-200, canvas.height/2-150);
	context.fillText("Richard Harker        Nicole Maines", canvas.width/2-275, canvas.height/2-50);
	context.fillText("Jolina Lam        Tommy Milne-Jones", canvas.width/2-200, canvas.height/2);
	context.fillText("Music from www.newgrounds.com", canvas.width/2-250, canvas.height/2 + 150);
	context.font = "20px Verdana";
	context.fillText("Green Bird by dferociousbeast.newgrounds.com", canvas.width/2-225, canvas.height/2+190);
	context.fillText("Peaceful Nights by stadler.newgrounds.com", canvas.width/2-205, canvas.height/2+230);

	context.fillStyle = 'blue';
	context.fillRect(10,10,50,30);
	context.fillStyle = 'white';
	context.font = "20px Verdana";
	context.fillText("Back", 10,35);
}

function mouseOver(){
	if(state == 0 && mouseX < canvas.width/2 + 120 && mouseX > canvas.width/2 - 60
		&& mouseY < canvas.height/2 && mouseY > canvas.height/2 - 25){
		titleOver = true;
	}else{
		titleOver = false;
	}

	if(state == 0 && mouseX < canvas.width/2 + 95 && mouseX > canvas.width/2 - 40
		&& mouseY < canvas.height/2 + 120 && mouseY > canvas.height/2 + 95){
		titleCreditOver = true;
	}else{
		titleCreditOver = false;
	}

	if(state == 0 && mouseX < canvas.width/2 + 130 && mouseX > canvas.width/2 - 65
		&& mouseY < canvas.height/2 + 65 && mouseY > canvas.height/2 + 40){
		titleInstructOver = true;
	}else{
		titleInstructOver = false;
	}

	if(mouseX < 60 && mouseX > 10 && mouseY < 40 && mouseY > 10){
		if(state == 3) overCreditBack = true;
		else overCreditBack = false;

		if(state == 4) overInstructBack = true;
		else overInstructBack = false;
	}
}

function background(){
	var grad = context.createLinearGradient(0, 0, 0, 400);
  		grad.addColorStop(0, "#AEE9FC");
  		grad.addColorStop(1, "#004961");
  	context.fillStyle = grad;
 	context.fillRect(0, 0, canvas.width, canvas.height);

 	if(state == 0){
 		context.font = "80px Impact";
		context.fillStyle = 'white';
		context.fillText("Symbiosis", canvas.width/2-150, 150);
	}
}

function changeScreenTitle(){
	if(state == 0 && titleOver && mouseClicked) state = 1;
	else if(state == 0 && titleCreditOver && mouseClicked) state = 3;
	else if(state == 3 && overCreditBack && mouseClicked) state = 0;
	else if(state == 0 && titleInstructOver && mouseClicked) state = 4;
	else if(state == 4 && overInstructBack && mouseClicked) state = 0;
}

function testBox(){
	context.fillStyle = 'blue';
	context.fillRect(canvas.width/2-70, canvas.height/2 +60,190, -25);
}