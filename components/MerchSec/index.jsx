import React from "react";
import styles from "../../styles/merch.module.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { merchData } from "data/data";
import Link from "next/link";

const MerchSec = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className={styles.merchOuter}>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={3}>
            <Typography variant="h4" gutterBottom component="h4">
              Merch
            </Typography>
            <Typography variant="h6" gutterBottom component="h6">
              <i>“You’re so money and don’t even know it!”</i>
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="p">
              - Trent, SWINGERS
            </Typography>
            <div className={styles.merchButton}>
              <Button variant="contained">
                <a href="https://www.cafepress.com/cinemadraft" target="_blank">
                  See All
                </a>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={12} lg={9}>
            <Slider {...settings}>
              {merchData.map((elem) => (
                <div key={elem.id}>
                  <div className={styles.itemSlider}>
                    <Image src={elem.img} alt="Picture of the author" />
                    <Typography variant="subtitle1" gutterBottom component="p">
                      {elem.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="span"
                    >
                      {elem.price}
                    </Typography>
                    <Button variant="text">
                      {elem.price} <ChevronRightIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </Slider>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MerchSec;
