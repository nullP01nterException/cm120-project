//Silt particle system progress:
// 5/13/16: particles fall and become piles, piles increase
//          in size when more silt particles fall on them;
//					Added red particles that destroy a pile, will reset as a
//          regular silt particle at the top of the screen.

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); //drawing 2d context

var silt_particles = []; //or new Array()

function Silt(x, y, radius, lifetime, color, type) { //creating Particle object, lifetime: how long on screen
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speed = radius * Math.random() * 0.5;
  this.lifetime = lifetime;
  this.color = color;
  this.type = type; //0 = circle, 1 = triangle

  this.draw = function() {
  	if(this.type == 0 || this.type == 2) {
  	//Draws a circle
      	context.fillStyle = this.color;
      	context.beginPath();
      	context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
      	context.stroke();
      	context.fill();
      }
     else {
     	//draws triangle
     		context.fillStyle = this.color;
     		context.beginPath();
        context.moveTo(this.x, this.y-this.radius);
        context.lineTo(this.x + Math.sqrt(3) * this.radius, canvas.height);
        context.lineTo(this.x - Math.sqrt(3) * this.radius, canvas.height);
        context.fill()
      }
    } //end draw()

  this.reset = function() {
      this.y = 0;
      this.lifetime = canvas.height;
      this.x = Math.random() * canvas.width;
    } //end reset

  this.update = function() {
      if (this.lifetime > 0 || this.y < canvas.height) {
        this.y += this.speed * 0.5; //moves y down particles[i].speed0.3
        this.lifetime--;
      }
      if (this.y > canvas.height && this.type != 2) {
        this.type = 1; //truns the silt into a triangle/pile
      } //end if
      else if (this.y > canvas.height && this.type == 2) {
      	//resets the projectile as a regular silt particle
        this.type = 0;
        this.color = 'white';
        this.reset();
      } //end else if
    } //end update
    
  this.collisionCheck = function(obj, iter) {
      for (var i = 0; i < obj.length; i++) {
      
        //Case: white particle on pile:
        if (this.type == 1 &&  obj[i].type != 1 && this.radius + obj[i].radius >= Math.sqrt(Math.pow(this.x - obj[i].x, 2) + Math.pow(this.y - obj[i].y, 2)) && this != obj[i]) {
            var index = obj.indexOf(obj[i]);
            obj.splice(index, 1);//removes particle that fell
            this.type = 1;//changes the type to a triangle
            this.radius = Math.sqrt(Math.pow(this.radius + 3, 2)); //adds to pile
            }//end if
            
       //Case: red particle on pile:   
       else if (this.type == 2 &&  obj[i].type != 2 && obj[i].type != 0 && this.radius + obj[i].radius >= Math.sqrt(Math.pow(this.x - obj[i].x, 2) + Math.pow(this.y - obj[i].y, 2)) && this != obj[i]) {
          	var index = obj.indexOf(obj[i]);
            obj.splice(index, 1); //removes pile
          }//end else
      } //end for
    } //enc collisionCheck
    
} //end Silt()


function silt_system(numSilt) { //maintain some number of particles
  for (var iter = 0; iter < numSilt; iter++) {
    //particle starts at random xPos and top of screen
    silt_particles.push(new Silt(Math.random() * canvas.width, 0, 5 , Math.random() * 10, 'white', 0));
  } //end for
} //end silt_system

silt_system(150);

//Creates a new particle that will destroy a pile
canvas.addEventListener('click', handleClick);
function handleClick(e) {
	silt_particles.push(new Silt(e.clientX, e.clientY, 5, Math.random() * 10, 'red', 2));
}//end handleClick()

function update() {
  //movement is relative to radius, bigr ones move faster
  for (var iter = 0; iter < silt_particles.length; iter++) {
    silt_particles[iter].update();
    silt_particles[iter].collisionCheck(silt_particles, iter);
  } //end for
} //end update()

function draw() {
  canvas.width = canvas.width;

  //draws black rectangle
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (var iter = 0; iter < silt_particles.length; iter++) {
    silt_particles[iter].draw();
  } //end for
} //end draw()

function game_loop() {
  update();
  draw();
} //end game_loop

setInterval(game_loop, 30);
