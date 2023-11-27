import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import IconBurger from "../IconBurger.vue";

describe("MyFooter", () => {
  const wrapper = mount(IconBurger);

  it("renders correctly", () => {
    expect(wrapper.find("#btn-burger").exists()).toBe(true);
  });
});
