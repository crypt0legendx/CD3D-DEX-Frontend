import React from 'react';
import styles from '../../styles/footer.module.css';
import { Typography } from '@material-ui/core';
function Footer() {
  return (
    <div className={styles.container}>
      <Typography variant='subtitle2' component='p'>
        © CinemaDraft, LLC. All rights reserved.
      </Typography>
    </div>
  );
}

export default Footer;
