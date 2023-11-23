/**
 * @fileoverview Banner component unit test
 */
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Banner from "../Banner.vue";

vi.useFakeTimers(); // Use fake timers

/**
 * @description check if the banner component renders correctly and if thee timers work as expected
 */
describe("Banner", () => {
  it("renders correctly", async () => {
    const wrapper = mount(Banner);

    // check if the h1 tag exists
    expect(wrapper.find("h1").exists()).toBe(true);

    // advance timers by 3.6 seconds then check if the text has changed
    vi.advanceTimersByTime(3600);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Boostez votre système cardiovasculaire");

    // advance timers by 1.2 seconds then check that the text has returned to its original state
    vi.advanceTimersByTime(1200);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Boostez votre");
  });
});
