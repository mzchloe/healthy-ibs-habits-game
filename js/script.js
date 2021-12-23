const startBtn = document.getElementById('start-button');
const gameIntro = document.getElementById('game-intro');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");


//BG IMAGE
const bgImg = new Image();
bgImg.src = "./Images/bgField.jpg";

//Replace -const gamePlayer = new Player(20,20,50,50, 'aliceblue')- with an image:
//PLAYER IMG
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
stress.src = "./Images/stress.png";

/* ctx.drawImage(kiwi, 0, 0, 50, 50)

ctx.drawImage(yoga, 150, 5, 50, 50 */   

//Different falling objects split into good(+ points) and bad (minus points):
//Good objects: Water (+2), Sleep (+2), Yoga (+1), Kiwi (+1)
//Bad objects: Cigarettes (-1), Alcohol (-1), Onions (-1), Stress (-2)

//RANDOM FALLING POSITION OF OBJECTS ALONG X-AXIS WITHIN THE CANVAS WIDTH:
let randomNumber = Math.floor(Math.random() * 900);

//CREATE EMPTY OBJECTS ARRAY:
const objArray = [ 
    //{item: water, points: 2, img: water, x: 0, y: -10},
   /*  {item: sleep, points: 2, img: water, x: randomNumber, y: -10},
    {item: yoga, points: 1, img: water, x: randomNumber, y: -10},
    {item: kiwi, points: 1, img: water, x: randomNumber, y: -10}, */
  //  {item: cigarette, points: -1, img: water, x: randomNumber, y: -10},
  //  {item: alcohol, points: -1, img: water, x: randomNumber, y: -10},
    /* {item: onions, points: -1},
    {item: stress, points: -1}, */
];

//the collections of all objects that will be picked from randomly
//const allObjArray = [water, cigarette, alcohol];

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
    }

    checkCollision(gameborder){
        return (
                this.x < gameborder.x + gameborder.w &&
                this.x + this.w > gameborder.x &&
                this.y < gameborder.y + gameborder.h &&
                this.y + this.h > gameborder.y
              );
    }

    moveUp(gameborder){
        this.y -=15;
        if (this.checkCollision(gameborder)){
            this.y +=15;
        } else {
            this.y -=15;
        }
    }

    moveDown(){
        this.y +=15;
        if (this.checkCollision(gameborder)){
            this.y -=15;
        } else {
            this.y +=15;
        }
    }

    moveLeft(){
        this.x -=15
        if (this.checkCollision(gameborder)){
            this.x +=15;
        } else {
            this.x -=15;
        }
    }

    moveRight(){
        this.x +=15
        if (this.checkCollision(gameborder)){
            this.x -=15;
        } else {
            this.x +=15;
        }
    }
}

const player = new playerObject (gamePlayer, 55, 178, 150, 200)

// BORDER OF THE GAME
class gameBorder {
    constructor (objX, objY, objW, objH, objColor){
        this.x = objX
        this.y = objY
        this.w = objW
        this.h = objH
        this.color = objColor
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h, this.color)
    }
}

const borders = [
    new gameBorder(0, 0, canvas.width, 1, 'black'),
    new gameBorder(0, 503, canvas.width, 1, 'black'),
    new gameBorder(0, 0, 1, canvas.height, 'black'),
    new gameBorder(899, 0, 1, canvas.height, 'black'),
];

//FALLING OBJECTS

class fallingObjects {
    constructor(objImg, objX,objY, objW, objH){
        this.img = objImg 
        this.x = objX
        this.y = objY
        this.w = objW
        this.h = objH
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, 50, 50)
        //ctx.fillStyle = this.color
        //ctx.fillRect(this.x, this.y, this.w, this.h)
       // ctx.drawImage(gamePlayer, 0, 0)
        //ctx.drawImage(bgImg, 0, 0,)
    }

    fallDown() {
        this.y = this.y +2
    }
}
//these objects are coded to fall down from top:
let kiwiObj = new fallingObjects(kiwi, 5, -10, 50, 50)
let yogaObj = new fallingObjects(yoga, 250, -10, 50, 50)
let sleepObj = new fallingObjects(sleep, 5, -10, 50, 50)
let waterObj = new fallingObjects(water, 5, -10, 50, 50)

