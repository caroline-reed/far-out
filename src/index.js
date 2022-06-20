import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import backdropIMG from "./images/starry-night-sky.jpg";
import gameoverIMG from "./images/gameoverdonut.jpg";
import rocketpicIMG from "./images/probe.png";
import rocketlogoIMG from "./images/probe.png";
import ufopic1IMG from "./images/ufocolor.png";
import ufopic2IMG from "./images/ufocolor2.png";
import donutpicIMG from "./images/donut.png";
import coffeePicIMG from "./images/coffeecup.png";
import starpicIMG from "./images/starsprite.png";
import starlogoIMG from "./images/starlogo.png";
import saturnIMG from "./images/saturn.png";
import firepicIMG from "./images/fireball.png";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const fireButton = document.getElementById("fireButton");
const gameControls = document.getElementById("gameControls");

var score;
var lives;

var loop = false;

var j;

var x = 375;

var t = Date.now();
var timePassed;
var count;

var speed;

var dir;

var fire;

var firex = x + 80;
var firey;

var showlife;
var showfire;
var didfire;



const backdrop = new Image();
backdrop.src = backdropIMG;

const gameover = new Image();
gameover.src = gameoverIMG;

const rocketpic = new Image();
rocketpic.src = rocketpicIMG;

const rocketlogo = new Image();
rocketlogo.src = rocketlogoIMG;

const ufopic1 = new Image();
ufopic1.src = ufopic1IMG;

const ufopic2 = new Image();
ufopic2.src = ufopic2IMG;

const donutpic = new Image();
donutpic.src = donutpicIMG;

const coffeepic = new Image();
coffeepic.src = coffeePicIMG;

const starpic = new Image();
starpic.src = starpicIMG;

const starlogo = new Image();
starlogo.src = starlogoIMG;

const saturn = new Image();
saturn.src = saturnIMG;

const firepic = new Image();
firepic.src = firepicIMG;


var imagelist = [backdrop, rocketpic,
  rocketlogo, ufopic1, ufopic2, donutpic,
  coffeepic, starpic, starlogo, saturn, firepic];

var imageload = 0;

for (var i=0; i<imagelist.length; i++) {
  imagelist[i].onload = function() {
    imageload += 1;

    if (imageload === imagelist.length) {
      startpage();
    }
  }
}



// class constructor for rocket (player)
class rocketPlayer {
  constructor(rocket, x, y) {
    this.rocket = rocket;
    this.x = x;
    this.y = y;
  }
}
const player1 = new rocketPlayer(rocketpic, x, 150);


// class constructor for stardust
class starDust {
  constructor(star, a, b, w) {
    this.star = star;
    this.a = a;
    this.b = b;
    this.w = w;

  }
}
const star1 = new starDust(starpic, 800 , Math.floor(Math.random() * 350), 55);
const star2 = new starDust(starpic, 800 , Math.floor(Math.random() * 350), 55);


// class constructor for extra life donut
class donutLife {
  constructor(donut, a, b, w) {
    this.donut = donut;
    this.a = a;
    this.b = b;
    this.w = w;
  }
}
const donut1 = new donutLife(donutpic, 800 , Math.floor(Math.random() * 350), 55);



//class constructor for coffee cup speed-ups
// class coffeeCup {
//   constructor(coffee, a, b, w) {
//     this.coffee = coffee;
//     this.a = a;
//     this.b = b;
//     this.w = w;
//
//   }
// }
// const coffee1 = new starDust(coffeepic, 800 , Math.floor(Math.random() * 350), 55);



// class constructor for fireball item
class fireBall {
  constructor(fireball, a, b, w) {
    this.fireball = fireball;
    this.a = a;
    this.b = b;
    this.w = w;

  }
}
const fireball1 = new fireBall(firepic, 800 , Math.floor(Math.random() * 350), 30);



// class constructor for enemy UFOs
class enemyUFO {
  constructor(ufo, p, q) {
    this.ufo = ufo;
    this.p = p;
    this.q = q;
  }
}
const ufo1 = new enemyUFO(ufopic1, 800, Math.floor(Math.random() * 340));
const ufo2 = new enemyUFO(ufopic2, 800, Math.floor(Math.random() * 340));
// const ufo3 = new enemyUFO(ufopic1, p, Math.floor(Math.random() * 340));




// Handle the event for up and down keyboard keys
function keydown(event) {
  if (event.code === "Numpad8" || event.code === "KeyK") {
    dir = 1;
  }

  if (event.code === "Numpad2" || event.code === "KeyD") {
    dir = 2;
  }

  // if (fire > 0 && event.code === "ShiftLeft") {
  //   didfire = true;
  // }
  //
  // if (fire > 0 && event.code === "ShiftRight") {
  //   didfire = true;
  // }

  if (fire > 0 && event.code === "Space") {
    didfire = true;
  }

  if (event.code === "Enter" && loop === false) {
    hideStart();
    resetStats();
    resetSprites();
    loop = true;
    draw();
  }

  else if (event.code === "Enter" && loop === true) {
    loop = false;
    hideRestart();
    resetStats();
    resetSprites();
    startpage();
  }
}


function keyup(event) {
  if (event.code === "Numpad8" || event.code === "KeyK") {
    dir = 12;
  }

  if (event.code === "Numpad2" || event.code === "KeyD") {
    dir = 22;
  }
}

window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);


// control the rocket with the up and down buttons
let up = document.getElementById("up");
let down = document.getElementById("down");

up.onmousedown = function() {
  dir = 1;
}

up.ontouchstart = function() {
  dir = 1;
}

up.onmouseup = function() {
  dir = 12;
}

up.ontouchend = function() {
  dir = 12;
}

down.onmousedown = function() {
  dir = 2;
}

down.ontouchstart = function() {
  dir = 2;
}

down.onmouseup = function() {
  dir = 22;
}

down.ontouchend = function() {
  dir = 22;
}



// Display start page and start button
function startpage() {
  context.clearRect(0, 0, 800, 400);

  context.beginPath();
  context.drawImage(backdrop, 0, 0, 800, 400);

  context.beginPath();
  context.drawImage(saturn, -250, -250, 1000, 1000);

  context.beginPath();
  context.drawImage(ufopic1, 660, -25, 300, 300);

  // context.beginPath();
  // context.drawImage(donutpic, -20, 220, 180, 200);

  context.beginPath();
  context.drawImage(starpic, -40, -80, 425, 425);

  context.beginPath();
  context.drawImage(rocketlogo, 315, 0, 350, 525);

  context.beginPath();
  context.font = "bold 75px Pallatino";

  context.shadowBlur = 10;
  context.shadowColor = "black";

  context.fillStyle = "deepskyblue";
  context.fillText("FarOut", 25, 370);

  context.shadowBlur = 0;

  context.lineWidth = 1.25;
  context.strokeStyle = "purple";
  context.strokeText("FarOut", 25, 370);
  }


// display Game Over screen
function gameOver() {
  context.clearRect(0, 0, 800, 400);

  context.beginPath();
  context.drawImage(gameover, 0, 0, 800, 400);

  context.beginPath();
  context.font = "100px Arial";
  context.fillStyle = "red";
  context.strokeStyle = "black";
  context.lineWidth = 1.5;
  context.fillText("Game Over!", 125, 275);
  context.strokeText("Game Over!", 125, 275);

  context.beginPath();
  context.font = "50px Arial";
  context.fillStyle = "yellow";
  context.strokeStyle = "black";
  context.lineWidth = 1.5;
  context.fillText("Final Score: " + String(score), 250, 350);
  context.strokeText("Final Score: " + String(score), 250, 350);
}


// hides the start button after it's pressed
function hideStart() {
  startButton.style.display = "none";
  // directions.style.display = "none";
  // restartButton.style.display = "block";
  gameControls.style.display = "block";
}

function hideRestart() {
  // restartButton.style.display = "none";
  gameControls.style.display = "none";
  startButton.style.display = "block";
  // directions.style.display = "block";
}

// function startFall() {
//   dir = 3;
// }
//
// function stopFall() {
//   dir = 0;
// }

// Resets variables to initial values
function resetStats() {
  lives = 3;
  score = 0;
  count = 0;
  speed = 100;
  fire = 1;
  dir = 0;
  j = 0;
}


function resetSprites() {
  player1.y = 150;

  star1.a = 800;
  star1.b = Math.floor(Math.random() * 350);

  star2.a = 800;
  star2.b = Math.floor(Math.random() * 350);

  fireball1.a = 800;
  fireball1.b = Math.floor(Math.random() * 350);

  donut1.a = 800;
  donut1.b = Math.floor(Math.random() * 350);

  // coffee1.a = 800;
  // coffee1.b = Math.floor(Math.random() * 350);

  ufo1.p = 800;
  ufo1.q = Math.floor(Math.random() * 350);

  ufo2.p = 800;
  ufo2.q = Math.floor(Math.random() * 350);
}



