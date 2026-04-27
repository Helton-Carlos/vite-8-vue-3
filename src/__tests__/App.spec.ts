import { render } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { describe, expect, test } from "vitest";
import App from "../App.vue";

describe("App.vue", () => {
  test("renders the app with default type", async () => {
    const wrapper = await render(App, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
        mocks: {
          $route: { name: "dashboard" },
        },
        stubs: ["router-link", "router-view"],
      },
    });

    expect(wrapper).toBeTruthy();
  });
});
