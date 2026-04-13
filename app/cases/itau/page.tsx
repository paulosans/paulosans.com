"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "../../components/TransitionLink";
import MenuOverlay from "../../components/MenuOverlay";

const BRAND = "#F06000";
const imgIconNormal = "/figma-assets/465ed456-cc28-4c23-bdf9-ead698df39a0.svg";
const imgIconHover  = "/figma-assets/8976d692-1314-4de2-8c0b-5d1afee5a487.svg";

/* ── Back button ─────────────────────────────────────────────────── */
function BackButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <TransitionLink
      href="/cases"
      className="itau-back-btn flex items-center cursor-pointer transition-all duration-300"
      style={{
        gap: hovered ? "12px" : "16px",
        background: hovered ? "rgba(36,42,47,0.08)" : "transparent",
        borderRadius: "12px",
        padding: "6px 20px 6px 6px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
          background: "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.3s",
        }}
      >
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
      className="itau-menu-btn flex items-center cursor-pointer transition-all duration-300"
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
        className="itau-menu-icon flex items-center justify-center rounded-xl size-10"
        style={{ background: hovered ? "transparent" : "rgba(36,42,47,0.08)", gap: 3 }}
      >
        <div className="itau-menu-dot-sm" style={{ background: "#242a2f", borderRadius: 12, width: 4, height: 4 }} />
        <div className="itau-menu-dot-lg" style={{ background: "#242a2f", height: 4, borderRadius: 12, width: 10 }} />
      </div>
    </button>
  );
}

/* ── Hero: video playing inside squircle frame ───────────────────── */
function HeroCover() {
  return (
    <div
      className="itau-hero-cover w-full overflow-hidden"
      style={{
        height: "60vh",
        borderRadius: "clamp(32px,5.3vw,80px)",
      }}
    >
      <video
        src="/bg-cases.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
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
      href="https://www.instagram.com/p/C0uTx2SPfl1/?img_index=4"
      target="_blank"
      rel="noopener noreferrer"
      className="itau-award flex-shrink-0"
      style={{ position: "relative", display: "block", width: 234, height: 79 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left leaf — pivots from its right edge (touches center text) */}
      <motion.div
        className="itau-award-leaf-left"
        style={{ position: "absolute", top: 0, right: "77.35%", bottom: 0, left: 0, transformOrigin: "right center" }}
        animate={hovered ? { rotate: [0, -14, 3, -8, 0] } : { rotate: 0 }}
        transition={hovered ? leafTransition : { duration: 0.6, ease: "easeOut" }}
      >
        <img src="/figma-assets/itau-award-left.svg" alt="" style={{ width: "100%", height: "100%" }} />
      </motion.div>

      {/* Right leaf — pivots from its left edge (touches center text) */}
      <motion.div
        className="itau-award-leaf-right"
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: "77.35%", display: "flex", alignItems: "center", justifyContent: "center", transformOrigin: "left center" }}
        animate={hovered ? { rotate: [0, 14, -3, 8, 0] } : { rotate: 0 }}
        transition={hovered ? leafTransition : { duration: 0.6, ease: "easeOut" }}
      >
        <div className="itau-award-leaf-right-inner" style={{ transform: "rotate(180deg) scaleY(-1)", width: 53, height: 79 }}>
          <img src="/figma-assets/itau-award-right.svg" alt="" style={{ width: "100%", height: "100%" }} />
        </div>
      </motion.div>

      {/* "Prêmios" — center x=117.5, top=6 */}
      <p style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 6, fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 14, color: "rgba(36,42,47,0.88)", letterSpacing: "1px", whiteSpace: "nowrap" }}>
        Prêmios
      </p>
      {/* "BDA 14º e 13º" — left=63, top=29 */}
      <p style={{ position: "absolute", left: 63, top: 29, fontFamily: "'Agrandir Wide'", fontWeight: 300, fontSize: 14, color: "#242a2f", letterSpacing: "1px", whiteSpace: "nowrap" }}>
        BDA 14º e 13º
      </p>
      {/* "23º WMS" — center x=117.5, top=50, w=131 */}
      <p style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 50, fontFamily: "'Agrandir Wide'", fontWeight: 300, fontSize: 16, color: "#242a2f", letterSpacing: "1px", width: 131, textAlign: "center" }}>
        23º WMS
      </p>
    </a>
  );
}

/* ── Case button — same pattern as home "Sobre mim" button ──────── */
function CaseButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="mailto:oi@paulocesar.design?subject=Acesso ao Case Itaú"
      className="itau-cta relative block rounded-[24px]"
      style={{
        width: 299,
        height: 60,
        border: hovered ? "1px solid transparent" : "1px solid rgba(255,255,255,0.24)",
        transition: "border-color 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="itau-cta-inner absolute inset-[1px] rounded-[23px] overflow-hidden bg-white">
        <span
          className="itau-cta-label absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 16, color: "#242a2f", zIndex: 2 }}
        >
          Case completo
        </span>
        <div
          className="itau-cta-icon-wrap"
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
          <img
            src={imgIconNormal}
            alt=""
            style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 72, height: 44, objectFit: "fill", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease-in-out" }}
          />
          <img
            src={imgIconHover}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
          />
        </div>
      </div>
    </a>
  );
}

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

