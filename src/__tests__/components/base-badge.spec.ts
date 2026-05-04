import { render } from "@testing-library/vue";
import { describe, expect, test } from "vitest";
import BaseBadge from "../../components/base-badge/BaseBadge.vue";

describe("BaseBadge.vue", () => {
  test("renders the badge with props", async () => {
    const badge = await render(BaseBadge, {
      props: {
        variant: "primary",
        size: "md",
        outline: true,
      },
    });

    expect(badge).toBeTruthy();
  });

  test("renders the badge with class outline", async () => {
    const badge = render(BaseBadge, {
      slots: { default: "My Badge" },
      props: {
        variant: "primary",
        size: "md",
        outline: true,
      },
    });

    const element = badge.getByText("My Badge");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("badge-outline");
  });
});
