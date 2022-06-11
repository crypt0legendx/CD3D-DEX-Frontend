import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";

function SocialLink({ elem }) {
  return (
    <>
      <a href={elem.link} target="_blank">
        <Image src={elem.img} alt="Picture of the author" />
      </a>
      <Typography variant="subtitle2" gutterBottom component="p">
        {elem.title}
      </Typography>
    </>
  );
}

export default SocialLink;
