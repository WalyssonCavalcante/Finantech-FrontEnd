'use client';

import { Transaction } from '../../types';
import { TRANSACTION_TYPE_LABELS } from '../../constants';
import {
  Money,
  House,
  DeviceMobile,
  ShoppingCart,
  Laptop,
  Car,
  Lightning,
  Package,
  ClipboardText,
} from '@phosphor-icons/react';
import styles from './TransactionList.module.scss';

interface TransactionListProps {
  transactions: Transaction[];
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
}

// Category icon mapping using Phosphor Icons
function getCategoryIcon(category: string) {
  const iconProps = { size: 20, weight: 'duotone' as const };

  const icons: Record<string, React.ReactNode> = {
    'Salário': <Money {...iconProps} />,
    'Moradia': <House {...iconProps} />,
    'Assinaturas': <DeviceMobile {...iconProps} />,
    'Alimentação': <ShoppingCart {...iconProps} />,
    'Freelance': <Laptop {...iconProps} />,
    'Transporte': <Car {...iconProps} />,
    'Utilidades': <Lightning {...iconProps} />,
    'Outros': <Package {...iconProps} />,
  };
  return icons[category] || <ClipboardText {...iconProps} />;
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <ClipboardText size={48} weight="duotone" />
        </div>
        <p className={styles.emptyTitle}>Nenhuma transação encontrada</p>
        <p className={styles.emptyDescription}>
          As transações deste mês aparecerão aqui.
        </p>
      </div>
    );
  }

  // Sort by date descending (most recent first)
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Transações</h3>
      <ul className={styles.list}>
        {sorted.map((transaction, index) => (
          <li
            key={transaction.id}
            className={styles.row}
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <div className={styles.colDescription}>
              <span className={styles.iconBox}>{getCategoryIcon(transaction.category)}</span>
              <span className={styles.name}>{transaction.category}</span>
            </div>

            <span className={styles.colDate}>{formatDate(transaction.date)}</span>

            <span
              className={`${styles.colAmount} ${
                transaction.type === 'INCOME' ? styles.amountIncome : styles.amountExpense
              }`}
            >
              {transaction.type === 'EXPENSE' ? '− ' : '+ '}
              {formatCurrency(transaction.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
