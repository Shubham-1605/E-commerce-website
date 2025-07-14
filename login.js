const container = document.querySelector('.container');
const registerbutton = document.querySelector('.register-button');
const loginbutton = document.querySelector('.login-button');

registerbutton.addEventListener('click',() => {
    container.classList.add('active');
})

loginbutton.addEventListener('click',() => {
    container.classList.remove('active');
})