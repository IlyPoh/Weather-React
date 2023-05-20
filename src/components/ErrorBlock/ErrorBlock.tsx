// libraries
import { useSelector } from 'react-redux';

// style
import styles from './ErrorBlock.module.scss';

export const ErrorBlock = () => {
  const errorMessage = useSelector((state: any) => state?.error?.message);

  return <div className={styles['error']}>{errorMessage}</div>;
};
