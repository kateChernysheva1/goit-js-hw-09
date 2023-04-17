const start = document.querySelector('[data-start]');
const stopt = document.querySelector('[data-stop]');

stopt.disabled = true;
let int = null;

start.addEventListener('click', startClick);
stopt.addEventListener('click', stopClick);

function startClick() {
  start.disabled = true;
  stopt.disabled = false;
  int = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopClick() {
  start.disabled = false;
  stopt.disabled = true;
  clearInterval(int);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
