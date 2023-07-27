import { useState } from 'react';
import styles from './sort-panel.module.css';

export function SortPanel() {
  const [isAscending, setIsAscending] = useState(true);

  const handleAscendingClick = () => {
    setIsAscending(true);
  };

  const handleDescendingClick = () => {
    setIsAscending(false);
  };

  return (
    <div className={styles.sortPanel}>
      <p className={styles.sortPanel__title}>Cортировать:</p>
      <button className={`${styles.sortPanel__sort__btn} ${isAscending ? styles.btn_active : ''}`} onClick={handleAscendingClick}>
        По возрастанияю репозиториев
      </button>
      <button className={`${styles.sortPanel__sort__btn} ${!isAscending ? styles.btn_active : ''}`} onClick={handleDescendingClick}>
        По убыванию репозиториев
      </button>
    </div>
  )
}