import Image from "next/image";
import styles from "./Playlist.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectedPlaylist } from "@/redux/features/playerSlice";
import { updatePlaylist } from "@/redux/features/playerSlice";
import { MdPause, MdPlayArrow } from "react-icons/md";

function Playlist({ playlist }) {
	const dispatch = useDispatch();
	const store = useSelector((state) => state);
	console.log("Store ds PL", store);
	// console.log("playlist ds PL", playlist);
	return (
		<div
			className={styles.container}
			onClick={() => dispatch(selectedPlaylist({ playlist: playlist }))}
		>
			<div className={styles.vinylCase}>
				<Image
					className={styles.vinylCover}
					src={playlist?.cover}
					height={100}
					width={100}
					alt="cover"
				/>

				<Image
					src="/disc.png"
					height={90}
					width={90}
					alt="vinyl"
					className={styles.vinyl}
				/>
			</div>

			<span>{playlist?.name}</span>
			<div
				className={styles.playPauseBtnContainer}
				style={
					JSON.stringify(store.player.playlist) ===
						JSON.stringify(playlist) &&
					store.player.playlistIsPlaying
						? {
								display: "block",
						  }
						: undefined
				}
			>
				<div
					onClick={(e) => {
						e.stopPropagation();
						dispatch(
							updatePlaylist({
								playlist: playlist,
								currentSongIndex: store.player.currentSongIndex,
							})
						);
					}}
					className={styles.playPauseBtn}
					style={
						JSON.stringify(store.player.playlist) ===
							JSON.stringify(playlist) &&
						store.player.playlistIsPlaying
							? {
									backgroundColor: "skyblue",
							  }
							: undefined
					}
				>
					{JSON.stringify(store.player.playlist) ===
						JSON.stringify(playlist) &&
					store.player.playlistIsPlaying ? (
						<MdPause
							size={25}
							className={styles.playerIcon}
							color="#000"
						/>
					) : (
						<MdPlayArrow
							size={25}
							className={styles.playerIcon}
							color="#000"
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Playlist;
