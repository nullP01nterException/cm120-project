function mouseDown(eventParams) {
  mouseClicked = true;
  if(state == 1) state++;
  //console.log(state);
}

function mouseUp(eventParams){
	mouseClicked = false;
}

function mouseMove(eventParams){
	mouseX = eventParams.clientX;
	mouseY = eventParams.clientY;
}

document.addEventListener('keydown', function(e){
		var key = e.which;
		pressedKey = key;
		keyDown = true;
		e.preventDefault();
		if(key == "27" && state == 2 || state == 5) paused = !paused;
	}, false);

document.addEventListener('keyup', function(e){
		pressedKey = e.which;
		keyDown = false;
	}, false);