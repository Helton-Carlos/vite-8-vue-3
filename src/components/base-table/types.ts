export interface TableColumn {
  name: string;
  label: string;
  width?: number;
}

export type TableRow = Record<string, unknown>;

export type TankStatus = 'ativo' | 'manutenção';

export interface TankRow {
  id: number;
  tankName: string;
  speciesName: string;
  fishCount: number;
  status: TankStatus;
}
