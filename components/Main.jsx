import styles from "./Main.module.css";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Vinyl from "./Vinyl";
import TrackInfos from "./TrackInfos";
import Footer from "./Footer";

const Main = () => {
	const store = useSelector((state) => state);
	const router = useRouter();
	const backgroundGradient =
		store.player.playlist?.songs[store.player.currentSongIndex].colors?.c1;

	return (
		<div className={styles.container}>
			<div
				style={
					router.pathname == "/"
						? {
								display: "flex",
								background: `${backgroundGradient}`,
						  }
						: { display: "none" }
				}
				className={styles.main}
			>
				<TrackInfos />
				<Vinyl />
			</div>
			<Footer />
		</div>
	);
};

export default Main;
