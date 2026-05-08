'use client';

import { Transaction } from '../../types';
import { ArrowUp, ArrowDown, CheckCircle } from '@phosphor-icons/react';
import styles from './SummaryCards.module.scss';

interface SummaryCardsProps {
  transactions: Transaction[];
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

interface DonutProps {
  percent: number;
  color: string;
  trackColor?: string;
  size?: number;
}

function DonutChart({ percent, color, trackColor = 'rgba(255,255,255,0.06)', size = 44 }: DonutProps) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={styles.donut}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className={styles.donutProgress}
        />
      </svg>
      <span className={styles.donutLabel}>{percent}%</span>
    </div>
  );
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const income = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const expensePercent = income > 0 ? Math.round((expense / income) * 100) : 0;

  return (
    <div className={styles.grid}>
      {/* Income Card */}
      <div className={`${styles.card} ${styles.income}`} style={{ animationDelay: '0ms' }}>
        <div className={styles.cardHeader}>
          <div className={`${styles.iconCircle} ${styles.incomeIcon}`}>
            <ArrowUp size={18} weight="bold" />
          </div>
        </div>
        <div className={styles.cardBody}>
          <span className={styles.cardLabel}>Receitas</span>
          <span className={styles.cardValue}>{formatCurrency(income)}</span>
        </div>
      </div>

      {/* Expense Card */}
      <div className={`${styles.card} ${styles.expense}`} style={{ animationDelay: '60ms' }}>
        <div className={styles.cardHeader}>
          <span className={styles.cardLabel}>Despesas</span>
          <DonutChart percent={expensePercent} color="#FF6B6B" />
        </div>
        <div className={styles.cardBody}>
          <span className={styles.cardValue}>{formatCurrency(expense)}</span>
        </div>
      </div>

      {/* Balance Card — highlighted with check icon */}
      <div className={`${styles.card} ${styles.balance}`} style={{ animationDelay: '120ms' }}>
        <div className={styles.cardHeader}>
          <span className={styles.cardLabel}>Saldo</span>
          <CheckCircle size={28} weight="fill" className={styles.balanceCheck} />
        </div>
        <div className={styles.cardBody}>
          <span className={styles.cardValue}>
            {formatCurrency(balance)}
          </span>
        </div>
      </div>
    </div>
  );
}
