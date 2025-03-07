import { defineStore } from 'pinia';

const indexStore = defineStore('indexStore', {
  state: () => ({
    cargando: true,
    carousel: [],
    productos: [],
    configuracion: []
  }),
  actions: {
    setDataCargando(status: boolean) {
      this.cargando = status;
    },
    setDataCarousel(data: any) {
      this.carousel = data;
    },
    setDataProductos(data: any) {
      this.productos = [...data];
    },
    setDataConfiguracion(data: any) {
      this.configuracion = data;
    }
  },
  persist: true
})

export { indexStore }
