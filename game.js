
var buttoncolours=["red","blue","green","yellow"];
var level=0;
var started=false;
var gamepattern=[];
var userClickedPattern=[];

$(".btn").click(function(){
     var userChosenColour=$(this).attr("id");
     userClickedPattern.push(userChosenColour);
     playsound(userChosenColour);
     animatepress(userChosenColour);

     checkanswer(userClickedPattern.length-1)
    });
$(document).keypress(function(event){
    if (!started) {
        $("#level-title").text("Level "+level);
        next_sequence();
        started=true;       
    }
    
    }); 

function next_sequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var random_number=Math.floor(Math.random()*4);
    var randomChosenColour=buttoncolours[random_number];
    gamepattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour)  

}

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();    
}

function animatepress(currentColour)
{
  $("#"+currentColour).addClass("pressed"); 
  setTimeout(function(){
     $("#"+currentColour).removeClass("pressed");
 }, 100); 
}

function checkanswer(currentLevel)
{
  if(gamepattern[currentLevel]===userClickedPattern[currentLevel])
  {
     console.log("sucess");
     if(userClickedPattern.length===gamepattern.length)
     {
       setTimeout(function(){
         next_sequence();
      }, 1000);  
     }
  }  else
  {
      console.log("wrng");
      playsound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    start_over();

  }
}

function start_over()
{
  gamepattern=[];
  level=0;
  started=false;
}



