"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "../components/TransitionLink";
import MenuOverlay from "../components/MenuOverlay";
import { useMemojiContext } from "../components/MemojiContext";

/* ── Mobile logo assets (desktop logos are in LayoutProvider) ───── */
const MOBILE_LOGOS = [
  "/figma-assets/cases-logo-itau.png",
  "/figma-assets/cases-logo-descomplica.png",
  "/figma-assets/cases-logo-warren.png",
];

/* ── Cases data ─────────────────────────────────────────────────── */
type Case = {
  id: string;
  name: string;
  description: string;
  nextCase: string | null;
  nameFontSize: number;
  descLeftOffset: number;
  descTopOffset: number;
  descWidth: string;
  link: string;
  brandColor: string;
  logoSrc: string;
  overlayBorderRadius: number;
};

const CASES: Case[] = [
  {
    id: "itau",
    name: "itaú",
    description: "Escalabilidade e Consistência\nem Design system & Ops",
    nextCase: "Descomplica",
    nameFontSize: 160,
    descLeftOffset: 210,
    descTopOffset: 13,
    descWidth: "292px",
    link: "/cases/itau",
    brandColor: "#F06000",
    logoSrc: "/figma-assets/cases-logo-itau.png",
    overlayBorderRadius: 100,
  },
  {
    id: "descomplica",
    name: "Descomplica",
    description: "Colaboração no aprendizado\ne carreira",
    nextCase: "Warren",
    nameFontSize: 108,
    descLeftOffset: 11,
    descTopOffset: 25,
    descWidth: "360px",
    link: "/cases/descomplica",
    brandColor: "#00E887",
    logoSrc: "/figma-assets/cases-logo-descomplica.png",
    overlayBorderRadius: 8,
  },
  {
    id: "warren",
    name: "Warren",
    description: "Otimizando as\nMovimentações Financeiras",
    nextCase: null,
    nameFontSize: 140,
    descLeftOffset: 210,
    descTopOffset: 25,
    descWidth: "292px",
    link: "/cases/warren",
    brandColor: "#E02B57",
    logoSrc: "/figma-assets/cases-logo-warren.png",
    overlayBorderRadius: 32,
  },
];

/* ── Menu button ────────────────────────────────────────────────── */
function MenuButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cases-menu-btn flex items-center justify-center pl-6 pr-2 py-2 cursor-pointer transition-all duration-300"
      style={{
        gap: hovered ? "16px" : "24px",
        background: hovered ? "rgba(36,42,47,0.16)" : "transparent",
        borderRadius: hovered ? "16px" : "0px",
      }}
    >
      <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap">
        Menu
      </span>
      <div
        className="flex items-center justify-center rounded-xl size-10 transition-all duration-300"
        style={{
          background: hovered ? "transparent" : "rgba(36,42,47,0.08)",
          gap: hovered ? "0px" : "3px",
        }}
      >
        <div
          className="bg-[#242a2f] dark:bg-[#f0ede8] rounded-xl size-1 transition-all duration-300"
          style={{ opacity: hovered ? 0 : 1, width: hovered ? "0px" : "4px" }}
        />
        <div
          className="bg-[#242a2f] dark:bg-[#f0ede8] h-1 rounded-xl transition-all duration-300"
          style={{ width: hovered ? "17px" : "10px" }}
        />
      </div>
    </button>
  );
}

