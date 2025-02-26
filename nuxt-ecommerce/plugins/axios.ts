// plugins/axios.ts
import axios from 'axios';

const backendStrapi = axios.create({ baseURL: 'http://localhost:1337/api/' });

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('backedstrapi', backendStrapi);
});

export {
  backendStrapi,
};
