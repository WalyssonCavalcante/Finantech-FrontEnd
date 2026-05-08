'use client';

import { Transaction } from '../../types';
import {
  ShoppingCart,
  House,
  DeviceMobile,
  Car,
  Lightning,
  Laptop,
  Package,
  Money,
  ClipboardText,
} from '@phosphor-icons/react';
import styles from './CategoryBreakdown.module.scss';

interface CategoryBreakdownProps {
  transactions: Transaction[];
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Salário': <Money size={16} weight="duotone" />,
  'Moradia': <House size={16} weight="duotone" />,
  'Assinaturas': <DeviceMobile size={16} weight="duotone" />,
  'Alimentação': <ShoppingCart size={16} weight="duotone" />,
  'Freelance': <Laptop size={16} weight="duotone" />,
  'Transporte': <Car size={16} weight="duotone" />,
  'Utilidades': <Lightning size={16} weight="duotone" />,
  'Outros': <Package size={16} weight="duotone" />,
};

// Color palette for category bars
const BAR_COLORS = [
  '#00D09C',
  '#00B385',
  '#009E75',
  '#3B82F6',
  '#6366F1',
  '#8B5CF6',
  '#F59E0B',
  '#EF4444',
  '#EC4899',
  '#14B8A6',
];

export function CategoryBreakdown({ transactions }: CategoryBreakdownProps) {
  const expenses = transactions.filter((t) => t.type === 'EXPENSE');

  if (expenses.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Despesas por Categoria</h3>
        <p className={styles.empty}>Sem despesas neste período.</p>
      </div>
    );
  }

  // Aggregate by category
  const categoryMap = new Map<string, number>();
  expenses.forEach((t) => {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
  });

  // Sort by amount descending
  const sorted = Array.from(categoryMap.entries())
    .sort((a, b) => b[1] - a[1]);

  const maxAmount = sorted[0][1];
  const totalExpenses = sorted.reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Despesas por Categoria</h3>

      <div className={styles.barList}>
        {sorted.map(([category, amount], index) => {
          const percentage = ((amount / totalExpenses) * 100).toFixed(0);
          const barWidth = (amount / maxAmount) * 100;
          const color = BAR_COLORS[index % BAR_COLORS.length];

          return (
            <div
              key={category}
              className={styles.barItem}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className={styles.barLabelTop}>
                <div className={styles.barIconName}>
                  <span className={styles.barIcon} style={{ color }}>
                    {CATEGORY_ICONS[category] || <ClipboardText size={16} weight="duotone" />}
                  </span>
                  <span className={styles.barCategoryName}>{category}</span>
                </div>
                <span className={styles.barPercentage}>{percentage}%</span>
              </div>

              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${barWidth}%`,
                    background: color,
                  }}
                />
              </div>

              <span className={styles.barValue}>{formatCurrency(amount)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
