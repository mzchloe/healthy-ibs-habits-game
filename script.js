const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext("2d");


//background image - static
const bgImg = new Image();
bgImg.src = "./Images/bg.jpeg";

bgImg.onload = function() {
    ctx.drawImage(bgImg,0, 0, canvas.width, canvas.height);
}


//1. Create player 

ctx.beginPath();
ctx.fillRect(20, 20, 150, 150);
ctx.fillStyle = "black";
ctx.closePath();


    
//1.1 Player object: square (replace with image later)


//1.2 Create move() function so the player can make movements


//2.1 Create 1 falling object
//2.2 Falling object: square (replace with images later)
//2.3 Create a falling function, which is a scrolling function but vertically from X = 0
