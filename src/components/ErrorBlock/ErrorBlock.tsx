// libraries
import { useSelector } from 'react-redux';

// types
import { AppState } from '../../types/store';

// style
import styles from './ErrorBlock.module.scss';

export const ErrorBlock: React.FC = () => {
  const errorMessage = useSelector(
    (state: AppState): string | null => state.error
  );

  return <div className={styles['error']}>{errorMessage}</div>;
};
