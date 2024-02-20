
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const formElement = document.querySelector('.form');
const inputDelayElement = formElement.elements.delay;
const radioStateElement = formElement.elements.state;

formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  delayHandler(inputDelayElement.value);
  event.target.reset();
}

function delayHandler(delay) {
  if (delay > 0) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (radioStateElement.value === 'fulfilled') {
          resolve(`✅ Fulfilled promise in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise in ${delay}ms`);
        }
      }, delay);
    });

    promise
      .then(value => {
        iziToast.show({
          message: value,
          backgroundColor: 'rgba(82, 223, 79, 0.3)',
          position: 'topCenter',
        });
      })
      .catch(value => {
        iziToast.show({
          message: value,
          backgroundColor: 'rgba(223, 79, 79, 0.3)',
          position: 'topCenter',
        });
      });
  } else {
    iziToast.show({
      message: 'Value must be more than 0',
      backgroundColor: 'lightgrey',
      position: 'topCenter',
    });
  }
}





