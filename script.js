 const display = document.querySelector('.display');
 let gameActive = true;

 let curPlayer = "X";
 let gameState = ["","","","","","","","",""];

 const winMsg = () => `Player ${curPlayer} has won!!!`;
 const drawMsg = () => `Game Draw`;
 //const currentPlayerTurn = () => `It's ${curPlayer}'s turn`;

 //display.innerHTML = currentPlayerTurn();

 const winningCond = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]
 ];
//cell value updation
 function cellPlayed(clickedCell , cellIndex){
     gameState[cellIndex] = curPlayer;
     clickedCell.innerHTML = curPlayer;
 }


 //player updation
 function playerchange(){
  curPlayer = curPlayer === "X" ? "O" : "X";
 }


 //result validation check
 function resultValidity(){
    let won = false;

    for(let i=0;i<=7;i++){
    const cond = winningCond[i];
    let x = gameState[cond[0]];
    let y = gameState[cond[1]];
    let z = gameState[cond[2]];

    if(x === '' || y === '' || z === '')
       continue;

    if( x === y && y === z){
         won = true;
         break;
     }
    }

    if(won){
        display.innerHTML = winMsg();
        gameActive = false;
      //  break;
    }

    let draw = !gameState.includes("");
    if(draw && !won)
    {
        display.innerHTML = drawMsg();
        gameActive = false; 
    }


    playerchange();
 }


 //cellclick event
 function cellclick(clickedCellEvent){
  const clickedCell = clickedCellEvent.target;

  const cellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
  );

  if(gameState[cellIndex] !== "" || !gameActive)
      return;

  cellPlayed(clickedCell , cellIndex);
  resultValidity();
 }

 // reset game
 function restart(){
     gameActive = true;
     curPlayer ="X";
     gameState = ["","","","","","","","",""];
    display.innerHTML ="";

     document.querySelectorAll('.col').forEach(col => col.innerHTML = "");
 }


 document.querySelectorAll('.col').forEach(col => col.addEventListener('click',cellclick));
 document.querySelector('.reset').addEventListener('click' , restart);