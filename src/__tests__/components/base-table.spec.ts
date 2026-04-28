import { render } from "@testing-library/vue";
import { describe, expect, test } from "vitest";
import BaseTable from "../../components/base-table/BaseTable.vue";

describe("BaseTable.vue", () => {
  test("renders the BaseTable with default type", async () => {
    const baseTable = await render(BaseTable, {
      props: {
        columns: [
          { name: "month", label: "Mês", width: 200 },
          { name: "number", label: "Número", width: 100 },
        ],
        rows: [
          { id: 1, month: "Janeiro", number: 1000 },
          { id: 2, month: "Fevereiro", number: 1500 },
        ],
      },
    });

    expect(baseTable).toBeTruthy();
  });
});
