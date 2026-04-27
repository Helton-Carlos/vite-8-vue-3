import { render } from "@testing-library/vue";
import { describe, expect, test } from "vitest";
import BaseTitlePage from "../../components/base-title-page/BaseTitlePage.vue";

describe("BaseTitlePage.vue", () => {
  test("renders the button with default type", async () => {
    const titlePage = await render(BaseTitlePage);

    const title = titlePage.getByText('Dashboard')
    
    expect(title).toBeTruthy();
  });
});
