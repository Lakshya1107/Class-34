//Create variables here
var dog, happydog, database, foodS, foodStock;
var dogspr;
function preload(){
  //load images here
  dog = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dogspr = createSprite(250, 340, 20, 20);
  dogspr.addImage(dog);
  dogspr.scale = 0.25;
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  //add styles here

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogspr.addImage(happydog);
  }

  textSize(20);
  fill(255);
  stroke(0);
  text("Press UP_ARROW key to feed max milk", 80, 40);
  text("Food remaining: "+ foodS, 150, 200);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref("/").update({
    food:x
  })
}