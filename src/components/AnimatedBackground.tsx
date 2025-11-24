interface AnimatedBackgroundProps {
  intensity: number;
}

export const AnimatedBackground = ({ intensity = 2 }: AnimatedBackgroundProps) => {
  // Adjust opacity and size based on intensity (1: subtle, 2: moderate, 3: intense)
  const opacityMultiplier = intensity === 1 ? 0.6 : intensity === 2 ? 1 : 1.4;
  const sizeMultiplier = intensity === 1 ? 0.8 : intensity === 2 ? 1 : 1.3;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient animé principal */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" 
        style={{ opacity: 0.5 * opacityMultiplier }}
      />
      
      {/* Cercles flottants */}
      <div 
        className="absolute top-1/4 left-1/4 bg-primary/10 rounded-full blur-3xl animate-float-slow"
        style={{ 
          width: `${96 * sizeMultiplier}px`, 
          height: `${96 * sizeMultiplier}px`,
          opacity: opacityMultiplier 
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 bg-secondary/10 rounded-full blur-3xl animate-float-delayed"
        style={{ 
          width: `${80 * sizeMultiplier}px`, 
          height: `${80 * sizeMultiplier}px`,
          opacity: opacityMultiplier 
        }}
      />
      <div 
        className="absolute top-1/2 right-1/3 bg-accent/8 rounded-full blur-2xl animate-float-fast"
        style={{ 
          width: `${64 * sizeMultiplier}px`, 
          height: `${64 * sizeMultiplier}px`,
          opacity: opacityMultiplier * 0.8
        }}
      />
    </div>
  );
};
