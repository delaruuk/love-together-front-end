type PageProps = {};
import React, { useState } from "react";
import axios from "axios";

import { Document, Page } from "react-pdf";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";

const Index: NextPageWithLayout = ({}: PageProps) => {
	const [privacyPolicy, setPrivacyPolicy] = useState(
		"https://res.cloudinary.com/ddrwaqipm/image/upload/v1679623286/Love_Together_Files/Privacy_Notice_Rev_bkqfr7.pdf"
	);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const grabDocs = async () => {
		let privacyPolicy = await axios.get(
			"http://localhost:8080/adminInfo/name",
			{
				params: {
					name: "Privacy Policy",
				},
			}
		);
		setPrivacyPolicy(privacyPolicy.data.fileUrl);
	};
	return (
		<div>
			<h2>Privacy policy page</h2>
			<p>hello</p>
			<button onClick={grabDocs}>Grab Docs</button>
			<object data={privacyPolicy}></object>
		</div>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
