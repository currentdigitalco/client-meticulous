"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ChevronDown, Phone, ArrowRight } from "lucide-react";

/* ============================================================
   TRANSITION CONFIGS — each screen gets unique choreography
   ============================================================ */
type TransitionType =
  | "fade"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "scaleZoom"
  | "wipeRight"
  | "wipeUp"
  | "rotateIn";

type Step2Reveal =
  | "wipeLeft"
  | "wipeRight"
  | "wipeUp"
  | "wipeDown"
  | "scaleReveal"
  | "splitOpen";

interface ScreenTransition {
  /** How this screen enters when navigating forward */
  enterForward: TransitionType;
  /** How the previous screen exits when navigating forward */
  exitForward: TransitionType;
  /** How the step-2 image overlay reveals */
  step2Reveal: Step2Reveal;
  /** Corner block position */
  cornerPosition: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /** Step-2 content entry direction */
  contentEntry: "fromRight" | "fromLeft" | "fromBottom" | "fromTop";
  /** Title scale factor for step-1 (Maman uses 1.3-1.5x) */
  titleScale: number;
  /** Background parallax direction during entry */
  bgParallax: "zoomIn" | "zoomOut" | "panLeft" | "panRight" | "panUp" | "none";
  /** Content alignment override */
  contentAlign?: "left" | "center" | "right";
}

const transitions: ScreenTransition[] = [
  // Landing — grand entrance
  {
    enterForward: "fade",
    exitForward: "scaleZoom",
    step2Reveal: "wipeLeft",
    cornerPosition: "bottom-right",
    contentEntry: "fromBottom",
    titleScale: 1.0,
    bgParallax: "zoomIn",
    contentAlign: "center",
  },
  // Story — slide up with wipe
  {
    enterForward: "slideUp",
    exitForward: "slideDown",
    step2Reveal: "wipeRight",
    cornerPosition: "bottom-right",
    contentEntry: "fromRight",
    titleScale: 1.3,
    bgParallax: "panRight",
  },
  // Lawn — scale zoom in
  {
    enterForward: "scaleZoom",
    exitForward: "fade",
    step2Reveal: "wipeUp",
    cornerPosition: "top-right",
    contentEntry: "fromBottom",
    titleScale: 1.5,
    bgParallax: "zoomOut",
  },
  // Hardscape — slide from left
  {
    enterForward: "slideLeft",
    exitForward: "wipeRight",
    step2Reveal: "scaleReveal",
    cornerPosition: "bottom-left",
    contentEntry: "fromLeft",
    titleScale: 1.2,
    bgParallax: "panLeft",
  },
  // Fencing — wipe up
  {
    enterForward: "wipeUp",
    exitForward: "slideUp",
    step2Reveal: "wipeDown",
    cornerPosition: "bottom-right",
    contentEntry: "fromRight",
    titleScale: 1.4,
    bgParallax: "panUp",
  },
  // Flooring — rotate in
  {
    enterForward: "rotateIn",
    exitForward: "scaleZoom",
    step2Reveal: "splitOpen",
    cornerPosition: "top-left",
    contentEntry: "fromBottom",
    titleScale: 1.3,
    bgParallax: "zoomIn",
  },
  // Snow — slide up dramatic
  {
    enterForward: "slideUp",
    exitForward: "fade",
    step2Reveal: "wipeLeft",
    cornerPosition: "bottom-right",
    contentEntry: "fromRight",
    titleScale: 1.5,
    bgParallax: "panRight",
  },
];

/* ============================================================
   SCREEN DATA
   ============================================================ */
