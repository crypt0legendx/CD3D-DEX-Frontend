import React, {useState} from "react";
import styles from "../../../styles/farming.module.css";
import {currency} from "../../../utils";
import {Button, InputBase} from "@mui/material";

const FarmingBanner = (props) => {
    const {total, status, onSearch} = props;
    const [search, setSearch] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(search);
    }
    return (
        <div className={styles.bannerContainer}>
            <div className={styles.bannerWrapper}>
                <h1>Stake Liquidity</h1>
                <h1>Pair Tokens to Earn</h1>
                <h1 className={styles.currency}>{currency(total)}</h1>
                <span>Total Value Locked</span>
                <div className={styles.subDiv}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            {status === "searching" && (
                                <div style={{color: "blue", margin: 0, width: "200px"}}>
                                    searching...
                                </div>
                            )}
                            <InputBase
                                label="Email"
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                value={search}
                                placeholder="Search by pool address"
                            />

                            <Button
                                type={"submit"}
                                variant="contained"
                            >
                                Search
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FarmingBanner;
