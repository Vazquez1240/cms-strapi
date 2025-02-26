<template>
  <div class="w-full flex flex-col justify-center items-center">
    <p style="font-size: 1.5rem">Lo sentimos nos encontramos en mantenimiento :(</p>
    <div class="gear">
      ⚙️
    </div>
    <p style="font-size: 1rem">Intente en ingresar en otro momento</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.gear {
  font-size: 80px;
  animation: spin 2s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
