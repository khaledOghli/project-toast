import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';

import ToastShelf from '../ToastShelf';
import FocusLock from 'react-focus-lock';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];
export const ToastContext = React.createContext()

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('notice');
  const [list, setList] = React.useState([])
  function setToaster() {
    setList(
      [
        ...list,
        {
          id: crypto.randomUUID(),
          message,
          variant,
        }
      ]
    )
  }
  function clearAllToast() {
    return setList([]);
  }

  useEscapeKey(clearAllToast);
  return (
    <ToastContext.Provider value={[list, setList]}>
      <FocusLock>
        <div className={styles.wrapper}>
          <header>
            <img alt="Cute toast mascot" src="/toast.png" />
            <h1>Toast Playground</h1>
          </header>

          <div className={styles.controlsWrapper}>
            <div className={styles.row}>
              <label
                htmlFor="message"
                className={styles.label}
                style={{ alignSelf: 'baseline' }}
              >
                Message
              </label>
              <div className={styles.inputWrapper}>
                <textarea id="message" className={styles.messageInput}
                  value={message}
                  onInput={(event) => setMessage(event.target.value)}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.label}>Variant</div>
              <div
                className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              >
                {
                  VARIANT_OPTIONS.map((v, i) => {
                    return (
                      <label key={i} htmlFor={`variant-${v}`}>
                        <input
                          id={`variant-${v}`}
                          type="radio"
                          name="variant"
                          value={v}
                          checked={variant === v}
                          onChange={() => setVariant(v)}
                        />
                        {v}
                      </label>
                    )
                  })
                }
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.label} />
              <div
                className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              >
                <Button type="button" onClick={setToaster}>Pop Toast!</Button>
              </div>
            </div>
          </div>

          {
            list.length > 0 && (
              <ToastShelf list={list} />
            )
          }

        </div>
      </FocusLock>
    </ToastContext.Provider>
  );
}


function useEscapeKey(callback) {
  React.useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [callback]);
}
export default ToastPlayground;
