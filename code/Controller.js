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
		if(key == '27' && state == 2 || state == 5) paused = !paused; //unpauses on any keypress
	}, false);

document.addEventListener('keyup', function(e){
		pressedKey = e.which;
		keyDown = false;
	}, false);

document.addEventListener('click', function(e){
    if(state == 0 && overTitleMute){
    	music.muted = !music.muted;
    	titleSoundMuted = !titleSoundMuted;
    }

    if(state == 2 && overTitleMute){
    	gameMusic.muted = !gameMusic.muted;
    	gameSoundMuted = !gameSoundMuted;
    }
    if(state == 2 && overMuteSFX){
    	foodSound.muted = !foodSound.muted;
    	sunSound.muted = !sunSound.muted;
    	SFXMuted = !SFXMuted;
    }

    console.log(gameSoundMuted + ", " + SFXMuted);
  }, false);