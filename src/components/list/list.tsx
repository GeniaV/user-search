import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../..';
import styles from './list.module.css';
import { setPageNumber } from '../../redux/paginationSlice';
import { getUsersByLoginBySortRepo } from '../../utils/api';
import { getUsersGitHub } from '../../redux/usersSlice';
import { Preloader } from '../preloader/preloader';
import { getPagesArray } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails } from '../../redux/thunks/fetchUserDetails';

export function List() {
  const users = useAppSelector(state => state.usersReducer.items);
  const loginName = useAppSelector(state => state.loginSearchReducer.loginName);
  const currentPage = useAppSelector(state => state.paginationReducer.page);
  const totalCount = useAppSelector(state => state.usersReducer.total_count);

  const dispatch = useAppDispatch();

  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const totalPagesCount = Math.ceil(totalCount / 15);
    setTotalPages(totalPagesCount);
  }, [totalCount, currentPage]);

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

  const handleBackClick = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handelUserClick = (username: string) => {
    navigate(`/user/${username}`);
    dispatch(fetchUserDetails(username));
  };

  if (isLoading) {
    return <Preloader />
  }

  return (
    <ul className={styles.list}>
      {users && users.map((user) =>
        <li className={styles.list__item} key={user.id} onClick={() => handelUserClick(user.login)}>
          <h2 className={styles.list__item__name}>{user.login}</h2>
        </li>
      )}
      {totalPages > 1 && getPagesArray({ currentPage, totalPages }).map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span key={`ellipsis-${index}`} className={styles.pagination__ellipsis}>...</span>
        ) : (
          <button className={styles.pagination}
            key={pageNumber}
            onClick={() => typeof pageNumber === "number" && handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        )
      )}
      {currentPage > 1 && <button className={`${styles.pagination} ${styles.nav}`} onClick={handleBackClick}>Назад</button>}
      {currentPage < totalPages && <button className={`${styles.pagination} ${styles.nav}`} onClick={handleNextClick}>Вперед</button>}
    </ul>
  )
};
