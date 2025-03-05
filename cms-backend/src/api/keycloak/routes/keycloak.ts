export default {
  routes: [
    {
      method: "GET",
      path: "/keycloak/endpoint/callback",
      handler: "keycloak.callback",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/keycloak/endpoint/login",
      handler: "keycloak.login",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/keycloak/endpoint/logout",
      handler: "keycloak.logout",
      config: { auth: false },
    },
  ],
};