const screens = [
  {
    id: "landing",
    baseline: "Experts since 2009",
    title: "Your Property.\nPerfected.",
    subtitle: "One company. Every season. Done right.",
    image: "/images/hero-landing.jpeg",
    link: "",
    linkLabel: "",
    step2Title: "",
    step2Subtitle: "",
    step2Body: "",
    step2Image: "",
  },
  {
    id: "story",
    baseline: "Since 2009",
    title: "Our Story",
    subtitle: "Meticulous isn't just our name.\nIt's our standard.",
    image: "/images/bg-story.jpeg",
    link: "#contact",
    linkLabel: "Get in touch",
    step2Title: "Our Story",
    step2Subtitle: "Meticulous isn't just our name — it's our standard.",
    step2Body:
      "Meticulous Mowing & Property Management began in 2009 as a lawn care service in Vermont. Since then, we've grown into a full-scope property company — hardscaping, fencing, flooring, snow removal, and construction. Though we're considerably larger, and though our expertise has grown from pristine lawn stripes to complete property transformations, our commitment to superior quality is as strong today as ever.",
    step2Image: "/images/detail-story.jpeg",
  },
  {
    id: "craft",
    baseline: "Our Craft",
    title: "Precision Lawn\n& Landscape",
    subtitle: "Diamond-cut stripes that stop traffic.",
    image: "/images/bg-lawn.jpeg",
    link: "#contact",
    linkLabel: "Schedule a consultation",
    step2Title: "Lawn & Landscape",
    step2Subtitle: "Every blade, every edge, every season.",
    step2Body:
      "Weekly mowing with competition-grade stripes. Edging, fertilization, overseeding, aeration, and full seasonal programs. Spring cleanups to fall leaf removal. We treat your property like the golf course down the road — because your home deserves the same precision.",
    step2Image: "/images/detail-lawn.jpeg",
  },
  {
    id: "hardscape",
    baseline: "Built to Endure",
    title: "Hardscape\n& Stone",
    subtitle: "Engineered for Vermont's freeze-thaw cycles.",
    image: "/images/bg-hardscape.jpeg",
    link: "#contact",
    linkLabel: "Start your project",
    step2Title: "Hardscape & Stone",
    step2Subtitle: "Bluestone, flagstone, retaining walls — built right the first time.",
    step2Body:
      "Patios, walkways, retaining walls, and steps built on engineered foundations. We source Vermont stone when possible and set every piece with the kind of care that means your patio looks better in year ten than year one. No shortcuts on the base. No compromises on drainage.",
    step2Image: "/images/detail-hardscape.jpeg",
  },
  {
    id: "fencing",
    baseline: "Every Style",
    title: "Fence\nInstallation",
    subtitle: "Posts anchored below the frost line.",
    image: "/images/bg-fencing.jpeg",
    link: "#contact",
    linkLabel: "Get a quote",
    step2Title: "Fence Installation",
    step2Subtitle: "Vinyl, cedar, chain-link, split rail — gates that swing true.",
    step2Body:
      "Every post set below the frost line. Every gate hung level. We install vinyl fencing for clean modern lines, cedar privacy for seclusion, chain-link for practical perimeters, and classic Vermont split rail. Your fence should look as good five winters from now as the day we build it.",
    step2Image: "/images/detail-fencing.jpeg",
  },
  {
    id: "flooring",
    baseline: "Inside & Out",
    title: "Interior\nFlooring",
    subtitle: "Your home, elevated from the ground up.",
    image: "/images/bg-flooring.jpeg",
    link: "#contact",
    linkLabel: "Discuss your floors",
    step2Title: "Interior Flooring",
    step2Subtitle: "The same precision we bring outside, applied inside your home.",
    step2Body:
      "Hardwood, luxury vinyl plank, ceramic tile — installed with meticulous attention to subfloor prep, transitions, and trim. We don't just lay flooring; we transform rooms. From bathroom tile to whole-home hardwood, every cut is measured twice.",
    step2Image: "/images/detail-flooring.jpeg",
  },
  {
    id: "seasons",
    baseline: "Every Season",
    title: "Snow &\nConstruction",
    subtitle: "Battling winter before you even wake up.",
    image: "/images/bg-snow.jpeg",
    link: "#contact",
    linkLabel: "Learn more",
    step2Title: "Snow Removal & Construction",
    step2Subtitle: "Four seasons of coverage. No gaps.",
    step2Body:
      "When Vermont buries your driveway at 3am, we're already on it. Commercial plowing, residential clearing, salt and sand applications — 24/7 storm response. Plus deck construction, outbuildings, and structural framing built to code and beyond expectation.",
    step2Image: "/images/detail-snow.jpeg",
  },
];

