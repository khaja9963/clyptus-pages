export interface SliderCard {
  id: string;
  title: string;
  category: 'cyberpunk' | 'architecture' | 'space' | 'abstract' | 'ui';
  subtitle: string;
  description: string;
  imageUrl: string;
  accentColor: string;
  tags: string[];
  prompt: string;
  stats: {
    fps: number;
    depth: string;
    vertices: string;
    downloads: string;
  };
}

export const SLIDER_CARDS: SliderCard[] = [
  {
    id: 'card-1',
    title: 'NEO CYBER SPIRAL',
    category: 'cyberpunk',
    subtitle: 'Hologram Helix Deck',
    description: 'A 3D spiral deck with volumetric light shafts and reactive glowing glass panels wound onto a high-velocity central axis.',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#38bdf8',
    tags: ['Three.js', 'WebGL', '3D Helix', 'PostProcessing'],
    prompt: 'Create a 3D spiral helix card slider in React using CSS transform 3D and depth perspective. Include frosted glass panels on the far side of the helix and glowing neon accents on the foreground focal card with drag velocity momentum.',
    stats: { fps: 60, depth: 'Z-sorted', vertices: '4.8k', downloads: '1,420' }
  },
  {
    id: 'card-2',
    title: 'VALMORA CHRONO',
    category: 'architecture',
    subtitle: 'Monochrome Kinetic Helix',
    description: 'Sleek luxury architectural showcase winding through vertical space with dynamic focal lighting and depth of field.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#a855f7',
    tags: ['Architecture', 'Kinetic UI', 'Lenis Scroll'],
    prompt: 'Build a luxurious monochrome architectural portfolio featuring a 3D spiral ribbon layout. Far side elements blur with glassmorphism while front elements tilt smoothly on mouse move.',
    stats: { fps: 60, depth: 'Frosted 18px', vertices: '8.2k', downloads: '980' }
  },
  {
    id: 'card-3',
    title: 'QUANTUM NEBULA',
    category: 'space',
    subtitle: 'Cosmic Ray Shader Deck',
    description: 'Deep space astronomical visuals orbiting in a continuous helical trajectory with glowing stargaze backdrop.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#ec4899',
    tags: ['GLSL Shaders', 'Cosmic Art', 'Raymarching'],
    prompt: 'Design a deep-space WebGL showcase where cards rotate along a spiral galaxy track. Active card expands in 3D space with a vibrant neon aura and interactive particle sparks.',
    stats: { fps: 60, depth: '3D Spatial', vertices: '12k', downloads: '2,150' }
  },
  {
    id: 'card-4',
    title: 'MACAW TROPIC GLOW',
    category: 'abstract',
    subtitle: 'Vibrant Prism Helix',
    description: 'High-contrast prism color gradients shimmering across 3D curved tiles with realistic glass diffraction.',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#f59e0b',
    tags: ['Prism Shader', 'Diffraction', 'Framer Motion'],
    prompt: 'Implement a vibrant prism gradient spiral slider with smooth drag fling physics and sound-reactive ambient lighting.',
    stats: { fps: 60, depth: 'Glass 12px', vertices: '3.6k', downloads: '1,890' }
  },
  {
    id: 'card-5',
    title: 'AERFLORA BOTANICA',
    category: 'ui',
    subtitle: 'Organic Curvature Rail',
    description: 'Organic floating panels inspired by natural DNA spirals and fluid architectural geometry.',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#10b981',
    tags: ['Biomorphic', 'Organic 3D', 'Smooth Scroll'],
    prompt: 'Construct an organic biomorphic card carousel winding along a vertical helical spline with subtle leaf-like curvature.',
    stats: { fps: 60, depth: 'Refractive', vertices: '5.1k', downloads: '1,120' }
  },
  {
    id: 'card-6',
    title: 'SYNTHWAVE 1984',
    category: 'cyberpunk',
    subtitle: 'Retro Grid Helix',
    description: 'Nostalgic synthwave aesthetics meets futuristic 3D geometry with wireframe terrain grid and laser beams.',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#06b6d4',
    tags: ['Retro Wave', 'Neon Grid', 'Three.js'],
    prompt: 'Create a retro synthwave spiral carousel featuring glowing magenta wireframes and camera tilt controls.',
    stats: { fps: 60, depth: 'Neon Ray', vertices: '9.4k', downloads: '3,040' }
  },
  {
    id: 'card-7',
    title: 'KINETIC GEOMETRY',
    category: 'abstract',
    subtitle: 'Polhedral Motion Loop',
    description: 'Pure geometric forms rotating in harmonious synchronization along a double-helix track.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#6366f1',
    tags: ['Math Art', 'Double Helix', 'Canvas 3D'],
    prompt: 'Build a double-helix geometric slider where two opposing card spirals interlock in 3D space as you scroll.',
    stats: { fps: 60, depth: 'Interlocked', vertices: '16k', downloads: '2,890' }
  },
  {
    id: 'card-8',
    title: 'CHRONOS PORTAL',
    category: 'space',
    subtitle: 'Temporal Distortion Helix',
    description: 'Time-bending visual effects with gravitational lens distortion and central singularity glow.',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#8b5cf6',
    tags: ['Gravitational Lens', 'Space Time', 'Custom Shader'],
    prompt: 'Develop a gravitational wormhole spiral slider where cards twist into a central black hole axis with motion blur.',
    stats: { fps: 60, depth: 'Wormhole', vertices: '22k', downloads: '4,100' }
  },
  {
    id: 'card-9',
    title: 'SOLARIS DUNE',
    category: 'architecture',
    subtitle: 'Minimal Desert Sanctuary',
    description: 'Warm sandy hues and dramatic sunlit shadow projections along a helical gallery walk.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#f97316',
    tags: ['Luxury Architectural', 'Shadow Map', 'Ambient Light'],
    prompt: 'Design a minimal warm desert architecture spiral gallery with dynamic sun shadows and smooth scroll deceleration.',
    stats: { fps: 60, depth: 'Shadow Soft', vertices: '6.7k', downloads: '1,650' }
  },
  {
    id: 'card-10',
    title: 'LUMEN MATRIX',
    category: 'ui',
    subtitle: 'Next-Gen Interface Spiral',
    description: 'Clean glassmorphic UI cards displaying live data streams, code metrics, and interactive telemetry.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#14b8a6',
    tags: ['Dashboard UI', 'Glassmorphism', 'Telemetry'],
    prompt: 'Implement a next-generation floating UI spiral dashboard where each card shows interactive telemetry data with frosted glass.',
    stats: { fps: 60, depth: 'Interactive', vertices: '7.3k', downloads: '2,400' }
  }
];

export interface SpiralConfig {
  radius: number;          // Helix radius in px (180 - 450)
  pitch: number;           // Vertical elevation step per card (20 - 120)
  tightness: number;       // Rotations per total cards (0.5 - 3)
  tiltAngle: number;       // Stage tilt angle in degrees (-30 to +30)
  perspective: number;     // Camera perspective in px (800 - 2000)
  glassBlur: number;       // Frosted glass blur amount (0 - 20)
  aspectRatio: 'portrait' | 'landscape' | 'square';
  theme: 'tide' | 'matrix' | 'amber' | 'rose';
  autoRotate: boolean;
  rotationSpeed: number;   // Speed multiplier (0.1 - 2.0)
  visibleFarCards: boolean; // Toggle far-side visibility frosted effect
}

export const DEFAULT_SPIRAL_CONFIG: SpiralConfig = {
  radius: 229,
  pitch: 61,
  tightness: 1.4,
  tiltAngle: 1,
  perspective: 1200,
  glassBlur: 10,
  aspectRatio: 'portrait',
  theme: 'tide',
  autoRotate: true,
  rotationSpeed: 0.5,
  visibleFarCards: true,
};
