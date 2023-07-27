import styles from './search.module.css';

export function Search() {


  return (
    <>
      <h1 className={styles.title}>Поиск пользователя</h1>
      <div className={styles.container}>
        <input className={styles.container__input} maxLength={30} type="text" placeholder="Введите логин пользователя для поиска" />
        <button className={styles.container__searchButton}></button>
      </div>
    </>
  )
}
