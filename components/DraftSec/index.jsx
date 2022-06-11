import React from "react";
import styles from "../../styles/draft.module.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DraftItem from "./DraftComponent/DraftItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { DexSecData } from "../../public/data/data";
import ReactPlayer from "react-player";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

const CustomDivider = styled(Divider)(({ theme }) => ({
  width: "0px",
  height: "61px",
  background: "transparent",
  border: "1px solid #435475",
}));

const DraftSec = () => {
  return (
    <div className={styles.draftSec}>
      <Container fixed>
        <Typography variant="h4" gutterBottom component="h4">
          The stars align at CinemaDraft
        </Typography>
        <Typography variant="h6" gutterBottom component="h6">
          <i>“You are only ever as good to me as the money you make!”</i>
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="p">
          – Micky, 21
        </Typography>

        <div className={styles.draftSecVideo}>
          <ReactPlayer
            url="https://youtu.be/8mwvUl28eQM"
            playIcon={<PlayCircleOutlineIcon />}
            height={452}
            width={820}
          />
        </div>

        <div className={styles.grid}>
          {DexSecData.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  maxWidth: 300,
                }}
              >
                <Typography variant="h5" gutterBottom component="h5">
                  {item.title}
                </Typography>
                <Typography variant="subtitle" gutterBottom component="p">
                  {item.description}
                </Typography>
              </div>
              <div className={styles.divider}>
                {index !== 2 && <CustomDivider orientation="vertical" />}
              </div>
            </div>
          ))}
        </div>
        <a
          href="https://app.apeswap.finance/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x9108c36DC1DCbf08187D4f4D4579D72e6A35d979"
          target="_blank"
        >
          <Button variant="contained" className={styles.DraftitemButton}>
            Marketplace
          </Button>
        </a>
      </Container>
    </div>
  );
};

export default DraftSec;
