"use client";

import React, { useEffect, useState } from "react";
import { TransitionLink } from "./TransitionLink";
import MenuOverlay from "./MenuOverlay";
import { useMemojiContext } from "./MemojiContext";

const imgMemoji =
  "https://www.figma.com/api/mcp/asset/133be483-21f4-4de7-abd3-ec515c210a7a";
const imgIconNormal =
  "https://www.figma.com/api/mcp/asset/465ed456-cc28-4c23-bdf9-ead698df39a0";
const imgIconHover =
  "https://www.figma.com/api/mcp/asset/8976d692-1314-4de2-8c0b-5d1afee5a487";

/* ── Icons ────────────────────────────────────────────────────────── */
function SunIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="1.5" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22.5" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="1.5" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22.5" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ── Dark mode toggle ─────────────────────────────────────────────── */
function ThemeToggleItem() {
  const [dark, setDark] = useState(false);
  const [anim, setAnim] = useState<"to-dark" | "to-light" | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleClick = () => {
    const next = !dark;
    setAnim(next ? "to-dark" : "to-light");
    setDark(next);
  };

  const thumbStyle: React.CSSProperties =
    anim === "to-dark"
      ? { animation: "thumb-to-dark 0.35s cubic-bezier(0.4,0,0.2,1) forwards" }
      : anim === "to-light"
      ? { animation: "thumb-to-light 0.35s cubic-bezier(0.4,0,0.2,1) forwards" }
      : { left: dark ? "35px" : "3px", width: "18px" };

  const sunStyle: React.CSSProperties = {
    color: "#ff9641",
    opacity: dark ? 0 : 1,
    transform: dark ? "rotate(90deg) scale(0.2)" : "rotate(0deg) scale(1)",
    transition: dark ? "opacity 0.15s ease, transform 0.15s ease" : "opacity 0.2s ease 0.15s, transform 0.2s ease 0.15s",
  };

  const moonStyle: React.CSSProperties = {
    color: "#4f46e5",
    opacity: dark ? 1 : 0,
    transform: dark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.2)",
    transition: dark ? "opacity 0.2s ease 0.15s, transform 0.2s ease 0.15s" : "opacity 0.15s ease, transform 0.15s ease",
  };

  return (
    <button onClick={handleClick} className="home-theme-toggle relative flex-shrink-0 cursor-pointer focus:outline-none" style={{ width: "56px", height: "24px" }} aria-label="Toggle dark mode">
      <div className="home-theme-track absolute inset-0 rounded-full transition-colors duration-300" style={{ background: dark ? "#4f46e5" : "rgba(36,42,47,0.16)" }} />
      <div className="home-theme-thumb absolute top-[3px] rounded-full bg-white flex items-center justify-center overflow-hidden" style={{ height: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.18)", ...thumbStyle }} onAnimationEnd={() => setAnim(null)}>
        <div className="home-theme-sun absolute" style={sunStyle}><SunIcon size={11} /></div>
        <div className="home-theme-moon absolute" style={moonStyle}><MoonIcon size={10} /></div>
      </div>
    </button>
  );
}

