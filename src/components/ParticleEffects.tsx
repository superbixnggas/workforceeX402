import React from 'react';

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
}

const ParticleEffects: React.FC = () => {
  // Generate random particles
  const particles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 20}s`,
    duration: `${15 + Math.random() * 10}s`,
  }));

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffects;