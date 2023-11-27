import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BannerLandscape from "../BannerLandscape.vue";

describe("Hero section", () => {
  it("renders correctly", async () => {
    const wrapper = mount(BannerLandscape);

    expect(wrapper.find("#banner-landscape").exists()).toBe(true);
  });
});
