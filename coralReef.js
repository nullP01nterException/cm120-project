var coralColor = new Image();
coralColor.src = "../data/coralRipple.png";

var coralColorTinted = new Image();
coralColorTinted.src = "../data/coralRippleTinted.png";

var coralColorTinted2 = new Image();
coralColorTinted2.src = "../data/coralRippleTinted2.png";

var coralColorBW = new Image();
coralColorBW.src = "../data/coralRippleBW2.png";

var fadeBW = 0;
var fadeBWPlayer= 0;

var coralStarter = true,
    tintedCoralStarter = true,
  u0 = 0,
  u1 = 0;

function coralBranchObj() {
  this.topCoralX = 0,
    this.topCoralY = 0,
    this.botCoralX = 0,
    this.botCoralY = 0,
    this.cp1x = 0, 
    this.cp1y = 0,
    this.cp2x = 0, 
    this.cp2y = 0, 
    this.t = 0,
    this.t0 = 0,
    this.qxa = 0,
    this.qxb = 0,
    this.qxc = 0,
    this.qxd = 0,
    this.qya = 0,
    this.qyb = 0,
    this.qyc = 0,
    this.qyd = 0,
    this.curTopY = 0,
    this.curCp1Y = 0,
    this.curCp2Y = 0,
    this.curBotY = 0,
    this.curTopX = 0,
    this.curCp1X = 0,
    this.curCp2X = 0,
    this.curBotX = 0,
    this.switch = true
};

var coralTreeArray = new Array();
var reefArray = new Array();

function coralReset(){
fadeBW = 0;
fadeBWPlayer = 0;
coralResource = coralResourceOG;
coralGrowthResource = coralResource;
tintedCoralStarter = true;
  for (var outer = 0; outer < reefArray.length; outer++) {
  	for (var inner = 0; inner < reefArray[outer].length; inner++ ){
    reefArray[outer][inner].t = 0;
  }
  reefArray.pop;
  }
  coralStart()
}

function sunResourceGain(){
	coralGrowthResource += sunlightResource;
  coralResource += sunlightResource;
}

function coralStart() {
  for(var iter = 0; iter < numTrees; iter++){
		reefArray[iter] = new Array(); // reefArray[] = trees
    reefArray[iter][0] = new coralBranchObj(); //reef Array[][] = branches
  }
  for(var outer = 0; outer < numTrees; outer++){

  reefArray[outer][0].botCoralX = canvas.width* ((numTrees-outer)/numTrees) -10 - .2*Math.random() * (canvas.width * 1/numTrees);
  reefArray[outer][0].curBotX = reefArray[outer][0].botCoralX;
  reefArray[outer][0].botCoralY = canvas.height;
  reefArray[outer][0].curBotY =  reefArray[outer][0].botCoralY;
  
      reefArray[outer][0].topCoralX = reefArray[outer][0].botCoralX - stemLeanMax + Math.random()*2*stemLeanMax;
 reefArray[outer][0].topCoralY = canvas.height*coralStemMaxY+ Math.random()*.2*canvas.height;
  reefArray[outer][0].t = 0;
  
  	controlPointTuning(outer,0);
    
  }
  
  for(var iter = 0; iter <= coralResource; iter++){
  	updateCoral();
  }
}

function coralUpdateCont(){
  if (coralGrowthResource <= coralResource + 2*decaySpeed && coralGrowthResource >= coralResource - 2*decaySpeed){
  	coralGrowthResource = coralResource;
  }else	if (coralGrowthResource < coralResource){
  	coralGrowthResource+= growthResourceRate;
 	}else	if (coralGrowthResource > coralResource){
  coralGrowthResource-= growthResourceRate;
  }
}

