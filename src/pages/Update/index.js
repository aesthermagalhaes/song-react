import './form.css';
import { useState, useReducer, useEffect } from 'react';
import { save, getSongBySlug, updateSong } from '../../services';
import Title from '../../components/Title/index';
import { useRouteMatch } from 'react-router-dom';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function Register() {
  const [image, setImage] = useState();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const match = useRouteMatch('/songs/edit/:slug');

  useEffect(() => {
    getSongBySlug(match.params.slug)
      .then(storageSong => {
        formData.name = storageSong.name;
        formData.slug = storageSong.slug;
        formData.url = storageSong.url;
        formData.artist = storageSong.artist;
        formData.lyrics = storageSong.lyrics;
        formData.image = storageSong.image;
        formData.estilo = storageSong.estilo;
        formData.ano = storageSong.ano;

        const fields = ['name', 'artist', 'url', 'lyrics', 'estilo', 'ano'];
        fields.forEach(field => {
          document.querySelector(`[name='${field}']`).value =
            storageSong[field];
        });
      })
      .catch(error => {
        alert('Erro ao tentar recuperar os dados!');
        window.location.href = '/songs';
      });
  }, []);

  function handleChange(event) {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  function handleChangeSongImage(event) {
    const img = document.querySelector("[name='image']").files[0];

    if (!img instanceof File) {
      return;
    }

    const fReader = new FileReader();
    fReader.readAsDataURL(img);
    fReader.onloadend = function (event) {
      const imgElement = document.querySelector('#song-image-preview img');
      imgElement.src = event.target.result;
    };

    setImage(img);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (image === undefined && formData.image === undefined) {
      alert('informe a capa da música!');
      return;
    }

    setSubmitting(true);

    const imageToSave =
      image !== undefined
        ? image
        : dataURLtoFile(formData.image, `${formData.name}`);
    const fReader = new FileReader();
    fReader.readAsDataURL(imageToSave);
    fReader.onloadend = function (event) {
      const data = {
        ...formData,
        ...{ image: event.target.result },
      };

      updateSong(formData.slug, data).then(message => {
        setSubmitting(false);
        alert('Música alterada com sucesso!');
        window.location.href = '/songs';
      });
    };
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  return (
    <>
      <Title value='Editar música' />
      <form onSubmit={handleSubmit}>
        <div id='song-image-preview'>
          <img src='' alt='' />
        </div>
        {submitting && <div>Submitting form...</div>}
        <div className='form-row'>
          <label className='label-input-file'>
            <input
              type='file'
              name='image'
              placeholder='Informe a capa da música'
              accept='.jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*'
              onChange={handleChangeSongImage}
            />
            Selecionar capa da música
          </label>
        </div>
        <div className='form-row'>
          <input
            type='text'
            name='name'
            placeholder='Digite o nome da música'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='artist'
            placeholder='Digite o nome do artista'
            required
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <input
            type='url'
            name='url'
            placeholder='Digite o link de reprodução'
            required
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          {/* <input
            type='text'
            name='estilo'
            placeholder='Estilo'
            required
            onChange={handleChange}
          /> */}

          <select id='escolha' name='estilo' required onChange={handleChange}>
            <option value='' disabled selected>
              Estilo Musical{' '}
            </option>
            <option value='Pop'>POP</option>
            <option value='Rock'>ROCK</option>
            <option value='Hiphop'>HIP-HOP</option>
            <option value='Sertanejo'>SARTANEJO</option>
            <option value='Samba'>SAMBA</option>
            <option value='Classica'>CLASSICA</option>
            <option value='Gospel'>GOSPEL</option>
          </select>

          <input
            type='text'
            name='ano'
            placeholder='Ano de Lançamento'
            required
            onChange={handleChange}
          />
        </div>

        <div className='form-row'>
          <textarea
            type='text'
            name='lyrics'
            placeholder='Letra da Música'
            rows='10'
            required
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='default-btn'>
          editar
        </button>
      </form>
    </>
  );
}

export default Register;
