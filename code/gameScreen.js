function Zoox(x, y, speed, radius){
  this.x = x;
  this.y = y;
  this.r = radius;
  this.s = SPEED;
  this.energy = PLAYERSTARTENERGY;
  this.getSpeed = function()
  {
    return Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
  }
  this.update = function()
  {
    if(alive) // player movement
    {
      if(reefEnergy < 0)
        reefEnergy = 0;
      else if (reefEnergy > MAXREEFENERGY)
        reefEnergy = MAXREEFENERGY;
      
      if(player.energy <= 0 ) // player energy
      {
        player.energy = 0;
      /* if(player.s = FASTSPEED){
      //Play slow down sound      SLOW DOWN SOUND GOES HERE, SLOW DOWN SOUND GOES HERE, SLOW DOWN SOUND GOES HERE
      }
      */
        player.s = SLOWSPEED;
      }
      else
      {
        player.energy += PLAYERENERGYRATE;
         if (player.energy > MAXPLAYERENERGY)
          player.energy = MAXPLAYERENERGY;
        player.s = SPEED;//SPEED
      }

      if (inSilt == true) {
        if(fadeBWPlayer < 1){
          fadeBWPlayer += .01; //Drawing faded sprite over player sprite
        }else if (fadeBWPlayer > 1){
          state = 7;
        }
        if(up) // slowed player movement
          player.y -= REALLYSLOWSPEED;
        if(left)
          player.x -= REALLYSLOWSPEED;
        if(right)
          player.x += REALLYSLOWSPEED;
        if(down)
          player.y += REALLYSLOWSPEED;
      }//end if
      else
      {
        if(up) // normal player movement
          player.y -= player.s;
        if(left)
          player.x -= player.s;
        if(right)
          player.x += player.s;
        if(down)
          player.y += player.s;
        
        if(fadeBWPlayer > 0 && fadeBWPlayer < 1){
          fadeBWPlayer -= .01; //removing faded sprite over player sprite
        }
        if(fadeBWPlayer < 0){
          fadeBWPlayer = 0;
        }
      }
      
      if(player.y > lowerBoundary){ // stay on the reef
        player.y = lowerBoundary
      }
      if(player.y < upperBoundary){
        player.y = upperBoundary;
      }
      if(player.x > rightBoundary){
        player.x = rightBoundary;
      }
      if(player.x < leftBoundary){
        player.x = leftBoundary;
      }
      inSilt = false; // will be reset to true if still in silt
    }
    this.checkCollision(collisionObjects);
  }
  this.draw = function ()
  {
    context.drawImage(zooxBody, this.x-32, this.y-32, zooxBody.width, zooxBody.height);
    context.globalAlpha = fadeBWPlayer;
    context.drawImage(zooxBodyBW, this.x-32, this.y-32, zooxBody.width, zooxBody.height);
    context.globalAlpha = 1;
    context.drawImage(zooxEyes, 0, 0, 64, zooxEyes.height, this.x-32, this.y-32, 64, zooxEyes.height);
    if(right)context.drawImage(zooxEyes, 64, 0, 64, zooxEyes.height, this.x-32, this.y-32, 64, zooxEyes.height);
    else if(left)context.drawImage(zooxEyes, 128, 0, 64, zooxEyes.height, this.x-32, this.y-32, 64, zooxEyes.height);
    else if(up)context.drawImage(zooxEyes, 192, 0, 64, zooxEyes.height, this.x-32, this.y-32, 64, zooxEyes.height);
    else if(down) context.drawImage(zooxEyes, 256, 0, 64, zooxEyes.height, this.x-32, this.y-32, 64, zooxEyes.height);
    else context.drawImage(zooxEyes, 0, 0, 64, zooxEyes.height, this.x-32, this.y-32, 64, zooxEyes.height);
  }
  this.checkCollision = function(stuff)
  {
    for(var i=0; i<stuff.length; i++)
    {
      if(this.r + stuff[i].r >= Math.sqrt(Math.pow(this.x - stuff[i].x, 2) + Math.pow(this.y - stuff[i].y, 2)) && this != stuff[i])//>=
      {
        stuff[i].collide();
      }
    }
  }
} // Zoox constructor

