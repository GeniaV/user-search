import styles from './sort-panel.module.css';
import { getUsersByLoginBySortRepo } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '../..';
import { getUsersGitHub } from '../../store/usersSlice';
import { SortingOption } from '../../utils/types';

export function SortPanel() {
  const loginName = useAppSelector(state => state.loginSearchReducer.loginName);
  const currentPage = useAppSelector(state => state.paginationReducer.page);
  const dispatch = useAppDispatch();

  const handleSortingClick = (sort: string) => {
    getUsersByLoginBySortRepo({
      login: loginName,
      sortType: sort,
      perPage: 15,
      page: currentPage
    })
      .then((res) => dispatch(getUsersGitHub(res)))
      .catch(err => console.log(`Ошибка получения пользователей ${err.code}. ${err.message}`))
  };

  return (
    <div className={styles.sortPanel}>
      <p className={styles.sortPanel__title}>Cортировать:</p>
      <button className={styles.sortPanel__sort__btn}
        onClick={() => handleSortingClick(SortingOption.ASC)}>
        По возрастанию репозиториев
      </button>
      <button className={styles.sortPanel__sort__btn}
        onClick={() => handleSortingClick(SortingOption.DESC)}>
        По убыванию репозиториев
      </button>
    </div>
  )
};
