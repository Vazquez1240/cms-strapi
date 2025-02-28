<template>
  <div class="flex items-center justify-center h-screen">
    <p v-if="loading">Autenticando...</p>
    <p v-else>Redirigiendo...</p>
  </div>
</template>

<script setup lang="ts">
import axios from "axios"
import {userStore} from "~/stores/userStore";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const loading = ref(true);
const useUserStore = userStore()


onMounted(async () => {
  const accessToken = route.query.access_token as string;

  try {
    const userResponse = await axios.get(config.public.KEYCLOAK_USER_INFO_URL, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
    );

    console.log(userResponse.data, 'response')

    const responseUsersStrapi = await axios.get(config.public.STRAPI_USERS_EXISTING+`filters[email][$eq]=${userResponse.data.email}`);

    if (responseUsersStrapi.data.length === 0){
      const registerResponse = await axios.post(config.public.STRAPI_USERS_REGISTER, {
            username: userResponse.data.preferred_username || userResponse.data.email.split('@')[0],
            email: userResponse.data.email,
            password: userResponse.data.sub,
          }
      );
    }
    useUserStore.setDataUser(userResponse.data)
    router.push("/");
  } catch (error) {
    console.error("Error en el proceso de autenticación:", error);
    router.push("/");
  }
});
</script>
