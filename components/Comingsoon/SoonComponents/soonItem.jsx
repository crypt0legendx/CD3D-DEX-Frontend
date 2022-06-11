import React from "react";
import styles from "../../../styles/soon.module.css";
import Typography from "@mui/material/Typography";

const soonItem = ({ name, time }) => {
  return (
    <div className={styles.soonItem}>
      <Typography
        variant="subtitle2"
        className={styles.title1}
        gutterBottom
        component="p"
      >
        {name}
      </Typography>
      <Typography variant="h5" gutterBottom component="h5">
        {time}
      </Typography>
    </div>
  );
};

export default soonItem;
