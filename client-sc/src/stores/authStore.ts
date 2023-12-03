/**
 * @fileoverview authStore - pinia store for authentication
 * @see https://pinia.esm.dev/
 */

import { defineStore } from "pinia";
import AuthService from "../services/auth-service";

// get the user from local storage
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

/**
 * @function useAuthStore
 */
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: user,
    status: { loggedIn: !!user },
  }),
  actions: {
    /**
     * @description login user and set user in state and local storage if successful login
     * @throws {Error} - error from AuthService.login
     * @param userData
     */
    login: async function (userData: { username: string; password: string }) {
      try {
        const user = await AuthService.login(userData);
        this.user = user;
        this.status.loggedIn = true;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        this.logout();
        throw error;
      }
    },
    /**
     * @description register user
     * @throws {Error} - error from AuthService.register
     * @param userData
     */
    register: async function (userData: {
      username: string;
      email: string;
      password: string;
    }) {
      try {
        const response = await AuthService.register(userData);
        return response.data.message;
      } catch (error) {
        throw error;
      }
    },
    /**
     * @description logout user and remove user from state and local storage
     */
    logout: function () {
      AuthService.logout();
      this.user = null;
      this.status.loggedIn = false;
      localStorage.removeItem("user");
    },
  },
});
