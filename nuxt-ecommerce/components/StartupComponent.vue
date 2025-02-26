<template>
  <div class="flex h-[50vh] w-full items-center justify-center">
    <UCarousel
        v-slot="{ item }"
        :items="props.productos"
        :ui="{ item: 'w-full' }"
        class="rounded-lg overflow-hidden"
        indicators
    >
      <div class="h-full w-full flex items-center justify-center">
        <img :src="'http://localhost:1337'+item?.ImagenProducto[0]?.url" class="w-full h-full object-cover" draggable="false">
      </div>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";

const props = defineProps({
  productos: Array
});

watch(() => props.productos, (newValue) => {
  console.log(newValue, 'nuevos productos');
});
</script>
