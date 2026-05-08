'use client';

import { useEffect } from 'react';
import { useTransactionStore } from '@/modules/transaction/store/useTransactionStore';
import { Sidebar } from '@/shared/components/Sidebar';
import { WalletCard } from '@/modules/transaction/components/WalletCard';
import { TransactionList } from '@/modules/transaction/components/TransactionList';
import { CategoryBreakdown } from '@/modules/transaction/components/CategoryBreakdown';
import { MiniTransactionList } from '@/modules/transaction/components/MiniTransactionList';
import { CreateTransactionModal } from '@/modules/transaction/components/CreateTransactionModal';
import { MonthFilter } from '@/shared/components/MonthFilter';
import { MagnifyingGlass, ChatCircle, Bell } from '@phosphor-icons/react';
import styles from './page.module.scss';

export default function DashboardPage() {
  const isLoading = useTransactionStore((s) => s.isLoading);
  const fetchInitialData = useTransactionStore((s) => s.fetchInitialData);
  const getFilteredTransactions = useTransactionStore((s) => s.getFilteredTransactions);
  const openModal = useTransactionStore((s) => s.openModal);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const transactions = getFilteredTransactions();

  if (isLoading) {
    return (
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Carregando dados financeiros...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        {/* Top Bar */}
        <header className={styles.topBar}>
          <div className={styles.searchBar}>
            <MagnifyingGlass size={20} className={styles.searchIcon} />
            <input type="text" placeholder="Buscar" className={styles.searchInput} />
          </div>

          <div className={styles.topIcons}>
            <button className={styles.iconButton}>
              <ChatCircle size={24} weight="regular" />
            </button>
            <button className={styles.iconButton}>
              <Bell size={24} weight="regular" />
            </button>
            <button className={styles.newBtn} onClick={openModal}>
              + Nova
            </button>
          </div>
        </header>

        <h1 className={styles.pageTitle}>Visão Geral</h1>

        <div className={styles.dashboardGrid}>
          {/* Main Left Area */}
          <div className={styles.leftArea}>
            <div className={styles.walletSection}>
              <WalletCard transactions={transactions} />
            </div>

            <div className={styles.leftSubGrid}>
              <div className={styles.transactionsSection}>
                <TransactionList transactions={transactions} />
              </div>

              <div className={styles.analyticsSection}>
                 <CategoryBreakdown transactions={transactions} />
              </div>
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className={styles.rightArea}>
            <h3 className={styles.sidebarTitle}>Contas a Pagar</h3>
            <div className={styles.progressBar}>
              <span className={styles.progressText}>14 OUT OF 16</span>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: '87%' }}></div>
              </div>
            </div>

            <div className={styles.spacer} />
            <MiniTransactionList title="Receitas" transactions={transactions} type="INCOME" />
            <div className={styles.spacer} />
            <MiniTransactionList title="Despesas" transactions={transactions} type="EXPENSE" />
          </div>
        </div>
      </main>

      {/* Modal */}
      <CreateTransactionModal />
    </div>
  );
}