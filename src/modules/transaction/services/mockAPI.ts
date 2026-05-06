import { Transaction, CreateTransactionDTO } from '../types';

const transactionsDb: Transaction[] = [];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createTransaction = async (data: CreateTransactionDTO): Promise<Transaction> => {
  await delay(800); 

  const newTransaction: Transaction = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  transactionsDb.push(newTransaction);
  console.log('[Mock API] Transaction created successfully:', newTransaction);
  
  return newTransaction;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  await delay(500);
  console.log('[Mock API] Fetching transactions...');
  return [...transactionsDb];
};
