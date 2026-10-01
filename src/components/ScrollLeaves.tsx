'use client';

import { useEffect, useRef } from 'react';

export default function ScrollLeaves() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let gsapInstance: any;
    let ScrollTriggerPlugin: any;
    let animations: any[] = [];

    const init = async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');

      gsapInstance = gsapModule.default;
      ScrollTriggerPlugin = stModule.ScrollTrigger;
      gsapInstance.registerPlugin(ScrollTriggerPlugin);

      const container = containerRef.current;
      if (!container) return;

      // Create leaf elements
      const leafCount = 18;
      const leafSVGs = [
        // Simple leaf shape 1
        `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2C20 2 8 14 8 24C8 30.627 13.373 36 20 36C26.627 36 32 30.627 32 24C32 14 20 2 20 2Z" fill="currentColor" opacity="0.7"/><line x1="20" y1="8" x2="20" y2="34" stroke="white" stroke-width="0.8" opacity="0.5"/></svg>`,
        // Rounder leaf
        `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="20" rx="10" ry="16" fill="currentColor" opacity="0.6" transform="rotate(-30 20 20)"/><line x1="14" y1="30" x2="26" y2="10" stroke="white" stroke-width="0.6" opacity="0.4"/></svg>`,
        // Small petal
        `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4C14 10 10 18 12 26C14 34 20 36 20 36C20 36 26 34 28 26C30 18 26 10 20 4Z" fill="currentColor" opacity="0.5"/></svg>`,
      ];

      const colors = [
        '#16a34a', // green-600
        '#22c55e', // green-500
        '#4ade80', // green-400
        '#86efac', // green-300
        '#15803d', // green-700
        '#a3e635', // lime-400
      ];

      const leaves: HTMLDivElement[] = [];

      for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.innerHTML = leafSVGs[i % leafSVGs.length];
        const size = 16 + Math.random() * 28; // 16-44px
        leaf.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          color: ${colors[i % colors.length]};
          pointer-events: none;
          z-index: 25;
          opacity: 0;
          left: ${Math.random() * 100}vw;
          top: ${-10 - Math.random() * 20}%;
        `;
        container.appendChild(leaf);
        leaves.push(leaf);
      }

      // Animate each leaf with its own ScrollTrigger
      leaves.forEach((leaf, i) => {
        const startX = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 40; // lateral drift in vw
        const startScroll = Math.random() * 0.3; // stagger when they start (0-30% into scroll)
        const fallDuration = 0.4 + Math.random() * 0.4; // how much of scroll they take

        // Determine start and end sections based on index
        const sections = ['#hero', '#benefits', '#product', '#ingredients', '#reviews'];
        const triggerIdx = i % (sections.length - 1);
        const triggerSection = sections[triggerIdx];
        const endSection = sections[triggerIdx + 1];

        const anim = gsapInstance.timeline({
          scrollTrigger: {
            trigger: triggerSection,
            start: 'top top',
            endTrigger: endSection,
            end: 'bottom top',
            scrub: 1 + Math.random() * 2,
          },
        });

        anim
          .fromTo(
            leaf,
            {
              opacity: 0,
              x: 0,
              y: 0,
              rotation: Math.random() * 60 - 30,
              scale: 0.3,
            },
            {
              opacity: 0.8,
              y: '30vh',
              x: `${drift}vw`,
              rotation: Math.random() * 360 - 180,
              scale: 0.8 + Math.random() * 0.5,
              duration: 0.4,
              ease: 'none',
            }
          )
          .to(leaf, {
            y: '110vh',
            x: `${drift + (Math.random() - 0.5) * 20}vw`,
            rotation: `+=${180 + Math.random() * 360}`,
            opacity: 0,
            scale: 0.4,
            duration: 0.6,
            ease: 'none',
          });

        animations.push(anim);
      });
    };

    init();

    const currentContainer = containerRef.current;

    return () => {
      if (ScrollTriggerPlugin) {
        ScrollTriggerPlugin.getAll().forEach((t: any) => t.kill());
      }
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-20 overflow-hidden hidden md:block" />;
}
