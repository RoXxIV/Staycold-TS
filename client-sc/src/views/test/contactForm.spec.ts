import { describe, vi, it, expect, beforeEach, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import HomeView from "@/views/HomeView.vue";
import ContactFormView from "../ContactFormView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/contact-form",
      name: "Contact-form",
      component: ContactFormView,
    },
  ],
});

describe("SetNewPassword", () => {
  let wrapper: any;

  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(async () => {
    router.push("/set-new-password/:confirmationCode");
    await router.isReady();
    wrapper = mount(ContactFormView, {
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
    expect(wrapper.find(".contact-section").exists()).toBe(true);
    expect(wrapper.find(".social-networks").exists()).toBe(true);
    expect(wrapper.find(".contact-form-bloc").exists()).toBe(true);
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("validates input fields and shows error messages", async () => {
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find("#email + .error-feedback").exists()).toBe(true);
    expect(wrapper.find("#subject + .error-feedback").exists()).toBe(true);
    expect(wrapper.find("#commentary + .error-feedback").exists()).toBe(true);
  });
});