function nutrientParticle(x,y){
  this.x = x;
  this.y = y;
  this.r = Math.random()*2 + 3.5;
  this.lifetime = NUTRIENTLIFETIME/2 + NUTRIENTLIFETIME*Math.random();
  this.alive = true;
  this.draw = function()
  {
    context.drawImage(zooxFood, this.x-(this.r+3), this.y-(this.r+3), 3*this.r, 3*this.r);
  }
  this.collide = function()
  {
    player.energy = PLAYERSTARTENERGY;
    foodSound.play();
    this.alive = false;
  }
} // nutrient particle constructor
function nutrientSystem(threshhold, rate, startnum){
  this.buildup = 0;
  this.particles = [];
  this.threshhold = threshhold;
  this.rate = rate;
  
  this.spawn = function(X,Y)
  {
    var temp = new nutrientParticle(X,Y);
    this.particles.push(temp);
    collisionObjects.push(temp);
  } // spawn new nutrient particle
  for(var i=0; i<startnum; i++)
    this.spawn(Math.random()*(canvas.width-leftBoundary) + leftBoundary, Math.random()*(canvas.height - upperBoundary) + upperBoundary);
  // create starting nutrients
  
  this.cull = function()
  {
    this.buildup += this.threshhold*this.particles.length / 4;
    for(var i=0; i<this.particles.length; i++)
    {
      if(i%2 == 1)
        this.particles[i].alive = false;
    }
  } // destroy half of existing nutrients
  
  this.update = function()
  {
    for(var i=0; i<this.particles.length; i++)
    {
      this.particles[i].lifetime--;
      if(this.particles[i].lifetime <= 0)
        this.particles[i].alive = false;
      
      if(this.particles[i].alive == false)
        this.particles.splice(i, 1);
    } // destroy dead particles
    
    this.buildup += this.rate;
    if(this.buildup >= this.threshhold)
    {
      this.spawn(Math.random()*(canvas.width-leftBoundary) + leftBoundary, Math.random()*(canvas.height - upperBoundary) + upperBoundary);
      this.buildup -= this.threshhold;
    } // create new particle when threshhold is reached
  } // nutrientSystem update
  
  this.draw = function()
  {
    for(var i=0; i<this.particles.length; i++)
      this.particles[i].draw();
  } // nutrientSystem draw
  
} // nutrient system constructor

