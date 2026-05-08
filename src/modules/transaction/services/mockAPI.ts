import { Transaction, CreateTransactionDTO } from '../types';

// ──────────────────────────────────────────────
// Seed Data — realistic transactions for demo
// ──────────────────────────────────────────────

const seedTransactions: Transaction[] = [
  {
    id: 'seed-1',
    amount: 850000,
    type: 'INCOME',
    description: 'Salário mensal',
    category: 'Salário',
    date: '2026-05-05',
    createdAt: '2026-05-05T08:00:00Z',
  },
  {
    id: 'seed-2',
    amount: 150000,
    type: 'EXPENSE',
    description: 'Aluguel apartamento',
    category: 'Moradia',
    date: '2026-05-01',
    createdAt: '2026-05-01T10:00:00Z',
  },
  {
    id: 'seed-3',
    amount: 8990,
    type: 'EXPENSE',
    description: 'Spotify Premium',
    category: 'Assinaturas',
    date: '2026-05-03',
    createdAt: '2026-05-03T12:00:00Z',
  },
  {
    id: 'seed-4',
    amount: 24500,
    type: 'EXPENSE',
    description: 'Mercado - compras da semana',
    category: 'Alimentação',
    date: '2026-05-04',
    createdAt: '2026-05-04T14:30:00Z',
  },
  {
    id: 'seed-5',
    amount: 120000,
    type: 'INCOME',
    description: 'Freelance — landing page',
    category: 'Freelance',
    date: '2026-05-02',
    createdAt: '2026-05-02T09:15:00Z',
  },
  {
    id: 'seed-6',
    amount: 4500,
    type: 'EXPENSE',
    description: 'Uber — ida ao escritório',
    category: 'Transporte',
    date: '2026-05-06',
    createdAt: '2026-05-06T07:45:00Z',
  },
  {
    id: 'seed-7',
    amount: 35000,
    type: 'EXPENSE',
    description: 'Conta de luz',
    category: 'Utilidades',
    date: '2026-05-07',
    createdAt: '2026-05-07T16:00:00Z',
  },
  {
    id: 'seed-8',
    amount: 45000,
    type: 'INCOME',
    description: 'Cashback cartão',
    category: 'Outros',
    date: '2026-05-06',
    createdAt: '2026-05-06T11:00:00Z',
  },
  // April transactions for filter testing
  {
    id: 'seed-9',
    amount: 850000,
    type: 'INCOME',
    description: 'Salário mensal',
    category: 'Salário',
    date: '2026-04-05',
    createdAt: '2026-04-05T08:00:00Z',
  },
  {
    id: 'seed-10',
    amount: 150000,
    type: 'EXPENSE',
    description: 'Aluguel apartamento',
    category: 'Moradia',
    date: '2026-04-01',
    createdAt: '2026-04-01T10:00:00Z',
  },
];

const transactionsDb: Transaction[] = [...seedTransactions];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createTransaction = async (data: CreateTransactionDTO): Promise<Transaction> => {
  await delay(800); 

  const newTransaction: Transaction = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  transactionsDb.unshift(newTransaction);
  console.log('[Mock API] Transaction created successfully:', newTransaction);
  
  return newTransaction;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  await delay(500);
  console.log('[Mock API] Fetching transactions...');
  return [...transactionsDb];
};
