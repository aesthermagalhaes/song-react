import React from 'react';
import './list.css';
import { Link } from 'react-router-dom';
import Panel from '../Panel/index';
import { ISong } from '../../interfaces/ISong';

export interface IProps {
  title: string;
  items: ISong[];
}

function List(props: IProps) {
  return (
    <Panel title={props.title} style={{}}>
      <div className='list-items'>
        {props.items.map((item, idx) => (
          <Link
            key={idx}
            to={`/songs/${item.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div>
              {item.image !== undefined && (
                <img
                  src={item.image}
                  alt='capa da música'
                  className='song-image-avatar'
                />
              )}
              <section className='section-names'>
                <strong>{item.name} :</strong>
                <p className='break'> {item.artist}</p>
              </section>

              <section>
                <p> {item.estilo} </p>
                <p> {item.ano} </p>
              </section>
            </div>
          </Link>
        ))}
      </div>
    </Panel>
  );
}

export default List;
