interface AnimatedBackgroundProps {
  intensity: number;
  showSmoothElements?: boolean;
}

export const AnimatedBackground = ({ intensity = 2, showSmoothElements = false }: AnimatedBackgroundProps) => {
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
      
      {/* Smooth animated elements */}
      {showSmoothElements && (
        <>
          {/* Floating particles */}
          <div 
            className="absolute top-[10%] left-[15%] bg-primary/20 rounded-full animate-float-slow"
            style={{ 
              width: `${32 * sizeMultiplier}px`, 
              height: `${32 * sizeMultiplier}px`,
              opacity: opacityMultiplier * 0.6,
              filter: 'blur(20px)',
              animation: 'float-slow 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-[70%] left-[60%] bg-secondary/15 rounded-full animate-float-delayed"
            style={{ 
              width: `${40 * sizeMultiplier}px`, 
              height: `${40 * sizeMultiplier}px`,
              opacity: opacityMultiplier * 0.5,
              filter: 'blur(25px)',
              animation: 'float-delayed 10s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-[30%] right-[20%] bg-accent/12 rounded-full animate-float-fast"
            style={{ 
              width: `${28 * sizeMultiplier}px`, 
              height: `${28 * sizeMultiplier}px`,
              opacity: opacityMultiplier * 0.7,
              filter: 'blur(18px)',
              animation: 'float-fast 6s ease-in-out infinite'
            }}
          />
          
          {/* Geometric shapes with rotation */}
          <div 
            className="absolute top-[45%] left-[75%] bg-primary/10"
            style={{ 
              width: `${50 * sizeMultiplier}px`, 
              height: `${50 * sizeMultiplier}px`,
              opacity: opacityMultiplier * 0.4,
              filter: 'blur(15px)',
              animation: 'float-slow 12s ease-in-out infinite, spin 20s linear infinite',
              transform: 'rotate(45deg)'
            }}
          />
          <div 
            className="absolute top-[85%] left-[30%] bg-secondary/8 rounded-full"
            style={{ 
              width: `${35 * sizeMultiplier}px`, 
              height: `${35 * sizeMultiplier}px`,
              opacity: opacityMultiplier * 0.5,
              filter: 'blur(22px)',
              animation: 'float-delayed 14s ease-in-out infinite'
            }}
          />
        </>
      )}
    </div>
  );
};