let alcoholObj = new fallingObjects(alcohol, 500, -10, 50, 50)
let stressObj = new fallingObjects(stress, 5, -10, 50, 50)
let onionObj = new fallingObjects(onion, 5, -10, 50, 50)
let smokeObj = new fallingObjects(smoke, 5, -10, 50, 50)

//this is the array to keep all the falling objects:
const allObjArray = [kiwiObj, yogaObj, sleepObj, waterObj, alcoholObj, onionObj, smokeObj];

//this is to separate all objects that ADD points:
/* const addPointObjects = [(kiwiObj, objX, objY, objW, objH), 
    (yogaObj, objX, objY, objW, objH),
    (sleepObj, objX, objY, objW, objH),
    (waterObj, objX, objY, objW, objH)]; */

//this is to separate all objects that DEDUCT points: 
/* const deductPointsObjects = [
    (alcoholObj, objX, objY, objW, objH),
    (stressObj, objX, objY, objW, objH),
    (onionObj, objX, objY, objW, objH),
    (smokeObj, objX, objY, objW, objH)]; */

//PLAYER 
//defined the starting point for x and y for the player when game loop starts:
/* let gamePlayerX = 55;
let gamePlayerY = 178; */

//attempt to make a collision detection against 1) canvas so it does not go out
// 2) against the objects falling down that either add and deduct points:
/* function checkCollision (){
    //check if gamePlayer is going off canvas:
    if (gamePlayer.x + gamePlayer.width > canvas.width && 
        gamePlayer.x + gamePlayer.width < canvas.width &&
        gamePlayer.y + gamePlayer.height > canvas.height &&
        gamePlayer.y + gamePlayer.height < canvas.height) {
    // gamePlayer cannot move further and can only move up, down or back 
        }
     
    //checks if player hits the objects that will add points:
    if (gamePlayer.x + gamePlayer.width > addPointObjects.x) { // etc.)
        //score++ (let scoreHealth = 0; defined below)
    } 
    //checks if the player hits objects that will deduct points:
    else if (gamePlayer.x + gamePlayer.width > deductPointsObjects.x) {
        //score-- (let scorePain = 10; defined below)
    }
} */



//move the player with arrow keyboard
document.addEventListener('keydown', event => {

    if(event.keyCode == 38) {
        player.moveUp(borders) -= 15
    } else if(event.keyCode == 40) {
        player.moveDown(borders) +=15
    } else if(event.keyCode == 37) {
        player.moveLeft(borders) -=15
    } else if(event.keyCode == 39) {
        player.moveRight(borders) +=15
    }    
}) 

//GAME LOOP

let intervalID = 0;
//let scoreHealth = 0;
//let scorePain = 10;

window.onload = () => {
    ctx.drawImage(bgImg, 0, 0)
    startBtn.onclick = () => {
        gameIntro.style.display = "none";
        for (let i=0; i < allObjArray.length; i++ ){
            ctx.drawImage(allObjArray[i].img, allObjArray[i].x, allObjArray[i].y, 50, 50)
        } 
        setInterval(() => {
            intervalID++
            if (intervalID == 20){
                let addRandomObj = Math.floor(Math.random() * allObjArray.length)
                objArray.push(allObjArray[addRandomObj])
                //console.log(allObjArray[addRandomObj])
            }
            ctx.clearRect(0,0,canvas.width, canvas.height) 
            ctx.drawImage(bgImg, 0, 0)
            player.draw()
            borders.forEach((border) => {
                border.draw();
                });
            //ctx.drawImage(gamePlayer, gamePlayerX, gamePlayerY, 150, 200) 
            objArray.forEach((element) => { //callback function
                element.draw()        
                element.fallDown() 
            })
        }, 20)
    } 
}





//INSTRUCTION STEPS:
    
//1.1 Player object: square (replace with image later) - done 

//1.2 Create move() function so the player can make movements - done 



//2.1 Create 1 falling object - healthy items vs. unhealthy items

//2.2 Falling object: square (replace with images later)
//2.3 Create a falling function, which is a scrolling function but vertically from X = 0
