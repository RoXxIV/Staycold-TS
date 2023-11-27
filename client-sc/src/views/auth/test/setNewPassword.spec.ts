import { describe, vi, it, expect, beforeEach, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import SetNewPasswordView from "../SetNewPasswordView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/login", name: "login", component: LoginView },
    {
      path: "/set-new-password/:confirmationCode",
      name: "Set-new-password",
      component: SetNewPasswordView,
    },
  ],
});

describe("SetNewPassword", () => {
  let wrapper: any;
  //let authStore: IAuthState;

  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(async () => {
    router.push("/set-new-password/:confirmationCode");
    await router.isReady();
    wrapper = mount(SetNewPasswordView, {
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

    //authStore = useAuthStore();
  });

  it("renders the form", () => {
    expect(wrapper.find("section").exists()).toBe(true);
    expect(wrapper.find("section > div:first-child").exists()).toBe(true);
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("validates input fields and shows error messages", async () => {
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find("#password + .error-feedback").exists()).toBe(true);
    expect(wrapper.find("#confirmPassword + .error-feedback").exists()).toBe(
      true
    );
  });
});
