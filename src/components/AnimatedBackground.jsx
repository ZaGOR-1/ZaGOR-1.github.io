import { useEffect, useRef, useMemo } from 'react';

const AnimatedBackground = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);

  const config = useMemo(() => ({
    particleCount: 80,
    particleSize: 2,
    maxDistance: 150,
    mouseRadius: 200,
    particleSpeed: 0.3,
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.particleSpeed;
        this.vy = (Math.random() - 0.5) * config.particleSpeed;
        this.life = Math.random() * 100 + 150;
        this.maxLife = this.life;
      }

      update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseRadius) {
          const force = (config.mouseRadius - distance) / config.mouseRadius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.1;
          this.vy -= Math.sin(angle) * force * 0.1;
        }

        this.vx *= 0.99;
        this.vy *= 0.99;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));

        this.life -= 0.5;
        if (this.life <= 0) {
          this.reset();
        }
      }

      draw(ctx, opacity) {
        const lifeRatio = this.life / this.maxLife;
        const alpha = lifeRatio * opacity;
        
        ctx.fillStyle = darkMode 
          ? `rgba(147, 197, 253, ${alpha})`
          : `rgba(59, 130, 246, ${alpha})`;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, config.particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < config.particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    const drawConnections = () => {
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.maxDistance) {
            const opacity = (1 - distance / config.maxDistance) * 0.5;
            ctx.strokeStyle = darkMode
              ? `rgba(147, 197, 253, ${opacity * 0.3})`
              : `rgba(59, 130, 246, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current);
        particle.draw(ctx, 0.6);
      });

      drawConnections();

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    initParticles();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [darkMode, config]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

export default AnimatedBackground;
