import React from "react";
import expandMore from "../../../public/assets/homepage/Expand-Icon.svg";
import Image from "next/image";

const ExpandMoreIcon = () => {
  return (
    <>
      <Image src={expandMore} alt="Picture of the author" />
    </>
  );
};

export default ExpandMoreIcon;
