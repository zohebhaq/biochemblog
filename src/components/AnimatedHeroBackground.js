"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './AnimatedHero.module.css';

export default function AnimatedHeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle system (Simulating molecules/nodes)
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 20); // Responsive amount of particles

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particleCount; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        
        // Seamless wrap around edges for continuous flow
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.6)'; // --bio-green
        ctx.fill();
        
        // Connect nearby particles to form chemical/neural networks
        for (let j = i + 1; j < particleCount; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Opacity fades as distance increases
            const opacity = 0.3 - (dist / 120) * 0.3;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`; // --med-purple
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Image 
        src="/images/hero_bg.png" 
        alt="Animated Molecular Background" 
        fill
        priority
        className={styles.backgroundImage}
      />
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <div className={styles.gradientOverlay}></div>
    </div>
  );
}