// Redraw backdrop to simulate flying
function drawBackdrop() {
  context.beginPath();
  context.drawImage(backdrop, j, 0, 800, 400);
  context.beginPath();
  context.drawImage(backdrop, j+799, 0, 800, 400);

  if (j > -799) {
    j -= (speed * timePassed);
  }

  else if (j <= -799) {
    j = 0;
  }
}


// Draw rocket (player)
function drawRocket(rocket) {
  context.beginPath();
  context.drawImage(rocket.rocket, rocket.x, rocket.y, 80, 115);



  if (dir === 1 && rocket.y > 0) {
    rocket.y -= (2 * speed * timePassed);
  }

  else if (dir === 12 && rocket.y > 0) {
    rocket.y -= (0.5 * speed * timePassed);
  }

  else if (dir === 2 && rocket.y < 285) {
    rocket.y += (2 * speed * timePassed);
  }

  else if (dir === 22 && rocket.y < 285) {
    rocket.y += (0.5 * speed * timePassed);
  }
}



// Draw stars to collect
function drawStar(star, rocket) {
  // star.star.onload = function () {
  //   context.drawImage(star.star, star.a, star.b, star.w, 65);
  // }
  context.beginPath();
  context.drawImage(star.star, star.a, star.b, star.w, 55);

  if (star.a > -55) {
    star.a -= (speed * timePassed);

    if (star.a <= rocket.x+80 && star.a >= rocket.x && star.b >= rocket.y-55 && star.b <= rocket.y+115) {
      star.a = 1200;
      star.b = Math.floor(Math.random() * 350);

      score += 1;

      if (score > 0 && score % 30 === 0) {
        fire += 1;
      }

      if (score > 0 && score % 50 === 0) {
        lives += 1;
      }
    }
  }

  else if (star.a <= -55) {
    star.a = 1200;
    star.b = Math.floor(Math.random() * 350);
  }
  // return score;
}


// Draw extra life donut
function drawDonut(donut, rocket) {
  // donut.donut.onload = function () {
  //   context.drawImage(donut.donut, donut.a, donut.b, donut.w, 50);
  // }
  context.beginPath();
  context.drawImage(donut.donut, donut.a, donut.b, donut.w, 65);

  if (donut.a > -55) {
    donut.a -= (speed * timePassed);


    if (donut.a <= rocket.x+80 && donut.a >= rocket.x && donut.b >= rocket.y-65 && donut.b <= rocket.y+115) {
      donut.a = 800;
      donut.b = Math.floor(Math.random() * 350);
      lives += 1;
      showlife = false;
      }
    }

  else if (donut.a <= -55) {
    donut.a = 800;
    donut.b = Math.floor(Math.random() * 350);
    showlife = false;
  }

  // return showlife;
}


// draw fireball ammo to collect
function drawFireball(fireball, rocket) {
  // fireball.fireball.onload = function () {
  //   context.drawImage(fireball.fireball, fireball.a, fireball.b, fireball.w, 30);
  // }
  context.beginPath();
  context.drawImage(fireball.fireball, fireball.a, fireball.b, fireball.w, 30);

  if (fireball.a > -30) {
    fireball.a -= (speed * timePassed);

    if (fireball.a <= rocket.x+80 && fireball.a >= rocket.x && fireball.b >= rocket.y-30 && fireball.b <= rocket.y+115) {
      fireball.a = 800;
      fireball.b = Math.floor(Math.random() * 350);

      fire += 1;
      showfire = false;
    }
  }

  else if (fireball.a <= -30) {
    fireball.a = 800;
    fireball.b = Math.floor(Math.random() * 350);
    showfire = false;
  }

  // return showfire;
}



// Draw enemy UFO
function drawufo(ufo, rocket) {
  // ufo.ufo.onload = function () {
  //   context.drawImage(ufo.ufo, ufo.p, ufo.q, 60, 60);
  // }
  context.beginPath();
  context.drawImage(ufo.ufo, ufo.p, ufo.q, 60, 60);

  if (ufo.p > -60) {
    ufo.p -= (1.5 * speed * timePassed);


    if (ufo.p <= rocket.x+80 && ufo.p >= rocket.x && ufo.q >= rocket.y-60 && ufo.q <= rocket.y+115) {
      lives -= 1;
      ufo.p = 1000;
      ufo.q = Math.floor(Math.random() * 340);
    }
  }

  else if (ufo.p <= -60) {
    ufo.p = 1000;
    ufo.q = Math.floor(Math.random() * 340);
  }
  // return lives;
}


