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