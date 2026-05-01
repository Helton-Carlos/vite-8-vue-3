export interface Species {
  id: number;
  name: string;
  scientificName: string;
  idealTempMin: number;
  idealTempMax: number;
  idealPhMin: number;
  idealPhMax: number;
  growthTimeDays: number;
  avgWeightKg: number;
  feedType: string;
  status: 'ativo' | 'inativo';
}

export const speciesList: Species[] = [
  {
    id: 1,
    name: 'Tilápia',
    scientificName: 'Oreochromis niloticus',
    idealTempMin: 25,
    idealTempMax: 30,
    idealPhMin: 6.5,
    idealPhMax: 8.5,
    growthTimeDays: 180,
    avgWeightKg: 0.8,
    feedType: 'Ração extrusada 32%',
    status: 'ativo',
  },
  {
    id: 2,
    name: 'Tambaqui',
    scientificName: 'Colossoma macropomum',
    idealTempMin: 26,
    idealTempMax: 32,
    idealPhMin: 6.0,
    idealPhMax: 7.5,
    growthTimeDays: 240,
    avgWeightKg: 2.5,
    feedType: 'Ração extrusada 28%',
    status: 'ativo',
  },
  {
    id: 3,
    name: 'Pacu',
    scientificName: 'Piaractus mesopotamicus',
    idealTempMin: 24,
    idealTempMax: 30,
    idealPhMin: 6.5,
    idealPhMax: 7.5,
    growthTimeDays: 210,
    avgWeightKg: 1.8,
    feedType: 'Ração extrusada 28%',
    status: 'ativo',
  },
  {
    id: 4,
    name: 'Pintado',
    scientificName: 'Pseudoplatystoma corruscans',
    idealTempMin: 22,
    idealTempMax: 28,
    idealPhMin: 6.5,
    idealPhMax: 7.8,
    growthTimeDays: 365,
    avgWeightKg: 3.0,
    feedType: 'Ração carnívora 40%',
    status: 'ativo',
  },
  {
    id: 5,
    name: 'Carpa',
    scientificName: 'Cyprinus carpio',
    idealTempMin: 20,
    idealTempMax: 28,
    idealPhMin: 6.5,
    idealPhMax: 8.0,
    growthTimeDays: 300,
    avgWeightKg: 1.5,
    feedType: 'Ração extrusada 28%',
    status: 'inativo',
  },
  {
    id: 6,
    name: 'Pirarucu',
    scientificName: 'Arapaima gigas',
    idealTempMin: 26,
    idealTempMax: 32,
    idealPhMin: 6.0,
    idealPhMax: 7.0,
    growthTimeDays: 365,
    avgWeightKg: 10.0,
    feedType: 'Ração carnívora 45%',
    status: 'ativo',
  },
];
