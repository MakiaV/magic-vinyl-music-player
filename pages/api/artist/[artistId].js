import { artists } from "@/data/artists";

export default function handler(req, res) {
	const { artistId } = req.query;
	const artist = artists.find((artist) => artist.id === parseInt(artistId));
	res.status(200).json(artist);
}
