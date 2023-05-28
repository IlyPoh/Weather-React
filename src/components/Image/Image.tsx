import { ImageProps } from '../../types';

export const Image: React.FC<ImageProps> = ({ size, src }) => {
  const [width, height] = size;

  const divStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '100%',
    maxWidth: width,
    height: height,
  };

  return (
    <div style={divStyle}>
      {src && <img src={src} width={width} height={height} />}
    </div>
  );
};
