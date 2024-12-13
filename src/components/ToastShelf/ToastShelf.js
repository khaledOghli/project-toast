import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ list }) {
  return (
    <ol
      role="region"
      aria-live="polite"
      aria-label="Notification"
      className={styles.wrapper}>
      {
        list?.map(({ message, variant, id }) => {
          return (
            <li className={styles.toastWrapper}>
              <Toast id={id} variant={variant}>
                {message}
              </Toast>
            </li>
          )
        })}
    </ol>
  );
}

export default ToastShelf;
