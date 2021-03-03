import { useState, useEffect } from "react";
import { render } from "react-dom";
import Draggable from "react-draggable";

// Inspired by https://codingartistweb.com/2020/08/interactive-flashlight-html-css-javascript/
export default function Flashlight() {
	const [isGlowing, setIsGlowing] = useState(false); // Initially off

	useEffect(() => {}, [isGlowing]);

	function handleClick() {
		setIsGlowing(!isGlowing);
	}
	return (
		<Draggable defaultPosition={{ x: 200, y: 600 }}>
			<div style={flashlightStyles.container}>
				<div style={flashlightStyles.flashlight}>
					<div style={flashlightStyles.upper}>
						<div style={flashlightStyles.s1}></div>
					</div>
					<div style={flashlightStyles.lower}></div>
					<div style={flashlightStyles.flashlightBody}>
						<button
							type="button"
							style={flashlightStyles.button}
							onClick={handleClick}></button>
						<div style={flashlightStyles.s2}></div>
					</div>
					{isGlowing && <div id="light" style={flashlightStyles.light}></div>}
				</div>
			</div>
		</Draggable>
	);
}

const flashlightStyles = {
	container: {
		transform: "rotate(-45deg) translate(-400px, 700px)",
		// transform: ,
	},
	flashlight: {
		width: "300px",
		height: "300px",
		position: "absolute",
		margin: "auto",
		right: "0",
		left: "0",
		bottom: "145px",
	},
	button: {
		height: "40px",
		width: "40px;",
		backgroundColor: "white",
		position: "relative",
		top: "80px",
		left: "40px",
		borderRadius: "8px",
		outline: "none",
		border: "none",
		boxShadow: "0px 5px #666666",
	},
	upper: {
		backgroundColor: "#8c8c8c",
		height: "50px",
		width: "180px",
	},
	lower: {
		height: "0px",
		width: "120px",
		borderTop: "80px solid #595959",
		borderLeft: "30px solid transparent",
		borderRight: "30px solid transparent",
	},
	light: {
		height: "100px",
		width: "320px",
		borderTop: "300px solid #FFFFAA",
		borderLeft: "70px solid transparent",
		borderRight: "70px solid transparent",
		position: "relative",
		bottom: "740px",
		right: "70px",
		visibility: "visible",
	},
	s1: {
		backgroundColor: "white",
		height: "15px",
		width: "100%",
		position: "relative",
	},
	s2: {
		backgroundColor: "white",
		height: "15px",
		width: "100%",
		position: "relative",
		top: "210px",
	},
	flashlightBody: {
		height: "310px",
		width: "120px",
		backgroundColor: "#8c8c8c",
		position: "relative",
		left: "30px",
		borderRadius: " 0px 0px 20px 20px",
	},
};
