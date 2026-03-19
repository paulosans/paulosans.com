"use client";

import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useMemojiContext } from "../components/MemojiContext";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { TransitionLink } from "../components/TransitionLink";
import MenuOverlay from "../components/MenuOverlay";

/* ── Assets ─────────────────────────────────────────────────────── */

const imgGif1     = "https://www.figma.com/api/mcp/asset/84d92429-1ecf-45e0-8864-26e3d67df254";
const imgGif2     = "https://www.figma.com/api/mcp/asset/e23fcfa3-4734-4176-9e6c-122801353151";
const imgGif3     = "https://www.figma.com/api/mcp/asset/6692f499-01ed-4f27-8115-f1946824e5e3";
const imgGif4     = "https://www.figma.com/api/mcp/asset/90a21b4a-ea1c-45af-a88a-d20a8924a2dc";
const imgGif5     = "https://www.figma.com/api/mcp/asset/5aa146bf-520a-4a70-b1f4-609671c0ea5a";
const imgGif6     = "https://www.figma.com/api/mcp/asset/e1cb0713-83b6-433a-b4c6-8498cd940e99";
const imgLinkedIn = "https://www.figma.com/api/mcp/asset/c02d6556-9458-415e-a520-feb191911ad3";
const imgDribbble = "https://www.figma.com/api/mcp/asset/ceb4ee5d-d77c-4c78-b0f8-0620f0c25384";
const imgGithub   = "https://www.figma.com/api/mcp/asset/32a4d7d1-c9bc-47ac-a001-a2bc75d835c2";
const imgArrowns  = "https://www.figma.com/api/mcp/asset/0f5b438a-4d8a-4d68-8ebe-43b313a23dd2";
const imgPhoto    = "https://www.figma.com/api/mcp/asset/e6a500eb-a550-447c-8aa6-668f1bc7cb2d";

