(() => {
  const root = document.documentElement;
  const scenes = Array.from(document.querySelectorAll("[data-scroll-scene]"));
  const questList = document.querySelector(".quest-list");
  const depthValue = document.querySelector(".depth-readout span");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (value, minimum = 0, maximum = 1) =>
    Math.min(maximum, Math.max(minimum, value));
  let current = window.scrollY;
  let target = current;
  let scrollFrame = 0;

  const paintScroll = () => {
    current += (target - current) * 0.12;
    const pageRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pageProgress = clamp(current / pageRange);
    const heroProgress = clamp(current / Math.max(1, window.innerHeight));

    root.style.setProperty("--scroll-progress", pageProgress.toFixed(4));
    root.style.setProperty("--cave-shift", `${Math.max(-60, current * -0.04)}px`);
    root.style.setProperty("--glow-shift", `${Math.min(60, current * 0.035)}px`);
    root.style.setProperty("--copy-shift", `${heroProgress * -12}px`);
    root.style.setProperty("--profile-shift", `${heroProgress * 12}px`);

    scenes.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const progress = clamp((window.innerHeight - rect.top) / travel);
      scene.style.setProperty("--scene-progress", progress.toFixed(4));
    });

    if (questList) {
      const rect = questList.getBoundingClientRect();
      const progress = clamp((window.innerHeight * 0.72 - rect.top) / Math.max(1, rect.height * 0.82));
      questList.style.setProperty("--quest-progress", `${progress * 100}%`);
    }

    if (depthValue) {
      depthValue.textContent = String(Math.round(pageProgress * 999)).padStart(3, "0");
    }

    if (Math.abs(target - current) > 0.08) {
      scrollFrame = window.requestAnimationFrame(paintScroll);
    } else {
      current = target;
      scrollFrame = 0;
    }
  };

  const resetScroll = () => {
    root.style.setProperty("--scroll-progress", "0");
    root.style.setProperty("--cave-shift", "0px");
    root.style.setProperty("--glow-shift", "0px");
    root.style.setProperty("--copy-shift", "0px");
    root.style.setProperty("--profile-shift", "0px");
    scenes.forEach((scene) => scene.style.setProperty("--scene-progress", "1"));
    questList?.style.setProperty("--quest-progress", "100%");
  };

  const updateScroll = () => {
    if (reduceMotion.matches) {
      resetScroll();
      return;
    }
    target = window.scrollY;
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(paintScroll);
  };

  const canvas = document.querySelector(".portal-canvas");
  const portal = canvas?.parentElement;
  const context = canvas?.getContext("2d");
  const colors = ["#59f2db", "#edfffe", "#ff9db1"];
  let particleFrame = 0;
  let particles = [];
  let width = 0;
  let height = 0;
  let pointerX = 0;
  let pointerY = 0;
  let previousTime = performance.now();

  const createParticles = (count) => Array.from({ length: count }, (_, index) => {
    const normalized = (index + 1) / count;
    return {
      angle: index * 2.399963 + normalized * 0.8,
      color: colors[index % colors.length],
      layer: 0.35 + ((index * 17) % 65) / 100,
      radius: 0.46 + ((index * 29) % 52) / 100,
      size: 0.7 + ((index * 11) % 18) / 10,
      speed: 0.00008 + ((index * 7) % 9) * 0.000018,
    };
  });

  const resizePortal = () => {
    if (!canvas || !portal || !context) return;
    const bounds = portal.getBoundingClientRect();
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

  const drawPortal = (time) => {
    if (!context) return;
    const elapsed = Math.min(40, time - previousTime);
    previousTime = time;
    const scrollDepth = Number.parseFloat(getComputedStyle(root).getPropertyValue("--scroll-progress")) || 0;
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
      const orbit = baseRadius * (particle.radius + ripple + pointerForce * particle.layer * 0.08);
      const x = centerX + Math.cos(particle.angle) * orbit * 1.02 + pointerX * 7 * particle.layer;
      const y = centerY + Math.sin(particle.angle) * orbit * 0.62 + pointerY * 7 * particle.layer;
      context.beginPath();
      context.fillStyle = particle.color;
      context.globalAlpha = 0.24 + particle.layer * 0.66;
      context.arc(x, y, particle.size * particle.layer, 0, Math.PI * 2);
      context.fill();
    });
    context.restore();
  };

  const animatePortal = (time) => {
    drawPortal(time);
    if (!reduceMotion.matches && !document.hidden) {
      particleFrame = window.requestAnimationFrame(animatePortal);
    }
  };

  const restartPortal = () => {
    if (!context) return;
    if (particleFrame) window.cancelAnimationFrame(particleFrame);
    particleFrame = 0;
    previousTime = performance.now();
    if (reduceMotion.matches || document.hidden) {
      drawPortal(previousTime);
    } else {
      particleFrame = window.requestAnimationFrame(animatePortal);
    }
  };

  const handleMotionPreference = () => {
    if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    current = window.scrollY;
    target = current;
    updateScroll();
    restartPortal();
  };

  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll);
  reduceMotion.addEventListener("change", handleMotionPreference);
  updateScroll();

  if (canvas && portal && context) {
    const observer = new ResizeObserver(() => {
      resizePortal();
      drawPortal(performance.now());
    });
    resizePortal();
    observer.observe(portal);
    portal.addEventListener("pointermove", (event) => {
      const bounds = portal.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    }, { passive: true });
    portal.addEventListener("pointerleave", () => {
      pointerX = 0;
      pointerY = 0;
    });
    document.addEventListener("visibilitychange", restartPortal);
    restartPortal();
  }
})();