function coralTimeEval() {
for (var outer =0; outer < reefArray.length; outer++){
  for (var inner = 0; inner < reefArray[outer].length; inner++) {
  
  	if (reefArray[outer][inner].t <1){
    u0 = 1.0 - reefArray[outer][inner].t0; //often just one, SET t0 to 0 UNLESS WANT BREAKAGE, TEMPORARY FOR A LONG TIME
    u1 = 1.0 - reefArray[outer][inner].t;

    qxa = reefArray[outer][inner].botCoralX * u0 * u0 + reefArray[outer][inner].cp1x * 2 * reefArray[outer][inner].t0 * u0 + reefArray[outer][inner].cp2x * reefArray[outer][inner].t0 * reefArray[outer][inner].t0;
    qxb = reefArray[outer][inner].botCoralX * u1 * u1 + reefArray[outer][inner].cp1x * 2 * reefArray[outer][inner].t * u1 + reefArray[outer][inner].cp2x * reefArray[outer][inner].t * reefArray[outer][inner].t;
    qxc = reefArray[outer][inner].cp1x * u0 * u0 + reefArray[outer][inner].cp2x * 2 * reefArray[outer][inner].t0 * u0 + reefArray[outer][inner].topCoralX * reefArray[outer][inner].t0 * reefArray[outer][inner].t0;
    qxd = reefArray[outer][inner].cp1x * u1 * u1 + reefArray[outer][inner].cp2x * 2 * reefArray[outer][inner].t * u1 + reefArray[outer][inner].topCoralX * reefArray[outer][inner].t * reefArray[outer][inner].t;

    qya = reefArray[outer][inner].botCoralY * u0 * u0 + reefArray[outer][inner].cp1y * 2 * reefArray[outer][inner].t0 * u0 + reefArray[outer][inner].cp2y * reefArray[outer][inner].t0 * reefArray[outer][inner].t0;
    qyb = reefArray[outer][inner].botCoralY * u1 * u1 + reefArray[outer][inner].cp1y * 2 * reefArray[outer][inner].t * u1 + reefArray[outer][inner].cp2y * reefArray[outer][inner].t * reefArray[outer][inner].t;
    qyc = reefArray[outer][inner].cp1y * u0 * u0 + reefArray[outer][inner].cp2y * 2 * reefArray[outer][inner].t0 * u0 + reefArray[outer][inner].topCoralY * reefArray[outer][inner].t0 * reefArray[outer][inner].t0;
    qyd = reefArray[outer][inner].cp1y * u1 * u1 + reefArray[outer][inner].cp2y * 2 * reefArray[outer][inner].t * u1 + reefArray[outer][inner].topCoralY * reefArray[outer][inner].t * reefArray[outer][inner].t;

    reefArray[outer][inner].curBotX = qxa * u0 + qxc * reefArray[outer][inner].t0;
    reefArray[outer][inner].curCp1X = qxa * u1 + qxc * reefArray[outer][inner].t;
    reefArray[outer][inner].curCp2X = qxb * u0 + qxd * reefArray[outer][inner].t0;
    reefArray[outer][inner].curTopX = qxb * u1 + qxd * reefArray[outer][inner].t;

    reefArray[outer][inner].curBotY = qya * u0 + qyc * reefArray[outer][inner].t0;
    reefArray[outer][inner].curCp1Y = qya * u1 + qyc * reefArray[outer][inner].t;
    reefArray[outer][inner].curCp2Y = qyb * u0 + qyd * reefArray[outer][inner].t0;
    reefArray[outer][inner].curTopY = qyb * u1 + qyd * reefArray[outer][inner].t;
    ////////////////////////
    reefArray[outer][inner].currentTopX = (1 - reefArray[outer][inner].t) * (1 - reefArray[outer][inner].t) * (1 - reefArray[outer][inner].t) * reefArray[outer][inner].botCoralX + 3 * (1 - reefArray[outer][inner].t) * (1 - reefArray[outer][inner].t) * reefArray[outer][inner].t * reefArray[outer][inner].cp2x + 3 * (1 - reefArray[outer][inner].t) * reefArray[outer][inner].t * reefArray[outer][inner].t * reefArray[outer][inner].cp1x + reefArray[outer][inner].t * reefArray[outer][inner].t * reefArray[outer][inner].t * reefArray[outer][inner].topCoralX;

    reefArray[outer][inner].currentTopY = (1 - reefArray[outer][inner].t) * (1 - reefArray[outer][inner].t) * (1 - reefArray[outer][inner].t) * reefArray[outer][inner].botCoralY + 3 * (1 - reefArray[outer][inner].t) * (1 - reefArray[outer][inner].t) * reefArray[outer][inner].t * reefArray[outer][inner].cp2y + 3 * (1 - reefArray[outer][inner].t) * reefArray[outer][inner].t * reefArray[outer][inner].t * reefArray[outer][inner].cp1y + reefArray[outer][inner].t * reefArray[outer][inner].t * reefArray[outer][inner].t * reefArray[outer][inner].topCoralY;
    /////////////////// Creating branches below
    if (reefArray[outer].length < numBranches) {
    	if (reefArray[outer][reefArray[outer].length-1].t > .8/numBranches && reefArray[outer][reefArray[outer].length - 1].switch == true) {
      
        reefArray[outer][reefArray[outer].length - 1].switch = false;
        
         reefArray[outer][reefArray[outer].length] = new coralBranchObj();
         reefArray[outer][reefArray[outer].length - 1].botCoralX = reefArray[outer][0].curTopX;
        reefArray[outer][reefArray[outer].length - 1].curBotX = reefArray[outer][reefArray[outer].length - 1].botCoralX;
        reefArray[outer][reefArray[outer].length - 1].botCoralY = reefArray[outer][0].curTopY;
        reefArray[outer][reefArray[outer].length - 1].curBotY = reefArray[outer][reefArray[outer].length - 1].botCoralY;
        reefArray[outer][reefArray[outer].length - 1].t = 0;
        
        reefArray[outer][reefArray[outer].length - 1].topCoralX = Math.random()*(branchXStretch) + reefArray[outer][reefArray[outer].length - 1].botCoralX - .5*branchXStretch;
        reefArray[outer][reefArray[outer].length - 1].topCoralY = reefArray[outer][reefArray[outer].length - 1].botCoralY - Math.random()*(reefArray[outer][reefArray[outer].length - 1].botCoralY - reefArray[outer][0].topCoralY) - branchYStretch;

        controlPointTuning(outer,reefArray[outer].length-1); 
      }
      }
    }
  }
  }
}

