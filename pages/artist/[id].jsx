import React, { useEffect, useState } from "react";
import styles from "../../styles/Artist.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

function Artist() {
	const [artist, setArtist] = useState({});
	const router = useRouter();

	const artistID = router.query.id;

	useEffect(() => {
		if (artistID) {
			const fetchArtist = async () => {
				const response = await fetch(`/api/artist/${artistID}`);
				const data = await response.json();
				setArtist(data);
			};
			fetchArtist();
		}
	}, [artistID]);

	return (
		<div className={styles.container}>
			<div className={styles.artistContainer}>
				<div className={styles.card}>
					<div className={styles.coverContainer}>
						<Image
							className={styles.artistImg}
							src={artist?.image}
							width={200}
							height={180}
							alt="artistImg"
						/>
					</div>

					<span className={styles.artistName}>{artist?.name}</span>
				</div>

				<p className={styles.artistDescription}>
					{artist?.description}
				</p>
			</div>
		</div>
	);
}

export default Artist;
