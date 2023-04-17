import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

let timer = 0;

function submitForm(ev) {
  ev.preventDefault();
  const {
    delay: { value: delay = 0 },
    step: { value: step = 0 },
    amount: { value: amount = 0 },
    button,
  } = ev.target.elements;

  timer = 0;
  button.disabled = true;

  setTimeout(() => {
    for (let index = 1; index <= Number(amount); index++) {
      createPromise(index, Number(delay), Number(step))
        .then(({ position, sum }) => {
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${sum}ms`);
        })
        .catch(({ position, sum }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${sum}ms`);
        })
        .finally(() => {
          if (index === Number(amount)) button.disabled = false;
        });
    }
  }, delay);
}

function createPromise(position, delay, step) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    const sum = delay + timer;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, sum });
      } else {
        reject({ position, sum });
      }
    }, timer);
    timer += step;
  });
}