function siltParticle(x, y, accel, angle){
  this.alive = true;
  this.x = x;
  this.y = y;
  this.r = 4;
  this.speed = SILTSPEED;
  this.accel = accel;
  this.color = 'black';
  this.type = 0; //0 = circle, 1 = triangle
  this.velocity = Math.random()*8 * Math.cos(angle * Math.PI / 180);
  
  this.collide = function()
  {
    inSilt = true;
  } // player collision
} // silt particle constructor
function siltSystem(threshhold, rate, startnum){
  this.buildup = 0;
  this.circles = [];
  this.triangles = [];
  this.threshhold = threshhold;
  this.rate = rate;
  this.spawn = function()
  {
    if (sprayLeft)
      this.circles.push(new siltParticle(canvas.width, range(50,100), .3 + Math.random()*1.7, range(0.01, 0.05), range(-90, 0)));
    else
      this.circles.push(new siltParticle(0, range(50,100), Math.random()*2, range(0.01, 0.1), range(90, 180)));
  } // spawn new silt particle
  
  this.update = function()
  {
    sprayCount++;
    if (sprayCount > 500 && this.buildup < this.threshhold) {
      sprayCount = 0;
      sprayLeft = !sprayLeft;
    }
    for(var i=this.circles.length-1; i>=0; i--)
    {
      if(this.circles[i].alive == false)
        this.circles.splice(i, 1); // destroy dead particles
      else
      {
        if(this.circles[i].y < canvas.height)
        { // silt movement
          this.circles[i].speed += this.circles[i].accel;
          if(sprayLeft)
            this.circles[i].x = this.circles[i].x - this.circles[i].velocity - this.circles[i].accel;
          else
            this.circles[i].x = this.circles[i].x + this.circles[i].velocity + this.circles[i].accel;
          this.circles[i].y += this.circles[i].speed;
          
          if(this.circles[i].y > upperBoundary)
          {
            for(var j=0; j<this.triangles.length; j++)
            {
              if(this.circles[i].r + this.triangles[j].r >= Math.sqrt(Math.pow(this.triangles[j].x - this.circles[i].x, 2) + Math.pow(this.triangles[j].y - this.circles[i].y, 2)))
              {
                this.circles[i].alive = false;
                this.triangles[j].r = Math.sqrt(Math.pow(this.triangles[j].r, 2) + Math.PI * Math.pow(this.circles[i].r, 2)); // adds volume to pile
                this.circles.splice(i,1); // remove from circle list
              } // if appropriate pile found
            } // check pile collision
          } // if below top of reef
          
        } // if still falling
        else
        {
          this.circles[i].y = canvas.height;
          if(this.circles[i].x < 0 || this.circles[i].x > canvas.width)
            this.circles[i].alive = false; // if particle fell off screen
          else
          {
            this.circles[i].r = Math.sqrt(2 * Math.PI / Math.sqrt(3) * Math.pow(this.circles[i].r, 2)); // convert circle radius to triangle height
            this.triangles.push(this.circles[i]); // convert circle to triangle
            collisionObjects.push(this.circles[i]); // enable player collision
            this.circles.splice(i,1); // remove from circle list
          }
        } // if particle hits bottom
      }
    } // update each particle
    
    this.buildup += this.rate;
    if(this.buildup >= this.threshhold)
    {
      this.spawn();
      this.buildup -= this.threshhold;
    } // create new particle when threshhold is reached
  } // siltSystem update
  
  this.draw = function()
  {
    context.fillStyle = 'black';
    for(var i=0; i<this.circles.length; i++)
    {
      context.beginPath();
      context.arc(this.circles[i].x, this.circles[i].y, this.circles[i].r, Math.PI * 2, false);
      context.stroke();
      context.fill();
    } // draw circles
    for(var i=0; i<this.triangles.length; i++)
    {
      context.beginPath();
      context.moveTo(this.triangles[i].x, this.triangles[i].y-this.triangles[i].r);
      context.lineTo(this.triangles[i].x + Math.sqrt(3) * this.triangles[i].r, canvas.height);
      context.lineTo(this.triangles[i].x - Math.sqrt(3) * this.triangles[i].r, canvas.height);
      context.fill()
    } // draw triangles
  } // siltSystem draw
} // silt system constructor

function sunlightParticle(x,y){
  this.x = x;
  this.y = y;
  this.s = SUNLIGHTSPEED;
  this.r = 7;
  this.alive = true;
  this.draw = function()
  {
    context.drawImage(sunlight, this.x-16, this.y-16, 32,32);
  }
  this.collide = function()
  {
    reefEnergy += SUNLIGHTVALUE;
    sunSound.play();
    this.alive = false;
  } // sunlight player collision
} // nutrient particle constructor
function sunlightSystem(threshhold, rate, startnum){
  this.buildup = 0;
  this.particles = [];
  this.threshhold = threshhold;
  this.rate = rate;
  
  this.spawn = function(x,y)
  {
    var temp = new sunlightParticle(x,y);
    this.particles.push(temp);
    collisionObjects.push(temp);
  } // spawn new sunlight particle
  for(var i=0; i<startnum; i++)
    this.spawn(Math.random()*canvas.width, Math.random()*canvas.height);
  // create starting sunlights
  
  this.cull = function()
  {
    this.buildup += this.threshhold*this.particles.length / 4;
    for(var i=0; i<this.particles.length; i++)
    {
      if(i%2 == 1)
        this.particles[i].alive = false;
    }
  } // destroy half of existing sunlights
  
  this.update = function()
  {
    for(var i=0; i<this.particles.length; i++)
    {
      this.particles[i].y += this.particles[i].s;
      if(this.particles[i].y > canvas.height + this.particles[i].r)
        this.particles[i].alive = false;
      
      if(this.particles[i].alive == false)
        this.particles.splice(i, 1);
    } // destroy dead particles
    
    this.buildup += this.rate;
    if(this.buildup >= this.threshhold)
    {
      this.spawn(Math.random()*canvas.width, 0);
      this.buildup -= this.threshhold;
    } // create new particle when threshhold is reached
  } // sunlightSystem update
  
  this.draw = function()
  {
    for(var i=0; i<this.particles.length; i++)
      this.particles[i].draw();
  } // nutrientSystem draw
  
} // nutrient system constructor

