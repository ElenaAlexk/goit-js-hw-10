import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');
const infoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
function onSearch(event) {
  event.preventDefault;

  const inputCountries = event.target.value.trim();

  if (inputCountries) {
    return fetchCountries(inputCountries)
      .then(result => {
        renderMarkup(result);
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  }
  listRef.innerHTML = '';
  infoRef.innerHTML = '';
}

function renderMarkup(result) {
  if (result.length === 1) {
    listRef.innerHTML = '';
    return countryCardMarkup(result);
  }
  if (result.length > 1 && result.length <= 10) {
    infoRef.innerHTML = '';
    return countryListMarkup(result);
  }
  return Notify.info(
    'To many matches found. Please enter a more specific name.'
  );
}

function countryListMarkup(result) {
  const listMarkup = result
    .map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${name}" width="60" height="auto"/>
    <p>${name.official}</p></li>`;
    })
    .join('');
  listRef.innerHTML = listMarkup;
}

function countryCardMarkup(result) {
  const infoMarkup = result
    .map(({ flags, name, capital, population, languages }) => {
      languages = Object.values(languages).join(', ');
      return `<h1><img src="${flags.svg}" alt="${name}" width="60" height="auto"/>
      ${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${languages}</p>`;
    })
    .join('');
  infoRef.innerHTML = infoMarkup;
}
