import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('country-list');
const infoRef = document.querySelector('country-info');

inputRef.addEventListener('input', onSearch);
function onSearch(event) {
  event.preventDefault;
  const inputCountries = event.target.value.trim();
  if (inputCountries) {
    return fetchCountries(inputCountries)
      .then(result => {})
      .catch(error => {});
    //.finally(() => inputCountry.reset);
  }
}

function countryListMarkup() {}
function countryCardMarkup() {}
