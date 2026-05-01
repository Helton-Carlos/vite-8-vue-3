export interface DashboardStats {
  totalTanks: number;
  activeTanks: number;
  totalFish: number;
  totalSpecies: number;
  alertsCount: number;
  criticalCount: number;
  feedTodayKg: number;
  revenueMonthRS: number;
}

export const dashboardStats: DashboardStats = {
  totalTanks: 8,
  activeTanks: 5,
  totalFish: 6400,
  totalSpecies: 5,
  alertsCount: 2,
  criticalCount: 1,
  feedTodayKg: 124,
  revenueMonthRS: 11840,
};

export const mortalityByMonth = [
  { name: 'Out', mortalidade: 12, taxa: 0.2 },
  { name: 'Nov', mortalidade: 8, taxa: 0.13 },
  { name: 'Dez', mortalidade: 15, taxa: 0.24 },
  { name: 'Jan', mortalidade: 22, taxa: 0.35 },
  { name: 'Fev', mortalidade: 10, taxa: 0.16 },
  { name: 'Mar', mortalidade: 7, taxa: 0.11 },
  { name: 'Abr', mortalidade: 5, taxa: 0.08 },
];

export const growthByMonth = [
  { name: 'Out', pesoMedio: 0.15, meta: 0.18 },
  { name: 'Nov', pesoMedio: 0.25, meta: 0.28 },
  { name: 'Dez', pesoMedio: 0.35, meta: 0.38 },
  { name: 'Jan', pesoMedio: 0.48, meta: 0.48 },
  { name: 'Fev', pesoMedio: 0.58, meta: 0.58 },
  { name: 'Mar', pesoMedio: 0.68, meta: 0.68 },
  { name: 'Abr', pesoMedio: 0.78, meta: 0.78 },
];

export const recentActivities = [
  {
    id: 1,
    type: 'feeding',
    message: 'Alimentação realizada no Tanque A1',
    time: '07:00',
    date: '2026-05-01',
  },
  {
    id: 2,
    type: 'water',
    message: 'Qualidade da água crítica no Raceway D1',
    time: '06:15',
    date: '2026-05-01',
  },
  {
    id: 3,
    type: 'harvest',
    message: 'Colheita agendada para Tanque A2',
    time: '09:00',
    date: '2026-05-01',
  },
  {
    id: 4,
    type: 'alert',
    message: 'Alerta de amônia no Tanque B1',
    time: '06:30',
    date: '2026-05-01',
  },
  {
    id: 5,
    type: 'maintenance',
    message: 'Manutenção concluída no Tanque B2',
    time: '14:00',
    date: '2026-04-30',
  },
  {
    id: 6,
    type: 'feeding',
    message: 'Alimentação realizada no Raceway D1',
    time: '08:30',
    date: '2026-04-30',
  },
];
