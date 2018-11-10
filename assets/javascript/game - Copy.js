// $(document).ready(function () {
//     alert("start");
// });

var wordList = ["discrete", "guru", "summit", "cumbersome", "relish", "frayed", "fleet", "reinforce", "eloquent", "respectively",
    "procrastination", "conundrum", "aesthetically", "recipient", "indecipherable", "dissect", "sleuthing", "labyrinth", "disparage", "tribute",
    "typography", "confrontation", "enhancement", "proactively", "radically"];
var selectWord = "";
var selectWordArry = [];
var tempWordArry = [];
var winsCharArry = [];

var totalWins = 0;
var numOfGames= 0;
var remainingNum = 10;

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var letterAlreadyText = document.getElementById("letteralready-text");
var winsText = document.getElementById("wins-text");
var numberOfGames = document.getElementById("numberofgames-text");
var remainingText = document.getElementById("remaining-text");


function funcSelectWord() {
    var gameword = wordList[Math.floor(Math.random() * wordList.length)];
    return gameword;
}
selectWord = funcSelectWord();
console.log("selectWord : " + selectWord);

function initGame() {
    
    selectWordArry = [];
    tempWordArry = [];
    winsCharArry= [];
    for (var i = 0; i < selectWord.length; i++) {
        selectWordArry.push(selectWord.charAt(i));
        console.log("Selected word array[" + i + "] is " + selectWordArry[i]);
        tempWordArry[i] = "_";
    }
    console.log("selectWordArry : " + selectWordArry);

    var tempWord = "";
    tempWord = tempWordArry.join();
    console.log("tempWord : " + tempWord);   
    directionsText.textContent = "Type the Alphabet key you guess!" ;                             
    userChoiceText.textContent = tempWord;
    letterAlreadyText.textContent = "Letters Already Guessed : ";
    winsText.textContent = "Total wins: " + totalWins;
    numberOfGames.textContent  = "Total number of games: " + numOfGames;
    remainingText.textContent = "remaining: " + 0;
    numOfGames++;
}

initGame();


document.onkeyup = function (event) {

    var userInput = event.key;
    var userGuess = userInput.toLowerCase();
    // console.log("userGuess: " + userGuess);

    // if correct
    if (selectWordArry.indexOf(userGuess) != -1) {
        winsCharArry.push(userGuess);
        console.log("winsCharArry: " + winsCharArry);
        letterAlreadyText.textContent = "Letters Already Guessed:" + winsCharArry;
        remainingText.textContent = "Number of Guesses Remaining: " + remainingNum;

        for (var i = 0; i < selectWordArry.length; i++) {
            if (selectWordArry[i] === userGuess) {
                tempWordArry[i] = userGuess;
            }
        }

        console.log("tempWordArry: " + tempWordArry);

        userChoiceText.textContent = tempWordArry;
        //if lose
    } else {
        remainingNum--;
        remainingText.textContent = "remaining: " + remainingNum;
    }

    // if remining > 0 then
    if (remainingNum > 0) {
        console.log("tempWordArry: " + tempWordArry.join('') + " selectWord: " + selectWord);
 // if win
        if (tempWordArry.join('') === selectWord) {
            totalWins++;
            alert("Congrat!!let's do it again!");
            selectWord = funcSelectWord();   
            initGame();        
        }
        //// else remainingNum --
        else {

        }
    }
    //else  lose and game restart
    else {
        alert("You didn't win, try it again!!");
        selectWord = funcSelectWord();
        initGame(); 
    }




}