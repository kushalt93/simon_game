var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = []

function nextNumber(){
    var randomNumber = Math.floor((Math.random() * 4));
    return randomNumber;
}

var randomColor = buttonColors[nextNumber()];
gamePattern.push(randomColor)
console.log(randomColor)
$("#" + randomColor).click(function(){
    $("." + randomColor).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomColor + ".mp3")
    audio.play()
})

$("div[type=button]").click(function(e) { 
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    var audio = new Audio("sounds/" + userChosenColor + ".mp3")
    audio.play()

});

