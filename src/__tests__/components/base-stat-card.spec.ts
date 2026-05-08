import { describe, expect, test } from "vitest";
import BaseStatCard from "../../components/base-stat-card/BaseStatCard.vue";
import { renderComponent } from "../helpers/render-utils";

describe("BaseStatCard.vue", () => {
  test("renders the BaseStatCard with default type", async () => {
    const baseStatCard = renderComponent(BaseStatCard, {
      props: {
        title: "Test Stat Card",
        value: "123",
        icon: "mdi:chart-bar",
        color: "success",
        description: "This is a test stat card",
      },
    });

    expect(baseStatCard).toBeTruthy();
  });

  test("renders the BaseStatCard with slots", async () => {
    const baseStatCard = renderComponent(BaseStatCard, {
      props: {
        title: "Test Stat Card",
        value: "123",
        icon: "mdi:chart-bar",
        color: "success",
        description: "This is a test stat card",
      },
    });

    const title = baseStatCard.getByText("Test Stat Card");
    const value = baseStatCard.getByText("123");
    const description = baseStatCard.getByText("This is a test stat card");

    expect(title).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
