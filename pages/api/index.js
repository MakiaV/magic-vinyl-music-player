import { playlists } from "@/data/playlists";

export default function handler(req, res) {
	res.status(200).json(playlists);
}
