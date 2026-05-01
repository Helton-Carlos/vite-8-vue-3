export interface WaterQualityRecord {
  id: number;
  tankId: number;
  tankName: string;
  temperature: number;
  ph: number;
  dissolvedOxygen: number;
  ammonia: number;
  nitrite: number;
  transparency: number;
  date: string;
  time: string;
  status: 'normal' | 'alerta' | 'crítico';
}

export const waterQualityRecords: WaterQualityRecord[] = [
  {
    id: 1,
    tankId: 1,
    tankName: 'Tanque A1',
    temperature: 27.5,
    ph: 7.2,
    dissolvedOxygen: 5.8,
    ammonia: 0.02,
    nitrite: 0.01,
    transparency: 35,
    date: '2026-05-01',
    time: '06:00',
    status: 'normal',
  },
  {
    id: 2,
    tankId: 2,
    tankName: 'Tanque A2',
    temperature: 28.0,
    ph: 7.0,
    dissolvedOxygen: 5.5,
    ammonia: 0.03,
    nitrite: 0.02,
    transparency: 30,
    date: '2026-05-01',
    time: '06:00',
    status: 'normal',
  },
  {
    id: 3,
    tankId: 3,
    tankName: 'Tanque B1',
    temperature: 29.5,
    ph: 6.8,
    dissolvedOxygen: 4.2,
    ammonia: 0.08,
    nitrite: 0.05,
    transparency: 25,
    date: '2026-05-01',
    time: '06:00',
    status: 'alerta',
  },
  {
    id: 4,
    tankId: 5,
    tankName: 'Tanque-Rede C1',
    temperature: 24.5,
    ph: 7.5,
    dissolvedOxygen: 6.2,
    ammonia: 0.01,
    nitrite: 0.01,
    transparency: 40,
    date: '2026-05-01',
    time: '06:00',
    status: 'normal',
  },
  {
    id: 5,
    tankId: 6,
    tankName: 'Raceway D1',
    temperature: 28.8,
    ph: 6.5,
    dissolvedOxygen: 3.8,
    ammonia: 0.12,
    nitrite: 0.08,
    transparency: 20,
    date: '2026-05-01',
    time: '06:00',
    status: 'crítico',
  },
  {
    id: 6,
    tankId: 8,
    tankName: 'Tanque F1',
    temperature: 27.0,
    ph: 7.1,
    dissolvedOxygen: 5.0,
    ammonia: 0.05,
    nitrite: 0.03,
    transparency: 28,
    date: '2026-05-01',
    time: '06:00',
    status: 'alerta',
  },
  {
    id: 7,
    tankId: 1,
    tankName: 'Tanque A1',
    temperature: 26.8,
    ph: 7.3,
    dissolvedOxygen: 6.0,
    ammonia: 0.02,
    nitrite: 0.01,
    transparency: 36,
    date: '2026-04-30',
    time: '06:00',
    status: 'normal',
  },
  {
    id: 8,
    tankId: 3,
    tankName: 'Tanque B1',
    temperature: 30.1,
    ph: 6.6,
    dissolvedOxygen: 3.9,
    ammonia: 0.1,
    nitrite: 0.06,
    transparency: 22,
    date: '2026-04-30',
    time: '06:00',
    status: 'crítico',
  },
];

export const waterQualityHistory = [
  { name: 'Seg', temp: 27.2, ph: 7.1, oxigenio: 5.6 },
  { name: 'Ter', temp: 27.5, ph: 7.2, oxigenio: 5.8 },
  { name: 'Qua', temp: 28.0, ph: 7.0, oxigenio: 5.4 },
  { name: 'Qui', temp: 27.8, ph: 6.9, oxigenio: 5.2 },
  { name: 'Sex', temp: 28.3, ph: 7.1, oxigenio: 5.5 },
  { name: 'Sáb', temp: 27.0, ph: 7.3, oxigenio: 5.9 },
  { name: 'Dom', temp: 27.5, ph: 7.2, oxigenio: 5.7 },
];
