// Variables
var charIsSelected = false;
var defIsSelected = false;
var attackStarted = false;
var attackSucceed = false;
var selectedChar = "";
var selectedDef = "";
var selectedAP = 0;
var selectedHP = 0;
var DefenderCAP = 0;
var DefenderHP = 0;
var gainedAP = 0;
$("#reset-btn").hide();


//=============char attribute ===========
//Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

var gameChar = [
    ["Luke Skywalker",
        "assets/images/lukeskywalker.jfif",
        "100", //health-points
        "6", //attack-power
        "4"   //counter-attack-power
    ],
    ["Palpatine",
        "assets/images/palpatine.jfif",
        "100",
        "8",
        "6"
    ],
    ["Obiwan Kenobi",
        "assets/images/obiwankenobi.jfif",
        "100",
        "7",
        "5"
    ],
    ["Darth Vader",
        "assets/images/darthvader.jfif",
        "100",
        "9",
        "7"
    ],
];

function fReload() {
    location.reload();
}

function continueGame() {
    attackStarted = false;

    selectedAP = gainedAP;
    selectedHP = 100;
    DefenderCAP = 0;
    DefenderHP = 100;
    selectedDef = "";


    $("#attack-msg").text("");
    $("#attack-msg").hide();
    $("#reset-btn").hide();
}

//     console.log(Object.keys(gameImg).length);  for (var i = 0; i < Object.keys(gameImg).length; i++)
//     $("p").show();  $("p").toggle();  $("p").hide();

// create a for loop to create character.
for (var i = 0; i < gameChar.length; i++) {
    var imageChar = $("<img>");
    imageChar.addClass("char-image");
    // console.log(gameChar[i][1]);
    imageChar.attr("src", gameChar[i][1]);
    imageChar.attr("title", gameChar[i][0]);
    imageChar.attr("char-name", gameChar[i][0]);
    imageChar.attr("health-points", gameChar[i][2]);
    imageChar.attr("attack-power", gameChar[i][3]);
    imageChar.attr("counter-attack-power", gameChar[i][4]);
    $("#char-box").append(imageChar);
};

// select attack character and move the unselected character into Enmies
$(".char-image").on("click", function () {

    // if user selected the character then select the defender
    if (charIsSelected) {

        if (defIsSelected) {
            console.log("both character and defender selected");
        }
        else {
            continueGame();
            selectedDef = ($(this).attr("char-name"));
            console.log("selected defender: " + selectedDef);

            $("#enemies-box > img").each(function (index, element) {
                if ($(this).attr("char-name") == selectedDef) {
                    console.log("selected defender goes to defender box: " + $(this).attr("char-name"));
                    $("#defender-box").append($(this));
                }
            });
            defIsSelected = true;
        }
    }
    // first click : select the main character
    else {
        selectedChar = ($(this).attr("char-name"));
        console.log("char name: " + selectedChar);

        $("img").each(function (index, element) {
            if ($(this).attr("char-name") != selectedChar) {
                console.log("defender list: " + $(this).attr("char-name"));
                $("#enemies-box").append($(this));
            }
        });
        charIsSelected = true;
    }

});


// =====================start the attack
$("#attack-btn").on("click", function () {

    console.log("number of images in enemies-box : " + $("#enemies-box > img").length);
    if ($("#defender-box > img").length == 0) {
        $("#attack-msg").text("No enemy here. Select the enemy from 'Enemies Available To Attack'");
    }
    else {

        if (attackStarted == false) {
            console.log("attack : selectedChar : " + selectedChar);
            console.log("attack : selectedDef : " + selectedDef);
            if (attackSucceed == false) {
                selectedAP = parseInt(($("#char-box  > img").attr("attack-power")));
            }
            selectedHP = parseInt(($("#char-box  > img").attr("health-points")));
            console.log("selectedAP: " + selectedAP);
            console.log("selectedHP: " + selectedHP);
            DefenderCAP = parseInt(($("#defender-box > img").attr("counter-attack-power")));
            DefenderHP = parseInt(($("#defender-box > img").attr("health-points")));
            console.log("DefenderCAP: " + DefenderCAP);
            console.log("DefenderHP: " + DefenderHP);
            $("#attack-msg").show();
            $("#attack-msg").text("You attacked " + selectedDef + " for " + selectedAP + " damage. " + selectedDef + " attacked you back for " + DefenderCAP + " damage.");

            attackStarted = true;
        }
        else {
            selectedAP += selectedAP;
            DefenderCAP += DefenderCAP;
            console.log("22222 selectedAP: " + selectedAP);
            console.log("22222 DefenderCAP: " + DefenderCAP);
            DefenderHP = DefenderHP - selectedAP;
            selectedHP = selectedHP - DefenderCAP;
            console.log("22222 DefenderHP: " + DefenderHP);
            console.log("22222 selectedHP: " + selectedHP);
            $("#attack-msg").text("You attacked " + selectedDef + " for " + selectedAP + " damage. " + selectedDef + " attacked you back for " + DefenderCAP + " damage.");
        }

        // All of the same game win-lose logic applies. So the rest remains unchanged.
        // Tie == win
        if (((selectedHP >= 0) && (DefenderHP < 0)) ||
            ((selectedHP <= 0) && (DefenderHP <= 0)) && (selectedHP >= DefenderHP)) {
            $("#attack-msg").text("You have defeated " + selectedDef + ". You can choose to fight another enemy.");
            // if user character have defeated the defender, the character takes defender's Counter Attack Power
            attackSucceed = true;
            gainedAP = parseInt(($("#char-box > img").attr("attack-power"))) + parseInt(($("#defender-box > img").attr("counter-attack-power")));
            console.log("gainedAP: " + gainedAP);
            $("#defender-box > img").remove();

            defIsSelected = false;
            if ($("#enemies-box > img").length == 0) {
                $("#attack-msg").text("You Won!!!! GAME OVER!!!");
                $("#reset-btn").show();
                $("#reset-btn").text("restart");
            }
        }
        else if (((selectedHP < 0) && (DefenderHP >= 0)) ||
            ((selectedHP < 0) && (DefenderHP <= 0)) && (selectedHP < DefenderHP)) {
            $("#attack-msg").text("You been defeated. GAME OVER");
            $("#reset-btn").show();
            $("#reset-btn").text("restart");
        }
    }
});

$("#reset-btn").on("click", function () {
    fReload();
});