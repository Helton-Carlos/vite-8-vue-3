import type { TableColumn, TankRow } from '../components/base-table/types';

export const tableColumns: TableColumn[] = [
  { name: 'tankName', label: 'Tanque' },
  { name: 'speciesName', label: 'Espécie' },
  { name: 'fishCount', label: 'Peixes' },
  { name: 'status', label: 'Status' },
];

export const tableRows: TankRow[] = [
  {
    id: 1,
    tankName: 'Tanque A1',
    speciesName: 'Tilápia',
    fishCount: 2500,
    status: 'ativo',
  },
  {
    id: 2,
    tankName: 'Tanque A2',
    speciesName: 'Tilápia',
    fishCount: 2300,
    status: 'ativo',
  },
  {
    id: 3,
    tankName: 'Tanque B1',
    speciesName: 'Tambaqui',
    fishCount: 600,
    status: 'ativo',
  },
  {
    id: 4,
    tankName: 'Tanque B2',
    speciesName: 'Pacu',
    fishCount: 500,
    status: 'manutenção',
  },
  {
    id: 5,
    tankName: 'Tanque-Rede C1',
    speciesName: 'Pintado',
    fishCount: 150,
    status: 'ativo',
  },
  {
    id: 6,
    tankName: 'Raceway D1',
    speciesName: 'Pirarucu',
    fishCount: 50,
    status: 'ativo',
  },
];
