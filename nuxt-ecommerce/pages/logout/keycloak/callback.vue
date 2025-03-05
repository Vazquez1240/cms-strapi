<template>
  <p> Ya cerraste sesion... </p>
</template>

<script setup lang="ts">
import {userStore} from "~/stores/userStore";
import {onMounted} from "vue";

onMounted(() => {
  const router = useRouter();
  const useUserStore = userStore();
  useUserStore.clearAuth();

  router.push('/')
})

</script>

