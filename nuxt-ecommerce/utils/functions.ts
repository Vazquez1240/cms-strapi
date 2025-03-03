/*
Tokens

- Funcion para poder decodificar los tokens recibidos por los diferentes providers de strapi
*/

export default  function DecodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch (e) {
    console.error("Error al decodificar el token:", e);
    return {};
  }
}
