/**
 * @fileoverview auth header for http requests with jwt token
 */

/**
 * @function authHeader
 * @description returns the authorization header with the jwt token
 * @returns {object} - JSON object with the jwt token
 */
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user") as string);

  if (user && user.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` };
  } else {
    return {};
  }
}
