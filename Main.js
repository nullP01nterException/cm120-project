    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    var updateObjects = new Array();
    var drawObjects = new Array();
    var collisionObjects = new Array();
    
    var SPEED = 5;
    var SLOWSPEED = 2;
    var SUNLIGHTSPEED = 2;
    var PLAYERENERGYRATE = -.06;
    var PLAYERSTARTENERGY = 100;
    var REEFENERGYRATE = -5;
    var REEFGROWTHRATE = canvas.width / 100;
    var REEFSTARTENERGY = PLAYERSTARTENERGY;
    var MAXPLAYERENERGY = PLAYERSTARTENERGY;
    var MAXREEFENERGY = MAXPLAYERENERGY;
    var SUNLIGHTVALUE = 3;
    var NUTRIENTVALUE = 1;
    
    var growthCounter = 0;
    var GROWTHTIMER = 20;
    
    var reefEnergy = REEFSTARTENERGY;
    var upperBoundary = canvas.height * 2 / 3;
    var lowerBoundary = canvas.height;
    var rightBoundary = canvas.width;
    var leftBoundary = canvas.width / 2;
    var score = 0;
    var alive = true;
    
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
          //console.log(Math.sqrt(Math.pow(this.x - stuff[i].x, 2) + Math.pow(this.y - stuff[i].y, 2)));
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
        console.log(this.y);
      } // sunlight update
      this.reset = function()
      {
        this.x = Math.random()*canvas.width;
        this.y  = 0;
      } // sunlight reset
    } // sunlight particle
    
    
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

    function update()
    {
      if(alive)
      {
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
      }
    } // update
	
    function draw()
    {
      canvas.width = canvas.width;
      context.fillStyle = 'blue';
      context.fillRect(0,0,canvas.width, canvas.height); 
      context.fillStyle = "#FFFFFF";
      context.font = "20px Verdana";
      //context.fillText("Use arrow keys to accelerate and turn.", canvas.width/2 - context.measureText("Use arrow keys to accelerate and turn.").width/2, canvas.height - 70);
      //context.fillText("Remain on screen as long as possible!", canvas.width/2 - context.measureText("Remain on screen as long as possible!").width/2, canvas.height - 40);
      
      
      context.fillStyle = 'green';
      context.fillRect(leftBoundary,upperBoundary,canvas.width, canvas.height); 
      
      for(var i=drawObjects.length-1; i>=0; i--)
      {
        drawObjects[i].draw();
      }
      context.fillStyle = "#FFFFFF";
      context.font = "20px Verdana";
      context.fillText("Player energy: " + Math.floor(player.energy), 10, 30);
      context.fillText("Reef energy: " + Math.floor(reefEnergy), 10, 60);
    } // draw

    function gameLoop()
    {
      update();
      draw();
    } // gameLoop
    
    var up = false;
    var left = false;
    var right = false;
    var down = false;
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
    
    function resetGame()
    {
      updateObjects = new Array();
      drawObjects = new Array();
      collisionObjects = new Array();
      player = new Zoox(canvas.width/2, canvas.height/2, 0, 30);
      updateObjects.push(player);
      drawObjects.push(player);
      collisionObjects.push(player);
      nutrientSystem(15);
      sunlightSystem(30);
      score = 0;
      alive = true;
    } // reset game
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    resetGame();
    setInterval(gameLoop, 30)
