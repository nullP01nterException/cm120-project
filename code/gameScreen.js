function Zoox(x, y, speed, radius)
{
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
    
    if(player.energy <= 0) // player energy
    {
      player.energy = 0;
      player.s = SLOWSPEED;
    }
    else
    {
      player.energy += PLAYERENERGYRATE;
      if(player.energy < 0)
        player.energy = 0;
      else if (player.energy > MAXPLAYERENERGY)
        player.energy = MAXPLAYERENERGY;
      player.s = SPEED;
    }
    
    if(up) // player movement
      player.y -= player.s;
    if(left)
      player.x -= player.s;
    if(right)
      player.x += player.s;
    if(down)
      player.y += player.s;
    
    if(player.y > lowerBoundary) // stay on the reef
      player.y = lowerBoundary
    if(player.y < upperBoundary)
      player.y = upperBoundary;
    if(player.x > rightBoundary)
      player.x = rightBoundary;
    if(player.x < leftBoundary)
      player.x = leftBoundary;
  }
    this.checkCollision(collisionObjects);
  }
  this.draw = function ()
  {
    context.fillStyle = 'orange';
    context.beginPath();
    context.arc(this.x, this.y, this.r, Math.PI*2, false) 
    context.stroke();
    context.fill()
  }
  this.checkCollision = function(stuff)
  {
    for(var i=0; i<stuff.length; i++)
    {
      if(this.r + stuff[i].r >= Math.sqrt(Math.pow(this.x - stuff[i].x, 2) + Math.pow(this.y - stuff[i].y, 2)) && this != stuff[i])
      {
        stuff[i].collide();
      }
    }
  }
} // Zoox constructor

function nutrientParticle(x,y)
{
  this.x = x;
  this.y = y;
  this.r = Math.random()*2 + 4;
  this.draw = function()
  {
    context.fillStyle = 'brown';
    context.beginPath();
    context.arc(this.x, this.y, this.r, Math.PI*2, false) 
    context.stroke();
    context.fill()
  }
  this.collide = function()
  {
    player.energy += NUTRIENTVALUE;
    this.reset();
  }
  this.reset = function()
  {
    this.x = Math.random()*(canvas.width-leftBoundary) + leftBoundary;
    this.y  = Math.random()*(canvas.height - upperBoundary) + upperBoundary;
    this.r = Math.random()*1.5 + 2;
  }
} // nutrient particle

function sunlightParticle(x,y)
{
  this.x = x;
  this.y = y;
  this.s = SUNLIGHTSPEED;
  this.r = 7;
  this.draw = function()
  {
    context.fillStyle = 'yellow';
    context.beginPath();
    context.arc(this.x, this.y, this.r, Math.PI*2, false) 
    context.stroke();
    context.fill()
  } // sunlight draw
  this.collide = function()
  {
    reefEnergy += SUNLIGHTVALUE;
    this.reset();
  } // sunlight player collision
  this.update = function()
  {
    this.y += this.s;
    if(this.y > canvas.height + this.r)
      this.reset();
  } // sunlight update
  this.reset = function()
  {
    this.x = Math.random()*canvas.width;
    this.y  = 0;
  } // sunlight reset
} // sunlight particle

function Silt(x, y, radius, lifetime, color, type)
{ //creating Particle object, lifetime: how long on screen
  this.x = x;
  this.y = y;
  this.r = radius;
  this.speed = SILTSPEED;
  this.lifetime = lifetime;
  this.color = color;
  this.type = type; //0 = circle, 1 = triangle

  this.draw = function()
  {
  	if(this.type == 0 || this.type == 2) // falling circle
    {
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.r, Math.PI * 2, false);
      context.stroke();
      context.fill();
    }
    else if(this.type == 1) // stationary triangle (pile)
    {
      context.fillStyle = this.color;
      context.beginPath();
      context.moveTo(this.x, this.y-this.r);
      context.lineTo(this.x + Math.sqrt(3) * this.r, canvas.height);
      context.lineTo(this.x - Math.sqrt(3) * this.r, canvas.height);
      context.fill()
    }
  } // draw

  this.reset = function()
  {
    this.y = 0;
    this.lifetime = canvas.height;
    this.x = Math.random() * canvas.width;
  } // reset

  this.update = function()
  {
    if (this.lifetime > 0 || this.y < canvas.height)
    {
      this.y += this.speed * 0.5; //moves y down particles[i].speed0.3
      this.lifetime--;
    }
    if (this.y > canvas.height && this.type != 2)
    {
      if(this.type != 3)
        this.type = 1; // becomes a triangle at the bottom unless it is already set to be destroyed
    } //end if
    else if (this.y > canvas.height && this.type == 2)
    {
      //resets the projectile as a regular silt particle
      this.type = 3; // self destruct
    } //end else if
  } //end update
  
  this.collide = function()
  {
    player.energy += SILTVALUE;
    if(player.energy < 0)
      player.energy = 0;
    this.type = 3;
  } // player collision
    
  this.siltPiling = function(obj)
  {
    for (var i = 0; i < obj.length; i++)
    {
    
      //Case: white particle on pile:
      if (this.type == 1 &&  obj[i].type != 1 && this.r + obj[i].r >= Math.sqrt(Math.pow(this.x - obj[i].x, 2) + Math.pow(this.y - obj[i].y, 2)) && this != obj[i])
      {
        var index = obj.indexOf(obj[i]);
        obj.splice(index, 1);//removes particle that fell
        this.type = 1;//changes the type to a triangle
        this.r = Math.sqrt(Math.pow(this.r + 3, 2)); // adds volume to pile
      }//end if
          
      //Case: red particle on pile:   
      else if (this.type == 2 &&  obj[i].type != 2 && obj[i].type != 0 && this.r + obj[i].r >= Math.sqrt(Math.pow(this.x - obj[i].x, 2) + Math.pow(this.y - obj[i].y, 2)) && this != obj[i])
      {
        var index = obj.indexOf(obj[i]);
        obj.splice(index, 1); //removes pile
      }//end else
    } //end for
  } //end siltPiling
    
} // silt particle constructor


