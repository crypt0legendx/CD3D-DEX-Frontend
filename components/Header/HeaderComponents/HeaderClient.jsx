import React from "react";
import Image from "next/image";
import {IconButton, Link, Typography} from "@mui/material";
import CinemaLogo from "../../../public/assets/homepage/CinemaLogo.png";
import {styled} from "@mui/material/styles";


const PlayLink = styled(Typography)({
    color: "#FF0144 !important",
    letterSpacing: "2.8px !important",
    fontSize: "14px !important",
    marginRight: "10px !important"
})

const HeaderClient = (props) => {
    return (
        <Link href={"/"} sx={{display: {xs: 'none', sm: 'none', md: 'flex'}}}>
            <IconButton>
                <PlayLink component={"span"}>Play</PlayLink>
                <Image
                    src={CinemaLogo}
                    alt="CinemaLogo"
                    width={130}
                    height={29}
                />
            </IconButton>
        </Link>
    );
}

export default HeaderClient;