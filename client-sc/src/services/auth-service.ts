/**
 * @fileoverview auth service for login, register, logout, confirm user, reset password
 */
import http from "../http-common";

class AuthService {
  /**
   * @description login user
   * @param user { username, password }
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
   * @param user { username, email, password }
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

  /**
   * @description send email to user to reset password
   * @param email
   */
  resetPasswordEmail(email: string) {
    return http.post("/auth/email-reset-password", { email });
  }

  /**
   * @description reset user password
   * @param password
   * @param confirmationCode
   */
  resetPassword(password: string, confirmationCode: string) {
    return http.post("/auth/reset-password", { password, confirmationCode });
  }
}

export default new AuthService();
