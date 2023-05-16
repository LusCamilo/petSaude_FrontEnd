import React from "react";
import { LandingPage } from "./LandingPage";
import { WebFunction } from "./WebFunction";
import { Footer } from "./resource/Footer";

export const HomeWeb = () => {
	return (
		<section>
			<LandingPage />
			<WebFunction />
			<Footer/>
		</section>
	);
};
