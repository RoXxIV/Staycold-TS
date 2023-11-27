import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import MobileNav from "../MobileNav.vue";

describe("MyFooter", () => {
  let wrapper: any;

  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(() => {
    wrapper = mount(MobileNav, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.find("#mobile-nav").exists()).toBe(true);
  });

  it("toggles theme on click", async () => {
    const toggleButton = wrapper.find("#toggle-theme-mobile");
    await toggleButton.trigger("click");
    expect(toggleButton.text()).toContain("Theme");
  });
});
