import React from "react";
import styles from "../../styles/toke.module.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { dataSource, tokeData, tokeData2 } from "../../public/data/data";
// import { BrowserView, isMobile, MobileView } from "react-device-detect";
import TokonomicsChartMB from "../TokonomicsChartMB/TokonomicsChartMB";
import { isIOS } from "mobile-device-detect";

import PieChart, {
  Series,
  Label,
  Font,
  Connector,
  Legend,
  Title,
} from "devextreme-react/pie-chart";

const addCommas = (nStr) => {
  nStr += "";
  let x = nStr.split(".");
  let x1 = x[0];
  let x2 = x.length > 1 ? "." + x[1] : "";
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
};

const textShown = (arg) => {
  return `<div >
      <p style="color:#ff0144; padding-bottom:20px;  ">${arg.percentText}</p>
      <p ></p>
      <p style="font-size:1rem; line-height:30px; " >${addCommas(arg.value)}</p>
      <p ></p>
      <p>${arg.argument}</p>
  </div>`;
};

const TokeContent = () => {
  const customPalette = [
    "#CC0336",
    "#FFAFC4",
    "#FF799D",
    "#FF4575",
    "#FF0444",
    "#FFD7E2",
  ];
  return (
    <div className={styles.tokeOuter}>
      <Container fixed>
        <Typography variant="h4" gutterBottom component="h4">
          Tokenomics
        </Typography>
        <Typography variant="h6" gutterBottom component="h6">
          <i>
            <q>
              You’re selling the world’s rarest commodity: certainty, in an
              uncertain world.
            </q>
          </i>
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="p">
          – Walter Abrams, TWO FOR THE MONEY
        </Typography>
        {!isIOS && (
          <React.Fragment>
            <TokonomicsChartMB />
            <PieChart
              className={styles.pieChart}
              id="pie"
              palette={customPalette}
              dataSource={dataSource}
            >
              <Series
                argumentField="title"
                valueField="value"
                position={"12px"}
              >
                <Label
                  visible={true}
                  position="columns"
                  customizeText={textShown}
                  backgroundColor="none"
                  className={styles.pieLabel}
                >
                  <Font size={12} color="white" />
                  <Connector visible={true} width={1.5} />
                </Label>
              </Series>
              <Legend visible={false} />
            </PieChart>
          </React.Fragment>
        )}

        <div className={styles.tokeCon}>
          {tokeData.map((elem) => (
            <Grid container key={elem.id} spacing={2}>
              <Grid item sm={12} md={3}>
                <Typography variant="h5" gutterBottom component="h5">
                  {elem.name}
                </Typography>
              </Grid>
              <Grid item sm={12} md={9}>
                <Typography variant="subtitle2" gutterBottom component="p">
                  {elem.desc}
                </Typography>
              </Grid>
            </Grid>
          ))}

          {tokeData2.map((elem) => {
            const { name, desc } = elem;
            return (
              <Grid container key={elem.id} spacing={2}>
                <Grid item sm={12} md={3}>
                  <Typography variant="subtitle2" gutterBottom component="p">
                    {name}
                  </Typography>
                </Grid>
                <Grid item sm={12} md={9}>
                  {desc.map((elem) => (
                    <ul key={elem.id}>
                      <li>
                        {elem.ul}
                        <ul>{elem.li && <li>{elem.li || null}</li>}</ul>
                      </li>
                    </ul>
                  ))}
                </Grid>
              </Grid>
            );
          })}
        </div>
        <div className={styles.tokeButton}>
          <Button variant="contained" className={styles.moreBtn}>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1Ro6mK4MzdSEdwGW05QQW3QPbRFoQwtrN/view?usp=sharing"
              rel="noopener noreferrer"
            >
              More Details
            </a>
          </Button>
          <Button variant="text">
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1zdv58QhdR_2sz4q0Ex1S1H8ZuFLhTUZi/view?usp=sharing"
              rel="noopener noreferrer"
            >
              Some Details
            </a>
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default TokeContent;
