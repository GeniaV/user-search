import { useEffect, useState } from 'react';
import styles from './search.module.css';
import { useAppDispatch, useAppSelector } from '../..';
import { sendLoginForSearching } from '../../store/loginSearchSlice';
import { getUsersByLoginBySortRepo } from '../../utils/api';
import { SortingOption } from '../../utils/types';
import { getUsersGitHub } from '../../store/usersSlice';

export function Search() {
  const [inputValue, setInputValue] = useState<string>("");
  const currentPage = useAppSelector(state => state.paginationReducer.page);
  const dispatch = useAppDispatch();

  const handeButtonClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setInputValue(inputValue);
    dispatch(sendLoginForSearching(inputValue));
    getUsersByLoginBySortRepo({
      login: inputValue,
      sortType: SortingOption.DESC,
      perPage: 15,
      page: currentPage
    })
      .then((res) => dispatch(getUsersGitHub(res)))
      .catch(err => console.log(`Ошибка получения пользователей ${err.code}. ${err.message}`))
  };

  useEffect(() => {
    if (inputValue === '') {
      dispatch(sendLoginForSearching(inputValue));
    }
  }, [dispatch, inputValue])

  return (
    <>
      <h1 className={styles.title}>Поиск пользователя</h1>
      <div className={styles.container}>
        <input className={styles.container__input} maxLength={256} value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Введите логин пользователя для поиска" />
        <button className={styles.container__searchButton} onClick={handeButtonClick}></button>
      </div>
    </>
  )
};