/* ── Chevron icons ──────────────────────────────────────────────── */
function ChevronUp({ faded }: { faded: boolean }) {
  return (
    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" style={{ opacity: faded ? 0.25 : 1, transition: "opacity 0.3s" }}>
      <path d="M1 8L8 1L15 8" stroke="#242a2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronDown({ faded }: { faded: boolean }) {
  return (
    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" style={{ opacity: faded ? 0.25 : 1, transition: "opacity 0.3s" }}>
      <path d="M1 1L8 8L15 1" stroke="#242a2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function CasesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection]     = useState<1 | -1>(1);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [slideHovered, setSlideHovered] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandFrom, setExpandFrom]   = useState({ left: 0, top: 0, w: 0, h: 0 });
  const [winW, setWinW]               = useState(1600);
  const [winH, setWinH]               = useState(890);
  const scrollLockRef                 = useRef(false);
  const router                        = useRouter();
  const { setActiveCaseIndex, heroLanded } = useMemojiContext();

  // Track viewport size
  useEffect(() => {
    const update = () => { setWinW(window.innerWidth); setWinH(window.innerHeight); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Keep LayoutProvider in sync
  useEffect(() => {
    setActiveCaseIndex(activeIndex);
  }, [activeIndex, setActiveCaseIndex]);

  // Reset hover when case changes
  useEffect(() => {
    setSlideHovered(false);
  }, [activeIndex]);

  // Overlay dimensions — mirrors Figma: 1320×608 centered, ~92% width
  const overlayW = Math.min(winW * 0.917, 1320);
  const overlayH = Math.min(winH * 0.677, 608);
  const overlayLeft = (winW - overlayW) / 2;
  const overlayTop  = (winH - overlayH) / 2;

  const goTo = useCallback(
    (index: number, dir: 1 | -1) => {
      if (index < 0 || index >= CASES.length || scrollLockRef.current) return;
      scrollLockRef.current = true;
      setDirection(dir);
      setActiveIndex(index);
      setTimeout(() => { scrollLockRef.current = false; }, 700);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Wheel navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30)       goTo(activeIndex + 1, 1);
      else if (e.deltaY < -30) goTo(activeIndex - 1, -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goTo(activeIndex + 1, 1);
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  goTo(activeIndex - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo]);

  const current = CASES[activeIndex];

  // Hero + description positioning (mirrors LayoutProvider)
  const heroCasesLeft = Math.max(0, winW / 2 - 498);
  const heroCasesTop  = winH / 2 + 22 - current.nameFontSize / 2;
  const descLeft = heroCasesLeft + current.descLeftOffset;
  const descTop  = heroCasesTop + current.nameFontSize + current.descTopOffset;

  // Navigate with expand animation from overlay position
  const handleCaseClick = useCallback(() => {
    if (!heroLanded || isExpanding) return;
    setExpandFrom({ left: overlayLeft, top: overlayTop, w: overlayW, h: overlayH });
    setIsExpanding(true);
    sessionStorage.setItem("caseVideoTransition", "1");
    setTimeout(() => router.push(current.link), 580);
  }, [heroLanded, isExpanding, overlayLeft, overlayTop, overlayW, overlayH, current.link, router]);

  /* Slide transition variants */
  const slideVariants = {
    initial: (dir: number) => ({ opacity: 0, y: dir > 0 ? 72 : -72 }),
    animate: { opacity: 1, y: 0 },
    exit:    (dir: number) => ({ opacity: 0, y: dir > 0 ? -72 : 72 }),
  };

  return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── Full-screen expand overlay ───────────────────────────── */}
      <AnimatePresence>
        {isExpanding && (
          <motion.div
            key="expand-overlay"
            style={{ position: "fixed", zIndex: 9999, overflow: "hidden" }}
            initial={{
              left: expandFrom.left,
              top: expandFrom.top,
              width: expandFrom.w,
              height: expandFrom.h,
              borderRadius: current.overlayBorderRadius,
            }}
            animate={{
              left: 0,
              top: 0,
              width: winW,
              height: winH,
              borderRadius: 0,
            }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <video
              src="/bg-cases.mp4"
              autoPlay muted loop playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════ DESKTOP ══ */}
      <div
        className="cases-desktop hidden lg:block relative w-full h-screen overflow-hidden bg-white dark:bg-[#111318] transition-colors duration-300 select-none"
        onMouseLeave={() => setSlideHovered(false)}
      >
        {/* ── Nav ─────────────────────────────────────────────── */}
        <motion.nav
          className="cases-nav absolute top-0 right-0 flex items-center gap-8 pt-14 pr-12 z-20"
          animate={{ opacity: slideHovered && heroLanded ? 0 : 1 }}
          transition={{ duration: 0.35 }}
          onMouseEnter={() => setSlideHovered(false)}
        >
          <div className="cases-nav-active flex items-center justify-center px-2 py-2 bg-[rgba(36,42,47,0.08)] dark:bg-[rgba(255,255,255,0.1)] rounded-[8px]">
            <span className="font-['Agrandir'] font-[800] text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap">
              Cases
            </span>
          </div>
          <TransitionLink href="/sobre" className="cases-nav-sobre flex items-center justify-center p-2 group">
            <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">
              Sobre
            </span>
          </TransitionLink>
          <MenuButton onClick={() => setMenuOpen(true)} />
        </motion.nav>

        {/* ── Slides ──────────────────────────────────────────── */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
            onMouseEnter={() => heroLanded && setSlideHovered(true)}
            onClick={handleCaseClick}
            style={{ cursor: slideHovered && heroLanded ? "pointer" : "default" }}
          >
            {/* ── Video background overlay (Figma hover state) ──── */}
            <motion.div
              className="absolute overflow-hidden pointer-events-none"
              style={{
                left: overlayLeft,
                top: overlayTop,
                width: overlayW,
                height: overlayH,
                borderRadius: current.overlayBorderRadius,
                zIndex: 2,
              }}
              animate={{ opacity: slideHovered && heroLanded ? 0.4 : 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <video
                src="/bg-cases.mp4"
                autoPlay muted loop playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>

            {/* Description — follows hero brand name */}
            <p
              className="cases-description absolute pointer-events-none z-10"
              style={{
                fontFamily: "'Agrandir Narrow', sans-serif",
                fontSize: "22px",
                letterSpacing: "0.5px",
                color: "rgba(36,42,47,0.56)",
                left: descLeft,
                top: descTop,
                width: current.descWidth,
                lineHeight: "32px",
                whiteSpace: "pre-line",
              }}
            >
              {current.description}
            </p>

            {/* Next case — peeking at the bottom */}
            {current.nextCase && (
              <button
                onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1, 1); }}
                className="cases-next-label absolute font-['Agrandir'] font-[800] text-[rgba(36,42,47,0.28)] dark:text-[rgba(240,237,232,0.16)] whitespace-nowrap z-10 cursor-pointer hover:text-[rgba(36,42,47,0.45)] transition-colors duration-300 bg-transparent border-0 p-0"
                style={{
                  left: "50%",
                  bottom: "-24px",
                  transform: "translateX(-50%)",
                  fontSize: "128px",
                  lineHeight: 1,
                  fontFamily: "inherit",
                }}
              >
                {current.nextCase}
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Right navigation controls ──────────────────────── */}
        <motion.div
          className="cases-controls absolute flex flex-col items-center gap-4 z-20"
          style={{ right: "220px", top: "50%", transform: "translateY(-50%)" }}
          animate={{ opacity: slideHovered && heroLanded ? 0 : 1 }}
          transition={{ duration: 0.35 }}
          onMouseEnter={() => setSlideHovered(false)}
        >
          <button onClick={() => goTo(activeIndex - 1, -1)} className="p-6 rounded cursor-pointer" aria-label="Case anterior">
            <ChevronUp faded={activeIndex === 0} />
          </button>

          <div className="flex flex-col gap-4 items-center">
            {CASES.map((c, i) => (
              <button
                key={c.id}
                onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                className="cursor-pointer transition-all duration-400"
                aria-label={`Ir para ${c.name}`}
                style={{
                  width: "8px",
                  height: i === activeIndex ? "32px" : "8px",
                  background: i === activeIndex ? "#242a2f" : "rgba(36,42,47,0.24)",
                  borderRadius: "12px",
                  transition: "height 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s",
                }}
              />
            ))}
          </div>

          <button onClick={() => goTo(activeIndex + 1, 1)} className="p-6 rounded cursor-pointer" aria-label="Próximo case">
            <ChevronDown faded={activeIndex === CASES.length - 1} />
          </button>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════ MOBILE ═══ */}
      <div className="cases-mobile flex lg:hidden flex-col min-h-screen bg-white dark:bg-[#111318] transition-colors duration-300 overflow-hidden">

        <nav className="cases-mobile-nav flex items-center justify-end gap-4 pt-10 pr-4 sm:pr-8 pl-4 sm:pl-8 flex-shrink-0">
          <div className="flex items-center justify-center px-2 py-2 bg-[rgba(36,42,47,0.08)] rounded-[8px]">
            <span className="font-['Agrandir'] font-[800] text-[#242a2f] dark:text-[#f0ede8] text-base tracking-[0.72px] whitespace-nowrap">Cases</span>
          </div>
          <TransitionLink href="/sobre" className="flex items-center p-2 group">
            <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-base tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">Sobre</span>
          </TransitionLink>
          <MenuButton onClick={() => setMenuOpen(true)} />
        </nav>

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id + "-mobile"}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex flex-col justify-center px-8 pb-16"
              onClick={handleCaseClick}
            >
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img src={MOBILE_LOGOS[activeIndex]} alt={current.name} style={{ width: "180px", height: "180px", objectFit: "contain" }} />
              </div>

              {/* Brand name */}
              <p className="font-['Agrandir'] font-[800] text-[#242a2f] dark:text-[#f0ede8] text-center leading-none" style={{ fontSize: "clamp(40px, 12vw, 80px)" }}>
                {current.name}
              </p>

              {/* Description */}
              <p className="font-['Agrandir_Narrow'] text-[rgba(36,42,47,0.56)] dark:text-[rgba(240,237,232,0.56)] text-[18px] tracking-[0.5px] text-center mt-4" style={{ lineHeight: "28px", whiteSpace: "pre-line" }}>
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="cases-mobile-controls flex items-center justify-center gap-6 pb-12 flex-shrink-0">
          <button onClick={() => goTo(activeIndex - 1, -1)} className="p-4 cursor-pointer" aria-label="Case anterior">
            <ChevronUp faded={activeIndex === 0} />
          </button>
          <div className="flex gap-3 items-center">
            {CASES.map((c, i) => (
              <button key={c.id} onClick={() => goTo(i, i > activeIndex ? 1 : -1)} className="cursor-pointer"
                style={{ width: i === activeIndex ? "24px" : "8px", height: "8px", background: i === activeIndex ? "#242a2f" : "rgba(36,42,47,0.24)", borderRadius: "12px", transition: "width 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s" }}
              />
            ))}
          </div>
          <button onClick={() => goTo(activeIndex + 1, 1)} className="p-4 cursor-pointer" aria-label="Próximo case">
            <ChevronDown faded={activeIndex === CASES.length - 1} />
          </button>
        </div>
      </div>
    </>
  );
}