/* ── Page ─────────────────────────────────────────────────────────── */
export default function ItauCasePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="itau-page min-h-screen bg-white overflow-x-hidden">

        {/* ── Nav ──────────────────────────────────────────────────── */}
        <nav className="itau-nav flex items-center justify-between pt-[54px] px-6 sm:px-12 lg:px-[200px] pb-2">
          <BackButton />
          <div className="itau-nav-right flex items-center gap-8">
            <div className="itau-nav-cases px-2 py-2 rounded-[8px] bg-[rgba(36,42,47,0.08)]">
              <span style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }}>Cases</span>
            </div>
            <TransitionLink href="/sobre" className="itau-nav-sobre px-2 py-2 group">
              <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }} className="transition-opacity group-hover:opacity-60">
                Sobre
              </span>
            </TransitionLink>
            <MenuButton onClick={() => setMenuOpen(true)} />
          </div>
        </nav>

        {/* ── Hero cover ───────────────────────────────────────────── */}
        <div className="itau-hero-wrap mt-8 px-[4vw]">
          <HeroCover />
        </div>

        {/* ── Project info row ─────────────────────────────────────── */}
        <motion.div
          className="itau-info-row mt-8 px-6 sm:px-12 lg:px-[200px] flex flex-wrap items-center justify-between gap-6"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left: icon + title */}
          <motion.div className="itau-info-title flex items-center gap-4" variants={fadeUp}>
            <img
              src="/figma-assets/itau-logo-icon.png"
              alt="itaú"
              style={{ width: 64, height: 64, borderRadius: 16, objectFit: "contain", flexShrink: 0 }}
            />
            <div className="itau-info-text">
              <p style={{ fontFamily: "'Agrandir Wide'", fontWeight: 300, fontSize: "clamp(16px,1.6vw,24px)", color: "#242a2f", letterSpacing: "1px", lineHeight: 1.3 }}>
                Escalabilidade e Consistência
              </p>
              <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "clamp(18px,1.9vw,28px)", color: "#242a2f", letterSpacing: "1px" }}>
                nos produtos do Itaú
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Award />
          </motion.div>
        </motion.div>


        {/* ── Content section ──────────────────────────────────────── */}
        <div className="itau-content mt-16 px-6 sm:px-12 lg:px-[200px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 pb-16 relative">

          {/* Left: phone + orange shape */}
          <motion.div
            className="itau-visuals flex-shrink-0 relative self-center lg:self-auto"
            style={{
              width: "clamp(216px, 30.3vw, 461px)",
              height: "clamp(306px, 42.8vw, 648px)",
            }}
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Orange squircle — behind, slightly down-left */}
            <img
              src="/figma-assets/itau-orange-shape.svg"
              alt=""
              className="itau-orange-shape"
              style={{
                position: "absolute",
                width: "clamp(185px, 22.5vw, 342px)",
                height: "clamp(185px, 22.5vw, 342px)",
                left: "3%",
                top: "16%",
                zIndex: 0,
              }}
            />
            {/* Phone mockup */}
            <div
              className="itau-phone-wrap"
              style={{
                position: "absolute",
                width: "clamp(130px, 14.5vw, 219px)",
                aspectRatio: "219 / 575",
                left: "19%",
                top: 0,
                zIndex: 1,
                overflow: "hidden",
              }}
            >
              <img
                src="/figma-assets/itau-iphone-mockup.png"
                alt="itaú app mockup"
                className="itau-phone-img"
                style={{
                  position: "absolute",
                  width: "409.84%",
                  height: "116.91%",
                  left: "-157.99%",
                  top: "-8.73%",
                  maxWidth: "none",
                  pointerEvents: "none",
                }}
              />
            </div>
          </motion.div>

          {/* Right: text content */}
          <motion.div
            className="itau-text-col flex-1 min-w-0 lg:pl-12 flex flex-col"
            style={{ maxWidth: 688 }}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >

            {/* Label + heading group */}
            <motion.div className="flex flex-col gap-4" variants={fadeUp}>
              <p className="itau-label" style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 20, color: BRAND }}>
                Escalabilidade e Consistência
              </p>
              <h2 className="itau-heading" style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: "clamp(28px,2.6vw,40px)", color: "#242a2f", lineHeight: "1.25", letterSpacing: "0.2px" }}>
                Simplificando sistemas de design para eficiência
              </h2>
            </motion.div>

            <motion.p
              className="itau-body mt-[26px]"
              style={{ fontFamily: "'Agrandir Narrow'", fontSize: "clamp(17px,1.4vw,21px)", color: "#616569", lineHeight: "33px" }}
              variants={fadeUpSlow}
            >
              Atuando na criação do{" "}
              <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>iDS, design system do Itaú</strong>
              {", "}otimizei bibliotecas no Figma, contribuindo para a padronização de processos que promovem consistência, escalabilidade e maior eficiência nas entregas de design e desenvolvimento.
            </motion.p>

            {/* Green metric box */}
            <motion.div
              className="itau-metric flex items-center gap-4 rounded-[16px] mt-8"
              style={{ background: "rgba(0,128,0,0.04)", padding: "8px 24px" }}
              variants={fadeUp}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
                <path d="M4 22L10 16L14 19L20 12L24 15" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                <path d="M20 12L24 12L24 16" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                <circle cx="10" cy="16" r="2" fill="#2e7d32" opacity="0.5" />
                <circle cx="14" cy="19" r="2" fill="#2e7d32" opacity="0.5" />
                <circle cx="20" cy="12" r="2" fill="#2e7d32" opacity="0.5" />
              </svg>
              <p style={{ fontFamily: "'Agrandir Narrow'", fontSize: "clamp(16px,1.3vw,20px)", color: "#616569", lineHeight: "32px" }}>
                Essa otimização resultou em uma redução de{" "}
                <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>
                  60% no tempo de implementação
                </strong>{" "}
                de componentes.
              </p>
            </motion.div>

            {/* Entregáveis + Time */}
            <motion.div className="itau-meta flex flex-wrap gap-12 mt-10" variants={stagger(0.14)}>
              <motion.div className="itau-deliverables" style={{ minWidth: 220 }} variants={fadeUp}>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 24, color: "#242a2f", marginBottom: 8 }}>
                  Entregáveis
                </p>
                <p style={{ fontFamily: "'Agrandir'", fontSize: 18, color: "#616569", lineHeight: "32px" }}>
                  Design System • Design Ops •{" "}Service Design • Documentação
                </p>
              </motion.div>

              <motion.div className="itau-team" style={{ minWidth: 200 }} variants={fadeUp}>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 24, color: "#242a2f", marginBottom: 8 }}>
                  Time
                </p>
                <p style={{ fontFamily: "'Agrandir'", fontSize: 18, color: "#616569", lineHeight: "32px" }}>
                  Time:{" "}
                  <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>3 UXD, 1 PM, 8 devs, 2 QA</strong>
                </p>
                <div className="itau-team-avatars flex items-center gap-2 mt-2">
                  <div className="itau-avatars-stack flex items-center">
                    <img src="/figma-assets/memoji-angela.png" alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "2px solid white" }} />
                    <img src="/figma-assets/memoji-kim.png" alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "2px solid white", marginLeft: -8 }} />
                    <div className="itau-avatar-extra" style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(36,42,47,0.14)", border: "2px solid white", marginLeft: -8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Agrandir'", fontSize: 10, color: "#242a2f", fontWeight: 700 }}>+</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Agrandir'", fontSize: 16, color: "#616569", lineHeight: "24px" }}>
                    Liderando o produto em parceria com 2 designers
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right chevron — desktop only */}
          <div className="itau-chevron hidden lg:flex items-center absolute" style={{ right: 0, top: "50%", transform: "translateY(-50%)" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M13 8l8 8-8 8" stroke="#242a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* ── Protected section ────────────────────────────────────── */}
        <motion.div
          className="itau-protected-wrap px-6 sm:px-12 lg:px-[200px] mb-16"
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div
            className="itau-protected w-full flex flex-col items-center justify-center text-center rounded-[16px] gap-16"
            style={{ background: "#242a2f", padding: "clamp(60px,8vw,120px) clamp(24px,6vw,120px)", minHeight: 600 }}
          >
            <motion.div className="itau-protected-inner flex flex-col items-center gap-6" style={{ maxWidth: 520 }} variants={stagger(0.12)}>
              <motion.svg variants={fadeUp} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                <rect x="4.5" y="10" width="13" height="10" rx="2" fill="white" fillOpacity="0.9"/>
                <circle cx="11" cy="15.5" r="1.5" fill="rgba(36,42,47,0.45)"/>
                <circle cx="18.5" cy="18.5" r="5.5" fill="#242a2f"/>
                <circle cx="18.5" cy="17" r="1.6" fill="white"/>
                <path d="M15.2 22.5a3.3 3.3 0 0 1 6.6 0" fill="white"/>
              </motion.svg>

              <motion.div className="itau-protected-text flex flex-col gap-4" variants={stagger(0.1)}>
                <motion.h2 variants={fadeUp} style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "clamp(32px,3.2vw,48px)", color: "white", lineHeight: 1.05, letterSpacing: "0.24px" }}>
                  Este conteúdo é protegido
                </motion.h2>
                <motion.p variants={fadeUpSlow} style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 20, color: "rgba(255,255,255,0.72)" }}>
                  Clique abaixo para visualizar o case completo
                </motion.p>
              </motion.div>
            </motion.div>

            {/* CTA button */}
            <motion.div variants={fadeUp}>
              <CaseButton />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </>
  );
}
