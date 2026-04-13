"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TransitionLink } from "../../components/TransitionLink";
import MenuOverlay from "../../components/MenuOverlay";

const BRAND = "#00cd8e";
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

/* ── Case button ─────────────────────────────────────────────────── */
function CaseButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="mailto:oi@paulocesar.design?subject=Acesso ao Case Descomplica"
      className="relative block rounded-[24px]"
      style={{
        width: 299,
        height: 60,
        border: hovered ? "1px solid transparent" : "1px solid rgba(255,255,255,0.24)",
        transition: "border-color 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-[1px] rounded-[23px] overflow-hidden bg-white">
        <span
          className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 16, color: "#242a2f", zIndex: 2 }}
        >
          Case completo
        </span>
        <div
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

/* ── Back button ─────────────────────────────────────────────────── */
function BackButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <TransitionLink
      href="/cases"
      className="flex items-center cursor-pointer transition-all duration-300"
      style={{
        gap: hovered ? "12px" : "16px",
        background: "transparent",
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
      className="flex items-center cursor-pointer transition-all duration-300"
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
        className="flex items-center justify-center rounded-xl size-10"
        style={{ background: hovered ? "transparent" : "rgba(36,42,47,0.08)", gap: 3 }}
      >
        <div style={{ background: "#242a2f", borderRadius: 12, width: 4, height: 4 }} />
        <div style={{ background: "#242a2f", height: 4, borderRadius: 12, width: 10 }} />
      </div>
    </button>
  );
}

/* ── D-symbol icon (Descomplica logo) ────────────────────────────── */
function DSymbol() {
  return (
    <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
      {/* badge shape */}
      <div style={{ position: "absolute", top: "5.78%", right: "3.72%", bottom: "0", left: "2.08%" }}>
        <img src="/figma-assets/descomplica-d-badge.svg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
      </div>
      {/* d letter */}
      <div style={{ position: "absolute", top: "0", right: "23.23%", bottom: "19.75%", left: "22.2%" }}>
        <img src="/figma-assets/descomplica-d-letter.svg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
      </div>
    </div>
  );
}

