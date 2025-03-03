import { defineStore } from 'pinia';

const userStore = defineStore('userStore', {
  state: () => ({
    datosUser: {
      username: '',
      nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      correo: '',
    },
    auth: {
      token: '',
      refresh_token: '',
      tokenExpiry: null as number | null,
      refreshTokenExpiry: null as number | null,
      provider: ''
    }
  }),
  actions: {
    setDataUsername(username: string) {
      this.datosUser.username = username;
    },
    setDataNombre(nombre: string) {
      this.datosUser.nombre = nombre;
    },
    setDataEmail(email: string) {
      this.datosUser.email = email;
    },
    setDataAuthToken(token: string, refresh_token: string, tokenExpiry: number, refreshTokenExpiry:number, provider: string) {
      this.auth.token = token;
      this.auth.refresh_token = refresh_token;
      this.auth.tokenExpiry = tokenExpiry;
      this.auth.refreshTokenExpiry = refreshTokenExpiry;
      this.auth.provider = provider;
    },
    clearAuth() {
      this.auth.token = '';
      this.auth.refresh_token = '';
      this.auth.provider = ''
      this.auth.tokenExpiry = null;
      this.datosUser = {
        username: '',
        nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        correo: '',
      };
    },
    isTokenValid() {
      if (!this.auth.token || !this.auth.tokenExpiry) return false;
      console.log(Date.now() / 1000, 'Date.now() / 1000')
      console.log(this.auth.tokenExpiry, 'this.auth.tokenExpiry')
      return Date.now() / 1000 > this.auth.tokenExpiry;
    },
    isRefreshTokenValid() {
      if (!this.auth.refresh_token || !this.auth.refreshTokenExpiry) return false;
      return Date.now() / 1000 < this.auth.refreshTokenExpiry;  // Divide entre 1000 para convertir a segundos
    }
  },
  persist: true,
});

export { userStore };
