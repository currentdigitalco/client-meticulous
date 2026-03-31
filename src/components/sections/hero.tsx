"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Word-by-word stagger reveal
      const words = headingRef.current?.querySelectorAll(".hero-word");
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.3,
            delay: 0.5,
          }
        );
      }

      // Subtitle fade
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.8 }
      );

      // Scroll prompt
      gsap.fromTo(
        ".scroll-prompt",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 2.4 }
      );

      // Pin and zoom on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=80%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (bgRef.current) {
            gsap.set(bgRef.current, {
              scale: 1 + progress * 0.4,
            });
          }
          if (overlayRef.current) {
            gsap.set(overlayRef.current, {
              opacity: 0.4 + progress * 0.3,
            });
          }
          if (headingRef.current) {
            gsap.set(headingRef.current, {
              opacity: 1 - progress * 1.5,
              y: -progress * 100,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image — drone overhead shot placeholder */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://picsum.photos/seed/meticulous-drone/1920/1080')`,
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-soil/50 via-soil/30 to-soil/70"
      />

      {/* Content */}
      <div ref={headingRef} className="relative z-10 text-center px-6 will-change-transform">
        <div className="overflow-hidden">
          <h1 className="font-display leading-[0.9] tracking-tight text-cream">
            <span className="hero-word inline-block text-[12vw] md:text-[10vw]">
              Your Property.
            </span>
            <br />
            <span className="hero-word inline-block text-[12vw] md:text-[10vw]">
              Perfected.
            </span>
          </h1>
        </div>

        <p className="hero-subtitle mt-8 max-w-xl mx-auto text-lg md:text-xl text-stone-light/90 font-medium tracking-wide">
          One Company. Every Season. Done Right.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-prompt absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-light/60">
          Explore
        </span>
        <ChevronDown className="h-5 w-5 text-stone-light/60 animate-bounce" />
      </div>

      {/* Leaf particles — very subtle */}
      <LeafParticles />
    </section>
  );
}

function LeafParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const leaves: Leaf[] = [];
    const LEAF_COUNT = 5;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    interface Leaf {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }

    for (let i = 0; i < LEAF_COUNT; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 4 + Math.random() * 6,
        speedX: -0.2 + Math.random() * 0.4,
        speedY: 0.3 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.15 + Math.random() * 0.15,
      });
    }

    function drawLeaf(leaf: Leaf) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.opacity;
      ctx.fillStyle = "#7B6B4F";
      ctx.beginPath();
      ctx.ellipse(0, 0, leaf.size, leaf.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const leaf of leaves) {
        leaf.x += leaf.speedX;
        leaf.y += leaf.speedY;
        leaf.rotation += leaf.rotationSpeed;

        if (leaf.y > canvas.height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * canvas.width;
        }
        if (leaf.x < -20 || leaf.x > canvas.width + 20) {
          leaf.x = Math.random() * canvas.width;
          leaf.y = -20;
        }

        drawLeaf(leaf);
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
