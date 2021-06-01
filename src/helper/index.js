import { NAPSTER_API_KEY } from "../constants";
import axios from "axios";
export const getCurrentSongData = async (trackId) => {
  const response = await axios(
    `https://api.napster.com/v2.1/tracks/${trackId}?apikey=${NAPSTER_API_KEY}`
  );
  const result = await response.data;
  const { albumId, previewURL, artistName, name } = await result.tracks[0];
  return {
    thumbnailSrc: `https://api.napster.com/imageserver/v2/albums/${albumId}/images/356x237.jpg`,
    songSrc: previewURL,
    name: name,
    artistName: artistName,
  };
};

export const getTopTracks = async () => {
    let tracks = [];
    const response = await axios(
      `https://api.napster.com/v2.1/tracks/top?apikey=${NAPSTER_API_KEY}`
    );
    const { tracks: responseTracks } = await response.data;
    await responseTracks.forEach(track => {
        const newItem = {
            thumbnailSrc: `https://api.napster.com/imageserver/v2/albums/${track.albumId}/images/356x237.jpg`,
            name: track.name,
            artistName: track.artistName,
            trackId: track.id,
            songSrc: track.previewURL,
        }
        tracks.push(newItem);
    });
    return tracks;
  };
