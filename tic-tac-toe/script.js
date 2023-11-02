const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3 ,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

//lets create a function to initialise the game

function initgame() {
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    //ui par empty
    boxes.forEach((box , index) =>{

        box.innerText="";
        boxes[index].style.pointerEvents="all"; 

        // remove green color , initialise box with css again
         box.classList=`box box${index+1}`;






    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;


}

initgame();

function swapTurn(){
    if(currentPlayer=="X")
    {
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
}


function checkGameOver()
{
    let answer="";

    winningPosition.forEach((position) =>{

        // all 3 boxex should bw non empty andexactly in same value
        if((gameGrid[position[0]]!== "" || gameGrid[position[1]]!== "" || gameGrid[position[2]]!== "" ) 
        && (gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]]))
        {
            // check winnwe is X
            if(gameGrid[position[0]]==="X")
               answer="X";
            else
            answer="O"; 

            //disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            //now we know whon is winner color bg into green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }


    });

    // then we have winner

    if(answer!=="")
    {
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;

    }

    //when there is no winner - game tied 

    let filledCount=0;
    gameGrid.forEach((box)=>  {
        if(box!=="")
        filledCount++;
    });

    // board is filled - game is tied
    if(filledCount==9)
    {
        gameInfo.innerText="Game Tied!";
        newGameBtn.classList.add("active");
    }





}




function handleClick(index)
{
    if(gameGrid[index] === "")
    {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;

        boxes[index].style.pointerEvents="none"; 
        
        //swap turn 
        swapTurn();
        //check if anyone win 
        checkGameOver();


    }


}



boxes.forEach((box , index)=>{

    box.addEventListener("click" ,()=> {
        handleClick(index);

    } )

});

newGameBtn.addEventListener("click" , initgame);


