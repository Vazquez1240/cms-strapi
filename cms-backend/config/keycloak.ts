module.exports = ({ env }) => ({
  clientId: env('KEYCLOAK_CLIENT_ID'),
  clientSecret: env('KEYCLOAK_CLIENT_SECRET'),
  realm: env('KEYCLOAK_REALM'),
  authEndpoint: env('KEYCLOAK_AUTH_URL'),
  accessTokenUrl: env('KEYCLOAK_ACCESS_TOKEN_URL'),
  userinfoEndpoint: env('KEYCLOAK_USERINFO_ENDPOINT'),
  tokenEndpoint: env('KEYCLOAK_ACCESS_TOKEN_URL'),
  redirectUri: env('KEYCLOAK_REDIRECT_URL'),
});
