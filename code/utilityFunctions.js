/*
Table of Content:
	map(value, low1, high1, low2, high2)
*/

//maps a value from range1 to range2
//used in PerlinNoise (waves)
function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function loop(sound){
	if(sound.currentTime >= sound.duration){
		sound.pause();
		sound.currentTime = 0;
		sound.play();
	}else{
		sound.play();
	}
}

function SpriteSheet(path, frameWidth, frameHeight, frameSpeed, startFrame, endFrame) {
	var animationSeq = [];
  	var currentFrame = 0;
  	var counter = 0;
  	var framesPerRow = Math.floor(path.width/frameWidth);

  	for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
    	animationSeq.push(frameNumber);

  	this.update = function() {
    	if (counter == (frameSpeed - 1)) {
      		currentFrame = (currentFrame + 1) % endFrame;
    	}
    	counter = (counter + 1) % frameSpeed;
  	};

  	this.draw = function(x, y, row) {
    // get the row and col of the frame
    	var col = Math.floor(currentFrame % framesPerRow);
   		context.drawImage(path, col * frameWidth, row * frameHeight, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
  	};

}

	spritesheet = new SpriteSheet(zooxEyes, 64, 64, 0, 0, 1);

function animatePlayer(spritesheet, x, y, row) {
  	spritesheet.update();
  	spritesheet.draw(x-5, y - 12, row);
}