// const startBtn = document.getElementById('start-button');
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
        //ctx.drawImage(bgImg, 0, 0,)
    }
}


const gamePlayer = new Player(20,20,50,50, 'aliceblue')

const bgImg = new Image();
bgImg.src = "./Images/livingroom.jpg";

bgImg.onload = () => {
    setInterval(() => {
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.drawImage(bgImg, 0, 0)
        gamePlayer.draw()
        
    }, 20)
} 

//clear the canvas each 20ms and draw again, as we will do animation


//1.2 Create move() function so the player can make movements with arrow keyboard
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




//INSTRUCTION STEPS:
    
//1.1 Player object: square (replace with image later) - done 

//1.2 Create move() function so the player can make movements - done 



//2.1 Create 1 falling object - healthy items vs. unhealthy items

//2.2 Falling object: square (replace with images later)
//2.3 Create a falling function, which is a scrolling function but vertically from X = 0

