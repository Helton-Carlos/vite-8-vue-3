import { vi } from "vitest";

vi.mock("vue-router", () => ({
  useRoute: () => ({
    path: "/",
    name: "dashboard",
    params: {},
    query: {},
  }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));
