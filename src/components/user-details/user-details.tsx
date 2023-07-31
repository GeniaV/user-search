import { useAppSelector } from "../..";
import styles from "./user-details.module.css";

export function UserDetails() {
  const userDetails = useAppSelector(state => state.userDetailsReducer.details);

  return (
    <div className={styles.cont}>
      <img className={styles.avatar} src={userDetails.avatar_url} alt="Avatar" />
      <h2 className={styles.title}><b>Пользователь:&nbsp;</b>{userDetails.login}</h2>
      <p className={styles.text}><b>Локация:&nbsp;</b>{userDetails.location}</p>
      <p className={styles.text}><b>Количество подписчиков:&nbsp;</b>{userDetails.followers}</p>
      <p className={styles.text}><b>Количество публичных репозиториев:&nbsp;</b>{userDetails.public_repos}</p>
    </div>
  )
};

