import React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/draftItem.module.css";

const DraftItem = ({ item }) => {
  return (
    <div className={styles.draftItemSec}>
      <Image src={item.img} alt="What is CD3D?" />
      <Typography variant="h6" gutterBottom component="h6">
        {item.title}
      </Typography>
      <Typography variant="subtitle2" gutterBottom component="p">
        {item.description}
      </Typography>
    </div>
  );
};

export default DraftItem;
