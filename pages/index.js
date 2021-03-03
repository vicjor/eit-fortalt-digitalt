import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Flashlight from "../components/Flashlight";
import Sun from "../components/Sun";

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
		<div style={{ margin: "1em", overflowX: "hidden" }}>
			<Sun />
			<Flashlight />
			<h1>Temperaturmålinger i Adressaparken</h1>
			<h2>{date ?? date}</h2>
			<h3>Klokkeslett | Temparatur</h3>
			{temp && temp}
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
