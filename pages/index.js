import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Flashlight from "../components/Flashlight";
import Sun from "../components/Sun";
import ExploreIcon from "@material-ui/icons/Explore";
import RoomIcon from "@material-ui/icons/Room";
import { IconButton, Icon, Modal } from "@material-ui/core";
import texts from "../public/texts";
import Image from "next/image";

export default function Home({ temperature, air }) {
	const [tempData, setTempData] = useState(temperature);
	// const [luxData, setLuxData] = useState(lux);
	const [temp, setTemp] = useState([]);
	const [switchBackground, setSwitchBackground] = useState(false);
	const [backgroundFile, setbackgroundFile] = useState("svevestov.png");
	// const [lux, setLux] = useState([]);

	useEffect(() => {
		setBackground();
	}, [switchBackground]);

	function switchColor() {
		if (switchBackground) {
			setSwitchBackground(false);
		} else {
			setSwitchBackground(true);
		}
	}

	function setBackground() {
		if (air[0].value < 0.5) {
			setbackgroundFile("01-svevestøv.png");
		} else if (air[0].value > 0.5 && air[0].value < 1) {
			setbackgroundFile("03-svevestøv.png");
		} else if (air[0].value > 1 && air[0].value < 10) {
			setbackgroundFile("03-svevestøv.png");
		} else if (air[0].value > 10 && air[0].value < 20) {
			setbackgroundFile("03-svevestøv.png");
		} else if (air[0].value > 20 && air[0].value < 30) {
			setbackgroundFile("10-svevestøv.png");
		} else if (air[0].value > 30 && air[0].value < 40) {
			setbackgroundFile("14-svevestøv.png");
		} else if (air[0].value > 40) {
			setbackgroundFile("17-svevestøv.png");
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
				backgroundColor: switchBackground ? "#0E120F" : "#FAFAFA",
				backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/Bildefiler/${backgroundFile})`,
			}}>
			<div style={{ margin: "1em" }}>
				<TextSnippet texts={texts} />
			</div>
			<Head>
				<title>Forholdene ute innenfra</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
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
					transform: "scale(2)",
					left: "2em",
					bottom: "2em",
					position: "fixed",
					color: "#000000",
				}}
				onClick={handleOpen}>
				<RoomIcon fontSize="large" />
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
					<Image src="/Data.JPG" width={1100} height={1000}></Image>
				</h1>
			</Modal>
		);
	}
}

function TextSnippet({ texts }) {
	let randomInt = Math.floor(Math.random() * Object.keys(texts).length);
	let text = texts[randomInt];
	let lines_raw = text.text.split("\n");
	let lines = [];
	for (let line of lines_raw) {
		lines.push(<p>{line}</p>);
	}

	return (
		<div style={{ zIndex: "1", position: "fixed" }}>
			<h3>{text.title}</h3>
			{lines}
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
	let air = await fetch(
		`https://api.adressaparken.no/v1/sensorDataList?limit=${limit}&offset=0&sensor=PM10`
	).then((res) => res.json());
	let date = new Date().toDateString();
	return {
		props: {
			temperature: temp,
			lux: lux,
			air: air,
		},
	};
}
