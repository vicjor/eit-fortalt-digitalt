import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Flashlight from "../components/Flashlight";
import Sun from "../components/Sun";
import ExploreIcon from "@material-ui/icons/Explore";
import { IconButton, Icon, Modal } from "@material-ui/core";
import texts from "../public/texts";
import Image from "next/image";

export default function Home({ temperature, date }) {
	const [tempData, setTempData] = useState(temperature);
	// const [luxData, setLuxData] = useState(lux);
	const [temp, setTemp] = useState([]);
	const [switchBackground, setSwitchBackground] = useState(false);
	// const [lux, setLux] = useState([]);

	useEffect(() => {}, [switchBackground]);

	function switchColor() {
		if (switchBackground) {
			setSwitchBackground(false);
		} else {
			setSwitchBackground(true);
		}
	}

	function renderTemperature() {
		if (tempData) {
			// document.body.style = "color: white";

			setTemp(
				<ul>
					{tempData.map((x) => (
						<li key={x.date} style={{ margin: "1em" }}>
							<strong>{String(x.date).slice(11, 16)} </strong>
							{Math.round(x.value)}º
						</li>
					))}
				</ul>
			);
		}
	}

	return (
		<div
			style={{
				overflowX: "hidden",
				display: "grid",
				gridTemplateColumns: "30% 30% 40%",
				gridTemplateRows: "20% 40% 40%",
				backgroundColor: switchBackground ? "#000000" : "#FAFAFA",
			}}>
			<div style={{ margin: "1em" }}>
				<TextSnippet texts={texts} />
			</div>
			<MapButton />
			<Sun />
			<Flashlight switchColor={switchColor} />
		</div>
	);
}
function MapButton() {
	const [showButton, setShowButton] = useState(true);

	const handleOpen = () => {
		setShowButton(false);
	};
	const handleClose = () => {
		setShowButton(true);
	};
	if (showButton) {
		return (
			<IconButton
				style={{
					transform: "scale(3)",
					right: "2em",
					bottom: "2em",
					position: "fixed",
				}}
				onClick={handleOpen}>
				<ExploreIcon fontSize="large" />
			</IconButton>
		);
	} else {
		return (
			<Modal
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: "1ch",
				}}
				open={true}
				onClose={handleClose}>
				<h1>
					<Image src="/Trondheim-kart.jpg" width={500} height={500}></Image>
				</h1>
			</Modal>
		);
	}
}

function TextSnippet({ texts }) {
	let randomInt = Math.floor(Math.random() * Object.keys(texts).length);
	let text = texts[randomInt];
	return (
		<div style={{ zIndex: "1", position: "fixed" }}>
			<h3>{text.title}</h3>
			<p>{text.text}</p>
			<p style={{ fontStyle: "italic" }}>{text.author}</p>
		</div>
	);
}

export async function getServerSideProps(context) {
	let limit = 20;

	let temp = await fetch(
		`https://api.adressaparken.no/v1/sensorDataList?limit=${limit}&offset=0&sensor=TC`
	).then((res) => res.json());
	let lux = await fetch(
		`https://api.adressaparken.no/v1/sensorDataList?limit=${limit}&offset=0&sensor=LUX`
	).then((res) => res.json());
	let date = new Date().toDateString();
	return {
		props: {
			temperature: temp,
			lux: lux,
			date: date,
		},
	};
}
