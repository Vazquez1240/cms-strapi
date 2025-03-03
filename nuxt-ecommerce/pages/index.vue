<template>
  <div>
    <h1>Bienvenido a Nuxt {{username}}</h1>
    <p>Fecha: {{fechaExpiracion}}</p>
    <p>Proveedor: {{provider}}</p>
  </div>
</template>

<script setup lang="ts">
import {userStore} from "~/stores/userStore";
import {onMounted,ref} from "vue";

const useUserStore = userStore();
const username = ref(useUserStore.datosUser.username || '')
const fechaExpiracion = ref(useUserStore.auth.tokenExpiry || 'No tenemos token de expiracion');
const provider = ref(useUserStore.auth.provider || 'No tenemos proveedor de inicion de sesion')


</script>
