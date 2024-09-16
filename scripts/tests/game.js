// JavaScript Structure:
// game{object} - which will stall the game's state.
// newGame() - referenced in our HTML, which will  reset everything and start a new turn.
// addTurn() - add a random move to the sequence
// showTurns() - will play the sequence.
// lightsOn() - use a JavaScript interval to call the lightsOn function,  which will light up the appropriate circle.
// playerTurn() -  check to see if the player has clicked the right circle in the sequence,
// showScore() - will update the score in the DOM.

let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: ["button1", "button2", "button3", "button4"],
}

// newGame() function should:
// Reset the game to zero
// Clear the playerMoves array
// Clear the currentGame array
function newGame() {
    game.playerMoves = [];
    game.currentGame = [];
    game.score = 0;
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    game.lastButton = move; //it's going to store the  move in game.lastButton.
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

// addTurn() function should:
// Clear the playerMoves array
// Randomly add a button ID to the currentGame array
// Call the showTurns() function
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

//showTurns() function should:
// Step through the currentGame array
// Turn on the light
// Turn off the light

function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

//playerTurn() function should:
// Check if the player move matches the computer move
// If we are at the end of the sequence then increment the
// score and add another turn
// If the moves do not match then display an alert and start a new game

function playerTurn() {
    // get the index(i) of the last element from our playerMoves array.  
    // Because what we're going to do is compare that  with the same index in the current game array,  
    // if our player gets the answers  correct then these two should match.
    // This is convenient because it means that we can  
    // just compare elements at the same index number.  
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}






// export game and import it into our test file.

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };

// Side Note: We use curly braces here because we'll be exporting more than  
//one object and function from this file.

