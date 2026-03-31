"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ChevronDown, Phone, ArrowRight } from "lucide-react";

/* ============================================================
   TRANSITION CONFIGS — unique choreography per screen
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

interface ScreenTransition {
  enterForward: TransitionType;
  exitForward: TransitionType;
  bgParallax: "zoomIn" | "zoomOut" | "panLeft" | "panRight" | "panUp" | "none";
  /** Direction content staggers from */
  contentFrom: "bottom" | "left" | "right";
}

const transitions: ScreenTransition[] = [
  { enterForward: "fade", exitForward: "scaleZoom", bgParallax: "zoomIn", contentFrom: "bottom" },
  { enterForward: "slideUp", exitForward: "slideDown", bgParallax: "panRight", contentFrom: "left" },
  { enterForward: "scaleZoom", exitForward: "fade", bgParallax: "zoomOut", contentFrom: "bottom" },
  { enterForward: "slideLeft", exitForward: "wipeRight", bgParallax: "panLeft", contentFrom: "right" },
  { enterForward: "wipeUp", exitForward: "slideUp", bgParallax: "panUp", contentFrom: "left" },
  { enterForward: "rotateIn", exitForward: "scaleZoom", bgParallax: "zoomIn", contentFrom: "bottom" },
  { enterForward: "slideUp", exitForward: "fade", bgParallax: "panRight", contentFrom: "right" },
];

/* ============================================================
   SCREEN DATA — single view per section
   ============================================================ */
const screens = [
  {
    id: "landing",
    baseline: "Experts since 2009",
    title: "Your Property.\nPerfected.",
    subtitle: "One company. Every season. Done right.",
    body: "",
    image: "/images/hero-landing.jpeg",
    cta: "",
    ctaLabel: "",
    layout: "center" as const,
  },
  {
    id: "story",
    baseline: "Since 2009",
    title: "Our Story",
    subtitle: "Meticulous isn't just our name — it's our standard.",
    body: "Meticulous Mowing & Property Management began in 2009 as a lawn care service in Vermont. Since then, we've grown into a full-scope property company — hardscaping, fencing, flooring, snow removal, and construction. Though we're considerably larger, our commitment to superior quality is as strong today as ever.",
    image: "/images/bg-story.jpeg",
    cta: "#contact",
    ctaLabel: "Get in touch",
    layout: "left" as const,
  },
  {
    id: "craft",
    baseline: "Our Craft",
    title: "Precision Lawn\n& Landscape",
    subtitle: "Every blade, every edge, every season.",
    body: "Weekly mowing with competition-grade stripes. Edging, fertilization, overseeding, aeration, and full seasonal programs. Spring cleanups to fall leaf removal. We treat your property like the golf course down the road — because your home deserves the same precision.",
    image: "/images/bg-lawn.jpeg",
    cta: "#contact",
    ctaLabel: "Schedule a consultation",
    layout: "left" as const,
  },
  {
    id: "hardscape",
    baseline: "Built to Endure",
    title: "Hardscape\n& Stone",
    subtitle: "Bluestone, flagstone, retaining walls — built right the first time.",
    body: "Patios, walkways, retaining walls, and steps built on engineered foundations. We source Vermont stone when possible and set every piece with the kind of care that means your patio looks better in year ten than year one. No shortcuts on the base. No compromises on drainage.",
    image: "/images/bg-hardscape.jpeg",
    cta: "#contact",
    ctaLabel: "Start your project",
    layout: "right" as const,
  },
  {
    id: "fencing",
    baseline: "Every Style",
    title: "Fence\nInstallation",
    subtitle: "Vinyl, cedar, chain-link, split rail — gates that swing true.",
    body: "Every post set below the frost line. Every gate hung level. We install vinyl fencing for clean modern lines, cedar privacy for seclusion, chain-link for practical perimeters, and classic Vermont split rail. Your fence should look as good five winters from now as the day we build it.",
    image: "/images/bg-fencing.jpeg",
    cta: "#contact",
    ctaLabel: "Get a quote",
    layout: "left" as const,
  },
  {
    id: "flooring",
    baseline: "Inside & Out",
    title: "Interior\nFlooring",
    subtitle: "The same precision we bring outside, applied inside your home.",
    body: "Hardwood, luxury vinyl plank, ceramic tile — installed with meticulous attention to subfloor prep, transitions, and trim. We don't just lay flooring; we transform rooms. From bathroom tile to whole-home hardwood, every cut is measured twice.",
    image: "/images/bg-flooring.jpeg",
    cta: "#contact",
    ctaLabel: "Discuss your floors",
    layout: "right" as const,
  },
  {
    id: "seasons",
    baseline: "Every Season",
    title: "Snow &\nConstruction",
    subtitle: "Four seasons of coverage. No gaps.",
    body: "When Vermont buries your driveway at 3am, we're already on it. Commercial plowing, residential clearing, salt and sand applications — 24/7 storm response. Plus deck construction, outbuildings, and structural framing built to code and beyond expectation.",
    image: "/images/bg-snow.jpeg",
    cta: "#contact",
    ctaLabel: "Learn more",
    layout: "left" as const,
  },
];

