export interface Harvest {
  id: number;
  tankId: number;
  tankName: string;
  speciesName: string;
  quantityFish: number;
  totalWeightKg: number;
  avgWeightKg: number;
  pricePerKg: number;
  totalRevenueRS: number;
  date: string;
  buyer: string;
  status: 'concluída' | 'agendada' | 'cancelada';
}

export const harvestRecords: Harvest[] = [
  {
    id: 1,
    tankId: 1,
    tankName: 'Tanque A1',
    speciesName: 'Tilápia',
    quantityFish: 800,
    totalWeightKg: 640,
    avgWeightKg: 0.8,
    pricePerKg: 18.5,
    totalRevenueRS: 11840,
    date: '2026-04-15',
    buyer: 'Frigorífico São Pedro',
    status: 'concluída',
  },
  {
    id: 2,
    tankId: 3,
    tankName: 'Tanque B1',
    speciesName: 'Tambaqui',
    quantityFish: 200,
    totalWeightKg: 500,
    avgWeightKg: 2.5,
    pricePerKg: 22.0,
    totalRevenueRS: 11000,
    date: '2026-03-20',
    buyer: 'Mercado Municipal',
    status: 'concluída',
  },
  {
    id: 3,
    tankId: 2,
    tankName: 'Tanque A2',
    speciesName: 'Tilápia',
    quantityFish: 1000,
    totalWeightKg: 750,
    avgWeightKg: 0.75,
    pricePerKg: 18.5,
    totalRevenueRS: 13875,
    date: '2026-05-10',
    buyer: 'Restaurante Sabor do Rio',
    status: 'agendada',
  },
  {
    id: 4,
    tankId: 5,
    tankName: 'Tanque-Rede C1',
    speciesName: 'Pintado',
    quantityFish: 50,
    totalWeightKg: 150,
    avgWeightKg: 3.0,
    pricePerKg: 35.0,
    totalRevenueRS: 5250,
    date: '2026-05-20',
    buyer: 'Peixaria Central',
    status: 'agendada',
  },
  {
    id: 5,
    tankId: 6,
    tankName: 'Raceway D1',
    speciesName: 'Pirarucu',
    quantityFish: 10,
    totalWeightKg: 100,
    avgWeightKg: 10.0,
    pricePerKg: 45.0,
    totalRevenueRS: 4500,
    date: '2026-02-28',
    buyer: 'Exportadora Amazônia',
    status: 'concluída',
  },
  {
    id: 6,
    tankId: 4,
    tankName: 'Tanque B2',
    speciesName: 'Pacu',
    quantityFish: 150,
    totalWeightKg: 270,
    avgWeightKg: 1.8,
    pricePerKg: 20.0,
    totalRevenueRS: 5400,
    date: '2026-01-15',
    buyer: 'Feira do Peixe',
    status: 'concluída',
  },
];

export const harvestByMonth = [
  { name: 'Out', pesoKg: 450, receitaRS: 8100 },
  { name: 'Nov', pesoKg: 620, receitaRS: 11160 },
  { name: 'Dez', pesoKg: 380, receitaRS: 7220 },
  { name: 'Jan', pesoKg: 270, receitaRS: 5400 },
  { name: 'Fev', pesoKg: 100, receitaRS: 4500 },
  { name: 'Mar', pesoKg: 500, receitaRS: 11000 },
  { name: 'Abr', pesoKg: 640, receitaRS: 11840 },
];
