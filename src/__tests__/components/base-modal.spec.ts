import { render } from "@testing-library/vue";
import { describe, expect, test } from "vitest";
import BaseModal from "../../components/base-modal/BaseModal.vue";

describe("BaseModal.vue", () => {
  test("renders the modal with props", async () => {
    const modal = await render(BaseModal, {
      props: {
        id: "test-modal",
        title: "Test Modal",
        size: "md",
      },
    });

    expect(modal).toBeTruthy();
  });

  test("renders the modal with class and size", async () => {
    const modal = render(BaseModal, {
      slots: { default: "My Modal" },
      props: {
        id: "test-modal",
        title: "Test Modal",
        size: "lg",
      },
    });

    const element = modal.getByText("My Modal");

    expect(element).toBeInTheDocument();
  });
});
