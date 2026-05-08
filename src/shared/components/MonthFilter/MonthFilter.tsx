'use client';

import { useTransactionStore } from '@/modules/transaction/store/useTransactionStore';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import styles from './MonthFilter.module.scss';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function MonthFilter() {
  const selectedMonth = useTransactionStore((s) => s.selectedMonth);
  const selectedYear = useTransactionStore((s) => s.selectedYear);
  const setMonthFilter = useTransactionStore((s) => s.setMonthFilter);

  const handlePrev = () => {
    if (selectedMonth === 1) {
      setMonthFilter(12, selectedYear - 1);
    } else {
      setMonthFilter(selectedMonth - 1, selectedYear);
    }
  };

  const handleNext = () => {
    if (selectedMonth === 12) {
      setMonthFilter(1, selectedYear + 1);
    } else {
      setMonthFilter(selectedMonth + 1, selectedYear);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.navButton}
        onClick={handlePrev}
        aria-label="Mês anterior"
      >
        <CaretLeft size={18} weight="bold" />
      </button>

      <span className={styles.label}>
        {MONTH_NAMES[selectedMonth - 1]} <span className={styles.year}>{selectedYear}</span>
      </span>

      <button
        className={styles.navButton}
        onClick={handleNext}
        aria-label="Próximo mês"
      >
        <CaretRight size={18} weight="bold" />
      </button>
    </div>
  );
}
