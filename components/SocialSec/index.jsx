import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styles from "../../styles/social.module.css";
// import Image from "next/image";
// import Twitter from "../../public/assets/homepage/Twitter-Icon.svg";
// import Discord from "../../public/assets/homepage/Discord-Icon.svg";
// import Telegram from "../../public/assets/homepage/Telegram-Icon.svg";
// import Blog from "../../public/assets/homepage/Blog-Icon.svg";
// import Link from "next/link";
import { socialData } from "../../public/data/data";
import SocialLink from "./SocialLink";

const SocialSec = () => {
  return (
    <div className={styles.socialOuter}>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item md={12} lg={5}>
            <Typography variant="h4" gutterBottom component="h4">
              CD3D & Me
            </Typography>
            <Typography variant="h6" gutterBottom component="h6">
              <i>
                “I don’t get it. Why are they confessing?”
                <br /> “They’re not confessing.” <br />
                “They’re bragging.”
              </i>
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="p">
              - Mark Baum, Danny Moses, Porter Collins, THE BIG SHORT
            </Typography>
          </Grid>
          <Grid item md={12} lg={7}>
            <Grid className={styles.socialIcon} container spacing={2}>
              {socialData.map((elem) => (
                <Grid
                  className={styles.socialIconInner}
                  item
                  sm={12}
                  md={3}
                  key={elem.id}
                >
                  <SocialLink key={elem.id} elem={elem} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SocialSec;
