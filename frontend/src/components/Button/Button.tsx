import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName?: IconProp;
}

const Button = ({ iconName, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.button}>
      {children}
      {iconName && <FontAwesomeIcon icon={iconName} />}
    </button>
  );
};

export default Button;
