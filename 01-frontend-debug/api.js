// api.js

async function fetchUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);  
  const data = await response.json();                                                 
  return data;
}
