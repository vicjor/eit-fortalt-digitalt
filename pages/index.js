import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Flashlight from "../components/Flashlight";
import Sun from "../components/Sun";
import ExploreIcon from "@material-ui/icons/Explore";
import { IconButton, Icon } from "@material-ui/core";
import texts from "../public/texts";

export default function Home({ data, date }) {
	const [tempData, setData] = useState(data);
	const [temp, setTemp] = useState([]);

	useEffect(() => {
		renderTemperature();
	}, []);

	async function renderTemperature() {
		if (tempData) {
			// document.body.style = "color: white";

			setTemp(
				<ul>
					{data.map((x) => (
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
			}}>
			<Head>
				<title>Forholdene ute</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div style={{ margin: "1em" }}>
				<TextSnippet texts={texts} />
				<h1>Temperaturmålinger i Adressaparken</h1>
				<h2>{date ?? date}</h2>
				{temp && temp}
				<MapButton />
			</div>
			<Sun />
			<Flashlight />
		</div>
	);
}
function MapButton() {
	const [showButton, setShowButton] = useState(true);
	if (showButton) {
		return (
			<IconButton
				style={{
					transform: "scale(3)",
					left: "2em",
					bottom: "2em",
					position: "fixed",
				}}
				onClick={() => setShowButton(!showButton)}>
				<ExploreIcon fontSize="large" />
			</IconButton>
		);
	} else {
		return <></>;
	}
}

function TextSnippet({ texts }) {
	let randomInt = Math.floor(Math.random() * Object.keys(texts).length);
	let text = texts[randomInt];
	return (
		<div>
			<h3>{text.title}</h3>
			<p>{text.text}</p>
			<p style={{ fontStyle: "italic" }}>{text.author}</p>
		</div>
	);
}

export async function getServerSideProps(context) {
	let limit = 20;

	let response = await fetch(
		`https://api.adressaparken.no/v1/sensorDataList?limit=${limit}&offset=0&sensor=TC`
	);
	let temp = await response.json();
	let date = new Date().toDateString();
	return {
		props: {
			data: temp,
			date: date,
		},
	};
}
