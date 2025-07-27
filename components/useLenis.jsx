"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function useLenis({
  smooth = true,
  duration = 1.2,
  easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation = 'vertical',
  gestureOrientation = 'vertical',
  smoothWheel = true,
  wheelMultiplier = 1,
  touchMultiplier = 2,
  infinite = false,
} = {}) {
  useEffect(() => {
    const lenis = new Lenis({
      smooth,
      duration,
      easing,
      orientation,
      gestureOrientation,
      smoothWheel,
      wheelMultiplier,
      touchMultiplier,
      infinite,
    });

    // Enhanced RAF loop with GSAP integration
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Prevent scroll restoration on page refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    return () => {
      lenis.destroy();
    };
  }, [smooth, duration, easing, orientation, gestureOrientation, smoothWheel, wheelMultiplier, touchMultiplier, infinite]);
}
