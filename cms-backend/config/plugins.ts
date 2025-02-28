module.exports = ({ env }) => ({
  settings: {
    i18n: {
      defaultLocale: 'es', // Change 'es' to your desired language
    },
  },
  'users-permissions': {
    config: {
      providers: {
        keycloak: {
          clientId: env('KEYCLOAK_CLIENT_ID'),
          clientSecret: env('KEYCLOAK_CLIENT_SECRET'),
          realm: env('KEYCLOAK_REALM'),
          authUrl: env('KEYCLOAK_AUTH_URL'),
          accessTokenUrl: env('KEYCLOAK_ACCESS_TOKEN_URL'),
          userInfoUrl: env('KEYCLOAK_USER_INFO_URL'),
        },
      },
    },
  },
});
