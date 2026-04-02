"use client";

import { useEffect, useLayoutEffect, useState, useMemo, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { MemojiContext } from "./MemojiContext";

/* ── Loader constants ───────────────────────────────────────────── */
const PILL_W  = 240;
const PILL_H  = 80;
const SKULL_W = 46.937;
const SKULL_H = 48;
const PAD     = 18;

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const imgMemoji = "/figma-assets/0bfb2280-1582-469a-869a-b904b7d32828.gif";

/* ── Hero text per case ──────────────────────────────────────── */
const CASES_HERO = [
  { name: "itaú",        fontSize: 160, link: "/cases/itau" },
  { name: "Descomplica", fontSize: 108, link: "/cases/descomplica" },
  { name: "Warren",      fontSize: 140, link: "/cases/warren" },
];

/* ── Brand shape per case (CSS, no PNG) ─────────────────────────── */
// leftFromCenter: offset from winW/2 (design canvas 1600px → center 800px)
//   Itaú:        left=823  → 823-800 = +23
//   Descomplica: left=630  → 630-800 = -170
//   Warren:      left=823  → 823-800 = +23
// actual left in brandAnimate = winW/2 + leftFromCenter
const CASE_POSITIONS = [
  // 0 — Itaú: orange-red rounded square
  { leftFromCenter: 23, top: 307, width: 320, height: 320,
    color: "#F06000", borderRadius: 80, extraRotation: 0 },
  // 1 — Descomplica: green rotated rounded square
  { leftFromCenter: -170, top: 283, width: 340, height: 340,
    color: "#00E887", borderRadius: 90, extraRotation: 15 },
  // 2 — Warren: crimson D-shape
  { leftFromCenter: 23, top: 307, width: 320, height: 320,
    color: "#E02B57", borderRadius: "90px 90px 90px 0", extraRotation: 0 },
];

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();

  const [hovered,          setHovered]          = useState(false);
  const [targetRect,       setTargetRect]        = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isDesktop,        setIsDesktop]         = useState<boolean | null>(null);
  const [photoVisible,     setPhotoVisible]      = useState(false);
  const [casesHovered,     setCasesHovered]      = useState(false);
  const [activeCaseIndex,  setActiveCaseIndex]   = useState(0);
  const [brandRotation,    setBrandRotation]     = useState(0);
  const [heroLanded,       setHeroLanded]        = useState(false);
  const [heroAnimating,    setHeroAnimating]     = useState(false);
  const [winH,             setWinH]              = useState(890);
  const [winW,             setWinW]              = useState(1600);

  /* ── Loader state ────────────────────────────────────────────── */
  const [isLoading,        setIsLoading]         = useState(true);
  const [loaderOrange,     setLoaderOrange]      = useState(false);
  const [loaderExiting,    setLoaderExiting]     = useState(false);
  const [overlayDone,      setOverlayDone]       = useState(false);
  const [brandNormalZ,     setBrandNormalZ]      = useState(false);

  // Loader timing: 100ms → skull+color start (1s) → skull rotate (1100ms) → expand brand shape → fade overlay → drop zIndex
  useEffect(() => {
    const t0 = setTimeout(() => setLoaderOrange(true),   100);
    const te = setTimeout(() => setLoaderExiting(true), 200); // skull starts rotating at 0.2s
    const t1 = setTimeout(() => setIsLoading(false),    1500);
    const t2 = setTimeout(() => setOverlayDone(true),   2200);
    const t3 = setTimeout(() => setBrandNormalZ(true),  2800);
    return () => { clearTimeout(t0); clearTimeout(te); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Fade in portal + detect viewport + track window size
  useEffect(() => {
    const el = document.getElementById("memoji-portal");
    if (el) el.style.opacity = "1";
    const check = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setWinW(window.innerWidth);
      setWinH(window.innerHeight);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isSobre         = ["/sobre", "/sobre/", "/curriculo", "/curriculo/", "/atuacoes", "/atuacoes/"].includes(pathname);
  const isCases         = pathname.startsWith("/cases");                                    // any /cases/* route
  const isCasesCarousel = pathname === "/cases" || pathname === "/cases/";                 // only the carousel
  const isCasePage      = isCases && !isCasesCarousel;                                    // /cases/itau, /cases/warren, etc.
  const isHome          = pathname === "/";
  const hasMemojiPlaceholder = ["/sobre", "/curriculo"].includes(pathname);

  useIsomorphicLayoutEffect(() => {
    if (!isSobre) setPhotoVisible(false);
    if (!hasMemojiPlaceholder) setTargetRect(null);
    // Reset case index when leaving cases
    if (!isCases) setActiveCaseIndex(0);
    // Reset hero landed state when leaving cases
    if (!isCases) setHeroLanded(false);
    // Reset hero animating flag once navigation is complete
    setHeroAnimating(false);
  }, [pathname]);

  // Reset rotation flag when leaving cases
  const rotationFiredRef = useRef(false);
  useIsomorphicLayoutEffect(() => {
    if (!isCases) rotationFiredRef.current = false;
  }, [pathname]);

  // Direct URL navigation to /cases (no click) — still triggers rotation once
  useEffect(() => {
    if (isCasesCarousel && isDesktop !== false && !rotationFiredRef.current) {
      rotationFiredRef.current = true;
      setBrandRotation(r => r + 360);
    }
  }, [isCasesCarousel, isDesktop]);

  // startHeroAnimation: called on click — updates BOTH heroAnimating and rotation in one batch
  const startHeroAnimation = useCallback(() => {
    if (isDesktop === false) return;
    setHeroAnimating(true);
    if (!rotationFiredRef.current) {
      rotationFiredRef.current = true;
      setBrandRotation(r => r + 360);
    }
  }, [isDesktop]);

  // Mark hero text as landed slightly before spring settles (~400ms)
  useEffect(() => {
    if (isCasesCarousel && isDesktop !== false) {
      const t = setTimeout(() => setHeroLanded(true), 400);
      return () => clearTimeout(t);
    }
  }, [isCasesCarousel, isDesktop]);

  /* ── Memoji animate target ─────────────────────────────────────── */
  let animateTarget: Record<string, number | string>;
  const isCurriculo = pathname === "/curriculo";

  if (isCurriculo) {
    animateTarget = { opacity: 0 };
  } else if (targetRect) {
    animateTarget = {
      left: targetRect.x, top: targetRect.y,
      width: targetRect.width, height: targetRect.height,
      opacity: (isSobre && photoVisible) ? 0 : 1,
    };
  } else if (hasMemojiPlaceholder) {
    animateTarget = { opacity: 0 };
  } else if (isDesktop === false) {
    animateTarget = { left: 4, top: 10, width: 122, height: 90, opacity: 1 };
  } else if (isCasesCarousel) {
    // Show memoji at home position when on cases carousel
    animateTarget = { left: 164, top: 21, width: 130, height: 98, opacity: 1 };
  } else {
    animateTarget = {
      left: hovered ? 164 : 181, top: 21,
      width: hovered ? 130 : 96, height: hovered ? 98 : 72,
      opacity: hovered ? 1 : 0,
    };
  }

  const borderRadius = targetRect ? "48px" : "32px";

  let bgAnimateTarget: Record<string, number | string>;
  if (targetRect) {
    bgAnimateTarget = { left: 0, top: 0, width: targetRect.width, height: targetRect.height };
  } else if (hasMemojiPlaceholder) {
    bgAnimateTarget = { left: 0, top: 0, width: 0, height: 0 };
  } else if (isDesktop === false) {
    bgAnimateTarget = { left: 10, top: 33, width: 102, height: 56 };
  } else {
    bgAnimateTarget = { left: 14, top: 37, width: 102, height: 56 };
  }

  const imgAnimateTarget = targetRect
    ? { width: 178, height: 134 }
    : { width: 127, height: 96 };

  /* ── Brand shape animate target ─────────────────────────────────── */
  // Home normal:  large orange pill on the right
  // Home hover:   compact orange square (matching cases intro)
  // Cases page:   brand logo at case-specific position
  let brandAnimate: Record<string, number | string>;
  if ((isCasesCarousel || heroAnimating) && isDesktop !== false) {
    const pos = CASE_POSITIONS[activeCaseIndex] ?? CASE_POSITIONS[0];
    brandAnimate = {
      left: winW / 2 + pos.leftFromCenter, top: pos.top,
      width: pos.width, height: pos.height,
      borderRadius: pos.borderRadius,
      backgroundColor: pos.color,
      rotate: brandRotation + pos.extraRotation,
    };
  } else if (casesHovered && isDesktop !== false) {
    // Home hover cases — compact square (matches cases intro state)
    // Anchor to right: at 1600px design, left=1305, width=600 → right overflow=305px
    brandAnimate = {
      left: winW - 295, top: 614,
      width: 600, height: 600,
      borderRadius: 120,
      backgroundColor: "#ff9641",
      rotate: brandRotation,
    };
  } else {
    // Home normal — large pill anchored to right edge
    // At 1600px design: left=1133, width=656 → right overflow=189px → left = winW - 467
    brandAnimate = {
      left: winW - 467, top: 427,
      width: 656, height: 1312,
      borderRadius: 656,
      backgroundColor: "#ff9641",
      rotate: brandRotation,
    };
  }

  // Loading override — small centered pill (dark → orange) that becomes the brand shape
  if (isLoading) {
    const cx = winW / 2 - PILL_W / 2;
    const cy = winH / 2 - PILL_H / 2;
    brandAnimate = {
      left: cx, top: cy,
      width: PILL_W, height: PILL_H, borderRadius: 656,
      backgroundColor: loaderOrange ? "#FF9641" : "#242a2f",
      rotate: 0,
    };
  }

  /* ── Hero text animate target ("cases" → case name) ───────────── */
  // heroLive: on cases page after spring settles → show case name
  const heroLive     = isCasesCarousel && heroLanded;
  const heroCase     = CASES_HERO[activeCaseIndex] ?? CASES_HERO[0];
  const heroText     = heroLive ? heroCase.name     : "cases";
  const heroFontSize = heroLive ? heroCase.fontSize : 160;

  const heroHomeTop   = winH - 160 + (casesHovered ? 0 : 63);
  const heroCasesLeft = Math.max(0, winW / 2 - 498);
  // Center text vertically at winH/2+22 regardless of font size
  const heroCasesTop  = winH / 2 + 22 - heroFontSize / 2;

  let heroAnimate: Record<string, number | string>;
  if ((isCasesCarousel || heroAnimating) && isDesktop !== false && !heroLanded) {
    // Flying to cases as "cases" (160px)
    heroAnimate = { left: heroCasesLeft, top: winH / 2 - 58, fontSize: "160px", y: 0, opacity: 1 };
  } else if (heroLive && isDesktop !== false) {
    // Landed — show current case name, morph size/position on carousel change
    heroAnimate = { left: heroCasesLeft, top: heroCasesTop, fontSize: `${heroFontSize}px`, y: 0, opacity: 1 };
  } else if (isHome && isDesktop !== false) {
    heroAnimate = { left: 200, top: heroHomeTop, fontSize: "160px", y: 0, opacity: 1 };
  } else {
    heroAnimate = { left: heroCasesLeft, top: heroCasesTop, fontSize: `${heroFontSize}px`, y: -24, opacity: 0 };
  }

  /* ── Memoji click → back to home ─────────────────────────────── */
  const handleMemojiClick = () => {
    if (!isHome) {
      const el = document.getElementById("page-template");
      if (el) {
        el.style.transition = "opacity 260ms ease, transform 260ms ease";
        el.style.opacity = "0";
        el.style.transform = "translateY(-10px)";
      }
      setTimeout(() => router.push("/"), 260);
    }
  };

  /* ── Hero text click → case page ─────────────────────────────── */
  const handleHeroTextClick = useCallback(() => {
    if (!heroLive) return;
    const el = document.getElementById("page-template");
    if (el) {
      el.style.transition = "opacity 260ms ease, transform 260ms ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(-10px)";
    }
    setTimeout(() => router.push(heroCase.link), 260);
  }, [heroLive, heroCase, router]);

  const ctx = useMemo(
    () => ({ setHovered, setTargetRect, setPhotoVisible, casesHovered, setCasesHovered, activeCaseIndex, setActiveCaseIndex, heroLanded, heroAnimating, startHeroAnimation }),
    [casesHovered, activeCaseIndex, heroLanded, heroAnimating, startHeroAnimation]
  );

  return (
    <MemojiContext.Provider value={ctx}>
      <LayoutGroup id="root">

        {/* ── Persistent brand shape (orange blob / case logo) ────── */}
        {isDesktop !== false && (
          <div
            className="layout-brand-shape-portal"
            style={{
              position: "fixed", top: 0, left: 0,
              width: 0, height: 0,
              overflow: "visible",
              pointerEvents: "none",
              zIndex: brandNormalZ ? 1 : 9999,
              display: (isSobre || isCasePage) ? "none" : undefined,
            }}
          >
            <motion.div
              initial={false}
              style={{ position: "absolute", overflow: "hidden" }}
              animate={brandAnimate}
              transition={isLoading ? {
                backgroundColor: { type: "tween", duration: 1.0, ease: [0.4, 0, 0.2, 1] },
                default: { type: "spring", stiffness: 400, damping: 35 },
              } : {
                type: "spring", stiffness: 400, damping: 35,
                rotate: { type: "tween", duration: 0.36, ease: [0.4, 0, 0.2, 1] },
                backgroundColor: { type: "tween", duration: 0.28, ease: "easeInOut" },
                opacity: { type: "tween", duration: 0.4, ease: "easeInOut" },
              }}
            >
              {/* Skull — visible only during loading, slides left → right */}
              <AnimatePresence>
                {isLoading && (
                  <motion.img
                    key="loader-skull"
                    src="/figma-assets/loader-logo.svg"
                    alt="logo"
                    initial={{ x: PAD, opacity: 0, rotate: 0 }}
                    animate={{ x: loaderOrange ? PILL_W - SKULL_W - PAD : PAD, opacity: 1, rotate: loaderExiting ? 180 : 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    transition={{
                      x: { duration: 1.0, ease: [0.4, 0, 0.2, 1] },
                      rotate: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.3, ease: "easeInOut" },
                    }}
                    style={{
                      position: "absolute",
                      top: (PILL_H - SKULL_H) / 2,
                      width: SKULL_W,
                      height: SKULL_H,
                      objectFit: "contain",
                      pointerEvents: "none",
                      transformOrigin: "center",
                    }}
                  />
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}

        {/* ── White overlay — covers page during loading ────────────── */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: overlayDone ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed", inset: 0,
            backgroundColor: "#fff",
            zIndex: 9998,
            pointerEvents: "none",
          }}
        />

        {/* ── Persistent memoji ────────────────────────────────────── */}
        <div
          id="memoji-portal"
          className="layout-memoji-portal"
          style={{
            position: "fixed", top: 0, left: 0,
            width: 0, height: 0,
            overflow: "visible",
            pointerEvents: "none",
            zIndex: 100,
            display: (pathname === "/curriculo" || pathname === "/curriculo/" || pathname === "/atuacoes" || pathname === "/atuacoes/" || isCasePage) ? "none" : undefined,
          }}
        >
          <motion.div
            animate={animateTarget}
            transition={{
              opacity: { duration: 0.6, ease: "easeInOut" },
              default: { type: "spring", stiffness: 200, damping: 28 },
            }}
            onClick={!isHome ? handleMemojiClick : undefined}
            className={!isHome ? "cursor-pointer" : ""}
            style={{ position: "absolute", overflow: "visible", pointerEvents: !isHome ? "auto" : "none" }}
          >
            <motion.div
              className="absolute bg-[#f4a39e]"
              style={{ position: "absolute" }}
              animate={{ borderRadius, ...bgAnimateTarget }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
            />
            <motion.img
              src={imgMemoji}
              alt="memoji"
              className="absolute object-cover pointer-events-none"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              animate={imgAnimateTarget}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
            />
          </motion.div>
        </div>

        {/* ── Persistent hero text ("cases" ↔ "itaú") ─────────────── */}
        {isDesktop !== false && (
          <div
            className="layout-hero-text-portal"
            style={{
              position: "fixed", top: 0, left: 0,
              width: 0, height: 0,
              overflow: "visible",
              pointerEvents: "none",
              zIndex: 10,
              display: isCasePage ? "none" : undefined,
            }}
          >
            <motion.p
              style={{
                position: "absolute",
                fontFamily: "'Agrandir', sans-serif",
                fontWeight: 800,
                fontSize: `${heroFontSize}px`,
                lineHeight: 1,
                whiteSpace: "nowrap",
                color: "#242a2f",
                margin: 0,
                cursor: heroLive ? "pointer" : "default",
              }}
              animate={heroAnimate}
              transition={{
                opacity: { duration: 0.5, ease: "easeInOut" },
                y: { duration: 0.5, ease: "easeInOut" },
                fontSize: { type: "spring", stiffness: 160, damping: 26 },
                default: { type: "spring", stiffness: 160, damping: 26 },
              }}
              onClick={heroLive ? handleHeroTextClick : undefined}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={heroText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  style={{ display: "block" }}
                >
                  {heroText}
                </motion.span>
              </AnimatePresence>
            </motion.p>
          </div>
        )}

        {children}
      </LayoutGroup>
    </MemojiContext.Provider>
  );
}