function controlPointTuning(currentOuter, currentInner) {
var outer = currentOuter;
var inner = currentInner;
  if (reefArray[outer][inner].topCoralX < reefArray[outer][inner].botCoralX) {
    reefArray[outer][inner].cp1x = reefArray[outer][inner].botCoralX+5 - Math.random() * (reefArray[outer][inner].botCoralX - reefArray[outer][inner].topCoralX-10);

    reefArray[outer][inner].cp1y = reefArray[outer][inner].topCoralY+5 + Math.random() * (reefArray[outer][inner].botCoralY - reefArray[outer][inner].topCoralY-10);

    reefArray[outer][inner].cp2x = reefArray[outer][inner].botCoralX+5 - Math.random() * (reefArray[outer][inner].botCoralX - reefArray[outer][inner].topCoralX-10);

    reefArray[outer][inner].cp2y = reefArray[outer][inner].topCoralY+5 + Math.random() * (reefArray[outer][inner].botCoralY - reefArray[outer][inner].topCoralY-10);

  } else if (reefArray[outer][inner].topCoralX > reefArray[outer][inner].botCoralX) {

    reefArray[outer][inner].cp1x = reefArray[outer][inner].topCoralX - 5 - Math.random() * (reefArray[outer][inner].topCoralX - reefArray[outer][inner].botCoralX+10);

    reefArray[outer][inner].cp1y = reefArray[outer][inner].topCoralY + 5 + Math.random() * (reefArray[outer][inner].botCoralY - reefArray[outer][inner].topCoralY-10);

    reefArray[outer][inner].cp2x = reefArray[outer][inner].topCoralX - 5 - Math.random() * (reefArray[outer][inner].topCoralX - reefArray[outer][inner].botCoralX+10);

    reefArray[outer][inner].cp2y = reefArray[outer][inner].topCoralY + 5 + Math.random() * (reefArray[outer][inner].botCoralY - reefArray[outer][inner].topCoralY - 10);
  }
}

