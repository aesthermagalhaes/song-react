import './video.css';

export interface IProps {
  title: string;
  url: string;
}

function YoutubeVideo(props: IProps) {
  return (
    <div id='video-wrapper'>
      <iframe
        title={props.title}
        width='560'
        height='349'
        src={props.url.replace('watch?v=', 'embed/')}
        frameBorder='0'
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YoutubeVideo;
