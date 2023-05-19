export const Image = ({ size, src }) => {
  const [width, height] = size;

  const divStyle = {
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
