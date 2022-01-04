const startBtn = document.getElementById('start-button');
const gameIntro = document.getElementById('game-intro');
const gameScreen = document.getElementById('game-screen')
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

//BG IMAGE
const bgImg = new Image();
bgImg.src = "./Images/bgField.jpg";

//SCORE ICONS
const healthImg = new Image();
healthImg.src = "./Images/heart.png";

const painImg = new Image();
painImg.src = "./Images/painicon.png";


//PLAYER IMG
//Replace -const gamePlayer = new Player(20,20,50,50, 'aliceblue')- with an image:
const gamePlayer = new Image();
gamePlayer.src = "./Images/girl.png";

//OBJECT IMAGES
const kiwi = new Image(); //new Image() is the code for generating new image via JS
kiwi.src = "./Images/kiwi.png"; //this is the source it takes the image from 

const yoga = new Image();
yoga.src = "./Images/yoga.png";

const water = new Image();
water.src = "./Images/water.png";

const sleep = new Image();
sleep.src = "./Images/sleep.png";

const smoke = new Image();
smoke.src = "./Images/smoke.png";

const alcohol = new Image();
alcohol.src = "./Images/alcohol.png";

const onion = new Image();
onion.src = "./Images/onion.png";

const stress = new Image();
stress.src = "../Images/stress.png";

//SCORE BOARD

let healthScore = 0;
let painScore = 0;


 function drawScore(){
    ctx.drawImage(healthImg, 10, 10, 30, 23)
    ctx.drawImage(painImg, 10, 43, 23, 30)
    ctx.font = '18px verdana' //change text color to white 
    ctx.fillText(`Health Score: ${healthScore}`, 50, 28)
    ctx.fillText(`Pain Score: ${painScore}`, 50, 62)
} 

//Movement of player using velocity and speed
let horizontalSpeed = 0
let verticalSpeed = 0
let SPEED = 4

//PLAYER
class playerObject {
    constructor(objImg, objX, objY, objW, objH){
        this.img = objImg 
        this.x = objX
        this.y = objY
        this.w = objW
        this.h = objH
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        this.move()
    }
    
    move() {
        
        const canMoveUp = this.y + verticalSpeed > 0
        const canMoveDown = this.y + verticalSpeed < canvas.height - this.h 
        const canMoveLeft = this.x + horizontalSpeed > 0 
        const canMoveRight = this.x + horizontalSpeed < canvas.width - this.w 

        if (canMoveUp && canMoveDown) {
            this.y += verticalSpeed
        }

        if(canMoveLeft && canMoveRight) {
            this.x += horizontalSpeed
        }

       /*  if (this.y + verticalSpeed > 0 && this.y < canvas.height - this.h) {
            this.y += verticalSpeed
        }

        if (this.x > 0 && this.x + 10 < canvas.width - this.w){
            this.x +=horizontalSpeed
        } */
    }

/*     moveUp(){
       if(this.y > 0) this.y -=16
    }

    moveDown(){
       if(this.y < canvas.height - this.h) this.y +=16;
    }

    moveLeft(){
        if(this.x > 0) this.x -=16
    }

    moveRight(){
        if(this.x + 10 < canvas.width - this.w) this.x +=16
    }  */

}

//CREATE THE PLAYER OBJECT
const player = new playerObject (gamePlayer, 150, 190, 65, 160)

//RANDOM FALLING POSITION OF OBJECTS ALONG X-AXIS WITHIN THE CANVAS WIDTH:
let randomNumber = Math.floor(Math.random() * canvas.width);



//FALLING OBJECTS
class fallingObjects {
    constructor(objImg, objX,objY, objW, objH, isHealthy){
        this.img = objImg 
        this.x = objX
        this.y = objY
        this.w = objW
        this.h = objH
        this.isHealthy = isHealthy
        this.speed = isHealthy ? 2 : 4
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, 50, 50)
        this.fallDown()
    }

    fallDown() {
       // this.y = this.y +2
       if(this.y + this.speed > 504) {
           this.y = -50
           this.x = Math.floor(Math.random()*canvas.width - 50)
       } else {
           this.y = this.y + this.speed
       }
    }
  
}
//these objects are coded to fall down from top:
// let kiwiObj = new fallingObjects(kiwi, Math.floor(Math.random()*(canvas.width + 50) + canvas.width - 50), -10, 50, 50, true)
// let yogaObj = new fallingObjects(yoga, Math.floor(Math.random()*(canvas.width + 50) + canvas.width - 50), -10, 50, 50, true)
// let sleepObj = new fallingObjects(sleep, Math.floor(Math.random()*(canvas.width + 50) + canvas.width - 50), -10, 50, 50, true) 
// let waterObj = new fallingObjects(water, Math.floor(Math.random()*(canvas.width + 50) + canvas.width - 50), -10, 50, 50, true)

// let alcoholObj = new fallingObjects(alcohol, Math.floor(Math.random()*(canvas.width + 50) + canvas.width - 50), -10, 50, 50, false)
// let stressObj = new fallingObjects(stress, Math.floor(Math.random()*(canvas.width + 50) + canvas.width - 50), -10, 50, 50, false)
// let onionObj = new fallingObjects(onion, Math.floor(Math.random()*(canvas.width + 50) + cavas.width - 50), -10, 50, 50, false) 
// let smokeObj = new fallingObjects(smoke, Math.floor(Math.random()*(canvas.width + 50) + canvas.width - 50), -10, 50, 50, false) 

