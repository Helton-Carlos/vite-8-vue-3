import { screen } from "@testing-library/vue";
import { describe, expect, test } from "vitest";
import BaseSide from "../../components/base-side/BaseSide.vue";
import { renderComponent } from "../helpers/render-utils";

describe("BaseSide.vue", () => {
  test("renders the BaseSide with default type", async () => {
    const sidebar = renderComponent(BaseSide);

    expect(sidebar).toBeTruthy();
  });

  test("renders the BaseSide with logout", async () => {
    renderComponent(BaseSide);

    const logoutButton = screen.getByText("Sair");
    expect(logoutButton).toBeDefined();
  });
});
