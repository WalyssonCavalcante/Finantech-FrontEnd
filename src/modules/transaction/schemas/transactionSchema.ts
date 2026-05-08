import { z } from 'zod';

export const createTransactionSchema = z.object({
  description: z.string().min(3, 'A descrição precisa ter pelo menos 3 caracteres'),
  amount: z.number().positive('O valor deve ser maior que zero'),
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.string().min(1, 'É necessário ter uma categoria'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida'),
});

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
