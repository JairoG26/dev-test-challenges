// app.js

const userCache = {};

async function loadUser() {
  const userId = document.getElementById('userId').value.trim();

  if (userId === '') {           
    showResult('Please enter a valid ID');
    return;
  }

  if (isNaN(userId) || Number(userId) <= 0) {  
    showResult('ID must be positive', true);
    return;
  }

  if (!userCache[userId]) {
    userCache[userId] = fetchUser(userId);  
  }

  const user = await userCache[userId];

  const resultEl = document.getElementById('result');
  resultEl.className = '';

  resultEl.textContent = '';

  const strongEl = document.createElement('strong');
  strongEl.textContent = user.name;

  resultEl.appendChild(strongEl);
  resultEl.appendChild(document.createElement('br'));
  resultEl.appendChild(document.createTextNode(user.email));
  resultEl.appendChild(document.createElement('br'));
  resultEl.appendChild(document.createTextNode(user.website));
}

function showResult(message, isError = false) {
  const el = document.getElementById('result');
  el.className = isError ? 'error' : '';
  el.textContent = message;
}
