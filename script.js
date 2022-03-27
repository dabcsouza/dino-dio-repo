const background = document.getElementsByClassName('back')[0];
let dinoEl;
let btnReloadEl;
let isJump = false;
let position = 10;

const startGame = () => {
  const dinoDiv = document.createElement('div');
  dinoDiv.classList.add('dino');
  background.appendChild(dinoDiv);
  dinoEl = document.getElementsByClassName('dino')[0];
  document.addEventListener('keyup', handleKeyUp);
  createCactus();
}

const dinoUp = () => {
  isJump = true;
  const upInterval = setInterval(() => {
    if (position >= 350) { 
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 10) {
          clearInterval(downInterval);
          isJump = false;
        } else { 
          position -= 20;
          dinoEl.style.bottom = `${position}px` }
      }, 20)
    } else {
      position += 20;
      dinoEl.style.bottom = `${position}px`
    };
    
  }, 20);
  
}
const handleKeyUp = ({ key }) => {
  if(key === ' ') {
    !isJump && dinoUp();
  }
}

const createCactus = () => {
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000
  const cactus = document.createElement('div');
  cactus.classList.add('cactus');
  cactus.style.left = `${1000}px`;
  cactus.style.bottom = `${10}px`;
  background.appendChild(cactus);

  const leftInterval = setInterval(() => {
    if (cactusPosition <= -60){
      clearInterval(leftInterval);
    } else if (
      cactusPosition > 0 
      && cactusPosition < 60 
      && (position < cactusPosition || position < 60)) {
      clearInterval(leftInterval);
      const htmlBody = `
      <div class="end-container">
        <h1 class="game-over"> Game Over </h1>
        <button class="btn" id="rld-btn"> Reload &#x21bb;</button>
      </div>
      `
      document.body.innerHTML = htmlBody;
    } else {
      cactusPosition -= 10;
      cactus.style.left = `${ cactusPosition }px`
    }
  }, 20);
  
  const btnEl = document.querySelector('#rld-btn');
  !btnEl ? setTimeout(createCactus, randomTime)
  : btnEl.addEventListener('click', () => window.location.reload());  
}
window.onload = () => {
  startGame();
}; 