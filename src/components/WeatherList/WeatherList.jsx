// libraries
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { cityList } from '/src/utils/constants';
import { fetchCityByName } from '/src/store/actions';

// style
import styles from './WeatherList.module.scss';

export const WeatherList = () => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const currentCity = useSelector((state) => state.city);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const listClass = dropdown
    ? `${styles['list']}`
    : `${styles['list']} ${styles['hidden']}`;

  const handleOnClick = (city) => {
    dispatch(fetchCityByName(city));
  };

  return (
    <>
      <div className={styles['city']}>
        <div className={styles['city-selected']} onClick={toggleDropdown}>
          {currentCity ? currentCity.name : cityList[0].name}
        </div>
        <ul className={listClass}>
          {cityList.map((city) => {
            return (
              <li
                className={styles['item']}
                key={city}
                onClick={() => handleOnClick(city)}
              >
                {city}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
