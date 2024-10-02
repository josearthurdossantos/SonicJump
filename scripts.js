const sonic = document.getElementById("sonic");
const bomb = document.getElementById("bomb");
const gameover = document.getElementById("gameover");
const pontuacao = document.getElementById("pontuacao");
const record = document.getElementById("record");
const atualizar = document.getElementById("atualizar");

var audio = new Audio('./sons/dubstep-sonic-canyons-13123.mp3');
audio.loop = true;
window.onload = function() {
    audio.play();
};

var collisionSound = new Audio('./sons/videogame-death-sound-43894.mp3');

let pontuacaoAtual = 0;
let pontuacaoMaxima = localStorage.getItem("maxScore") || 0;

const numberToString = parseInt(pontuacaoMaxima);
record.textContent = "Recorde: " + numberToString.toFixed(0);

function updateScore(pontos) {
  if (pontos > pontuacaoMaxima) {
    pontuacaoMaxima = pontos;
    localStorage.setItem("maxScore", pontuacaoMaxima);
  }
}

function jump () {
  if (sonic.classList != "jump") {
    sonic.classList.add("jump");
    
    setTimeout(function () {
      sonic.classList.remove("jump");
    }, 500);
  }
}

document.addEventListener("keydown", function (event) {
  jump();
});

document.addEventListener("touchstart", function (event) {
  jump();
});

let loop = setInterval(function () {
  const bombPosition = parseInt(window.getComputedStyle(bomb).getPropertyValue("left"));
  const sonicPosition = parseInt(window.getComputedStyle(sonic).getPropertyValue("bottom"));
  pontuacaoAtual = pontuacaoAtual + 0.09;
  const info = "Pontuação: " + pontuacaoAtual.toFixed(1); 
  pontuacao.textContent = info;
    
  if (bombPosition <= 120 && bombPosition > 0 && sonicPosition < 80) {
    audio.pause();
    collisionSound.play();
    bomb.style.animation = "none";
    bomb.style.left = `${bombPosition}px`;
    
    sonic.style.animation = "none";
    sonic.style.bottom = `${sonicPosition}px`;
    sonic.src = './img/sonic-gameover.png';
    sonic.style.width = '120px';
    sonic.style.marginLeft = "40px";
    
    gameover.style.marginLeft = "35%";
    atualizar.style.marginLeft = "48%";

    updateScore(pontuacaoAtual);

    clearInterval(loop);
  }

}, 10);
