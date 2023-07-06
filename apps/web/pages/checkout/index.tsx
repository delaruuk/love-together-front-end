import { ReactElement } from "react";
import { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";

const Index: NextPageWithLayout = () => {
	return (
		<div className="h-full grid place-items-center">
			<PaymentForm
				applicationId="sandbox-sq0idb-Bvqk4YFMtxz_rPUg5gw5tw"
				cardTokenizeResponseReceived={(token, verifiedBuyer) => {
					console.log("token:", token);
					console.log("verifiedBuyer:", verifiedBuyer);
				}}
				locationId="LYXXVE9W6N253"
			>
				<CreditCard />
			</PaymentForm>
		</div>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
