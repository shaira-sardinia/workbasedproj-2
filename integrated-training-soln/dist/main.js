'use strict';

import { registerUser } from './index.js';

function counter() {
  let seconds = 0;
  setInterval(() => {
    seconds += 1;
    document.getElementById('app').innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
  }, 1000);
}

counter();

document.getElementById('authForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const user = await registerUser(email, password);
    console.log('Registration successful:', user);
  } catch (error) {
    console.error('Error during registration:', error);
  }
});