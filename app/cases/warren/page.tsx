"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "../../components/TransitionLink";
import MenuOverlay from "../../components/MenuOverlay";

const BRAND = "#E02B57";
const imgIconNormal = "/figma-assets/465ed456-cc28-4c23-bdf9-ead698df39a0.svg";
const imgIconHover  = "/figma-assets/8976d692-1314-4de2-8c0b-5d1afee5a487.svg";

/* ── Back button ─────────────────────────────────────────────────── */
function BackButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <TransitionLink
      href="/cases"
      className="warren-back-btn flex items-center cursor-pointer transition-all duration-300"
      style={{
        gap: hovered ? "12px" : "16px",
        background: "transparent",
        borderRadius: "12px",
        padding: "6px 20px 6px 6px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="#242a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }}>
        Voltar
      </span>
    </TransitionLink>
  );
}

/* ── Menu button ─────────────────────────────────────────────────── */
function MenuButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="warren-menu-btn flex items-center cursor-pointer transition-all duration-300"
      style={{
        gap: hovered ? "12px" : "16px",
        background: hovered ? "rgba(36,42,47,0.08)" : "transparent",
        borderRadius: "12px",
        padding: "6px 6px 6px 20px",
      }}
    >
      <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }}>
        Menu
      </span>
      <div
        className="warren-menu-icon flex items-center justify-center rounded-xl size-10"
        style={{ background: hovered ? "transparent" : "rgba(36,42,47,0.08)", gap: 3 }}
      >
        <div style={{ background: "#242a2f", borderRadius: 12, width: 4, height: 4 }} />
        <div style={{ background: "#242a2f", height: 4, borderRadius: 12, width: 10 }} />
      </div>
    </button>
  );
}

/* ── Award — animated laurel leaves on hover ─────────────────────── */
const leafTransition = {
  duration: 1.8,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  times: [0, 0.3, 0.55, 0.75, 1],
};

function Award() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://www.brasildesignaward.com.br/"
      target="_blank"
      rel="noopener noreferrer"
      className="warren-award flex-shrink-0"
      style={{ position: "relative", display: "block", width: 234, height: 79 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left leaf */}
      <motion.div
        className="warren-award-leaf-left"
        style={{ position: "absolute", top: 0, right: "77.35%", bottom: 0, left: 0, transformOrigin: "right center" }}
        animate={hovered ? { rotate: [0, -14, 3, -8, 0] } : { rotate: 0 }}
        transition={hovered ? leafTransition : { duration: 0.6, ease: "easeOut" }}
      >
        <img src="/figma-assets/warren-award-left.svg" alt="" style={{ width: "100%", height: "100%" }} />
      </motion.div>
      {/* Right leaf */}
      <motion.div
        className="warren-award-leaf-right"
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: "77.35%", display: "flex", alignItems: "center", justifyContent: "center", transformOrigin: "left center" }}
        animate={hovered ? { rotate: [0, 14, -3, 8, 0] } : { rotate: 0 }}
        transition={hovered ? leafTransition : { duration: 0.6, ease: "easeOut" }}
      >
        <div style={{ transform: "rotate(180deg) scaleY(-1)", width: 53, height: 79 }}>
          <img src="/figma-assets/warren-award-right.svg" alt="" style={{ width: "100%", height: "100%" }} />
        </div>
      </motion.div>
      {/* "Prêmios" */}
      <p style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 6, fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 14, color: "rgba(36,42,47,0.88)", letterSpacing: "1px", whiteSpace: "nowrap" }}>
        Prêmios
      </p>
      {/* Award name */}
      <p style={{ position: "absolute", left: 63, top: 29, fontFamily: "'Agrandir Wide'", fontWeight: 300, fontSize: 14, color: "#242a2f", letterSpacing: "1px", whiteSpace: "nowrap" }}>
        BDA 14º Prata
      </p>
      {/* Year */}
      <p style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 50, fontFamily: "'Agrandir Wide'", fontWeight: 300, fontSize: 16, color: "#242a2f", letterSpacing: "1px", width: 131, textAlign: "center" }}>
        2024
      </p>
    </a>
  );
}

