import React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styles from "../../styles/timeline.module.css";

export const TimelineItem = ({ data }) => {
	return (
		<>
			<div className={styles.timelineItem}>
				<div className={styles.timelineItemContent}>
					<time>{data.name}</time>
					{data.description.map((elem) => (
						<div>
							<p key={elem.id}>{elem.text}</p>
						</div>
					))}
					<div className={styles.arrowPoint}>
						<ExpandLessIcon />
					</div>
					<span className={styles.circle} />
				</div>
			</div>
		</>
	);
};
