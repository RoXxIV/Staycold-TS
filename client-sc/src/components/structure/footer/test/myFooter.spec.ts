import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MyFooter from "@/components/Structure/footer/MyFooter.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "home", component: HomeView }],
});

describe("MyFooter", () => {
  let wrapper: any;

  /**
   * Mount the component, create a mock store and mock router before each test.
   */
  beforeEach(() => {
    wrapper = mount(MyFooter, {
      global: {
        plugins: [router],
      },
    });
  });

  it("renders", () => {
    expect(wrapper.find("footer").exists()).toBe(true);
    expect(wrapper.find("#copyright-footer").exists()).toBe(true);
    expect(wrapper.find("#logo-footer").exists()).toBe(true);
    expect(wrapper.find("#contact-footer").exists()).toBe(true);
    expect(wrapper.find("#social-footer").exists()).toBe(true);
  });

  it("should open social links in a new tab", () => {
    const socialLinks = wrapper.findAll("#social-footer a");
    socialLinks.forEach((link: { attributes: (arg0: string) => any }) => {
      expect(link.attributes("target")).toBe("_blank");
      expect(link.attributes("rel")).toBe("noopener noreferrer");
    });
  });
});
