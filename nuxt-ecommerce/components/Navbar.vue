<template>
  <header class="h-[80px] flex justify-center items-center p-4">
    <div class="w-full flex justify-end gap-4">
      <UDropdown v-model:open="open" :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton color="white" trailing-icon="mdi:menu" />
      </UDropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref,watch } from "vue"
const config = useRuntimeConfig();
import {userStore} from "~/stores/userStore";

const open = ref(false)
const useUserStore = userStore()

const items = ref([
  [{
    label: useUserStore.auth.token !== '' ? 'Cerrar sesion' : 'Iniciar Sesion',
    click: () => {
      useUserStore.auth.token === '' ? loginKeycloak() : () => {
        useUserStore.clearAuth()
        window.location.reload()
      }
    }
  }]
])

// Redirige a Keycloak para iniciar sesión
const loginDiscord = () => {
  const authUrl = `http://localhost:1337/api/connect/discord`;
  window.location.href = authUrl;
};

const loginKeycloak = () => {
  const authUrl = `http://localhost:1337/api/keycloak/endpoint/login`;
  window.location.href = authUrl;
};

</script>
