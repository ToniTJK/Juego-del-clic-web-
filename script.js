$(function() {
    $('#btnEasy').click(startEasyGame);
    $('#btnMiddle').click(startMiddleGame);
    $('#btnHard').click(startHardGame);
});

var screenWidth = $( document ).width();
var screenHeight = $( document ).height();

console.log(screenWidth);
console.log(screenHeight);

function startEasyGame(){
    console.log("Easy Game");
}

function startMiddleGame(){
    console.log("Middle Game");
}

function startHardGame(){
    console.log("Hard Game");
}