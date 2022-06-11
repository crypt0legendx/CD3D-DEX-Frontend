import React from "react";
import styles from "../../../../styles/bidGrid.module.css";
import Typography from "@mui/material/Typography";

const BidGrid = () => {
	return (
		<div className={styles.bidGridOuter}>
			<div className={styles.container}>
				{/* <div className={styles.bidGridItemSkeleton}>
          <Typography variant="subtitle2" gutterBottom component="p">
            MINIMUM BID
          </Typography>
          <Typography variant="h6" gutterBottom component="h6">
            $0.01 BUSD/CD3D
          </Typography>
        </div> */}
				<div className={styles.bidGridItem}>
					<Typography variant="subtitle2" gutterBottom component="p">
						MINIMUM BID
					</Typography>
					<Typography variant="h6" gutterBottom component="h6">
						$0.03 BUSD/CD3D
					</Typography>
				</div>
			</div>

			<div className={styles.container}>
				{/* <div className={styles.bidGridItemSkeleton}>
          <Typography variant="subtitle2" gutterBottom component="p">
            MINIMUM BUY
          </Typography>
          <Typography variant="h6" gutterBottom component="h6">
            $10.00 BUSD
          </Typography>
        </div> */}
				<div className={styles.bidGridItem}>
					<Typography variant="subtitle2" gutterBottom component="p">
						MINIMUM BUY
					</Typography>
					<Typography variant="h6" gutterBottom component="h6">
						$10.00 BUSD
					</Typography>
				</div>
			</div>

			<div className={styles.container}>
				{/* <div className={styles.bidGridItemSkeleton}>
          <Typography variant="subtitle2" gutterBottom component="p">
            MAXIMUM BUY
          </Typography>
          <Typography variant="h6" gutterBottom component="h6">
            $200,000 BUSD
          </Typography>
        </div> */}
				<div className={styles.bidGridItem}>
					<Typography variant="subtitle2" gutterBottom component="p">
						MAXIMUM BUY
					</Typography>
					<Typography variant="h6" gutterBottom component="h6">
						$15,000 BUSD
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default BidGrid;
