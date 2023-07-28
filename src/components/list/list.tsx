import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../..';
import styles from './list.module.css';
import { setPageNumber } from '../../store/paginationSlice';
import { getUsersByLoginBySortRepo } from '../../utils/api';
import { getUsersGitHub } from '../../store/usersSlice';
import { Preloader } from '../preloader/preloader';

export function List() {
  const users = useAppSelector(state => state.usersReducer.items);
  const loginName = useAppSelector(state => state.loginSearchReducer.loginName);
  const currentPage = useAppSelector(state => state.paginationReducer.page);
  const totalCount = useAppSelector(state => state.usersReducer.total_count);

  const dispatch = useAppDispatch();

  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const totalPagesCount = Math.ceil(totalCount / 15);
    setTotalPages(totalPagesCount);
  }, [totalCount]);


  let timerId: null | number | NodeJS.Timeout = null;

  const fetchData = (pageNumber: number) => {
    setLoading(true);
    dispatch(setPageNumber(pageNumber));
    const totalPagesCount = Math.ceil(totalCount / 15);
    setTotalPages(totalPagesCount);
    getUsersByLoginBySortRepo({
      login: loginName,
      perPage: 15,
      page: currentPage
    })
      .then((res) => dispatch(getUsersGitHub(res)))
      .catch(err => console.log(`Ошибка получения пользователей ${err.code}. ${err.message}`))
    timerId = setTimeout(() => {
      setLoading(false);
    }, 900);

  };

  const handlePageChange = (pageNumber: number) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    fetchData(pageNumber);
  };

  if (isLoading) {
    return <Preloader />
  }

  return (
    <ul className={styles.list}>
      {users && users.map((user) =>
        <li className={styles.list__item} key={user.id}>
          <h2 className={styles.list__item__name}>{user.login}</h2>
        </li>
      )}
      {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button className={styles.pagination}
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        )
      )}
      {currentPage > 1 && <button className={styles.pagination}>Назад</button>}
      {currentPage < totalPages && <button className={styles.pagination}>Вперед</button>}
    </ul>
  )
};
