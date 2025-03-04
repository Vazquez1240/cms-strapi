<template>
  <header class="h-[80px] flex justify-center items-center p-4">
    <div class="w-full flex justify-end gap-4">
      <UButton color="white" variant="outline" target="Carrito">
        <UIcon name="mdi:menu" class="w-5 h-5" />
      </UButton>
    </div>
  </header>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

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
