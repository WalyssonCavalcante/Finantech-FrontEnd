'use client';

import { Transaction } from '../../types';
import { ArrowUpRight, ArrowDownRight } from '@phosphor-icons/react';
import styles from './WalletCard.module.scss';

interface WalletCardProps {
  transactions: Transaction[];
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

export function WalletCard({ transactions }: WalletCardProps) {
  const income = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className={styles.card}>
      <span className={styles.title}>Carteira</span>
      <h2 className={styles.balance}>{formatCurrency(balance)}</h2>
      
      <div className={styles.metrics}>
        <div className={styles.metric}>
          <div className={styles.iconIncome}>
            <ArrowUpRight size={14} weight="bold" />
          </div>
          <div className={styles.metricData}>
            <span className={styles.metricValue}>{formatCurrency(income)}</span>
            <span className={styles.metricLabel}>Receitas</span>
          </div>
        </div>

        <div className={styles.metric}>
          <div className={styles.iconExpense}>
            <ArrowDownRight size={14} weight="bold" />
          </div>
          <div className={styles.metricData}>
            <span className={styles.metricValue}>{formatCurrency(expense)}</span>
            <span className={styles.metricLabel}>Despesas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
