// plugins/colors.client.ts
export default defineNuxtPlugin({
  name: 'ui-colors',
  enforce: 'post',
  setup() {
    const useIndexStore = indexStore();

    watch(() => useIndexStore.configuracion?.colores, (colores) => {
      if (colores && colores.length > 0) {
        document.documentElement.style.setProperty('--color-primary', colores[0]?.color_primario || '#c23f23');

        // Actualizar la configuración de UI de Nuxt
        const appConfig = useAppConfig();
        if (!appConfig.ui) appConfig.ui = {};
        if (!appConfig.ui.colors) appConfig.ui.colors = {};
        appConfig.ui.colors[0] = colores[0]?.color_primario || '#c23f23';
      }
    }, { immediate: true, deep: true });
  }
})
