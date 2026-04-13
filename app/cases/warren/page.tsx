"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "../../components/TransitionLink";
import MenuOverlay from "../../components/MenuOverlay";

const BRAND = "#E02B57";
const imgIconNormal = "/figma-assets/465ed456-cc28-4c23-bdf9-ead698df39a0.svg";
const imgIconHover  = "/figma-assets/8976d692-1314-4de2-8c0b-5d1afee5a487.svg";

/* ── Animation variants ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};

const fadeUpSlow = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};

const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

const slideLeft = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};

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

/* ── Award badge (BDA Prata 2024) — bookmark style ───────────────── */
function WarrenBadge() {
  return (
    <a
      href="https://www.brasildesignaward.com.br/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ position: "relative", display: "block", width: 118, height: 174, flexShrink: 0 }}
    >
      {/* Left wing */}
      <img
        src="/figma-assets/warren-award-left.svg"
        alt=""
        style={{ position: "absolute", top: 0, left: 0, width: 11, height: 31 }}
      />
      {/* Right wing (mirrored) */}
      <div style={{ position: "absolute", top: 0, left: 107, width: 11, height: 31, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "rotate(180deg) scaleY(-1)", width: 11, height: 31 }}>
          <img src="/figma-assets/warren-award-right.svg" alt="" style={{ display: "block", width: "100%", height: "100%" }} />
        </div>
      </div>
      {/* Badge body — full image */}
      <div style={{ position: "absolute", top: 0, left: 11, width: 96, height: 174, overflow: "hidden" }}>
        <img
          src="/figma-assets/warren-award-img.png"
          alt="BDA 14º Prata 2024"
          style={{
            position: "absolute",
            height: "150.03%",
            left: "-59.55%",
            top: "-25.12%",
            width: "218.9%",
            maxWidth: "none",
          }}
        />
      </div>
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
          <img src={imgIconHover}  alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease-in-out" }} />
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

        {/* ── Hero + badge (desktop) ───────────────────────────────── */}
        <div className="relative mt-8 px-[4vw]">
          <div
            className="warren-hero w-full"
            style={{
              height: "66vh",
              borderRadius: "clamp(24px,2.1vw,32px)",
              background: "rgba(245,245,245,0.88)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <video
              src="/figma-assets/warren-animation.mp4"
              autoPlay muted loop playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Badge — desktop: sobrepõe canto inferior direito da hero em 31px */}
          <div
            className="hidden lg:block absolute"
            style={{ right: "4vw", bottom: 0, transform: "translateY(calc(100% - 31px))", zIndex: 10 }}
          >
            <WarrenBadge />
          </div>
        </div>

        {/* ── Info row ──────────────────────────────────────────────── */}
        <motion.div
          className="warren-info-row mt-8 px-6 sm:px-12 lg:px-[200px] flex flex-wrap items-center justify-between gap-6"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="warren-info-title flex items-center gap-4" variants={fadeUp}>
            {/* Warren logo icon */}
            <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
              <img
                src="/figma-assets/warren-banks-icon.svg"
                alt="Warren"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
              />
              <div style={{ position: "absolute", top: "25%", left: "25%", right: "25%", bottom: "26.56%" }}>
                <img
                  src="/figma-assets/warren-bubble.svg"
                  alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
                />
              </div>
            </div>
            <div className="warren-info-text">
              <p style={{ fontFamily: "'Agrandir Wide'", fontWeight: 300, fontSize: "clamp(16px,1.6vw,24px)", color: "#242a2f", letterSpacing: "1px", lineHeight: 1.3 }}>
                Eficiência e Agilidade nas movimentações
              </p>
              <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "clamp(18px,1.9vw,28px)", color: "#242a2f", letterSpacing: "1px" }}>
                financeiras da Warren
              </p>
            </div>
          </motion.div>
          {/* Badge — mobile only */}
          <motion.div className="lg:hidden" variants={fadeUp}>
            <WarrenBadge />
          </motion.div>
        </motion.div>

        {/* ── Content section ──────────────────────────────────────── */}
        <div className="warren-content mt-16 px-6 sm:px-12 lg:px-[200px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 pb-16 relative">

          {/* Left: phone + D-shape background */}
          <motion.div
            className="warren-visuals flex-shrink-0 relative self-center lg:self-auto"
            style={{
              width: "clamp(200px, 22vw, 336px)",
              height: "clamp(340px, 37.2vw, 568px)",
            }}
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Crimson D-shape — behind the phone (Figma: logo-2) */}
            <img
              src="/figma-assets/warren-logo-bg.svg"
              alt=""
              className="warren-dshape"
              style={{
                position: "absolute",
                width: "107%",
                height: "65%",
                left: "-12%",
                top: "8%",
                zIndex: 0,
              }}
            />
            {/* Phone frame */}
            <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
              <img
                src="/figma-assets/warren-mockup-frame.png"
                alt="Warren app mockup"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
              {/* App screen inside frame */}
              <div
                style={{
                  position: "absolute",
                  left: "14%",
                  top: "2.6%",
                  width: "67.8%",
                  height: "86.6%",
                  borderRadius: "clamp(10px,1.4vw,24px)",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/figma-assets/warren-app-screenshot.png"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right: text content */}
          <motion.div
            className="warren-text-col flex-1 min-w-0 lg:pl-12 flex flex-col"
            style={{ maxWidth: 689 }}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div className="flex flex-col gap-4" variants={fadeUp}>
              <p className="warren-label" style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 20, color: BRAND }}>
                Eficiência e Agilidade
              </p>
              <h2 className="warren-heading" style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: "clamp(28px,2.5vw,38px)", color: "#242a2f", lineHeight: "50px", letterSpacing: "0.19px" }}>
                Otimizando as Movimentações Financeiras
              </h2>
            </motion.div>

            <motion.p
              className="warren-body mt-[26px]"
              style={{ fontFamily: "'Agrandir Narrow'", fontSize: "clamp(17px,1.4vw,21px)", color: "#616569", lineHeight: "33px" }}
              variants={fadeUpSlow}
            >
              Atuando no time de{" "}
              <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>banking da Warren</strong>
              , fui responsável por mapear jornadas, colaborar em pesquisas e realizar testes A/B para otimizar a experiência do usuário. Sempre prototipando e validando as interfaces, visando garantir soluções intuitivas e alinhadas aos objetivos de negócios.
            </motion.p>

            {/* Green metric box */}
            <motion.div
              className="warren-metric flex items-center gap-4 rounded-[16px] mt-8"
              style={{ background: "rgba(0,128,0,0.04)", padding: "8px 32px" }}
              variants={fadeUp}
            >
              <img src="/figma-assets/warren-auto-graph.svg" alt="" style={{ width: 32, height: 32, flexShrink: 0 }} />
              <p style={{ fontFamily: "'Agrandir Narrow'", fontSize: "clamp(16px,1.2vw,18px)", color: "#616569", lineHeight: "32px" }}>
                Contribuí para um aumento de{" "}
                <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>20% na retenção de usuários</strong>
                {" "}e uma{" "}
                <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>redução de 40% no tempo</strong>
                {" "}de execução de tarefas críticas
              </p>
            </motion.div>
          </motion.div>

          {/* Right chevron — desktop only */}
          <div className="warren-chevron hidden lg:flex items-center absolute" style={{ right: 0, top: "50%", transform: "translateY(-50%)" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M13 8l8 8-8 8" stroke="#242a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* ── Protected section ────────────────────────────────────── */}
        <motion.div
          className="warren-protected-wrap px-6 sm:px-12 lg:px-[200px] mb-16"
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div
            className="warren-protected w-full flex flex-col items-center justify-center text-center rounded-[16px] gap-16"
            style={{ background: "#242a2f", padding: "clamp(60px,8vw,120px) clamp(24px,6vw,120px)", minHeight: 600 }}
          >
            <motion.div className="warren-protected-inner flex flex-col items-center gap-6" style={{ maxWidth: 520 }} variants={stagger(0.12)}>
              <motion.div variants={fadeUp}>
                <img src="/figma-assets/warren-lock-person.svg" alt="" style={{ width: 48, height: 48 }} />
              </motion.div>
              <motion.div className="warren-protected-text flex flex-col gap-4" variants={stagger(0.1)}>
                <motion.h2 variants={fadeUp} style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "clamp(32px,3.2vw,48px)", color: "white", lineHeight: "50px", letterSpacing: "0.24px" }}>
                  Este conteúdo é protegido
                </motion.h2>
                <motion.p variants={fadeUpSlow} style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 20, color: "rgba(255,255,255,0.72)" }}>
                  Clique abaixo para visualizar o case completo
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <CaseButton />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </>
  );
}
