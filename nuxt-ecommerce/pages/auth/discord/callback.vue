<template>
  <div class="flex items-center justify-center h-screen">
    <p v-if="loading">Autenticando...</p>
    <p v-else>Redirigiendo...</p>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {userStore} from "~/stores/userStore";
import DecodeJWT from "~/utils/functions";

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const config = useRuntimeConfig();
const useUserStore = userStore()

onMounted(async () => {
  const accessToken = route.query.access_token as string;
  const refreshToken = route.query.refresh_token as string;
  const expiresIn = Number(route.query["raw[expires_in]"]) || 604800;

  console.log(route.query, 'query')

  try {
    const userResponse = await axios.get(config.public.DISCORD_API_USERS+'/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });


    const existingUserResponse = await axios.get(
        config.public.STRAPI_USERS_EXISTING+`?filters[email][$eq]=${userResponse.data.email}`
    );


    if (existingUserResponse.data.length === 0){
      /*   AQUI ES EN EL CASO QUE EL USUARIO NO EXISTA EN STRAPI LO VAMOS A CREAR  */
      const registerResponse = await axios.post("http://localhost:1337/api/auth/local/register", {
        username: discordUser.username,
        email: discordUser.email ?? `${discordUser.id}@discord.com`,
        password: discordUser.id,
      });
    }

    const exp = Math.floor(Date.now() / 1000) + expiresIn;

    useUserStore.setDataAuthToken(accessToken, refreshToken, exp, exp, 'discord')

    useUserStore.setDataUsername(userResponse.data.username);
    useUserStore.setDataNombre(userResponse.data.name);
    useUserStore.setDataEmail(userResponse.data.email);

    router.push("/");
  } catch (error) {
    console.error("Error en el proceso de autenticación:", error);
    router.push("/");
  } finally {
    loading.value = false;
  }
});

</script>
