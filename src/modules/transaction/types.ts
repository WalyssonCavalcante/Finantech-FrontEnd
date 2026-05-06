export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    description: string;
    category: string;
    date: string;
    createdAt: string;
}

export type CreateTransactionDTO = Omit<Transaction, 'id' | 'createdAt'>;