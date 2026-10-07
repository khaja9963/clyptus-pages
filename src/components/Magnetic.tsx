import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Magnetic translate strength (default 0.06)
  tilt?: boolean; // Enable subtle 3D tilt
  maxTilt?: number; // Maximum tilt angle in degrees (default 8)
  className?: string;
  onClick?: () => void;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.06,
  tilt = true,
  maxTilt = 8,
  className = '',
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Raw motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const shadowX = useMotionValue(0);
  const shadowY = useMotionValue(10);
  const shadowBlur = useMotionValue(20);
  const shadowOpacity = useMotionValue(0.06);

  // Smooth spring physics configuration
  const springConfig = { damping: 24, stiffness: 220, mass: 0.12 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotX = useSpring(rotX, springConfig);
  const springRotY = useSpring(rotY, springConfig);
  const springShadowX = useSpring(shadowX, springConfig);
  const springShadowY = useSpring(shadowY, springConfig);
  const springShadowBlur = useSpring(shadowBlur, springConfig);
  const springShadowOpacity = useSpring(shadowOpacity, springConfig);

  const boxShadow = useTransform(
    [springShadowX, springShadowY, springShadowBlur, springShadowOpacity],
    ([sx, sy, sb, so]) =>
      `${sx}px ${sy}px ${sb}px rgba(14, 165, 233, ${so}), 0 8px 25px rgba(0, 0, 0, 0.05)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic translation
    x.set(distanceX * strength);
    y.set(distanceY * strength);

    if (tilt) {
      // Normalized offset (-1 to 1)
      const normX = distanceX / (width / 2);
      const normY = distanceY / (height / 2);

      // 3D rotation calculation
      rotY.set(normX * maxTilt);
      rotX.set(-normY * maxTilt);

      // Soft dynamic shadow reaction
      shadowX.set(-normX * 12);
      shadowY.set(-normY * 12 + 15);
      shadowBlur.set(30);
      shadowOpacity.set(0.18);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotX.set(0);
    rotY.set(0);
    shadowX.set(0);
    shadowY.set(10);
    shadowBlur.set(20);
    shadowOpacity.set(0.06);
  };

  return (
    <div style={{ perspective: 1000 }} className={`h-full ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          x: springX,
          y: springY,
          rotateX: springRotX,
          rotateY: springRotY,
          boxShadow,
          transformStyle: 'preserve-3d',
        }}
        className="h-full transition-shadow duration-300 rounded-3xl will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};
