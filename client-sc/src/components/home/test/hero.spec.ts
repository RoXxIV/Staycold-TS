/**
 * @fileoverview Banner component unit test
 */
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Hero from "../Hero.vue";

/**
 * @description check if the Hero section render correctly
 */
describe("Hero section", () => {
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
