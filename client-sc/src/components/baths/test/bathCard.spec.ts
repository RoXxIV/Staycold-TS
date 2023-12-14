import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import BathCard from "../BathCard.vue";

describe("MyFooter", () => {
  let wrapper: any;

  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(() => {
    wrapper = mount(BathCard, {
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
    expect(wrapper.find(".weather").exists()).toBe(true);
    expect(wrapper.find(".bath-username").exists()).toBe(true);
    expect(wrapper.find(".bath-date").exists()).toBe(true);
  });
});
