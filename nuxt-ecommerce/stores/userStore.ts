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
  }),
  actions: {
    setDataUser(data: any) {
      this.datosUser.correo = data.email;
      this.datosUser.nombre = data.name;
      this.datosUser.username = data.preferred_username;
    },
  },
  persist: true,
});

export { userStore };
