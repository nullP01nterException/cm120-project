canvas = document.getElementById('game');
context = canvas.getContext('2d');

//general variables
var state = 0;
var mouseX = 0;
var mouseY = 0;

//reef Variables
var growthSpeed = .005; //control is .01.  Though messing with this does mess with mechanics atm... woops
var decaySpeed = .4;   //control is .4
var growthResourceRate = 1; //another thing that turns out shouldn't be messed with without knowledge
var sunlightResource = 2;
var branchXStretch = 100; //control is 100 atm
// ^---This controls the amount that each branch may stray from the center horizontally, treat value like a diameter, not radius!!
var branchYStretch = 10; //control is 0 atm
// ^---This controls the amount the branches tend to rise, 0 means slim chance for horizontal, anything above 0 forces the branches to diagonally travel upwards.
var stemLeanMax = 20; //The max amount of pixels that the top of the stem will be from the bottom of the stem. Treat like a radius value!!
var numBranches = 8   +1; //The +1 is to account for the stem
var numTrees = 20;
var coralResourceMax = numTrees*100;
var coralResourceOG = .5*coralResourceMax;
var coralResource = coralResourceOG; //Starting resource for the player
var coralGrowthResource = coralResource; //what the coral uses to grow, constantly moves towards coral resource
var coralStemMaxY = .55; //PERCENTAGE, 0 is 100%, control is .55

//state = 0 (title)
var titleOver = false;
var titleCreditOver = false;
var titleInstructOver = false;
var overTitleMute = false;
var titleSoundMuted = false;

//state = 2 (gameScreen)
var paused = false;
var overMuteSFX = false;
var gameSoundMuted = false;
var SFXMuted = false;

//state = 3 (credits)
var overCreditBack = false;

//state = 4 (instrtuctions)
var overInstructBack = false;

//ui events
var mouseClicked = false;

var updateObjects = new Array();
var drawObjects = new Array();
var collisionObjects = new Array();


var SILTRATE = .05;//.05
var SILTSPEED = 1.9;//1.9
var SILTVALUE = -3;
var siltParticles = new Array();

var SPEED = 5;
var SLOWSPEED = 2;
var SUNLIGHTSPEED = 2;
var PLAYERENERGYRATE = -.06;
var PLAYERSTARTENERGY = 10;
var REEFENERGYRATE = -5;
var REEFSTARTENERGY = 20;
var MAXPLAYERENERGY = 100;
var MAXREEFENERGY = 100;
var SUNLIGHTVALUE = 4;
var NUTRIENTVALUE = 3;
var REEFGROWTHRATE = canvas.width / 300;

var growthCounter = 0;
var GROWTHTIMER = 4;

var reefEnergy = REEFSTARTENERGY;
var upperBoundary = canvas.height * 2 / 3;
var lowerBoundary = canvas.height;
var rightBoundary = canvas.width;
var leftBoundary = canvas.width / 2;
var score = 0;
var alive = true;

var up = false;
var left = false;
var right = false;
var down = false;

var pressedKey = 0;
var upKey = false;
var leftKey = false;
var rightKey = false;
var downKey = false;
var keyDown = false;

//gameState
var win = null;

var ceiling = canvas.height * 0.9; // for pushing player
var inSilt = null;// for detecting if player is in silt and slowing them down

//pictures
var zooxBody = new Image();
zooxBody.src = '../data/zooxBody.gif';
zooxBody.width = 64;
zooxBody.height = 64;

var zooxEyes = new Image();
zooxEyes.src = '../data/zooxEyes.gif';
zooxEyes.width = 320;
zooxEyes.height = 64;

var sunlight = new Image();
sunlight.src = '../data/sun.png';
sunlight.width = 64;
sunlight.height = 64;

var zooxFood = new Image();
zooxFood.src = '../data/food.png';
zooxFood.width = 64;
zooxFood.height = 64;

 var soundIcons = new Image();
 soundIcons.src = '../data/soundIcons.png';
 soundIcons.width = 400;
 soundIcons.height = 60;

//star pictures
var star1 = new Image();
star1.src = '../data/star1.png';

var star2 = new Image();
star2.src = '../data/star2.png';

var star3 = new Image();
star3.src = '../data/star3.png';

var star4 = new Image();
star4.src = '../data/star4.png';

var star5 = new Image();
star5.src = '../data/star5.png';

var star6 = new Image();
star6.src = '../data/star6.png';

var starArray = new Array();
starArray.push(star1);
starArray.push(star2);
starArray.push(star3);
starArray.push(star4);
starArray.push(star5);
starArray.push(star6);

//variable for star flash
var starBuffer = 0;
var rand = Math.floor(Math.random()*6);

//audio
var music = new Audio('../data/Green-Bird.mp3');
var gameMusic = new Audio('../data/Peaceful-Nights-.mp3');
gameMusic.muted = false;
var foodSound = new Audio('../data/Climbing-cut.mp3');
foodSound.muted = false;
var sunSound = new Audio('../data/Ting-cut.mp3');
sunSound.muted = false;

//silt spraying variable
var sprayLeft = true;
var sprayCount = 0;