/* ============================================================
   ANIMATION HELPERS
   ============================================================ */
function getEnterProps(type: TransitionType) {
  switch (type) {
    case "slideUp":
      return { fromVars: { yPercent: 100, opacity: 1 }, toVars: { yPercent: 0 } };
    case "slideDown":
      return { fromVars: { yPercent: -100, opacity: 1 }, toVars: { yPercent: 0 } };
    case "slideLeft":
      return { fromVars: { xPercent: 100, opacity: 1 }, toVars: { xPercent: 0 } };
    case "scaleZoom":
      return { fromVars: { scale: 1.3, opacity: 0 }, toVars: { scale: 1, opacity: 1 } };
    case "wipeRight":
      return { fromVars: { clipPath: "inset(0 100% 0 0)", opacity: 1 }, toVars: { clipPath: "inset(0 0% 0 0)" } };
    case "wipeUp":
      return { fromVars: { clipPath: "inset(100% 0 0 0)", opacity: 1 }, toVars: { clipPath: "inset(0% 0 0 0)" } };
    case "rotateIn":
      return { fromVars: { rotateY: -8, scale: 0.9, opacity: 0, transformPerspective: 1200 }, toVars: { rotateY: 0, scale: 1, opacity: 1 } };
    case "fade":
    default:
      return { fromVars: { opacity: 0 }, toVars: { opacity: 1 } };
  }
}

function getExitProps(type: TransitionType) {
  switch (type) {
    case "slideUp":
      return { toVars: { yPercent: -100 } };
    case "slideDown":
      return { toVars: { yPercent: 100 } };
    case "slideLeft":
      return { toVars: { xPercent: -100 } };
    case "scaleZoom":
      return { toVars: { scale: 0.8, opacity: 0 } };
    case "wipeRight":
      return { toVars: { clipPath: "inset(0 0 0 100%)" } };
    case "wipeUp":
      return { toVars: { clipPath: "inset(0 0 100% 0)" } };
    case "fade":
    default:
      return { toVars: { opacity: 0 } };
  }
}

function getBgParallaxVars(type: string) {
  switch (type) {
    case "zoomIn":
      return { from: { scale: 1.15 }, to: { scale: 1 } };
    case "zoomOut":
      return { from: { scale: 1 }, to: { scale: 1.08 } };
    case "panLeft":
      return { from: { x: 40 }, to: { x: 0 } };
    case "panRight":
      return { from: { x: -40 }, to: { x: 0 } };
    case "panUp":
      return { from: { y: 30 }, to: { y: 0 } };
    default:
      return { from: {}, to: {} };
  }
}

function getStep2OverlayVars(reveal: Step2Reveal) {
  switch (reveal) {
    case "wipeLeft":
      return { from: { scaleX: 1, transformOrigin: "left top" }, to: { scaleX: 0 } };
    case "wipeRight":
      return { from: { scaleX: 1, transformOrigin: "right top" }, to: { scaleX: 0 } };
    case "wipeUp":
      return { from: { scaleY: 1, transformOrigin: "top" }, to: { scaleY: 0 } };
    case "wipeDown":
      return { from: { scaleY: 1, transformOrigin: "bottom" }, to: { scaleY: 0 } };
    case "scaleReveal":
      return { from: { scale: 1, transformOrigin: "center" }, to: { scale: 0, borderRadius: "50%" } };
    case "splitOpen":
      return { from: { clipPath: "inset(0 0 0 0)" }, to: { clipPath: "inset(0 50% 0 50%)" } };
  }
}

function getContentEntryVars(dir: string) {
  switch (dir) {
    case "fromRight":
      return { x: 60, y: 0 };
    case "fromLeft":
      return { x: -60, y: 0 };
    case "fromBottom":
      return { x: 0, y: 50 };
    case "fromTop":
      return { x: 0, y: -50 };
    default:
      return { x: 0, y: 40 };
  }
}

