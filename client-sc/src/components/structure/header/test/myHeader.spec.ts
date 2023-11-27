import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import MyHeader from "../MyHeader.vue";

describe("MyFooter", () => {
  let wrapper: any;

  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(() => {
    wrapper = mount(MyHeader, {
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
    expect(wrapper.find("header").exists()).toBe(true);
    expect(wrapper.find("#logo-staycold").exists()).toBe(true);
    expect(wrapper.find("nav").exists()).toBe(true);
    expect(wrapper.find("#auth-nav").exists()).toBe(true);
    expect(wrapper.find("#icon-burger").exists()).toBe(true);
    expect(wrapper.find("svg").exists()).toBe(true);
  });
});
