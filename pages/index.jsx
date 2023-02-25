import Image from "next/image";

import { css } from "@emotion/css";
import styles from "@/styles/Home.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Playlist from "@/components/Playlist";
import { MdPlayArrow, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { MdPause } from "react-icons/md";

import Link from "next/link";
import {
	playPause,
	nextSong,
	nextSongOnEnded,
	previousSong,
} from "@/redux/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
	// const [duration, setDuration] = useState("0");
	// const [seekTime, setSeekTime] = useState("0");
	// const [appTime, setAppTime] = useState("0");
	// const [volume, setVolume] = useState("0.5");
	// const [progressBar, setProgressBar] = useState(0);
	// const [volumeBarProgress, setVolumeBarProgress] = useState("50");
	// const reactAudioPlayer = useRef(null);
	// const dispatch = useDispatch();
	// const store = useSelector((state) => state);

	// const rotation = `rotation infinite
	// 5s linear`;

	// const pauseRotation = store.player.playlistIsPlaying ? `running` : `paused`;
	// const vinylArm = store.player.playlistIsPlaying
	// 	? `rotate(0deg)`
	// 	: `rotate(-25deg)`;
	// const background1 = null ? `running` : `paused`;
	// const min = "0";
	// const max = duration;

	// const getTime = (time) =>
	// 	`${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

	// const onInput = (event) => setSeekTime(event.target.value);
	// const onTimeUpdate = (event) => {
	// 	setAppTime(event.target.currentTime);
	// 	const time = reactAudioPlayer.current.currentTime;
	// };
	// const onLoadedData = (event) => setDuration(event.target.duration);

	// const playSong = useCallback(() => {
	// 	if (store.player.playlistSongs) {
	// 		setTimeout(function () {
	// 			reactAudioPlayer.current.play();
	// 		}, 0);
	// 	}
	// }, [store.player.playlistSongs]);
	// const pauseSong = useCallback(() => {
	// 	store.player.playlistSongs && reactAudioPlayer.current.pause();
	// }, [store.player.playlistSongs]);

	// const updateIsPlaying = () => {
	// 	dispatch(playPause({}));
	// };
	// const goNextSong = () => {
	// 	dispatch(nextSong({}));

	// 	reactAudioPlayer.current.currentTime = 0;
	// 	pauseSong();
	// 	playSong();
	// };
	// const goNextSongOnEnded = () => {
	// 	dispatch(nextSongOnEnded({}));

	// 	reactAudioPlayer.current.currentTime = 0;
	// 	pauseSong();
	// 	playSong();
	// };
	// const goPreviousSong = () => {
	// 	if (reactAudioPlayer.current.currentTime < 2) {
	// 		dispatch(previousSong({}));
	// 		pauseSong();
	// 		playSong();
	// 	} else {
	// 		reactAudioPlayer.current.currentTime = 0;

	// 		playSong();
	// 	}
	// };
	// useEffect(() => {
	// 	if (store.player.playlistIsPlaying) {
	// 		setProgressBar((parseInt(appTime) / parseInt(duration)) * 100);
	// 		playSong();
	// 	} else {
	// 		pauseSong();
	// 	}
	// }, [
	// 	playSong,
	// 	pauseSong,
	// 	store.player.playlistIsPlaying,
	// 	appTime,
	// 	duration,
	// ]);
	// useEffect(() => {
	// 	if (store.player.playlistSongs) {
	// 		reactAudioPlayer.current.currentTime = 0;
	// 		setProgressBar(0);
	// 		setSeekTime("0");
	// 	}
	// }, [duration, store.player.playlistSongs, store.player.currentSongIndex]);
	// useEffect(() => {
	// 	if (store.player.playlistSongs) {
	// 		reactAudioPlayer.current.currentTime = seekTime;
	// 	}
	// }, [seekTime, store.player.playlistSongs]);

	// useEffect(() => {
	// 	if (store.player.playlistSongs) {
	// 		reactAudioPlayer.current.volume = volume;
	// 	}
	// }, [volume, store.player.playlistSongs]);

	return (
		<div className={styles.container}>
			{/* <div className={styles.trackInfos}>
				<h1>Track Infos</h1>
			</div>
			<div className={styles.vinylContainer}>
				<div className={styles.vinyl}>
					<div
						className={css`
							display: flex;
							width: 300px;
							height: 300px;
							display: flex;
							justify-content: center;
							align-items: center;

							border-radius: 99%;

							animation: ${rotation};
							animation-play-state: ${pauseRotation};

							@keyframes rotation {
								from {
									transform: rotate(0deg);
								}
								to {
									transform: rotate(360deg);
								}
							}
							background: #17171a;
							box-shadow: inset 14px 14px 28px #09090a,
								inset -14px -14px 28px #25252a;
						`}
					>
						<Image
							src={
								store.player.playlist?.songs[
									store.player.currentSongIndex
								].cover
							}
							alt="coverart"
							width={200}
							height={200}
							className={styles.cover}
						/>
					</div>

					<div
						className={css`
							position: absolute;
							top: -30px;
							left: 260px;
							transform: ${vinylArm};
							transition: all 0.1s linear;
							transform-origin: 102px 68px;
						`}
					>
						<Image
							src="/vinyl-arm.png"
							alt="vinyl-arm"
							width={91.5}
							height={156}
							// width={366}
							// height={624}
						/>
					</div>

					<div
						className={css`
							border: 2px solid ${background1};
							width: 80px;
							height: 80px;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 50%;
							position: absolute;
							left: 300px;
							bottom: 3px;
						`}
					>
						{1 ? (
							<MdPause
								size={30}
								color={`${background1}`}
								// onClick={() => updateIsPlaying()}
							/>
						) : (
							<MdPlayArrow
								size={30}
								color={`${background1}`}
								// onClick={() => updateIsPlaying()}
							/>
						)}
					</div>
				</div>
			</div>
			{store.player.playlistSongs && (
				<div className={styles.controls}>
					<div className={styles.controlIcons}>
						<MdSkipPrevious
							size={25}
							onClick={() => goPreviousSong()}
						/>
						{store.player.playlistIsPlaying ? (
							<span className={styles.controlIconsPlayPause}>
								<MdPause
									size={30}
									onClick={() => updateIsPlaying()}
								/>
							</span>
						) : (
							<span className={styles.controlIconsPlayPause}>
								<MdPlayArrow
									size={30}
									onClick={() => updateIsPlaying()}
								/>
							</span>
						)}
						<MdSkipNext size={25} onClick={() => goNextSong()} />
					</div>
					<div className={styles.seekbar}>
						<span className={styles.currentTime}>
							{appTime === "0" ? "0:00" : getTime(appTime)}
						</span>
						<div className={styles.bar}>
							<input
								type="range"
								step="any"
								value={appTime}
								min={min}
								max={max}
								onInput={onInput}
							/>
							<div
								className={styles.bar2}
								style={{
									width: progressBar + "%",
								}}
							></div>
							<div
								className={styles.dot}
								style={{
									left: progressBar + "%",
								}}
							></div>
						</div>

						<span className={styles.duration}>
							{max === "0" ? "0:00" : getTime(max)}
						</span>
					</div>
					<audio
						src={
							store.player.playlistSongs[
								store.player.currentSongIndex
							]
						}
						ref={reactAudioPlayer}
						onTimeUpdate={onTimeUpdate}
						onLoadedData={onLoadedData}
						onEnded={goNextSongOnEnded}
					/>
				</div>
			)} */}
		</div>
	);
}
