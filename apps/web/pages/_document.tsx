import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* <link rel="manifest" href="/manifest.json" /> */}
				{/* <link rel="apple-touch-startup-image" href="/logo-256x256.png" /> */}
				{/* <link rel="apple-touch-icon" href="/logo-192x192.png" /> */}
				{/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
				{/* <meta name="apple-mobile-web-app-status-bar-style" content="black" /> */}
				<meta name="theme-color" content="#fffdf3" />
				<meta
					name="keywords"
					content="love, relationship, break-up, sex, intimacy, in-laws, divorce, dates, marriage, boyfriend, girlfriend, husband, wife, romance, conflict, care, compassion, validate, acknowledge, stonewalling, counseling, coaching, therapy, together, bond, sacrifice, connect, erectile dysfunction, messy "
				></meta>
				<meta
					name="description"
					content="Relationship strengthening and new partner assessment platform - know yourself, know your impact on your partner, and communicate"
				/>
				<meta
					name="og:description"
					content="Relationship strengthening and new partner assessment platform - know yourself, know your impact on your partner, and communicate"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
