<template>
  <div class="flex items-center justify-center h-screen">
    <p v-if="loading">Autenticando...</p>
    <p v-else>Redirigiendo...</p>
  </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { userStore } from "~/stores/userStore";
import DecodeJWT from "~/utils/functions";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const loading = ref(true);
const useUserStore = userStore()

onMounted(async () => {
  const accessToken = route.query.access_token as string;
  const refreshToken = route.query.refresh_token as string;
  const expiresInToken = Number(route.query.expires_in) || 604800;
  const expireInRefresh = Number(route.query.refresh_expires_in) || 604800;

  console.log(DecodeJWT(accessToken));

  try {
    const userResponse = await axios.get(config.public.KEYCLOAK_USER_INFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log(userResponse.data.email, 'userResponse.data.email')

    useUserStore.setDataAuthToken(accessToken, refreshToken, expiresInToken, expireInRefresh, 'keycloack');
    useUserStore.setDataUsername(userResponse.data.preferred_username);
    useUserStore.setDataNombre(userResponse.data.name);
    useUserStore.setDataEmail(userResponse.data.email);

    router.push("/");
  } catch (error) {
    console.error("Error en el proceso de autenticación:", error);
    router.push("/");
  }
});
</script>
