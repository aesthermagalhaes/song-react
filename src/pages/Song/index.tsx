import { useRouteMatch, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSongBySlug, deleteSongBySlug } from '../../services';
import Panel from '../../components/Panel/index';
import { ISong } from '../../interfaces/ISong';

import './song.css';
import YoutubeVideo from '../../components/YoutubeVideo/index';

function Song() {
  const match = useRouteMatch('/songs/:slug');

  const [stateSong, setSong] = useState<ISong>();

  let { slug } = useParams();

  useEffect(() => {
    getSongBySlug(match.params.slug)
      .then(storageSong => {
        setSong(storageSong);
      })
      .catch(error => alert(error));
  }, []);

  function handleDeleteMusic(event) {
    event.preventDefault();

    const option = window.confirm('Deseja mesmo excluir o registro?');

    if (!option) {
      return;
    }

    deleteSongBySlug(slug)
      .then(message => {
        alert(message);
        window.location.href = '/songs';
      })
      .catch(error => alert(error));
  }

  return (
    <div style={{ marginTop: '1.25em' }}>
      <Panel
        title={stateSong ? (stateSong.name ? stateSong.name : '') : ''}
        style={{ padding: '20px' }}
      >
        <div id='song-info'>
          <div>
            {stateSong?.image !== undefined && (
              <div id='song-image'>
                <img
                  src={stateSong?.image}
                  alt='capa da música'
                  id='song-image'
                />
              </div>
            )}
            <div className='song-description'>
              <h2>
                Artista:{' '}
                <span style={{ fontWeight: 'normal', fontSize: '20px' }}>
                  {stateSong?.artist}
                </span>
              </h2>
              <div>
                <p>{stateSong?.estilo}</p>

                <p>{stateSong?.ano} </p>
              </div>
            </div>
          </div>
          <div>
            {stateSong?.url !== undefined && (
              <YoutubeVideo
                title={stateSong ? (stateSong.name ? stateSong.name : '') : ''}
                url={stateSong ? (stateSong.url ? stateSong.url : '') : ''}
              />
            )}
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <pre>{stateSong?.lyrics}</pre>
        </div>
        <div id='buttons'>
          <Link
            to={`/songs/edit/${stateSong?.slug}`}
            className='default-btn'
            style={{ display: 'inline-block' }}
          >
            editar
          </Link>
          <button className='default-btn' onClick={handleDeleteMusic}>
            excluir
          </button>
        </div>
      </Panel>
    </div>
  );
}

export default Song;
