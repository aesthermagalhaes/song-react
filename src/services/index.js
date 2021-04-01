import slugify from 'slugify';

const songs = [
  {
    name: 'A horse with no name',
    slug: 'a-horse-with-no-name',
    artist: 'America',
    lyrics: 'letra',
    ano: '1990',
    estilo: 'rock',
    image:
      'https://images.genius.com/2a32de5f17d0cbdbabeb576ff9797a6d.900x900x1.jpg',
    url: 'https://www.youtube.com/watch?v=KEhhGLcqOx4',
  },
  {
    name: '16 days',
    slug: '16-days',
    artist: 'Whiskeytown',
    lyrics: 'letra',
    ano: '1990',
    estilo: 'rock',
    image:
      'https://images.genius.com/2a32de5f17d0cbdbabeb576ff9797a6d.900x900x1.jpg',
    url: 'https://www.youtube.com/watch?v=KEhhGLcqOx4',
  },
  {
    name: 'Fire away',
    slug: 'fire-away',
    artist: 'Chris Stapleton',
    lyrics: 'letra',
    ano: '1990',
    estilo: 'rock',
    image:
      'https://images.genius.com/2a32de5f17d0cbdbabeb576ff9797a6d.900x900x1.jpg',
    url: 'https://www.youtube.com/watch?v=KEhhGLcqOx4',
  },
  {
    name: 'House of mercy',
    slug: 'house-of-mercy',
    artist: 'Sarah Jarosz',
    lyrics: 'letra',
    ano: '1990',
    estilo: 'rock',
    image:
      'https://images.genius.com/2a32de5f17d0cbdbabeb576ff9797a6d.900x900x1.jpg',
    url: 'https://www.youtube.com/watch?v=KEhhGLcqOx4',
  },
  {
    name: 'Attention',
    slug: 'attention',
    artist: 'joji',
    lyrics: 'letra',
    ano: '1990',
    estilo: 'rock',
    image:
      'https://images.genius.com/2a32de5f17d0cbdbabeb576ff9797a6d.900x900x1.jpg',
    url: 'https://www.youtube.com/watch?v=KEhhGLcqOx4',
  },
];

export function getSongs() {
  let localStorageSongs = localStorage.getItem('songs');

  if (localStorageSongs !== null) {
    return JSON.parse(localStorageSongs);
  }

  localStorageSongs = songs;
  localStorage.setItem('songs', JSON.stringify(songs));

  return songs;
}

export function getTopFiveSongs() {
  return getSongs().slice(0, 5);
}

export function save(song) {
  return new Promise(resolve => {
    let localStorageSongs = JSON.parse(localStorage.getItem('songs'));

    const data = [...localStorageSongs, song];

    const slug = slugify(song.name, '-');
    song.slug = slug;

    localStorage.setItem('songs', JSON.stringify(data));

    resolve('Música adicionada com sucesso!');
  });
}

export function getSongBySlug(slug) {
  return new Promise((resolve, reject) => {
    const storageSongs = JSON.parse(localStorage.getItem('songs'));
    const song = storageSongs.find(item => item.slug === slug);

    if (!song) reject('Registro não encontrado!');

    resolve(song);
  });
}

export function updateSong(slug, song) {
  return new Promise(resolve => {
    const storageSongs = getSongs();

    let newArray = storageSongs.map(item => {
      if (item.slug !== slug) {
        return item;
      }

      const updatedItem = {
        ...item,
        ...song,
      };

      return updatedItem;
    });

    localStorage.setItem('songs', JSON.stringify(newArray));

    resolve('Música alterada com sucesso!');
  });
}

export function deleteSongBySlug(slug) {
  return new Promise((resolve, reject) => {
    const storageSongs = JSON.parse(localStorage.getItem('songs'));
    const songsWithoutDeleted = storageSongs.filter(item => item.slug !== slug);

    if (storageSongs.length === songsWithoutDeleted.length) {
      reject('Música não encontrada!');
    }

    localStorage.setItem('songs', JSON.stringify(songsWithoutDeleted));

    resolve('Música excluída com sucesso!');
  });
}
