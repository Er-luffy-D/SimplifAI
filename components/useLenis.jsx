"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function useLenis({
  smooth = true,
  duration = 1.45,
  easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
} = {}) {
  useEffect(() => {
    const lenis = new Lenis({
      smooth,
      duration,
      easing,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [smooth, duration, easing]);
}
