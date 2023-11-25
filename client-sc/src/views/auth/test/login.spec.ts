import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import { useAuthStore } from "@/stores/authStore";
import type { IAuthState } from "@/types/authStore";
import Login from "@/views/auth/Login.vue";
import HomeView from "@/views/HomeView.vue";
import Register from "@/views/auth/Register.vue";
import ResetPasswordView from "@/views/auth/ResetPasswordView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/register", name: "Register", component: Register },
    {
      path: "/reset-password",
      name: "Reset-password",
      component: ResetPasswordView,
    },
  ],
});

describe("Login", () => {
  let wrapper: any;
  let authStore: IAuthState;

  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
          router,
        ],
      },
    });

    authStore = useAuthStore();
  });

  it("renders the login form", () => {
    expect(wrapper.find("section").exists()).toBe(true);
    expect(wrapper.find("#form-container").exists()).toBe(true);
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("validates input fields and shows error messages", async () => {
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find("#username + .error-feedback").exists()).toBe(true);
    expect(wrapper.find("#password + .error-feedback").exists()).toBe(true);
  });

  it("renders the image correctly", () => {
    const image = wrapper.find("img");
    expect(image.exists()).toBe(true);
  });
});
