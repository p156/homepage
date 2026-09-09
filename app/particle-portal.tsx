"use client";

import { useEffect, useRef } from "react";

type Particle = {
  angle: number;
  color: string;
  layer: number;
  radius: number;
  size: number;
  speed: number;
};

const COLORS = ["#59f2db", "#edfffe", "#ff9db1"];

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const normalized = (index + 1) / count;
    return {
      angle: index * 2.399963 + normalized * 0.8,
      color: COLORS[index % COLORS.length],
      layer: 0.35 + ((index * 17) % 65) / 100,
      radius: 0.46 + ((index * 29) % 52) / 100,
      size: 0.7 + ((index * 11) % 18) / 10,
      speed: 0.00008 + ((index * 7) % 9) * 0.000018,
    };
  });
}

export default function ParticlePortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;
    let previousTime = performance.now();

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width <= 620 ? 110 : 220);
    };

    const draw = (time: number) => {
      const elapsed = Math.min(40, time - previousTime);
      previousTime = time;
      const scrollDepth = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--scroll-progress"),
      ) || 0;
      const centerX = width * 0.5;
      const centerY = height * 0.43;
      const baseRadius = Math.min(width, height) * (0.35 + scrollDepth * 0.025);
      const pointerForce = Math.min(1, Math.hypot(pointerX, pointerY));

      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle, index) => {
        if (!reduceMotion.matches) {
          particle.angle += elapsed * particle.speed * (1 + scrollDepth * 2.2);
        }

        const ripple = Math.sin(particle.angle * 3 + index * 0.17) * 0.035;
        const pointerLift = pointerForce * particle.layer * 0.08;
        const orbit = baseRadius * (particle.radius + ripple + pointerLift);
        const x = centerX + Math.cos(particle.angle) * orbit * 1.02 + pointerX * 7 * particle.layer;
        const y = centerY + Math.sin(particle.angle) * orbit * 0.62 + pointerY * 7 * particle.layer;
        const alpha = 0.24 + particle.layer * 0.66;

        context.beginPath();
        context.fillStyle = particle.color;
        context.globalAlpha = alpha;
        context.arc(x, y, particle.size * particle.layer, 0, Math.PI * 2);
        context.fill();
      });

      context.restore();
    };

    const animate = (time: number) => {
      draw(time);
      if (!reduceMotion.matches && !document.hidden) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const restart = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = performance.now();
      if (reduceMotion.matches || document.hidden) {
        draw(previousTime);
      } else {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const handlePointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const observer = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });

    resize();
    observer.observe(host);
    host.addEventListener("pointermove", handlePointerMove, { passive: true });
    host.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", restart);
    reduceMotion.addEventListener("change", restart);
    restart();

    return () => {
      observer.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", restart);
      reduceMotion.removeEventListener("change", restart);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="portal-canvas" ref={canvasRef} aria-hidden="true" />;
}
