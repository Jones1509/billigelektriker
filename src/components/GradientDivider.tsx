export const GradientDivider = () => {
  return (
    <div 
      className="relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen h-[60px] z-[1]"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, #F0F6FF 100%)'
      }}
    />
  );
};
