// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  compatibilityDate: "2025-02-22",
  colorMode: {
    preference: 'light'
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  runtimeConfig: {
    public: {
      /*  APIS DE KEYCLOACK */
      KEYCLOAK_CLIENT_ID: "strapicli",
      KEYCLOAK_REALM: "strapiTest",
      KEYCLOAK_CLIENT_SECRET: "vp7OZ6XYta4EK4nSRoKIvNLeFffqNyhZ",
      KEYCLOAK_AUTH_URL: "https://keycloack.nexosoftdev.com/realms/strapiTest/protocol/openid-connect/auth",
      KEYCLOAK_ACCESS_TOKEN_URL: "https://keycloack.nexosoftdev.com/realms/strapiTest/protocol/openid-connect/token",
      KEYCLOAK_USER_INFO_URL: "https://keycloack.nexosoftdev.com/realms/strapiTest/protocol/openid-connect/userinfo",

      /*  APIS DE DISCORD  */


      /*  APIS DE STRAPI  */
      STRAPI_USERS_EXISTING: "http://localhost:1337/api/users?",
      STRAPI_USERS_REGISTER: "http://localhost:1337/api/auth/local/register",

    }
  }
})
