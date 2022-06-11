import React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/useItem.module.css";

const UseItem = ({ item }) => {
  return (
    <div className={styles.itemSec}>
      <Image src={item.img} alt={item.title} />
      <Typography
        variant="h6"
        className={styles.titleItem}
        gutterBottom
        component="h6"
      >
        {item.title}
      </Typography>
      <Typography
        variant="subtitle2"
        className={styles.subtitleItem}
        gutterBottom
        component="p"
      >
        {item.description}
      </Typography>
    </div>
  );
};

export default UseItem;
