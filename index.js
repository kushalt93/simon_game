var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = []
var level = 0
var gameInProgress = false


$(document).ready(function() {
    $( "#dialog" ).dialog({
      height: "auto",
      width: "500",
      modal: true,
      buttons: {
        "I'm ready to play": function() {
            if(!gameInProgress){
                $("h1").text("Level " + level);
                nextNumber();
                gameInProgress = true;
            }
            $( this ).dialog( "close" );
        },
        "Never Mind!, I will come back later": function() {
            $("h1").text("Refresh the page to play the game");
            $( this ).dialog( "close" );
        }
      }
    });
  } );


function start(){
    level = 0;
    gamePattern = []
    gameInProgress = false;
}

// $("body").keydown(function (e) {
//     if(!gameInProgress){
//         $("h1").text("Level " + level);
//         nextNumber();
//         gameInProgress = true;
//     }
// });

async function nextNumber(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomColor = buttonColors[randomNumber];
        gamePattern.push(randomColor)
        for(i=0; i<gamePattern.length; i++)
            {
                await wait()
                $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
                playSound(gamePattern[i])
                pressAnimation(gamePattern[i])
            }
    }
        async function wait() {
        return new Promise(function(resolve) {
          setTimeout(resolve, 300);
      });
    }

  $("div[type=button]").click(function(e){
        var userChosenColor = e.target.id;
        userClickedPattern.push(userChosenColor);
        $("#" + userChosenColor).fadeOut(100).fadeIn(100);
        playSound(userChosenColor);
        pressAnimation(userChosenColor)
        checkAnswer(userClickedPattern.length-1)
});
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextNumber();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
        start();
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
