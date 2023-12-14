import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import RecentBaths from "../RecentBaths.vue";

describe("MyFooter", () => {
  let wrapper: any;

  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(() => {
    wrapper = mount(RecentBaths, {
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
    expect(wrapper.find(".section-recent-baths").exists()).toBe(true);
    expect(wrapper.find(".cards-list").exists()).toBe(true);
    expect(wrapper.find("#recent-baths-link").exists()).toBe(true);
  });
});
