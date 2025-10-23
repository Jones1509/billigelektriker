interface GradientSpacerProps {
  fromColor: string;
  toColor: string;
  height?: string;
}

export const GradientSpacer = ({ 
  fromColor, 
  toColor, 
  height = "40px" 
}: GradientSpacerProps) => {
  return (
    <div 
      className="w-full pointer-events-none"
      style={{
        height,
        background: `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`
      }}
    />
  );
};