/* ============================================================
   ANIMATION HELPERS
   ============================================================ */
function getEnterProps(type: TransitionType) {
  switch (type) {
    case "slideUp": return { fromVars: { yPercent: 100, opacity: 1 }, toVars: { yPercent: 0 } };
    case "slideDown": return { fromVars: { yPercent: -100, opacity: 1 }, toVars: { yPercent: 0 } };
    case "slideLeft": return { fromVars: { xPercent: 100, opacity: 1 }, toVars: { xPercent: 0 } };
    case "scaleZoom": return { fromVars: { scale: 1.3, opacity: 0 }, toVars: { scale: 1, opacity: 1 } };
    case "wipeRight": return { fromVars: { clipPath: "inset(0 100% 0 0)", opacity: 1 }, toVars: { clipPath: "inset(0 0% 0 0)" } };
    case "wipeUp": return { fromVars: { clipPath: "inset(100% 0 0 0)", opacity: 1 }, toVars: { clipPath: "inset(0% 0 0 0)" } };
    case "rotateIn": return { fromVars: { rotateY: -8, scale: 0.9, opacity: 0, transformPerspective: 1200 }, toVars: { rotateY: 0, scale: 1, opacity: 1 } };
    default: return { fromVars: { opacity: 0 }, toVars: { opacity: 1 } };
  }
}

function getExitProps(type: TransitionType) {
  switch (type) {
    case "slideUp": return { toVars: { yPercent: -100 } };
    case "slideDown": return { toVars: { yPercent: 100 } };
    case "slideLeft": return { toVars: { xPercent: -100 } };
    case "scaleZoom": return { toVars: { scale: 0.8, opacity: 0 } };
    case "wipeRight": return { toVars: { clipPath: "inset(0 0 0 100%)" } };
    case "wipeUp": return { toVars: { clipPath: "inset(0 0 100% 0)" } };
    default: return { toVars: { opacity: 0 } };
  }
}

