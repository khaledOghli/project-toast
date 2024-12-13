import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';
import { ToastContext } from '../ToastPlayground';
import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ id, variant = "notice", children }) {
  const VARIANT = ICONS_BY_VARIANT[variant];
  const [list, setList] = React.useContext(ToastContext);
  function clearToast() {
    return setList(list.filter(l => l.id !== id))
  }
  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <VARIANT size={24} />
      </div>
      <p className={styles.content}>
        {children}
      </p>

      <button onClick={clearToast} className={styles.closeButton}
        aria-label="Dismiss message"
        aria-live="off">
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default React.memo(Toast);
