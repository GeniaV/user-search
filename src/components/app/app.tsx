import { Routes, Route, useNavigate } from 'react-router-dom';
import { List } from '../list/list';
import { Modal } from '../modal/modal';
import { Search } from '../search/search';
import { SortPanel } from '../sort-panel/sort-panel';
import styles from './app.module.css';

export function App() {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate("/");
  };

  return (
    <main className={styles.main}>
      <Search />
      <SortPanel />
      <List />
      <Routes>
        <Route path="/user/:name" element={<Modal close={closeModal} />} />
      </Routes>
    </main>
  )
};
