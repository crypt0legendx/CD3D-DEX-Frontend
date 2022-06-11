import React, {useCallback} from "react";
import {Stack, Typography} from "@mui/material";
import styles from "../../styles/swap.module.css";
import Image from 'next/image';

const SwapTokenItem = (props) => {
    const {value, onChange, disabled} = props;

    const onClickHandle = useCallback(() => {
        onChange(value);
    });

    const getImage = (val) => {
        let result = "/assets/images/cd3d.png";
        switch (val?.symbol?.toLowerCase()) {
            case "bnb":
                result = "/assets/images/bnb.png";
                break;
            case "busd":
                result = "/assets/images/busd.png";
                break;
            case "cd3d":
                result = "/assets/images/cd3d.png";
                break;
        }
        return result;
    }

    const getDescription = (val) => {
        let result = "CD3D";
        switch (val?.symbol?.toLowerCase()) {
            case "bnb":
                result = "Binance";
                break;
            case "busd":
                result = "Binance USD";
                break;
            case "cd3d":
                result = "CD3D";
                break;
        }
        return result;
    }
    return (
        <Stack className={`${styles.tokenItem} ${disabled ? styles.deactive : styles.active}`} direction={"row"} alignItems={"center"} justifyContent={"space-between"} onClick={() => onClickHandle()}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"start"}>
                <Image src={getImage(value)} width={25} height={25} objectFit={"contain"}/>
                <Typography className={styles.typography1} component={"span"}>{value?.symbol}</Typography>
            </Stack>
            <Typography className={styles.typography2} component={"span"}>{value?.name}</Typography>
        </Stack>
    );
}

export default SwapTokenItem;
