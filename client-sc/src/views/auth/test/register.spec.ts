import { describe, vi, it, expect, beforeEach, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import { useAuthStore } from "@/stores/authStore";
import type { IAuthState } from "@/types/authStore";
import Register from "../Register.vue";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/auth/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/login", name: "login", component: Login },
  ],
});

describe("Register", () => {
  let wrapper: any;
  let authStore: IAuthState;

  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(() => {
    wrapper = mount(Register, {
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

    authStore = useAuthStore();
  });

  it("renders the register form", () => {
    expect(wrapper.find("section").exists()).toBe(true);
    expect(wrapper.find("#bloc").exists()).toBe(true);
    expect(wrapper.find("#container-form").exists()).toBe(true);
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("validates input fields and shows error messages", async () => {
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find("#username + .error-feedback").exists()).toBe(true);
    expect(wrapper.find("#email + .error-feedback").exists()).toBe(true);
    expect(wrapper.find("#password + .error-feedback").exists()).toBe(true);
    expect(wrapper.find("#confirm-password + .error-feedback").exists()).toBe(
      true
    );
  });

  it("renders the image correctly", () => {
    const image = wrapper.find("#illustration");
    expect(image.exists()).toBe(true);
  });
});
