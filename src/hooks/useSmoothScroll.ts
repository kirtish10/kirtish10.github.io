import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with premium inertia properties
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // satisfying spring damping curve
      smoothWheel: true,
    });

    // Sync ScrollTrigger updates on scroll events
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Synchronize Lenis with GSAP's ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);

    // Stop lag smoothing for exact timeline synchronization
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);
}

export default useSmoothScroll;
