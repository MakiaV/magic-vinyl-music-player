import React from "react";
import styles from "../styles/About.module.css";
import { BiCopyright } from "react-icons/bi";

function About() {
	const dt = new Date();

	return (
		<div className={styles.container}>
			<div className={styles.attribution}>
				<h1>Music Attribution</h1>

				<p>
					Music I Use:
					<a
						href="https://www.bensound.com/free-music-for-videos"
						target="_blank"
						rel="noreferrer"
						className={styles.bensoundLink}
					>
						https://www.bensound.com/free-music-for-videos
					</a>
				</p>
				<p>Music by Bensound.com</p>
				<p>Royalty Free Music by Benjamin Tissot</p>
				<div className={styles.copyright}>
					<BiCopyright />
					<span>{dt.getFullYear()} Magic Vinyl</span>
				</div>
			</div>
		</div>
	);
}

export default About;
