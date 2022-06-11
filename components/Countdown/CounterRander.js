import styles from "../../styles/counter.module.css";
import { NewCounter } from "./Counter";

export const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <NewCounter />;
  } else {
    // Render a countdown
    return (
      <>
        <h3>
          Days<span className={styles.time}>{days}</span>
        </h3>
        <span className={styles.timeMid}>:</span>
        <h3>
          Hours <span className={styles.time}>{hours}</span>
        </h3>
        <span className={styles.timeMid}>:</span>
        <h3>
          Minutes <span className={styles.time}>{minutes}</span>
        </h3>
        <span className={styles.timeMid}>:</span>
        <h3>
          Seconds <span className={styles.time}>{seconds}</span>
        </h3>
      </>
    );
  }
};
