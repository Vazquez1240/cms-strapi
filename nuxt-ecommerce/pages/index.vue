<template>
  <div class="w-full h-full" v-if="!showContent">
    <Skeletone />
  </div>
  <div v-else>
   <p>hola</p>
  </div>
</template>

<script setup lang="ts">
import {userStore} from "~/stores/userStore";
import {onMounted,ref} from "vue";
import Skeletone from "~/components/Pages/Index/Skeletone.vue";

const useUserStore = userStore();
const username = ref(useUserStore.datosUser.username || '')
const fechaExpiracion = ref(useUserStore.auth.tokenExpiry || 'No tenemos token de expiracion');
const provider = ref(useUserStore.auth.provider || 'No tenemos proveedor de inicion de sesion')
const showContent = ref(false)


</script>
