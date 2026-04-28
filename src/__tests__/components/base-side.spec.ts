import { render, screen } from "@testing-library/vue";
import { describe, expect, test } from "vitest";
import BaseSide from "../../components/base-side/BaseSide.vue";
import { createTestingPinia } from "@pinia/testing";
import { router } from "../../router";

describe("BaseSide.vue", () => {
  test("renders the BaseSide with default type", async () => {
    const sidebar = await render(BaseSide, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    expect(sidebar).toBeTruthy();
  });

  test("renders the BaseSide with logout", async () => {
    await render(BaseSide, {
      global: {
        plugins: [createTestingPinia({ stubActions: false }), router],
      },
    });

    const logoutButton = screen.getByText("Sair");

    expect(logoutButton).toBeDefined();
  });
});
