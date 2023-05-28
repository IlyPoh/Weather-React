// libraries
import { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';

// components
import { Image } from '../../components/Image/Image';
import { Button } from '../../components/Button/Button';
import { Loading } from '../../components/Loading/Loading';
import { ErrorBlock } from '../../components/ErrorBlock/ErrorBlock';
import { WeatherList } from '../../components/WeatherList/WeatherList';
import { cityList } from '../../utils/constants';
import { getUserGeolocation } from '../../helpers/helpers';
import pressureIcon from '../../assets/images/icon-pressure.svg';
import directionIcon from '../../assets/images/icon-direction-pointer.svg';
import { handleLoading } from '../../store/actions';

// types
import { AppState, WeatherActionTypes } from '../../types/store';

// style
import styles from './weather.module.scss';

export const Weather: React.FC = () => {
  const dispatch: ThunkDispatch<null, AppState, WeatherActionTypes> =
    useDispatch();
  const state = useSelector((state: AppState) => state);
  const { city, error, loading }: AppState = state;

  useEffect((): void => {
    getUserGeolocation(dispatch, cityList);
    dispatch(handleLoading(true));
  }, [dispatch]);

  const handleOnClick = (): void => {
    localStorage.removeItem('userCity');
    getUserGeolocation(dispatch, cityList);
  };

  return (
    <>
      <div className={styles['content']}>
        {error && <ErrorBlock />}
        {loading && <Loading />}
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
                    src={`${directionIcon}`}
                    alt="Direction Icon"
                    style={{ transform: `rotate(${city?.wind.deg}deg)` }}
                  />
                  {`${city?.wind.speed} m/s ${city?.windDirection}`}
                </span>
              </div>
              <div className={styles['additional-info-section']}>
                <span
                  className={`${styles['icon-pressure']} ${styles['icon']}`}
                >
                  <img src={`${pressureIcon}`} alt="Pressure Icon" />
                </span>
                {`${city?.main.pressure} hPa`}
              </div>
              <div
                className={styles['additional-info-section']}
              >{`Humidity: ${city?.main.humidity}%`}</div>
              <div
                className={styles['additional-info-section']}
              >{`Dew point: ${city?.dew}° C`}</div>
              <div
                className={styles['additional-info-section']}
              >{`Visibility: ${city?.visibility}km`}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
