var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = []
var level = 1


$("body").keydown(function (e) {
    $("h1").text("Level " + level);
    level = level + 1
    nextNumber()
    userInput()
    checkAnswer(level)
});

function nextNumber(){
    var randomNumber = Math.floor((Math.random() * 4));
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor)
    for(i=0; i<=level; i++){
        $("#" + randomColor).fadeOut(100).fadeIn(100);
        playSound(randomColor)
        pressAnimation(randomColor) 
    }
}

function userInput() {
    $("div[type=button]").click(function(e){
        var userChosenColor = e.target.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        pressAnimation(userChosenColor)
    });
}
function checkAnswer(currLevel){
    for(i = 0; i<currLevel; i++)
        if(JSON.stringify(gamePattern)==JSON.stringify(userClickedPattern))
        {
            nextNumber()
        }
    else{
        $("h1").text("Game Over... Refresh to start again");
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function pressAnimation(currColor){
$("#" + currColor).addClass("pressed");
setTimeout(function(){
    $("#" + currColor).removeClass("pressed");
})
}
