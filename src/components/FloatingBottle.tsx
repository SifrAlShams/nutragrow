'use client';

import { useEffect, useRef } from 'react';

export default function FloatingBottle() {
  const bottleRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapInstance: any;
    let ScrollTriggerPlugin: any;

    const init = async () => {
      // Dynamically import GSAP to avoid SSR issues
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');

      gsapInstance = gsapModule.default;
      ScrollTriggerPlugin = stModule.ScrollTrigger;
      gsapInstance.registerPlugin(ScrollTriggerPlugin);

      const el = bottleRef.current;
      if (!el) return;

      // Create a timeline pinned to the scroll
      const tl = gsapInstance.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          endTrigger: '#reviews',
          end: 'top top',
          scrub: 1.5,
          // markers: true, // Uncomment to debug
        },
      });

      // Phase 1: Centered and large in hero — shrink + move right toward benefits
      tl.to(el, {
        scale: 0.55,
        xPercent: 100,
        rotation: 12,
        duration: 1,
        ease: 'none',
      });

      // Phase 2: Swing to left side for product detail
      tl.to(el, {
        scale: 0.7,
        xPercent: -100,
        rotation: -8,
        duration: 1,
        ease: 'none',
      });

      // Phase 3: Swing back right for ingredients
      tl.to(el, {
        scale: 0.45,
        xPercent: 80,
        rotation: 10,
        duration: 1,
        ease: 'none',
      });

      // Phase 4: Fade out
      tl.to(el, {
        opacity: 0,
        scale: 0.2,
        yPercent: -30,
        duration: 0.5,
        ease: 'none',
      });
    };

    // Only run on desktop
    if (window.innerWidth >= 768) {
      init();
    }

    return () => {
      if (ScrollTriggerPlugin) {
        ScrollTriggerPlugin.getAll().forEach((t: any) => t.kill());
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-30 hidden md:flex items-center justify-center"
    >
      <img
        ref={bottleRef}
        src="/images/studio_image1.jpeg"
        alt=""
        className="w-[280px] lg:w-[350px] object-contain drop-shadow-2xl"
        style={{
          mixBlendMode: 'multiply',
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
}
