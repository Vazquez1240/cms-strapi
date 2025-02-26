// types/axios.d.ts
import { AxiosInstance } from 'axios';

declare module '#app' {
  interface NuxtApp {
    $backedstrapi: AxiosInstance;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $backedstrapi: AxiosInstance;
  }
}

export {};
