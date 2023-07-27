import { List } from '../list/list';
import { Search } from '../search/serch';
import { SortPanel } from '../sort-panel/sort-panel';
import styles from './app.module.css';

export function App() {
  return (
    <main className={styles.main}>
      <Search />
      <SortPanel />
      <List />
    </main>
  )
}

