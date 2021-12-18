const startBtn = document.getElementById('start-button');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

const bgImg = new Image();
bgImg.src = "./Images/livingroom.jpg";

//Replace -const gamePlayer = new Player(20,20,50,50, 'aliceblue')- with an image:
const gamePlayer = new Image();
gamePlayer.src = "./Images/girl.png";

const water = new Image(); //new Image() is the code for generating new image via JS
water.src = "./Images/cartorange.png"; //this is the source it takes the image from 

const cigarette = new Image();
cigarette.src = "./Images/mainphoto.jpeg";

const alcohol = new Image();
alcohol.src = "./Images/girl.png";

ctx.drawImage(water, 0, 0, 50, 50)  

//Different falling objects split into good(+ points) and bad (minus points):
//Good objects: Water (+2), Sleep (+2), Yoga (+1), Kiwi (+1)
//Bad objects: Cigarettes (-1), Alcohol (-1), Onions (-1), Stress (-2)

//random falling position of the objects:
let randomNumber = Math.floor(Math.random() * 900);

//to draw the objects array:
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




class fallingObjects {
    constructor(objImg, objX,objY, objW, objH, objColor){
        this.img = objImg 
        this.x = objX
        this.y = objY
        this.w = objW
        this.h = objH
        this.color = objColor
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, 50, 50)
        //ctx.fillStyle = this.color
        //ctx.fillRect(this.x, this.y, this.w, this.h)
       // ctx.drawImage(gamePlayer, 0, 0)
        //ctx.drawImage(bgImg, 0, 0,)
    }

    fallDown() {
        this.y = this.y +1
        
    }
}

let waterObj = new fallingObjects(water, 5, -10, 50, 50)
let cigaretteObj = new fallingObjects(cigarette, 250, -10, 50, 50)
let alcoholObj = new fallingObjects(alcohol, 500, -10, 50, 50)
const allObjArray = [waterObj, cigaretteObj, alcoholObj];
//define variables for x and y for the player:
let gamePlayerX = 0;
let gamePlayerY = 0;


function movePlayer() {
    ctx.drawImage(gamePlayer, gamePlayerX, gamePlayerY, 150, 200)     
    }

//1.2 Create move() function so the player can make movements with arrow keyboard
document.addEventListener('keydown', event => {

    if(event.keyCode == 38) {
        gamePlayerY -= 15
    } else if(event.keyCode == 40) {
        gamePlayerY +=15
    } else if(event.keyCode == 37) {
        gamePlayerX -=15
    } else if(event.keyCode == 39) {
        gamePlayerX +=15
    }
    
})

let intervalID = 0;

window.onload = () => {
    startBtn.onclick = () => {
        /* for (let i=0; i < objArray.length; i++ ){
            ctx.drawImage(objArray[i].img, objArray[i].x, objArray[i].y, 50, 50)
        } */
        setInterval(() => {
            intervalID++
            if (intervalID == 20){
                let addRandomObj = Math.floor(Math.random() * allObjArray.length)
                objArray.push(allObjArray[addRandomObj])
                console.log(allObjArray[addRandomObj])
            }
            ctx.clearRect(0,0,canvas.width, canvas.height) 
            ctx.drawImage(bgImg, 0, 0)
            ctx.drawImage(gamePlayer, gamePlayerX, gamePlayerY, 150, 200) 
            movePlayer()
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

//NOTES:
//Switch case did not work on the eventListener for the move of player using an image, it only worked for rectangle
/* switch (event.keyCode){
        case 38:
            gamePlayerY -=15
            break
        case 40:
            gamePlayerY +=15
            break
        case 37:
            gamePlayerX -=15
            break  
        case 39:
            gamePlayerX +=15
            break      
    } */