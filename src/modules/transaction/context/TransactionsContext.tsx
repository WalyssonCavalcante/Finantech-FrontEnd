'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, CreateTransactionDTO } from '../types';
import { getTransactions, createTransaction as mockApiCreateTransaction } from '../services/mockAPI';

interface TransactionsContextData {
  transactions: Transaction[];
  isLoading: boolean;
  createNewTransaction: (data: CreateTransactionDTO) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('[TransactionsProvider] Failed to fetch initial transactions:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTransactions();
  }, []);

  const createNewTransaction = async (data: CreateTransactionDTO) => {
    try {
      const newTransaction = await mockApiCreateTransaction(data);
      
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
      console.log('[TransactionsProvider] State updated with new transaction');
    } catch (error) {
      console.error('[TransactionsProvider] Error adding transaction:', error);
      throw error; 
    }
  };

  return (
    <TransactionsContext.Provider value={{ transactions, isLoading, createNewTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }

  return context;
}