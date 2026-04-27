import { render } from "@testing-library/vue";
import { describe, expect, test } from "vitest";
import BaseButton from "../../components/base-button/BaseButton.vue";

describe("BaseButton.vue", () => {
  test("renders the button with default type", async () => {
    const button = await render(BaseButton, {
      props: {
        type: "button",
      },
    });

    expect(button).toBeTruthy();
  });

  test("renders the button with slots", async () => {
    const button = await render(BaseButton, {
      slots: {
        default: "Click me",
      },
    });

    expect(button.getByText("Click me")).toBeTruthy();
  });
});
