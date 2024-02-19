

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const buttonStart = document.querySelector('[data-start]');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');

const datatimeInput = document.querySelector('#datetime-picker');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < options.defaultDate) {
      buttonStart.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: 'rgb(236, 56, 56)',
        messageColor: '#FFF',
        position: 'topCenter',
      });
    } else {
      buttonStart.disabled = false;
      userSelectedDate = selectedDates.getTime();
    }
  },
};

flatpickr(datatimeInput, options);

buttonStart.addEventListener('click', handlerBtnStart);

function handlerBtnStart() {
  if (userSelectedDate > Date.now()) {
    const timerCalc = () => {
      outputsUpdate(
        [daysData, hoursData, minutesData, secondsData],
        convertMs(userSelectedDate - Date.now())
      );
      if (
        userSelectedDate - 1000 < Date.now() &&
        secondsData.textContent === '00'
      )
        clearInterval(interval);
    };
    timerCalc();
    const interval = setInterval(timerCalc, 1000);
    buttonStart.disabled = true;
    datatimeInput.disabled = true;
    buttonStart.dataset.start = 'started';
  } else {
    iziToast.show({
      message: 'Please choose a date in the future',
      backgroundColor: 'rgb(236, 56, 56)',
      messageColor: '#FFF',
      position: 'topCenter',
    });
    buttonStart.disabled = true;
  }
}

const outputUpdate = (output, time) => {
  output.textContent = time.toString().padStart(2, '0');
};
const outputsUpdate = (
  [daysData, hoursData, minutesData, secondsData],
  { days, hours, minutes, seconds }
) => {
  outputUpdate(daysData, days);
  outputUpdate(hoursData, hours);
  outputUpdate(minutesData, minutes);
  outputUpdate(secondsData, seconds);
};

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}