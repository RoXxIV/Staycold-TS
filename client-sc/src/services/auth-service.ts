/**
 * @fileoverview auth service
 */
import http from "../http-common";

class AuthService {
  /**
   * @description login user
   * @param user
   * @returns
   */
  login(user: { username: string; password: string }) {
    return http
      .post("/auth/signin", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  /**
   * @description register user
   * @param user
   * @returns
   */
  register(user: { username: string; email: string; password: string }) {
    return http.post("/auth/signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
  /**
   * @description logout user
   */
  logout() {
    localStorage.removeItem("user");
  }

  /**
   * @description confirm user email address with code sent to email
   * @param code
   * @returns
   */
  confirmUser(confirmationCode: string) {
    return http.post(`/auth/verify/${confirmationCode}`);
  }
}

export default new AuthService();
