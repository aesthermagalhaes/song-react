import './panel.css';
import React from 'react';

export interface IProps {
  title: string;
  style: React.CSSProperties;
  children: React.ReactNode;
}

function Panel(props: IProps) {
  return (
    <div>
      <div style={props.style} className='panel'>
        <div className='panel-title'>{props.title}</div>
        <div className='panel-content'>{props.children}</div>
      </div>
    </div>
  );
}

export default Panel;
