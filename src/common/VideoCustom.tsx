export interface IVideoProps {
  src: string;
  className?: string;
}

export default function Video(props: IVideoProps) {
  const { src, className } = props;
  return (
    <video
      preload='none'
      loop
      autoPlay
      muted
      className={`h-full w-full object-cover ${className}`}
    >
      <source src={src} type='video/mp4' />
      <track
        src='/path/to/captions.vtt'
        kind='subtitles'
        srcLang='en'
        label='English'
      />
      Your browser does not support the video tag.
    </video>
  );
}
