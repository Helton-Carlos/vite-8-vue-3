import { render } from "@testing-library/vue";
import { describe, expect, test } from "vitest";
import Alimentacao from "../../view/Alimentacao.vue";

describe("Alimentacao.vue", () => {
  test("renders the page Alimentos", async () => {
    const wrapper = await render(Alimentacao);

    expect(wrapper).toBeTruthy();
  });

  test("renders the page with title Alimentos", async () => {
    const wrapper = await render(Alimentacao);

    const element = wrapper.findAllByAltText("Alimentos");

    expect(element).toBeTruthy();
  });
});
