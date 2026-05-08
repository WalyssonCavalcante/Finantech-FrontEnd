'use client';

import {
  SquaresFour,
  Wallet,
  ListBullets,
  ChartLineUp,
  MagnifyingGlass,
  Gear,
  Question,
  SignOut,
  Moon,
  Sun,
  Vault,
} from '@phosphor-icons/react';
import { useTheme } from '@/shared/contexts/ThemeContext';
import styles from './Sidebar.module.scss';

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <Vault size={24} weight="fill" />
        </div>
        <span className={styles.logoText}>Finantech</span>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <a href="#" className={`${styles.navItem} ${styles.navItemActive}`}>
          <SquaresFour size={20} weight="fill" />
          <span>Visão Geral</span>
        </a>

        <a href="#" className={styles.navItem}>
          <Wallet size={20} weight="regular" />
          <span>Carteira</span>
        </a>

        <a href="#" className={styles.navItem}>
          <ListBullets size={20} weight="regular" />
          <span>Transações</span>
        </a>

        <a href="#" className={styles.navItem}>
          <ChartLineUp size={20} weight="regular" />
          <span>Estatísticas</span>
        </a>

        <div className={styles.searchItem}>
          <MagnifyingGlass size={20} weight="regular" />
          <span>Buscar</span>
        </div>
      </nav>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Footer Nav */}
      <nav className={styles.footerNav}>
        <a href="#" className={styles.navItem}>
          <Gear size={20} weight="regular" />
          <span>Configurações</span>
        </a>

        <a href="#" className={styles.navItem}>
          <Question size={20} weight="regular" />
          <span>Ajuda</span>
        </a>

        <button className={styles.navItem} onClick={toggleTheme}>
          {theme === 'light' ? (
            <Moon size={20} weight="regular" />
          ) : (
            <Sun size={20} weight="regular" />
          )}
          <span>{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
        </button>

        <button className={styles.logoutButton}>
          <SignOut size={20} weight="regular" />
          <span>Sair</span>
        </button>
      </nav>
    </aside>
  );
}
