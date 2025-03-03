import {userStore} from "~/stores/userStore";
import {navigateTo} from "#app/composables/router";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', () => {
    checkAuthentication();
  });

  nuxtApp.hook('page:start', () => {
    checkAuthentication();
  });

  function checkAuthentication() {
    const useUserStore = userStore();

    if(useUserStore.auth.token && !useUserStore.isTokenValid()) {
      console.log('Cerrando la sesión mi pa');
      useUserStore.clearAuth();
      navigateTo('/')
    }
  }
})