/* ── Case button ─────────────────────────────────────────────────── */
function CaseButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="mailto:oi@paulocesar.design?subject=Acesso ao Case Warren"
      className="warren-cta relative block rounded-[24px]"
      style={{
        width: 299,
        height: 60,
        border: hovered ? "1px solid transparent" : "1px solid rgba(255,255,255,0.24)",
        transition: "border-color 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="warren-cta-inner absolute inset-[1px] rounded-[23px] overflow-hidden bg-white">
        <span
          className="warren-cta-label absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 16, color: "#242a2f", zIndex: 2 }}
        >
          Case completo
        </span>
        <div
          className="warren-cta-icon-wrap"
          style={{
            position: "absolute", overflow: "hidden",
            right: hovered ? 0 : "10px",
            top: hovered ? 0 : "50%",
            transform: hovered ? "none" : "translateY(-50%)",
            width: hovered ? "100%" : "72px",
            height: hovered ? "100%" : "44px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <img src={imgIconNormal} alt="" style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 72, height: 44, objectFit: "fill", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease-in-out" }} />
          <img src={imgIconHover} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease-in-out" }} />
        </div>
      </div>
    </a>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function WarrenCasePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("caseVideoTransition")) {
      sessionStorage.removeItem("caseVideoTransition");
      return true;
    }
    return false;
  });

  return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── Intro overlay ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="warren-intro"
            style={{ position: "fixed", inset: 0, zIndex: 9999, background: BRAND, pointerEvents: "none" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      <div className="warren-page min-h-screen bg-white overflow-x-hidden">

        {/* ── Nav ──────────────────────────────────────────────────── */}
        <nav className="warren-nav flex items-center justify-between pt-[54px] px-6 sm:px-12 lg:px-[200px] pb-2">
          <BackButton />
          <div className="warren-nav-right flex items-center gap-8">
            <div className="warren-nav-cases px-2 py-2 rounded-[8px] bg-[rgba(36,42,47,0.08)]">
              <span style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }}>Cases</span>
            </div>
            <TransitionLink href="/sobre" className="warren-nav-sobre px-2 py-2 group">
              <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }} className="transition-opacity group-hover:opacity-60">
                Sobre
              </span>
            </TransitionLink>
            <MenuButton onClick={() => setMenuOpen(true)} />
          </div>
        </nav>

        {/* ── Hero — 3 iPhones ──────────────────────────────────────── */}
        <div className="warren-hero-wrap mt-8 px-6 sm:px-12 lg:px-[200px]">
          <div
            className="warren-hero"
            style={{
              height: "clamp(220px, 41.2vw, 624px)",
              borderRadius: "clamp(24px,2.6vw,40px)",
              background: "#f0f0f2",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src="/figma-assets/warren-hero-screens.png"
              alt="Warren app screens — Sucesso, Informativo, Atenção"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* ── Info row ──────────────────────────────────────────────── */}
        <div className="warren-info-row mt-8 px-6 sm:px-12 lg:px-[200px] flex flex-wrap items-center justify-between gap-6">
          <div className="warren-info-title flex items-center gap-4">
            {/* Warren W icon */}
            <div
              className="warren-icon flex-shrink-0"
              style={{
                width: 64, height: 64, borderRadius: 16,
                background: BRAND,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <img
                src="/figma-assets/warren-icon-animation.svg"
                alt="Warren"
                style={{ width: 40, height: 40, objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </div>
            <div className="warren-info-text">
              <p style={{ fontFamily: "'Agrandir Wide'", fontWeight: 300, fontSize: "clamp(16px,1.6vw,24px)", color: "#242a2f", letterSpacing: "1px", lineHeight: 1.3 }}>
                Eficiência e Agilidade
              </p>
              <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "clamp(18px,1.9vw,28px)", color: "#242a2f", letterSpacing: "1px" }}>
                nas movimentações financeiras da Warren
              </p>
            </div>
          </div>
          <Award />
        </div>

        {/* ── Content section ──────────────────────────────────────── */}
        <div className="warren-content mt-16 px-6 sm:px-12 lg:px-[200px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 pb-16 relative">

          {/* Left: phone + D-shape background */}
          <div
            className="warren-visuals flex-shrink-0 relative self-center lg:self-auto"
            style={{
              width: "clamp(216px, 30.9vw, 469px)",
              height: "clamp(280px, 39vw, 590px)",
            }}
          >
            {/* Crimson D-shape — behind the phone */}
            <img
              src="/figma-assets/warren-logo-bg.svg"
              alt=""
              className="warren-dshape"
              style={{
                position: "absolute",
                width: "clamp(180px, 24vw, 365px)",
                height: "clamp(180px, 24vw, 365px)",
                left: "5%",
                top: "8%",
                zIndex: 0,
              }}
            />
            {/* Phone mockup — in front */}
            <div
              className="warren-phone-wrap"
              style={{
                position: "absolute",
                width: "clamp(120px, 13.5vw, 205px)",
                aspectRatio: "205 / 420",
                left: "22%",
                top: 0,
                zIndex: 1,
                overflow: "hidden",
              }}
            >
              <img
                src="/figma-assets/warren-mockup-frame.png"
                alt="Warren app mockup"
                className="warren-phone-img"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Right: text content */}
          <div className="warren-text-col flex-1 min-w-0 lg:pl-12 flex flex-col" style={{ maxWidth: 688 }}>

            <div className="flex flex-col gap-4">
              <p className="warren-label" style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 20, color: BRAND }}>
                Eficiência e Agilidade
              </p>
              <h2 className="warren-heading" style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: "clamp(28px,2.6vw,40px)", color: "#242a2f", lineHeight: "1.25", letterSpacing: "0.2px" }}>
                Otimizando as Movimentações Financeiras
              </h2>
            </div>

            <p className="warren-body mt-[26px]" style={{ fontFamily: "'Agrandir Narrow'", fontSize: "clamp(17px,1.4vw,21px)", color: "#616569", lineHeight: "33px" }}>
              Atuando no time de{" "}
              <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>banking da Warren</strong>
              , fui responsável por mapear jornadas, colaborar em pesquisas e realizar testes A/B para otimizar a experiência do usuário. Sempre prototipando e validando as interfaces, visando garantir soluções intuitivas e alinhadas aos objetivos de negócios.
            </p>

            {/* Green metric box */}
            <div
              className="warren-metric flex items-center gap-4 rounded-[16px] mt-8"
              style={{ background: "rgba(0,128,0,0.04)", padding: "8px 24px" }}
            >
              <img src="/figma-assets/warren-auto-graph.svg" alt="" style={{ width: 32, height: 32, flexShrink: 0 }} />
              <p style={{ fontFamily: "'Agrandir Narrow'", fontSize: "clamp(16px,1.3vw,20px)", color: "#616569", lineHeight: "32px" }}>
                Contribui para um aumento de{" "}
                <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>20% na retenção de usuários</strong>
                {" "}e uma{" "}
                <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>redução de 40% no tempo</strong>
                {" "}de execução de tarefas críticas.
              </p>
            </div>

            {/* Entregáveis + Time */}
            <div className="warren-meta flex flex-wrap gap-12 mt-10">
              <div className="warren-deliverables" style={{ minWidth: 220 }}>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 24, color: "#242a2f", marginBottom: 8 }}>
                  Entregáveis
                </p>
                <p style={{ fontFamily: "'Agrandir'", fontSize: 18, color: "#616569", lineHeight: "32px" }}>
                  Product Design • UX Writing •{" "}Research • Design System
                </p>
              </div>

              <div className="warren-team" style={{ minWidth: 200 }}>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 24, color: "#242a2f", marginBottom: 8 }}>
                  Time
                </p>
                <p style={{ fontFamily: "'Agrandir'", fontSize: 18, color: "#616569", lineHeight: "32px" }}>
                  Time:{" "}
                  <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>2 UXD, 1 PM, 5 devs</strong>
                </p>
                <div className="warren-team-avatars flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    <img src="/figma-assets/memoji-angela.png" alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "2px solid white" }} />
                    <img src="/figma-assets/memoji-kim.png" alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "2px solid white", marginLeft: -8 }} />
                  </div>
                  <p style={{ fontFamily: "'Agrandir'", fontSize: 16, color: "#616569", lineHeight: "24px" }}>
                    Atuando com 1 designer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right chevron — desktop only */}
          <div className="warren-chevron hidden lg:flex items-center absolute" style={{ right: 0, top: "50%", transform: "translateY(-50%)" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M13 8l8 8-8 8" stroke="#242a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* ── Protected section ────────────────────────────────────── */}
        <div className="warren-protected-wrap px-6 sm:px-12 lg:px-[200px] mb-16">
          <div
            className="warren-protected w-full flex flex-col items-center justify-center text-center rounded-[16px] gap-16"
            style={{ background: "#242a2f", padding: "clamp(60px,8vw,120px) clamp(24px,6vw,120px)", minHeight: 600 }}
          >
            <div className="warren-protected-inner flex flex-col items-center gap-6" style={{ maxWidth: 520 }}>
              {/* lock_person icon */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                <rect x="4.5" y="10" width="13" height="10" rx="2" fill="white" fillOpacity="0.9"/>
                <circle cx="11" cy="15.5" r="1.5" fill="rgba(36,42,47,0.45)"/>
                <circle cx="18.5" cy="18.5" r="5.5" fill="#242a2f"/>
                <circle cx="18.5" cy="17" r="1.6" fill="white"/>
                <path d="M15.2 22.5a3.3 3.3 0 0 1 6.6 0" fill="white"/>
              </svg>

              <div className="warren-protected-text flex flex-col gap-4">
                <h2 style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "clamp(32px,3.2vw,48px)", color: "white", lineHeight: 1.05, letterSpacing: "0.24px" }}>
                  Este conteúdo é protegido
                </h2>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 20, color: "rgba(255,255,255,0.72)" }}>
                  Clique abaixo para visualizar o case completo
                </p>
              </div>
            </div>

            <CaseButton />
          </div>
        </div>

      </div>
    </>
  );
}
