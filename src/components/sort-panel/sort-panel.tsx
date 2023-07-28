import styles from './sort-panel.module.css';
import { getUsersByLoginBySortRepo } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '../..';
import { getUsersGitHub } from '../../store/usersSlice';
import { SortingOption } from '../../utils/types';

export function SortPanel() {
  const loginName = useAppSelector(state => state.loginSearchReducer.loginName);
  const dispatch = useAppDispatch();

  const handleSortingClick = (sortOpt: boolean, sort: string) => {
    getUsersByLoginBySortRepo({
      login: loginName,
      sortType: sort,
      perPage: 15,
      page: 1
    })
      .then((res) => dispatch(getUsersGitHub(res)))
      .catch(err => console.log(`Ошибка получения пользователей ${err.code}. ${err.message}`))
  };

  return (
    <div className={styles.sortPanel}>
      <p className={styles.sortPanel__title}>Cортировать:</p>
      <button className={styles.sortPanel__sort__btn}
        onClick={() => handleSortingClick(true, SortingOption.ASC)}>
        По возрастанияю репозиториев
      </button>
      <button className={styles.sortPanel__sort__btn}
        onClick={() => handleSortingClick(false, SortingOption.DESC)}>
        По убыванию репозиториев
      </button>
    </div>
  )
};
