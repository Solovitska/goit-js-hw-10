
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const inputDelay = form.elements.delay;
const radioState = form.elements.state;

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();
  delayHandler(inputDelay.value);
  event.target.reset();
}

function delayHandler(delay) {
  if (delay > 0) {
    const promise =
      radioState.value === 'fulfilled'
        ? Promise.resolve(`✅ Fulfilled promise in ${delay}ms`)
        : Promise.reject(`❌ Rejected promise in ${delay}ms`);

    setTimeout(() => {
      promise;
    }, delay);

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

