var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var dogFeed;
var feed,lastFed;
var fedTime;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
    dogFeed = createButton("feed the Dog");
    dogFeed.position(700,95);
    dogFeed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  lastFed = database.ref('feedTime');
  lastFed.on("value",function(data){
    fedTime = data.val();
  })
  fill("red");
  textSize(20);
  if(fedTime>12){
    text("lastFeed :" + fedTime%12 + "PM",350,30);

  }
  else if(lastFed===0) {
    text("lastFeed : 12 AM",350,30);
  }
  else{
    text("lastFeed : " + fedTime + "AM",350,30)
  }

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStock = foodObj.getFoodStock();
  if(foodStock<0){
    foodObj.updateFoodStock(foodStock*0);
  }
  else{
    foodObj.updateFoodStock(foodStock-1);
  }
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    feedTime : hour()
  })
 



}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
