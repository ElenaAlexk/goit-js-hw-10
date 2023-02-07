import './css/styles.css';

const DEBOUNCE_DELAY = 300;

fetch('https://restcountries.com/v3.1/name/{name}')
  .then(response => {
    return response.json();
  })
  .then(name => {
    console.log();
  })
  .catch(error => {
    console.log(error);
  });
