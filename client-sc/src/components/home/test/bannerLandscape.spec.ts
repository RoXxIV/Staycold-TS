/**
 * @fileoverview Banner component unit test
 */
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BannerLandscape from "../BannerLandscape.vue";

/**
 * @description check if the Hero section render correctly
 */
describe("Hero section", () => {
  it("renders correctly", async () => {
    const wrapper = mount(BannerLandscape);

    expect(wrapper.find("#banner-landscape").exists()).toBe(true);
  });
});