function hazardType(warningText1, warningText2,effect){
  this.warningText1 = warningText1;
  this.warningText2 = warningText2;
  this.effect = effect;
} // hazard constructor
function hazardWarning(warningText1, warningText2, lifetime){
  this.lifetime = lifetime;
  this.line1 = warningText1;
  this.line2 = warningText2;
}
function hazardSystem(threshhold, rate){
  this.buildup = threshhold / 2;
  this.warnings = [];
  this.threshhold = threshhold;
  this.rate = rate;
  
  this.spawn = function(n)
  {
    hazards[n].effect();
    this.warnings.push(new hazardWarning(hazards[n].warningText1, hazards[n].warningText2, 55));
  } // spawn new hazard
  
  this.update = function()
  {
    if(this.warnings.length > 0)
    {
      this.warnings[0].lifetime--;
      if(this.warnings[0].lifetime < 0)
        this.warnings.splice(0,1); // destroy expired warning
    } // decrement lifetime of active warning
    
    this.buildup += Math.random()*this.rate;
    if(this.buildup >= this.threshhold)
    {
      this.buildup -= this.threshhold;
      this.spawn(Math.floor(Math.random()*hazards.length));
    } // create new particle when threshhold is reached
  } // nutrientSystem update
  
  this.draw = function()
  {
    if(this.warnings.length > 0)
    {
      var temp = this.warnings[0].lifetime;
      if((temp <= 15) || (temp >= 40) || ((temp <= 35) && (temp >= 20))) // on off on off on dead
      {
        context.font = "50px Verdana";
        context.fillStyle = 'red';
        context.fillText(this.warnings[0].line1, canvas.width/2 - context.measureText(this.warnings[0].line1).width/2, canvas.height/2 - 80);
        context.fillText(this.warnings[0].line2, canvas.width/2 - context.measureText(this.warnings[0].line2).width/2, canvas.height/2);
      }
    }
  } // nutrientSystem draw
  
} // nutrient system constructor
hazards.push(new hazardType("Oceanic Oxygen Depletion", "Inhibits Photosynthesis!", function(){ theSunlightSystem.rate *= HAZARDDEPLETIONRATE; theSunlightSystem.cull(); /*hazard sound?*/ }));
hazards.push(new hazardType("Ocean Acidification", "Damages the Reef!", function(){ decaySpeed /= HAZARDDEPLETIONRATE; /*hazard sound?*/ }));
hazards.push(new hazardType("Rising Ocean Temperatures", "Hamper Reef Growth!", function(){ theNutrientSystem.rate *= HAZARDDEPLETIONRATE; theNutrientSystem.cull(); /*hazard sound?*/ }));
hazards.push(new hazardType("Urban Development Results", "In Increased Silt Runoff!", function(){ theSiltSystem.rate /= HAZARDDEPLETIONRATE; theSiltSystem.buildup += theSiltSystem.threshhold*50; /*hazard sound?*/ }));

function handleKeyDown(e){
  switch(e.keyCode)
  {
    case 87: // up
    case 38:
    case 73:
      up = true;
      break;
    case 74: // left turn
    case 37:
    case 65:
      left = true;
      break;
    case 39: // right turn
    case 68:
    case 76:
      right = true;
      break;
    case 83: // down
    case 75:
    case 40:
      down = true;
      break;
    case 13:
    case 32:
      if(!alive)
        resetGame();
      break;
  }
} // handleKeyDown
function handleKeyUp(e){
  switch(e.keyCode)
  {
    case 87: // up
    case 38:
    case 73:
      up = false;
      break;
    case 74: // left turn
    case 37:
    case 65:
      left = false;
      break;
    case 39: // right turn
    case 68:
    case 76:
      right = false;
      break;
    case 83: // down
    case 75:
    case 40:
      down = false;
      break;
  }
} // handleKeyUp

