// style
import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles['loading']}>
      <div className={styles['lds-roller']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
