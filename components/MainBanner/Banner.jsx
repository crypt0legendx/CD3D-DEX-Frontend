import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import styles from "../../styles/mainBanner.module.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ReactPlayer from "react-player";
import Image from "next/image";

const Banner = () => {
  const handleOnClick = () => {
    window.open(
      "https://app.apeswap.finance/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x9108c36DC1DCbf08187D4f4D4579D72e6A35d979"
    );
  };
  return (
    <div className={styles.mainBanner}>
      <Container fixed>
        <Grid container spacing={2}>
          <div className={styles.bannerInner}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h4" gutterBottom component="h3">
                Where <span>DeFi</span> and<span> Gaming</span> meet{" "}
                <i>Play. Trade. Hold. WIN.</i>
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="p">
                The official DeFi launchpad & token of the CinemaDraft game
              </Typography>
              <Button
                variant="contained"
                className={styles.LikeWin}
                onClick={handleOnClick}
              >
                <Typography variant="subtitle1" className={styles.winningBtn}>
                  I Like Winning
                </Typography>
              </Button>
              <Link
                href="https://tokpie.io/blog/cinemadraft/#How_to_buy_CD3D_with_Bank_Card_or_Apple_Pay"
                target="_blank"
                rel="noopener"
              >
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    justifyItems: "center",
                    width: "260px",
                    height: "40px",
                    alignItems: "center",
                    margin: "0 auto",
                    padding: "0",
                    position: "relative",
                    top: "10px",
                    left: "5px",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "20px",
                      paddingRight: "5px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <Image
                      src={"/assets/homepage/VisaLogo/visa.png"}
                      alt={"visa logo"}
                      height={"30px"}
                      width={"78px"}
                      objectFit={"contain"}
                    />
                  </div>
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <Image
                      src={"/assets/homepage/MasterCardLogo/mastercard.png"}
                      alt={"mastercard logo"}
                      height={"30px"}
                      width={"49px"}
                      objectFit={"contain"}
                    />
                  </div>
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "10px",
                      paddingTop: "15px",
                      paddingBottom: "10px",
                    }}
                  >
                    <Image
                      src={"/assets/homepage/Applepaylogo/applepay.png"}
                      alt={"apple pay logo"}
                      height={"30px"}
                      width={"73px"}
                      objectFit={"contain"}
                    />
                  </div>
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <div className={styles.bannerVideo} style={{ margin: "22px 0" }}>
                <ReactPlayer
                  url="https://youtu.be/ColLJVtLm6E"
                  playIcon={<PlayCircleOutlineIcon />}
                />
              </div>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
