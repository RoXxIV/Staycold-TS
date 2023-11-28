import { describe, vi, it, expect, beforeEach, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "../NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/:pathMatch(.*)*",
      name: "Not-found",
      component: NotFoundView,
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
    wrapper = mount(NotFoundView, {
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

  it("renders correctly", () => {
    expect(wrapper.find(".not-found-section").exists()).toBe(true);
    expect(wrapper.find("h1").exists()).toBe(true);
  });
});
