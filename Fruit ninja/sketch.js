var sword,fruit1,fruit2,fruit3,fruit4,Enemy,monster;
var swordImage,fruit1Image,fruit2Image,fruit3Image,fruit4Image,monsterImage;
var PLAY =1;
var END =0;
var gameState =1;
var fruitsGroup,EnemyGroup;
var gameoverImage;
var score;
var gameoverImage;
var knifeSwooshSound,gameoverSound;

function preload(){
  swordImage = loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  monsterImage = loadImage("alien1.png","alien2.png");
  gameoverImage = loadImage("gameover.png");
 knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
}

function setup(){
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale =0.5;
  
 fruitsGroup = createGroup();
  EnemyGroup = createGroup();
  
  score=0;
}

function draw(){
  
 createCanvas(600,400);
  background("lightblue");
 
   if(gameState === PLAY){
  fruits();
 Enemy();
     
     sword.y=World.mouseY;
  sword.x=World.mouseX;
     
      if (fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
    score=score+1 ;
         knifeSwooshSound.play();
  }
     
     if (EnemyGroup.isTouching(sword)){
    sword.addImage(gameoverImage);
       sword.scale=0.7;
       sword.x=300;
       sword.y=200;
    gameState =END;
     fruitsGroup.destroyEach();
       EnemyGroup.destroyEach();
       fruitsGroup.setVelocityXEach(0);
       EnemyGroup.setVelocityXEach(0);
         gameoverSound.play();
  }
     
 }

    
  drawSprites();
  text("Score: "+ score, 500,50);
}

function fruits(){
  if (frameCount%80 ===0){
     position = Math.round(random(1,2));
  var  fruit = createSprite(600,400,20,20);
    fruit.scale=0.2;
    // fruit.debug=true;
    r=Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1Image);
    } else if ( r == 2){
      fruit.addImage(fruit2Image);
    }else if ( r == 3){
      fruit.addImage(fruit3Image);
    }else if ( r == 4){
      fruit.addImage(fruit4Image);
    }
     fruit.y= Math.round(random(50,340));
  
    
   
    if(position==1){
      fruit.x=600;
      fruit.velocityX=-(7+(score/4));
    }else if(position==2){
      fruit.x=0;
      fruit.velocityX = (7+(score/4));
    }
    
    fruitsGroup.add(fruit);
  }
}

function Enemy(){
  if (World.frameCount%200 ===0){
   monster = createSprite(600,200,20,20);
   monster.addAnimation("moving",monsterImage);
   monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score+10));
    monster.setLifetime=50;
    EnemyGroup.add(monster);
  }
}