function tintedCoralInitialize(){
  coralResource = 3000;
  for(var iter = numTrees; iter < numTrees*3+1; iter++){
    reefArray[iter] = new Array(); // reefArray[] = trees
    reefArray[iter][0] = new coralBranchObj(); //reef Array[][] = branches
  }

  for(var outer = numTrees*2; outer < numTrees*3; outer++){
    reefArray[outer][0].botCoralX = reefArray[outer-numTrees*2][0].botCoralX - .25*(canvas.width/numTrees);
    reefArray[outer][0].curBotX = reefArray[outer][0].botCoralX;
    reefArray[outer][0].botCoralY = canvas.height;
    reefArray[outer][0].curBotY =  reefArray[outer][0].botCoralY;
    
    reefArray[outer][0].topCoralX = reefArray[outer][0].botCoralX - stemLeanMax + Math.random()*2*stemLeanMax;
    reefArray[outer][0].topCoralY = canvas.height*coralStemMaxY+ Math.random()*.2*canvas.height -160; // WAS 200
    reefArray[outer][0].t = 0;
    
    controlPointTuning(outer,0);
  }

  for(var outer = numTrees; outer < numTrees*2; outer++){

  reefArray[outer][0].botCoralX = reefArray[outer-numTrees][0].botCoralX - .5*(canvas.width/numTrees);
  reefArray[outer][0].curBotX = reefArray[outer][0].botCoralX;
  reefArray[outer][0].botCoralY = canvas.height;
  reefArray[outer][0].curBotY =  reefArray[outer][0].botCoralY;
  
      reefArray[outer][0].topCoralX = reefArray[outer][0].botCoralX - stemLeanMax + Math.random()*2*stemLeanMax;
  reefArray[outer][0].topCoralY = canvas.height*coralStemMaxY+ Math.random()*.2*canvas.height -100; // WAS 200
  reefArray[outer][0].t = 0;
  
    controlPointTuning(outer,0);
    
  }

  ////First tree stoof [Added to fill right side]
  reefArray[numTrees*2][0].botCoralX = reefArray[0][0].botCoralX + .5*(canvas.width/numTrees);
  reefArray[numTrees*2][0].curBotX = reefArray[numTrees*2][0].botCoralX;
  reefArray[numTrees*2][0].botCoralY = canvas.height;
  reefArray[numTrees*2][0].curBotY =  reefArray[numTrees*2][0].botCoralY;
  
  reefArray[numTrees*2][0].topCoralX = reefArray[numTrees*2][0].botCoralX - stemLeanMax + Math.random()*2*stemLeanMax;
  reefArray[numTrees*2][0].topCoralY = canvas.height*coralStemMaxY+ Math.random()*.2*canvas.height -100;
  reefArray[numTrees*2][0].t = 0;

  controlPointTuning(numTrees*2,0);
}

function updateCoral() {
  if (coralStarter == true) {
    coralStarter = false;
    coralStart();
  }
  if (tintedCoralStarter == true && coralGrowthResource > numTrees*100){
    tintedCoralStarter = false;
    tintedCoralInitialize();
  }
  //Time updater!
  if (coralGrowthResource <110*numTrees){
    coralUpdateCont();
  }

  if (tintedCoralStarter == false){
    for (var outer = numTrees; outer < numTrees*2+1; outer++){
      for (var inner = 0; inner < reefArray[outer].length; inner++){
        if (reefArray[outer][inner].t <= 1){
          reefArray[outer][inner].t += growthSpeed*4;
        }
      }
    }
    if(coralGrowthResource > 2040){
      for (var outer = numTrees*2+1; outer < numTrees*3; outer++){
        for (var inner = 0; inner < reefArray[outer].length; inner++){
          if (reefArray[outer][inner].t <= 1){
            reefArray[outer][inner].t += growthSpeed*4;
          }
        }
      }
    }
  }

  for (var outer = 0; outer < numTrees; outer++){
  	for (var inner = 0; inner < reefArray[outer].length; inner++){
    	if (reefArray[outer][inner].t*100 < coralGrowthResource - outer*100 -inner/(numBranches-1)*100){
      	if (reefArray[outer][inner].t > 1){
      
      	} else{
      		reefArray[outer][inner].t += growthSpeed + (growthSpeed*(inner*.2));
      	}
			}else if (reefArray[outer][inner].t*100 > coralGrowthResource - outer*100 -inner/(numBranches-1)*100 && reefArray[outer][inner].t > 0) {
  			reefArray[outer][inner].t -= decaySpeed*.01;
  		}else if (reefArray[outer][inner].t <= 0 && inner > 0){
      	reefArray[outer][inner-1].switch = true;
      	reefArray[outer].splice(inner, 1);
      }
    }
  }
  coralTimeEval();
}

