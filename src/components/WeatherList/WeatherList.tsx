// libraries
import { useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';

// components
import { cityList } from '../../utils/constants';
import { fetchCityByName } from '../../store/actions';

// types
import { AppState, WeatherActionTypes } from '../../types/store';

// style
import styles from './WeatherList.module.scss';

export const WeatherList: React.FC = () => {
  const dispatch: ThunkDispatch<null, AppState, WeatherActionTypes> =
    useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const currentCity = useSelector((state: AppState) => state.city);

  const toggleDropdown = (): void => {
    setDropdown(!dropdown);
  };

  const listClass: string = dropdown
    ? `${styles['list']}`
    : `${styles['list']} ${styles['hidden']}`;

  const handleOnClick = (city: string): void => {
    dispatch(fetchCityByName(city));
  };

  return (
    <>
      <div className={styles['city']}>
        <div className={styles['city-selected']} onClick={toggleDropdown}>
          {currentCity?.name}
        </div>
        <ul className={listClass}>
          {cityList.map((city) => (
            <li
              className={styles['item']}
              key={city}
              onClick={() => handleOnClick(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