function nutrientSystem(n)
{
  for(var i=0; i<n; i++)
  {
    var temp = new nutrientParticle(Math.random()*(canvas.width-leftBoundary) + leftBoundary, Math.random()*(canvas.height - upperBoundary) + upperBoundary);
    drawObjects.push(temp);
    collisionObjects.push(temp);
  }
} // nutrientSystem

function sunlightSystem(n)
{
  for(var i=0; i<n; i++)
  {
    var temp = new sunlightParticle(Math.random()*canvas.width, Math.random()*canvas.height);
    drawObjects.push(temp);
    updateObjects.push(temp);
    collisionObjects.push(temp);
  }
} // sunlightSystem

function resetGame()
{
  updateObjects = new Array();
  drawObjects = new Array();
  collisionObjects = new Array();
  player = new Zoox(canvas.width/2, canvas.height/2, 0, 30);
  updateObjects.push(player);
  drawObjects.push(player);
  //collisionObjects.push(player);
  nutrientSystem(15);
  sunlightSystem(30);
  score = 0;
  reefEnergy = REEFSTARTENERGY;
  alive = true;
} // reset game

function handleKeyDown(e)
{
  switch(e.keyCode)
  {
    case 87: // up
    case 38:
    case 73:
      up = true;
      break;
    case 74: // left turn
    case 37:
    case 87:
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
function handleKeyUp(e)
{
  switch(e.keyCode)
  {
    case 87: // up
    case 38:
    case 73:
      up = false;
      break;
    case 74: // left turn
    case 37:
    case 87:
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

function updateGame()
{
	changeGameState();
  
  if(alive)
  {
    if(Math.random() < SILTRATE)
    {
      var temp = new Silt(Math.random()*canvas.width, 0, 5, 0, 'black', 0);
      updateObjects.push(temp);
      drawObjects.push(temp);
      collisionObjects.push(temp);
    }
    
    growthCounter++;
    if(growthCounter % GROWTHTIMER === 0)
    {
      reefEnergy += REEFENERGYRATE;
      if(reefEnergy < 0)
      {
        leftBoundary += (reefEnergy / REEFENERGYRATE) * REEFGROWTHRATE;
        reefEnergy = 0;
        if(leftBoundary >= rightBoundary)
          alive = false;
      }
      else
      {
        leftBoundary -= REEFGROWTHRATE;
        if(leftBoundary <= 0)
          alive = false;
      }
    }
    for(var i=0; i<updateObjects.length; i++)
    {
      updateObjects[i].update();
    }
    for (var i = 0; i < siltParticles.length; i++)
    {
      if(siltParticles[i].type == 3)
      {
        console.log(collisionObjects.indexOf(siltParticles[i]));
        siltParticles.splice(i, 1); // destroys particle
      }
      else
        siltParticles[i].siltPiling(siltParticles);
    } // silt collision
  }
}

function drawGame(){
	drawWave();
    
  context.fillStyle = 'green';
  context.fillRect(leftBoundary,upperBoundary,canvas.width, canvas.height); 
  
  for(var i=drawObjects.length-1; i>=0; i--)
  {
    drawObjects[i].draw();
  }
  context.fillStyle = "#000000";
  context.font = "20px Verdana";
  context.fillText("Player energy: " + Math.floor(player.energy), 10, 30);
  context.fillText("Reef energy: " + Math.floor(reefEnergy), 10, 60);
}

function drawPause(){
	context.font = "32px Verdana";
	context.fillStyle = 'black';
	context.fillText("PAUSE", canvas.width/2, canvas.height/2);
}

function changeGameState(){
	if(paused) state = 5;
	else state = 2;
}
