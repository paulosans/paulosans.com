"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const imgMemoji =
  "https://www.figma.com/api/mcp/asset/133be483-21f4-4de7-abd3-ec515c210a7a";
// Button icon — normal state (72×44px pill with arrows)
const imgIconNormal =
  "https://www.figma.com/api/mcp/asset/465ed456-cc28-4c23-bdf9-ead698df39a0";
// Button icon — hover state (280×60px full button with reversed arrows)
const imgIconHover =
  "https://www.figma.com/api/mcp/asset/8976d692-1314-4de2-8c0b-5d1afee5a487";

function ThemeToggleItem() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="flex items-center justify-center p-2 cursor-pointer group"
      aria-label="Toggle dark mode"
    >
      <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">
        {dark ? "Sol" : "Lua"}
      </span>
    </button>
  );
}

function MenuButton() {
  return (
    <div className="flex gap-6 items-center justify-center pl-6 pr-2 py-2 cursor-pointer group">
      <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">
        Menu
      </span>
      <div className="bg-[rgba(36,42,47,0.08)] dark:bg-[rgba(255,255,255,0.1)] flex gap-[3px] items-center justify-center px-3 py-[18px] rounded-xl size-10">
        <div className="bg-[#242a2f] dark:bg-[#f0ede8] rounded-xl size-1" />
        <div className="bg-[#242a2f] dark:bg-[#f0ede8] h-1 rounded-xl w-[10px]" />
      </div>
    </div>
  );
}

export default function HomeIntro() {
  const [casesHovered, setCasesHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);

  return (
    <div className="bg-white dark:bg-[#111318] relative w-full min-h-screen overflow-hidden transition-colors duration-300">

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
        >
          <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">
            Sobre
          </span>
        </Link>
        <ThemeToggleItem />
        <MenuButton />
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
          product designer specialist
        </p>
        <a
          href="https://www.mercadolivre.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-['Agrandir'] font-light text-[#ff9641] text-4xl tracking-[1px] mt-2 block hover:opacity-80 transition-opacity duration-200"
        >
          @mercadolivre
        </a>
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
  );
}
