import React from "react";
import styles from "../../styles/counter.module.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Counter from "./Counter";
import CustomForm from "../SubscribeMail/CustomForm";

const Countdown = () => {
  return (
    <div className={styles.countOuter}>
      <Container>
        <div className={styles.topText}>
          <Typography variant="h4" gutterBottom component="h4">
            &quot;Money won is twice as sweet as money earned.&quot;
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="p">
            - Fast Eddie Felson, THE COLOR OF MONEY
          </Typography>
        </div>
        <div>
          {/* <Counter /> */}
        </div>

        <div className={styles.bottomText}>
          {/* <Typography variant="h6" gutterBottom component="h6">
            Time until Initial CD3D Offering (ICO) Ends
          </Typography> */}
          <div className={styles.subDiv}>
            <CustomForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Countdown;
