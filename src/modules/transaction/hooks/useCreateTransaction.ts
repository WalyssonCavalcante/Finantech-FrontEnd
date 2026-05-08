import { useState } from 'react';
import { createTransaction } from '../services/mockAPI';
import { CreateTransactionFormData } from '../schemas/transactionSchema';

export const useCreateTransaction = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (data: CreateTransactionFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        ...data,
        amount: Math.round(data.amount * 100), 
      };

      await createTransaction(payload);
      onSuccess();
    } catch (err) {
      console.error('[Transaction Error] Failed to create:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreate, isLoading, error };
};
