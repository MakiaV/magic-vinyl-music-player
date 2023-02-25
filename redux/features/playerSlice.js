import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	playlist: null,
	playlistSongs: null,
	playlistIsPlaying: false,
	currentSongIndex: 0,
	selectedPlaylist: null,
};

const mod = (n, m) => {
	return ((n % m) + m) % m;
};

const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		selectedPlaylist: (state, action) => {
			state.selectedPlaylist = action.payload.playlist;
		},
		playPause: (state, action) => {
			if (state.playlistIsPlaying) {
				state.playlistIsPlaying = false;
			} else {
				state.playlistIsPlaying = true;
			}
		},
		updatePlaylist: (state, action) => {
			if (Number.isInteger(action.payload.currentSongIndex)) {
				if (
					JSON.stringify(
						action.payload.playlist.songs.map(
							(song) => song.songSrc
						)
					) !== JSON.stringify(state.playlistSongs)
				) {
					state.playlist = action.payload.playlist;

					state.playlistSongs = action.payload.playlist.songs.map(
						(song) => song.songSrc
					);
					state.playlistIsPlaying = true;
					state.currentSongIndex = 0;
				} else {
					state.playlistIsPlaying = !state.playlistIsPlaying;
				}
			}
		},
		selectSongFromPlaylist: (state, action) => {
			if (
				JSON.stringify(state.playlistSongs) ===
				JSON.stringify(
					action.payload.selectedPlaylist.songs.map(
						(song) => song.songSrc
					)
				)
			) {
				if (state.currentSongIndex === action.payload.index) {
					state.currentSongIndex = action.payload.index;
					state.playlistIsPlaying = !state.playlistIsPlaying;
				} else {
					state.currentSongIndex = action.payload.index;

					state.playlistIsPlaying = true;

					state.playlistSongs =
						action.payload.selectedPlaylist.songs.map(
							(song) => song.songSrc
						);
				}
			} else {
				state.currentSongIndex = action.payload.index;
				state.playlistIsPlaying = true;
				state.playlistSongs = action.payload.selectedPlaylist.songs.map(
					(song) => song.songSrc
				);
				state.playlist = action.payload.selectedPlaylist;
			}
		},
		nextSong: (state, action) => {
			state.playlistIsPlaying = true;

			state.currentSongIndex =
				(state.currentSongIndex + 1) % state.playlistSongs.length;
		},
		nextSongOnEnded: (state, action) => {
			state.playlistIsPlaying = true;
			state.currentSongIndex =
				(state.currentSongIndex + 1) % state.playlistSongs.length;
		},
		previousSong: (state, action) => {
			state.playlistIsPlaying = true;

			state.currentSongIndex = mod(
				state.currentSongIndex - 1,
				state.playlistSongs.length
			);
		},
	},
});

export const {
	selectedPlaylist,
	updatePlaylist,
	playPause,
	nextSong,
	nextSongOnEnded,
	previousSong,
	selectSongFromPlaylist,
} = playerSlice.actions;
export default playerSlice.reducer;
