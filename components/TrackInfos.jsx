import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./TrackInfos.module.css";
import { useSelector } from "react-redux";

const TrackInfos = () => {
	const store = useSelector((state) => state);
	const artistID =
		store.player.playlist?.songs[store.player.currentSongIndex].artist.id;

	return (
		<div className={styles.trackInfos}>
			{store.player.playlistSongs ? (
				<div className={styles.trackInfoData}>
					<Image
						src={
							store.player.playlist?.songs[
								store.player.currentSongIndex
							].cover
						}
						width={250}
						height={250}
						alt="cover"
						className={styles.trackInfoDataImg}
					/>
					<div className={styles.trackInfoDataRight}>
						<span>
							{
								store.player.playlist?.songs[
									store.player.currentSongIndex
								].genre.name
							}
						</span>

						<span className={styles.trackTitel}>
							{
								store.player.playlist?.songs[
									store.player.currentSongIndex
								].title
							}
						</span>
						<div className={styles.artist}>
							<Image
								src={
									store.player.playlist?.songs[
										store.player.currentSongIndex
									].artist.image
								}
								width={25}
								height={25}
								alt="artistImg"
								className={styles.artistImg}
							/>
							<Link
								className={styles.artistLink}
								href={`/artist/${artistID}`}
							>
								{
									store.player.playlist?.songs[
										store.player.currentSongIndex
									].artist.name
								}
							</Link>
						</div>

						<p className={styles.playlistName}>
							<span>{store.player.playlist.name}</span>
							<span className={styles.dot}>.</span>
							<span>Playlist</span>
						</p>
					</div>
				</div>
			) : (
				<div className={styles.welcome}>
					<div>
						<h1>Welcome to Magic Vinyl</h1>
						<p>Please select a playlist</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default TrackInfos;
