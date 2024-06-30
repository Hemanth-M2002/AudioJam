import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { fetchAlbums, fetchSongs } from '../spotifyService';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import Player from './Player';

const DisplayHome = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const getAlbums = async () => {
      const data = await fetchAlbums();
      setAlbums(data.albums.items);
    };

    const getSongs = async () => {
      const data = await fetchSongs();
      setSongs(data.tracks.items);
    };

    getAlbums();
    getSongs();
  }, []);

  const handleSongClick = (song) => {
    setCurrentSong(song);
  };

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className='my-5 font-bold text-2xl'>Feature Charts</h1>
        <div className="flex overflow-auto">
          {albums.map((item, index) => (
            <AlbumItem key={index} name={item.name} desc={item.artists[0].name} id={item.id} image={item.images[0].url} />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className='my-5 font-bold text-2xl'>Today's Hits</h1>
        <div className="flex overflow-auto">
          {songs.map((item, index) => (
            <SongItem key={index} name={item.track.name} desc={item.track.artists[0].name} id={item.track.id} image={item.track.album.images[0].url} onClick={() => handleSongClick(item.track)} />
          ))}
        </div>
      </div>
      {currentSong && <Player currentSong={currentSong} />}
    </>
  );
};

export default DisplayHome;
