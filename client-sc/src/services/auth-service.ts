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
   * @description logout user
   */
  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
