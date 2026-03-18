"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import MenuOverlay from "./MenuOverlay";

const imgMemoji =
  "https://www.figma.com/api/mcp/asset/133be483-21f4-4de7-abd3-ec515c210a7a";
// Button icon — normal state (72×44px pill with arrows)
const imgIconNormal =
  "https://www.figma.com/api/mcp/asset/465ed456-cc28-4c23-bdf9-ead698df39a0";
// Button icon — hover state (280×60px full button with reversed arrows)
const imgIconHover =
  "https://www.figma.com/api/mcp/asset/8976d692-1314-4de2-8c0b-5d1afee5a487";

/* ── Icons ────────────────────────────────────────────────────────── */
function SunIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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

/* ── Dark mode toggle — 56×24px, sun/moon animados ───────────────── */
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

  // Exiting icon disappears fast; entering icon appears with a 0.15s delay
  const sunStyle: React.CSSProperties = {
    color: "#ff9641",
    opacity: dark ? 0 : 1,
    transform: dark ? "rotate(90deg) scale(0.2)" : "rotate(0deg) scale(1)",
    transition: dark
      ? "opacity 0.15s ease, transform 0.15s ease"
      : "opacity 0.2s ease 0.15s, transform 0.2s ease 0.15s",
  };

  const moonStyle: React.CSSProperties = {
    color: "#4f46e5",
    opacity: dark ? 1 : 0,
    transform: dark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.2)",
    transition: dark
      ? "opacity 0.2s ease 0.15s, transform 0.2s ease 0.15s"
      : "opacity 0.15s ease, transform 0.15s ease",
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex-shrink-0 cursor-pointer focus:outline-none"
      style={{ width: "56px", height: "24px" }}
      aria-label="Toggle dark mode"
    >
      {/* Track */}
      <div
        className="absolute inset-0 rounded-full transition-colors duration-300"
        style={{ background: dark ? "#4f46e5" : "rgba(36,42,47,0.16)" }}
      />
      {/* Sliding thumb with icon */}
      <div
        className="absolute top-[3px] rounded-full bg-white flex items-center justify-center overflow-hidden"
        style={{ height: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.18)", ...thumbStyle }}
        onAnimationEnd={() => setAnim(null)}
      >
        <div className="absolute" style={sunStyle}>
          <SunIcon size={11} />
        </div>
        <div className="absolute" style={moonStyle}>
          <MoonIcon size={10} />
        </div>
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
      className="flex items-center justify-center pl-6 pr-2 py-2 cursor-pointer transition-all duration-300"
      style={{
        gap: hovered ? "16px" : "24px",
        background: hovered ? "rgba(36,42,47,0.16)" : "transparent",
        borderRadius: hovered ? "16px" : "0px",
      }}
    >
      <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap">
        Menu
      </span>
      {/* Icon box — bg desaparece no hover (unifica com o container) */}
      <div
        className="flex items-center justify-center rounded-xl size-10 transition-all duration-300"
        style={{
          background: hovered ? "transparent" : "rgba(36,42,47,0.08)",
          gap: hovered ? "0px" : "3px",
        }}
      >
        {/* dot — some no hover */}
        <div
          className="bg-[#242a2f] dark:bg-[#f0ede8] rounded-xl size-1 transition-all duration-300"
          style={{
            opacity: hovered ? 0 : 1,
            width: hovered ? "0px" : "4px",
          }}
        />
        {/* dash — fica mais largo no hover */}
        <div
          className="bg-[#242a2f] dark:bg-[#f0ede8] h-1 rounded-xl transition-all duration-300"
          style={{ width: hovered ? "17px" : "10px" }}
        />
      </div>
    </button>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function HomeIntro() {
  const [casesHovered, setCasesHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Menu overlay (desktop + mobile) ───────────────────────────── */}
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP layout — visível apenas em lg+ (≥1024px)
          Mantido exatamente como estava, sem nenhuma alteração.
      ═══════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block bg-white dark:bg-[#111318] relative w-full min-h-screen overflow-hidden transition-colors duration-300">

        {/* ── Dark mode toggle — top-right, acima de tudo ─────────────── */}
        <div className="absolute" style={{ right: "16px", top: "12px", zIndex: 50, opacity: 0 }}>
          <ThemeToggleItem />
        </div>

        {/* ── Navigation ─────────────────────────────────────────────── */}
        <nav className="absolute top-0 right-0 flex items-center gap-8 pt-14 pr-12">
          <Link
            href="/cases"
            className="flex items-center justify-center p-2 group"
            onMouseEnter={() => setCasesHovered(true)}
            onMouseLeave={() => setCasesHovered(false)}
          >
            <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">
              Cases
            </span>
          </Link>
          <Link
            href="/sobre"
            className="flex items-center justify-center p-2 group"
            onMouseEnter={() => setAboutHovered(true)}
            onMouseLeave={() => setAboutHovered(false)}
          >
            <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">
              Sobre
            </span>
          </Link>
          <MenuButton onClick={() => setMenuOpen(true)} />
        </nav>

        {/* ── Orange decorative shape ─────────────────────────────────── */}
        <div
          className="absolute bg-[#ff9641] dark:bg-[#c96e1e] transition-all duration-500 ease-in-out"
          style={{
            right: casesHovered ? "-305px" : "-189px",
            top: casesHovered ? "614px" : "427px",
            width: casesHovered ? "600px" : "656px",
            height: casesHovered ? "600px" : "1312px",
            borderRadius: casesHovered ? "120px" : "656px",
          }}
        />

        {/* ── Memoji bg-avatar (pink oval) — appears on aboutHovered ──── */}
        <div
          className="absolute rounded-[32px]"
          style={{
            background: "#f4a39e",
            left: `${aboutHovered ? 181 : 200}px`,
            top: "57px",
            width: `${aboutHovered ? 102 : 43.71}px`,
            height: `${aboutHovered ? 56 : 24}px`,
            opacity: aboutHovered ? 1 : 0,
            transition: "all 0.4s ease-in-out",
          }}
        />

        {/* ── Memoji face — appears on aboutHovered ──────────────────── */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${aboutHovered ? 161 : 181}px`,
            top: "21px",
            width: `${aboutHovered ? 142 : 102}px`,
            height: `${aboutHovered ? 105 : 76}px`,
            opacity: aboutHovered ? 1 : 0,
            transition: "all 0.4s ease-in-out",
          }}
        >
          <img
            alt="memoji"
            className="absolute inset-0 size-full object-cover"
            src={imgMemoji}
          />
        </div>

        {/* ── Hero text — shifts DOWN 15px on aboutHovered ───────────── */}
        <div
          className="absolute left-[200px]"
          style={{
            top: "130px",
            transform: aboutHovered ? "translateY(15px)" : "translateY(0)",
            transition: "transform 0.4s ease-in-out",
          }}
        >
          <p className="font-['Agrandir_Wide'] font-light text-[#242a2f] dark:text-[#f0ede8] text-4xl tracking-[1px] leading-snug transition-colors duration-300">
            Sou o Paulo Santos,
            <br />
            designer specialist no
            <br />
            <a
              href="https://www.mercadolivre.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff9641] hover:opacity-80 transition-opacity duration-200"
            >
              @mercadolivre
            </a>
          </p>
        </div>

        {/* ── "Sobre mim" button — separately positioned, shifts UP 9px ─ */}
        {/*
          Hover trigger area is padded (matches Figma hover-button-animation:
          188×322, 318×91) to avoid flicker when button moves.
          Structure:
            outer div  → gray border always (no overflow-hidden → clean corners)
            inner div  → overflow-hidden for the expanding yellow bg
              yellow div → small pill on right → fills full button on hover
              text       → always left-anchored
              arrows     → 3 chevrons, opacity reversed on hover
        */}
        <div
          className="absolute"
          style={{
            left: "188px",
            top: "322px",
            width: "318px",
            height: "91px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "12px",
            transform: aboutHovered ? "translateY(-9px)" : "translateY(0)",
            transition: "transform 0.4s ease-in-out",
          }}
          onMouseEnter={() => setAboutHovered(true)}
          onMouseLeave={() => setAboutHovered(false)}
        >
          <Link
            href="/sobre"
            className={`relative block rounded-[24px] border transition-colors duration-300 ${
              aboutHovered
                ? "border-transparent"
                : "border-[rgba(36,42,47,0.24)] dark:border-[rgba(255,255,255,0.16)]"
            }`}
            style={{ width: "299px", height: "60px" }}
          >
            {/* Inner clip */}
            <div className="absolute inset-[1px] rounded-[23px] overflow-hidden">

              {/* Text — always visible on the left */}
              <span
                className="absolute left-8 top-1/2 -translate-y-1/2 font-['Agrandir'] font-extrabold text-[#242a2f] dark:text-white text-base whitespace-nowrap transition-colors duration-300"
                style={{ zIndex: 2, color: aboutHovered ? "#242a2f" : undefined }}
              >
                Sobre mim
              </span>

              {/*
                Icon container — transitions from small pill (right) to full button.
                The container grows, and the two images crossfade inside:
                  - imgIconNormal: 72×44px arrows (normal colours, dark→light)
                  - imgIconHover:  full-button image (reversed colours, light→dark)
                Both are real Figma assets so the arrow size is pixel-perfect.
              */}
              <div
                style={{
                  position: "absolute",
                  overflow: "hidden",
                  right: aboutHovered ? 0 : "10px",
                  top: aboutHovered ? 0 : "50%",
                  transform: aboutHovered ? "none" : "translateY(-50%)",
                  width: aboutHovered ? "100%" : "72px",
                  height: aboutHovered ? "100%" : "44px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Normal icon — visible in default, fades out on hover */}
                <img
                  src={imgIconNormal}
                  alt=""
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "72px",
                    height: "44px",
                    objectFit: "fill",
                    opacity: aboutHovered ? 0 : 1,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                />
                {/* Hover icon — hidden by default, fills button on hover */}
                <img
                  src={imgIconHover}
                  alt=""
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                    opacity: aboutHovered ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                />
              </div>

            </div>
          </Link>
        </div>

        {/* ── "cases" large text — partially hidden, rises on hover ───── */}
        <Link
          href="/cases"
          className="absolute left-[200px] transition-transform duration-500 ease-in-out"
          style={{
            bottom: "-63px",
            transform: casesHovered ? "translateY(-63px)" : "translateY(0)",
          }}
          onMouseEnter={() => setCasesHovered(true)}
          onMouseLeave={() => setCasesHovered(false)}
        >
          <p className="font-['Agrandir'] font-[800] text-[#242a2f] dark:text-[#f0ede8] text-[160px] leading-none whitespace-nowrap transition-colors duration-300">
            cases
          </p>
        </Link>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE / TABLET layout — visível apenas abaixo de lg (<1024px)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="flex lg:hidden flex-col min-h-screen bg-white dark:bg-[#111318] relative overflow-hidden transition-colors duration-300">

        {/* ── Dark mode toggle — top-right, fora da nav ────────────────── */}
        <div className="absolute" style={{ right: "16px", top: "12px", zIndex: 50, opacity: 0 }}>
          <ThemeToggleItem />
        </div>

        {/* ── Orange decorative shape (canto inferior direito) ─────────── */}
        <div
          className="absolute bg-[#ff9641] dark:bg-[#c96e1e] transition-colors duration-300 pointer-events-none"
          style={{
            right: "-80px",
            bottom: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
          }}
        />

        {/* ── Memoji bg-avatar — sempre visível em mobile ──────────────── */}
        <div
          className="absolute rounded-[32px] pointer-events-none"
          style={{
            background: "#f4a39e",
            left: "24px",
            top: "48px",
            width: "88px",
            height: "48px",
          }}
        />
        {/* ── Memoji face — sempre visível em mobile ───────────────────── */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "4px",
            top: "10px",
            width: "122px",
            height: "90px",
          }}
        >
          <img
            alt="memoji"
            className="absolute inset-0 size-full object-cover"
            src={imgMemoji}
          />
        </div>

        {/* ── Navigation ─────────────────────────────────────────────── */}
        <nav className="relative flex items-center justify-end gap-2 sm:gap-6 pt-10 pr-4 sm:pr-8 pl-4 sm:pl-8 flex-shrink-0">
          <Link href="/cases" className="hidden md:flex items-center justify-center p-2 group">
            <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-base tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">
              Cases
            </span>
          </Link>
          <Link href="/sobre" className="hidden md:flex items-center justify-center p-2 group">
            <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-base tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">
              Sobre
            </span>
          </Link>
          <MenuButton onClick={() => setMenuOpen(true)} />
        </nav>

        {/* ── Hero content ─────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-start px-6 sm:px-12 pt-20 pb-4">
          <p className="font-['Agrandir_Wide'] font-light text-[#242a2f] dark:text-[#f0ede8] text-2xl sm:text-3xl tracking-[1px] leading-snug transition-colors duration-300">
            Sou o Paulo Santos,
            <br />
            designer specialist no
            <br />
            <a
              href="https://www.mercadolivre.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff9641] hover:opacity-80 transition-opacity duration-200"
            >
              @mercadolivre
            </a>
          </p>

          {/* ── "Sobre mim" button ────────────────────────────────────── */}
          <div className="mt-8">
            <Link
              href="/sobre"
              className="inline-flex items-center gap-4 rounded-[24px] border border-[rgba(36,42,47,0.24)] dark:border-[rgba(255,255,255,0.16)] px-8 py-4"
            >
              <span className="font-['Agrandir'] font-extrabold text-[#242a2f] dark:text-white text-base whitespace-nowrap">
                Sobre mim
              </span>
              <img
                src={imgIconNormal}
                alt=""
                style={{ width: "48px", height: "30px", objectFit: "fill" }}
              />
            </Link>
          </div>
        </div>

        {/* ── "cases" large text — parcialmente cortado embaixo ────────── */}
        <div className="relative flex-shrink-0 overflow-hidden mt-8">
          <Link href="/cases">
            <p className="font-['Agrandir'] font-[800] text-[#242a2f] dark:text-[#f0ede8] leading-none whitespace-nowrap transition-colors duration-300 text-[20vw] sm:text-[18vw] -mb-[0.18em]">
              cases
            </p>
          </Link>
        </div>

      </div>
    </>
  );
}
