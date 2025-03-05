import { Context } from "koa";
import axios from "axios";

const keycloakController = {
  async login(ctx: Context) {
    // FUNCION PARA REDIRIGIR A KEYCLOAK
    ctx.redirect(
      `${process.env.KEYCLOAK_AUTH_SESION}auth?client_id=${process.env.KEYCLOAK_CLIENT_ID}&redirect_uri=${process.env.KEYCLOAK_REDIRECT_URL}&scope=openid email profile&response_type=code`
    );
  },
  async logout(ctx: Context) {
    try {
      const refreshToken = ctx.request.query.refresh_token as string | undefined;

      if (!refreshToken) {
        ctx.throw(400, "Falta el refresh_token");
      }

      const params = new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
        refresh_token: refreshToken,
      });

      await axios.post(process.env.KEYCLOAK_LOGOUT_URL!, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });



      ctx.redirect(`${process.env.URL_REDIRECT_FRONTEND_LOGOUT}`);
    } catch (error) {
      console.error("Error en logout:", error);
      ctx.throw(500, "Error en el logout de Keycloak");
    }
  },
  async callback(ctx: Context) {
    try {
      const code = ctx.request.query.code as string | undefined;

      /**
       * CREAMOS LOS PARAMETROS PARA LA PETICION QUE NOS DEVOLVERA EL TOKEN DE KEYCLOAK
        **/
      const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
        redirect_uri: process.env.KEYCLOAK_REDIRECT_URL!,
        code: code,
      });

      /*
      *
      * PETICION PARA OBTENER EL TOKEN DE KEYCLOAK
      *  */
      const response = await axios.post(process.env.KEYCLOAK_ACCESS_TOKEN_URL!, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      /**
       * PETICION PARA TRAER LA INFORMACION DEL USUARIO (YA CON EL TOKEN QUE NOS DEVOLVIO KEYCLOAK
       * */
      const userInfo = await axios.get(process.env.KEYCLOAK_USERINFO_ENDPOINT, {
        headers: { Authorization: `Bearer ${response.data.access_token}` },
      });

      /**
       *
       * VERIFICAMOS SI EL USUARIO YA TIENE UN CORREO ASOCIADO EN STRAPI
       *
       * **/
      const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { email: userInfo.data.email },
      });

      /**
       SI NO TIENE UN USUARIO SE LO CREAMOS EN STRAPI CON LOS DATOS QUE YA OBTUVIMOS DE KEYCLOAK
       * **/
      if (!existingUser) {
        const newUser = await strapi.db.query('plugin::users-permissions.user').create({
          data: {
            username: userInfo.data.preferred_username || userInfo.data.email.split('@')[0],
            email: userInfo.data.email,
            password: userInfo.data.sub,
            provider: 'keycloak',
            confirmed: true
          },
        });

        /**
         * FINALMENTE REDIRECCIONAMOS AL USUARIO AL FRONTEND PARA QUE EL FRONTEND RECIBA TODA LA DATA Y PUEDA GUARDAR EL
         * USUARIO
         * **/
        ctx.redirect(`${process.env.URL_REDIRECT_FRONTEND}?access_token=${response.data.access_token}&refresh_token=${response.data.refresh_token}&expires_in=${response.data.expires_in}&refresh_expires_in=${response.data.refresh_expires_in}`);
      }

      /**
       * FINALMENTE REDIRECCIONAMOS AL USUARIO AL FRONTEND PARA QUE EL FRONTEND RECIBA TODA LA DATA Y PUEDA GUARDAR EL
       * USUARIO
       * **/
      ctx.redirect(`${process.env.URL_REDIRECT_FRONTEND}?access_token=${response.data.access_token}&refresh_token=${response.data.refresh_token}&expires_in=${response.data.expires_in}&refresh_expires_in=${response.data.refresh_expires_in}`);
    } catch (error) {
      console.error("Error en callback:", error);
      ctx.throw(500, "Error en el callback de Keycloak");
    }
  },
};

export default keycloakController;
