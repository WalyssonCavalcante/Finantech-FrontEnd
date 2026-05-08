'use client';

import { Transaction } from '../../types';
import { ArrowUpRight, ArrowDownRight, Receipt } from '@phosphor-icons/react';
import styles from './MiniTransactionList.module.scss';

interface MiniTransactionListProps {
  title: string;
  transactions: Transaction[];
  type: 'INCOME' | 'EXPENSE';
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

export function MiniTransactionList({ title, transactions, type }: MiniTransactionListProps) {
  const filtered = transactions.filter((t) => t.type === type).slice(0, 3); // top 3

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      
      {filtered.length === 0 ? (
        <p className={styles.empty}>Nenhum registro.</p>
      ) : (
        <ul className={styles.list}>
          {filtered.map((t, i) => (
            <li key={t.id} className={styles.item} style={{ animationDelay: `${i * 50}ms` }}>
              <div className={styles.iconBox}>
                {type === 'INCOME' ? (
                  <ArrowUpRight size={16} weight="bold" className={styles.iconIncome} />
                ) : (
                  <Receipt size={16} weight="bold" className={styles.iconExpense} />
                )}
              </div>
              <div className={styles.details}>
                <span className={styles.amount}>{formatCurrency(t.amount)}</span>
                <span className={styles.description}>{t.description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
