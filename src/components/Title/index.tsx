import './title.css';

export interface IProps {
  value: string;
}

function Title(props: IProps) {
  return (
    <div className='title-container'>
      <h1 className='title'>{props.value}</h1>
    </div>
  );
}

export default Title;
