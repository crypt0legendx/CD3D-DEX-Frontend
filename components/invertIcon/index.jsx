import React from 'react';
import styles from "../../styles/invertIcon.module.css"


function Invert() {
  return (
    <div className={styles.invertIconContainer}>
      <img src={'/assets/repeat.svg'} alt={''} height={'15px'} />
    </div>
  );
}

export default Invert;
