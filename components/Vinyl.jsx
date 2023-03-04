import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
	BsFillVolumeMuteFill,
	BsFillVolumeUpFill,
	BsVolumeDownFill,
} from "react-icons/bs";
import {
	MdPause,
	MdPlayArrow,
	MdSkipNext,
	MdSkipPrevious,
} from "react-icons/md";
import styles from "./Vinyl.module.css";
import { getTime } from "@/lib";
import {
	playPause,
	nextSong,
	nextSongOnEnded,
	previousSong,
} from "@/redux/features/playerSlice";
import { useSelector, useDispatch } from "react-redux";

const Vinyl = () => {
	const [duration, setDuration] = useState("0");
	const [seekTime, setSeekTime] = useState("0");
	const [appTime, setAppTime] = useState("0");
	const [volume, setVolume] = useState("0.5");
	const [progressBar, setProgressBar] = useState(0);
	const [volumeBarProgress, setVolumeBarProgress] = useState("50");
	const reactAudioPlayer = useRef(null);
	const dispatch = useDispatch();
	const store = useSelector((state) => state);

	const playlistSongs = store.player.selectedPlaylist?.songs;

	const selectedPlaylist = store.player.selectedPlaylist;

	const rotation = `rotation infinite
	5s linear`;

	const pauseRotation = store.player.playlistIsPlaying ? `running` : `paused`;
	const vinylArm = store.player.playlistIsPlaying
		? `rotate(0deg)`
		: `rotate(-25deg)`;

	const max = duration;
	const controlsColor =
		store.player.playlist?.songs[store.player.currentSongIndex].colors?.c2;
	const colorProgress1 =
		store.player.playlist?.songs[store.player.currentSongIndex].colors?.c3;
	const colorProgress2 =
		store.player.playlist?.songs[store.player.currentSongIndex].colors?.c4;

	const onTimeUpdate = (event) => {
		setAppTime(event.target.currentTime);
	};
	const onLoadedData = (event) => setDuration(event.target.duration);

	const playSong = useCallback(() => {
		if (store.player.playlistSongs) {
			setTimeout(function () {
				reactAudioPlayer.current.play();
			}, 0);
		}
	}, [store.player.playlistSongs]);

	const pauseSong = useCallback(() => {
		store.player.playlistSongs && reactAudioPlayer.current.pause();
	}, [store.player.playlistSongs]);

	const updateIsPlaying = () => {
		dispatch(playPause({}));
	};

	const goNextSong = () => {
		dispatch(nextSong({}));
		reactAudioPlayer.current.currentTime = 0;
		pauseSong();
		playSong();
	};

	const goNextSongOnEnded = () => {
		dispatch(nextSongOnEnded({}));
		reactAudioPlayer.current.currentTime = 0;
		pauseSong();
		playSong();
	};

	const goPreviousSong = () => {
		dispatch(previousSong({}));
		pauseSong();
		playSong();
	};

	useEffect(() => {
		if (store.player.playlistIsPlaying) {
			setProgressBar((parseInt(appTime) / parseInt(duration)) * 100);
			playSong();
		} else {
			pauseSong();
		}
	}, [
		playSong,
		pauseSong,
		store.player.playlistIsPlaying,
		appTime,
		duration,
	]);

	useEffect(() => {
		if (store.player.playlistSongs) {
			reactAudioPlayer.current.currentTime = 0;
			setProgressBar(0);
			setSeekTime("0");
		}
	}, [duration, store.player.playlistSongs, store.player.currentSongIndex]);

	useEffect(() => {
		if (store.player.playlistSongs) {
			reactAudioPlayer.current.currentTime = seekTime;
		}
	}, [seekTime, store.player.playlistSongs]);

	useEffect(() => {
		if (store.player.playlistSongs) {
			reactAudioPlayer.current.volume = volume;
		}
	}, [volume, store.player.playlistSongs]);

	const myProgress =
		250.92135620117188 - (250.92135620117188 * progressBar) / 100;

	return (
		<div className={styles.vinylContainer}>
			<div className={styles.vinyl}>
				{store.player.playlistSongs ? (
					<div
						className={styles.vinylDisc}
						style={{
							animation: rotation,
							animationPlayState: pauseRotation,
						}}
					>
						<Image
							src={
								store.player.playlist?.songs[
									store.player.currentSongIndex
								].cover
							}
							alt="coverArt"
							width={200}
							height={200}
							className={styles.cover}
						/>

						<div className={styles.vinylHole}></div>
						<div className={styles.vinylHoleDot}></div>
					</div>
				) : (
					<div className={styles.vinylDisc}>
						<div className={styles.vinylHole}></div>
						<div className={styles.vinylHoleDot}></div>
					</div>
				)}

				<div
					className={styles.vinylArm}
					style={{ transform: vinylArm }}
				>
					<Image
						src="/vinyl-arm.png"
						alt="vinyl-arm"
						width={91.5}
						height={156}
						className={styles.vinylArmImg}
					/>
				</div>

				{store.player.playlistSongs && (
					<div className={styles.circleProgressBarContainer}>
						<div className={styles.circleProgressBar}>
							<svg className={styles.circleProgressBarSvg}>
								<linearGradient id="gradient">
									<stop
										offset="0%"
										stop-color={colorProgress2}
									/>
									<stop
										offset="50%"
										stop-color={colorProgress1}
									/>
									<stop
										offset="100%"
										stop-color={controlsColor}
									/>
								</linearGradient>
								<circle
									style={{
										strokeDasharray: "250.92135620117188",
										strokeDashoffset: `${myProgress}`,

										transformOrigin: "center center",
										transform: "rotateZ(-90deg)",
									}}
									className={styles.circle}
									cx="50"
									cy="50"
									r="40"
								></circle>
								<circle
									style={{
										strokeDasharray: "250.92135620117188",
										strokeDashoffset: `${myProgress}`,
										transformOrigin: "center center",
										transform: "rotateZ(-90deg)",
										filter: " blur(10px)",
									}}
									className={styles.circle}
									cx="50"
									cy="50"
									r="40"
								></circle>
								<circle
									style={{
										stroke: "rgba(255, 255, 255, .2)",
									}}
									className={styles.circle}
									cx="50"
									cy="50"
									r="40"
								></circle>
							</svg>
							<div className={styles.vinylBtnControl}>
								{store.player.playlistIsPlaying ? (
									<MdPause
										size={40}
										color={`${controlsColor}`}
										onClick={() => updateIsPlaying()}
										className={styles.plauseVinylBtn}
									/>
								) : (
									<MdPlayArrow
										size={40}
										color={`${controlsColor}`}
										onClick={() => updateIsPlaying()}
										className={styles.playVinylBtn}
									/>
								)}
							</div>
						</div>
					</div>
				)}
				{store.player.playlistSongs && (
					<MdSkipPrevious
						className={styles.goPreviousSong}
						size={30}
						onClick={() => goPreviousSong()}
						color={`${controlsColor}`}
					/>
				)}
				{store.player.playlistSongs && (
					<MdSkipNext
						className={styles.goNextSong}
						size={30}
						onClick={() => goNextSong()}
						color={`${controlsColor}`}
					/>
				)}
				{store.player.playlistSongs && (
					<span className={styles.currentTime}>
						{appTime === "0" ? "0:00" : getTime(appTime)}
					</span>
				)}
				{store.player.playlistSongs && (
					<span className={styles.duration}>
						{max === "0" ? "0:00" : getTime(max)}
					</span>
				)}

				{store.player.playlistSongs && (
					<div className={styles.volumeBarContainer}>
						{volume <= "1" && volume > "0.5" && (
							<BsFillVolumeUpFill
								className={styles.volumeIcon}
								size={25}
								color={controlsColor}
								onClick={() => setVolume("0")}
							/>
						)}
						{volume <= "0.5" && volume > "0" && (
							<BsVolumeDownFill
								className={styles.volumeIcon}
								size={25}
								color={controlsColor}
								onClick={() => setVolume("0")}
							/>
						)}
						{volume === "0" && (
							<BsFillVolumeMuteFill
								className={styles.volumeIcon}
								size={25}
								color={controlsColor}
								onClick={() => setVolume("0.5")}
							/>
						)}
						<div className={styles.volumeBar}>
							<input
								type="range"
								step="any"
								value={volume}
								min="0"
								max="1"
								onChange={(e) => {
									setVolume(e.target.value);
									setVolumeBarProgress(
										(
											parseFloat(e.target.value) * 100
										).toString()
									);
								}}
							/>
							<div
								className={styles.volumeBar2}
								style={{
									width: volumeBarProgress + "%",
									background: controlsColor,
								}}
							></div>
						</div>
					</div>
				)}
			</div>
			{store.player.playlistSongs && (
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
			)}
		</div>
	);
};

export default Vinyl;
