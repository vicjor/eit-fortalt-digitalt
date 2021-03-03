import Draggable from "react-draggable";
import styles from "./Sun.module.scss";
export default function Sun() {
	return (
		<Draggable>
			<div className={styles.sun}></div>
		</Draggable>
	);
}
