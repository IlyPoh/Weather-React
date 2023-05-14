import { Button } from '/src/components/Button/Button';
import { WeatherList } from '/src/components/WeatherList/WeatherList';
import styles from './weather.module.scss';

export const Weather = () => {
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
              <Button text="Your city weather" classes={`btn btn-tranparent`} />
            </div>
          </div>
          <div className={styles['block']}></div>
        </div>
        <div className={styles['section']}>
          <div className={styles['current-block']}>
            <div className={styles['current']}>
              <div className={styles['current-temperature']}>
                <span className={styles['temperature']}></span>
              </div>
              <div className={styles['current-state']}></div>
            </div>
          </div>
        </div>
        <div className={styles['section']}></div>
      </div>
    </>
  );
};
