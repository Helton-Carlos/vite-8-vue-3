import { render } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { vi } from "vitest";

export function renderComponent(Component: any, options = {}) {
  return render(Component, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
      mocks: {
        $route: { path: "/", name: "dashboard" },
        $router: { push: vi.fn() },
      },
      stubs: {
        "router-link": { template: "<a><slot /></a>" },
        "router-view": true,
      },
    },
    ...options,
  });
}
