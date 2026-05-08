'use client';

import { useTransactionStore } from '../store/useTransactionStore';
import { TransactionForm } from './TransactionForm';
import { X } from '@phosphor-icons/react';
import styles from './CreateTransactionModal.module.scss';

export function CreateTransactionModal() {
  const isModalOpen = useTransactionStore((state) => state.isModalOpen);
  const closeModal = useTransactionStore((state) => state.closeModal);

  if (!isModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nova Transação</h2>
          <button
            className={styles.closeButton}
            onClick={closeModal}
            aria-label="Fechar modal"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <TransactionForm onSuccess={closeModal} />
      </div>
    </div>
  );
}