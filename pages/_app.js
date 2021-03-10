import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<Component {...pageProps}>
			<Head>
				<title>Forholdene ute</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
		</Component>
	);
}

export default MyApp;
