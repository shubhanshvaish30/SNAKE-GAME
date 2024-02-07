let canvas=document.querySelector('canvas');
let ctx=canvas.getContext('2d');

let boardHeight=600;
let boardWidth=1000;
let cellSize=50; //height & width for each cell 

let snakeCells=[[0,0]]; //2d array starting points

let direction='right';

let gameOver=false; //after touch it will be true

let foodCells=generateFood();

// score
let score=0;

// repeating
let intervalId=setInterval(function(){
    update();
    draw();
},100);

// keydown event
document.addEventListener('keydown',function(event){
    if(event.key==='ArrowDown'){
        direction='down'
    }
    else if(event.key==='ArrowUp'){
        direction='up'
    }
    else if(event.key==='ArrowLeft'){
        direction='left'
    }
    else{
        direction='right'
    }
})


// function to draw snake
function draw(){
    if(gameOver===true){
        clearInterval(intervalId); //it accepts an id from setInterval
        ctx.fillStyle='red';
        ctx.font='50px monospace';
        ctx.fillText('GAME OVER !!',350,300);
        return;
    }

    // snake draw
    ctx.clearRect(0,0,boardWidth,boardHeight);
    for(let cell of snakeCells){
        ctx.fillStyle='green';
        ctx.fillRect(cell[0],cell[1],cellSize,cellSize);
        ctx.strokeStyle='black';
        ctx.strokeRect(cell[0],cell[1],cellSize,cellSize);
    }

    // draw food
    ctx.fillStyle='red';
    ctx.fillRect(foodCells[0],foodCells[1],cellSize,cellSize);

    // draw score
    ctx.font='24px monospace';
    ctx.fillText(`Score: ${score}`,20,20)
}

// function update snake
function update(){
    let headX=snakeCells[snakeCells.length-1][0];
    let headY=snakeCells[snakeCells.length-1][1];

    let newHeadX;
    let newHeadY;

    if(direction==='right'){
        newHeadX=headX+cellSize;
        newHeadY=headY;
        if(newHeadX===boardWidth || selfEat(newHeadX,newHeadY))
        gameOver=true;
    }
    else if(direction==='left'){
        newHeadX=headX-cellSize;
        newHeadY=headY;
        if(newHeadX<0 || selfEat(newHeadX,newHeadY))
        gameOver=true;
    }
    else if(direction==='down'){
        newHeadX=headX;
        newHeadY=headY+cellSize;
        if(newHeadY===boardHeight || selfEat(newHeadX,newHeadY))
        gameOver=true;
    }
    else{
        newHeadX=headX;
        newHeadY=headY-cellSize;
        if(newHeadY<0 || selfEat(newHeadX,newHeadY))
        gameOver=true;
    }

    snakeCells.push([newHeadX,newHeadY]);

    if(newHeadX===foodCells[0] && newHeadY===foodCells[1]){
        foodCells=generateFood();
        score+=1;
    }
    else{
        snakeCells.shift();
    }
}


// Generating food
function generateFood(){
    return [
        Math.round((Math.random()*(boardWidth-cellSize))/cellSize)*cellSize,
        Math.round((Math.random()*(boardHeight-cellSize))/cellSize)*cellSize,
    ]
}

function selfEat(newHeadX,newHeadY){
    for(let item of snakeCells){
        if(item[0]===newHeadX && item[1]===newHeadY){
            return true;
        }
    }
    return false;
}