// libraries
import { useSelector } from 'react-redux';

// style
import styles from './ErrorBlock.module.scss';

export const ErrorBlock: React.FC = () => {
  const errorMessage = useSelector(
    (state: any) => state?.error?.message || state?.error
  );

  return <div className={styles['error']}>{errorMessage}</div>;
};
