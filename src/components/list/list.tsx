// import { useAppSelector } from '../..';
// import styles from './list.module.css';

// export function List() {
//   const users = useAppSelector(state => state.usersReducer.items);
//   const loginName = useAppSelector(state => state.loginSearchReducer.loginName);

//   if (users.length === 0 && loginName !== '') {
//     return <p className={styles.list__noitems}>Пользователи c логином {loginName} не найдены</p>
//   }

//   return (
//     <ul className={styles.list}>
//       {users.map((user) =>
//         <li className={styles.list__item} key={user.id}>
//           <h2 className={styles.list__item__name}>{user.login}</h2>
//         </li>
//       )}
//       <p className={styles.pagination}>1</p>
//     </ul>
//   )
// };


import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../..';
import styles from './list.module.css';
import { setPageNumber } from '../../store/paginationSlice';
import { getUsersByLoginBySortRepo } from '../../utils/api';
import { SortingOption } from '../../utils/types';
import { getUsersGitHub } from '../../store/usersSlice';

export function List() {
  const users = useAppSelector(state => state.usersReducer.items);
  const loginName = useAppSelector(state => state.loginSearchReducer.loginName);
  const currentPage = useAppSelector(state => state.paginationReducer.page);
  const totalCount = useAppSelector(state => state.usersReducer.total_count);

  const dispatch = useAppDispatch();

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const totalPagesCount = Math.ceil(totalCount / 15);
    setTotalPages(totalPagesCount);
  }, []);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPageNumber(pageNumber));
    const totalPagesCount = Math.ceil(totalCount / 15);
    setTotalPages(totalPagesCount);
    getUsersByLoginBySortRepo({
      login: loginName,
      sortType: SortingOption.DESC,
      perPage: 15,
      page: currentPage
    })
      .then((res) => dispatch(getUsersGitHub(res)))
      .catch(err => console.log(`Ошибка получения пользователей ${err.code}. ${err.message}`))
  };

  if (users.length === 0 && loginName !== '') {
    return <p className={styles.list__noitems}>Пользователи c логином {loginName} не найдены</p>
  }

  return (
    <ul className={styles.list}>
      {users.map((user) =>
        <li className={styles.list__item} key={user.id}>
          <h2 className={styles.list__item__name}>{user.login}</h2>
        </li>
      )}
      {users.length > 15 && currentPage > 1 && <button className={styles.pagination}>Назад</button>}
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
      {(users.length > 15 && currentPage < totalPages) && <button className={styles.pagination}>Вперед</button>}
    </ul>
  )
};
