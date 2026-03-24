"use client";

import { useEffect, useLayoutEffect, useState, useMemo, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { MemojiContext } from "./MemojiContext";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const imgMemoji = "/figma-assets/0bfb2280-1582-469a-869a-b904b7d32828.gif";

/* ── Case logo assets ───────────────────────────────────────────── */
const CASE_LOGOS = [
  "/figma-assets/cases-logo-itau.png",
  "/figma-assets/cases-logo-descomplica.png",
  "/figma-assets/cases-logo-warren.png",
];


/* ── Hero text per case ──────────────────────────────────────── */
const CASES_HERO = [
  { name: "itaú",        fontSize: 160, link: "/cases/itau" },
  { name: "Descomplica", fontSize: 108, link: "/cases/descomplica" },
  { name: "Warren",      fontSize: 140, link: "/cases/warren" },
];

/* ── Brand shape positions per case (1600×890 base) ────────────── */
// Each entry: { left, top, width, height } in px at 1600×890
const CASE_POSITIONS = [
  // 0 — Itaú: inset [34.49% 28.56% 29.55% 51.44%]
  { left: 823, top: 307, width: 320, height: 320 },
  // 1 — Descomplica: centered 340×340 at 50%/50%+22
  { left: 630, top: 283, width: 340, height: 340 },
  // 2 — Warren: same as Itaú
  { left: 823, top: 307, width: 320, height: 320 },
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

  const isSobre  = pathname === "/sobre";
  const isCases  = pathname.startsWith("/cases");
  const isHome   = pathname === "/";
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
    if (isCases && isDesktop !== false && !rotationFiredRef.current) {
      rotationFiredRef.current = true;
      setBrandRotation(r => r + 360);
    }
  }, [isCases, isDesktop]);

  // startHeroAnimation: called on click — updates BOTH heroAnimating and rotation in one batch
  const startHeroAnimation = useCallback(() => {
    if (isDesktop === false) return;
    setHeroAnimating(true);
    if (!rotationFiredRef.current) {
      rotationFiredRef.current = true;
      setBrandRotation(r => r + 360);
    }
  }, [isDesktop]);

  // Mark hero text as landed after spring animation settles (~700ms)
  useEffect(() => {
    if (isCases && isDesktop !== false) {
      const t = setTimeout(() => setHeroLanded(true), 700);
      return () => clearTimeout(t);
    }
  }, [isCases, isDesktop]);

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
  } else if (isCases) {
    // Show memoji at home position when on cases page
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
  if ((isCases || heroAnimating) && isDesktop !== false) {
    const pos = CASE_POSITIONS[activeCaseIndex] ?? CASE_POSITIONS[0];
    brandAnimate = {
      left: pos.left, top: pos.top,
      width: pos.width, height: pos.height,
      borderRadius: 0,
      // Fade to transparent on navigation (isCases) — overlaps last 440ms of rotation
      backgroundColor: isCases ? "rgba(255, 150, 65, 0)" : "#ff9641",
      rotate: brandRotation,
    };
  } else if (casesHovered && isDesktop !== false) {
    // Home hover cases — compact square (matches cases intro state)
    brandAnimate = {
      left: 1305, top: 614,
      width: 600, height: 600,
      borderRadius: 120,
      backgroundColor: "#ff9641",
      rotate: brandRotation,
    };
  } else {
    // Home normal — large pill
    brandAnimate = {
      left: 1133, top: 427,
      width: 656, height: 1312,
      borderRadius: 656,
      backgroundColor: "#ff9641",
      rotate: brandRotation,
    };
  }

  /* ── Hero text animate target ("cases" → case name) ───────────── */
  // heroLive: on cases page after spring settles → show case name
  const heroLive     = isCases && heroLanded;
  const heroCase     = CASES_HERO[activeCaseIndex] ?? CASES_HERO[0];
  const heroText     = heroLive ? heroCase.name     : "cases";
  const heroFontSize = heroLive ? heroCase.fontSize : 160;

  const heroHomeTop   = winH - 160 + (casesHovered ? 0 : 63);
  const heroCasesLeft = Math.max(0, winW / 2 - 498);
  // Center text vertically at winH/2+22 regardless of font size
  const heroCasesTop  = winH / 2 + 22 - heroFontSize / 2;

  let heroAnimate: Record<string, number | string>;
  if ((isCases || heroAnimating) && isDesktop !== false && !heroLanded) {
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
              zIndex: 1,
            }}
          >
            <motion.div
              style={{ position: "absolute", overflow: "hidden" }}
              animate={brandAnimate}
              transition={{
                type: "spring", stiffness: 400, damping: 35,
                rotate: { type: "tween", duration: 0.36, ease: [0.4, 0, 0.2, 1] },
                backgroundColor: { type: "tween", duration: 0.28, ease: "easeInOut" },
              }}
            >
              {/* Logo background — fades in as soon as isCases, simultaneous with color fade */}
              <AnimatePresence mode="wait">
                {isCases && (
                  <motion.div
                    key={activeCaseIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${CASE_LOGOS[activeCaseIndex]})`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

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
              {heroText}
            </motion.p>
          </div>
        )}

        {children}
      </LayoutGroup>
    </MemojiContext.Provider>
  );
}
