import styles from "../../styles/clearfix.module.css";

const ClearFix = (props) => {
    const {height} = props;
    return (
        <div className={styles.clearfix} style={{height: height + "px"}}/>
    );
}
export default ClearFix;