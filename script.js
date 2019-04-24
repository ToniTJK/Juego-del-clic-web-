$(function () {
    // ONCLICK BUTTONS
    $('#btnEasy').click(easyMode);
    $('#btnMiddle').click(middleMode);
    $('#btnHard').click(hardMode);
    $('#btnRestart').click(dynamicMenu);
});

// PARAMS GAME STATE
var score = 0;
var speed = 0;
var menu = true;

// Calcula el tamaño de la pantalla que se usará en las diferentes funciones
var screenWidth = $(document).width() - 100;
var screenHeight = $(document).height() - 100;

function startGame() {
    /* 
    Al empezar el juego (al seleccionar una difficultad) se crea
    el campo de juego segun el tamaño de la pantalla 
    */
    $('#battlefield').css({
        'width': screenWidth,
        'height': screenHeight,
        'margin-top': '10px',
        'border': '0px solid black',
        'background-color': 'white'
    });
    menu = true; // se activa el segundo menu
    dynamicMenu(); // Se enconden y aparecen los botones correspondientes.
    resetScore(); // la puntuación se setea a 0 cada vez que empieza una partida.
    createApples_randomPosition(); // se crean las manzanas de forma aleatoria.
    randomlyMoveImage(); // se crea el movimiento de las manzanas de forma aleatoria.
}

function easyMode() {
    speed = 2500; // se marca la velocidad en la que se van a mover las manzanas en modo facil.
    startGame(); // se inicia el juego.
}

function middleMode() {
    speed = 1500; // se marca la velocidad en la que se van a mover las manzanas en modo normal.
    startGame(); // se inicia el juego.
}

function hardMode() {
    resetScore()
    speed = 800; // se marca la velocidad en la que se van a mover las manzanas en modo dificil.
    startGame(); // se inicia el juego.
}

function createApples_randomPosition() {
    for (var i = 1; i <= 10; i++) { // bucle para crear 10 manzanas 1-10
        // Calculas las posiciones aleatorias
        var x = Math.floor(((Math.random() * screenWidth) + 1) - 50);
        var y = Math.floor(((Math.random() * screenHeight) + 1) - 50);

        // se crea la imagen y se añade al campo.
        var img = $('<img id="apple' + i + '" class="apples">');
        img.attr('src', './assets/img/apple' + i + '.png');
        img.appendTo('#battlefield');

        $("#apple" + i).animate({left: x,top: y }, 0); // posición inicial aleatoria

        $("#apple" + i).click(incrementScore); // cuando se haga click se augmentará la puntuación
    }
}

var index = 1;

function randomlyMoveImage() {
    // Calculas las posiciones aleatorias
    var x = Math.floor(((Math.random() * screenWidth) + 1) - 50);
    var y = Math.floor(((Math.random() * screenHeight) + 1) - 50);

    if (index > 10) index = 1; // Reset Index 10 to 1 para el numero de las manzanas

    $("#apple" + index).animate({
        left: x,
        top: y
    }, speed); // Animación aleatoria

    index++; // Increment Index

    setTimeout(randomlyMoveImage, 0); // bucle cada 0s se llamará a esta función para dar animación a todas las manzanas
}

function incrementScore() {
    score = score + 1; // augmentamos en 1 la puntuación
    $('#score').html(score); // se muestra en pantalla
    var iud = $(this).attr("id"); // se coge el atributo id del objeto que ha hecho click
    $(this).remove(); // se elimina el objeto que ha hecho click
    /* Una vez eliminada se crea otra manzana igual visualmente 
    al que se ha eliminado, así siempre habrà 10 diferentes en pantalla */
    createOneApple(iud); 
}

function resetScore() {
    score = 0; // La puntuación se pone a 0 y se muestra
    $('#score').html(score);
}

function createOneApple(iud) { 
    // Crea una manzana igual a la que ha eliminado en una posición aleatoria
    var x = Math.floor(((Math.random() * screenWidth) + 1) - 50);
    var y = Math.floor(((Math.random() * screenHeight) + 1) - 50);

    // Create Image
    var img = $('<img id="' + iud + '" class="apples">');
    img.attr('src', './assets/img/' + iud + '.png');
    img.appendTo('#battlefield');

    $("#" + iud).animate({
        left: x,
        top: y
    }, 0); // Animacióm

    $("#" + iud).click(incrementScore);
}

function dynamicMenu() {
    // Se muestra o se enconden los botones segun si estamos jugando o en el menu principal
    if (menu) {
        $('#buttonsMenu').hide();
        $('#titleGame').hide();
        $('#buttonsGame').show();
        menu = false;
    } else {
        $('#buttonsMenu').show();
        $('#buttonsGame').hide();
        $('#titleGame').show();
        cleanBattlefield();
        menu = true;
    }
}

function cleanBattlefield() {
    // Limpia el campo de juego.
    $('#battlefield').empty();
}
