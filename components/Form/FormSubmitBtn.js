import * as React from "react";
import {Button} from "@mui/material";
import styles from "../../styles/form.module.css";

const FormSubmitBtn = (props) => {
    const {label, loading, disabled, onSubmit, fullWidth} = props;
    return (
        <div className={styles.customFormButton}>
            <Button variant="contained" className={loading ? `${styles.loading}` : (disabled ? `${styles.disabled}` : '')} disabled={disabled} onClick={() => onSubmit()} fullWidth={fullWidth}>
                {label}
            </Button>
        </div>
    );
}
export default FormSubmitBtn;