/* ── Menu button ──────────────────────────────────────────────────── */
function MenuButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="home-menu-btn flex items-center justify-center pl-6 pr-2 py-2 cursor-pointer transition-all duration-300"
      style={{ gap: hovered ? "16px" : "24px", background: hovered ? "rgba(36,42,47,0.16)" : "transparent", borderRadius: hovered ? "16px" : "0px" }}
    >
      <span className="home-menu-label font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap">Menu</span>
      <div className="home-menu-icon flex items-center justify-center rounded-xl size-10 transition-all duration-300" style={{ background: hovered ? "transparent" : "rgba(36,42,47,0.08)", gap: hovered ? "0px" : "3px" }}>
        <div className="home-menu-dot bg-[#242a2f] dark:bg-[#f0ede8] rounded-xl size-1 transition-all duration-300" style={{ opacity: hovered ? 0 : 1, width: hovered ? "0px" : "4px" }} />
        <div className="home-menu-dash bg-[#242a2f] dark:bg-[#f0ede8] h-1 rounded-xl transition-all duration-300" style={{ width: hovered ? "17px" : "10px" }} />
      </div>
    </button>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function HomeIntro() {
  const [casesHovered, setCasesHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setHovered } = useMemojiContext();

  const handleAboutEnter = () => { setAboutHovered(true);  setHovered(true);  };
  const handleAboutLeave = () => { setAboutHovered(false); setHovered(false); };

  return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ═══════════════════════════════════════════ DESKTOP ═══ */}
      <div className="home-desktop hidden lg:block bg-white dark:bg-[#111318] relative w-full min-h-screen overflow-hidden transition-colors duration-300">

        <div className="home-desktop-theme absolute" style={{ right: "16px", top: "12px", zIndex: 50, opacity: 0 }}>
          <ThemeToggleItem />
        </div>

        <nav className="home-desktop-nav absolute top-0 right-0 flex items-center gap-8 pt-14 pr-12">
          <TransitionLink href="/cases" className="home-nav-cases flex items-center justify-center p-2 group" onMouseEnter={() => setCasesHovered(true)} onMouseLeave={() => setCasesHovered(false)}>
            <span className="home-nav-cases-label font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">Cases</span>
          </TransitionLink>
          <TransitionLink href="/sobre" className="home-nav-sobre flex items-center justify-center p-2 group" onMouseEnter={handleAboutEnter} onMouseLeave={handleAboutLeave}>
            <span className="home-nav-sobre-label font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">Sobre</span>
          </TransitionLink>
          <MenuButton onClick={() => setMenuOpen(true)} />
        </nav>

        <div
          className="home-orange-shape absolute bg-[#ff9641] dark:bg-[#c96e1e] transition-all duration-500 ease-in-out"
          style={{ right: casesHovered ? "-305px" : "-189px", top: casesHovered ? "614px" : "427px", width: casesHovered ? "600px" : "656px", height: casesHovered ? "600px" : "1312px", borderRadius: casesHovered ? "120px" : "656px" }}
        />

        <div
          className="home-hero-text absolute left-[200px]"
          style={{ top: "130px", transform: aboutHovered ? "translateY(15px)" : "translateY(0)", transition: "transform 0.4s ease-in-out" }}
        >
          <p className="home-hero-paragraph font-['Agrandir_Wide'] font-light text-[#242a2f] dark:text-[#f0ede8] text-4xl tracking-[1px] leading-snug transition-colors duration-300">
            Sou o Paulo Santos,
            <br />
            designer specialist no
            <br />
            <a href="https://www.mercadolivre.com.br/" target="_blank" rel="noopener noreferrer" className="home-hero-ml-link text-[#ff9641] hover:opacity-80 transition-opacity duration-200">
              @mercadolivre
            </a>
          </p>
        </div>

        <div
          className="home-sobre-btn-area absolute"
          style={{ left: "188px", top: "322px", width: "318px", height: "91px", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "12px", transform: aboutHovered ? "translateY(-9px)" : "translateY(0)", transition: "transform 0.4s ease-in-out" }}
          onMouseEnter={handleAboutEnter}
          onMouseLeave={handleAboutLeave}
        >
          <TransitionLink
            href="/sobre"
            className={`home-sobre-btn relative block rounded-[24px] border transition-colors duration-300 ${aboutHovered ? "border-transparent" : "border-[rgba(36,42,47,0.24)] dark:border-[rgba(255,255,255,0.16)]"}`}
            style={{ width: "299px", height: "60px" }}
          >
            <div className="home-sobre-btn-inner absolute inset-[1px] rounded-[23px] overflow-hidden">
              <span className="home-sobre-btn-label absolute left-8 top-1/2 -translate-y-1/2 font-['Agrandir'] font-extrabold text-[#242a2f] dark:text-white text-base whitespace-nowrap transition-colors duration-300" style={{ zIndex: 2, color: aboutHovered ? "#242a2f" : undefined }}>
                Sobre mim
              </span>
              <div
                className="home-sobre-btn-icon-wrap"
                style={{ position: "absolute", overflow: "hidden", right: aboutHovered ? 0 : "10px", top: aboutHovered ? 0 : "50%", transform: aboutHovered ? "none" : "translateY(-50%)", width: aboutHovered ? "100%" : "72px", height: aboutHovered ? "100%" : "44px", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
              >
                <img className="home-sobre-btn-icon-normal" src={imgIconNormal} alt="" style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: "72px", height: "44px", objectFit: "fill", opacity: aboutHovered ? 0 : 1, transition: "opacity 0.3s ease-in-out" }} />
                <img className="home-sobre-btn-icon-hover" src={imgIconHover} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", opacity: aboutHovered ? 1 : 0, transition: "opacity 0.3s ease-in-out" }} />
              </div>
            </div>
          </TransitionLink>
        </div>

        <TransitionLink
          href="/cases"
          className="home-cases-text absolute left-[200px] transition-transform duration-500 ease-in-out"
          style={{ bottom: "-63px", transform: casesHovered ? "translateY(-63px)" : "translateY(0)" }}
          onMouseEnter={() => setCasesHovered(true)}
          onMouseLeave={() => setCasesHovered(false)}
        >
          <p className="home-cases-label font-['Agrandir'] font-[800] text-[#242a2f] dark:text-[#f0ede8] text-[160px] leading-none whitespace-nowrap transition-colors duration-300">cases</p>
        </TransitionLink>

      </div>

      {/* ═══════════════════════════════════════════ MOBILE ════ */}
      <div className="home-mobile flex lg:hidden flex-col min-h-screen bg-white dark:bg-[#111318] relative overflow-hidden transition-colors duration-300">

        <div className="home-mobile-theme absolute" style={{ right: "16px", top: "12px", zIndex: 50, opacity: 0 }}>
          <ThemeToggleItem />
        </div>

        <div className="home-mobile-orange-shape absolute bg-[#ff9641] dark:bg-[#c96e1e] transition-colors duration-300 pointer-events-none" style={{ right: "-80px", bottom: "-80px", width: "320px", height: "320px", borderRadius: "50%" }} />

        <nav className="home-mobile-nav relative flex items-center justify-end gap-2 sm:gap-6 pt-10 pr-4 sm:pr-8 pl-4 sm:pl-8 flex-shrink-0">
          <TransitionLink href="/cases" className="home-mobile-nav-cases hidden md:flex items-center justify-center p-2 group">
            <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-base tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">Cases</span>
          </TransitionLink>
          <TransitionLink href="/sobre" className="home-mobile-nav-sobre hidden md:flex items-center justify-center p-2 group">
            <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-base tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">Sobre</span>
          </TransitionLink>
          <MenuButton onClick={() => setMenuOpen(true)} />
        </nav>

        <div className="home-mobile-hero flex-1 flex flex-col justify-start px-6 sm:px-12 pt-20 pb-4">
          <p className="home-mobile-hero-paragraph font-['Agrandir_Wide'] font-light text-[#242a2f] dark:text-[#f0ede8] text-2xl sm:text-3xl tracking-[1px] leading-snug transition-colors duration-300">
            Sou o Paulo Santos,
            <br />
            designer specialist no
            <br />
            <a href="https://www.mercadolivre.com.br/" target="_blank" rel="noopener noreferrer" className="home-mobile-hero-ml-link text-[#ff9641] hover:opacity-80 transition-opacity duration-200">
              @mercadolivre
            </a>
          </p>

          <div className="home-mobile-sobre-btn-area mt-8">
            <TransitionLink href="/sobre" className="home-mobile-sobre-btn inline-flex items-center gap-4 rounded-[24px] border border-[rgba(36,42,47,0.24)] dark:border-[rgba(255,255,255,0.16)] px-8 py-4">
              <span className="home-mobile-sobre-btn-label font-['Agrandir'] font-extrabold text-[#242a2f] dark:text-white text-base whitespace-nowrap">Sobre mim</span>
              <img className="home-mobile-sobre-btn-icon" src={imgIconNormal} alt="" style={{ width: "48px", height: "30px", objectFit: "fill" }} />
            </TransitionLink>
          </div>
        </div>

        <div className="home-mobile-cases-wrap relative flex-shrink-0 overflow-hidden mt-8">
          <TransitionLink href="/cases" className="home-mobile-cases-link">
            <p className="home-mobile-cases-label font-['Agrandir'] font-[800] text-[#242a2f] dark:text-[#f0ede8] leading-none whitespace-nowrap transition-colors duration-300 text-[20vw] sm:text-[18vw] -mb-[0.18em]">cases</p>
          </TransitionLink>
        </div>

      </div>

    </>
  );
}
