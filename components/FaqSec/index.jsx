import React from "react";
import styles from "../../styles/faq.module.css";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "./FaqComponents/ExpandMoreIcon";
// import ExpandLessIcon from "./FaqComponents/ExpandLessIcon";

import Container from "@mui/material/Container";
import { FAQ } from "../../public/data/data";
import CustomizedAccordions from "./Accordion/AccordionComponent";

const FaqSec = () => {
  return (
    <div className={styles.faqOuter} id="FAQ">
      <Container fixed>
        <div className={styles.faqHead}>
          <Typography variant="h4" gutterBottom component="h4">
            Your Questions, Answered
          </Typography>
          <Typography variant="h6" gutterBottom component="h6">
            <i>“A-B-C. A-Always, B-Be, C-Closing.”</i>
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="p">
            Blake, GLENGARRY GLEN ROSS
          </Typography>
        </div>
        <CustomizedAccordions faqData={FAQ} />
      </Container>
    </div>
  );
};

export default FaqSec;