function getBgParallaxVars(type: string) {
  switch (type) {
    case "zoomIn": return { from: { scale: 1.15 }, to: { scale: 1 } };
    case "zoomOut": return { from: { scale: 1 }, to: { scale: 1.08 } };
    case "panLeft": return { from: { x: 40 }, to: { x: 0 } };
    case "panRight": return { from: { x: -40 }, to: { x: 0 } };
    case "panUp": return { from: { y: 30 }, to: { y: 0 } };
    default: return { from: {}, to: {} };
  }
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function MamanHomepage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRafRef = useRef<number>(0);

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

  /* ---- Animate content elements into a screen ---- */
  const animateContentIn = useCallback((el: HTMLElement, screenIndex: number, delay: number) => {
    const trans = transitions[screenIndex];
    const lines = el.querySelectorAll(".screen-line");
    const contentEls = el.querySelectorAll(".screen-content > *");
    const accentBar = el.querySelector(".accent-bar");

    const tl = gsap.timeline({ delay });

    // Pre-set content invisible so there's no flash
    if (contentEls.length) gsap.set(contentEls, { opacity: 0 });
    if (accentBar) gsap.set(accentBar, { scaleX: 0 });
    if (lines.length) gsap.set(lines, { scaleY: 0 });

    // Lines draw in
    if (lines.length) {
      const fromOrigin = screenIndex % 2 === 0 ? "top" : "bottom";
      tl.to(lines, { scaleY: 1, transformOrigin: fromOrigin, duration: 1.2, stagger: 0.15, ease: "power2.inOut" }, 0);
    }

    // Accent bar
    if (accentBar) {
      tl.to(accentBar, { scaleX: 1, transformOrigin: "left", duration: 0.8, ease: "power3.out" }, 0.3);
    }

    // Content staggers in
    if (contentEls.length) {
      const fromX = trans.contentFrom === "left" ? -50 : trans.contentFrom === "right" ? 50 : 0;
      const fromY = trans.contentFrom === "bottom" ? 40 : 0;
      tl.fromTo(
        contentEls,
        { opacity: 0, x: fromX, y: fromY },
        { opacity: 1, x: 0, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" },
        0.3
      );
    }
  }, []);

  /* ---- SCREEN TRANSITIONS ---- */
  const goToScreen = useCallback(
    (index: number) => {
      if (isTransitioning || index < 0 || index >= screens.length || index === currentScreen) return;
      setIsTransitioning(true);

      const currentEl = screenRefs.current[currentScreen];
      const nextEl = screenRefs.current[index];
      const goingForward = index > currentScreen;
      const nextTrans = transitions[index];
      const currentTrans = transitions[currentScreen];

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          if (currentEl) {
            gsap.set(currentEl, { clearProps: "all" });
            currentEl.classList.remove("active");
          }
          setCurrentScreen(index);
          setIsTransitioning(false);

          // Animate content AFTER transition completes
          if (nextEl) {
            animateContentIn(nextEl, index, 0);
          }
        },
      });

      // Pre-hide next screen's content so it doesn't flash during the screen transition
      if (nextEl) {
        const nextContentEls = nextEl.querySelectorAll(".screen-content > *");
        const nextAccent = nextEl.querySelector(".accent-bar");
        const nextLines = nextEl.querySelectorAll(".screen-line");
        if (nextContentEls.length) gsap.set(nextContentEls, { opacity: 0 });
        if (nextAccent) gsap.set(nextAccent, { scaleX: 0 });
        if (nextLines.length) gsap.set(nextLines, { scaleY: 0 });
      }

      // EXIT
      if (currentEl) {
        const exitType = goingForward ? currentTrans.exitForward : "fade";
        const { toVars } = getExitProps(exitType);
        tl.to(currentEl, { ...toVars, duration: 0.7 }, 0);
      }

      // ENTER
      if (nextEl) {
        const enterType = goingForward ? nextTrans.enterForward : "slideDown";
        const { fromVars, toVars } = getEnterProps(enterType);
        nextEl.classList.add("active");
        tl.fromTo(nextEl, { ...fromVars, visibility: "visible" }, { ...toVars, visibility: "visible", duration: 0.9 }, 0.15);

        // Background parallax
        const bg = nextEl.querySelector(".screen-bg") as HTMLElement;
        if (bg && nextTrans.bgParallax !== "none") {
          const { from, to } = getBgParallaxVars(nextTrans.bgParallax);
          tl.fromTo(bg, { ...from }, { ...to, duration: 1.4, ease: "power2.out" }, 0.1);
        }
      }
    },
    [currentScreen, isTransitioning, animateContentIn]
  );

  const handleNext = useCallback(() => {
    if (currentScreen < screens.length - 1) goToScreen(currentScreen + 1);
    else goToScreen(0); // loop back
  }, [currentScreen, goToScreen]);

  const handlePrev = useCallback(() => {
    if (currentScreen > 0) goToScreen(currentScreen - 1);
  }, [currentScreen, goToScreen]);

  // Wheel
  useEffect(() => {
    let lastWheel = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel < 900) return;
      lastWheel = now;
      if (e.deltaY > 0) handleNext(); else handlePrev();
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

  // Initial load animation for screen 0 only
  useEffect(() => {
    if (!loaded) return;
    const el = screenRefs.current[0];
    if (!el) return;
    animateContentIn(el, 0, 0.2);
  }, [loaded, animateContentIn]);

  // No auto-advance — user scrolls manually

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
          {/* Page links */}
          <ul className="nav-overlay-list">
            {[
              { href: "/about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/blog", label: "Blog" },
            ].map((link) => (
              <li key={link.href} className="nav-overlay-item">
                <a className="nav-overlay-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Section jump links */}
          <div style={{ marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}>
            <p style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--copper-light)", marginBottom: "1rem" }}>Jump to section</p>
            <ul className="nav-overlay-list" style={{ gap: 0 }}>
              {screens.slice(1).map((screen, i) => (
                <li key={screen.id} className="nav-overlay-item">
                  <button
                    className="nav-overlay-link"
                    onClick={() => { setNavOpen(false); setTimeout(() => goToScreen(i + 1), 300); }}
                    style={{ background: "none", border: "none", cursor: "pointer", width: "100%", fontSize: "clamp(1.25rem, 2.5vw, 2rem)", padding: "0.2em 0", color: "var(--stone-dark)" }}
                  >
                    {screen.title.replace("\n", " ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

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
            onClick={() => goToScreen(i)}
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
          {currentScreen === screens.length - 1 ? "Back to top" : "Scroll to explore"}
        </span>
        <ChevronDown className="scroll-cta-arrow" strokeWidth={2} />
      </button>

      {/* ============ SCREENS ============ */}
      <div className="page-container">
        {screens.map((screen, i) => {
          const isLanding = i === 0;
          const isRight = screen.layout === "right";
          const isCenter = screen.layout === "center";

          return (
            <div
              key={screen.id}
              ref={(el) => { screenRefs.current[i] = el; }}
              className={`screen ${i === currentScreen ? "active" : ""}`}
            >
              {/* Background */}
              <div className="screen-bg">
                <img src={screen.image} alt="" loading={i < 2 ? "eager" : "lazy"} />
              </div>

              {/* Gradient overlay — varies by layout */}
              <div
                className="screen-overlay"
                style={{
                  background: isCenter
                    ? "linear-gradient(to bottom, rgba(26,23,20,0.5) 0%, rgba(26,23,20,0.3) 40%, rgba(26,23,20,0.7) 100%)"
                    : isRight
                      ? "linear-gradient(to left, rgba(26,23,20,0.85) 0%, rgba(26,23,20,0.6) 40%, rgba(26,23,20,0.15) 100%)"
                      : "linear-gradient(to right, rgba(26,23,20,0.85) 0%, rgba(26,23,20,0.6) 40%, rgba(26,23,20,0.15) 100%)",
                }}
              />

              {/* Decorative lines */}
              <div className="screen-lines">
                <div className="screen-line" style={{ left: isRight ? "92%" : "8%" }} />
                <div className="screen-line" style={{ left: "50%", opacity: 0.04 }} />
                {i % 2 === 0 && <div className="screen-line" style={{ left: isRight ? "8%" : "92%", opacity: 0.03 }} />}
              </div>

              {/* Content — positioned by layout */}
              <div
                className="screen-content-wrapper"
                style={{
                  justifyContent: isCenter ? "center" : isRight ? "flex-end" : "flex-start",
                  textAlign: isCenter ? "center" : "left",
                }}
              >
                <div
                  className="screen-content"
                  style={{
                    maxWidth: isCenter ? 800 : 560,
                    ...(isCenter ? { margin: "0 auto" } : {}),
                  }}
                >
                  {/* Accent bar */}
                  {!isLanding && (
                    <div
                      className="accent-bar"
                      style={{
                        width: 40,
                        height: 3,
                        background: "var(--forest-light)",
                        marginBottom: 20,
                        ...(isCenter ? { margin: "0 auto 20px" } : {}),
                      }}
                    />
                  )}

                  {/* Baseline */}
                  {screen.baseline && (
                    <div className="screen-baseline">{screen.baseline}</div>
                  )}

                  {/* Title */}
                  <h1 className="screen-title" style={isLanding ? { fontSize: "clamp(3rem, 8vw, 7rem)" } : undefined}>
                    {screen.title.split("\n").map((line, j) => (
                      <span key={j}>{line}{j < screen.title.split("\n").length - 1 && <br />}</span>
                    ))}
                  </h1>

                  {/* Subtitle */}
                  {screen.subtitle && (
                    <p className="screen-subtitle">{screen.subtitle}</p>
                  )}

                  {/* Body */}
                  {screen.body && (
                    <p className="screen-body">{screen.body}</p>
                  )}

                  {/* CTA */}
                  {screen.ctaLabel && (
                    <a
                      href={screen.cta}
                      className="screen-cta-link"
                      onClick={(e) => { e.preventDefault(); goToScreen(screens.length - 1); }}
                    >
                      {screen.ctaLabel}
                      <ArrowRight size={14} strokeWidth={2} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
