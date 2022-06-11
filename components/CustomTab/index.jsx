import React from 'react';
import styles from '../../styles/CustomTab.module.css';

function CustomTab({ text, active, handleOnChange }) {
  return (
    <div className={`${styles.container} ${active && styles.active}`} onClick={handleOnChange}>
      <text>{text}</text>
    </div>
  );
}

export default CustomTab;
