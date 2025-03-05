<template>
  <div v-if="!matenimiento" class="flex w-full h-[100vh] justify-center items-center">
    <Mantenimiento />
  </div>

  <!-- Por si esta en mantenimiento  -->
  <div v-else>
    <Navbar :data="data" />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import {onMounted,ref} from "vue";
import Navbar from "~/components/Navbar.vue";
import Mantenimiento from "~/components/Pages/Matenimiento.vue"

const { $backedstrapi } = useNuxtApp();
const matenimiento = ref(true)
const data = ref([])

onMounted(async () => {
  const response = await $backedstrapi.get('/configuracions?populate[foooter][populate]=*&populate[carousel][populate]=*&populate[colores][populate]')
  if(response.status === 200) {
    data.value = response.data?.data[0]
    matenimiento.value = response.data?.data[0]?.mantenimiento
  }

})
</script>
