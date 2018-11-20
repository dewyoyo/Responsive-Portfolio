var triviaList = [
    {
        question : "Which Nickelodeon adventurer grew quickly from seven to ten years old, and moved to the city in a spin-off in 2014?", //question
        examp1 : "Henry Danger",                 //examp1
        examp2 : "Dora the Explorer",            //examp2
        examp3 : "SpongeBob SquarePants",        //examp3
        examp4 : "The Bureau of Magical Things",   //examp4
        answer : 2,              //right answer
        explanation : "The spin-off series is called Dora and Friends: Into the City.",   //explanation ,interesting information
        image : "assets/images/giphy_dora.gif"
    },
    {
        question : "What are Chubby Hubby, Half-Baked and Vermonty Python?",
        examp1 : "Punk bands",
        examp2 : "Comedians",
        examp3 : "Cars",
        examp4 : "Ice cream flavours",
        answer : 4,
        explanation : "They are just three of Ben & Jerry's ice cream flavours. Vermonty Python is coffee liqueur flavoured with cookie pieces and fudge. Half-Baked is a blend of chocolate and vanilla ice cream with gobs of cookie dough and pieces of brownie, and Chubby Hubby is vanilla ice cream with peanut-butter filled pretzel pieces and a ribbon of fudge.",
        image : "assets/images/giphy_icecream.gif"
    },
    {
        question : "Who is the pre-Civil War author of a short story about a beating heart beneath the floorboards?",
        examp1 : "Roald Dahl",
        examp2 : "Emily Dickinson",
        examp3 : "Edgar Allan Poe",
        examp4 : "Robert Frost",
        answer : 3,
        explanation : "The famous piece is The Tell-Tale Heart.",
        image : "assets/images/EdgarAllanPoe.jpg"
    },
    {
        question : "Which school was Maya Lin attending when she designed the Vietnam Veterans Memorial as part of a class assignment?",
        examp1 : "Yale University",
        examp2 : "UC Berkeley",
        examp3 : "Stanford University",
        examp4 : "Massachusetts Institute of Technology (MIT)",
        answer : 1,
        explanation : "Initially scorned, the memorial is now cherised by millions of visitors each year.",
        image : "assets/images/Yale_University.png"
    },
    {
        question : "What cattle end-product was named Wisconsin's Unofficial State Muffin in 1989?",
        examp1 : "Jello",
        examp2 : "Cow Chip",
        examp3 : "Dish soap",
        examp4 : "Candles",
        answer : 2,
        explanation : "If you're not sure what a cow chip is, just please don't try to eat this 'muffin'. A cow chip is a dried pile of cow dung that is used at cow-chip-throwing competitions. Chips are often tossed Frisbee-style. They can fly more than 150 feet!",
        image : "assets/images/chow-chip.jpg"
    },
    {
        question : "Which patriotic Bostonian won the acquittal of most of the British troops involved in the 1770 Boston Massacre that killed five civilians?",
        examp1 : "Samuel Adams",
        examp2 : "James Otis",
        examp3 : "John Adams",
        examp4 : "John Hancock",
        answer : 3,
        explanation : "He strongly believed all people deserved a fair trial and a thorough defense.",
        image : "assets/images/johnAdams.jfif"
    },
    {
        question : "Which U.S. state has the longest coastline?",
        examp1 : "Delaware",
        examp2 : "Georgia",
        examp3 : "Kansas",
        examp4 : "Alaska",
        answer : 4,
        explanation : "It has 6,640 miles of coastline.",
        image : "assets/images/giphy-Alaska.gif"
    },
    {
        question : "What is'The Devil's Picture Book'?",
        examp1 : "A deck of cards",
        examp2 : "Marvel Comics",
        examp3 : "A bathroom mirror",
        examp4 : "Flat pack assembly instructions",
        answer : 1,
        explanation : "The first decks of cards, from which modern playing cards have descended, were Tarot cards which are still used by fortune tellers, and the soubriquet derives from the bible forbidding any form of divination. Comics can be great fun and I find mirrors quite useful (so long as the lighting is subdued) but I'm convinced that assembly instructions are compiled by using an internet translater to translate comprehensible English into Japanese, translating the results into Italian, then converting the Italian translation back into English so that it makes no sense at all!",
        image : "assets/images/giphy-deckofcards.gif"
    }
];
var shuffTriviaList = shuffle(triviaList);
// for showing timer decrement
var intervalId;
var intervalTime; //  30 seconds
// for answer explanation
var timerId;
var ansTime = 5 * 1000;

var selectedAns = 0;
var numOfCorrAns = 0;
var numOfWrongAns = 0;
var NumOfUnans = 0;
$("#restart-btn").hide();

