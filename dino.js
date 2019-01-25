var frame=0
var canvas = document.getElementById("canvas")
var ctx=canvas.getContext("2d");
dinoPosition={ x:500, y:280, height:100, width:100}
cactusPositions=[{x:1300, y:280, height:100, width:100}]
var gameOver = false


var dino= new Image()
dino.src ="dino.png"
var cactus= new Image()
cactus.src="cactus.png"
var background=new Image()
background.src="https://img.itch.zone/aW1hZ2UvNzczNzQvMzYxOTY4LnBuZw==/347x500/h4b%2Bco.png"

function hasHit(box1, box2) {
  var box1Right = box1.x + box1.width
  var box1Bottom = box1.y + box1.height  
  var box2Right = box2.x + box2.width
  var box2Bottom = box2.y + box2.height  
  
  if(box1Right > box2.x && box2Right > box1.x && 
    box1Bottom > box2.y && box2Bottom > box1.y) return true;
  else return false
}



function update(){
  updateWorld()
  drawEverything()
  detection()
}

var intervalId = setInterval(update,20)

function updateWorld (){
  frame+=1
  //adding new cactus
  if(frame%100==0){
    cactusPositions.push({x:1300, y:280, height:100, width:100})
  } 
  // making cactus move to the left
  for (var i=0; i<cactusPositions.length; i++){
    cactusPositions[i].x=cactusPositions[i].x-10
  }	
}

function detection () {
  for (var i=0; i<cactusPositions.length; i++){
  	if (hasHit(dinoPosition, cactusPositions[i])){
      gameOver = true;
    }
    if(gameOver) {
      var go = document.querySelector("#gameover")
      go.style.display = "block"
      clearInterval(intervalId)
      go.onclick = function() {
        go.style.display = "none"
        restart()
      }
    }    
  }
}

function restart(){
  cactusPositions=[]
  intervalId = setInterval(update,20)
  gameOver = false
}

function drawEverything(){
  ctx.clearRect(0,0,1300,800)
  ctx.drawImage(background,0,0,1300,400)
  for (var i=0; i<cactusPositions.length; i++) {
      ctx.drawImage(cactus,cactusPositions[i].x, cactusPositions[i].y,
        cactusPositions[i].width, cactusPositions[i].height) 
  } 
  
  ctx.drawImage(dino,dinoPosition.x,dinoPosition.y,dinoPosition.width,dinoPosition.height)
}

window.onkeydown = function(event) {
  event.preventDefault()  
  if(event.keyCode==40) { //down
    dinoPosition.y = dinoPosition.y+10
  } else if(event.keyCode==38) {//up
    dinoPosition.y = dinoPosition.y-10
  } else if(event.keyCode==39) {//right
    dinoPosition.x = dinoPosition.x+10
  } else if(event.keyCode==37) {//left
    dinoPosition.x = dinoPosition.x-10
  } else if(event.keyCode==32) {//spacebar
    dinoPosition.y = dinoPosition.y-150 
    setTimeout(function(){
          dinoPosition.y+=150        
    },500)
  }
}