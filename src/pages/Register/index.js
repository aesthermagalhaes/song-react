import './form.css';
import { useState, useReducer } from 'react';
import { save } from '../../services';
import Title from '../../components/Title/index';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function Register() {
  const [ano, setAno] = useState();
  const [image, setImage] = useState();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

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
    setAno(ano);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!image) {
      alert('informe a capa da música!');
      return;
    }

    if (!formData.name) {
      alert('informe nome da música!');
      return;
    }

    if (!formData.artist) {
      alert('informe o autor/artista da música!');
      return;
    }

    if (formData.ano < 1940) {
      alert('Musica antiga, cadastre uma atual!');
      return;
    }

    setSubmitting(true);

    const fReader = new FileReader();
    fReader.readAsDataURL(image);
    fReader.onloadend = function (event) {
      const data = {
        ...formData,
        ...{ image: event.target.result },
      };

      save(data).then(message => {
        setSubmitting(false);
        alert('Música adicionada com sucesso!');
        window.location.href = '/songs';
      });
    };
  }

  return (
    <>
      <Title value='Cadastrar música' />
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
          <select id='escolha' name='estilo' required onChange={handleChange}>
            <option value='' disabled selected>
              Estilo{' '}
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
          cadastrar
        </button>
      </form>
    </>
  );
}

export default Register;
