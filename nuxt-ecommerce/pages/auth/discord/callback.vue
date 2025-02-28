<template>
  <div class="flex items-center justify-center h-screen">
    <p v-if="loading">Autenticando...</p>
    <p v-else>Redirigiendo...</p>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const route = useRoute();
const router = useRouter();
const loading = ref(true);

onMounted(async () => {
  const accessToken = route.query.access_token as string;

  if (!accessToken) {
    router.push("/");
    return;
  }

  try {
    // 🔹 Paso 1: Obtener datos del usuario en Discord
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const discordUser = userResponse.data;
    console.log("Usuario en Discord:", discordUser);

    // 🔹 Paso 2: Buscar si el usuario ya existe en Strapi
    const existingUserResponse = await axios.get(
        `http://localhost:1337/api/users?filters[email][$eq]=${discordUser.email}`
    );

    let strapiUser;

    if (existingUserResponse.data.length > 0) {
      // 🔹 Usuario ya existe → Iniciar sesión en Strapi
      strapiUser = existingUserResponse.data[0];
      console.log("Usuario encontrado en Strapi:", strapiUser);
    } else {
      // 🔹 Usuario no existe → Crear en Strapi
      const registerResponse = await axios.post("http://localhost:1337/api/auth/local/register", {
        username: discordUser.username,
        email: discordUser.email ?? `${discordUser.id}@discord.com`, // Si no hay email, generar uno falso
        password: discordUser.id,
      });

      strapiUser = registerResponse.data.user;
      console.log("Usuario creado en Strapi:", strapiUser);
    }

    // 🔹 Guardar sesión en localStorage o Vuex/Pinia
    localStorage.setItem("user", JSON.stringify(strapiUser));

    // 🔹 Redirigir al usuario a la página principal
    router.push("/");
  } catch (error) {
    console.error("Error en el proceso de autenticación:", error);
    router.push("/");
  } finally {
    loading.value = false;
  }
});

</script>
