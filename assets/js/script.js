const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const pontosElement = document.querySelector('.pontos');

let pontos = 0;
let contouPonto = false;

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioposition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioposition < 80) {

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
        pontosElement.textContent = "pontos:" + pontos // atualiza o HTML
        contouPonto = true; // impede contar várias vezes
    }

    // Quando o cano volta ao início, resetamos a contagem
    if (pipePosition > 800) {
        contouPonto = false;
    }


}, 10);

document.addEventListener('keydown', jump);
