import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = form.elements.delay;
const radioState = form.elements.state;

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delay = inputDelay.value;

  if (isValidDelay(delay)) {
    processFormSubmission(delay);
    event.target.reset();
  } else {
    showErrorMessage('Value must be more than 0');
  }
}

function isValidDelay(delay) {
  return delay > 0;
}

function processFormSubmission(delay) {
  const promise = createPromise(delay);

  setTimeout(() => {
    handlePromiseResult(promise);
  }, delay);
}

function createPromise(delay) {
  return radioState.value === 'fulfilled'
    ? Promise.resolve(`✅ Fulfilled promise in ${delay}ms`)
    : Promise.reject(`❌ Rejected promise in ${delay}ms`);
}

function handlePromiseResult(promise) {
  promise
    .then(value => {
      showNotification(value, 'rgba(82, 223, 79, 0.3)');
    })
    .catch(value => {
      showNotification(value, 'rgba(223, 79, 79, 0.3)');
    });
}

function showNotification(message, backgroundColor) {
  iziToast.show({
    message,
    backgroundColor,
    position: 'topCenter',
  });
}

function showErrorMessage(message) {
  showNotification(message, 'lightgrey');
}
