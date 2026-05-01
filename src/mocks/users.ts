export type UserRole = 'admin' | 'operador' | 'visualizador';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

export const usersList: User[] = [
  {
    id: 1,
    name: 'Admin Principal',
    email: 'admin@aquagestao.com',
    role: 'admin',
    active: true,
    createdAt: '2025-08-01',
  },
  {
    id: 2,
    name: 'João Silva',
    email: 'joao@aquagestao.com',
    role: 'operador',
    active: true,
    createdAt: '2025-09-15',
  },
  {
    id: 3,
    name: 'Maria Santos',
    email: 'maria@aquagestao.com',
    role: 'operador',
    active: true,
    createdAt: '2025-10-01',
  },
  {
    id: 4,
    name: 'Carlos Oliveira',
    email: 'carlos@aquagestao.com',
    role: 'operador',
    active: true,
    createdAt: '2025-11-10',
  },
  {
    id: 5,
    name: 'Ana Pereira',
    email: 'ana@aquagestao.com',
    role: 'visualizador',
    active: false,
    createdAt: '2026-01-20',
  },
];

export const timezones = [
  { value: 'America/Sao_Paulo', label: 'Brasília (GMT-3)' },
  { value: 'America/Manaus', label: 'Manaus (GMT-4)' },
  { value: 'America/Belem', label: 'Belém (GMT-3)' },
  { value: 'America/Cuiaba', label: 'Cuiabá (GMT-4)' },
  { value: 'America/Fortaleza', label: 'Fortaleza (GMT-3)' },
  { value: 'America/Recife', label: 'Recife (GMT-3)' },
  { value: 'America/Rio_Branco', label: 'Rio Branco (GMT-5)' },
  { value: 'America/Noronha', label: 'Fernando de Noronha (GMT-2)' },
  { value: 'America/New_York', label: 'Nova York (GMT-5)' },
  { value: 'Europe/Lisbon', label: 'Lisboa (GMT+0)' },
];
