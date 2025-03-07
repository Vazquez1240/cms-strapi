<template>
  <div class="w-full h-full" v-if="useIndexStore.cargando">
    <Skeletone />
  </div>
  <div v-else class="w-full h-[85vh] pl-2 pr-2">
    <UCarousel
        v-slot="{ item }"
        :items="useIndexStore.carousel"
        :ui="{
      item: 'basis-full',
      indicators: {
        inactive: 'bg-gray-400 dark:bg-gray-800',
        active: `bg-[${appConfig.ui.colors[0]}]`
      }
    }"
        class="flex rounded-lg overflow-hidden w-full max-h-[85vh]"
        indicators
    >
        <img
            :src="'http://localhost:1337' + item?.imagen_carrusel[0]?.url"
            class="w-full max-h-full"
            draggable="false"
        >
    </UCarousel>

  </div>
</template>

<script setup lang="ts">
import Skeletone from "~/components/Pages/Index/Skeletone.vue";
import { indexStore } from "~/stores/indexStore";
import { computed, ref } from "vue";

const useIndexStore = indexStore();
const colorMode = useColorMode()
const appConfig = useAppConfig()

// Color primario desde la API o por defecto
const colorPrimario = computed(() => appConfig.ui.colors[0] || "#c23f23");

console.log(colorPrimario.value, 'colorPrimario');

// Índice activo del carrusel
const activeIndex = ref(0);
console.log("appconfig")
console.log("Color primario:", appConfig.ui.colors[0]);
console.log("Color primario:", appConfig.ui.primary);

</script>