// when restart the game, shuffle the trivia list.
function shuffle(array) {
    var m = array.length;
    var t, i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

//  The decrement function for interval timer
function decrement(k) {
    intervalTime--;
    $("#remaining-time").text("Time Remaining: " + intervalTime + " Seconds");
    //  Once number hits zero...
    if (intervalTime === 0) {
        console.log("intervalTime: " + intervalTime);
        NumOfUnans++;
        console.log("NumOfUnans: " + NumOfUnans);
        clearInterval(intervalId);
        resetDiv();
        // show the 'times up' message
        $(".ques-div").html("<p style='color:black;font-size:18pt;font-weight:bold;'>Times Up!</p>");
        // $(".ques-div").append("The Correct Answer was " + anskey + ". <br>");
        //explanation and img
        $(".ques-div").append(shuffTriviaList[k].explanation + "<br>");
        $(".ques-div").append("<img id='trivia-img' src=" + shuffTriviaList[k].image + ">");
        // console.log(".ques-div: " + $(".ques-div").text());
        timerId = setTimeout(retriveQues, ansTime, (k + 1));
        clearInterval(intervalId);
    }
}
function resetDiv() {
    $(".ques-div").empty();
    $(".exmp-div").empty();
    $("#restart-btn").hide();
};
function resetTimer() {
    clearInterval(intervalId);
    intervalTime = 30;  //  30 seconds
    // clearTimeout(timerId);
    $("#remaining-time").text("Time Remaining: " + intervalTime + " Seconds");
};

function correctAns(k) {
    console.log("Correct");
    numOfCorrAns++;
    console.log("numOfCorrAns: " + numOfCorrAns);
    resetDiv();
    $(".ques-div").html("<p style='color:black;font-size:18pt;font-weight:bold;'>Correct</p>");
    //explanation and img
    $(".ques-div").append(shuffTriviaList[k].explanation + "<br>");
    $(".ques-div").append("<img id='trivia-img' src=" + shuffTriviaList[k].image + ">");
    console.log(".ques-div: " + $(".ques-div").text());
    timerId = setTimeout(retriveQues, ansTime, (k + 1));
    clearInterval(intervalId);
};
function wrongAns(anskey, k) {
    console.log("Wrong answer");
    numOfWrongAns++;
    console.log("numOfWrongAns: " + numOfWrongAns);
    resetDiv();
    $(".ques-div").html("<p style='color:black;font-size:18pt;font-weight:bold;'>Nope</p>");
    $(".ques-div").append("The Correct Answer was " + anskey + ". <br>");
    //explanation and img
    $(".ques-div").append(shuffTriviaList[k].explanation + "<br>");
    $(".ques-div").append("<img id='trivia-img' src=" + shuffTriviaList[k].image + ">");
    // console.log(".ques-div: " + $(".ques-div").text());
    timerId = setTimeout(retriveQues, ansTime, (k + 1));
    clearInterval(intervalId);
};

// display the trivia question and examples.
function retriveQues(i) {
    resetDiv();
    resetTimer();

    // shuffTriviaList.length > i then show the total game result
    if (i >= shuffTriviaList.length) {
        console.log("Game Over!");
        $(".ques-div").html("<p style='color:black;font-size:18pt;font-weight:bold;'>All done, here's how you did!</p>");
        $(".ques-div").append("Correct Answer: " + numOfCorrAns + "<br>");
        $(".ques-div").append("Incorrect Answer: " + numOfWrongAns + "<br>");
        $(".ques-div").append("Unanswered: " + NumOfUnans + "<br>");

        // $(".ques-div").append("<button id='start-btn'>Start Over?</button>");
        $("#restart-btn").show();
    }
    else {

        // Question, examples and answer
        $(".ques-div").html("<p>Q : " + shuffTriviaList[i].question + "</p>");
        $(".exmp-div").html("<h4 id='exmp1' class='exmp'>" + "1: " + shuffTriviaList[i].examp1 + "</h4>");
        $(".exmp-div").append("<h4 id='exmp2' class='exmp'>" + "2: " + shuffTriviaList[i].examp2 + "</h4>");
        $(".exmp-div").append("<h4 id='exmp3' class='exmp'>" + "3: " + shuffTriviaList[i].examp3 + "</h4>");
        $(".exmp-div").append("<h4 id='exmp4' class='exmp'>" + "4: " + shuffTriviaList[i].examp4 + "</h4>");
        var answer = shuffTriviaList[i].answer;

        // console.log("shuffTriviaList[i][1] " + shuffTriviaList[i][0]);
        // console.log("#exmp1: " + $("#exmp1").text());

        // timer(interval timer)
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000, i);

        // user select the one of the example
        $(".exmp").on("click", function () {

            // console.log("exmp click : " + $(this).text());
            var str = $(this).text();
            selectedAns = str.substr(0, 1);
            // console.log("selectedAns: " + selectedAns);

            if (selectedAns == answer) {
                correctAns(i);
            }
            else {
                wrongAns(shuffTriviaList[i].answer, i);
            };
        });
    };
};

// beginning - if user click the 'start', then start the trivia game
$(".exmp-div").html("<h4 id='exmp1' class='exmp' style='font-size:30pt'>Start</h4>");
$(".exmp").on("click", function () {
    retriveQues(0);
});

// restart
$("#restart-btn").on("click", function () {
    console.log("click start button.")
    shuffTriviaList = shuffle(shuffTriviaList);
    retriveQues(0);
});