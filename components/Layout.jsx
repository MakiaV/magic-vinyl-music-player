import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Playlist from "./Playlist";
import Head from "next/head";
import styles from "./Layout.module.css";
import Link from "next/link";
import Image from "next/image";
import Footer from "./Footer";
import { useRouter } from "next/router";

function Layout({ children }) {
	const [playlists, setPlaylists] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const fetchPlaylists = async () => {
			const response = await fetch("/api");
			const data = await response.json();
			setPlaylists(data);
			console.log("Playlist", data);
		};
		fetchPlaylists();
	}, []);
	return (
		<div className={styles.container}>
			<Head>
				<title>Magic vinyl Music</title>
				<meta name="description" content="Magic vinyl Music App" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<div
				style={
					router.pathname == "/"
						? { display: "none" }
						: { display: "flex" }
				}
			>
				{children}
			</div>
			<Footer playlists={playlists} />
		</div>
	);
}

export default Layout;
