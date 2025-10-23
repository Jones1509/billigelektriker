interface GradientSpacerProps {
  fromColor: string;
  toColor: string;
  height?: string;
}

export const GradientSpacer = ({ fromColor, toColor, height = "60px" }: GradientSpacerProps) => {
  return (
    <div 
      className="w-full transition-all md:h-[60px] h-[40px]"
      style={{
        background: `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`
      }}
      aria-hidden="true"
    />
  );
};