function getCornerStyle(pos: string): React.CSSProperties {
  const base: React.CSSProperties = { position: "absolute", width: "13%", maxWidth: 140, aspectRatio: "1 / 1.2", background: "var(--forest)", zIndex: 4 };
  switch (pos) {
    case "bottom-right":
      return { ...base, bottom: 0, right: 0 };
    case "bottom-left":
      return { ...base, bottom: 0, left: 0 };
    case "top-right":
      return { ...base, top: 0, right: 0 };
    case "top-left":
      return { ...base, top: 0, left: 0 };
    default:
      return { ...base, bottom: 0, right: 0 };
  }
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function MamanHomepage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRafRef = useRef<number>(0);
  const timerProgressRef = useRef(0);

  // Loading
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setLoaded(true), 400);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  /* ---- SCREEN TRANSITIONS (varied per screen) ---- */
  const goToScreen = useCallback(
    (index: number, step: 1 | 2 = 1) => {
      if (isTransitioning || index < 0 || index >= screens.length || index === currentScreen) return;
      setIsTransitioning(true);

      const currentEl = screenRefs.current[currentScreen];
      const nextEl = screenRefs.current[index];
      const goingForward = index > currentScreen;
      const nextTransition = transitions[index];
      const currentTransition = transitions[currentScreen];

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          // Reset previous screen
          if (currentEl) {
            gsap.set(currentEl, { clearProps: "all" });
            currentEl.classList.remove("active");
            // Reset step-2 visibility
            const s2 = currentEl.querySelector(".step-2") as HTMLElement;
            if (s2) gsap.set(s2, { visibility: "hidden", opacity: 0 });
            const s1 = currentEl.querySelector(".step-1") as HTMLElement;
            if (s1) gsap.set(s1, { opacity: 1 });
          }
          setCurrentScreen(index);
          setCurrentStep(step);
          setIsTransitioning(false);
        },
      });

      // EXIT current screen
      if (currentEl) {
        const exitType = goingForward ? currentTransition.exitForward : "fade";
        const { toVars } = getExitProps(exitType);
        tl.to(currentEl, { ...toVars, duration: 0.7 }, 0);
      }

      // ENTER next screen
      if (nextEl) {
        const enterType = goingForward ? nextTransition.enterForward : "slideDown";
        const { fromVars, toVars } = getEnterProps(enterType);
        nextEl.classList.add("active");
        tl.fromTo(nextEl, { ...fromVars, visibility: "visible" }, { ...toVars, visibility: "visible", duration: 0.9 }, 0.15);

        // Background parallax on entry
        const bg = nextEl.querySelector(".step-1-bg") as HTMLElement;
        if (bg && nextTransition.bgParallax !== "none") {
          const { from, to } = getBgParallaxVars(nextTransition.bgParallax);
          tl.fromTo(bg, { ...from }, { ...to, duration: 1.4, ease: "power2.out" }, 0.1);
        }
      }
    },
    [currentScreen, isTransitioning]
  );

  /* ---- STEP 2 REVEAL (varied per screen) ---- */
  const goToStep2 = useCallback(() => {
    if (isTransitioning || currentStep === 2 || currentScreen === 0) return;
    setIsTransitioning(true);

    const el = screenRefs.current[currentScreen];
    if (!el) { setIsTransitioning(false); return; }
    const trans = transitions[currentScreen];

    const step1 = el.querySelector(".step-1") as HTMLElement;
    const step2 = el.querySelector(".step-2") as HTMLElement;
    const overlay = el.querySelector(".step-2-image-overlay") as HTMLElement;
    const corner = el.querySelector(".step-2-corner") as HTMLElement;
    const lines = el.querySelectorAll(".step-2-line");
    const innerEls = el.querySelectorAll(".step-2-inner > *");

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setCurrentStep(2);
        setIsTransitioning(false);
      },
    });

    // Step-1 exit: scale the title up as it fades (like Maman)
    const titleEl = el.querySelector(".step-1-title") as HTMLElement;
    if (titleEl) {
      tl.to(titleEl, {
        scale: trans.titleScale,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      }, 0);
    }

    // Fade out rest of step-1
    tl.to(step1, { opacity: 0, duration: 0.5, ease: "power2.in" }, 0.1);

    // Step-2 enters
    tl.set(step2, { visibility: "visible", opacity: 1 }, 0.4);

    // Image overlay wipe (direction varies per screen)
    if (overlay) {
      const { from, to } = getStep2OverlayVars(trans.step2Reveal);
      tl.fromTo(overlay, { ...from }, { ...to, duration: 0.9, ease: "power3.inOut" }, 0.4);
    }

    // Corner block
    if (corner) {
      const cornerOrigin = trans.cornerPosition.includes("bottom") ? "bottom" : "top";
      tl.fromTo(
        corner,
        { scaleY: 0, transformOrigin: cornerOrigin },
        { scaleY: 1, duration: 0.7, ease: "back.out(1.4)" },
        0.6
      );
    }

    // Grid lines stagger
    if (lines.length) {
      tl.fromTo(lines, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" }, 0.7);
    }

    // Content elements stagger (direction varies)
    if (innerEls.length) {
      const { x, y } = getContentEntryVars(trans.contentEntry);
      tl.fromTo(
        innerEls,
        { opacity: 0, x, y },
        { opacity: 1, x: 0, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        0.8
      );
    }
  }, [currentScreen, currentStep, isTransitioning]);

  /* ---- STEP 2 → STEP 1 (reverse) ---- */
  const goToStep1FromStep2 = useCallback(() => {
    if (isTransitioning || currentStep === 1) return;
    setIsTransitioning(true);

    const el = screenRefs.current[currentScreen];
    if (!el) { setIsTransitioning(false); return; }

    const step1 = el.querySelector(".step-1") as HTMLElement;
    const step2 = el.querySelector(".step-2") as HTMLElement;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentStep(1);
        setIsTransitioning(false);
      },
    });

    // Step-2 scales down and fades
    tl.to(step2, { scale: 0.95, opacity: 0, duration: 0.5, ease: "power2.in" });
    tl.set(step2, { visibility: "hidden", clearProps: "scale" });

    // Step-1 fades back in
    const titleEl = el.querySelector(".step-1-title") as HTMLElement;
    if (titleEl) gsap.set(titleEl, { clearProps: "scale" });
    tl.to(step1, { opacity: 1, duration: 0.6, ease: "power2.out" });
  }, [currentScreen, currentStep, isTransitioning]);

  /* ---- NAVIGATION HANDLERS ---- */
  const handleNext = useCallback(() => {
    if (currentStep === 1 && currentScreen > 0) {
      goToStep2();
    } else if (currentStep === 2) {
      if (currentScreen < screens.length - 1) {
        goToScreen(currentScreen + 1, 1);
      } else {
        // Last screen, go back to top
        goToScreen(0, 1);
      }
    } else if (currentScreen === 0) {
      goToScreen(1, 1);
    }
  }, [currentScreen, currentStep, goToScreen, goToStep2]);

  const handlePrev = useCallback(() => {
    if (currentStep === 2) {
      goToStep1FromStep2();
    } else if (currentScreen > 0) {
      goToScreen(currentScreen - 1, 1);
    }
  }, [currentScreen, currentStep, goToScreen, goToStep1FromStep2]);

  // Wheel
  useEffect(() => {
    let lastWheel = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel < 900) return;
      lastWheel = now;
      if (e.deltaY > 0) handleNext();
      else handlePrev();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleNext, handlePrev]);

  // Touch
  useEffect(() => {
    let touchStartY = 0;
    const onStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) { delta > 0 ? handleNext() : handlePrev(); }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [handleNext, handlePrev]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); handleNext(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); handlePrev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  // Step-1 entry animations (lines + content)
  useEffect(() => {
    const el = screenRefs.current[currentScreen];
    if (!el || !loaded) return;

    const lines = el.querySelectorAll(".step-1-line");
    const baseline = el.querySelector(".step-1-baseline");
    const title = el.querySelector(".step-1-title");
    const subtitle = el.querySelector(".step-1-subtitle");
    const trans = transitions[currentScreen];

    const tl = gsap.timeline();

    // Lines draw in with varied timing per screen
    if (lines.length) {
      const isEvenScreen = currentScreen % 2 === 0;
      tl.fromTo(
        lines,
        { scaleY: 0, transformOrigin: isEvenScreen ? "top" : "bottom" },
        { scaleY: 1, duration: 1.2 + (currentScreen * 0.1), stagger: 0.2, ease: "power2.inOut" },
        0
      );
    }

    if (baseline) {
      tl.fromTo(baseline, { opacity: 0, y: 15, letterSpacing: "0.6em" }, { opacity: 1, y: 0, letterSpacing: "0.4em", duration: 0.7, ease: "power2.out" }, 0.4);
    }

    if (title) {
      // Landing gets centered reveal, others get left-aligned slide
      if (currentScreen === 0) {
        tl.fromTo(title, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }, 0.5);
      } else {
        const dir = currentScreen % 3;
        const fromX = dir === 0 ? -40 : dir === 1 ? 0 : 40;
        tl.fromTo(title, { opacity: 0, y: 40, x: fromX }, { opacity: 1, y: 0, x: 0, duration: 0.9, ease: "power3.out" }, 0.5);
      }
    }

    if (subtitle) {
      tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.8);
    }
  }, [currentScreen, loaded]);

  // Auto-advance timer
  useEffect(() => {
    if (!loaded || currentScreen === 0 || currentStep !== 1 || navOpen) return;

    const DURATION = 7000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      timerProgressRef.current = Math.min(1, elapsed / DURATION);
      const dot = document.querySelector(`.pagination-dot[data-index="${currentScreen}"] .pagination-timer-progress`) as SVGCircleElement | null;
      if (dot) dot.style.strokeDashoffset = String(38 - 38 * timerProgressRef.current);
      if (elapsed < DURATION) timerRafRef.current = requestAnimationFrame(tick);
    };
    timerRafRef.current = requestAnimationFrame(tick);
    autoTimerRef.current = setTimeout(handleNext, DURATION);

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      cancelAnimationFrame(timerRafRef.current);
      document.querySelectorAll(".pagination-timer-progress").forEach((el) => {
        (el as SVGCircleElement).style.strokeDashoffset = "38";
      });
    };
  }, [currentScreen, currentStep, loaded, navOpen, handleNext]);

  /* ============ RENDER ============ */
  return (
    <>
      {/* LOADER */}
      <div className={`loader ${loaded ? "done" : ""}`}>
        <div className="loader-logo">Meticulous</div>
        <div className="loader-progress">
          <div className="loader-bar">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="loader-text">quality is our standard</div>
        </div>
      </div>

      <div className="grain" aria-hidden="true" />

      {/* NAV */}
      <a href="/" className="nav-logo">Meticulous</a>
      <button
        className={`nav-toggle ${navOpen ? "open" : ""}`}
        onClick={() => setNavOpen(!navOpen)}
        aria-label={navOpen ? "Close navigation" : "Open navigation"}
      >
        <span className="nav-toggle-line" />
        <span className="nav-toggle-line" />
        <span className="nav-toggle-line" />
      </button>

      <div className={`nav-overlay ${navOpen ? "open" : ""}`}>
        <div>
          <ul className="nav-overlay-list">
            {screens.slice(1).map((screen, i) => (
              <li key={screen.id} className="nav-overlay-item">
                <button
                  className="nav-overlay-link"
                  onClick={() => { setNavOpen(false); setTimeout(() => goToScreen(i + 1, 1), 300); }}
                  style={{ background: "none", border: "none", cursor: "pointer", width: "100%" }}
                >
                  {screen.step2Title || screen.title.replace("\n", " ")}
                </button>
              </li>
            ))}
          </ul>
          <div className="nav-overlay-contact">
            <a href="tel:802-342-8293"><Phone className="inline-block mr-2" size={14} strokeWidth={2} />802-342-8293</a>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        {screens.map((_, i) => (
          <button
            key={i}
            className={`pagination-dot ${i === currentScreen ? "active" : ""}`}
            data-index={i}
            onClick={() => goToScreen(i, 1)}
            aria-label={`Go to section ${i + 1}`}
          >
            <svg className="pagination-timer" viewBox="0 0 28 28">
              <circle className="pagination-timer-bg" cx="14" cy="14" r="6" />
              <circle className="pagination-timer-progress" cx="14" cy="14" r="6" />
            </svg>
            <span className="pagination-dot-inner" />
          </button>
        ))}
        <div className="pagination-number">
          {String(currentScreen + 1).padStart(2, "0")}/{String(screens.length).padStart(2, "0")}
        </div>
      </div>

      {/* SCROLL CTA */}
      <button className="scroll-cta" onClick={handleNext}>
        <span className="scroll-cta-label">
          {currentScreen === screens.length - 1 && currentStep === 2 ? "Back to top" : "Scroll to explore"}
        </span>
        <ChevronDown className="scroll-cta-arrow" strokeWidth={2} />
      </button>

      {/* SCREENS */}
      <div className="page-container">
        {screens.map((screen, i) => {
          const trans = transitions[i];
          const isLanding = i === 0;

          return (
            <div
              key={screen.id}
              ref={(el) => { screenRefs.current[i] = el; }}
              className={`screen ${i === currentScreen ? "active" : ""}`}
            >
              {/* STEP 1 */}
              <div className="step-1" style={isLanding ? { justifyContent: "center", paddingLeft: 0, textAlign: "center" } : undefined}>
                <div className="step-1-bg">
                  <img src={screen.image} alt="" loading={i < 2 ? "eager" : "lazy"} />
                </div>
                <div className="step-1-lines">
                  <div className="step-1-line" />
                  <div className="step-1-line" />
                  {/* Extra line on some screens */}
                  {i % 2 === 0 && <div className="step-1-line" style={{ left: "75%", opacity: 0.04 }} />}
                </div>
                <div className="step-1-content" style={isLanding ? { maxWidth: 900, textAlign: "center", margin: "0 auto" } : undefined}>
                  {screen.baseline && <div className="step-1-baseline">{screen.baseline}</div>}
                  <h1 className="step-1-title">
                    {screen.title.split("\n").map((line, j) => (
                      <span key={j}>{line}{j < screen.title.split("\n").length - 1 && <br />}</span>
                    ))}
                  </h1>
                  {screen.subtitle && (
                    <p className="step-1-subtitle">
                      {screen.subtitle.split("\n").map((line, j) => (
                        <span key={j}>{line}{j < screen.subtitle.split("\n").length - 1 && <br />}</span>
                      ))}
                    </p>
                  )}
                </div>
              </div>

              {/* STEP 2 (not on landing) */}
              {!isLanding && screen.step2Body && (
                <div className="step-2">
                  <div className="step-2-image">
                    <img src={screen.step2Image} alt={screen.step2Title} loading="lazy" />
                    <div className="step-2-image-overlay" />
                  </div>
                  <div className="step-2-content">
                    <div className="step-2-inner">
                      <h2 className="step-2-inner-title">{screen.step2Title}</h2>
                      <p className="step-2-inner-subtitle">{screen.step2Subtitle}</p>
                      <p className="step-2-inner-body">{screen.step2Body}</p>
                      {screen.linkLabel && (
                        <a
                          href={screen.link}
                          className="step-2-inner-link"
                          onClick={(e) => { e.preventDefault(); goToScreen(screens.length - 1, 1); }}
                        >
                          {screen.linkLabel}
                          <ArrowRight size={14} strokeWidth={2} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="step-2-corner" style={getCornerStyle(trans.cornerPosition)} />
                  <div className="step-2-lines">
                    <div className="step-2-line" />
                    <div className="step-2-line" />
                    <div className="step-2-line" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
