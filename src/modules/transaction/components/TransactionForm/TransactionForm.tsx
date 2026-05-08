'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema, CreateTransactionFormData } from '../../schemas/transactionSchema';
import { useTransactionStore } from '../../store/useTransactionStore';
import { TRANSACTION_TYPE_LABELS } from '../../constants';
import { TransactionType } from '../../types';

import styles from './TransactionForm.module.scss';

interface TransactionFormProps {
  onSuccess: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: { type: 'EXPENSE' },
  });

  const onSubmit = async (data: CreateTransactionFormData) => {
    try {
      const payload = {
        ...data,
        amount: Math.round(data.amount * 100), 
      };
      await addTransaction(payload);
      onSuccess();
    } catch (error) {
      console.error('[TransactionForm] Submission failed', error);
    }
  };

  const types: TransactionType[] = ['INCOME', 'EXPENSE'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="description">Descrição</label>
        <input
          id="description"
          placeholder="Ex: Salário, Aluguel..."
          {...register('description')}
        />
        {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="amount">Valor (R$)</label>
        <input 
          id="amount" 
          type="number" 
          step="0.01"
          placeholder="0,00"
          {...register('amount', { valueAsNumber: true })} 
        />
        {errors.amount && <span className={styles.errorMessage}>{errors.amount.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label>Tipo</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className={styles.typeToggle}>
              {types.map((type) => {
                const isActive = field.value === type;
                let buttonClass = styles.typeButton;
                if (isActive && type === 'INCOME') {
                  buttonClass = styles.typeButtonActiveIncome;
                } else if (isActive && type === 'EXPENSE') {
                  buttonClass = styles.typeButtonActiveExpense;
                }

                return (
                  <button
                    key={type}
                    type="button"
                    className={buttonClass}
                    onClick={() => field.onChange(type)}
                  >
                    {type === 'INCOME' ? '↑ ' : '↓ '}
                    {TRANSACTION_TYPE_LABELS[type]}
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.type && <span className={styles.errorMessage}>{errors.type.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="category">Categoria</label>
        <input
          id="category"
          placeholder="Ex: Alimentação, Moradia..."
          {...register('category')}
        />
        {errors.category && <span className={styles.errorMessage}>{errors.category.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="date">Data</label>
        <input id="date" type="date" {...register('date')} />
        {errors.date && <span className={styles.errorMessage}>{errors.date.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
        {isSubmitting ? 'Salvando...' : 'Salvar Transação'}
      </button>
    </form>
  );
}