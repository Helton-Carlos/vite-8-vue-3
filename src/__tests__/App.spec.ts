import { describe, expect, test } from "vitest";
import { renderComponent } from "./helpers/render-utils";
import App from "../App.vue";

describe("App.vue", () => {
  test("renders the app with default type", async () => {
    const wrapper = renderComponent(App);

    expect(wrapper).toBeTruthy();
  });
});
