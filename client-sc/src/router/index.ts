import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import authGuards from "@/router/guards/auth.guards";

/** Routes */
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ContactFormView from "@/views/ContactFormView.vue";
import BreathView from "@/views/BreathView.vue";
/** Baths */
import AllBathView from "@/views/BathView/AllBathsView.vue";
import BathDetailsView from "@/views/BathView/BathDetailsView.vue";
/** Auth */
import LoginView from "@/views/AuthView/LoginView.vue";
import RegisterView from "@/views/AuthView/RegisterView.vue";
import ConfirmMailView from "@/views/AuthView/ConfirmMailView.vue";
import ResetPasswordView from "@/views/AuthView/ResetPasswordView.vue";
import SetNewPasswordView from "@/views/AuthView/SetNewPasswordView.vue";
/** User */
import AddBath from "@/views/UserView/AddBath.vue";
import EditBath from "@/views/UserView/EditBath.vue";
import ProfileView from "@/views/UserView/ProfileView.vue";

const pinia = createPinia();
const AuthGuards = new authGuards(pinia);

const router = createRouter({
  scrollBehavior() {
    return { top: 0 };
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    /** Login Form  */
    {
      path: "/login",
      name: "login",
      beforeEnter: AuthGuards.redirectLoggedInUser, // redirect if user is logged in
      component: LoginView,
    },
    /** Register Form */
    {
      path: "/register",
      name: "Register",
      beforeEnter: AuthGuards.redirectLoggedInUser, // redirect if user is logged in
      component: RegisterView,
    },
    /** Profile */
    {
      path: "/profile",
      name: "profile",
      beforeEnter: AuthGuards.redirectAnonymousUser, // redirect if user isn't logged in
      component: ProfileView,
    },
    /** All Baths */
    {
      path: "/all-baths",
      name: "All-baths",
      component: AllBathView,
    },
    /** Bath details */
    {
      path: "/bath-details/:bathId",
      name: "Bath-details",
      component: BathDetailsView,
    },
    /** Add bath */
    {
      path: "/add-bath",
      name: "Add-bath",
      beforeEnter: AuthGuards.redirectAnonymousUser, // redirect if user isn't logged in
      component: AddBath,
    },
    /** Edit bath */
    {
      path: "/edit-bath/:bathId",
      name: "Edit-bath",
      beforeEnter: AuthGuards.redirectAnonymousUser, // redirect if user isn't logged in
      component: EditBath,
    },
    /** Confirmation user account view  */
    {
      path: "/confirm-mail-redirection/:confirmationCode",
      name: "Confirm-mail",
      beforeEnter: AuthGuards.redirectLoggedInUser, // redirect if user is logged in
      component: ConfirmMailView,
    },
    /** Reset password view  */
    {
      path: "/reset-password",
      name: "Reset-password",
      beforeEnter: AuthGuards.redirectLoggedInUser, // redirect if user is logged in
      component: ResetPasswordView,
    },
    /** Set new password view  */
    {
      path: "/set-new-password/:confirmationCode",
      name: "Set-new-password",
      beforeEnter: AuthGuards.redirectLoggedInUser, // redirect if user is logged in
      component: SetNewPasswordView,
    },
    /** Contact form view  */
    {
      path: "/contact-form",
      name: "Contact-form",
      component: ContactFormView,
    },
    /** Breath view  */
    {
      path: "/breath",
      name: "Breath",
      component: BreathView,
    },
    /** redirect incorrect routes to 404  */
    { path: "/:pathMatch(.*)*", name: "Not-found", component: NotFoundView },
  ],
});

export default router;
