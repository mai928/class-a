import { Lato } from "next/font/google";
import "../globals.css";
import FirstNav from "@/components/FirstNav";
import SecondNav from "@/components/SecondNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import initTranslations from "../i18n";
import { dir } from "i18next";
import TranslationsProvider from "@/components/TranslationsProvider/TranslationsProvider";

const lato = Lato({
	subsets: ["latin-ext"],
	weight: ["400", "700"], // Specify the weights you want to use
});

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

const i18nNamespaces = ["home"];
export default async function RootLayout({ children, params }) {
	const { locale } = params;

	const { resources, t } = await initTranslations(locale, i18nNamespaces);

	return (
		<html lang={locale} dir={dir(locale)}>
			<body className={lato.className}>
				<TranslationsProvider
					namespaces={i18nNamespaces}
					locale={locale}
					resources={resources}
				>
					<section>
						<Header />
						{children}
						<Footer />
					</section>
				</TranslationsProvider>
			</body>
		</html>
	);
}