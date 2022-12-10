var butttoncolor = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickedpattern = [];


// show sequence and play sound
var level = 0;

function nextsequence() {
  var randomnumber = Math.random() * 4;
  randomnumber = Math.floor(randomnumber);
  var randomchosencolor = butttoncolor[randomnumber];
  gamepattern.push(randomchosencolor);

  $("#" + randomchosencolor).delay(100).fadeOut(100).fadeIn(100);
  var audio = new Audio( randomchosencolor + ".mp3");
  audio.play();

  level += 1;
  $("h1").text("LEVEL " + level);


}

// button clicked and sound played and animation
$(".btn").on("click", function() {
  var userchosencolor = $(this).attr('id');
  userclickedpattern.push(userchosencolor);
  playsound(userchosencolor);
  animatepress(userchosencolor);
  checkanswer(userclickedpattern.length - 1);
});

// functions

function playsound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function animatepress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}

// start game
var s=1;
$(document).on("keydown",function(){
  if (s===1) {
    $("h1").text("Level"+level);
    nextsequence();
  }
  s++;
});

// check sequence

function checkanswer(currentlevel) {
  if (gamepattern[currentlevel] === userclickedpattern[currentlevel]) {
    if (gamepattern.length === userclickedpattern.length) {
      setTimeout(function() {
        nextsequence();
      }, 1000);
      userclickedpattern = [];
    }
  } else {

    var audio = new Audio("wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over,Press Any Key to Restart");
    startover();

  }
}

function startover(){
  level=0;
  gamepattern=[];
  userclickedpattern=[];
  s=1;
}
