/*
Table of Content:
	map(value, low1, high1, low2, high2)
	loop(sound)
	SpriteSheet(path, frameWidth, frameHeight, frameSpeed, startFrame, endFrame)
	animatePlayer(spritesheet, x, y, row)
*/

//maps a value from range1 to range2
//used in PerlinNoise (waves)
function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

//loops a song
function loop(sound){
	if(sound.currentTime >= sound.duration){
		sound.pause();
		sound.currentTime = 0;
		sound.play();
	}else{
		sound.play();
	}
}

//draws part of an image
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

//animates a SpriteSheet
function animatePlayer(spritesheet, x, y, row) {
  	spritesheet.update();
  	spritesheet.draw(x-5, y - 12, row);
}

function sparkle(x, y){
	starBuffer++;
	if(starBuffer%7 == 0){
		rand = Math.floor(Math.random()*6);
		starBuffer = 0;
	}
	context.drawImage(starArray[rand], x, y, 64,64);
}

function range(min, max){
  return Math.random() * (max - min) + min; //get a random number in a certain range
}