import { render } from "@testing-library/vue";
import { describe, expect, test } from "vitest";
import BaseDropdown from "../../components/base-dropdown/BaseDropdown.vue";

describe("BaseDropdown.vue", () => {
  test("renders the dropdown with default type", async () => {
    const dropdown = await render(BaseDropdown, {
      props: {
        title: "Meu dropdown",
        itens: [
          {
            path: "dashboard",
            name: "dashboard",
          },
        ],
      },
    });

    expect(dropdown).toBeTruthy();
  });
});
