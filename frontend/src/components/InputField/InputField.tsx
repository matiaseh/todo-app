import { InputHTMLAttributes } from 'react';
import styles from './InputField.module.scss';

const InputField = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.inputField}>
      <input {...props} />
    </div>
  );
};

export default InputField;
