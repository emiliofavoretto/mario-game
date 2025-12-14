const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const pontosElement = document.querySelector('.pontos');
const somGameOver = new Audio("../assets/sounds/hitHurt.wav");
somGameOver.volume = 0.6;
const somJump = new Audio("../assets/sounds/jump.wav");
somJump.volume = 0.4;

let pontos = 0;
let contouPonto = false;

const jump = () => {

    if (mario.classList.contains('jump')) return;

    // som de pulo
    somJump.currentTime = 0;
    somJump.play();

    mario.classList.add('jump');
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioposition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioposition < 80) {

        somGameOver.currentTime = 0;
        somGameOver.play();// som do GameOver

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioposition}px`;

        mario.src = '../assets/img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
    }

    if (pipePosition < 50 && !contouPonto) {
        pontos++; // soma 1 ponto
        pontosElement.textContent = "pontos:" + pontos //html
        contouPonto = true;
    }

    // Quando o cano volta ao início, resetamos a contagem
    if (pipePosition > 800) {
        contouPonto = false;
    }

}, 10);

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        jump();
    }
});

