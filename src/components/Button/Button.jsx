/* eslint-disable react/prop-types */
import classNames from 'classnames';
import styles from './Button.module.scss';

export const Button = ({ text, classes, ...props }) => {
  const classList = classes ? classes.split(' ') : [];

  const buttonClasses = classNames(
    ...classList.map((classItem) =>
      styles[classItem] ? styles[classItem] : classItem
    )
  );

  return (
    <>
      <button className={buttonClasses} {...props}>
        {text ? text : 'Button'}
      </button>
    </>
  );
};
