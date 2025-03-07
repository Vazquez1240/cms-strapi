<template>
  <div v-if="matenimiento" class="flex w-full h-[100vh] justify-center items-center">
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
import {indexStore} from "~/stores/indexStore";

const { $backedstrapi } = useNuxtApp();
const matenimiento = ref(false)
const data = ref([])
const useIndexStore = indexStore()

onMounted(async () => {
  try {
    const [configResponse, productosResponse] = await Promise.all([
      $backedstrapi.get('/configuracions?populate[foooter][populate]=*&populate[carousel][populate]=*&populate[colores][populate]=*'),
      $backedstrapi.get('/productos?populate=*')
    ]);

    if (configResponse.status === 200) {
      data.value = configResponse.data?.data[0];
      matenimiento.value = configResponse.data?.data[0]?.mantenimiento;
      useIndexStore.setDataCarousel(configResponse.data?.data[0]?.carousel);
      useIndexStore.setDataConfiguracion(configResponse.data?.data[0]);
    }

    if (productosResponse.status === 200) {
      useIndexStore.setDataProductos(productosResponse.data?.data)
    }

    useIndexStore.setDataCargando(false)
  } catch (error) {
    useIndexStore.setDataCargando(false)
  }
});

</script>