function drawLives() {
  var s = 500;
  var lifemeter = Array.from(Array(lives).keys());

  context.beginPath();
  context.font = "25px Monospace";
  context.fillStyle = "white";
  context.strokeStyle = "white";
  context.fillText("Lives:", 400, 25);
  context.strokeText("Lives:", 400, 25);

  // saturn.onload = function () {
  //   context.drawImage(saturn, s, 5, 50, 30);
  // }
  for (var l in lifemeter) {
    context.beginPath();
    context.drawImage(saturn, s, 5, 30, 30);
    s += 55;
  }
}


function drawScore() {
  context.beginPath();
  context.font = "25px Monospace";
  context.fillStyle = "white";
  context.strokeStyle = "white";
  context.fillText("Score: " + String(score), 10, 25);
  context.strokeText("Score: " + String(score), 10, 25);
}


function launchfire(rocket) {
  firey = rocket.y + 32.5;

  // firepic.onload = function () {
  //   context.drawImage(firepic, firex, firey, 30, 30);
  // }
  context.beginPath();
  context.drawImage(firepic, firex, firey, 30, 30);

  if (firex >= 800) {
    firex = rocket.x + 110;
    fire -= 1;
    didfire = false;
  }

  else if (firex + 30 >= ufo1.p && firex <= ufo1.p + 60 && firey + 30 >= ufo1.q && firey <= ufo1.q + 60) {
    ufo1.p = 800;
    ufo1.q = Math.floor(Math.random() * 340);
    firex = rocket.x + 110;
    fire -= 1;
    didfire = false;
  }

  else if (firex + 30 >= ufo2.p && firex <= ufo2.p + 60 && firey + 30 >= ufo2.q && firey <= ufo2.q + 60) {
    ufo2.p = 800;
    ufo2.q = Math.floor(Math.random() * 340);
    firex = rocket.x + 110;
    fire -= 1;
    didfire = false;
  }

  else {
    firex += (5 * speed * timePassed);
  }
}


// Display available ammunition
function drawFire() {
  var e = 90;
  var firemeter = Array.from(Array(fire).keys());

  context.beginPath();
  context.font = "25px Monospace";
  context.fillStyle = "white";
  context.strokeStyle = "white";
  context.fillText("Fire:", 10, 60);
  context.strokeText("Fire:", 10, 60);

  // firepic.onload = function () {
  //   context.drawImage(firepic, e, 35, 30, 30);
  // }
  for (var f in firemeter) {
    context.beginPath();
    context.drawImage(firepic, e, 35, 30, 30);
    e += 35;
  }
}

// Speed up movement over time
function speedup() {
    speed += 5;
}


// DRAW CANVAS
function draw() {
  timePassed = (Date.now() - t) / 1000;
  t = Date.now();

  context.clearRect(0, 0, 800, 400);

  drawBackdrop();

  drawRocket(player1);

  if (count >= 75) {
    drawStar(star1, player1);
  }

  if (count >= 150) {
    drawufo(ufo1, player1);
  }

  if (count >= 235) {
    drawufo(ufo2, player1);
  }

  if (count >= 275) {
    drawStar(star2, player1);
  }

  if (count > 0 && count % 1000 === 0) {
    showfire = true;
  }

  if (showfire === true) {
    drawFireball(fireball1, player1);
  }

  if (count > 0 && count % 2000 === 0) {
    showlife = true;
  }

  if (showlife === true) {
    drawDonut(donut1, player1);
  }

  if (didfire === true && fire > 0) {
    launchfire(player1);
  }

  drawFire();

  drawLives();

  drawScore();

  if (count > 0 && count % 100 === 0) {
    speedup();
  }

  count += 1;

  if (lives > 0 && loop === true) {
    window.requestAnimationFrame(draw);
  }

  else if (lives > 0 && loop === false) {
    // stopFall();
    startpage();
  }

  else if (lives <= 0) {
    // stopFall();
    gameOver();
  }
}


startButton.addEventListener("click", () => {
  hideStart();
  resetStats();
  resetSprites();
  loop = true;
  draw();
  // startFall();
});

restartButton.addEventListener("click", () => {
  loop = false;
  hideRestart();
  resetStats();
  resetSprites();
  startpage();
});


fireButton.addEventListener("click", () => {
    didfire = true;
});

// backdrop.onload = function () {
//   startpage();
// }








// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
