var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;

function nextClick(){
    return Math.floor(Math.random()*4);
}

function playSound(color){
    var sound = color + ".mp3";
    sound = "sounds/" + sound;

    var playSound = new Audio(sound);
    playSound.play();
}

function animateAIClick(color){
    var selector = "." + color;
    $(selector).fadeOut(100).fadeIn(100);
}

function animatePlayerClick(color){
    var selector = "." + color;
    $(selector).addClass("pressed");
    setTimeout(function(){
        $(selector).removeClass("pressed");
    }, 200);

}

function nextSequence(){
    var chosencolor = colors[nextClick()];
    gamePattern.push(chosencolor);
    
    animateAIClick(chosencolor);
    playSound(chosencolor);

    level++;

    $("#level-title").html("Level " + level);
}

function checkAnswer(){
    console.log(userPattern);
    console.log(gamePattern);
    if(userPattern[userPattern.length-1] != gamePattern[userPattern.length-1])
        lost();
    else if(userPattern.length == gamePattern.length){
        userPattern = [];
        setTimeout(nextSequence, 1000);
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    userPattern = [];
}

function lost(){
    var playSound = new Audio("sounds/wrong.mp3");
    playSound.play();

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);


    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
}


$(".btn").click(function(e){
    userColor = e.target.id;
    userPattern.push(userColor);

    playSound(userColor);
    animatePlayerClick(userColor);

    checkAnswer();
});

$(document).keypress(function(){
    if(level == 0){
        nextSequence();
    }
})




