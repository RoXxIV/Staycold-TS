/**
 * @fileoverview create auth guards for the router
 */
import { createPinia, type Pinia } from "pinia";
import { useAuthStore } from "@/stores/authStore";

/**
 * @class AuthGuards
 * @description create auth guards for the router
 * @param {Pinia} pinia - pinia instance
 */
class AuthGuards {
  private pinia: Pinia;

  constructor(pinia: Pinia) {
    this.pinia = pinia;
    // bind the redirectLoggedInUser method to the class
    this.redirectLoggedInUser = this.redirectLoggedInUser.bind(this);
  }

  /**
   *@description Get the auth store and check if the user is logged in
   * if the user is logged in redirect to home page
   */
  public redirectLoggedInUser(to: any, from: any, next: any) {
    // Get the auth store and check if the user is logged in
    const authStore = useAuthStore(this.pinia);
    if (authStore.status.loggedIn) {
      next({ name: "home" });
    } else {
      next();
    }
  }
}

// create pinia instance, authGuards instance and export it
const pinia = createPinia();
const authGuards = new AuthGuards(pinia);
export default authGuards;
