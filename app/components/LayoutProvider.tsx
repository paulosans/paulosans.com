"use client";

import { useEffect, useLayoutEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { MemojiContext } from "./MemojiContext";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const imgMemoji = "https://www.figma.com/api/mcp/asset/0bfb2280-1582-469a-869a-b904b7d32828";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const [hovered,      setHovered]      = useState(false);
  const [targetRect,   setTargetRect]   = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isDesktop,    setIsDesktop]    = useState<boolean | null>(null);
  const [photoVisible, setPhotoVisible] = useState(false);

  // Fade in portal + detect viewport
  useEffect(() => {
    const el = document.getElementById("memoji-portal");
    if (el) el.style.opacity = "1";

    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isSobre = pathname === "/sobre";
  // Pages that register their own memoji placeholder
  const hasMemojiPlaceholder = ["/sobre", "/curriculo"].includes(pathname);

  // Clear photo state when leaving /sobre; clear targetRect only on pages with no placeholder
  useIsomorphicLayoutEffect(() => {
    if (!isSobre) setPhotoVisible(false);
    if (!hasMemojiPlaceholder) setTargetRect(null);
  }, [pathname]);

  // Single source of truth for the memoji position/size/opacity
  let animateTarget: Record<string, number | string>;

  const isCurriculo = pathname === "/curriculo";

  if (isCurriculo) {
    animateTarget = { opacity: 0 };
  } else if (targetRect) {
    // Any page that registered a placeholder — animate there
    animateTarget = {
      left: targetRect.x, top: targetRect.y,
      width: targetRect.width, height: targetRect.height,
      opacity: (isSobre && photoVisible) ? 0 : 1,
    };
  } else if (hasMemojiPlaceholder) {
    // On a placeholder page but not measured yet — stay invisible
    animateTarget = { opacity: 0 };
  } else if (isDesktop === false) {
    // Mobile home — always visible
    animateTarget = { left: 4, top: 10, width: 122, height: 90, opacity: 1 };
  } else {
    // Desktop home — visible only on hover
    animateTarget = {
      left: hovered ? 164 : 181, top: 21,
      width: hovered ? 130 : 96, height: hovered ? 98 : 72,
      opacity: hovered ? 1 : 0,
    };
  }

  const borderRadius = targetRect ? "48px" : "32px";

  // Background pink card
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

  // Memoji image size
  const imgAnimateTarget = targetRect
    ? { width: 178, height: 134 }
    : { width: 127, height: 96 };

  const ctx = useMemo(() => ({ setHovered, setTargetRect, setPhotoVisible }), []);

  return (
    <MemojiContext.Provider value={ctx}>
      <LayoutGroup id="root">

        {/* ── Persistent memoji — never unmounts, animates between pages ── */}
        <div
          id="memoji-portal"
          style={{ position: "fixed", top: 0, left: 0, width: 0, height: 0, overflow: "visible", pointerEvents: "none", zIndex: 100 }}
        >
          <motion.div
            className="pointer-events-none"
            style={{ position: "absolute", overflow: "visible" }}
            animate={animateTarget}
            transition={{
              opacity: { duration: 0.6, ease: "easeInOut" },
              default: { type: "spring", stiffness: 200, damping: 28 },
            }}
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

        {children}
      </LayoutGroup>
    </MemojiContext.Provider>
  );
}
