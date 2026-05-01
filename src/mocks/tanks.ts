export type TankStatus = 'ativo' | 'manutenção' | 'vazio' | 'quarentena';

export interface Tank {
  id: number;
  name: string;
  type: 'escavado' | 'alvenaria' | 'tanque-rede' | 'raceway';
  volumeM3: number;
  speciesId: number;
  speciesName: string;
  fishCount: number;
  densityPerM3: number;
  status: TankStatus;
  lastCleaningDate: string;
  createdAt: string;
}

export const tanksList: Tank[] = [
  {
    id: 1,
    name: 'Tanque A1',
    type: 'escavado',
    volumeM3: 500,
    speciesId: 1,
    speciesName: 'Tilápia',
    fishCount: 2500,
    densityPerM3: 5,
    status: 'ativo',
    lastCleaningDate: '2026-04-15',
    createdAt: '2025-08-01',
  },
  {
    id: 2,
    name: 'Tanque A2',
    type: 'escavado',
    volumeM3: 500,
    speciesId: 1,
    speciesName: 'Tilápia',
    fishCount: 2300,
    densityPerM3: 4.6,
    status: 'ativo',
    lastCleaningDate: '2026-04-10',
    createdAt: '2025-08-01',
  },
  {
    id: 3,
    name: 'Tanque B1',
    type: 'alvenaria',
    volumeM3: 200,
    speciesId: 2,
    speciesName: 'Tambaqui',
    fishCount: 600,
    densityPerM3: 3,
    status: 'ativo',
    lastCleaningDate: '2026-04-20',
    createdAt: '2025-09-15',
  },
  {
    id: 4,
    name: 'Tanque B2',
    type: 'alvenaria',
    volumeM3: 200,
    speciesId: 3,
    speciesName: 'Pacu',
    fishCount: 500,
    densityPerM3: 2.5,
    status: 'manutenção',
    lastCleaningDate: '2026-03-28',
    createdAt: '2025-09-15',
  },
  {
    id: 5,
    name: 'Tanque-Rede C1',
    type: 'tanque-rede',
    volumeM3: 100,
    speciesId: 4,
    speciesName: 'Pintado',
    fishCount: 150,
    densityPerM3: 1.5,
    status: 'ativo',
    lastCleaningDate: '2026-04-22',
    createdAt: '2025-11-01',
  },
  {
    id: 6,
    name: 'Raceway D1',
    type: 'raceway',
    volumeM3: 300,
    speciesId: 6,
    speciesName: 'Pirarucu',
    fishCount: 50,
    densityPerM3: 0.17,
    status: 'ativo',
    lastCleaningDate: '2026-04-18',
    createdAt: '2026-01-10',
  },
  {
    id: 7,
    name: 'Tanque E1',
    type: 'escavado',
    volumeM3: 400,
    speciesId: 0,
    speciesName: '-',
    fishCount: 0,
    densityPerM3: 0,
    status: 'vazio',
    lastCleaningDate: '2026-04-25',
    createdAt: '2025-08-01',
  },
  {
    id: 8,
    name: 'Tanque F1',
    type: 'alvenaria',
    volumeM3: 150,
    speciesId: 1,
    speciesName: 'Tilápia',
    fishCount: 300,
    densityPerM3: 2,
    status: 'quarentena',
    lastCleaningDate: '2026-04-26',
    createdAt: '2026-02-01',
  },
];
