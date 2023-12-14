import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import Hero from "../Hero.vue";

describe("Hero section", () => {
  let wrapper: any;
  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(() => {
    wrapper = mount(Hero, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
  });

  it("renders correctly", async () => {
    const wrapper = mount(Hero);

    expect(wrapper.find("#hero-intro").exists()).toBe(true);
    expect(wrapper.find("h2").exists()).toBe(true);
    expect(wrapper.find("p").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("#hero-img").exists()).toBe(true);
    expect(wrapper.find("img").exists()).toBe(true);
  });
});
