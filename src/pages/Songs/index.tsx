import { getSongs } from '../../services';
import Title from '../../components/Title/index';
import List from '../../components/List/index';
import { useState, useEffect } from 'react';

function Songs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(getSongs());
  }, []);

  return (
    <>
      <Title value='Músicas' />
      <List title='Músicas' items={songs} />
    </>
  );
}

export default Songs;
