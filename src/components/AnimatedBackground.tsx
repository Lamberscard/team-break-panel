import { useMemo } from "react";

interface AnimatedBackgroundProps {
  intensity: number;
  showSmoothElements?: boolean;
  gradientColor1?: string;
  gradientColor2?: string;
}

export const AnimatedBackground = ({ intensity = 2, showSmoothElements = false, gradientColor1 = '#00bfff', gradientColor2 = '#ff00ff' }: AnimatedBackgroundProps) => {
  // Adjust opacity and size based on intensity (1: subtle, 2: moderate, 3: intense)
  const opacityMultiplier = intensity === 1 ? 0.6 : intensity === 2 ? 1 : 1.4;
  const sizeMultiplier = intensity === 1 ? 0.8 : intensity === 2 ? 1 : 1.3;
  
  // Generate stars positions once (memoized to prevent regeneration)
  const stars = useMemo(() => {
    const starsCount = intensity * 50;
    return Array.from({ length: starsCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 3 + 2,
    }));
  }, [intensity]);
  
  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient animé principal - plus intense */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `linear-gradient(135deg, ${hexToRgba(gradientColor1, 0.25)}, transparent, ${hexToRgba(gradientColor2, 0.25)})`,
          opacity: 0.7 * opacityMultiplier 
        }}
      />
      
      {/* Cercles flottants - plus visibles */}
      <div 
        className="absolute top-1/4 left-1/4 rounded-full blur-3xl animate-float-slow"
        style={{ 
          width: `${120 * sizeMultiplier}px`, 
          height: `${120 * sizeMultiplier}px`,
          opacity: 0.8 * opacityMultiplier,
          backgroundColor: hexToRgba(gradientColor1, 0.2)
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 rounded-full blur-3xl animate-float-delayed"
        style={{ 
          width: `${100 * sizeMultiplier}px`, 
          height: `${100 * sizeMultiplier}px`,
          opacity: 0.8 * opacityMultiplier,
          backgroundColor: hexToRgba(gradientColor2, 0.2)
        }}
      />
      <div 
        className="absolute top-1/2 right-1/3 rounded-full blur-2xl animate-float-fast"
        style={{ 
          width: `${80 * sizeMultiplier}px`, 
          height: `${80 * sizeMultiplier}px`,
          opacity: 0.7 * opacityMultiplier,
          backgroundColor: hexToRgba(gradientColor1, 0.15)
        }}
      />
      
      {/* Smooth animated elements */}
      {showSmoothElements && (
        <>
          {/* Space stars effect */}
          <div className="absolute inset-0">
            {stars.map(star => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity * opacityMultiplier * 0.6,
                  animation: `pulse ${star.duration}s ease-in-out infinite`,
                  boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.5})`
                }}
              />
            ))}
          </div>
          
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
