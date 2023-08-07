import axios from 'axios';

const addressAPI = axios.create({
  baseURL: 'https://api-adresse.data.gouv.fr/search/',
});

const backEndAPI = axios.create({
  baseURL: 'http://localhost:3000/',
});

const ptvAPI = axios.create({
  baseURL: 'https://api.myptv.com/routing/v1/routes',
});

export { addressAPI, backEndAPI, ptvAPI };
