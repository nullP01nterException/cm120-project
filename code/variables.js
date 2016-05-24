canvas = document.getElementById('game');
context = canvas.getContext('2d');

//general variables
var state = 0;
var mouseX = 0;
var mouseY = 0;

//state = 0 (title)
var titleOver = false;
var titleCreditOver = false;
var titleInstructOver = false;

//state = 2 (gameScreen)
var paused = false;

//state = 3 (credits)
var overCreditBack = false;

//state = 4 (instrtuctions)
var overInstructBack = false;

//ui events
var mouseClicked = false;

var updateObjects = new Array();
var drawObjects = new Array();
var collisionObjects = new Array();


var SILTRATE = .05;
var SILTSPEED = 1.9
var SILTVALUE = -3;
var siltParticles = new Array();

var SPEED = 5;
var SLOWSPEED = 2;
var SUNLIGHTSPEED = 2;
var PLAYERENERGYRATE = -.06;
var PLAYERSTARTENERGY = 50;
var REEFENERGYRATE = -5;
var REEFSTARTENERGY = 50;
var MAXPLAYERENERGY = 100;
var MAXREEFENERGY = 100;
var SUNLIGHTVALUE = 5;
var NUTRIENTVALUE = 3;
var REEFGROWTHRATE = canvas.width / 300;

var growthCounter = 0;
var GROWTHTIMER = 20;

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

//audio
var moveNoise = new Audio('../data/WaterSplash.mp3');
var music = new Audio('../data/Nichijou---ZzzInstrumental.mp3');
var gameMusic = new Audio('../data/Inspiration.mp3');
var waves = new Audio('../data/BeachWaves.mp3');