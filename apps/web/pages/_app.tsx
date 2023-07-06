import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "context";
import Head from "next/head";
import { NextPageWithLayout } from "models";
import { ReactQueryDevtools } from "react-query/devtools";
import ProtectedRoute from "ui/RouteWrapper/ProtectedRoute";
import React from "react";

import "../../../packages/css/globals.css";
import "../../../packages/css/landing-page.css";

import Image from "next/image";
import TitleText from "ui/Text/TitleText";

const logo = require("assets/logo.png");
const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
				<title>Love Together</title>
				<link rel="icon" href={logo.default.src} />
			</Head>
			{/* <div className="p-4 h-full w-full grid place-content-center">
				<div className="flex flex-col justify-center items-center">
					<Image width={200} height={200} src={logo} alt="Love Together" />
					<TitleText
						className="pt-4 text-center"
						text="Love together is currently in maintenance"
					/>
				</div>
			</div> */}
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ProtectedRoute>
						{getLayout(<Component {...pageProps} />)}
					</ProtectedRoute>
				</AuthProvider>
				<ReactQueryDevtools></ReactQueryDevtools>
			</QueryClientProvider>
		</>
	);
}
