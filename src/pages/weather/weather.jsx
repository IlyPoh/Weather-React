// libraries
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { Button } from '/src/components/Button/Button';
import { cityList } from '/src/utils/constants';
import directionIcon from '/src/assets/images/icon-direction-pointer.svg';
import { ErrorBlock } from '/src/components/ErrorBlock/ErrorBlock';
import { getUserGeolocation } from '/src/helpers/helpers';
import { Image } from '/src/components/Image/Image';
import { Loading } from '/src/components/Loading/Loading';
import pressureIcon from '/src/assets/images/icon-pressure.svg';
import { WeatherList } from '/src/components/WeatherList/WeatherList';

// style
import styles from './weather.module.scss';

export const Weather = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const city = state?.city;
  const error = state?.error;
  const loading = state?.loading;

  useEffect(() => {
    getUserGeolocation(dispatch, cityList);
  }, [dispatch]);

  const handleOnClick = () => {
    localStorage.removeItem('userCity');
    getUserGeolocation(dispatch, cityList);
  };

  return (
    <>
      <div className={styles['content']}>
        <div className={styles['section']}>
          <div className={styles['logo']}>
            <h1>Weather app</h1>
          </div>
        </div>
        <div className={`${styles['section']} ${styles['header']}`}>
          <div className={styles['block']}>
            <WeatherList />
          </div>
          <div className={styles['block']}>
            <div className={styles['local-city']}>
              <Button
                text="Your city weather"
                classes={`btn btn-tranparent`}
                onClick={handleOnClick}
              />
            </div>
          </div>
          <div className={styles['block']}>
            <Image
              size={[100, 100]}
              src={
                city?.icon
                  ? `https://openweathermap.org/img/wn/${city?.icon}@2x.png`
                  : ''
              }
            />
          </div>
        </div>
        <div className={`${styles['section']} ${styles['body']}`}>
          <div className={styles['current']}>
            <div className={styles['temperature']}>{`${city?.temp}° C`}</div>
            <div>{city?.secondState}</div>
          </div>
        </div>
        <div className={`${styles['section']} ${styles['footer']}`}>
          <div className={styles['information']}>
            <div className={styles['time']}>{city?.time}</div>
            <div className={styles['city']}>{city?.fullname}</div>
            <div className={styles['temperature']}>
              <Image
                size={[60, 60]}
                src={
                  city?.icon
                    ? `https://openweathermap.org/img/wn/${city?.icon}@2x.png`
                    : ''
                }
              />
              {`${city?.temp}° C`}
            </div>
            <div
              className={styles['info']}
            >{`Feels like ${city?.feelsLike}° C. ${city?.state}. ${city?.secondState}`}</div>
            <div className={styles['additional-info']}>
              <div className={styles['additional-info-section']}>
                <span
                  className={`${styles['icon-direction']} ${styles['icon']}`}
                >
                  <img
                    src={directionIcon}
                    style={{ transform: `rotate(${city?.windDeg}deg)` }}
                  />
                  {`${city?.windSpeed} m/s ${city?.windDirection}`}
                </span>
              </div>
              <div className={styles['additional-info-section']}>
                <span
                  className={`${styles['icon-pressure']} ${styles['icon']}`}
                >
                  <img src={pressureIcon} alt="" />
                </span>
                {`${city?.pressure} hPa`}
              </div>
              <div
                className={styles['additional-info-section']}
              >{`Humidity: ${city?.humidity}%`}</div>
              <div
                className={styles['additional-info-section']}
              >{`Dew point: ${city?.dew}° C`}</div>
              <div
                className={styles['additional-info-section']}
              >{`Visibility: ${city?.visibility}km`}</div>
            </div>
          </div>
        </div>
        {error && <ErrorBlock />}
        {loading && <Loading />}
      </div>
    </>
  );
};