function resetGame(){
  collisionObjects = new Array();
  player = new Zoox(canvas.width/2, canvas.height/2, 0, 30);
  theNutrientSystem = new nutrientSystem(1000, 100, 15);
  theSunlightSystem = new sunlightSystem(1000, 100, 30);
  theSiltSystem = new siltSystem(500, 45, 0);
  theHazardSystem = new hazardSystem(500, 3)
  updateObjects = [player, theHazardSystem, theNutrientSystem, theSunlightSystem, theSiltSystem];
  drawObjects = [player, theHazardSystem, theNutrientSystem, theSunlightSystem, theSiltSystem];
  coralReset();
  score = 0;
  reefEnergy = REEFSTARTENERGY;
  alive = true;
  inSilt = false;
  sprayLeft = true;
  sprayCount = 0;
} // reset game

function updateGame(){
  
  changeGameState();
  if(alive && state ==2)
  {
    for(var i=collisionObjects.length-1; i>=0; i--)
    {
      if(collisionObjects[i].alive == false)
        collisionObjects.splice(i,1);
    } // remove dead objects from collision list
    
    updateCoral();

    if(coralGrowthResource <= 0){
      alive = false;
      win = false;
    }
    else if(coralGrowthResource >= coralResourceMax){
      alive = false;
      win = true;
    }

    leftBoundary = canvas.width-(coralGrowthResource/coralResourceMax)*canvas.width;

    growthCounter++;
    if(growthCounter % GROWTHTIMER === 0){
      if (reefEnergy < 0){
        reefEnergy = 0;
      } else if(reefEnergy > 0) {
        coralResource += sunlightResource;
        reefEnergy -= 1;
      }
    }

    if (coralResource > 0 && reefEnergy == 0){
      coralResource = coralResource - decaySpeed;
    }
    for(var i=0; i<updateObjects.length; i++)
      updateObjects[i].update();
  }
}
function drawGame(){
  drawWave();
  drawCoral();
  
  for(var i=drawObjects.length-1; i>=0; i--)
  {
    drawObjects[i].draw();
  }
  context.fillStyle = "#000000";
  context.font = "20px Verdana";
  //context.fillText("Player energy: " + Math.floor(player.energy), 10, 30);
  //context.fillText("Reef energy: " + Math.floor(reefEnergy), 10, 60);

//music mute
  if(!gameMusic.muted) context.drawImage(soundIcons, 0, 0, 100, 60, 10, 10, 50, 30);
  else context.drawImage(soundIcons, 100, 0, 100, 60, 10, 10, 50, 30);
  
  //SFX mute
  if(!foodSound.muted && !sunSound.muted) context.drawImage(soundIcons, 200, 0, 100, 60, 80, 10, 50, 30);
  else context.drawImage(soundIcons, 300, 0, 100, 60, 80, 10, 50, 30);

//mute sound detect
  if(mouseX < canvas.offsetLeft+60 && mouseX > canvas.offsetLeft+10 && mouseY < 40 && mouseY > 10) overTitleMute = true;
  else overTitleMute = false;

//mute SFX detect
  if(mouseX < canvas.offsetLeft+130 && mouseX > canvas.offsetLeft+80 && mouseY < 40 && mouseY > 10) overMuteSFX = true;
  else overMuteSFX = false;
}

function drawPause(){
  drawGame();
  context.fillStyle = 'rgba(255,255,255,0.5)';
  context.fillRect(0,0,canvas.width, canvas.height);
  context.font = "32px Verdana";
  context.fillStyle = 'black';
  context.fillText("PAUSE", canvas.width/2, canvas.height/2);
}
function changeGameState(){
  if(paused) state = 5;
  else state = 2;

  if(win && !alive){
    state = 6;
    gameMusic.pause();
  }else if(!win && !alive){
    state = 7;
    gameMusic.pause();
  }
}