function drawCoral() {
    //context.fillText(coralResource,400,30);
    //context.fillText(coralGrowthResource,400,60);

  if (tintedCoralStarter == false){
    coralPattern = context.createPattern(coralColorTinted2, "repeat");
    context.fillStyle = coralPattern;
    for (var outer = numTrees*2+1; outer < reefArray.length; outer++){
      for (var inner =0; inner < reefArray[outer].length; inner++){
        var coralPattern = context.createPattern(coralColorTinted2, "repeat");
        context.strokeStyle = coralPattern;
        context.beginPath();
        context.moveTo(reefArray[outer][inner].curBotX, reefArray[outer][inner].curBotY);
        context.bezierCurveTo(reefArray[outer][inner].curCp2X, reefArray[outer][inner].curCp2Y, reefArray[outer][inner].curCp1X, reefArray[outer][inner].curCp1Y, reefArray[outer][inner].curTopX, reefArray[outer][inner].curTopY);
        context.lineWidth = 8;
        context.stroke();
        if(reefArray[outer][inner].t > 0){
        context.beginPath();
        context.arc(reefArray[outer][inner].curTopX, reefArray[outer][inner].curTopY,2.5,0,2*Math.PI);
        context.arc(reefArray[outer][inner].curBotX, reefArray[outer][inner].curBotY,2.5,0,2*Math.PI);
        context.fill();
        }
      }
    }


      var coralPattern = context.createPattern(coralColorTinted, "repeat");
      context.fillStyle = coralPattern;
    for (var outer = numTrees; outer < numTrees*2+1; outer++){
      for (var inner =0; inner < reefArray[outer].length; inner++){
        var coralPattern = context.createPattern(coralColorTinted, "repeat");
        context.strokeStyle = coralPattern;
        context.beginPath();
        context.moveTo(reefArray[outer][inner].curBotX, reefArray[outer][inner].curBotY);
        context.bezierCurveTo(reefArray[outer][inner].curCp2X, reefArray[outer][inner].curCp2Y, reefArray[outer][inner].curCp1X, reefArray[outer][inner].curCp1Y, reefArray[outer][inner].curTopX, reefArray[outer][inner].curTopY);
        context.lineWidth = 8;
        context.stroke();
        if(reefArray[outer][inner].t > 0){
        context.beginPath();
        context.arc(reefArray[outer][inner].curTopX, reefArray[outer][inner].curTopY,2.5,0,2*Math.PI);
        context.arc(reefArray[outer][inner].curBotX, reefArray[outer][inner].curBotY,2.5,0,2*Math.PI);
        context.fill();
        }
      }
    }
  }

  var coralPattern = context.createPattern(coralColor, "repeat");
  context.fillStyle = coralPattern;
  for (var outer = 0; outer < numTrees; outer++){
    for (var inner =0; inner < reefArray[outer].length; inner++){
      var coralPattern = context.createPattern(coralColor, "repeat");
      context.strokeStyle = coralPattern;
      context.beginPath();
      context.moveTo(reefArray[outer][inner].curBotX, reefArray[outer][inner].curBotY);
      context.bezierCurveTo(reefArray[outer][inner].curCp2X, reefArray[outer][inner].curCp2Y, reefArray[outer][inner].curCp1X, reefArray[outer][inner].curCp1Y, reefArray[outer][inner].curTopX, reefArray[outer][inner].curTopY);
      context.lineWidth = 8;
      context.stroke();
      if(reefArray[outer][inner].t > 0){
        context.beginPath();
        context.arc(reefArray[outer][inner].curTopX, reefArray[outer][inner].curTopY,2.5,0,2*Math.PI);
        context.arc(reefArray[outer][inner].curBotX, reefArray[outer][inner].curBotY,2.5,0,2*Math.PI);
        context.fill();
      }
      /*
      if(reefArray[outer][inner].t < 1 && reefEnergy > 0){
        sparkle(reefArray[outer][inner].curTopX,reefArray[outer][inner].curTopY);
      }
      */
    }
  }
  if(state==7){
    var coralPattern = context.createPattern(coralColorBW, "repeat");
    context.fillStyle = coralPattern;
    var coralPattern = context.createPattern(coralColorBW, "repeat");
    context.strokeStyle = coralPattern;
    context.lineWidth = 8;
    context.globalAlpha = fadeBW;
    if (fadeBW <1){
      fadeBW += .01;
    }
    if (fadeBWPlayer < 1){
      fadeBWPlayer += .01;
    }
    for (var outer = 0; outer < numTrees; outer++){
      for (var inner =0; inner < reefArray[outer].length; inner++){
        context.beginPath();
        context.moveTo(reefArray[outer][inner].curBotX, reefArray[outer][inner].curBotY);
        context.bezierCurveTo(reefArray[outer][inner].curCp2X, reefArray[outer][inner].curCp2Y, reefArray[outer][inner].curCp1X, reefArray[outer][inner].curCp1Y, reefArray[outer][inner].curTopX, reefArray[outer][inner].curTopY);
        context.stroke();
        if(reefArray[outer][inner].t > 0){
          context.beginPath();
          context.arc(reefArray[outer][inner].curTopX, reefArray[outer][inner].curTopY,2.5,0,2*Math.PI);
          context.arc(reefArray[outer][inner].curBotX, reefArray[outer][inner].curBotY,2.5,0,2*Math.PI);
          context.fill();
        }
      }
    }
    context.globalAlpha = 1;
  }


  context.fillStyle = 'black';
  context.strokeStyle = 'black';
  context.lineWidth = 2;
}
