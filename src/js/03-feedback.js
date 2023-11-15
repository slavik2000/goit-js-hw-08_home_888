import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

// слушатели
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea[name="message"]'),
  email: document.querySelector('input[name="email"]'),
};

// обработчики событий
refs.form.addEventListener('input', throttle(onInput, 800));
refs.form.addEventListener('submit', onFormSubmit);

savedText();

// запись в localstorage
function onInput() {
    const objectToSave = { email: refs.email.value, message: refs.textarea.value };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(objectToSave));
}

// отправка формы и очистка
function onFormSubmit(evt) {
    evt.preventDefault();
    console.log({ email: refs.email.value, message: refs.textarea.value });
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};

// проверка заполненности localstorage
const load = key => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error('Get state error: ', error.message);
    }
};

function savedText() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    // console.log(savedMessage);
    if (savedMessage) {
        const text = JSON.parse(savedMessage);
        refs.email.value = text.email;
        refs.textarea.value = text.message;
        // console.log(text.email);
    };
};

