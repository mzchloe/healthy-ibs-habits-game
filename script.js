const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

class Player {
    constructor(argX,argY, argW, argH, argColor){
        this.x = argX
        this.y = argY
        this.w = argW
        this.h = argH
        this.color = argColor
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}


const gamePlayer = new Player(20,20,50,50, 'aliceblue')

//clear the canvas each 20ms and draw again, as we will do animation
setInterval(() => {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    gamePlayer.draw()
}, 20)



//1.2 Create move() function so the player can make movements with arrow keyboard

// QUESTION: Why can I know move this part inside the Class? 
document.addEventListener('keydown', event => {
    switch (event.keyCode){
        case 38:
            gamePlayer.y -=15
            break
        case 40:
            gamePlayer.y +=15
            break
        case 37:
            gamePlayer.x -=15
            break  
        case 39:
            gamePlayer.x +=15
            break      
    }
})

//background image - static
/*  QUESTION: Why does the bgImg not show when I have the player rectangle in the canvas?

const bgImg = new Image();
bgImg.src = "./Images/bg.jpeg";

bgImg.onload = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
} */


//INSTRUCTION STEPS:
    
//1.1 Player object: square (replace with image later) - done 

//1.2 Create move() function so the player can make movements - done 



//2.1 Create 1 falling object - healthy items vs. unhealthy items

//2.2 Falling object: square (replace with images later)
//2.3 Create a falling function, which is a scrolling function but vertically from X = 0

//what to objects to be loaded when we open the page:
/* window.onload = function() {
    ctx.drawImage(bgImg,0, 0, canvas.width, canvas.height);
    
} */