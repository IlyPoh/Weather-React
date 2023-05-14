import { useState } from 'react';
import { cityList } from '../../utils/config';
import styles from './WeatherList.module.scss';

export const WeatherList = () => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const listClass = dropdown
    ? `${styles['list']}`
    : `${styles['list']} ${styles['hidden']}`;

  return (
    <>
      <div className={styles['city']}>
        <div className={styles['city-selected']} onClick={toggleDropdown}>
          Kyiv
        </div>
        <ul className={listClass}>
          {cityList.map((city) => {
            return (
              <li className={styles['item']} key={city}>
                {city}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
