import React from "react";
import styles from "../../styles/cd3d.module.css";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import WhatIll from "../../public/assets/homepage/WhatIll.svg";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";

const Cd3dSec = () => {
  return (
    <div className={styles.CdOuter}>
      <Container>
        <Typography variant="h4" gutterBottom component="h4">
          What is CD3D?
        </Typography>
        <Typography variant="h6" gutterBottom component="h6">
          “I had the most absurd nightmare. I was poor and no one liked me.”
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="p">
          - Louis Winthrope III, TRADING PLACES
        </Typography>

        <div className={styles.CdRow}>
          <Image src={WhatIll} alt="What is CD3D?" />
          <div className={styles.whatCon}>
            <Typography variant="subtitle2" gutterBottom component="p">
              The in-game token for the CinemaDraft gaming platform that also
              doubles as the star of your DeFi portfolio.
            </Typography>
            <ul>
              <li>BUSD-based: USD stablecoin on Binance Smart Chain</li>
              <li>whale-free: max transaction = 0.15% of token supply</li>
              <li>HODL-friendly: 5% added fee to sell </li>
              <li>
                crazy deflationary: 10% transaction fee
                <ul>
                  <li>6% in dividends </li>
                  <li>1.6% in buyback & burn</li>
                  <li>2.4% burned to reduce supply</li>
                </ul>
              </li>
            </ul>
            <Typography variant="subtitle2" gutterBottom component="p">
              CD3D is the native, in-app token for the CinemaDraft daily fantasy
              sports (DFS)-style entertainment gaming platform featuring your
              favorite Hollywood stars.
            </Typography>
          </div>
        </div>
        <Typography variant="h4" gutterBottom component="h4">
          <i>Shall. We. Play. A. Game?</i>
        </Typography>
        <Button variant="contained">
          <a
            target="_blank"
            href="https://cinemadraft.co"
            rel="noopener noreferrer"
          >
            Play CinemaDraft
          </a>
        </Button>
      </Container>
    </div>
  );
};

export default Cd3dSec;
