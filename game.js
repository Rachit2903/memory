var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];


var level=0;
var Started=true;
 $(".start").on("click",function(){
    if(Started){
        $("#level-title").text("level "+level);
        nextSeaquence();
        checkKey=false;
    }
})


$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
});



function nextSeaquence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
   
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                nextSeaquence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press Button to Restart");
        startOver();
    }
}
function playSound(Name){
    var audio=new Audio("sounds/"+Name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    Started=true;
    gamePattern=[];
}
