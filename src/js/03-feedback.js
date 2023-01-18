import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

const formData = {};

form.addEventListener('submit', onFormSubmit);
input.addEventListener('input', onInput);
textarea.addEventListener('input', onTextareaInput);
form.addEventListener('input', throttle(onFormInput, 500));

onFormReturn();

function onTextareaInput(e) {
  const message = e.target.value;
}

function onInput(e) {
  const email = e.target.value;
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}
function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
function onFormReturn(e) {
  const savedMessage = localStorage.getItem(
    'feedback-form-state',
    JSON.stringify(formData)
  );
  const parsedData = JSON.parse(savedMessage);

  if (savedMessage) {
    input.value = parsedData.email;
    textarea.value = parsedData.message;
  }
}
