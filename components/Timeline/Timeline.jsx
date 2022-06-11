import React from "react";
import { TimelineItem } from "./TimelineItem";
import styles from "../../styles/timeline.module.css";
import { timelineData } from "data/data";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
const Timeline = () => {
  return (
    <Container fixed className={styles.outerTimeLine}>
      <Typography variant="h4" gutterBottom component="h4">
        Roadmap
      </Typography>
      <Typography variant="h6" gutterBottom component="h6">
        <i>“I want to earn enough money that I can get away from everyone.”</i>
      </Typography>
      <Typography variant="subtitle2" gutterBottom component="p">
      – Daniel Plainview, THERE WILL BE BLOOD
      </Typography>
      {timelineData.length > 0 && (
        <>
          <div className={styles.timelineContainer}>
            {timelineData.map((data) => (
              <TimelineItem data={data} key={data.id} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default Timeline;