/* ── MenuButton ─────────────────────────────────────────────────── */
function MenuButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="sobre-menu-btn flex items-center justify-center pl-6 pr-2 py-2 cursor-pointer transition-all duration-300"
      style={{
        gap: hovered ? "16px" : "24px",
        background: hovered ? "rgba(36,42,47,0.16)" : "transparent",
        borderRadius: hovered ? "16px" : "0px",
      }}
    >
      <span className="sobre-menu-label font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap">
        Menu
      </span>
      <div
        className="sobre-menu-icon flex items-center justify-center rounded-xl size-10 transition-all duration-300"
        style={{
          background: hovered ? "transparent" : "rgba(36,42,47,0.08)",
          gap: hovered ? "0px" : "3px",
        }}
      >
        <div
          className="sobre-menu-dot bg-[#242a2f] dark:bg-[#f0ede8] rounded-xl size-1 transition-all duration-300"
          style={{ opacity: hovered ? 0 : 1, width: hovered ? "0px" : "4px" }}
        />
        <div
          className="sobre-menu-dash bg-[#242a2f] dark:bg-[#f0ede8] h-1 rounded-xl transition-all duration-300"
          style={{ width: hovered ? "17px" : "10px" }}
        />
      </div>
    </button>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function SobrePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark]     = useState(false);
  const [backHovered, setBackHovered] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const { setTargetRect, setPhotoVisible } = useMemojiContext();

  // Measure placeholder and report position to the persistent memoji in LayoutProvider
  const placeholderRef = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      const r = el.getBoundingClientRect();
      setTargetRect({ x: r.x, y: r.y, width: r.width, height: r.height });
    }
  }, [setTargetRect]);

  // After 2s on the page, swap memoji → real photo
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPhoto(true);
      setPhotoVisible(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
      setPhotoVisible(false);
    };
  }, [setPhotoVisible]);

  // Track dark mode class on <html>
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="sobre-page min-h-screen bg-white dark:bg-[#111318] transition-colors duration-300 overflow-x-hidden pb-16">

        {/* ── Navigation ───────────────────────────────────────────── */}
        <nav className="sobre-nav flex items-center justify-between pt-12 px-6 sm:px-12 lg:px-[200px]">

          {/* Back */}
          <TransitionLink
            href="/"
            className="sobre-nav-back flex items-center pl-2 pr-6 py-2 cursor-pointer transition-all duration-300"
            style={{ gap: backHovered ? "16px" : "24px", background: backHovered ? "rgba(36,42,47,0.16)" : "transparent", borderRadius: backHovered ? "16px" : "0px" }}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
          >
            <div
              className="sobre-nav-back-icon flex items-center justify-center rounded-xl size-10 transition-all duration-300"
              style={{ background: backHovered ? "transparent" : "rgba(36,42,47,0.08)" }}
            >
              <img
                src={imgArrowns}
                alt=""
                style={{ width: "40px", height: "40px", objectFit: "contain", display: "block", transform: "rotate(-90deg)" }}
              />
            </div>
            <span className="sobre-nav-back-label font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap">
              Voltar
            </span>
          </TransitionLink>

          {/* Right nav */}
          <div className="sobre-nav-right flex items-center gap-4 sm:gap-8">
            <TransitionLink href="/cases" className="sobre-nav-cases hidden sm:flex items-center justify-center p-2 group">
              <span className="font-['Agrandir'] font-light text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap transition-opacity group-hover:opacity-60">
                Cases
              </span>
            </TransitionLink>
            {/* Active — Sobre pill */}
            <div className="sobre-nav-active hidden sm:flex items-center justify-center px-4 py-2 bg-[rgba(36,42,47,0.08)] dark:bg-[rgba(255,255,255,0.08)] rounded-[8px]">
              <span className="font-['Agrandir'] font-[800] text-[#242a2f] dark:text-[#f0ede8] text-lg tracking-[0.72px] whitespace-nowrap">
                Sobre
              </span>
            </div>
            <MenuButton onClick={() => setMenuOpen(true)} />
          </div>
        </nav>

        {/* ── Content ──────────────────────────────────────────────── */}
        <div className="sobre-content mt-16 lg:mt-[87px] px-6 sm:px-12 lg:px-[200px] flex flex-col lg:flex-row lg:gap-[126px]">

          {/* ── Left — Bio ─────────────────────────────────────────── */}
          <div className="sobre-bio flex flex-col shrink-0 lg:w-[486px]">

            {/* Placeholder — reserves the space; the persistent memoji from LayoutProvider animates here */}
            {/* After ~2s the memoji fades out and the real photo fades in */}
            <div
              ref={placeholderRef}
              className="sobre-memoji relative"
              style={{ width: "138px", height: "138px" }}
            >
              <motion.img
                src={imgPhoto}
                alt="Paulo Santos"
                initial={{ opacity: 0 }}
                animate={{ opacity: showPhoto ? 1 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  width: "138px",
                  height: "138px",
                  borderRadius: "48px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Name */}
            <h1
              className="sobre-name mt-8 text-[#242a2f] dark:text-[#f0ede8] text-[32px] tracking-[1px] leading-none"
              style={{ fontFamily: "'Agrandir'", fontWeight: 800 }}
            >
              Paulo Santos
            </h1>

            {/* Bio paragraph */}
            <p
              className="sobre-bio-text mt-4 text-[20px] leading-[36px]"
              style={{ maxWidth: "486px", fontFamily: "'Agrandir Narrow', Arial, sans-serif", color: isDark ? "#f0ede8" : "#242a2f", letterSpacing: "0.6px" }}
            >
              <span className="sobre-bio-highlight" style={{ fontWeight: 700 }}>
                +12 anos de experiência em Produtos Digitais
              </span>
              <span className="sobre-bio-body">
                {", liderando projetos com foco no desenvolvimento de soluções que alinhem as "}
              </span>
              <span className="sobre-bio-highlight" style={{ fontWeight: 800 }}>
                metas de negócios a uma experiência memorável
              </span>
              <span className="sobre-bio-muted" style={{ color: isDark ? "rgba(240,237,232,0.56)" : "rgba(36,42,47,0.56)" }}>
                {" para os usuários."}
              </span>
            </p>

            {/* Buttons */}
            <div className="sobre-buttons flex flex-wrap gap-3 mt-8">
              <TransitionLink
                href="/curriculo"
                className="sobre-btn-curriculo flex items-center h-[40px] px-8 rounded-[16px] cursor-pointer"
                style={{ background: "#ffe887" }}
              >
                <span style={{ fontFamily: "'Agrandir'", fontWeight: 800, color: "#242a2f", fontSize: "14px", whiteSpace: "nowrap" }}>
                  Currículo
                </span>
              </TransitionLink>
              <TransitionLink
                href="/atuacoes"
                className="sobre-btn-atuacoes flex items-center h-[40px] px-8 rounded-[16px] cursor-pointer"
                style={{ background: "#242a2f" }}
              >
                <span style={{ fontFamily: "'Agrandir'", fontWeight: 800, color: "white", fontSize: "14px", whiteSpace: "nowrap" }}>
                  Últimas atuações
                </span>
              </TransitionLink>
            </div>

            {/* Social links */}
            <p
              className="sobre-social-label mt-12 text-[rgba(36,42,47,0.48)] dark:text-[rgba(240,237,232,0.48)] text-[18px]"
              style={{ fontFamily: "'Agrandir'" }}
            >
              Redes sociais
            </p>
            <div className="sobre-social-links flex gap-8 items-center mt-3">
              <a
                href="https://www.linkedin.com/in/paulosans/"
                target="_blank"
                rel="noopener noreferrer"
                className="sobre-social-linkedin opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                <img alt="LinkedIn" src={imgLinkedIn} className="size-8" />
              </a>
              <a
                href="https://dribbble.com/paulosans"
                target="_blank"
                rel="noopener noreferrer"
                className="sobre-social-dribbble opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                <img alt="Dribbble" src={imgDribbble} className="size-8" />
              </a>
              <a
                href="#"
                className="sobre-social-github opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                <img alt="GitHub" src={imgGithub} className="size-8" />
              </a>
            </div>
          </div>

          {/* ── Right — Image grid ──────────────────────────────────── */}
          <div className="sobre-grid flex-1 flex flex-col gap-[30px] mt-12 lg:mt-0">

            {/* Row 1: narrow | wide | narrow */}
            <div className="sobre-grid-row1 flex gap-[30px] h-[160px] sm:h-[220px] lg:h-[282px]">
              <img src={imgGif1} alt="" className="sobre-grid-img1 rounded-[16px] object-cover shrink-0" style={{ width: "21%" }} />
              <img src={imgGif2} alt="" className="sobre-grid-img2 rounded-[16px] object-cover flex-1 min-w-0" />
              <img src={imgGif3} alt="" className="sobre-grid-img3 rounded-[16px] object-cover shrink-0" style={{ width: "21%" }} />
            </div>

            {/* Row 2: wide | narrow | narrow + living pill */}
            <div className="sobre-grid-row2 flex gap-[30px] h-[160px] sm:h-[220px] lg:h-[282px]">
              <div className="sobre-grid-img4-wrap rounded-[16px] overflow-hidden relative shrink-0" style={{ width: "48%" }}>
                <img src={imgGif4} alt="" className="sobre-grid-img4 size-full object-cover" />
                <div className="sobre-living-pill absolute bottom-[20px] left-[20px] lg:bottom-[32px] lg:left-[32px] bg-[#242a2f] flex items-center justify-center px-5 py-1 rounded-[40px]">
                  <span
                    className="sobre-living-pill-text text-white text-center"
                    style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: "13px", letterSpacing: "1px", lineHeight: "1.5", whiteSpace: "nowrap" }}
                  >
                    Aracajuano{" "}
                    <span className="sobre-living-pill-city" style={{ fontFamily: "'Agrandir'", fontWeight: 800 }}>
                      em São Paulo
                    </span>
                  </span>
                </div>
              </div>
              <img src={imgGif5} alt="" className="sobre-grid-img5 rounded-[16px] object-cover flex-1 min-w-0" />
              <img src={imgGif6} alt="" className="sobre-grid-img6 rounded-[16px] object-cover flex-1 min-w-0" />
            </div>

            {/* Caption */}
            <p
              className="sobre-grid-caption text-right text-[rgba(36,42,47,0.56)] dark:text-[rgba(240,237,232,0.48)] text-[16px] tracking-[1px]"
              style={{ fontFamily: "'Agrandir'" }}
            >
              Um pouco sobre minha vida e meus hobbies
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
