// libraries
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { cityList } from '../../utils/constants';
import { fetchCityByName } from '../../store/actions';

// style
import styles from './WeatherList.module.scss';

export const WeatherList: React.FC = () => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const currentCity = useSelector((state: any) => state.city);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const listClass = dropdown
    ? `${styles['list']}`
    : `${styles['list']} ${styles['hidden']}`;

  const handleOnClick = (city: string) => {
    dispatch(fetchCityByName(city));
  };

  return (
    <>
      <div className={styles['city']}>
        <div className={styles['city-selected']} onClick={toggleDropdown}>
          {currentCity?.name}
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
