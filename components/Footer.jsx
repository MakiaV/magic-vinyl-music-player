import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import Playlist from "./Playlist";
import Image from "next/image";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectSongFromPlaylist } from "@/redux/features/playerSlice";

const Footer = () => {
	const [playlists, setPlaylists] = useState([]);
	const store = useSelector((state) => state);
	const dispatch = useDispatch();
	const playlistSongs = store.player.selectedPlaylist?.songs;
	const selectedPlaylist = store.player.selectedPlaylist;

	const controlsColor =
		store.player.playlist?.songs[store.player.currentSongIndex].colors?.c2;
	const colorProgress1 =
		store.player.playlist?.songs[store.player.currentSongIndex].colors?.c3;
	const colorProgress2 =
		store.player.playlist?.songs[store.player.currentSongIndex].colors?.c4;

	useEffect(() => {
		const fetchPlaylists = async () => {
			const response = await fetch("/api");
			const data = await response.json();
			setPlaylists(data);
		};
		fetchPlaylists();
	}, []);

	return (
		<div className={styles.footer}>
			<div className={styles.footerLeft}>
				<span className={styles.footerLeftTitle}>PLAYLISTS</span>
				<div className={styles.playlists}>
					{playlists?.map((playlist) => (
						<div key={playlist.id}>
							<Playlist
								playlist={playlist}
								controlsColor={controlsColor}
							/>
						</div>
					))}
				</div>
			</div>
			<div className={styles.footerRight}>
				<div className={styles.songsContainer}>
					{playlistSongs?.map((song, index) => (
						<div className={styles.songVinyl} key={song.id}>
							<Image
								className={styles.songVinylImg}
								src={song.cover}
								width={100}
								height={100}
								alt="cover"
							/>
							<div
								style={
									JSON.stringify(
										store.player.playlistSongs
									) ===
										JSON.stringify(
											selectedPlaylist.songs.map(
												(song) => song.songSrc
											)
										) &&
									store.player.playlistIsPlaying &&
									store.player.currentSongIndex == index
										? {
												display: "none",
												opacity: "1",
										  }
										: {}
								}
								className={styles.songTitle}
							>
								<span>{song.title}</span>
							</div>
							<span className={styles.btnIndexEqua}>
								<span className={styles.btn}>
									{JSON.stringify(
										store.player.playlistSongs
									) ===
										JSON.stringify(
											selectedPlaylist.songs.map(
												(song) => song.songSrc
											)
										) &&
									store.player.playlistIsPlaying &&
									store.player.currentSongIndex === index ? (
										<MdPause
											size={20}
											style={{ cursor: "pointer" }}
											className={styles.playPause}
											onClick={() => {
												dispatch(
													selectSongFromPlaylist({
														selectedPlaylist,
														index,
													})
												);
											}}
										/>
									) : (
										<MdPlayArrow
											size={20}
											style={{ cursor: "pointer" }}
											className={styles.playPause}
											onClick={() => {
												dispatch(
													selectSongFromPlaylist({
														selectedPlaylist,
														index,
													})
												);
											}}
										/>
									)}
								</span>

								<span className={styles.equalizer}>
									{JSON.stringify(
										store.player.playlistSongs
									) ===
										JSON.stringify(
											selectedPlaylist.songs.map(
												(song) => song.songSrc
											)
										) &&
										store.player.playlistIsPlaying &&
										store.player.currentSongIndex ===
											index && (
											<svg
												width="20px"
												height="20px"
												viewBox="0 0 100 100"
												preserveAspectRatio="xMidYMid"
											>
												<g transform="rotate(180 50 50)">
													<rect
														x="9.166666666666668"
														y="12.5"
														width="15"
														height="40"
														fill="#e3f1ff"
													>
														<animate
															attributeName="height"
															calcMode="spline"
															values="50;75;10;50"
															dur="0.8695652173913042s"
															keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
															repeatCount="indefinite"
															begin="-0.6956521739130435s"
														></animate>
													</rect>
													<rect
														x="25.833333333333336"
														y="12.5"
														width="15"
														height="40"
														fill={colorProgress2}
													>
														<animate
															attributeName="height"
															calcMode="spline"
															values="50;75;10;50"
															dur="0.8695652173913042s"
															keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
															repeatCount="indefinite"
															begin="-0.5217391304347825s"
														></animate>
													</rect>
													<rect
														x="42.5"
														y="12.5"
														width="15"
														height="40"
														fill={colorProgress1}
													>
														<animate
															attributeName="height"
															calcMode="spline"
															values="50;75;10;50"
															dur="0.8695652173913042s"
															keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
															repeatCount="indefinite"
															begin="-0.34782608695652173s"
														></animate>
													</rect>
													<rect
														x="59.16666666666667"
														y="12.5"
														width="15"
														height="40"
														fill={controlsColor}
													>
														<animate
															attributeName="height"
															calcMode="spline"
															values="50;75;10;50"
															dur="0.8695652173913042s"
															keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
															repeatCount="indefinite"
															begin="0s"
														></animate>
													</rect>
													<rect
														x="75.83333333333333"
														y="12.5"
														width="15"
														height="40"
														fill={controlsColor}
													>
														<animate
															attributeName="height"
															calcMode="spline"
															values="50;75;10;50"
															dur="0.8695652173913042s"
															keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
															repeatCount="indefinite"
															begin="-0.17391304347826086s"
														></animate>
													</rect>
												</g>
											</svg>
										)}
								</span>
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Footer;