/* ── Award badge (Brasil Design Award) ───────────────────────────── */
function AwardBadge() {
  return (
    // total width = 11 (left wing) + 93 (badge) + 11 (right wing) = 115
    <a
      href="https://www.instagram.com/p/CIrAzxgpeED/?img_index=6"
      target="_blank"
      rel="noopener noreferrer"
      style={{ position: "relative", display: "block", width: 115, height: 187, flexShrink: 0 }}
    >
      {/* left triangle wing */}
      <img src="/figma-assets/descomplica-award-left.svg" alt="" style={{ position: "absolute", top: 0, left: 0, width: 11, height: 31 }} />
      {/* right triangle wing (mirrored) */}
      <img src="/figma-assets/descomplica-award-right.svg" alt="" style={{ position: "absolute", top: 0, right: 0, width: 11, height: 31, transform: "rotate(180deg) scaleY(-1)" }} />
      {/* orange body */}
      <div style={{ position: "absolute", top: 0, left: 11, width: 93, height: 158, background: "#f96330" }} />
      {/* award image */}
      <div style={{ position: "absolute", top: 5, left: 27, width: 61, height: 110, overflow: "hidden" }}>
        <img
          src="/figma-assets/descomplica-award-img.png"
          alt=""
          style={{ position: "absolute", height: "123.37%", left: "-25.87%", top: "-13.05%", width: "151.75%", maxWidth: "none" }}
        />
      </div>
      {/* Bronze label */}
      <p style={{ position: "absolute", top: 106, left: 29, fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 12, color: "white", lineHeight: "50px", letterSpacing: "0.06px" }}>
        Bronze
      </p>
      {/* Year */}
      <p style={{ position: "absolute", top: 119, left: 29, fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 8, color: "white", lineHeight: "50px", letterSpacing: "2px" }}>
        2020
      </p>
      {/* bottom ribbon */}
      <img
        src="/figma-assets/descomplica-award-ribbon.svg"
        alt=""
        style={{ position: "absolute", bottom: 0, left: 11, width: 93, height: 29 }}
      />
    </a>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function DescomplicaCasePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-h-screen bg-white overflow-x-hidden">

        {/* ── Nav ──────────────────────────────────────────────────── */}
        <nav className="flex items-center justify-between pt-[54px] px-6 sm:px-12 lg:px-[200px] pb-2">
          <BackButton />
          <div className="flex items-center gap-8">
            <div className="px-2 py-2 rounded-[8px] bg-[rgba(36,42,47,0.08)]">
              <span style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }}>Cases</span>
            </div>
            <TransitionLink href="/sobre" className="px-2 py-2 group">
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
            className="w-full"
            style={{
              height: "67vh",
              borderRadius: "clamp(24px,2.6vw,40px)",
              border: "1px solid rgba(36,42,47,0.16)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <video
              src="/figma-assets/descomplica-animation.mp4"
              autoPlay muted loop playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Badge — desktop: sobrepõe o canto inferior direito da hero em 31px */}
          <div
            className="hidden lg:block absolute"
            style={{ right: "4vw", bottom: 0, transform: "translateY(calc(100% - 31px))", zIndex: 10 }}
          >
            <AwardBadge />
          </div>
        </div>

        {/* ── Info row ─────────────────────────────────────────────── */}
        <motion.div
          className="mt-8 px-6 sm:px-12 lg:px-[200px] flex items-center justify-between gap-6 flex-wrap"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="flex items-center gap-4" variants={fadeUp}>
            <DSymbol />
            <div>
              <p style={{ fontFamily: "'Agrandir Wide'", fontWeight: 300, fontSize: "clamp(16px,1.6vw,24px)", color: "#242a2f", letterSpacing: "1px", lineHeight: 1.3 }}>
                Conexões e Oportunidades Profissionais
              </p>
              <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "clamp(18px,1.9vw,28px)", color: "#242a2f", letterSpacing: "1px" }}>
                na LMS do Descomplica
              </p>
            </div>
          </motion.div>
          {/* Badge — mobile only (no desktop, fica no hero) */}
          <motion.div className="lg:hidden" variants={fadeUp}>
            <AwardBadge />
          </motion.div>
        </motion.div>

        {/* ── Content section ──────────────────────────────────────── */}
        <div className="mt-16 px-6 sm:px-12 lg:px-[200px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 pb-16 relative">

          {/* Left: mockup + green blob */}
          <motion.div
            className="flex-shrink-0 relative self-center lg:self-auto"
            style={{
              width: "clamp(216px, 30.9vw, 469px)",
              height: "clamp(200px, 27.5vw, 417px)",
            }}
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* green blob background — centered behind mockup, rotated as in Figma */}
            <img
              src="/figma-assets/descomplica-logo-bg.svg"
              alt=""
              style={{
                position: "absolute",
                width: "clamp(180px, 23.7vw, 360px)",
                height: "clamp(180px, 23.7vw, 360px)",
                left: "-8%",
                top: "10%",
                zIndex: 0,
                transform: "rotate(180deg) scaleY(-1)",
              }}
            />
            {/* phone+tablet mockup */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }}>
              <img
                src="/figma-assets/descomplica-mockup.png"
                alt="Descomplica app mockup"
                style={{
                  position: "absolute",
                  height: "139.33%",
                  left: "-30.73%",
                  top: "-24.94%",
                  width: "165.08%",
                  maxWidth: "none",
                }}
              />
            </div>
          </motion.div>

          {/* Right: text content */}
          <motion.div
            className="flex-1 min-w-0 lg:pl-12 flex flex-col"
            style={{ maxWidth: 688 }}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.h2
              style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: "clamp(28px,2.6vw,40px)", color: "#242a2f", lineHeight: "1.25", letterSpacing: "0.2px" }}
              variants={fadeUp}
            >
              Colaboração no aprendizado e carreira
            </motion.h2>

            <motion.p
              className="mt-[26px]"
              style={{ fontFamily: "'Agrandir Narrow'", fontSize: "clamp(17px,1.4vw,21px)", color: "#616569", lineHeight: "33px" }}
              variants={fadeUpSlow}
            >
              Atuando como{" "}
              <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>designer de produto no time do Descomplica</strong>
              , focando em melhorar a experiência do usuário por meio de interfaces intuitivas. Contribuí para o aprimoramento da usabilidade e engajamento de um produto educacional de sucesso no Brasil.
            </motion.p>

            {/* Green metric box */}
            <motion.div
              className="flex items-center gap-4 rounded-[16px] mt-8"
              style={{ background: "rgba(0,128,0,0.04)", padding: "8px 32px" }}
              variants={fadeUp}
            >
              <img src="/figma-assets/descomplica-auto-graph.svg" alt="" style={{ width: 32, height: 32, flexShrink: 0 }} />
              <p style={{ fontFamily: "'Agrandir Narrow'", fontSize: "clamp(16px,1.3vw,20px)", color: "#616569", lineHeight: "32px" }}>
                Essa iniciativa resultou{" "}
                <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>em um aumento de 70% no WAU</strong>
                {" "}e{" "}
                <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>75 pontos no NPS</strong>
                {" "}da graduação.
              </p>
            </motion.div>

            {/* Entregáveis + Time */}
            <motion.div className="flex flex-wrap gap-16 mt-10" variants={stagger(0.14)}>
              <motion.div style={{ minWidth: 220 }} variants={fadeUp}>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 24, color: "#242a2f", marginBottom: 8 }}>
                  Entregáveis
                </p>
                <p style={{ fontFamily: "'Agrandir'", fontSize: 18, color: "#616569", lineHeight: "32px" }}>
                  Research • Design System<br />• Ui Design • Ux design
                </p>
              </motion.div>

              <motion.div style={{ minWidth: 200 }} variants={fadeUp}>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 24, color: "#242a2f", marginBottom: 8 }}>
                  Time
                </p>
                <p style={{ fontFamily: "'Agrandir'", fontSize: 18, color: "#616569", lineHeight: "32px" }}>
                  Time:{" "}
                  <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>3 UXD, 2 PM, 6 devs, 1 QA</strong>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {/* Frame 14 — avatar stack 80×29 */}
                  <div style={{ position: "relative", width: 80, height: 29, flexShrink: 0 }}>
                    {/* border ring slot 3 (rightmost) */}
                    <div style={{ position: "absolute", left: 54, top: 2, width: 24, height: 24 }}>
                      <div style={{ position: "absolute", inset: "-8.33%" }}>
                        <img src="/figma-assets/descomplica-ellipse57.svg" alt="" style={{ display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                    </div>
                    {/* male memoji 1 */}
                    <div style={{ position: "absolute", left: 52, top: 1, width: 28, height: 28 }}>
                      <img src="/figma-assets/descomplica-memoji-male1.png" alt="" style={{ position: "absolute", inset: 0, maxWidth: "none", objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
                    </div>
                    {/* border ring slot 2 */}
                    <div style={{ position: "absolute", left: 36, top: 2, width: 24, height: 24 }}>
                      <div style={{ position: "absolute", inset: "-8.33%" }}>
                        <img src="/figma-assets/descomplica-ellipse57.svg" alt="" style={{ display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                    </div>
                    {/* angela memoji */}
                    <div style={{ position: "absolute", left: 34, top: 0, width: 28, height: 28 }}>
                      <img src="/figma-assets/descomplica-memoji-angela.png" alt="" style={{ position: "absolute", inset: 0, maxWidth: "none", objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
                    </div>
                    {/* border ring slot 1 */}
                    <div style={{ position: "absolute", left: 18, top: 2, width: 24, height: 24 }}>
                      <div style={{ position: "absolute", inset: "-8.33%" }}>
                        <img src="/figma-assets/descomplica-ellipse57.svg" alt="" style={{ display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                    </div>
                    {/* male memoji 2 */}
                    <div style={{ position: "absolute", left: 16, top: 1, width: 28, height: 28 }}>
                      <img src="/figma-assets/descomplica-memoji-male2.png" alt="" style={{ position: "absolute", inset: 0, maxWidth: "none", objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
                    </div>
                    {/* Ellipse 53 — leftmost placeholder (no memoji) */}
                    <div style={{ position: "absolute", left: 0, top: 2, width: 24, height: 24 }}>
                      <div style={{ position: "absolute", inset: "-8.33%" }}>
                        <img src="/figma-assets/descomplica-ellipse53.png" alt="" style={{ display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Agrandir'", fontSize: 18, color: "#616569", lineHeight: "32px", whiteSpace: "nowrap" }}>
                    Atuando com 2 designers
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right chevron — desktop only */}
          <div className="hidden lg:flex items-center absolute" style={{ right: 0, top: "50%", transform: "translateY(-50%)" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M13 8l8 8-8 8" stroke="#242a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* ── Protected section ────────────────────────────────────── */}
        <motion.div
          className="px-6 sm:px-12 lg:px-[200px] mb-16"
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div
            className="w-full flex flex-col items-center justify-center text-center rounded-[16px] gap-16"
            style={{ background: "#242a2f", padding: "clamp(60px,8vw,120px) clamp(24px,6vw,120px)", minHeight: 600 }}
          >
            <motion.div className="flex flex-col items-center gap-6" style={{ maxWidth: 520 }} variants={stagger(0.12)}>
              <motion.svg variants={fadeUp} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                <rect x="4.5" y="10" width="13" height="10" rx="2" fill="white" fillOpacity="0.9"/>
                <circle cx="11" cy="15.5" r="1.5" fill="rgba(36,42,47,0.45)"/>
                <circle cx="18.5" cy="18.5" r="5.5" fill="#242a2f"/>
                <circle cx="18.5" cy="17" r="1.6" fill="white"/>
                <path d="M15.2 22.5a3.3 3.3 0 0 1 6.6 0" fill="white"/>
              </motion.svg>
              <motion.div className="flex flex-col gap-4" variants={stagger(0.1)}>
                <motion.h2 variants={fadeUp} style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "clamp(32px,3.2vw,48px)", color: "white", lineHeight: 1.05, letterSpacing: "0.24px" }}>
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