//Array with the healthy objects and unhealthy objects
const healthyObjects = [yoga, water, kiwi, sleep]
const unhealthyObjects = [stress, alcohol, smoke, onion]

//Max objects to show at the same time on the canvas per interval 
const maxHealthyElements = 3
const maxUnhealthyElements = 3

//GENERATING RANDOM OBJECTS TO FALL DOWN
function getRandomObject(isHealthy) {
    const elementsArray = isHealthy ? healthyObjects : unhealthyObjects

    const randomImg = elementsArray[Math.floor(Math.random()* elementsArray.length)]
    const randomX = Math.floor(Math.random() * canvas.width + canvas.width - 50)
    const randomElement = new fallingObjects(randomImg, randomX, -50, 50, 50, isHealthy)

    return randomElement
}

//this is the array to keep all the falling objects:
const elementsInGame = [
  getRandomObject(false)
];



//Defining the direction of where the player is headed 
document.addEventListener('keydown', event => {
    if(event.keyCode === 38) {
        verticalSpeed = SPEED * -1
        
    } else if(event.keyCode === 40) {
        verticalSpeed = SPEED
     
    } else if(event.keyCode === 37) {
        horizontalSpeed = SPEED * -1
    
    } else if(event.keyCode === 39) {
       horizontalSpeed = SPEED 
        
    }    
}) 

//Stops the movement from the positions movement 
document.addEventListener('keyup', event => {
    if(event.keyCode === 38) {
        verticalSpeed = 0
    } else if(event.keyCode === 40) {
        verticalSpeed = 0
       
    } else if(event.keyCode === 37) {
        horizontalSpeed = 0
        
    } else if(event.keyCode === 39) {
       horizontalSpeed = 0
       
    }    
}) 


let unhealthyElementId
let healthyElementId
let gameloopId

//GAME OVER
function gameOver(){
    if(healthScore === 10){
        alert('You won!Hurray!')
    } else if (painScore === 5){
        alert('You need to go to ER :(')
    } 
    clearInterval(unhealthyElementId) //falling down unhealthy objects interval ID 
    clearInterval(healthyElementId)
    clearInterval(gameloopId)
}

//GAME LOOP
function startGame(){
    // every three seconds, add a random healthy element
   healthyElementId = setInterval(() => {
        const healthyElements = elementsInGame.filter((element) => element.isHealthy === true)
        if(healthyElements.length < maxHealthyElements) {
            // const randomImg = healthyObjects[Math.floor(Math.random()* healthyObjects.length)]
            // const randomX = Math.floor(Math.random() * (canvas.width + 50) + canvas.width - 50)
            // allObjArray.push(new fallingObjects(randomImg, randomX, -50, 50, 50, true))
            elementsInGame.push(getRandomObject(true))
        }
    }, 3000)

    // every two seconds, add a random unhealthy element
   unhealthyElementId = setInterval(() => {
        const unhealthyElements = elementsInGame.filter((element) => element.isHealthy === false)
        if(unhealthyElements.length < maxUnhealthyElements) {
            // const randomImg = unhealthyObjects[Math.floor(Math.random()* unhealthyObjects.length)]
            // const randomX = Math.floor(Math.random() * (canvas.width + 50) + canvas.width - 50)
            // allObjArray.push(new fallingObjects(randomImg, randomX, -50, 50, 50, false))
            elementsInGame.push(getRandomObject(false))
        }
    }, 2000)

   gameloopId = setInterval(() => {
        // draw the game background
        ctx.clearRect(0,0,canvas.width, canvas.height) 
        ctx.drawImage(bgImg, 0, 0)
        drawScore()

        player.draw()
        
        elementsInGame.forEach((element, index) => { //callback function
            element.draw()        
           // element.fallDown() 
            
            if(player.x + player.w >= element.x && 
                player.x <= element.x + element.w &&
                player.y <= element.y + element.h && 
                player.y + player.w >= element.y) {
                if(element.isHealthy) {
                    healthScore++
                    if(SPEED > 8) {
                        SPEED = SPEED +1
                    }
                } else {
                    painScore++  
                    if(SPEED < 2){
                       SPEED = SPEED -1   
                    }   
                } 
                elementsInGame.splice(index,1)
                if(painScore === 5 || healthScore === 10){
                    gameOver()
                    return  
                    //resetGame()
                    //game over screen
                }
            }
        })
    }, 20)
}



window.onload = () => {
    ctx.drawImage(bgImg, 0, 0)
    startBtn.onclick = () => {
        //hide the introduction screen
        gameIntro.style.display = "none";
        canvas.style.display = '';
        //show the game screen
        gameScreen.style.display = "initial";
       /*  for (let i=0; i < allObjArray.length; i++ ){
            ctx.drawImage(allObjArray[i].img, allObjArray[i].x, allObjArray[i].y, 50, 50)
        }  */
        startGame();
    } 
}






//INSTRUCTION STEPS:
    
//1.1 Player object: square (replace with image later) - done 

//1.2 Create move() function so the player can make movements - done 



//2.1 Create 1 falling object - healthy items vs. unhealthy items

//2.2 Falling object: square (replace with images later)
//2.3 Create a falling function, which is a scrolling function but vertically from X = 0
