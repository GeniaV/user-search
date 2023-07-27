import styles from './list.module.css';

const list =new Array(15).fill( { name: 'GeniaV',
qty: 1
}); 
 


export function List() {
  return (
    <ul className={styles.list}>
      {list.map((item, index) =>
        <li className={styles.list__item} key={index}>
          <h2 className={styles.list__item__name}>{item.name}</h2>
          <p className={styles.list__item__repQty}>Количество репозиториев: <span className={styles.text__span}>{item.qty}</span></p>
        </li>
      )}
    </ul>
  )
}
