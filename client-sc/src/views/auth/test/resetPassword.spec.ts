import { describe, vi, it, expect, beforeEach, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import ResetPasswordView from "../ResetPasswordView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/login", name: "login", component: LoginView },
    {
      path: "/reset-password",
      name: "Reset-password",
      component: ResetPasswordView,
    },
  ],
});

describe("ResetPasswordView", () => {
  let wrapper: any;
  //let authStore: IAuthState;

  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(() => {
    wrapper = mount(ResetPasswordView, {
      global: {
        config: {
          compilerOptions: {
            isCustomElement: (tag) => tag === "vue3-lottie",
          },
        },
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
          router,
        ],
      },
    });
  });

  it("renders the form", () => {
    expect(wrapper.find("section").exists()).toBe(true);
    expect(wrapper.find("section > div:first-child").exists()).toBe(true);
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("validates input fields and shows error messages", async () => {
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find("#email + .error-feedback").exists()).toBe(true);
    expect(wrapper.find("#emailConfirmation + .error-feedback").exists()).toBe(
      true
    );
  });
});
