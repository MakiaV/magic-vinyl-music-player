import Head from "next/head";
import Navbar from "./Navbar";
import Main from "./Main";
import { useRouter } from "next/router";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<Head>
				<title>Magic Vinyl Music Player</title>
				<meta
					name="description"
					content="Magic Vinyl Player Music App"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/disc.png" />
			</Head>
			<Navbar />
			<div
				style={
					router.pathname == "/"
						? { display: "none" }
						: { display: "block" }
				}
			>
				{children}
			</div>
			<Main />
		</div>
	);
};

export default Layout;
