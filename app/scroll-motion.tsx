"use client";

import { useEffect } from "react";

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-scene]"),
    );
    const questList = document.querySelector<HTMLElement>(".quest-list");
    const depthValue = document.querySelector<HTMLElement>(".depth-readout span");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = window.scrollY;
    let target = current;
    let frame = 0;

    const paint = () => {
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
        frame = window.requestAnimationFrame(paint);
      } else {
        current = target;
        frame = 0;
      }
    };

    const resetMotion = () => {
      root.style.setProperty("--scroll-progress", "0");
      root.style.setProperty("--cave-shift", "0px");
      root.style.setProperty("--glow-shift", "0px");
      root.style.setProperty("--copy-shift", "0px");
      root.style.setProperty("--profile-shift", "0px");
      scenes.forEach((scene) => scene.style.setProperty("--scene-progress", "1"));
      questList?.style.setProperty("--quest-progress", "100%");
    };

    const update = () => {
      if (reduceMotion.matches) {
        resetMotion();
        return;
      }
      target = window.scrollY;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const handleMotionPreference = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      current = window.scrollY;
      target = current;
      update();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    reduceMotion.addEventListener("change", handleMotionPreference);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reduceMotion.removeEventListener("change", handleMotionPreference);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
