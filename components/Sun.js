import Draggable from "react-draggable";
import styles from "./Sun.module.scss";

// Inspired by https://css-irl.info/heatwave-animated-sun-illustration/
export default function Sun() {
	return (
		<Draggable>
			<div className={styles.sun}></div>
		</Draggable>
	);
}
