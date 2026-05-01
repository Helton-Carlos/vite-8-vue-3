export interface TableColumn {
  name: string;
  label: string;
  width?: number;
}

export type TableRow = Record<string, unknown>;
