<template>
  <div>
    <h1>Bienvenido a Nuxt {{username}}</h1>
  </div>
</template>

<script setup lang="ts">
import {userStore} from "~/stores/userStore";
import {onMounted,ref} from "vue";

const useUserStore = userStore();
const username = ref(useUserStore.datosUser.username || '')


</script>
