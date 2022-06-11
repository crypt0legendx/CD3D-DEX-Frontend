import Countdown from "react-countdown";
import { renderer } from "./CounterRander";
import styles from "../../styles/counter.module.css";
import {
	newRenderer,
	newOneRenderer,
	newSecondRenderer,
	newThirdRenderer,
	newFourthRenderer,
} from "./NewCounterRander";

export default function Counter({ hours, minutes, seconds }) {
	var myDateObj = new Date("Mar 30, 2022 10:00:00:000 GMT");
	return (
		<div className={styles.timeOuter}>
			<Countdown date={myDateObj.getTime()} renderer={renderer} />
		</div>
	);
}

export const NewCounter = ({ hours, minutes, seconds }) => {
	let myDateObj = new Date("Oct 8, 2021 12:00:00:000 GMT");

	return (
		<div className={styles.timeOuterNew}>
			<Countdown date={myDateObj.getTime()} renderer={newRenderer} />
		</div>
	);
};

export const SecondCounter = ({ hours, minutes, seconds }) => {
	let myDateObj = new Date("Oct 8, 2021 12:00:00:000 GMT");

	return (
		<div className={styles.timeOuter1}>
			<Countdown date={myDateObj} renderer={newOneRenderer} />
		</div>
	);
};

export const ThirdCounter = ({ hours, minutes, seconds }) => {
	let myDateObj = new Date("Oct 8, 2021 21:00:00:000 GMT");

	return (
		<div className={styles.timeOuter2}>
			<Countdown date={myDateObj} renderer={newSecondRenderer} />
		</div>
	);
};

export const FourthCounter = ({ hours, minutes, seconds }) => {
	let myDateObj = new Date("Nov 15, 2021 17:00:00:000 GMT");

	return (
		<div className={styles.timeOuter2}>
			<Countdown date={myDateObj} renderer={newFourthRenderer} />
		</div>
	);
};
