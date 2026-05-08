import { create } from 'zustand';
import { Transaction, CreateTransactionDTO } from '../types';
import { getTransactions, createTransaction as mockApiCreateTransaction } from '../services/mockAPI';

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;

  // Month filter
  selectedMonth: number;
  selectedYear: number;

  // Modal
  isModalOpen: boolean;

  // Actions
  fetchInitialData: () => Promise<void>;
  addTransaction: (data: CreateTransactionDTO) => Promise<void>;
  setMonthFilter: (month: number, year: number) => void;
  openModal: () => void;
  closeModal: () => void;

  // Derived
  getFilteredTransactions: () => Transaction[];
}

const now = new Date();

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,
  selectedMonth: now.getMonth() + 1, // 1-indexed
  selectedYear: now.getFullYear(),
  isModalOpen: false,

  fetchInitialData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getTransactions();
      set({ transactions: data });
    } catch (error) {
      console.error('[Zustand] Failed to load initial transactions:', error);
      set({ error: 'Failed to load transactions.' });
    } finally {
      set({ isLoading: false });
    }
  },

  addTransaction: async (data: CreateTransactionDTO) => {
    try {
      const newTransaction = await mockApiCreateTransaction(data);
      
      set((state) => ({
        transactions: [newTransaction, ...state.transactions],
      }));
      
      console.log('[Zustand] Transaction added successfully');
    } catch (error) {
      console.error('[Zustand] Failed to add transaction:', error);
      throw error;
    }
  },

  setMonthFilter: (month: number, year: number) => {
    set({ selectedMonth: month, selectedYear: year });
  },

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  getFilteredTransactions: () => {
    const { transactions, selectedMonth, selectedYear } = get();
    return transactions.filter((t) => {
      const date = new Date(t.date);
      return date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
    });
  },
}));