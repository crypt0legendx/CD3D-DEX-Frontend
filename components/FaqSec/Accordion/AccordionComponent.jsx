import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandLessIcon from "../FaqComponents/ExpandLessIcon";
import ExpandMoreIcon from "../FaqComponents/ExpandMoreIcon";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  //border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },

  marginBottom: "20px",
  border: "0",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 15px 0px #cccccca8",
  borderRadius: "5px",
  "& .MuiAccordionSummary-content": {
    order: "1",
  },
  "& .MuiAccordionSummary-root": {
    display: "flex",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0px 0px 40px rgba(112, 144, 176, 0.15)",
    padding: " 0px 10px",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(0deg) !important",
  },
  "& .MuiAccordionDetails-root": {
    border: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions({ faqData }) {
  const [expanded, setExpanded] = React.useState(1);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {faqData.map((ques) => (
        <Accordion
          expanded={expanded === ques.id}
          onChange={handleChange(ques.id)}
          key={ques.id}
        >
          <AccordionSummary
            expandIcon={
              expanded === ques.id ? <ExpandLessIcon /> : <ExpandMoreIcon />
            }
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography>{ques.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{ques.answers}</Typography>
            {ques.answerData.length > 0 ? (
              <ul>
                {ques.answerData.map((answer, index) => (
                  <li key={index}>{answer} </li>
                ))}
              </ul>
            ) : null}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
