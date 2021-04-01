import List from '../../components/List/index';
import { useEffect, useState } from 'react';
import { getSongs as getSongsService, getTopFiveSongs } from '../../services';
import Title from '../../components/Title/index';

function Home() {
  const getTopFive = () => {
    setTopFive(getTopFiveSongs());
  };

  const getSongs = () => {
    setSongs(getSongsService());
  };

  const [songs, setSongs] = useState([]);
  const [topFive, setTopFive] = useState([]);

  useEffect(() => {
    getSongs();
    getTopFive();
  }, []);

  return (
    <>
      <Title value='Sing Lyrics' />
      <List title='Top 5 songs' items={topFive} />
      <Title value='Músicas' />
      <List title='Músicas' items={songs} />
    </>
  );
}

export default Home;
