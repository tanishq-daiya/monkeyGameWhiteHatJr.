var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, frameCount;
var FoodGroup, obstacleGroup;
var score, survivalTime;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_image = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 200);
  score = 0;
  
  survivalTime = 0;
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.debug = true;
  monkey.setCollider("rectangle", 0, 0, monkey.width,monkey.height - 5);
  
  ground = createSprite(200,200,400,20);
  ground.x = ground.width /2;
  ground.visible = false;
  obstaclesGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background(200);
  ground.velocityX = -5;
  text("Score: " + score, 450,50);
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 450,65);
  
  if(gameState === PLAY){
    if(keyDown("space") && monkey.y >= 150) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.4;
    monkey.collide(ground);

    if(ground.x < ground.width){
      ground.x = 0;
    }
    
    if(monkey.isTouching(obstaclesGroup)){
      gameState = END;
    }
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score += 1;
    }
    
    spawnObstacles();
    spawnBananas();
  }
  if(gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.destroy();
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);   
  }
  drawSprites();
}

function spawnObstacles(){
  if (frameCount % 80 === 0){
    var obstacle = createSprite(600,200,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
   
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function spawnBananas(){
  if (frameCount % 80 === 0){
    var food = createSprite(600,Math.round(random(50, 100)),10,40);
    food.velocityX = -6;
    food.addImage(bananaImage);
    food.scale = 0.1;
   
    food.lifetime = 300;
    FoodGroup.add(food);
 }
}






