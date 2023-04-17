import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const start = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

day.textContent = addLeadingZero(new Date().getDate());
hour.textContent = addLeadingZero(new Date().getHours());
minute.textContent = addLeadingZero(new Date().getMinutes());
second.textContent = addLeadingZero(new Date().getSeconds());

let timer = null;
let rasn = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    rasn = selectedDates[0] - new Date();
    if (rasn > 0) {
      start.disabled = false;
    } else {
      start.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

start.disabled = true;

start.addEventListener('click', onClick);

function onClick() {
  timer = setInterval(() => {
    if (rasn <= 0) {
      clearInterval(timer);
      start.disabled = false;
    } else {
      start.disabled = true;
      let { days, hours, minutes, seconds } = convertMs(rasn);
      day.textContent = addLeadingZero(days);
      hour.textContent = addLeadingZero(hours);
      minute.textContent = addLeadingZero(minutes);
      second.textContent = addLeadingZero(seconds);
      rasn -= 1000;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
