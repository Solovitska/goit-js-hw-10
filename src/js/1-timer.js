
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const newButtonStart = document.querySelector('[data-start]');
const newDaysData = document.querySelector('[data-days]');
const newHoursData = document.querySelector('[data-hours]');
const newMinutesData = document.querySelector('[data-minutes]');
const newSecondsData = document.querySelector('[data-seconds]');

const newDatetimeInput = document.querySelector('#datetime-picker');

let newUserSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < options.defaultDate) {
      newButtonStart.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: 'rgb(236, 56, 56)',
        messageColor: '#FFF',
        position: 'topCenter',
      });
    } else {
      newButtonStart.disabled = false;
      newUserSelectedDate = selectedDates.getTime();
    }
  },
};

flatpickr(newDatetimeInput, options);

newButtonStart.addEventListener('click', handlerBtnStart);

function handlerBtnStart() {
  if (newUserSelectedDate > Date.now()) {
    const timerCalc = () => {
      outputsUpdate(
        [newDaysData, newHoursData, newMinutesData, newSecondsData],
        convertMs(newUserSelectedDate - Date.now())
      );
      if (
        newUserSelectedDate - 1000 < Date.now() &&
        newSecondsData.textContent === '00'
      )
        clearInterval(interval);
    };
    timerCalc();
    const interval = setInterval(timerCalc, 1000);
    newButtonStart.disabled = true;
    newDatetimeInput.disabled = true;
    newButtonStart.dataset.start = 'started';
  } else {
    iziToast.show({
      message: 'Please choose a date in the future',
      backgroundColor: 'rgb(236, 56, 56)',
      messageColor: '#FFF',
      position: 'topCenter',
    });
    newButtonStart.disabled = true;
  }
}

const outputUpdate = (output, time) => {
  output.textContent = time.toString().padStart(2, '0');
};
const outputsUpdate = (
  [newDaysData, newHoursData, newMinutesData, newSecondsData],
  { days, hours, minutes, seconds }
) => {
  outputUpdate(newDaysData, days);
  outputUpdate(newHoursData, hours);
  outputUpdate(newMinutesData, minutes);
  outputUpdate(newSecondsData, seconds);
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