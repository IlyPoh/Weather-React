// libraries
import classNames from 'classnames';

// style
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  classes?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text = 'Button',
  classes = '',
  ...props
}) => {
  const classList = classes.split(' ');

  const buttonClasses = classNames(
    ...classList.map((classItem) =>
      styles[classItem] ? styles[classItem] : classItem
    )
  );

  return (
    <button className={buttonClasses} {...props}>
      {text}
    </button>
  );
};
