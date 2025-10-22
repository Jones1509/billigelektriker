export const GradientDivider = () => {
  return (
    <div 
      style={{
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        width: '100vw',
        height: '60px',
        background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(215 100% 97%) 100%)',
        border: 'none',
        padding: 0,
        zIndex: 1
      }}
      className="my-20"
    />
  );
};
